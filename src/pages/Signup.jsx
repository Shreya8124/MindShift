import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import styles from './Signup.module.css'

const planDetails = {
  silver: {
    medal: '🥈',
    name: 'Silver',
    price: '₹175',
    color: '#A0AEB0',
    tagline: 'Essential burnout monitoring for lean teams.',
    features: ['Monthly burnout surveys', 'Basic team health score', '2 sessions/employee/month', 'Email support'],
  },
  gold: {
    medal: '🥇',
    name: 'Gold',
    price: '₹350',
    color: '#C9A84C',
    tagline: 'The complete platform for growing startups.',
    features: ['Weekly burnout detection', 'Manager dashboard', 'Unlimited therapy sessions', 'Workshops + ROI tracking'],
  },
  platinum: {
    medal: '💎',
    name: 'Platinum',
    price: '₹600',
    color: '#8BAF88',
    tagline: 'Advanced intelligence for high-growth companies.',
    features: ['Everything in Gold', 'Advanced analytics', 'Dedicated therapist pool', 'Executive coaching + white-label'],
  },
}

const steps = ['Your Details', 'Company Info', 'Confirm Plan']

export default function Signup() {
  const { plan } = useParams()
  const navigate = useNavigate()
  const selected = planDetails[plan] || planDetails.gold

  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', role: '', size: '', industry: '',
  })
  const [errors, setErrors] = useState({})

  const update = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  const validateStep = () => {
    const errs = {}
    if (step === 0) {
      if (!form.firstName.trim()) errs.firstName = 'Required'
      if (!form.lastName.trim()) errs.lastName = 'Required'
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Enter a valid email'
      if (!form.phone.match(/^[6-9]\d{9}$/)) errs.phone = 'Enter a valid 10-digit Indian mobile number'
    }
    if (step === 1) {
      if (!form.company.trim()) errs.company = 'Required'
      if (!form.role.trim()) errs.role = 'Required'
      if (!form.size) errs.size = 'Please select team size'
      if (!form.industry) errs.industry = 'Please select an industry'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const next = () => {
    if (validateStep()) setStep(s => s + 1)
  }

  const back = () => setStep(s => s - 1)

  const submit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>🎉</div>
          <h2 className={styles.successTitle}>You're in!</h2>
          <p className={styles.successSub}>
            Welcome to MindShift, <strong>{form.firstName}</strong>. We've sent a confirmation to <strong>{form.email}</strong>.
            Your {selected.name} plan pilot starts now.
          </p>
          <div className={styles.successPlan}>
            <span>{selected.medal}</span>
            <span>{selected.name} Plan · {selected.price}/emp/month</span>
          </div>
          <p className={styles.successNote}>Our team will reach out within 24 hours to set up your dashboard and onboard your team.</p>
          <button className={styles.successBtn} onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {/* Left panel */}
      <div className={styles.left}>
        <Link to="/" className={styles.backLink}>← Back to MindShift</Link>

        <div className={styles.brandName}>Mind<span>Shift</span></div>

        <div className={styles.planCard}>
          <div className={styles.planMedal}>{selected.medal}</div>
          <div className={styles.planName}>{selected.name} Plan</div>
          <div className={styles.planPrice}>{selected.price}<span>/emp/mo</span></div>
          <p className={styles.planTagline}>{selected.tagline}</p>
          <ul className={styles.planFeatures}>
            {selected.features.map(f => (
              <li key={f}><span>✓</span>{f}</li>
            ))}
          </ul>
        </div>

        <div className={styles.trust}>
          <div className={styles.trustItem}><span>🔒</span>HIPAA-aligned data security</div>
          <div className={styles.trustItem}><span>🎁</span>30-day free pilot included</div>
          <div className={styles.trustItem}><span>🚫</span>No credit card required</div>
        </div>
      </div>

      {/* Right panel */}
      <div className={styles.right}>
        {/* Progress steps */}
        <div className={styles.stepBar}>
          {steps.map((s, i) => (
            <div className={styles.stepItem} key={s}>
              <div className={`${styles.stepDot} ${i < step ? styles.done : i === step ? styles.active : ''}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`${styles.stepLabel} ${i === step ? styles.stepActive : ''}`}>{s}</span>
              {i < steps.length - 1 && <div className={`${styles.stepLine} ${i < step ? styles.lineDone : ''}`} />}
            </div>
          ))}
        </div>

        <div className={styles.formBox}>

          {/* Step 0 — Personal details */}
          {step === 0 && (
            <>
              <h2 className={styles.formTitle}>Let's start with you</h2>
              <p className={styles.formSub}>We'll use this to set up your account and send access details.</p>
              <div className={styles.row}>
                <Field label="First Name" error={errors.firstName}>
                  <input placeholder="Kirti" value={form.firstName} onChange={e => update('firstName', e.target.value)} className={errors.firstName ? styles.inputErr : ''} />
                </Field>
                <Field label="Last Name" error={errors.lastName}>
                  <input placeholder="Sharma" value={form.lastName} onChange={e => update('lastName', e.target.value)} className={errors.lastName ? styles.inputErr : ''} />
                </Field>
              </div>
              <Field label="Work Email" error={errors.email}>
                <input type="email" placeholder="you@company.com" value={form.email} onChange={e => update('email', e.target.value)} className={errors.email ? styles.inputErr : ''} />
              </Field>
              <Field label="Mobile Number" error={errors.phone}>
                <div className={styles.phoneWrap}>
                  <span className={styles.phonePrefix}>+91</span>
                  <input placeholder="9876543210" value={form.phone} onChange={e => update('phone', e.target.value)} className={errors.phone ? styles.inputErr : ''} />
                </div>
              </Field>
            </>
          )}

          {/* Step 1 — Company info */}
          {step === 1 && (
            <>
              <h2 className={styles.formTitle}>Tell us about your company</h2>
              <p className={styles.formSub}>This helps us tailor your pilot and onboarding experience.</p>
              <Field label="Company Name" error={errors.company}>
                <input placeholder="Acme Technologies" value={form.company} onChange={e => update('company', e.target.value)} className={errors.company ? styles.inputErr : ''} />
              </Field>
              <Field label="Your Role" error={errors.role}>
                <input placeholder="HR Head / Founder / VP People" value={form.role} onChange={e => update('role', e.target.value)} className={errors.role ? styles.inputErr : ''} />
              </Field>
              <div className={styles.row}>
                <Field label="Team Size" error={errors.size}>
                  <select value={form.size} onChange={e => update('size', e.target.value)} className={errors.size ? styles.inputErr : ''}>
                    <option value="">Select size</option>
                    <option>1–50 employees</option>
                    <option>51–100 employees</option>
                    <option>101–200 employees</option>
                    <option>201–500 employees</option>
                    <option>500+ employees</option>
                  </select>
                </Field>
                <Field label="Industry" error={errors.industry}>
                  <select value={form.industry} onChange={e => update('industry', e.target.value)} className={errors.industry ? styles.inputErr : ''}>
                    <option value="">Select industry</option>
                    <option>SaaS / Tech</option>
                    <option>Fintech</option>
                    <option>Edtech</option>
                    <option>Healthcare</option>
                    <option>D2C / E-commerce</option>
                    <option>Consulting</option>
                    <option>Other</option>
                  </select>
                </Field>
              </div>
            </>
          )}

          {/* Step 2 — Confirm */}
          {step === 2 && (
            <>
              <h2 className={styles.formTitle}>Confirm your plan</h2>
              <p className={styles.formSub}>Review your details before we set up your free pilot.</p>

              <div className={styles.summary}>
                <div className={styles.summarySection}>
                  <div className={styles.summaryLabel}>Your Details</div>
                  <div className={styles.summaryRow}><span>Name</span><span>{form.firstName} {form.lastName}</span></div>
                  <div className={styles.summaryRow}><span>Email</span><span>{form.email}</span></div>
                  <div className={styles.summaryRow}><span>Phone</span><span>+91 {form.phone}</span></div>
                </div>
                <div className={styles.summarySection}>
                  <div className={styles.summaryLabel}>Company</div>
                  <div className={styles.summaryRow}><span>Company</span><span>{form.company}</span></div>
                  <div className={styles.summaryRow}><span>Role</span><span>{form.role}</span></div>
                  <div className={styles.summaryRow}><span>Team Size</span><span>{form.size}</span></div>
                  <div className={styles.summaryRow}><span>Industry</span><span>{form.industry}</span></div>
                </div>
                <div className={styles.summaryPlan}>
                  <span className={styles.summaryPlanMedal}>{selected.medal}</span>
                  <div>
                    <div className={styles.summaryPlanName}>{selected.name} Plan selected</div>
                    <div className={styles.summaryPlanPrice}>{selected.price} / employee / month</div>
                  </div>
                  <button className={styles.changePlan} onClick={() => navigate('/#pricing')}>Change</button>
                </div>
              </div>

              <p className={styles.terms}>
                By clicking "Start Free Pilot" you agree to our{' '}
                <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                Your 30-day pilot begins immediately. No credit card required.
              </p>
            </>
          )}

          {/* Navigation buttons */}
          <div className={styles.navBtns}>
            {step > 0 && (
              <button className={styles.btnBack} onClick={back}>← Back</button>
            )}
            {step < 2 ? (
              <button className={styles.btnNext} onClick={next}>
                Continue →
              </button>
            ) : (
              <button className={styles.btnSubmit} onClick={submit}>
                🚀 Start Free Pilot
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6 }}>
        {label}
      </label>
      {children}
      {error && <div style={{ fontSize: 12, color: '#E57373', marginTop: 4 }}>{error}</div>}
    </div>
  )
}
