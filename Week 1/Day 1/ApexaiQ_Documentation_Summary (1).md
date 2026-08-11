# ApexaiQ — Guide

### 1.1 What is ApexaiQ?
ApexaiQ is a **cloud-based IT Asset Management (ITAM) + Cybersecurity platform**. It gives organizations a unified dashboard to track and manage every IT asset in one place — improving visibility, security hygiene, compliance, and overall cybersecurity posture.

### 1.2 Why Agentless?
ApexaiQ doesn't require installing software agents on every device.

**Benefits:**
- No performance impact on endpoints
- Faster deployment (no rollout delays)
- Less ongoing maintenance
- Fewer security concerns from third-party agent software

This makes it scalable and lightweight — well suited to large, dynamic IT environments.

### 1.3 True SaaS Delivery
Because it's agentless and cloud-hosted, ApexaiQ is a **True SaaS** platform — built for the cloud, delivered entirely over the internet, no local infrastructure needed.

**Key characteristics:**
1. **Multi-tenancy** — one instance serves many customers, with strict data isolation
2. **No on-prem installation** — accessed via browser only
3. **Automatic updates** — vendor manages all patches/upgrades
4. **Subscription pricing** — predictable billing
5. **Scalability** — resources scale on demand
6. **Accessibility** — works from any internet-connected device (remote/hybrid friendly)

**Benefits for organizations:** lower IT costs, faster deployment, vendor-managed security/compliance, high availability via cloud redundancy.

---

## 2. Industry Problems ApexaiQ Solves

### 2.1 Complex, Distributed IT Environments
**Problem:** Employees now work from home, multiple offices, cloud (AWS/Azure/GCP), VMs, mobile & IoT devices, and third-party SaaS apps — assets are scattered, not centralized.
**Why it matters:** IT can't easily answer "how many devices exist," "who owns them," "are they secure," "is there unauthorized hardware on the network."
**Example:** A company with 800 office laptops + 300 WFH laptops + 150 cloud servers + 75 VMs + 120 network devices + 60 SaaS apps — impossible to track manually.
**ApexaiQ fix:** Auto-discovers all assets and shows device details, OS, software, ownership, location, security status, and health in one dashboard.

### 2.2 Obsolescence & Outdated Systems
**Problem:** Old hardware/software (e.g. Windows 7, Server 2012, expired AV) stops getting security patches, becomes an easy attacker target, and drives up maintenance cost.
**Example:** A company still running Server 2012 after support ends risks unpatched malware exposure and compliance violations.
**ApexaiQ fix:** Continuously monitors lifecycle status, flags EOL/EOS software and aging hardware before they become risks.

### 2.3 Compliance Challenges (HIPAA, GDPR, ISO 27001, etc.)
**Problem:** Orgs must prove every device is secure, data is protected, software is licensed, and systems are patched — manually gathering this evidence is slow and error-prone.
**Example:** A hospital audit requires proof that medical devices are patched and patient data is encrypted.
**ApexaiQ fix:** Maintains detailed records (patch status, versions, ownership, config) and auto-generates audit-ready compliance reports.

### 2.4 Cybersecurity Risk from Poor Visibility / Asset Sprawl
**Problem:** Unauthorized software, forgotten cloud servers, unused VMs, personal devices, and shadow IT expand the attack surface — security teams can't protect what they don't know exists.
**Example:** A forgotten test cloud server with outdated software sits exposed for months and gets exploited.
**ApexaiQ fix:** Continuously discovers and monitors assets, surfaces unmanaged devices and unauthorized software, prioritizes high-risk items.

### 2.5 Audit Challenges Without Centralized Reporting
**Problem:** Asset data lives across spreadsheets, AV dashboards, cloud portals, and manual records — pulling it together for an audit can take weeks.
**Example:** An auditor asks for "every Windows 10 laptop unpatched in 90 days" — hard to answer without a single source of truth.
**ApexaiQ fix:** Consolidates everything into real-time dashboards, automated compliance reports, and searchable historical asset data.

### 2.6 Technical Debt from Manual Processes
**Problem:** Manually updating spreadsheets, checking devices one-by-one, and preparing audit reports by hand consumes IT time and introduces errors.
**Example:** A 3,000-laptop company spends weeks manually verifying patch status — and the data is still inaccurate.
**ApexaiQ fix:** Automates discovery, inventory updates, vulnerability detection, patch monitoring, and risk scoring — freeing IT for strategic work.

### 2.7 Summary Table

| Problem | ApexaiQ's Solution |
|---|---|
| Complex/distributed IT | Auto-discovery + central dashboard |
| Obsolescence | Flags EOL/EOS/outdated assets |
| Compliance | Tracks status, generates audit-ready reports |
| Asset sprawl / cyber risk | Continuous discovery, flags unmanaged assets |
| Audit challenges | Centralized real-time reporting |
| Technical debt | Automates manual ITAM work |

---

## 3. IT Asset Management (ITAM)

**Definition:** The process of tracking, managing, and optimizing IT assets (hardware, software, licenses) across their full lifecycle, from purchase to retirement.

**Why companies need it:** better visibility, lower security risk, license compliance, cost optimization, audit readiness.

**Key goals:** Asset Visibility, Cost Optimization, Risk Reduction, Compliance, Lifecycle Management.

**Lifecycle stages:**
1. Planning (requirements & budget)
2. Procurement (purchase/lease)
3. Deployment (install & configure)
4. Usage & Maintenance (monitor, update)
5. Upgrade or Replacement
6. Retirement & Disposal (secure data wipe)

**Why companies need ITAM software:** centralized tracking, real-time visibility, simplified audits, better budgeting/forecasting, improved security.

---

## 4. Competitors & Differentiation

### 4.1 At a Glance

| Competitor | Key Focus | Notes |
|---|---|---|
| **Axonius** | Cyber Asset Attack Surface Management (CAASM) | Strong asset visibility & risk exposure |
| **Balbix** | Risk-based vulnerability management | Predictive AI risk scoring |
| **Armis** | OT/IoT security | Specializes in unmanaged/IoT devices |
| **Lansweeper** | Traditional asset discovery | Basic compliance/security tracking |

**ApexaiQ's edge:** agentless deployment + a single unified dashboard + risk-based prioritization, all in one platform.

### 4.2 Detailed Comparison

- **Axonius** — Strong on CAASM/visibility via integrations; ApexaiQ additionally covers lifecycle management, obsolescence tracking, and asset hygiene.
- **Armis** — Best for agentless IoT/OT/medical device security; ApexaiQ focuses more broadly on enterprise IT, compliance, and lifecycle.
- **Balbix** — AI-driven risk scoring and vulnerability prioritization; ApexaiQ combines ITAM + cybersecurity + compliance + lifecycle in one place.
- **ServiceNow** — Primarily ITSM with ITAM bolted on; ApexaiQ is built around AI-powered visibility, security, and risk.
- **ManageEngine** — Broad IT/endpoint management suite; ApexaiQ emphasizes AI insight, agentless discovery, and cybersecurity depth.

### 4.3 One-Line Summary
- **ApexaiQ:** AI-powered ITAM + Cybersecurity + Compliance + Lifecycle Management
- **Axonius:** Best for CAASM/visibility
- **Armis:** Best for IoT/OT security
- **Balbix:** Best for AI risk scoring
- **ServiceNow:** Best for ITSM/workflows
- **ManageEngine:** Best for endpoint/infrastructure management

---

## 5. Cybersecurity Overview

Cybersecurity protects computers, networks, applications, cloud systems, and data from attacks, theft, and unauthorized access — critical as businesses lean more on cloud, remote work, and IoT.

### 5.1 CIA Triad
- **Confidentiality** — only authorized users access data (encryption, auth, access controls)
- **Integrity** — data can't be modified without authorization (hashing, digital signatures)
- **Availability** — systems stay accessible (backups, disaster recovery, DDoS protection)

### 5.2 Common Threats
- **Malware** — viruses, worms, Trojans, spyware, ransomware
- **Ransomware** — encrypts data, demands payment
- **Phishing** — fraudulent messages tricking users into revealing info
- **Insider Threats** — risk from employees/contractors (intentional or accidental)
- **Zero-Day Attacks** — exploit flaws before patches exist
- **DDoS** — floods servers to make services unavailable

### 5.3 Key Practices
- **Asset Visibility** — you can't secure what you can't see
- **Vulnerability Management** — identify, assess, prioritize, fix (using NVD/CVE)
- **Patch Management** — regular updates for security + stability + compliance
- **Zero Trust** — "never trust, always verify," even inside the network
- **CAASM** — centralized view of all cyber assets
- **SOAR** — automates security operations & response
- **Auto-remediation** — auto-fixes missing patches, infections, unauthorized software
- **AI's role** — detects anomalies, prioritizes vulnerabilities, predicts attacks

### 5.4 Compliance in Cybersecurity
Standards like **HIPAA** (healthcare), **GDPR** (privacy), **ISO 27001** (info security), and **CISA** guidelines require secure systems, regular updates, controlled access, and documented security measures.

### 5.5 Why ITAM Matters for Cybersecurity
Accurate asset inventory lets orgs discover connected devices, monitor health, spot outdated systems, track licenses, and prioritize risk. ApexaiQ ties ITAM + cybersecurity together via real-time discovery, vulnerability monitoring, compliance tracking, and AI risk scoring.

### 5.6 Benefits of Cybersecurity
Protects sensitive data, prevents financial loss, reduces downtime, improves compliance/trust, supports business continuity.

---

## 6. Core Concepts & Terminology

### 6.1 ApexaiQ Score
A **60–160** score measuring asset health, security hygiene, and compliance. Higher = better visibility, lower risk.
**Factors:** asset coverage, vulnerabilities, obsolescence, compliance, maintenance quality, configuration health.
**Why it matters:** quick posture snapshot, prioritizes risk areas, tracks improvement, supports audits.

### 6.2 Vulnerabilities
A weakness attackers can exploit.
**Types:** software bugs, hardware/design flaws, misconfigurations (open ports, weak passwords), zero-days.
**Process:** Identify → Assess → Prioritize → Remediate → Monitor.
Catalogued via **CVE** IDs, scored by severity using **CVSS**.

### 6.3 Obsolescence
An asset becomes outdated/unsupported.
**Types:** technological, planned (vendor pushes new versions), functional, EOL/EOS.
**Risks:** unpatched vulnerabilities, compliance violations, incompatibility, higher maintenance cost.

### 6.4 Compliance
Following laws/standards to protect data and IT assets.

| Standard | Focus |
|---|---|
| HIPAA | Healthcare data |
| GDPR | EU personal data privacy |
| ISO 27001 | Information security management |
| PCI-DSS | Card transaction security |
| SOC 2 | Trust/security controls for service orgs |
| CISA/CISO | US gov't cybersecurity frameworks |

### 6.5 Maintenance
Keeping assets updated, secure, functional.
**Types:** Preventive, Corrective, Adaptive, Perfective.

### 6.6 EOL / EOS / EOM

| Term | Meaning |
|---|---|
| End of Life (EOL) | Manufacturer stops selling it |
| End of Support (EOS) | No more technical support, bug fixes, or security updates |
| End of Maintenance (EOM) | No patches even for critical issues — considered obsolete for secure use |

*Example: Windows 7 hit EOS Jan 14, 2020 — orgs had to upgrade to stay secure/compliant.*

### 6.7 Asset Hygiene
Keeping assets secure, updated, compliant, properly configured.
**Practices:** complete inventory, regular patching, configuration management, compliance checks, decommissioning.
**Crown Jewels:** an org's most business-critical assets (customer DBs, financial systems, IP) — need enhanced security and priority protection.

### 6.8 Inventory
A complete record of all assets.
**Types:** hardware, software, cloud, network inventory.
**Best practices:** automated discovery, tagging (owner/location/purpose), integration with patch/vuln management, marking Crown Jewels.

### 6.9 NVD (National Vulnerability Database)
NIST's public repository of disclosed vulnerabilities.
**Components:** CVE entries (unique IDs), CVSS scores (0–10):

| Severity | CVSS Range |
|---|---|
| Low | 0.1–3.9 |
| Medium | 4.0–6.9 |
| High | 7.0–8.9 |
| Critical | 9.0–10.0 |

### 6.10 Patch Management
Identifying, testing, and deploying updates.
**Process:** Inventory → Assess → Prioritize (by CVSS) → Test → Deploy → Verify → Document.
**Types:** security patches, bug fixes, feature updates, emergency hotfixes.

### 6.11 Data Breaches
Unauthorized access to sensitive data.
**Common causes:** phishing, weak/stolen passwords, malware, insider misuse, unpatched systems, misconfigured cloud storage.
**Notable examples:** Equifax (147M people, 2017), Yahoo (3B accounts, 2013–14), Capital One (100M customers, 2019 — cloud misconfig).
**Prevention:** MFA, encryption, patching, security training, network monitoring, DLP tools.

### 6.12 MSP (Managed Service Provider)
Third-party that remotely manages a client's IT infrastructure.
**Services:** network monitoring, cybersecurity, backup/DR, patching, help desk, cloud management.
**In cybersecurity:** integrates ITAM with security, tracks devices, ensures compliance, deploys patches at scale.

### 6.13 Device Types
Classifying hardware/endpoints for policy and tracking purposes.
**Categories:** Endpoints (desktops/laptops/mobile), Servers (physical/virtual/cloud), Networking gear (routers/firewalls), IoT (sensors/cameras), Peripherals (printers/storage), OT (industrial/manufacturing controllers).

### 6.14 True SaaS
Fully hosted, multi-tenant, browser-accessed software (see Section 1.3). Examples: Salesforce, Microsoft 365, Google Workspace, Zoom, Slack.

### 6.15 Inbound & Outbound Integration
- **Inbound** — data flows *in* (e.g. importing from Active Directory, NVD feeds, AWS/Azure/Intune discovery)
- **Outbound** — data flows *out* (e.g. alerts to Splunk/QRadar, tickets to ServiceNow/Jira, Slack/Teams notifications)

**Benefits:** centralized visibility, automation, better decisions, interoperability.

### 6.16 Perimeter
The boundary between trusted internal networks and the outside world.
- **Traditional:** firewalls, IDS/IPS, VPNs
- **Modern (Zero Trust):** identity- and device-based controls (IAM, EDR, MFA, micro-segmentation) — protects users/data wherever they are, not just the network edge.

### 6.17 ROI (Return on Investment)
`ROI = (Gain − Cost) ÷ Cost × 100%`
*Example: ₹20L spent, ₹35L saved → ROI = (35−20)/20 × 100 = 75%.*
Justifies tool investment, optimizes spending, guides IT budgets.

### 6.18 KPIs (Key Performance Indicators)

| KPI | Measures |
|---|---|
| MTTD | Time to detect an incident |
| MTTR | Time to respond/remediate |
| Patch Compliance Rate | % devices with up-to-date patches |
| Vulnerabilities Closed | Count fixed in a period |
| Asset Visibility % | % of total assets discovered/tracked |
| Compliance Score | Alignment with applicable regulations |

### 6.19 Auto-Remediation
Automatic detection + fixing of issues, no manual work.
**Process:** Detect → Decide → Act → Verify.
**Examples:** auto-patching, removing unauthorized apps, quarantining infected devices, disabling inactive accounts.

### 6.20 Network Protocols

| Category | Examples |
|---|---|
| Communication | HTTP/S, FTP/SFTP, SMTP/IMAP/POP3, WebSocket |
| Network Management | SNMP, ICMP, DHCP |
| Naming/Directory | DNS, LDAP |
| Security | SSL/TLS, IPSec, SSH |
| Routing | BGP, OSPF, RIP |
| Transport | TCP (reliable), UDP (fast/connectionless) |

*ApexaiQ uses HTTPS/TLS/SSH for secure comms and SNMP/ICMP for agentless discovery.*

### 6.21 Due Diligence
Thorough risk assessment before big IT decisions (new vendor, cloud provider, M&A, hiring an MSP).
**Evaluates:** risk, vendor security/compliance, asset verification, regulatory adherence, penetration testing, vendor financial stability.

### 6.22 SOAR (Security Orchestration, Automation, and Response)
Integrates security tools, automates repetitive tasks, speeds up incident response.
**Components:** Orchestration (connects SIEM/firewalls/endpoints), Automation (IP blocking, quarantine), Incident Response (standardized playbooks).

### 6.23 ITAM's Role in Zero Trust
1. Comprehensive asset visibility
2. Device authentication & authorization
3. Risk assessment & prioritization
4. Continuous policy enforcement/monitoring
5. Supports micro-segmentation

### 6.24 CAASM (Cyber Asset Attack Surface Management)
Real-time unified view of ALL cyber assets — known and unknown — across on-prem, cloud, and hybrid environments.

| Feature | Traditional ITAM | CAASM |
|---|---|---|
| Coverage | Known/managed only | + unmanaged & shadow IT |
| Focus | Inventory & lifecycle | Security & attack surface |
| Risk prioritization | Limited | Integrated with vulnerabilities |
| Visibility | Often siloed | Unified, real-time |

**In ApexaiQ:** agentless unified discovery + risk-based vulnerability prioritization + integrated compliance/remediation workflows.
