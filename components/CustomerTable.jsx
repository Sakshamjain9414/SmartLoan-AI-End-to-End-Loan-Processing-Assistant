"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit2, Save, X, Mail, MapPin, CreditCard, Users } from "lucide-react"
import CustomerDetailModal from "./CustomerDetailModal" // Import CustomerDetailModal component

export default function CustomerTable({ customers, onStatusChange }) {
  const [editingId, setEditingId] = useState(null)
  const [editingStatus, setEditingStatus] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(null) // Added state for customer detail modal

  const startEdit = (id, status) => {
    setEditingId(id)
    setEditingStatus(status)
  }

  const saveEdit = (id) => {
    onStatusChange(id, editingStatus)
    setEditingId(null)
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

  const getCreditScoreColor = (score) => {
    if (score >= 750) return "from-green-500 to-emerald-600"
    if (score >= 650) return "from-yellow-500 to-orange-600"
    return "from-red-500 to-pink-600"
  }

  return (
    <>
      <div className="bg-card rounded-2xl p-6 card-shadow border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Loan Applications</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage and review customer applications</p>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
            <p className="text-white font-semibold">{customers.length} Total</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wide">
                  Customer
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wide">
                  Contact
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wide">
                  Credit Score
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wide">
                  Loan Details
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground text-sm uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border hover:bg-muted/30 smooth-transition group"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <button
                          onClick={() => setSelectedCustomer(customer)} // Made customer name clickable to open detail modal
                          className="font-semibold text-foreground hover:text-primary smooth-transition text-left hover:underline"
                        >
                          {customer.name}
                        </button>
                        <p className="text-xs text-muted-foreground font-mono">{customer.accountNumber}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="truncate max-w-[200px]">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{customer.city}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r ${getCreditScoreColor(customer.creditScore)}`}
                    >
                      <CreditCard className="w-4 h-4 text-white" />
                      <span className="text-white font-bold text-sm">{customer.creditScore}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">
                        ₹{customer.loanAmount?.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-muted-foreground">EMI: ₹{customer.emi?.toLocaleString("en-IN")}/mo</p>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    {editingId === customer.id ? (
                      <select
                        value={editingStatus}
                        onChange={(e) => setEditingStatus(e.target.value)}
                        className="bg-input border-2 border-primary rounded-lg px-3 py-2 text-foreground text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : (
                      <span
                        className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold border ${getStatusColor(customer.loanStatus)}`}
                      >
                        {customer.loanStatus}
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    {editingId === customer.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(customer.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 smooth-transition"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex items-center gap-1 px-3 py-2 bg-gray-400 text-white rounded-lg text-sm font-semibold hover:bg-gray-500 smooth-transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(customer.id, customer.loanStatus)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg smooth-transition opacity-0 group-hover:opacity-100"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {customers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No customers found</p>
              <p className="text-sm text-muted-foreground mt-1">Add customers to MongoDB to see them here</p>
            </div>
          )}
        </div>
      </div>

      {selectedCustomer && (
        <CustomerDetailModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
      )}
    </>
  )
}
