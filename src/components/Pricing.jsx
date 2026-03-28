import { useNavigate } from 'react-router-dom'
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
    featured: false,
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
    btnLabel: 'Get Started',
    featured: true,
    badge: 'Best Value',
  },
]

// ── Comparison table data ──────────────────────────────────────
// true = tick, false = cross, string = custom text
const categories = [
  {
    group: 'Burnout Detection',
    rows: [
      { feature: 'Burnout Risk Surveys',          silver: true,          gold: true,           platinum: true },
      { feature: 'Survey Cadence',                silver: 'Monthly',     gold: 'Weekly',        platinum: 'Weekly + Real-time' },
      { feature: 'Burnout Score per Employee',    silver: false,         gold: true,            platinum: true },
      { feature: 'Passive Signal Tracking',       silver: false,         gold: false,           platinum: true },
      { feature: 'Predictive Risk Alerts',        silver: false,         gold: false,           platinum: true },
    ],
  },
  {
    group: 'Manager Dashboard',
    rows: [
      { feature: 'Team Health Overview',          silver: 'Basic',       gold: true,            platinum: true },
      { feature: 'Department-Level Heatmaps',     silver: false,         gold: true,            platinum: true },
      { feature: 'Trend & Engagement Charts',     silver: false,         gold: true,            platinum: true },
      { feature: 'Advanced Behavioural Analytics',silver: false,         gold: false,           platinum: true },
      { feature: 'ROI & Retention Metrics',       silver: false,         gold: true,            platinum: true },
      { feature: 'Exportable Reports',            silver: false,         gold: true,            platinum: true },
    ],
  },
  {
    group: 'Employee Support',
    rows: [
      { feature: 'Therapy Sessions',              silver: '2/emp/month', gold: 'Unlimited',     platinum: 'Unlimited' },
      { feature: 'Coaching Sessions',             silver: false,         gold: true,            platinum: true },
      { feature: 'Peer Support Groups',           silver: false,         gold: false,           platinum: true },
      { feature: 'Dedicated Therapist Pool',      silver: false,         gold: false,           platinum: true },
      { feature: 'Executive Coaching Add-on',     silver: false,         gold: false,           platinum: true },
      { feature: 'Confidential In-app Access',    silver: true,          gold: true,            platinum: true },
    ],
  },
  {
    group: 'Workshops & Programs',
    rows: [
      { feature: 'Group Workshops',               silver: false,         gold: '2 / quarter',   platinum: 'Custom' },
      { feature: 'Stress Resilience Program',     silver: false,         gold: true,            platinum: true },
      { feature: 'Manager Training Program',      silver: false,         gold: false,           platinum: true },
      { feature: 'Custom Workshop Curation',      silver: false,         gold: false,           platinum: true },
    ],
  },
  {
    group: 'Platform & Support',
    rows: [
      { feature: 'Customer Support',              silver: 'Email',       gold: 'Priority Email + Chat', platinum: 'Dedicated CSM' },
      { feature: 'Onboarding Assistance',         silver: 'Self-serve',  gold: true,            platinum: 'White-glove' },
      { feature: 'API & Integrations',            silver: false,         gold: false,           platinum: true },
      { feature: 'White-label Option',            silver: false,         gold: false,           platinum: true },
      { feature: 'SLA Guarantee',                 silver: false,         gold: '99.5%',         platinum: '99.9%' },
    ],
  },
]

function Cell({ value, isPlatinum }) {
  if (value === true) {
    return (
      <td className={`${styles.cell} ${isPlatinum ? styles.cellPlatinum : ''}`}>
        <span className={styles.tick}>✓</span>
      </td>
    )
  }
  if (value === false) {
    return (
      <td className={`${styles.cell} ${isPlatinum ? styles.cellPlatinum : ''}`}>
        <span className={styles.cross}>—</span>
      </td>
    )
  }
  return (
    <td className={`${styles.cell} ${isPlatinum ? styles.cellPlatinum : ''}`}>
      <span className={styles.custom}>{value}</span>
    </td>
  )
}

export default function Pricing() {
  const navigate = useNavigate()

  return (
    <section className={styles.section} id="pricing">
      <div className={styles.label}>Pricing</div>
      <h2 className={styles.title}>Simple, scalable pricing</h2>
      <p className={styles.sub}>
        Per employee · per month. Fixed platform fee + variable usage. Cancel anytime.
      </p>

      {/* ── Plan cards ── */}
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
              onClick={() => navigate(`/signup/${plan.id}`)}
            >
              {plan.btnLabel}
            </button>
          </div>
        ))}
      </div>

      {/* ── Note ── */}
      <div className={styles.note}>
        <span>💡</span>
        <span>
          All plans include a <strong>30-day free pilot</strong> for up to 30 employees. No credit card required.
        </span>
      </div>

      {/* ── Comparison Table ── */}
      <div className={styles.tableWrap}>
        <div className={styles.tableHeading}>Full Plan Comparison</div>
        <p className={styles.tableSub}>See exactly what's included in each plan.</p>

        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thFeature}>Feature</th>
                <th className={styles.thPlan}>
                  <div className={styles.thInner}>
                    <span className={styles.thMedal}>🥈</span>
                    <span className={styles.thName}>Silver</span>
                    <span className={styles.thPrice}>₹175 / emp</span>
                  </div>
                </th>
                <th className={styles.thPlan}>
                  <div className={styles.thInner}>
                    <span className={styles.thMedal}>🥇</span>
                    <span className={styles.thName}>Gold</span>
                    <span className={styles.thPrice}>₹350 / emp</span>
                  </div>
                </th>
                <th className={`${styles.thPlan} ${styles.thPlatinum}`}>
                  <div className={styles.thInner}>
                    <span className={styles.thMedal}>💎</span>
                    <span className={styles.thName}>Platinum</span>
                    <span className={styles.thPrice}>₹600 / emp</span>
                    <span className={styles.thBadge}>Best Value</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map(cat => (
                <>
                  {/* Category group header */}
                  <tr key={cat.group} className={styles.groupRow}>
                    <td colSpan={4} className={styles.groupCell}>{cat.group}</td>
                  </tr>

                  {/* Feature rows */}
                  {cat.rows.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                      <td className={styles.featureCell}>{row.feature}</td>
                      <Cell value={row.silver}   isPlatinum={false} />
                      <Cell value={row.gold}     isPlatinum={false} />
                      <Cell value={row.platinum} isPlatinum={true}  />
                    </tr>
                  ))}
                </>
              ))}

              {/* CTA row */}
              <tr className={styles.ctaRow}>
                <td className={styles.ctaLabel}>Ready to start?</td>
                <td className={styles.ctaCell}>
                  <button className={styles.ctaBtnOutline} onClick={() => navigate('/signup/silver')}>
                    Get Started
                  </button>
                </td>
                <td className={styles.ctaCell}>
                  <button className={styles.ctaBtnOutline} onClick={() => navigate('/signup/gold')}>
                    Start Pilot
                  </button>
                </td>
                <td className={`${styles.ctaCell} ${styles.ctaCellPlatinum}`}>
                  <button className={styles.ctaBtnSolid} onClick={() => navigate('/signup/platinum')}>
                    Get Started
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}