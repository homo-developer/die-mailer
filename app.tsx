"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Terminal,
  Cpu,
  HardDrive,
  Wifi,
  CheckCircle2,
  Lock,
  Mail,
  User,
  AtSign,
  Send,
  ChevronRight,
  AlertTriangle,
  Shield,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const BootLoader = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [substep, setSubstep] = useState(0)

  const steps = [
    { icon: Terminal, text: "Initializing system kernel..." },
    { icon: Cpu, text: "Loading processor modules..." },
    { icon: HardDrive, text: "Mounting file systems..." },
    { icon: Wifi, text: "Establishing network connection..." },
    { icon: CheckCircle2, text: "System ready" },
  ]

  const substeps = ["Checking hardware...", "Verifying checksums...", "Initializing drivers..."]

  useEffect(() => {
    const stepDuration = 1200
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          setSubstep(0)
          return prev + 1
        }
        clearInterval(stepInterval)
        return prev
      })
    }, stepDuration)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        const increment = Math.random() * 3 + 1
        return Math.min(prev + increment, 100)
      })
    }, 80)

    const autoTransition = setTimeout(() => {
      onComplete()
    }, 6200)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
      clearTimeout(autoTransition)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          animation: "scanline 8s linear infinite",
        }}
      />

      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .blink { animation: blink 1s infinite; }
        .glitch { animation: glitch 0.3s infinite; }
      `}</style>

      <div className="relative z-10 w-full max-w-2xl px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1
            className="text-4xl font-bold text-white mb-2 tracking-widest"
            style={{ fontFamily: "monospace", letterSpacing: "0.2em" }}
          >
            EMAILER OS
          </h1>
          <motion.p
            className="text-gray-400"
            style={{ fontFamily: "monospace" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            v2.1.4-alpha
          </motion.p>
        </motion.div>

        <div className="space-y-3 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon
            const isActive = idx === currentStep
            const isComplete = idx < currentStep

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.4 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${isComplete ? "text-green-400" : isActive ? "text-white" : "text-gray-600"}`}
                  />
                </motion.div>
                <span
                  className={`transition-colors duration-300 ${isComplete ? "text-green-400" : isActive ? "text-white" : "text-gray-600"}`}
                  style={{ fontFamily: "monospace" }}
                >
                  {step.text}
                  {isActive && <span className="blink">_</span>}
                </span>
              </motion.div>
            )
          })}
        </div>

        <div className="mb-8">
          <div className="h-2 bg-gray-900 rounded-sm overflow-hidden border border-gray-800">
            <motion.div
              className="h-full bg-gradient-to-r from-white via-gray-300 to-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15, ease: "linear" }}
            />
          </div>
          <motion.p
            className="text-gray-500 text-sm mt-3 text-right font-bold"
            style={{ fontFamily: "monospace" }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            {Math.floor(progress)}%
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-gray-600 text-xs space-y-2 mb-6"
          style={{ fontFamily: "monospace" }}
        >
          <p className="text-gray-700">KERNEL v5.18.0 | ARCH: x64 | MEM: 16GB</p>
          <motion.p animate={{ opacity: [0.5, 1] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
            © 2025 EMAILER CORPORATION. ALL RIGHTS RESERVED.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

const AccessGate = ({ onAccess }) => {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [systemId] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase())

  const handleSubmit = () => {
    if (password === "itwasdie") {
      onAccess()
    } else {
      setAttempts((prev) => prev + 1)
      setError(`Access Denied: Invalid key. Attempt ${attempts + 1} logged.`)
      setPassword("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, black 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md px-4">
        <Alert className="mb-6 border-red-900 bg-red-950">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <AlertTitle className="text-red-400 font-bold" style={{ fontFamily: "monospace" }}>
            RESTRICTED ACCESS
          </AlertTitle>
          <AlertDescription className="text-red-300 mt-2" style={{ fontFamily: "monospace" }}>
            Unauthorized access is prohibited and will be logged.
          </AlertDescription>
        </Alert>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-950 border border-gray-800 p-8 rounded-sm shadow-2xl"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Lock className="w-16 h-16 text-white" />
              <motion.div
                className="absolute -inset-4 border-2 border-white/20 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </div>

          <h2
            className="text-2xl font-bold text-center mb-2 text-white tracking-wider"
            style={{ fontFamily: "monospace" }}
          >
            ACCESS CONTROL
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8" style={{ fontFamily: "monospace" }}>
            AUTHENTICATION REQUIRED
          </p>

          <div className="space-y-6">
            <div>
              <label
                className="block text-sm mb-2 text-gray-400 flex items-center gap-2"
                style={{ fontFamily: "monospace" }}
              >
                <Shield className="w-4 h-4" />
                Access Key
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-black border-gray-800 text-white h-12 focus:border-white transition-colors"
                style={{ fontFamily: "monospace", borderRadius: "0.125rem" }}
                placeholder="••••••••••"
                autoFocus
              />
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Alert className="border-red-900 bg-red-950">
                  <AlertDescription className="text-red-400 text-sm" style={{ fontFamily: "monospace" }}>
                    ⚠ {error}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            <Button
              onClick={handleSubmit}
              className="w-full bg-white text-black hover:bg-gray-200 h-12 font-bold transition-all"
              style={{ fontFamily: "monospace", borderRadius: "0.125rem" }}
            >
              AUTHENTICATE
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-center text-gray-600 text-xs" style={{ fontFamily: "monospace" }}>
              SYSTEM ID: {systemId}
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-600 text-sm mt-6"
          style={{ fontFamily: "monospace" }}
        >
          <Activity className="w-4 h-4 inline mr-2" />
          All access attempts are monitored
        </motion.p>
      </div>
    </motion.div>
  )
}

const EmailForm = () => {
  const [formData, setFormData] = useState({
    sender_name: "",
    from_email: "",
    to_email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState({ type: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 12).toUpperCase())

  const handleSubmit = async () => {
    if (!formData.sender_name || !formData.from_email || !formData.to_email || !formData.subject || !formData.message) {
      setStatus({ type: "error", message: "All fields are required. Please complete the form." })
      return
    }

    setLoading(true)
    setStatus({ type: "", message: "" })

    try {
      const formBody = new URLSearchParams({
        license: "atumail",
        sender_name: formData.sender_name,
        from_email: formData.from_email,
        to_email: formData.to_email,
        subject: formData.subject,
        message: formData.message,
        submit: "1",
      })

      const response = await fetch("https://shahad.top/spoofer.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
          Origin: "https://shahad.top",
          Referer: "https://shahad.top/spoofer.php",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
        },
        body: formBody.toString(),
      })

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message transmitted successfully. Transaction logged.",
        })
        setFormData({
          sender_name: "",
          from_email: "",
          to_email: "",
          subject: "",
          message: "",
        })
      } else {
        setStatus({
          type: "error",
          message: `Transmission failed. Status ${response.status}.`,
        })
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Network error. Check connection and retry.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-black py-8 px-4 overflow-y-auto"
    >
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Mail className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white tracking-wide" style={{ fontFamily: "monospace" }}>
              EMAILER
            </h1>
          </div>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "monospace" }}>
            Secure Message Transmission System
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-500 text-xs" style={{ fontFamily: "monospace" }}>
              ENCRYPTED CONNECTION
            </span>
          </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <Alert className="mb-6 border-yellow-900 bg-yellow-950">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <AlertTitle className="text-yellow-400 font-bold" style={{ fontFamily: "monospace" }}>
              WARNING
            </AlertTitle>
            <AlertDescription className="text-yellow-300 mt-2" style={{ fontFamily: "monospace" }}>
              This system is for authorized use only. All transmissions are logged.
            </AlertDescription>
          </Alert>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-950 border border-gray-800 p-8 rounded-sm shadow-2xl"
        >
          <div className="space-y-6">
            <div>
              <label
                className="block text-sm mb-2 text-gray-400 flex items-center gap-2"
                style={{ fontFamily: "monospace" }}
              >
                <User className="w-4 h-4" />
                Sender Name
              </label>
              <Input
                value={formData.sender_name}
                onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                className="bg-black border-gray-800 text-white h-11 focus:border-white transition-colors"
                style={{ fontFamily: "monospace", borderRadius: "0.125rem" }}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                className="block text-sm mb-2 text-gray-400 flex items-center gap-2"
                style={{ fontFamily: "monospace" }}
              >
                <AtSign className="w-4 h-4" />
                From Email
              </label>
              <Input
                type="email"
                value={formData.from_email}
                onChange={(e) => setFormData({ ...formData, from_email: e.target.value })}
                className="bg-black border-gray-800 text-white h-11 focus:border-white transition-colors"
                style={{ fontFamily: "monospace", borderRadius: "0.125rem" }}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                className="block text-sm mb-2 text-gray-400 flex items-center gap-2"
                style={{ fontFamily: "monospace" }}
              >
                <Mail className="w-4 h-4" />
                Recipient Email
              </label>
              <Input
                type="email"
                value={formData.to_email}
                onChange={(e) => setFormData({ ...formData, to_email: e.target.value })}
                className="bg-black border-gray-800 text-white h-11 focus:border-white transition-colors"
                style={{ fontFamily: "monospace", borderRadius: "0.125rem" }}
                placeholder="recipient@email.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-400" style={{ fontFamily: "monospace" }}>
                Subject Line
              </label>
              <Input
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="bg-black border-gray-800 text-white h-11 focus:border-white transition-colors"
                style={{ fontFamily: "monospace", borderRadius: "0.125rem" }}
                placeholder="Enter message subject"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-400" style={{ fontFamily: "monospace" }}>
                Message Body
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-black border-gray-800 text-white resize-none focus:border-white transition-colors"
                style={{ fontFamily: "monospace", borderRadius: "0.125rem", height: "200px" }}
                placeholder="Compose your message..."
              />
              <p className="text-gray-600 text-xs mt-1" style={{ fontFamily: "monospace" }}>
                {formData.message.length} characters
              </p>
            </div>

            {status.message && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Alert
                  className={status.type === "success" ? "border-green-900 bg-green-950" : "border-red-900 bg-red-950"}
                >
                  <AlertDescription
                    className={status.type === "success" ? "text-green-400" : "text-red-400"}
                    style={{ fontFamily: "monospace" }}
                  >
                    {status.type === "success" ? "✓ " : "✗ "}
                    {status.message}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-white text-black hover:bg-gray-200 h-12 font-bold transition-all disabled:opacity-50"
              style={{ fontFamily: "monospace", borderRadius: "0.125rem" }}
            >
              {loading ? (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  TRANSMITTING...
                </motion.span>
              ) : (
                <>
                  SEND MESSAGE
                  <Send className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <div
              className="flex items-center justify-between text-xs text-gray-600"
              style={{ fontFamily: "monospace" }}
            >
              <span>SESSION: {sessionId}</span>
              <span className="flex items-center gap-2">
                <Shield className="w-3 h-3" />
                AES-256
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600"
          style={{ fontFamily: "monospace" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs">ONLINE</span>
          </div>
          <span>•</span>
          <span className="text-xs">v2.1.4</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function App() {
  const [stage, setStage] = useState("boot")

  useEffect(() => {
    document.documentElement.classList.add("dark")
    document.body.style.backgroundColor = "#000000"
  }, [])

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "monospace" }}>
      <AnimatePresence mode="wait">
        {stage === "boot" && <BootLoader key="boot" onComplete={() => setStage("gate")} />}
        {stage === "gate" && <AccessGate key="gate" onAccess={() => setStage("email")} />}
        {stage === "email" && <EmailForm key="email" />}
      </AnimatePresence>
    </div>
  )
}