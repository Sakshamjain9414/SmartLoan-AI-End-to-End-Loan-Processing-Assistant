"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, CheckCircle, Clock } from "lucide-react"

export default function DashboardStats({ customers }) {
  const approved = customers.filter((c) => c.loanStatus === "Approved").length
  const pending = customers.filter((c) => c.loanStatus === "Pending").length
  const avgCreditScore =
    customers.length > 0 ? Math.round(customers.reduce((sum, c) => sum + c.creditScore, 0) / customers.length) : 0

  const stats = [
    {
      title: "Total Applications",
      value: customers.length,
      icon: Users,
      gradient: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
      change: "+12%",
    },
    {
      title: "Approved",
      value: approved,
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      change: "+8%",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock,
      gradient: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      change: "-3%",
    },
    {
      title: "Avg Credit Score",
      value: avgCreditScore,
      icon: TrendingUp,
      gradient: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      change: "+5%",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group"
        >
          <div className="relative bg-card rounded-2xl p-6 card-shadow border border-border overflow-hidden hover:shadow-xl smooth-transition">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 smooth-transition`}
            />

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 smooth-transition`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
              >
                {stat.value}
              </motion.p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
