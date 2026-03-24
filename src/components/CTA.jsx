import styles from './CTA.module.css'

export default function CTA() {
  return (
    <section className={styles.section} id="cta">
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Ready to get started?</div>
        <h2 className={styles.title}>
          Your team's burnout is<br />already costing you.
        </h2>
        <p className={styles.sub}>
          Start with a free 30-day pilot. Full dashboard access. No commitment. No credit card.
        </p>
        <div className={styles.actions}>
          <button
            className={styles.btnWhite}
            onClick={() => document.querySelector('#pricing').scrollIntoView({ behavior: 'smooth' })}
          >
            Start Free Pilot
          </button>
          <button className={styles.btnOutline}>
            Talk to Founders
          </button>
        </div>
        <div className={styles.trust}>
          <span>🔒 HIPAA-aligned</span>
          <span>·</span>
          <span>🇮🇳 India-first</span>
          <span>·</span>
          <span>🧾 Cancel anytime</span>
          <span>·</span>
          <span>👥 Employee data never sold</span>
        </div>
      </div>
    </section>
  )
}
