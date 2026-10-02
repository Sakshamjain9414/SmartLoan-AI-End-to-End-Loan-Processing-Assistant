import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request, { params }) {
  try {
    const { id } = await params

    console.log("[v0] Fetching customer data for ID:", id)

    if (!ObjectId.isValid(id)) {
      console.log("[v0] Invalid ObjectId format:", id)
      return NextResponse.json({ success: false, message: "Invalid customer ID format" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("NeuroNovaDB")
    const customersCollection = db.collection("customers")

    const customer = await customersCollection.findOne({ _id: new ObjectId(id) })

    if (!customer) {
      console.log("[v0] Customer not found in MongoDB")
      return NextResponse.json({ success: false, message: "Customer not found" }, { status: 404 })
    }

    console.log("[v0] Customer found in MongoDB:", customer.name)

    return NextResponse.json({
      success: true,
      customer: {
        id: customer._id.toString(),
        name: customer.name,
        email: customer.email,
        accountNumber: customer.accountNumber,
        loanAmount: customer.loanAmount,
        loanStatus: customer.loanStatus,
        creditScore: customer.creditScore,
        city: customer.city,
        phone: customer.phone,
        emi: customer.emi,
        tenure: customer.tenure,
        bankBalance: customer.bankBalance,
        appliedDate: customer.appliedDate,
        panCard: customer.panno,
        aadhaarCard: customer.adhaarno,
      },
    })
  } catch (error) {
    console.error("[v0] Get customer error:", error)
    return NextResponse.json({ success: false, message: "Server error: " + error.message }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    const { loanStatus } = await request.json()

    console.log("[v0] Updating customer loan status:", id, loanStatus)

    if (!ObjectId.isValid(id)) {
      console.log("[v0] Invalid ObjectId format:", id)
      return NextResponse.json({ success: false, message: "Invalid customer ID format" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("NeuroNovaDB")
    const customersCollection = db.collection("customers")

    const customer = await customersCollection.findOne({ _id: new ObjectId(id) })

    if (!customer) {
      return NextResponse.json({ success: false, message: "Customer not found" }, { status: 404 })
    }

    const updateFields = { loanStatus }

    const currentBalance = customer.bankBalance || 0
    const loanAmount = customer.loanAmount || 0

    // If changing FROM Approved TO something else (Pending/Rejected), subtract the loan amount
    if (customer.loanStatus === "Approved" && loanStatus !== "Approved" && loanAmount > 0) {
      updateFields.bankBalance = currentBalance - loanAmount
      console.log("[v0] Subtracting loan amount from bank balance:", loanAmount)
      console.log("[v0] New balance:", updateFields.bankBalance)
    }

    // If changing TO Approved FROM something else (Pending/Rejected), add the loan amount
    if (loanStatus === "Approved" && customer.loanStatus !== "Approved" && loanAmount > 0) {
      updateFields.bankBalance = currentBalance + loanAmount
      console.log("[v0] Adding loan amount to bank balance:", loanAmount)
      console.log("[v0] New balance:", updateFields.bankBalance)
    }

    const result = await customersCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateFields })

    console.log("[v0] MongoDB update result:", result)

    if (result.matchedCount > 0) {
      console.log("[v0] Customer status and balance updated successfully in MongoDB")
      return NextResponse.json({ success: true })
    } else {
      console.log("[v0] Customer not found in MongoDB")
      return NextResponse.json({ success: false, message: "Customer not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("[v0] Update customer error:", error)
    return NextResponse.json({ success: false, message: "Server error: " + error.message }, { status: 500 })
  }
}
