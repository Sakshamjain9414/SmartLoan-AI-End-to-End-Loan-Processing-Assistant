"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import CustomerDashboard from "@/components/CustomerDashboard"

function CustomerPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const customerId = searchParams.get("id")
  const [customerData, setCustomerData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchCustomerData = async () => {
    try {
      console.log("[v0] Fetching customer data from MongoDB for ID:", customerId)
      const response = await fetch(`/api/customers/${customerId}`)
      const data = await response.json()

      if (data.success && data.customer) {
        console.log("[v0] Fetched fresh customer data from MongoDB:", data.customer)
        setCustomerData(data.customer)
        // Also update sessionStorage with fresh data
        sessionStorage.setItem("customerData", JSON.stringify(data.customer))
      } else {
        console.error("[v0] Failed to fetch customer data")
        router.push("/admin")
      }
    } catch (error) {
      console.error("[v0] Error fetching customer data:", error)
      router.push("/admin")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!customerId) {
      router.push("/admin")
      return
    }

    // Fetch fresh data from MongoDB on page load
    fetchCustomerData()

    // Set up polling to refresh data every 5 seconds for real-time updates
    const interval = setInterval(fetchCustomerData, 5000)

    return () => clearInterval(interval)
  }, [customerId, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {customerData && (
        <CustomerDashboard
          customer={customerData}
          onLogout={() => {
            sessionStorage.removeItem("customerData")
            router.push("/admin")
          }}
          onRefresh={fetchCustomerData}
        />
      )}
    </main>
  )
}

export default function CustomerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <CustomerPageContent />
    </Suspense>
  )
}
