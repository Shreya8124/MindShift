import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

const links = [
  { label: 'How It Works', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Market', href: '#market' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        Mind<span>Metric</span>
      </div>

      <ul className={styles.links}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>

      <div className={styles.navActions}>
        <button className={styles.loginBtn} onClick={() => navigate('/login')}>
          Log In
        </button>
        <button
          className={styles.cta}
          onClick={() => document.querySelector('#pricing').scrollIntoView({ behavior: 'smooth' })}
        >
          Book a Demo
        </button>
      </div>

      <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <button className={styles.loginBtn} onClick={() => { navigate('/login'); setMenuOpen(false) }}>
            Log In
          </button>
          <button className={styles.cta} onClick={() => setMenuOpen(false)}>Book a Demo</button>
        </div>
      )}
    </nav>
  )
}
