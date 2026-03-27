import useAnimatedNumber from '../hooks/useAnimatedNumber.js'
import styles from './Hero.module.css'

const teamData = [
  { name: 'Engineering', score: 78, color: '#E57373' },
  { name: 'Product', score: 52, color: '#FFB74D' },
  { name: 'Design', score: 41, color: '#81C784' },
  { name: 'Sales', score: 65, color: '#64B5F6' },
]
const avatarColors = ['#8BAF88', '#D4845A', '#5C7A59', '#C9A84C']

function StatCard({ num, suffix = '', label }) {
  const { count, ref } = useAnimatedNumber(num)
  return (
    <div className={styles.stat} ref={ref}>
      <div className={styles.statNum}>{count}{suffix}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bgCircle} style={{ width: 640, height: 640, top: -120, right: -80 }} />
      <div className={styles.bgCircle} style={{ width: 320, height: 320, bottom: 40, left: -120 }} />

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          B2B Workplace Intelligence
        </div>

        <h1 className={styles.heading}>
          Burnout is a <em>business problem.</em> We make it measurable.
        </h1>

        <p className={styles.sub}>
          MindMetric gives HR leaders and founders real-time visibility into team mental health —
          turning invisible stress into actionable retention strategy.
        </p>

        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={() => document.querySelector('#pricing').scrollIntoView({ behavior: 'smooth' })}>
            Get Early Access
          </button>
          <button className={styles.btnGhost} onClick={() => document.querySelector('#features').scrollIntoView({ behavior: 'smooth' })}>
            See the Dashboard →
          </button>
        </div>

        <div className={styles.stats}>
          <StatCard num={47} suffix="%" label="professionals cite workplace stress as #1 issue" />
          <StatCard num={7} suffix="L+" label="avg. cost replacing one mid-level employee (₹)" />
          <StatCard num={79} suffix="%" label="employees report moderate to high stress" />
        </div>
      </div>

      {/* Live Dashboard Preview */}
      <div className={styles.visual}>
        <div className={styles.dashCard}>
          <div className={styles.dashHeader}>
            <span className={styles.dashTitle}>Burnout Risk — Live</span>
            <span className={styles.dashBadge}>● Live</span>
          </div>

          {teamData.map((t, i) => (
            <div className={styles.teamRow} key={t.name}>
              <div className={styles.avatar} style={{ background: avatarColors[i] }}>
                {t.name[0]}
              </div>
              <span className={styles.teamName}>{t.name}</span>
              <div className={styles.burnBar}>
                <div
                  className={styles.burnFill}
                  style={{ width: `${t.score}%`, background: t.color }}
                />
              </div>
              <span className={styles.burnScore}>{t.score}</span>
            </div>
          ))}

          <div className={styles.miniMetrics}>
            <div>
              <div className={styles.metricLabel}>Avg. Engagement</div>
              <div className={styles.metricVal}>72%</div>
              <div className={styles.metricChange}>↑ +8% this week</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className={styles.metricLabel}>Sessions Used</div>
              <div className={styles.metricVal}>34</div>
              <div className={styles.metricChange}>of 50 this month</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
