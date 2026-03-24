import styles from './Features.module.css'

const features = [
  {
    icon: '🧭',
    title: 'Burnout Detection Engine',
    desc: 'Clinically validated surveys blended with behavioural signals (leave patterns, meeting density) create a composite Burnout Score — updated every week.',
    tags: ['PHQ-9 Validated', 'Weekly Cadence', 'Team-Level'],
  },
  {
    icon: '📊',
    title: 'Manager Intelligence Dashboard',
    desc: 'Live team health heatmaps, trend lines, and intervention suggestions — designed so managers take action, not drown in data.',
    tags: ['No-Code', 'Shareable Reports', 'ROI Metrics'],
  },
  {
    icon: '🧘',
    title: 'Employee Support Suite',
    desc: 'Confidential 1:1 therapy, executive coaching, and peer support groups — all accessible within minutes, in-app, by certified professionals.',
    tags: ['Confidential', 'Text + Video', 'On-Demand'],
  },
  {
    icon: '🎓',
    title: 'Workshops & Group Programs',
    desc: 'Stress resilience, performance mindset, and manager training workshops — delivered live or async by certified facilitators.',
    tags: ['Live + Async', 'Custom Topics', 'Certifiable'],
  },
]

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.label}>Features</div>
      <h2 className={styles.title}>
        Built for HR leaders.<br />Loved by employees.
      </h2>

      <div className={styles.grid}>
        {features.map(f => (
          <div className={styles.card} key={f.title}>
            <div className={styles.icon}>{f.icon}</div>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardDesc}>{f.desc}</p>
            <div className={styles.tags}>
              {f.tags.map(t => (
                <span className={styles.tag} key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
