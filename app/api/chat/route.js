import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

const API_KEY = "AIzaSyBV7f5R2eURtyfwFVWFhG29krQc6Go5cps"
const genAI = new GoogleGenerativeAI(API_KEY)

export async function POST(request) {
  try {
    const { message, userEmail, conversationHistory } = await request.json()

    console.log("[v0] Chat API called:", { message, userEmail, hasAPIKey: !!API_KEY })

    let customerContext = ""
    let customer = null

    if (userEmail) {
      try {
        const { db } = await connectToDatabase()
        const customersCollection = db.collection("customers")

        customer = await customersCollection.findOne({ email: userEmail })

        console.log("[v0] Customer fetched from MongoDB:", customer ? customer.name : "Not found")

        if (customer) {
          customerContext = `
You are Nova, an AI loan assistant for NeuroNova NBFC. You are chatting with ${customer.name}.

Customer Details:
- Name: ${customer.name}
- Email: ${customer.email}
- Phone: ${customer.phone}
- Account Number: ${customer.accountNumber}
- City: ${customer.city}

KYC Details (VERIFIED IN SYSTEM):
${customer.adhaarno ? `- Aadhaar Number: ${customer.adhaarno} ✓` : "- Aadhaar Number: Not provided"}
${customer.panno ? `- PAN Card: ${customer.panno} ✓` : "- PAN Card: Not provided"}

Loan Information:
- Loan Amount: ₹${customer.loanAmount.toLocaleString("en-IN")}
- EMI: ₹${customer.emi.toLocaleString("en-IN")}
- Tenure: ${customer.tenure} months
- Current Loan Status: ${customer.loanStatus}
- Credit Score: ${customer.creditScore}
- Bank Balance: ₹${customer.bankBalance?.toLocaleString("en-IN") || "0"}
`
        }
      } catch (dbError) {
        console.error("[v0] MongoDB error:", dbError)
      }
    }

    const chatHistory = conversationHistory || []

    const systemPrompt = customerContext
      ? `${customerContext}

IMPORTANT INSTRUCTIONS FOR LOAN APPLICATIONS:
- When a customer wants to apply for a loan, check their current loan status
- If status is "Not Applied" and they ask to apply for a loan, you MUST include [UPDATE_STATUS:Pending] in your response
- If status is "Pending", tell them their application is being reviewed
- If status is "Approved", congratulate them and mention their loan is disbursed
- If status is "Rejected", inform them politely

EXAMPLES:

Customer: "I want to apply for a loan"
If current status is "Not Applied":
Nova: "Great! I've received your loan application for ₹${customer.loanAmount.toLocaleString("en-IN")}. Your application has been submitted and is now pending review by our team. You'll be notified once it's reviewed. [UPDATE_STATUS:Pending]"

Customer: "Can I get a loan?"
If current status is "Not Applied":
Nova: "Based on your details, you're eligible for a loan of ₹${customer.loanAmount.toLocaleString("en-IN")}. I'm submitting your application now. Your request is now pending approval from our team. [UPDATE_STATUS:Pending]"

Customer: "What's my loan status?"
If current status is "Pending":
Nova: "Your loan application for ₹${customer.loanAmount.toLocaleString("en-IN")} is currently pending review. Our team is reviewing your application and you should hear back soon!"

Always be professional, friendly, and include the status update command when changing from "Not Applied" to "Pending".`
      : `You are Nova, an AI loan assistant for NeuroNova NBFC. Help users with loan applications, eligibility checks, KYC verification, credit scores, and loan status. Be friendly, professional, and helpful.`

    const fullPrompt = `${systemPrompt}

Previous conversation:
${chatHistory.map((msg) => `${msg.sender === "user" ? "Customer" : "Nova"}: ${msg.text}`).join("\n")}

Customer: ${message}
Nova:`

    console.log("[v0] Calling Google AI API...")
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    let botReply = response.text()

    console.log("[v0] AI Response:", botReply)

    const statusUpdateMatch = botReply.match(/\[UPDATE_STATUS:\s*(\w+)\]/i)
    let statusUpdated = false
    let updatedStatus = null

    if (statusUpdateMatch && customer) {
      const newStatus = statusUpdateMatch[1]
      console.log("[v0] Status update command detected:", newStatus)

      try {
        const { db } = await connectToDatabase()
        const customersCollection = db.collection("customers")

        console.log("[v0] Attempting to update customer ID:", customer._id.toString())
        console.log("[v0] New status:", newStatus)

        const updateResult = await customersCollection.updateOne(
          { _id: new ObjectId(customer._id) },
          {
            $set: {
              loanStatus: newStatus,
              lastUpdated: new Date().toISOString(),
            },
          },
        )

        console.log("[v0] MongoDB update result:", {
          matchedCount: updateResult.matchedCount,
          modifiedCount: updateResult.modifiedCount,
        })

        if (updateResult.modifiedCount > 0) {
          statusUpdated = true
          updatedStatus = newStatus
          customer.loanStatus = newStatus
          console.log("[v0] ✅ Customer status SUCCESSFULLY updated in MongoDB to:", newStatus)
        } else if (updateResult.matchedCount > 0) {
          console.log("[v0] ⚠️ Customer found but status was already:", newStatus)
        } else {
          console.log("[v0] ❌ No customer matched for update")
        }

        botReply = botReply.replace(/\[UPDATE_STATUS:\s*\w+\]/gi, "").trim()
      } catch (updateError) {
        console.error("[v0] ❌ Error updating customer status:", {
          message: updateError.message,
          stack: updateError.stack,
        })
      }
    } else {
      console.log("[v0] No status update command found in AI response")
    }

    return NextResponse.json({
      success: true,
      reply: botReply,
      statusUpdated,
      updatedStatus,
      customerData: customer
        ? {
            name: customer.name,
            accountNumber: customer.accountNumber,
            loanStatus: customer.loanStatus,
            creditScore: customer.creditScore,
          }
        : null,
    })
  } catch (error) {
    console.error("[v0] Chat API Error Details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    })

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        reply: `I apologize, but I encountered an error: ${error.message}. Please try again.`,
      },
      { status: 500 },
    )
  }
}
