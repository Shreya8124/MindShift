import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Features from './components/Features.jsx'
import Pricing from './components/Pricing.jsx'
import Market from './components/Market.jsx'
import Testimonials from './components/Testimonials.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import ManagerDashboard from './pages/ManagerDashboard.jsx'

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <Pricing />
      <Market />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/"           element={<LandingPage />} />
      <Route path="/signup/:plan" element={<Signup />} />
      <Route path="/login"      element={<Login />} />
      <Route path="/dashboard"  element={<ManagerDashboard />} />
    </Routes>
  )
}
