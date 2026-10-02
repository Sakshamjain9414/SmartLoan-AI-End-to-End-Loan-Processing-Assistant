"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import AdminHeader from "./AdminHeader"
import CustomerTable from "./CustomerTable"
import DashboardStats from "./DashboardStats"
import CustomerDetailModal from "./CustomerDetailModal"
import { Filter, SortAsc } from "lucide-react"

export default function AdminDashboard({ adminName, onLogout }) {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterCity, setFilterCity] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers")
      const data = await response.json()

      if (data.success) {
        setCustomers(data.customers)
      }
    } catch (error) {
      console.error("[v0] Fetch customers error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort customers
  const filteredCustomers = useMemo(() => {
    let filtered = [...customers]

    if (filterCity) {
      filtered = filtered.filter((c) => c.city.toLowerCase().includes(filterCity.toLowerCase()))
    }

    if (filterStatus) {
      filtered = filtered.filter((c) => c.loanStatus === filterStatus)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "creditScore":
          return b.creditScore - a.creditScore
        case "city":
          return a.city.localeCompare(b.city)
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [customers, filterCity, filterStatus, sortBy])

  const handleStatusChange = async (id, newStatus) => {
    try {
      console.log("[v0] Updating customer status:", { id, newStatus })

      const response = await fetch(`/api/customers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loanStatus: newStatus }),
      })

      console.log("[v0] Update response status:", response.status)
      const result = await response.json()
      console.log("[v0] Update response:", result)

      if (response.ok) {
        setCustomers(customers.map((c) => (c.id === id ? { ...c, loanStatus: newStatus } : c)))
        fetchCustomers()
      } else {
        console.error("[v0] Update failed:", result.message)
        alert(`Failed to update: ${result.message}`)
      }
    } catch (error) {
      console.error("[v0] Update status error:", error)
      alert(`Error updating status: ${error.message}`)
    }
  }

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer)
  }

  const handleCloseModal = () => {
    setSelectedCustomer(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-semibold">Loading dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <AdminHeader adminName={adminName} onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back, {adminName}!</h1>
          <p className="text-indigo-100">Here's your loan management overview</p>
        </motion.div>

        {/* Dashboard Stats */}
        <DashboardStats customers={customers} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 card-shadow border border-border mb-8 mt-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Filters & Search</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Filter by City</label>
              <input
                type="text"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                placeholder="Enter city name..."
                className="w-full bg-input border-2 border-border rounded-xl px-4 py-2.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary smooth-transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-input border-2 border-border rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary smooth-transition"
              >
                <option value="">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <SortAsc className="w-4 h-4" />
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-input border-2 border-border rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary smooth-transition"
              >
                <option value="name">Name</option>
                <option value="creditScore">Credit Score</option>
                <option value="city">City</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Results</label>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl px-4 py-2.5 text-white font-bold text-center">
                {filteredCustomers.length} customers
              </div>
            </div>
          </div>
        </motion.div>

        {/* Customers Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <CustomerTable
            customers={filteredCustomers}
            onStatusChange={handleStatusChange}
            onCustomerClick={handleCustomerClick}
          />
        </motion.div>

        {/* Customer Detail Modal */}
        {selectedCustomer && <CustomerDetailModal customer={selectedCustomer} onClose={handleCloseModal} />}
      </main>
    </div>
  )
}
