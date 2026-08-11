# Day 2 — ApexaiQ Architecture & Data Flow

Research into how ApexaiQ actually works end-to-end — how data gets from a customer's network into the ApexaiQ dashboard, and how it's enriched and displayed.

[ApexaiQ Flow of Data](../../assets/apexaiq-data-flow.jpeg)

## The 9-Step Data Flow

| # | Component | What It Does |
|---|---|---|
| 1 | **Security Tools** (in Your Network) | Existing tools you already run (EDR, IAM, vulnerability scanners, etc.) inside your own network |
| 2 | **ApexaiQ Collector** | A lightweight component deployed inside your network, behind your firewall, that talks to those security tools |
| — | **Accelerator** (blue arrow, 1→2) | Pulls data *from* your security tools *into* the Collector |
| — | **Integration** (green arrow, 2→1) | Pushes data/actions back *out* to your security tools (e.g., triggering a remediation) |
| 3 | **Raw Feed → Pre Feed Rules** | The Collector sends a raw data feed out through the firewall; automatic rules clean/normalize it before it reaches the dashboard |
| 4 | **ApexaiQ Dashboard (SaaS) → Post Feed Rules** | The core cloud platform processes the data, then automatic rules route the "Processed Feed" onward |
| 5, 6, 7 | **Devices, Users, Software** | The processed feed is sorted into these three asset categories — the actual inventory buckets |
| 8 | **Enrich Rules / Your Input** | You can manually add context (ownership, criticality, business info) that enriches the Devices records |
| 9 | **Integration** (label) | Ties back to the bidirectional loop at steps 1–2 |

## Key Takeaway: Refining the "Agentless" Claim

Earlier research (Day 1) described ApexaiQ as fully agentless in the sense of *zero footprint anywhere*. This diagram adds an important nuance:

- **"Agentless" still means no agent on every individual endpoint** — no software installed on each laptop/server/device. That holds up.
- **But there is one lightweight Collector deployed per customer network**, sitting behind the firewall, that talks to existing security tools and relays data out to the SaaS dashboard.


