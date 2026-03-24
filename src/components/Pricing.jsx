import styles from './Pricing.module.css'

const plans = [
  {
    id: 'silver',
    medal: '🥈',
    name: 'Silver',
    price: '₹175',
    desc: 'Essential burnout monitoring for lean teams.',
    features: [
      'Burnout surveys (monthly cadence)',
      'Basic team health score',
      'Up to 2 support sessions/employee/month',
      'Survey analytics report',
      'Email support',
    ],
    btnLabel: 'Get Started',
    featured: false,
  },
  {
    id: 'gold',
    medal: '🥇',
    name: 'Gold',
    price: '₹350',
    desc: 'The complete platform for growing startups.',
    features: [
      'Weekly burnout detection engine',
      'Live manager intelligence dashboard',
      'Unlimited therapy + coaching sessions',
      'Workshops (2 per quarter)',
      'Retention & ROI tracking',
      'Priority support + dedicated CSM',
    ],
    btnLabel: 'Start Free Pilot',
    featured: true,
    badge: 'Most Popular',
  },
  {
    id: 'platinum',
    medal: '💎',
    name: 'Platinum',
    price: '₹600',
    desc: 'Advanced intelligence for high-growth companies.',
    features: [
      'Everything in Gold',
      'Advanced behavioural analytics',
      'Dedicated therapist pool',
      'Custom workshop curation',
      'Unlimited group sessions',
      'Executive coaching add-on',
      'White-label option available',
    ],
    btnLabel: 'Contact Sales',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section className={styles.section} id="pricing">
      <div className={styles.label}>Pricing</div>
      <h2 className={styles.title}>Simple, scalable pricing</h2>
      <p className={styles.sub}>
        Per employee · per month. Fixed platform fee + variable usage. Cancel anytime.
      </p>

      <div className={styles.grid}>
        {plans.map(plan => (
          <div
            className={`${styles.card} ${plan.featured ? styles.featured : ''}`}
            key={plan.id}
          >
            {plan.badge && <div className={styles.badge}>{plan.badge}</div>}
            <div className={styles.medal}>{plan.medal}</div>
            <div className={styles.planName}>{plan.name}</div>
            <div className={styles.price}>
              {plan.price} <span>/ employee / month</span>
            </div>
            <p className={styles.planDesc}>{plan.desc}</p>

            <ul className={styles.features}>
              {plan.features.map(f => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <button
              className={`${styles.btn} ${plan.featured ? styles.btnSolid : styles.btnOutline}`}
            >
              {plan.btnLabel}
            </button>
          </div>
        ))}
      </div>

      <div className={styles.note}>
        <span>💡</span>
        <span>
          All plans include a <strong>30-day free pilot</strong> for up to 30 employees. No credit card required.
        </span>
      </div>
    </section>
  )
}
