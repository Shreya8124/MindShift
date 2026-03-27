import styles from './Footer.module.css'

const cols = [
  {
    title: 'Product',
    links: ['Burnout Detection', 'Manager Dashboard', 'Employee Support', 'Workshops', 'Integrations'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Blog', 'Careers', 'Press Kit', 'Investors'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Case Studies', 'ROI Calculator', 'Security', 'Status'],
  },
  {
    title: 'Connect',
    links: ['hello@metric.in', 'LinkedIn', 'Twitter / X', 'Book a Demo', 'Partner Program'],
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.brandName}>
            Mind<span>Shift</span>
          </div>
          <p className={styles.brandDesc}>
            Workplace mental health intelligence for companies that care about retention,
            productivity, and people.
          </p>
          <div className={styles.pill}>🇮🇳 Made in India</div>
        </div>

        <div className={styles.cols}>
          {cols.map(col => (
            <div className={styles.col} key={col.title}>
              <h5 className={styles.colTitle}>{col.title}</h5>
              <ul className={styles.colLinks}>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2025 MindMetric Technologies Pvt. Ltd. All rights reserved.</span>
        <div className={styles.legal}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Data Security</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  )
}
