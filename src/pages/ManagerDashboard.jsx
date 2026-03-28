import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ManagerDashboard.module.css'

// ── Static data ──────────────────────────────────────────────
const company = { name: 'Acme Technologies', plan: 'Platinum', employees: 148, since: 'Jan 2025' }

const teamHealth = [
  { dept: 'Engineering',  score: 72, risk: 'High',     burnout: 79, sessions: 34, trend: -3  },
  { dept: 'Sales',        score: 61, risk: 'High',     burnout: 68, sessions: 22, trend: +2  },
  { dept: 'Product',      score: 54, risk: 'Moderate', burnout: 51, sessions: 18, trend: +5  },
  { dept: 'Design',       score: 41, risk: 'Low',      burnout: 38, sessions: 9,  trend: +8  },
  { dept: 'Operations',   score: 58, risk: 'Moderate', burnout: 55, sessions: 14, trend: -1  },
  { dept: 'HR',           score: 44, risk: 'Low',      burnout: 40, sessions: 7,  trend: +4  },
  { dept: 'Finance',      score: 50, risk: 'Moderate', burnout: 46, sessions: 11, trend: +3  },
  { dept: 'Marketing',    score: 38, risk: 'Low',      burnout: 34, sessions: 6,  trend: +6  },
]

const monthlyTrend = [
  { month: 'Sep', stress: 74, engagement: 52 },
  { month: 'Oct', stress: 71, engagement: 55 },
  { month: 'Nov', stress: 75, engagement: 51 },
  { month: 'Dec', stress: 69, engagement: 58 },
  { month: 'Jan', stress: 67, engagement: 61 },
  { month: 'Feb', stress: 63, engagement: 65 },
  { month: 'Mar', stress: 59, engagement: 69 },
]

const sessionStats = [
  { label: 'Total Sessions Booked', value: '121', change: '+18% vs last month', up: true },
  { label: 'Avg Session Rating',    value: '4.7★', change: '+0.2 vs last month', up: true },
  { label: 'Employees Engaged',     value: '89',   change: '60% of workforce', up: true },
  { label: 'Avg Burnout Score',     value: '54',   change: '-6 pts since Jan', up: true },
]

const supportBreakdown = [
  { type: 'Therapy Sessions',     count: 56, pct: 46, color: '#5C7A59' },
  { type: 'Coaching Sessions',    count: 31, pct: 26, color: '#D4845A' },
  { type: 'Peer Support Groups',  count: 22, pct: 18, color: '#C9A84C' },
  { type: 'Workshops Attended',   count: 12, pct: 10, color: '#64B5F6' },
]

const alerts = [
  { icon: '🔥', dept: 'Engineering',  msg: 'Burnout score 72 — 18% above company average. Recommend immediate manager 1:1 program.', severity: 'high' },
  { icon: '⚠️', dept: 'Sales',        msg: 'Stress trending up for 3rd consecutive week. Consider workload audit.', severity: 'medium' },
  { icon: '✅', dept: 'Design',        msg: 'Burnout score improved by 12 pts after last month\'s workshop. Great progress!', severity: 'positive' },
]

const topRoi = [
  { metric: 'Estimated Attrition Prevented', value: '4 employees', saved: '₹28L saved' },
  { metric: 'Productivity Recovery',         value: '+11%',         saved: 'vs Q4 2024' },
  { metric: 'Absenteeism Reduction',         value: '-23%',         saved: 'sick days' },
  { metric: 'eNPS Score',                    value: '+34 pts',      saved: 'Jan → Mar' },
]

const riskColor = { High: '#E57373', Moderate: '#FFB74D', Low: '#81C784' }
const riskBg    = { High: '#fdecea', Moderate: '#fff8e1', Low: '#f0f9f0' }

// ── Sparkline bar chart (inline SVG) ─────────────────────────
function MiniTrendChart({ data }) {
  const max = Math.max(...data.map(d => d.stress))
  const w = 160, h = 40, pad = 4
  const pts = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = h - pad - ((d.stress / max) * (h - pad * 2))
    return `${x},${y}`
  })
  const stressLine = pts.join(' ')

  const pts2 = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = h - pad - ((d.engagement / 100) * (h - pad * 2))
    return `${x},${y}`
  })

  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <polyline points={stressLine} fill="none" stroke="#E57373" strokeWidth="2" strokeLinejoin="round" />
      <polyline points={pts2.join(' ')} fill="none" stroke="#5C7A59" strokeWidth="2" strokeLinejoin="round" strokeDasharray="4,2" />
    </svg>
  )
}

// ── Donut chart (inline SVG) ─────────────────────────────────
function DonutChart({ data }) {
  const size = 120, r = 44, cx = 60, cy = 60
  const circumference = 2 * Math.PI * r
  let offset = 0
  const slices = data.map(d => {
    const dash = (d.pct / 100) * circumference
    const gap  = circumference - dash
    const slice = { ...d, dash, gap, offset }
    offset += dash
    return slice
  })
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f0f0" strokeWidth="18" />
      {slices.map((s, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={s.color}
          strokeWidth="18"
          strokeDasharray={`${s.dash} ${s.gap}`}
          strokeDashoffset={-s.offset + circumference * 0.25}
          style={{ transition: 'all 0.5s ease' }}
        />
      ))}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="#2A2A2A">121</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="#6B6360">sessions</text>
    </svg>
  )
}

export default function ManagerDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className={styles.page}>
      {/* ── SIDEBAR ───────────────────────────── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>Mind<span>Shift</span></div>

        <nav className={styles.sideNav}>
          {[
            { id: 'overview',  icon: '🏠', label: 'Overview' },
            { id: 'teams',     icon: '👥', label: 'Team Health' },
            { id: 'sessions',  icon: '🧘', label: 'Sessions' },
            { id: 'roi',       icon: '📈', label: 'ROI Insights' },
          ].map(item => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeTab === item.id ? styles.navActive : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarPlan}>
          <div className={styles.planBadge}>💎 {company.plan}</div>
          <div className={styles.planInfo}>{company.employees} employees</div>
          <div className={styles.planInfo}>Since {company.since}</div>
        </div>

        <button className={styles.logoutBtn} onClick={() => navigate('/login')}>
          ← Log Out
        </button>
      </aside>

      {/* ── MAIN CONTENT ──────────────────────── */}
      <main className={styles.main}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>
              {activeTab === 'overview'  && 'Company Overview'}
              {activeTab === 'teams'     && 'Team Health Scores'}
              {activeTab === 'sessions'  && 'Session Analytics'}
              {activeTab === 'roi'       && 'ROI & Business Impact'}
            </h1>
            <p className={styles.pageSub}>{company.name} · Updated March 2025</p>
          </div>
          <div className={styles.topBarRight}>
            <div className={styles.adminPill}>
              <span>👤</span>
              <span>Priya Nair, HR Head</span>
            </div>
          </div>
        </div>

        {/* ═══ OVERVIEW TAB ═══════════════════ */}
        {activeTab === 'overview' && (
          <div className={styles.tabContent}>
            {/* KPI row */}
            <div className={styles.kpiGrid}>
              {sessionStats.map(s => (
                <div className={styles.kpiCard} key={s.label}>
                  <div className={styles.kpiVal}>{s.value}</div>
                  <div className={styles.kpiLabel}>{s.label}</div>
                  <div className={`${styles.kpiChange} ${s.up ? styles.up : styles.down}`}>
                    {s.up ? '↑' : '↓'} {s.change}
                  </div>
                </div>
              ))}
            </div>

            {/* Trend + Alerts */}
            <div className={styles.twoCol}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>Stress vs Engagement Trend</span>
                  <span className={styles.cardBadge}>Last 7 months</span>
                </div>
                <div className={styles.trendLegend}>
                  <span className={styles.legendItem} style={{color:'#E57373'}}>— Stress Score</span>
                  <span className={styles.legendItem} style={{color:'#5C7A59'}}>- - Engagement</span>
                </div>
                {/* Bar trend chart */}
                <div className={styles.barChart}>
                  {monthlyTrend.map(d => (
                    <div className={styles.barGroup} key={d.month}>
                      <div className={styles.barPair}>
                        <div className={styles.bar} style={{ height: `${d.stress}%`, background: '#E57373' }} title={`Stress: ${d.stress}`} />
                        <div className={styles.bar} style={{ height: `${d.engagement}%`, background: '#5C7A59' }} title={`Engagement: ${d.engagement}`} />
                      </div>
                      <div className={styles.barLabel}>{d.month}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>Alerts & Recommendations</span>
                  <span className={styles.cardBadge}>{alerts.length} active</span>
                </div>
                <div className={styles.alertList}>
                  {alerts.map(a => (
                    <div key={a.dept} className={`${styles.alertItem} ${styles[a.severity]}`}>
                      <span className={styles.alertIcon}>{a.icon}</span>
                      <div>
                        <div className={styles.alertDept}>{a.dept}</div>
                        <div className={styles.alertMsg}>{a.msg}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick dept snapshot */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Department Burnout Snapshot</span>
                <button className={styles.viewAll} onClick={() => setActiveTab('teams')}>View full report →</button>
              </div>
              <div className={styles.deptGrid}>
                {teamHealth.map(t => (
                  <div className={styles.deptCard} key={t.dept}>
                    <div className={styles.deptName}>{t.dept}</div>
                    <div className={styles.deptScore} style={{ color: riskColor[t.risk] }}>{t.score}</div>
                    <div className={styles.deptRiskPill} style={{ background: riskBg[t.risk], color: riskColor[t.risk] }}>
                      {t.risk}
                    </div>
                    <div className={styles.burnBarWrap}>
                      <div className={styles.burnBarFill} style={{ width: `${t.score}%`, background: riskColor[t.risk] }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ TEAM HEALTH TAB ════════════════ */}
        {activeTab === 'teams' && (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Team Health — Full Report</span>
                <span className={styles.cardBadge}>March 2025</span>
              </div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {['Department','Burnout Score','Risk Level','Burnout Rate','Sessions Used','MoM Trend'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {teamHealth.map((t, i) => (
                    <tr key={t.dept} className={i % 2 === 0 ? styles.rowEven : ''}>
                      <td className={styles.deptCell}>{t.dept}</td>
                      <td>
                        <div className={styles.scoreWrap}>
                          <div className={styles.tableBurnBar}>
                            <div style={{ width: `${t.score}%`, background: riskColor[t.risk], height: '100%', borderRadius: 100 }} />
                          </div>
                          <span className={styles.scoreNum}>{t.score}</span>
                        </div>
                      </td>
                      <td>
                        <span className={styles.riskPill} style={{ background: riskBg[t.risk], color: riskColor[t.risk] }}>
                          {t.risk}
                        </span>
                      </td>
                      <td>{t.burnout}%</td>
                      <td>{t.sessions}</td>
                      <td className={t.trend < 0 ? styles.trendBad : styles.trendGood}>
                        {t.trend > 0 ? `↓ -${t.trend}` : `↑ +${Math.abs(t.trend)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.tableNote}>
                ℹ️ Burnout Score: 0–40 Low · 41–60 Moderate · 61–100 High risk. Trend shows stress change vs last month.
              </div>
            </div>
          </div>
        )}

        {/* ═══ SESSIONS TAB ═══════════════════ */}
        {activeTab === 'sessions' && (
          <div className={styles.tabContent}>
            <div className={styles.twoCol}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>Support Type Breakdown</span>
                  <span className={styles.cardBadge}>121 total</span>
                </div>
                <div className={styles.donutWrap}>
                  <DonutChart data={supportBreakdown} />
                  <div className={styles.donutLegend}>
                    {supportBreakdown.map(s => (
                      <div key={s.type} className={styles.donutLegendItem}>
                        <span className={styles.donutDot} style={{ background: s.color }} />
                        <span className={styles.donutType}>{s.type}</span>
                        <span className={styles.donutCount}>{s.count}</span>
                        <span className={styles.donutPct}>{s.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>Session KPIs</span>
                </div>
                <div className={styles.sessionKpis}>
                  {[
                    { label: 'Sessions This Month', val: '121', icon: '🧘' },
                    { label: 'Avg Rating',          val: '4.7 / 5', icon: '⭐' },
                    { label: 'Completion Rate',     val: '91%', icon: '✅' },
                    { label: 'Repeat Users',        val: '67%', icon: '🔁' },
                    { label: 'Plan Limit Used',     val: '121 / ∞', icon: '💎' },
                    { label: 'Next Workshop',       val: 'Apr 12', icon: '📅' },
                  ].map(k => (
                    <div className={styles.sessionKpi} key={k.label}>
                      <span className={styles.sessionKpiIcon}>{k.icon}</span>
                      <div>
                        <div className={styles.sessionKpiVal}>{k.val}</div>
                        <div className={styles.sessionKpiLabel}>{k.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Monthly Session Volume</span>
              </div>
              <div className={styles.barChart} style={{ height: 140 }}>
                {[
                  { month: 'Sep', val: 28 }, { month: 'Oct', val: 35 }, { month: 'Nov', val: 41 },
                  { month: 'Dec', val: 38 }, { month: 'Jan', val: 67 }, { month: 'Feb', val: 98 },
                  { month: 'Mar', val: 121 },
                ].map(d => (
                  <div className={styles.barGroup} key={d.month}>
                    <div className={styles.barSingle}>
                      <div className={styles.barLabel2}>{d.val}</div>
                      <div className={styles.bar} style={{ height: `${(d.val / 121) * 100}%`, background: '#5C7A59' }} />
                    </div>
                    <div className={styles.barLabel}>{d.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ ROI TAB ════════════════════════ */}
        {activeTab === 'roi' && (
          <div className={styles.tabContent}>
            <div className={styles.roiHero}>
              <div className={styles.roiHeroInner}>
                <div className={styles.roiEmoji}>💰</div>
                <div className={styles.roiHeading}>Estimated ROI This Quarter</div>
                <div className={styles.roiBigNum}>₹31.4L</div>
                <div className={styles.roiSub}>vs ₹7.4L investment in MindShift (Platinum Plan · 148 employees)</div>
              </div>
              <div className={styles.roiMultiple}>4.2× Return</div>
            </div>

            <div className={styles.roiGrid}>
              {topRoi.map(r => (
                <div className={styles.roiCard} key={r.metric}>
                  <div className={styles.roiMetric}>{r.metric}</div>
                  <div className={styles.roiValue}>{r.value}</div>
                  <div className={styles.roiSaved}>{r.saved}</div>
                </div>
              ))}
            </div>

            <div className={styles.twoCol}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>Cost of Attrition Avoided</span>
                </div>
                <div className={styles.calcTable}>
                  {[
                    ['Employees at high burnout risk', '18'],
                    ['Estimated would have left', '4'],
                    ['Avg cost to replace (mid-level)', '₹7L'],
                    ['Total attrition cost avoided', '₹28L'],
                    ['MindShift investment (quarterly)', '₹3.7L'],
                    ['Net saving', '₹24.3L'],
                  ].map(([label, val]) => (
                    <div className={styles.calcRow} key={label}>
                      <span>{label}</span>
                      <span className={styles.calcVal}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>Plan Summary — Platinum</span>
                </div>
                <div className={styles.planSummary}>
                  <div className={styles.planSumMedal}>💎</div>
                  <div className={styles.planSumName}>Platinum Plan</div>
                  <div className={styles.planSumPrice}>₹600 <span>/ emp / month</span></div>
                  <ul className={styles.planSumFeatures}>
                    {['Unlimited therapy + coaching','Advanced behavioural analytics','Dedicated therapist pool','Custom workshops','Executive coaching','White-label ready'].map(f => (
                      <li key={f}><span>✓</span>{f}</li>
                    ))}
                  </ul>
                  <button className={styles.upgradeCta} onClick={() => navigate('/signup/platinum')}>
                    Renew / Upgrade Plan →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
