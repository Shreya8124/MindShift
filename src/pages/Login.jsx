import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './Login.module.css'

const PRESET_USER = 'manager@mindshift.in'
const PRESET_PASS = 'MindShift@2025'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState(PRESET_USER)
  const [password, setPassword] = useState(PRESET_PASS)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleLogin = () => {
    setError('')
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    if (email !== PRESET_USER || password !== PRESET_PASS) {
      setError('Incorrect credentials. Use the pre-filled details.')
      return
    }
    setLoading(true)
    setTimeout(() => navigate('/dashboard'), 1200)
  }

  return (
    <div className={styles.page}>
      {/* Left branding panel */}
      <div className={styles.left}>
        <Link to="/" className={styles.backLink}>← Back to website</Link>
        <div className={styles.brandWrap}>
          <div className={styles.brandName}>Mind<span>Shift</span></div>
          <p className={styles.brandTagline}>
            Workplace Mental Health<br />Intelligence Platform
          </p>
        </div>
        <div className={styles.featureList}>
          {[
            { icon: '📊', text: 'Live team burnout dashboard' },
            { icon: '🧭', text: 'Department-level risk scores' },
            { icon: '📈', text: 'Engagement & productivity trends' },
            { icon: '🔔', text: 'Early warning alerts' },
            { icon: '💬', text: 'Session usage & ROI tracking' },
          ].map(f => (
            <div className={styles.featureItem} key={f.text}>
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
        <div className={styles.leftFooter}>
          Trusted by 40+ startups · 6,000+ employees
        </div>
      </div>

      {/* Right login form */}
      <div className={styles.right}>
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.avatarRing}>
              <span>👤</span>
            </div>
            <h2 className={styles.title}>Manager Login</h2>
            <p className={styles.sub}>Access your team's mental health dashboard</p>
          </div>

          <div className={styles.demoNote}>
            <span className={styles.demoIcon}>🎯</span>
            <div>
              <div className={styles.demoLabel}>Demo credentials pre-filled</div>
              <div className={styles.demoHint}>Just click <strong>Log In</strong> to enter the dashboard</div>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              className={styles.input}
              placeholder="manager@mindshift.in"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.passwordWrap}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                className={styles.input}
                placeholder="••••••••••••"
              />
              <button
                className={styles.eyeBtn}
                onClick={() => setShowPass(s => !s)}
                tabIndex={-1}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            className={`${styles.loginBtn} ${loading ? styles.loading : ''}`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner}>Logging in…</span>
            ) : (
              'Log In →'
            )}
          </button>

          <div className={styles.forgotWrap}>
            <a href="#" className={styles.forgot}>Forgot password?</a>
          </div>

          <div className={styles.divider}><span>Don't have an account?</span></div>

          <button className={styles.signupBtn} onClick={() => navigate('/signup/gold')}>
            Start Free Pilot
          </button>
        </div>
      </div>
    </div>
  )
}
