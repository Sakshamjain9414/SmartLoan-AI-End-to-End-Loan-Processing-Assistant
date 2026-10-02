"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

export default function AnimatedBackground() {
  const { scrollYProgress } = useScroll()
  const [scrollDirection, setScrollDirection] = useState("down")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate particles only on client side
    const generatedParticles = [...Array(60)].map((_, i) => ({
      id: i,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      color: i % 3 === 0 ? "139, 92, 246" : i % 3 === 1 ? "99, 102, 241" : "168, 85, 247",
      opacity: Math.random() * 0.25 + 0.2,
      left: Math.random() * 100,
      top: Math.random() * 150,
      duration: Math.random() * 20 + 25,
      delay: Math.random() * 5,
    }))
    setParticles(generatedParticles)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up")
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -300])
  const orb1X = useTransform(scrollYProgress, [0, 1], [0, 200])
  const orb1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 0.9])
  const orb1Rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 350])
  const orb2X = useTransform(scrollYProgress, [0, 1], [0, -180])
  const orb2Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.15, 0.08])
  const orb2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1.3])

  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const orb3Rotate = useTransform(scrollYProgress, [0, 1], [0, -540])
  const orb3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.75, 1.4])
  const orb3X = useTransform(scrollYProgress, [0, 1], [0, 100])

  const orb4Y = useTransform(scrollYProgress, [0, 1], [0, 180])
  const orb4X = useTransform(scrollYProgress, [0, 1], [0, -150])
  const orb4Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.85])

  const particleY = useTransform(scrollYProgress, [0, 1], [0, -500])
  const particleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 0.7, 0.5, 0.3])

  const waveOffset = useTransform(scrollYProgress, [0, 1], [0, 250])
  const waveOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.6, 0.3])

  const geometryRotate = useTransform(scrollYProgress, [0, 1], [0, 540])
  const geometryScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.6, 1.1])

  const wave2Offset = useTransform(scrollYProgress, [0, 1], [0, -180])
  const wave3Offset = useTransform(scrollYProgress, [0, 1], [0, 120])
  const geometryRotateReverse = useTransform(scrollYProgress, [0, 1], [0, -720])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute inset-0"
        style={{
          background: useTransform(
            scrollYProgress,
            [0, 0.33, 0.66, 1],
            [
              "linear-gradient(135deg, #ffffff 0%, #faf5ff 20%, #f3e8ff 40%, #e9d5ff 60%, #ddd6fe 80%, #f3e8ff 100%)",
              "linear-gradient(135deg, #eff6ff 0%, #dbeafe 20%, #bfdbfe 40%, #93c5fd 60%, #7dd3fc 80%, #dbeafe 100%)",
              "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 20%, #e9d5ff 40%, #d8b4fe 60%, #e9d5ff 80%, #f3e8ff 100%)",
              "linear-gradient(135deg, #ffffff 0%, #f8fafc 20%, #f1f5f9 40%, #e2e8f0 60%, #cbd5e1 80%, #f1f5f9 100%)",
            ],
          ),
        }}
        transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      />

      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.08) 40%, transparent 70%)",
          filter: "blur(130px)",
          y: orb1Y,
          x: orb1X,
          scale: orb1Scale,
          rotate: orb1Rotate,
        }}
        animate={{
          opacity: scrollDirection === "down" ? [0.5, 0.8, 0.5] : [0.8, 0.5, 0.8],
        }}
        transition={{
          duration: 35,
          ease: [0.43, 0.13, 0.23, 0.96],
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <motion.div
        className="absolute top-1/3 -right-1/4 w-[900px] h-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(79, 70, 229, 0.06) 40%, transparent 70%)",
          filter: "blur(110px)",
          y: orb2Y,
          x: orb2X,
          opacity: orb2Opacity,
          scale: orb2Scale,
        }}
        animate={{
          rotate: scrollDirection === "down" ? [0, -180, 0] : [0, 180, 0],
        }}
        transition={{
          duration: 40,
          ease: [0.43, 0.13, 0.23, 0.96],
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.11) 0%, rgba(147, 51, 234, 0.055) 40%, transparent 70%)",
          filter: "blur(95px)",
          y: orb3Y,
          rotate: orb3Rotate,
          scale: orb3Scale,
          x: orb3X,
        }}
        animate={{
          opacity: scrollDirection === "down" ? [0.4, 0.7, 0.4] : [0.7, 0.4, 0.7],
        }}
        transition={{
          duration: 38,
          ease: [0.43, 0.13, 0.23, 0.96],
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-[750px] h-[750px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)",
          filter: "blur(100px)",
          y: orb4Y,
          x: orb4X,
          scale: orb4Scale,
        }}
        animate={{
          rotate: scrollDirection === "down" ? [0, 270, 0] : [0, -270, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 42,
          ease: [0.43, 0.13, 0.23, 0.96],
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <motion.div style={{ y: particleY, opacity: particleOpacity }}>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              background: `rgba(${particle.color}, ${particle.opacity})`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              filter: "blur(1.5px)",
            }}
            animate={{
              y: scrollDirection === "down" ? [0, -60, 0] : [0, 60, 0],
              x: scrollDirection === "down" ? [0, 30, 0] : [0, -30, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: particle.delay,
            }}
          />
        ))}
      </motion.div>

      <motion.svg className="absolute inset-0 w-full h-full" style={{ opacity: waveOpacity }}>
        <defs>
          <linearGradient id="lightWave1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="lightWave2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id="lightWave3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#9333ea" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0,250 Q400,210 800,250 T1600,250 T2400,250"
          stroke="url(#lightWave1)"
          strokeWidth="3"
          fill="none"
          style={{ x: waveOffset }}
          animate={{
            d:
              scrollDirection === "down"
                ? [
                    "M0,250 Q400,210 800,250 T1600,250 T2400,250",
                    "M0,250 Q400,300 800,250 T1600,250 T2400,250",
                    "M0,250 Q400,210 800,250 T1600,250 T2400,250",
                  ]
                : [
                    "M0,250 Q400,300 800,250 T1600,250 T2400,250",
                    "M0,250 Q400,210 800,250 T1600,250 T2400,250",
                    "M0,250 Q400,300 800,250 T1600,250 T2400,250",
                  ],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        />

        <motion.path
          d="M0,450 Q400,490 800,450 T1600,450 T2400,450"
          stroke="url(#lightWave2)"
          strokeWidth="3"
          fill="none"
          style={{ x: wave2Offset }}
          animate={{
            d:
              scrollDirection === "down"
                ? [
                    "M0,450 Q400,490 800,450 T1600,450 T2400,450",
                    "M0,450 Q400,400 800,450 T1600,450 T2400,450",
                    "M0,450 Q400,490 800,450 T1600,450 T2400,450",
                  ]
                : [
                    "M0,450 Q400,400 800,450 T1600,450 T2400,450",
                    "M0,450 Q400,490 800,450 T1600,450 T2400,450",
                    "M0,450 Q400,400 800,450 T1600,450 T2400,450",
                  ],
          }}
          transition={{
            duration: 32,
            repeat: Number.POSITIVE_INFINITY,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        />

        <motion.path
          d="M0,650 Q400,610 800,650 T1600,650 T2400,650"
          stroke="url(#lightWave3)"
          strokeWidth="2.5"
          fill="none"
          style={{ x: wave3Offset }}
          animate={{
            d: [
              "M0,650 Q400,610 800,650 T1600,650 T2400,650",
              "M0,650 Q400,700 800,650 T1600,650 T2400,650",
              "M0,650 Q400,610 800,650 T1600,650 T2400,650",
            ],
          }}
          transition={{
            duration: 34,
            repeat: Number.POSITIVE_INFINITY,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        />
      </motion.svg>

      <motion.div
        className="absolute top-1/5 left-1/6 w-24 h-24 border-2 border-purple-400/25 rounded-xl"
        style={{
          rotate: geometryRotate,
          scale: geometryScale,
        }}
        animate={{
          borderColor: ["rgba(168, 85, 247, 0.25)", "rgba(139, 92, 246, 0.35)", "rgba(168, 85, 247, 0.25)"],
          borderRadius: ["18px", "50%", "18px"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/5 w-20 h-20 border-2 border-indigo-400/25 rounded-full"
        style={{ scale: geometryScale }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.15, 1],
          borderWidth: ["2px", "3px", "2px"],
        }}
        transition={{
          duration: 45,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      />

      <motion.div
        className="absolute top-2/3 left-3/4 w-18 h-18 border-2 border-violet-400/20 rounded-lg"
        style={{
          y: orb1Y,
          rotate: geometryRotateReverse,
        }}
        animate={{
          scale: [1, 1.1, 1],
          borderRadius: ["12px", "50%", "12px"],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 38,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/3 w-16 h-16 border border-purple-300/20 rounded-full"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{
          duration: 28,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-18 h-18 border border-indigo-300/20 rounded-lg"
        animate={{
          rotate: [0, 120, 0],
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 32,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      />

      <motion.div
        className="absolute top-1/4 right-1/4 w-14 h-14 border border-violet-300/18"
        style={{ borderRadius: "30%" }}
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.12, 1],
          borderRadius: ["30%", "50%", "30%"],
          opacity: [0.22, 0.45, 0.22],
        }}
        transition={{
          duration: 35,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      />
    </div>
  )
}
