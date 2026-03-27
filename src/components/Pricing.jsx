import { useNavigate } from 'react-router-dom'
import styles from './Pricing.module.css'

const features = [
  'Burnout surveys',
  'Team health score',
  'Therapy sessions',
  'Analytics report',
  'Manager dashboard',
  'Workshops',
  'ROI tracking',
  'Dedicated support',
  'Advanced analytics',
  'Custom workshops',
  'Group sessions',
  'Executive coaching',
]

const plans = [
  { id: 'silver', name: 'Silver', price: '₹350' },
  { id: 'gold', name: 'Gold', price: '₹450', highlight: true },
  { id: 'platinum', name: 'Platinum', price: '₹600' },
]

const availability = {
  silver: [true, true, true, true, false, false, false, false, false, false, false, false],
  gold: [true, true, true, true, true, true, true, true, false, false, false, false],
  platinum: Array(features.length).fill(true),
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

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.pricingTable}>
          <thead>
            <tr>
              <th className={styles.featureCol}>Features</th>
              {plans.map(plan => (
                <th
                  key={plan.id}
                  className={`${styles.planCol} ${plan.highlight ? styles.highlightCol : ''}`}
                >
                  <div className={styles.planHeader}>{plan.name}</div>
                  <div className={styles.tablePrice}>{plan.price}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {features.map((feature, i) => (
              <tr key={feature}>
                <td className={styles.featureName}>{feature}</td>
                {plans.map(plan => (
                  <td
                    key={plan.id}
                    className={`${styles.tickCell} ${plan.highlight ? styles.highlightCol : ''}`}
                  >
                    {availability[plan.id][i] ? (
                      <span className={styles.tick}>✓</span>
                    ) : (
                      <span className={styles.cross}>—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* CTA ROW */}
            <tr className={styles.ctaRow}>
              <td></td>
              {plans.map(plan => (
                <td
                  key={plan.id}
                  className={`${styles.ctaCell} ${plan.highlight ? styles.highlightCol : ''}`}
                >
                  <button
                    className={`${styles.tableBtn} ${plan.highlight ? styles.tableBtnPrimary : ''}`}
                    onClick={() => navigate(`/signup/${plan.id}`)}
                  >
                    Choose {plan.name}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
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

