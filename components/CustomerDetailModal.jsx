"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  Building2,
  DollarSign,
  Hash,
  TrendingUp,
  Wallet,
  FileText,
} from "lucide-react"

export default function CustomerDetailModal({ customer, onClose }) {
  if (!customer) return null

  const getCreditScoreColor = (score) => {
    if (score >= 750) return "from-green-500 to-emerald-600"
    if (score >= 650) return "from-yellow-500 to-orange-600"
    return "from-red-500 to-pink-600"
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto card-shadow"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{customer.name}</h2>
                  <p className="text-indigo-100 text-sm font-mono">{customer.accountNumber}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 smooth-transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <span
                className={`inline-block px-4 py-2 rounded-xl text-sm font-bold border ${getStatusColor(customer.loanStatus)}`}
              >
                {customer.loanStatus}
              </span>
              <div
                className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getCreditScoreColor(customer.creditScore)} text-white font-bold flex items-center gap-2`}
              >
                <CreditCard className="w-4 h-4" />
                Credit Score: {customer.creditScore}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-600" />
                Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Email</p>
                    <p className="text-gray-900 font-medium">{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Phone</p>
                    <p className="text-gray-900 font-medium">{customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">City</p>
                    <p className="text-gray-900 font-medium">{customer.city}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                Loan Details
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-1">Loan Amount</p>
                  <p className="text-2xl font-bold text-gray-900">₹{customer.loanAmount?.toLocaleString("en-IN")}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-1">Monthly EMI</p>
                  <p className="text-2xl font-bold text-gray-900">₹{customer.emi?.toLocaleString("en-IN")}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-1">Tenure</p>
                  <p className="text-2xl font-bold text-gray-900">{customer.tenure} months</p>
                </div>
              </div>

              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Interest Rate</p>
                    <p className="text-lg font-bold text-gray-900">{customer.interestRate || "8.5"}%</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Hash className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Account Number</p>
                    <p className="text-lg font-bold text-gray-900 font-mono">{customer.accountNumber}</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Bank Balance</p>
                    <p className="text-lg font-bold text-gray-900">
                      ₹{customer.bankBalance?.toLocaleString("en-IN") || "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Additional Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Application Date</p>
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    {new Date(customer.createdAt || Date.now()).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Customer ID</p>
                  <p className="text-gray-900 font-medium font-mono text-sm">{customer.id}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-600" />
                    PAN Card Number
                  </p>
                  <p className="text-gray-900 font-bold font-mono text-lg">{customer.panCard || "Not Available"}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    Aadhaar Card Number
                  </p>
                  <p className="text-gray-900 font-bold font-mono text-lg">{customer.aadhaarCard || "Not Available"}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
