import styles from './Problem.module.css'

const cards = [
  {
    icon: '🔥',
    num: '₹1.03T',
    label: 'Economic Loss',
    desc: 'WHO estimates India\'s economic loss from mental health conditions between 2012–2030.',
  },
  {
    icon: '🚪',
    num: '1 in 4',
    label: 'Silent Quitters',
    desc: 'Employees experiencing burnout are 2.6× more likely to leave within the next 12 months.',
  },
  {
    icon: '🕳️',
    num: '0.75',
    label: 'Psychiatrists per 1L',
    desc: 'India has a severe shortage of mental health professionals — access is structurally broken.',
  },
  {
    icon: '📉',
    num: '63%',
    label: 'HR Leaders Lack Data',
    desc: 'Most HR teams still rely on exit interviews to detect burnout — weeks or months too late.',
  },
]

export default function Problem() {
  return (
    <section className={styles.section} id="problem">
      <div className={styles.label}>The Problem</div>
      <h2 className={styles.title}>
        Companies pay for<br />
        productivity loss — <em>not therapy</em>
      </h2>
      <p className={styles.sub}>
        The mental health crisis is invisible until it's expensive. By the time leadership notices,
        attrition has already started.
      </p>

      <div className={styles.grid}>
        {cards.map(c => (
          <div className={styles.card} key={c.num}>
            <div className={styles.icon}>{c.icon}</div>
            <div className={styles.num}>{c.num}</div>
            <h3 className={styles.cardLabel}>{c.label}</h3>
            <p className={styles.cardDesc}>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
