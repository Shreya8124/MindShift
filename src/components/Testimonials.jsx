import styles from './Testimonials.module.css'

const testimonials = [
  {
    text: "We lost three senior engineers in one quarter. I had no data, no warning. MindMetric would have flagged the Engineering team's burnout score weeks earlier.",
    name: 'Riya Sharma',
    role: 'CTO, Series A Startup · Mumbai',
    color: '#8BAF88',
  },
  {
    text: "The manager dashboard changed how we run 1:1s. Instead of guessing how my team feels, I have actual signals. It's like having a pulse check every Monday morning.",
    name: 'Ankit Mehta',
    role: 'VP Engineering · Bangalore',
    color: '#D4845A',
  },
  {
    text: "We ran a pilot with 80 employees. Survey completion was 91% and three people proactively booked therapy for the first time ever. That's real culture change.",
    name: 'Priya Nair',
    role: 'Head of People, Fintech · Delhi',
    color: '#5C7A59',
  },
]

export default function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.label}>What Leaders Say</div>
      <h2 className={styles.title}>
        Mental health ROI<br />is now measurable
      </h2>

      <div className={styles.grid}>
        {testimonials.map(t => (
          <div className={styles.card} key={t.name}>
            <div className={styles.quote}>"</div>
            <p className={styles.text}>{t.text}</p>
            <div className={styles.author}>
              <div className={styles.avatar} style={{ background: t.color }}>
                {t.name[0]}
              </div>
              <div>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.role}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
