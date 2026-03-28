import styles from './Market.module.css'

const markets = [
  {
    acronym: 'TAM',
    full: 'Total Addressable Market',
    value: '₹1.68L Cr',
    cagr: '↑ 28.6% CAGR',
    type: 'tam',
    desc: "India's entire mental health market, valued at ~$2B in 2023 and projected to reach $62B+ by 2032. Includes therapy, psychiatry, digital platforms, and workplace wellness. The WHO estimates $1.03 trillion in economic losses from mental health in India between 2012–2030, signalling massive unmet demand.",
  },
  {
    acronym: 'SAM',
    full: 'Serviceable Addressable Market',
    value: '₹18,500 Cr',
    cagr: '↑ 22% CAGR',
    type: 'sam',
    desc: 'Corporate / workplace wellness segment in India. ~65,000 registered startups and SMEs with 50–500 employees. At ₹300/employee/month across 12 months, even 5% market penetration represents an ₹18,500+ Cr opportunity. Corporate mental health is the fastest-growing sub-segment nationally.',
  },
  {
    acronym: 'SOM',
    full: 'Serviceable Obtainable Market',
    value: '₹150–300 Cr',
    cagr: 'Year 3–5 Target',
    type: 'som',
    desc: 'Realistic capture target: 300–500 startups at 150 employees average on the Gold plan. ₹350 × 150 × 12 × 400 companies = ₹252 Cr ARR. Achievable via LinkedIn outreach, founder networks, and warm HR referrals — without mass marketing spend.',
  },
]

const formulaRows = [
  { label: '10 companies × 150 emp × ₹350 × 12 months', value: '₹6.3 Cr ARR' },
  { label: '50 companies × 150 emp × ₹350 × 12 months', value: '₹31.5 Cr ARR' },
  { label: '400 companies × 150 emp × ₹350 × 12 months', value: '₹252 Cr ARR' },
]

export default function Market() {
  return (
    <section className={styles.section} id="market">
      <div className={styles.label}>Market Opportunity</div>
      <h2 className={styles.title}>TAM · SAM · SOM</h2>
      <p className={styles.sub}>
        India's mental health market is structurally underserved and digitally accelerating.
        Here's exactly where we play.
      </p>

      <div className={styles.grid}>
        {markets.map(m => (
          <div className={`${styles.card} ${styles[m.type]}`} key={m.acronym}>
            <div className={styles.acronym}>{m.acronym}</div>
            <div className={styles.full}>{m.full}</div>
            <div className={styles.value}>{m.value}</div>
            <div className={styles.cagr}>{m.cagr}</div>
            <p className={styles.desc}>{m.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.note}>
        <h4 className={styles.noteTitle}>📐 Revenue Model Proof — Gold Plan</h4>
        <p className={styles.noteSub}>
          Simple math that shows scalability without complexity. Low CAC via B2B entry → company pays → employees trust brand → B2C expansion later.
        </p>
        <div className={styles.formulaTable}>
          {formulaRows.map(r => (
            <div className={styles.formulaRow} key={r.label}>
              <span className={styles.formulaLabel}>{r.label}</span>
              <span className={styles.formulaValue}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
