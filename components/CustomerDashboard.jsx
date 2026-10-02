"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Download,
  LogOut,
  CreditCard,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Wallet,
  Award,
  Building2,
} from "lucide-react"
import ChatBot from "@/components/ChatBot"

export default function CustomerDashboard({ customer, onLogout, onRefresh }) {
  const [showChat, setShowChat] = useState(false)
  const [activeTab, setActiveTab] = useState("loan")

  const handleDownloadStatement = () => {
    const statement = `
NEURONOVA NBFC - LOAN STATEMENT
================================

Customer Details:
-----------------
Name: ${customer.name}
Account Number: ${customer.accountNumber}
Email: ${customer.email}
Phone: ${customer.phone}
City: ${customer.city}

Loan Details:
-------------
Loan Amount: ₹${customer.loanAmount?.toLocaleString("en-IN") || "Not Applied"}
EMI: ₹${customer.emi?.toLocaleString("en-IN") || "N/A"}/month
Tenure: ${customer.tenure || "N/A"} months
Credit Score: ${customer.creditScore}
Loan Status: ${customer.loanStatus}

Account Details:
----------------
Bank Balance: ₹${customer.bankBalance?.toLocaleString("en-IN") || "0"}

Generated on: ${new Date().toLocaleDateString("en-IN")}
`
    const blob = new Blob([statement], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `statement-${customer.accountNumber}.txt`
    a.click()
  }

  // Removed double-counting: database already has loan amount added to bank balance when approved
  const totalBalance = customer.bankBalance || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-2xl shadow-lg">
                💠
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  NeuroNova
                </h1>
                <p className="text-xs text-muted-foreground">Customer Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-foreground">{customer.name}</p>
                <p className="text-xs text-muted-foreground">{customer.accountNumber}</p>
              </div>
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 smooth-transition font-semibold"
                  title="Refresh data"
                >
                  🔄
                </button>
              )}
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 smooth-transition font-semibold"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-2">Welcome back, {customer.name}!</h2>
          <p className="text-indigo-100">Here's your loan overview and account details</p>
        </motion.div>

        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setActiveTab("loan")}
            className={`px-6 py-3 rounded-xl font-bold smooth-transition ${
              activeTab === "loan"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Loan Details
          </button>
          <button
            onClick={() => setActiveTab("account")}
            className={`px-6 py-3 rounded-xl font-bold smooth-transition ${
              activeTab === "account"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Account Details
          </button>
        </div>

        {activeTab === "loan" ? (
          // Loan Details Section
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 card-shadow border border-border hover:shadow-xl smooth-transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 smooth-transition shadow-lg">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">Loan Amount</p>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {customer.loanAmount ? `₹${customer.loanAmount.toLocaleString("en-IN")}` : "Not Applied"}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 card-shadow border border-border hover:shadow-xl smooth-transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 smooth-transition shadow-lg">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">Monthly EMI</p>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {customer.emi ? `₹${customer.emi.toLocaleString("en-IN")}` : "N/A"}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 card-shadow border border-border hover:shadow-xl smooth-transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 smooth-transition shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">Tenure</p>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {customer.tenure ? `${customer.tenure} Months` : "N/A"}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 card-shadow border border-border hover:shadow-xl smooth-transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 smooth-transition shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">Credit Score</p>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {customer.creditScore}
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="bg-white rounded-2xl p-6 card-shadow border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Loan Status
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div>
                    <p className="text-sm text-muted-foreground font-semibold">Current Status</p>
                    <span
                      className={`inline-block px-4 py-2 rounded-xl text-sm font-bold mt-2 border-2 ${
                        customer.loanStatus === "Approved"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : customer.loanStatus === "Pending" || customer.loanStatus === "Processing"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : customer.loanStatus === "Rejected"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                      }`}
                    >
                      {customer.loanStatus}
                    </span>
                  </div>
                </div>

                {customer.loanAmount && customer.emi && customer.tenure && (
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <div>
                      <p className="text-sm text-muted-foreground font-semibold">Total Payable Amount</p>
                      <p className="font-bold text-foreground text-2xl">
                        ₹{(customer.emi * customer.tenure).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleDownloadStatement}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl smooth-transition"
                >
                  <Download className="w-5 h-5" />
                  Download Statement
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 card-shadow border border-border"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Bank Account Details
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                  <p className="text-sm text-muted-foreground font-semibold mb-1">Account Number</p>
                  <p className="font-bold text-foreground text-lg">{customer.accountNumber}</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <p className="text-sm text-muted-foreground font-semibold mb-1">Bank Balance</p>
                  <p className="font-bold text-foreground text-3xl text-green-600">
                    ₹{totalBalance.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <p className="text-sm text-muted-foreground font-semibold mb-1">Credit Score</p>
                  <p className="font-bold text-foreground text-2xl">{customer.creditScore}</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                  <p className="text-sm text-muted-foreground font-semibold mb-1">PAN Card Number</p>
                  <p className="font-bold text-foreground text-lg font-mono">{customer.panCard || "Not Available"}</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <p className="text-sm text-muted-foreground font-semibold mb-1">Aadhaar Card Number</p>
                  <p className="font-bold text-foreground text-lg font-mono">
                    {customer.aadhaarCard || "Not Available"}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 card-shadow border border-border"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-semibold">Email</p>
                    <p className="text-sm font-medium text-foreground break-all">{customer.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-semibold">Phone</p>
                    <p className="text-sm font-medium text-foreground">{customer.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-semibold">City</p>
                    <p className="text-sm font-medium text-foreground">{customer.city}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <ChatBot isOpen={showChat} onClose={() => setShowChat(false)} context={null} userEmail={customer.email} />

      {!showChat && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl smooth-transition text-2xl z-50 hover:scale-110"
        >
          💬
        </motion.button>
      )}
    </div>
  )
}
