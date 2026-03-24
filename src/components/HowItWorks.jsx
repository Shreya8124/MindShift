import styles from './HowItWorks.module.css'

const steps = [
  {
    num: '1',
    title: 'Detect',
    desc: 'Weekly burnout surveys + passive engagement signals give you a real-time team health score — before anyone resigns.',
  },
  {
    num: '2',
    title: 'Understand',
    desc: 'The manager dashboard translates raw signals into team-level insights. No individual data exposed. Privacy-first by design.',
  },
  {
    num: '3',
    title: 'Respond',
    desc: 'Deploy therapy sessions, coaching, or workshops to the right teams — mapped directly to your specific risk areas.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how">
      <div className={styles.label}>How It Works</div>
      <h2 className={styles.title}>
        From signal to solution<br />in three steps
      </h2>

      <div className={styles.steps}>
        {steps.map((s, i) => (
          <div className={styles.step} key={s.num}>
            <div className={styles.stepNum}>{s.num}</div>
            <h3 className={styles.stepTitle}>{s.title}</h3>
            <p className={styles.stepDesc}>{s.desc}</p>
            {i < steps.length - 1 && <div className={styles.connector} />}
          </div>
        ))}
      </div>
    </section>
  )
}
