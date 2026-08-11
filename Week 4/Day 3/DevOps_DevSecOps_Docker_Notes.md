# DevOps, DevSecOps & Docker — Complete Notes

---

# PART 1: DevOps

## What is DevOps?

**DevOps = Dev (Development) + Ops (Operations)**

DevOps is a **culture + methodology + set of practices + tools** that helps teams build, test, deploy, and monitor software continuously. It is the bridge between **writing code** and **running that code reliably in production**.

**Without DevOps:**
- Developers write code; Operations deploy and maintain it separately
- Communication is slow
- Releases take weeks or months
- Bugs are difficult to fix

**With DevOps:**
- Development and Operations work together
- Everything is automated
- Software can be released multiple times a day
- Failures are detected and fixed quickly

### Traditional Process
```
Developer → Testing Team → Operations Team → Production
```
Problems: manual deployments, slow releases, human errors, environment mismatch, difficult rollbacks.

### DevOps Process
```
Developer → Automated Build → Automated Testing → Automated Deployment → Monitoring → Feedback
```
Everything is automated.

---

## Why Do We Need DevOps?

Imagine an app like Instagram, with millions of users uploading photos every minute and developers adding features daily.

**Without DevOps:**
```
Developer finishes feature → Email to Ops → Ops manually copies files
→ Application crashes → Manual rollback → Downtime
```
This could take hours.

**With DevOps:**
```
Developer pushes code → Pipeline starts automatically → Build → Test
→ Security Scan → Deploy → Monitor → Auto-rollback if needed
```
Deployment may finish in 5–10 minutes.

### Problems DevOps Solves
1. **Slow deployment** — releases go from once every 3 months to 20 times/day
2. **Manual errors** — copying files, restarting servers, configuring manually are all automated
3. **Environment issues** — "it works on my machine" vs production, solved using Docker
4. **Faster bug fixes** — bug found → fixed → pipeline runs → auto-deployed → users get the fix
5. **Better collaboration** — devs, ops, security, and testing work together throughout the lifecycle instead of in silos

---

## DevOps Lifecycle

Represented as an infinity loop:
```
Plan → Code → Build → Test → Release → Deploy → Operate → Monitor → Feedback → Plan Again
```
This repeats continuously.

---

## Stages of DevOps

| # | Stage | Purpose | Example / Output | Tools |
|---|-------|---------|-------------------|-------|
| 1 | **Planning** | Decide what to build | New login page, forgot password, dark mode → tasks, backlog, sprint planning | Jira, Azure DevOps Boards, Trello |
| 2 | **Coding** | Write code, store in Git | `git add .` → `git commit` → `git push` | Git, GitHub, GitLab, Bitbucket |
| 3 | **Build** | Source code becomes an executable app | Python: install libs → package app; Java: compile → JAR | Maven, Gradle, npm, pip |
| 4 | **Continuous Integration (CI)** | Every push triggers build → tests → quality check → security scan; stops on failure | — | Jenkins, GitHub Actions, GitLab CI, Azure Pipelines |
| 5 | **Testing** | Automated tests run | Unit, Integration, API, UI testing | PyTest, JUnit, Selenium, Cypress, Postman |
| 6 | **Containerization** | Package app with everything it needs | Docker image instead of manual server setup | Docker |
| 7 | **Release** | App is versioned and artifacts stored | v1.0, v1.1, v2.0 | Nexus, JFrog Artifactory, GitHub Packages |
| 8 | **Deployment (CD)** | App moves to production | Rolling, Blue-Green, Canary deployment | Kubernetes, Argo CD, Helm, Spinnaker |
| 9 | **Infrastructure (IaC)** | Servers described as code instead of created manually | Terraform `resource "aws_instance"` | Terraform, AWS CloudFormation, Pulumi |
| 10 | **Configuration Management** | Configure many servers automatically | Instead of logging into 100 servers manually | Ansible, Chef, Puppet |
| 11 | **Monitoring** | Track CPU, memory, errors, latency, requests | — | Prometheus, Grafana, Datadog, New Relic |
| 12 | **Logging** | Centralize logs instead of checking each server | — | ELK Stack, Loki, Splunk |
| 13 | **Feedback** | Errors, performance, user feedback go back to developers | — | — |

---

## How DevOps Works — Complete Workflow

```
Developer Writes Code
        ↓
   Push to Git
        ↓
 CI Pipeline Starts
        ↓
     Build App
        ↓
    Run Tests
        ↓
Security & Quality Scan
        ↓
 Create Docker Image
        ↓
Push Image to Registry
        ↓
Deploy to Kubernetes
        ↓
Monitor Application
        ↓
Collect Logs & Metrics
        ↓
Alert Developers if Issue
```

### Example: FastAPI App Deployed via DevOps
1. Write code in VS Code
2. Commit and push to GitHub
3. GitHub Actions workflow starts automatically
4. Dependencies installed (`pip install -r requirements.txt`)
5. Tests run with `pytest`
6. Docker image built from `Dockerfile`
7. Image pushed to a registry (Docker Hub / Amazon ECR)
8. Argo CD detects the new image version, updates the Kubernetes deployment
9. Kubernetes gradually replaces old containers with new ones (minimal downtime)
10. Prometheus collects metrics, Grafana visualizes them, logs are centralized
11. If issues occur, alerts fire and the release can be rolled back

---

## CI/CD Pipeline (in detail)

**CI/CD** stands for **Continuous Integration** and **Continuous Delivery/Deployment**. It's the automated pipeline that takes code from a developer's commit all the way to running in production, with no manual copying of files or manual server configuration along the way. This is the engine that makes DevOps's "release many times a day" possible.

### Continuous Integration (CI)

CI is the practice of merging code changes into a shared repository **frequently** (multiple times a day), with every merge automatically **built and tested**.

```
Developer pushes code
        ↓
Automated build triggers
        ↓
Automated tests run (unit, integration)
        ↓
Code quality / linting checks
        ↓
Security scan
        ↓
   Pass?  ── No ──▶ Pipeline fails, developer notified, code NOT merged/deployed
        ↓ Yes
Merge accepted / build artifact produced
```

**Why it matters:** without CI, bugs pile up silently until a big "integration day" where merging everyone's changes together becomes painful and error-prone ("integration hell"). With CI, every change is verified immediately, in isolation, so problems are caught within minutes of being introduced — while the context is still fresh in the developer's mind.

### Continuous Delivery vs Continuous Deployment (CD)

Both extend CI by automating what happens *after* the code passes tests, but they differ in one key step:

| | Continuous **Delivery** | Continuous **Deployment** |
|---|---|---|
| After tests pass | Build is automatically packaged and made **ready to release** | Build is **automatically released to production** |
| Final step | A human clicks "deploy" (manual approval gate) | No human approval needed — it ships itself |
| Use case | Regulated industries, or teams wanting a manual safety check | Mature pipelines with very high test confidence |

So **all Continuous Deployment is Continuous Delivery, but not vice versa** — Delivery always keeps a human in the loop for the final push to production; Deployment removes that last gate entirely.

### The Full CI/CD Pipeline

```
Developer Writes Code
        ↓
   Push to Git (GitHub/GitLab/Bitbucket)
        ↓
 CI Pipeline Triggers Automatically
        ↓
     Build the App
        ↓
   Run Automated Tests
        ↓
 Code Quality & Security Scans
        ↓
  Build Docker Image
        ↓
 Push Image to Registry (Docker Hub / ECR)
        ↓
 ── Continuous Delivery ──▶ Package ready, awaiting manual approval
        ↓ (approved)
 ── Continuous Deployment ──▶ Auto-deploy straight to production
        ↓
 Deploy to Kubernetes / Server
        ↓
 Monitor Application (Prometheus/Grafana)
        ↓
 Alert Developers if Issues Arise
        ↓
 Rollback Automatically if Needed
```

**Deployment strategies commonly used at the CD stage:**
- **Rolling deployment** — old instances are replaced by new ones gradually, a few at a time, so the app stays available throughout
- **Blue-Green deployment** — a full second ("green") environment is deployed alongside the current ("blue") one; traffic is switched over instantly once green is verified, and blue is kept as an instant rollback target
- **Canary deployment** — the new version is released to a small percentage of users first; if metrics look healthy, it's gradually rolled out to everyone

### Example CI/CD Pipeline for a FastAPI App (GitHub Actions)
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run tests
        run: pytest
      - name: Build Docker image
        run: docker build -t myapp:${{ github.sha }} .
      - name: Push to registry
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u myuser --password-stdin
          docker push myapp:${{ github.sha }}
      - name: Deploy
        run: kubectl set image deployment/myapp myapp=myapp:${{ github.sha }}
```
Every push to `main` automatically tests, builds, containerizes, and deploys the app — this is CI/CD in action.

### Popular CI/CD Tools
| Tool | Notes |
|---|---|
| Jenkins | Self-hosted, highly customizable, huge plugin ecosystem |
| GitHub Actions | Built into GitHub, YAML-based workflows |
| GitLab CI/CD | Built into GitLab |
| Azure DevOps Pipelines | Deep Azure/Microsoft ecosystem integration |
| CircleCI | Cloud-based, fast, popular for open source |
| Argo CD | GitOps-style continuous deployment for Kubernetes |

---



| Stage | Purpose | Popular Tools |
|-------|---------|----------------|
| Planning | Track work | Jira, Azure DevOps Boards, Trello |
| Source Control | Version control | Git, GitHub, GitLab, Bitbucket |
| Build | Compile/package | Maven, Gradle, npm, pip |
| CI | Automate build & tests | Jenkins, GitHub Actions, GitLab CI, Azure Pipelines |
| Testing | Verify quality | PyTest, JUnit, Selenium, Cypress, Postman |
| Code Quality | Static analysis | SonarQube, ESLint, Pylint |
| Security | Vulnerability scanning | Trivy, Snyk, OWASP ZAP |
| Containerization | Package apps | Docker |
| Container Registry | Store images | Docker Hub, Amazon ECR, Azure Container Registry, Google Artifact Registry |
| Orchestration | Manage containers | Kubernetes, OpenShift |
| Package Management | Kubernetes apps | Helm |
| CD | Automated deployments | Argo CD, Flux CD, Spinnaker |
| Infrastructure as Code | Provision infra | Terraform, AWS CloudFormation, Pulumi |
| Configuration Management | Configure servers | Ansible, Chef, Puppet |
| Monitoring | Metrics & dashboards | Prometheus, Grafana, Datadog |
| Logging | Centralized logs | ELK Stack, Loki, Splunk |
| Cloud Platforms | Infrastructure | AWS, Azure, Google Cloud |

---

## DevOps vs Traditional Development

| Traditional | DevOps |
|---|---|
| Manual deployments | Automated deployments |
| Infrequent releases | Frequent releases |
| Separate dev and ops teams | Shared responsibility and collaboration |
| Slow feedback | Continuous feedback |
| Manual testing | Automated testing |
| Manual infrastructure setup | Infrastructure as Code |
| Reactive monitoring | Continuous monitoring and alerting |
| High risk of deployment failures | Faster, safer, repeatable deployments |

---

# PART 2: DevSecOps

## What is DevSecOps?

**DevSecOps = Development + Security + Operations**

If DevOps answers *"How do we deliver software faster and more reliably?"*, DevSecOps answers *"How do we deliver software faster, reliably, and securely?"*

Instead of treating security as a final step before release, **DevSecOps integrates security into every stage of the DevOps lifecycle**. Security becomes everyone's responsibility, not just the security team's.

**Traditional (security at the end):**
```
Development → Testing → Operations → Security Review → Production
```
This delays releases and uncovers issues late.

**DevSecOps (security throughout):**
```
Plan → Code + Security → Build + Security Scan → Test + Security Tests
→ Deploy + Security Policies → Monitor + Threat Detection
```

---

## Why Do We Need DevSecOps?

**Without DevSecOps** (e.g. a banking app): code is deployed first, and only afterward does the security team test it — finding a critical SQL Injection vulnerability late, delaying deployment while the whole testing cycle repeats.

**With DevSecOps:** a security scan runs automatically as soon as code is written, vulnerabilities are caught within minutes, developers fix them immediately, and the pipeline continues safely.

### Problems DevSecOps Solves
1. **Late security detection** — automatic scans on every commit instead of a big review after 100,000 lines of code
2. **Manual security checks** — automation catches weak passwords, hardcoded API keys, SQL injection, XSS, vulnerable libraries
3. **Compliance** — automates checks for standards like PCI DSS, HIPAA, ISO 27001, SOC 2, GDPR
4. **Faster secure releases** — security testing becomes part of the pipeline instead of a blocking review

---

## DevSecOps Lifecycle
```
Plan → Code → Build → Security Scan → Test → Deploy → Monitor → Feedback
```

## Stages of DevSecOps

1. **Planning** — identify security requirements, compliance needs, threat models, risk assessment (e.g. encrypt passwords, HTTPS only, MFA, audit logs)
2. **Coding** — secure coding practices: input validation, parameterized SQL queries, proper authentication, no hardcoded secrets (use `os.getenv()` instead of hardcoding passwords)
3. **Source Code Security** — every commit is scanned for secrets and vulnerabilities; blocked if a key like an AWS secret is accidentally committed (Tools: GitHub Secret Scanning, Gitleaks, TruffleHog)
4. **Build** — dependency scanning, license checks, malware scanning; a build fails if a dependency has a known CVE
5. **Security Testing**
   - **SAST** (Static Application Security Testing) — scans source code without running it, for SQL injection, buffer overflows, weak encryption (SonarQube, Checkmarx, Semgrep)
   - **DAST** (Dynamic Application Security Testing) — attacks the running app like a hacker, checking broken auth, XSS, CSRF, headers (OWASP ZAP, Burp Suite)
   - **SCA** (Software Composition Analysis) — scans third-party libraries for known vulnerabilities (Snyk, Dependabot, Black Duck)
6. **Container Security** — Docker images scanned for vulnerable packages, outdated OS libraries, root user usage (Trivy, Clair, Grype)
7. **Infrastructure Security** — Infrastructure as Code (e.g. Terraform) scanned for public buckets, weak IAM policies, open ports, unencrypted storage (Checkov, tfsec, Terrascan)
8. **Deployment Security** — verify signed artifacts, enforce access control, apply Kubernetes security policies, least privilege (RBAC, Network Policies, Pod Security Standards, image signature verification)
9. **Runtime Monitoring** — watch for unauthorized access, suspicious logins, malware, data exfiltration (Falco, Microsoft Defender for Cloud, CrowdStrike, AWS GuardDuty)
10. **Feedback** — production attacks trigger alerts, which developers fix, run through the pipeline again, and deploy safely

---

## DevSecOps Pipeline

```
Developer Writes Code → Push to Git → Secret Scanning → SAST → SCA
→ Build Application → Build Docker Image → Container Security Scan
→ Deploy to Kubernetes → DAST → Runtime Monitoring → Alerts & Feedback
```

## Popular DevSecOps Tools

| Category | Purpose | Popular Tools |
|---|---|---|
| Version Control | Source code | Git, GitHub, GitLab |
| CI/CD | Pipeline automation | Jenkins, GitHub Actions, GitLab CI, Azure DevOps |
| Secret Scanning | Detect exposed credentials | GitHub Secret Scanning, Gitleaks, TruffleHog |
| SAST | Analyze source code | SonarQube, Semgrep, Checkmarx |
| DAST | Test running applications | OWASP ZAP, Burp Suite |
| SCA | Scan third-party dependencies | Snyk, Dependabot, Black Duck |
| Container Security | Scan Docker images | Trivy, Clair, Grype |
| IaC Security | Scan Terraform/CloudFormation | Checkov, tfsec, Terrascan |
| Kubernetes Security | Cluster security | Kubescape, Kyverno, OPA Gatekeeper |
| Runtime Security | Detect threats during execution | Falco, CrowdStrike, AWS GuardDuty |
| Secrets Management | Secure credentials | HashiCorp Vault, AWS Secrets Manager, Azure Key Vault |
| Monitoring | Metrics and dashboards | Prometheus, Grafana |
| Logging | Centralized logs | ELK Stack, Loki, Splunk |

## DevOps vs DevSecOps

| DevOps | DevSecOps |
|---|---|
| Focuses on speed and automation | Focuses on speed, automation, and security |
| Security often added later | Security integrated from the beginning ("shift left") |
| Builds and deploys software | Builds, secures, and deploys software |
| CI/CD pipeline | CI/CD pipeline with automated security checks |
| Reliability is a primary goal | Reliability and security are both primary goals |

---

# PART 3: Docker

## What is Docker?

Docker is a **containerization platform** that packages an application together with everything it needs to run — code, runtime, system libraries, and settings — into a single, portable unit called a **container**. A container runs the same way regardless of where it's deployed: a developer's laptop, a test server, or a production cloud environment.

## Why Do We Need Docker?

- **"It works on my machine" problem** — differences between dev, test, and production environments cause bugs that only show up in one place. Docker packages the exact environment along with the app, so it behaves identically everywhere.
- **Faster setup** — instead of manually installing a language runtime, libraries, and configuring a server, you just run a pre-built image.
- **Isolation** — each container runs independently, so one app's dependencies never conflict with another's on the same machine.
- **Lightweight and fast** — containers share the host OS kernel, so they start in seconds and use far less memory/disk than a full virtual machine.
- **Consistency across the pipeline** — the same Docker image moves through dev → test → staging → production, removing environment drift.
- **Easy scaling** — container orchestration tools (like Kubernetes) can spin up or tear down containers on demand.

---

## Docker Architecture

Docker uses a **client-server architecture**:

```
┌────────────────────┐        REST API / CLI        ┌─────────────────────────┐
│   Docker Client     │ ───────────────────────────▶ │      Docker Daemon       │
│  (docker CLI / GUI)  │                              │       (dockerd)          │
└────────────────────┘                              └───────────┬─────────────┘
                                                                 │
                                                      manages    │
                                     ┌───────────────────────────┼───────────────────────────┐
                                     ▼                            ▼                            ▼
                              Images                        Containers                    Networks/Volumes
                                     │
                                     ▼
                          Docker Registry (Docker Hub / private registry)
```

**Components:**
- **Docker Client** — the CLI or GUI (Docker Desktop) you use to type commands like `docker run`. It talks to the daemon via REST API.
- **Docker Daemon (`dockerd`)** — the background service that does the actual work: building images, running containers, managing networks and volumes. Runs on the host machine.
- **Docker Images** — read-only templates used to create containers, built in layers from a `Dockerfile`.
- **Docker Containers** — running (or stopped) instances of an image; the actual isolated process(es).
- **Docker Registry** — a storage/distribution service for images (Docker Hub is the public default; companies also run private registries like Amazon ECR, Azure Container Registry).
- **Docker Objects** — networks, volumes, and plugins that containers use for connectivity and persistent storage.

Docker uses OS-level virtualization features of the Linux kernel — **namespaces** (isolation of processes, network, filesystem, etc.) and **cgroups** (control groups, for limiting CPU/memory/disk usage) — to isolate containers from each other without needing a full guest OS.

---

## Virtual Machine Architecture

```
┌─────────────────────────────────────────────────────────┐
│                         App A     App B     App C          │
│                       Bins/Libs  Bins/Libs Bins/Libs        │
│                       Guest OS   Guest OS   Guest OS         │
│  ┌───────────────────────────────────────────────────┐    │
│  │                     Hypervisor                       │    │
│  └───────────────────────────────────────────────────┘    │
│                         Host OS                              │
│                       Infrastructure                         │
└─────────────────────────────────────────────────────────┘
```

- A **hypervisor** (e.g. VMware, VirtualBox, Hyper-V) sits on top of the host OS (or directly on hardware for Type 1 hypervisors) and creates multiple **virtual machines**.
- Each VM has its **own full guest operating system**, plus its own binaries/libraries and the application.
- VMs are heavier — each one needs gigabytes of disk space and boots in minutes because it's starting an entire OS.

---

## Docker vs VM Architecture — Key Differences

| Aspect | Docker (Containers) | Virtual Machine |
|---|---|---|
| **OS** | Shares the host OS kernel | Each VM has its own full guest OS |
| **Size** | Lightweight — MBs | Heavy — GBs |
| **Startup time** | Seconds | Minutes |
| **Isolation level** | Process-level isolation (namespaces/cgroups) | Full hardware-level isolation via hypervisor |
| **Performance** | Near-native, minimal overhead | Overhead from running a full OS per VM |
| **Resource usage** | Efficient — many containers per host | Fewer VMs per host due to resource duplication |
| **Portability** | Very portable — same image runs anywhere Docker runs | Less portable — tied to hypervisor/VM format |
| **Use case** | Microservices, CI/CD, cloud-native apps | Running multiple different OS types, legacy apps, strict isolation needs |

---

## Docker Desktop — Features

Docker Desktop is the GUI application (Windows/Mac/Linux) that bundles everything needed to build and run containers locally:
- Docker Engine (daemon + CLI) bundled together
- Graphical dashboard to view/manage images, containers, volumes, and networks
- Built-in Kubernetes cluster (optional, one-click enable) for local orchestration testing
- Docker Compose support for multi-container apps
- Resource controls (CPU, memory, disk limits for the Docker VM)
- Extensions marketplace (e.g. for security scanning, database tools)
- Volume and bind-mount browsing/management
- Automatic updates and settings sync
- Integration with WSL2 on Windows for better performance

---

## Docker Commands (Common Reference)

### Images
```bash
docker pull <image>              # download an image from a registry
docker images                    # list local images
docker build -t <name>:<tag> .   # build an image from a Dockerfile
docker rmi <image>               # remove an image
docker tag <image> <new-tag>     # tag an image
docker push <image>              # push image to a registry
docker history <image>           # show image layer history
```

### Containers
```bash
docker run <image>                    # create and start a container
docker run -d -p 8080:80 <image>      # run detached, map host:container port
docker run -it <image> bash           # run interactively with a shell
docker ps                             # list running containers
docker ps -a                          # list all containers (including stopped)
docker stop <container>               # stop a running container
docker start <container>              # start a stopped container
docker restart <container>            # restart a container
docker rm <container>                 # remove a container
docker exec -it <container> bash      # open a shell inside a running container
docker logs <container>               # view container logs
docker logs -f <container>            # follow logs live
docker inspect <container>            # detailed JSON info about a container
docker stats                          # live resource usage (CPU/mem) of containers
docker cp <container>:/path ./local   # copy files out of a container
```

### Volumes
```bash
docker volume create <name>
docker volume ls
docker volume inspect <name>
docker volume rm <name>
docker run -v <volume>:/path <image>       # mount a named volume
docker run -v $(pwd):/app <image>          # bind mount a host directory
```

### Networks
```bash
docker network create <name>
docker network ls
docker network inspect <name>
docker network connect <network> <container>
```

### Cleanup
```bash
docker system prune           # remove unused containers/images/networks
docker container prune        # remove all stopped containers
docker image prune            # remove dangling images
docker volume prune           # remove unused volumes
```

### Docker Compose
```bash
docker compose up             # start services defined in docker-compose.yml
docker compose up -d          # start in detached mode
docker compose down           # stop and remove containers/networks
docker compose logs           # view logs of all services
docker compose build          # build/rebuild services
```

---

## Docker Images

- A **read-only template** made up of layers, each representing an instruction in the `Dockerfile` (e.g. install a package, copy a file).
- Layers are **cached and reused** — if a layer hasn't changed, Docker reuses it on rebuild, making builds faster.
- Images are identified by **name:tag** (e.g. `python:3.11-slim`) and a unique content-addressable **image ID (SHA hash)**.
- A container is created by adding a thin writable layer on top of an image.

### Docker Tags (in detail)

A **tag** is a human-readable label attached to a specific version of an image, in the format:
```
repository:tag
```
For example, in `python:3.11-slim`, `python` is the repository name and `3.11-slim` is the tag. If you don't specify a tag, Docker automatically uses **`latest`** — but `latest` is just a *label*, not a guarantee of the newest build; it's simply whatever the maintainer last pushed without a specific tag.

**Why tags matter:**
- They let you **pin an exact version** of an image, so your build is reproducible. Using `python:latest` today and `python:latest` next month can pull two completely different versions of Python, silently breaking things.
- They let a single repository host **many variants** at once — e.g. `node:20`, `node:20-alpine`, `node:18`, `node:18-slim` all coexist under the `node` repository.
- In CI/CD pipelines, images are commonly tagged with the **Git commit SHA** or a **build number**, so every deployed version can be traced back to exact source code (as shown in the CI/CD example above: `myapp:${{ github.sha }}`).

**Common tagging commands:**
```bash
docker build -t myapp:1.0 .              # tag while building
docker build -t myapp:latest .           # also tag as "latest"

docker tag myapp:1.0 myapp:latest        # add another tag to an existing image
docker tag myapp:1.0 myrepo/myapp:1.0    # tag for pushing to a specific registry/namespace

docker push myrepo/myapp:1.0             # push a specific tag
docker pull nginx:1.27-alpine            # pull a specific tag

docker images                            # lists all local images with their tags
docker rmi myapp:1.0                     # remove a specific tagged version
```

**Common tag conventions you'll see on Docker Hub:**
| Tag pattern | Meaning |
|---|---|
| `latest` | Most recently pushed default build (not necessarily newest version) |
| `1.27`, `3.11` | A specific version number |
| `1.27.2` | A specific patch version, for maximum reproducibility |
| `alpine` | Built on the minimal Alpine Linux base (much smaller image size) |
| `slim` | A trimmed-down version with fewer extra packages |
| `bullseye`, `bookworm` | Built on a specific Debian release |

**Best practice:** avoid relying on `latest` in production Dockerfiles or deployments — pin to an explicit version (ideally down to the patch level, or a commit SHA in CI/CD) so builds are consistent and rollbacks are predictable.

## Docker Hub

- Docker's **default public registry** for storing and sharing images.
- Hosts **official images** (maintained by Docker/vendors, e.g. `python`, `nginx`, `postgres`) and **community/user images**.
- Supports public repositories (free) and private repositories.
- `docker pull` downloads from Docker Hub by default; `docker push` uploads to it (after `docker login`).
- Alternatives for private/enterprise use: Amazon ECR, Azure Container Registry, Google Artifact Registry, GitHub Container Registry, self-hosted registries (Harbor, Nexus).

## Docker Container

- A **running instance of an image** — an isolated process with its own filesystem, network interface, and process space, but sharing the host's kernel.
- Can be started, stopped, restarted, or deleted independently of the image it came from.
- Containers are **ephemeral by default** — any data written inside them is lost when the container is removed, unless you use **volumes** or **bind mounts** for persistence.
- Multiple containers can run from the same image simultaneously, each isolated from the others.

## Dockerfile

A text file with instructions to build an image, e.g.:
```dockerfile
FROM python:3.11-slim          # base image

WORKDIR /app                   # set working directory

COPY requirements.txt .        # copy dependency file
RUN pip install --no-cache-dir -r requirements.txt   # install deps

COPY . .                       # copy the rest of the app

EXPOSE 8000                    # document the port the app uses

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]  # startup command
```
Common instructions: `FROM`, `WORKDIR`, `COPY`, `ADD`, `RUN`, `ENV`, `ARG`, `EXPOSE`, `VOLUME`, `USER`, `ENTRYPOINT`, `CMD`.

- `RUN` executes at **build time** (installing packages, etc.)
- `CMD` / `ENTRYPOINT` define what runs at **container start time**
- `.dockerignore` file excludes files (like `.git`, `node_modules`) from being copied into the build context, speeding up builds and reducing image size

---

## Other Docker Concepts

### Docker Compose (in detail)

Most real applications aren't just one container — a typical app might need a backend, a database, a cache, and maybe a reverse proxy, all running together and talking to each other. Starting each one manually with `docker run` (getting the networking, environment variables, and startup order right every time) is tedious and error-prone. **Docker Compose** solves this by letting you describe your *entire* multi-container setup in a single declarative YAML file, then bring it all up (or down) with one command.

**How it works:**
- You write a `docker-compose.yml` file describing each **service** (a service = one container's configuration: which image or Dockerfile to use, ports, environment variables, volumes, networks, dependencies).
- Compose automatically creates a shared network so services can reach each other **by service name** (e.g. your app can connect to `db:5432` instead of hunting for an IP address).
- It respects `depends_on` ordering, so, for example, the database container starts before the app container tries to connect to it.

**Example `docker-compose.yml`:**
```yaml
version: "3.9"

services:
  app:
    build: .                     # build from the Dockerfile in this folder
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
    volumes:
      - .:/app                   # bind mount for live code reload in dev

  db:
    image: postgres:16
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - db_data:/var/lib/postgresql/data   # named volume for persistence

volumes:
  db_data:
```

**Key commands:**
```bash
docker compose up             # create and start all services (attached, logs in terminal)
docker compose up -d          # same, but in detached mode (see below)
docker compose up --build     # rebuild images before starting
docker compose down           # stop and remove containers + default network
docker compose down -v        # also remove named volumes (careful — deletes data)
docker compose ps             # list running services in this project
docker compose logs -f app    # follow logs for just the "app" service
docker compose exec app bash  # open a shell inside the running "app" service
docker compose restart app    # restart a single service
```

**Why it matters:** one command (`docker compose up`) recreates your *entire* local environment — app, database, cache — exactly the same way every time, for every developer on the team. It's also commonly used for local development environments even when production uses Kubernetes.

---

### Volumes (in detail)

Containers are designed to be **disposable** — by default, anything written inside a container's writable layer disappears the moment the container is removed. That's a problem for anything you actually need to keep, like database files, uploaded images, or logs. **Volumes** are Docker's mechanism for persisting and sharing data independently of a container's lifecycle.

**How volumes work:**
- A volume is a storage area **managed by Docker itself** (on Linux, physically stored under `/var/lib/docker/volumes/` on the host, but you don't need to interact with that path directly).
- A volume is **mounted** into a container at a chosen path. The container reads/writes to that path as if it were a normal folder, but the data actually lives in the volume, outside the container's writable layer.
- Because the volume exists independently, you can **delete and recreate the container** (e.g. to upgrade to a new image version) and the data in the volume survives untouched.
- The **same volume can be mounted into multiple containers**, letting them share data.

**Types of persistent storage:**
| Type | Managed by | Typical use |
|---|---|---|
| **Named volume** | Docker | Recommended for most persistent data (databases, app state) — Docker handles the storage location |
| **Anonymous volume** | Docker | Like a named volume but auto-generated name; harder to reuse/reference later |
| **Bind mount** | You (points to a specific host path) | Local development — mount your source code folder so edits on the host instantly reflect in the container |

**Commands:**
```bash
docker volume create mydata           # create a named volume
docker volume ls                      # list all volumes
docker volume inspect mydata          # see where it's stored, size, etc.
docker volume rm mydata               # delete a volume (fails if in use)
docker volume prune                   # remove all unused volumes

docker run -v mydata:/var/lib/postgresql/data postgres   # mount named volume
docker run -v $(pwd):/app myapp                           # bind mount current host dir
docker run --mount type=volume,source=mydata,target=/data myimage  # long-form syntax
```

**Named volume vs bind mount — when to use which:**
- Use a **named volume** for anything Docker should manage for you long-term, like a database's data directory — it's portable across environments and works the same on any host.
- Use a **bind mount** when you specifically need to reference a folder on *your* machine — most common in local development so you don't have to rebuild the image every time you change a line of code.

- **Bind mounts** — mapping a host directory directly into a container; useful for local development so code changes reflect immediately.
### Detach Mode (in detail)

When you start a container with `docker run`, Docker gives you a choice of how it should occupy your terminal:

- **Attached mode (default)** — `docker run <image>` ties the container's output directly to your terminal. You see its logs streaming live, and your terminal is "stuck" running that container in the foreground; pressing `Ctrl+C` stops it.
- **Detached mode** — `docker run -d <image>` starts the container **in the background** and immediately hands your terminal back. The container keeps running even after you close that terminal session; you just don't see its logs live.

```bash
docker run -d -p 8080:80 nginx     # starts nginx in the background, terminal is free to use
```

**Why detached mode matters:**
- It's the standard way to run **long-lived services** (web servers, databases, APIs) — you don't want your terminal permanently occupied just to keep a container alive.
- It lets you start multiple containers from the same terminal session without opening new tabs/windows for each one.
- It mirrors how containers run in production — nobody attaches a live terminal to a production web server; it just runs, and you check on it separately.

**Checking on a detached container:**
```bash
docker ps                     # confirm it's running
docker logs <container>       # view its output on demand
docker logs -f <container>    # "follow" the logs live, like tailing a file
docker attach <container>     # reattach your terminal to its main process (use with care — Ctrl+C can stop it)
docker exec -it <container> bash   # open a *new* shell inside it, safer than attach for exploring
```

**Detach vs background shell tricks:** `-d` is Docker's own flag for this — you don't need to manually background the process yourself (e.g. with `&` or `nohup`); Docker manages the container's lifecycle regardless of whether your terminal is watching it.

In **Docker Compose**, the same idea applies: `docker compose up` runs attached (logs from all services stream to your terminal, `Ctrl+C` stops everything), while `docker compose up -d` starts all services detached in the background.

---

- **Networks** — Docker's virtual networking (bridge, host, overlay, none) that lets containers communicate with each other and the outside world.
- **Multi-stage builds** — using multiple `FROM` stages in one Dockerfile to keep final images small (e.g. compile in one stage, copy only the built artifact into a minimal final stage).
- **Docker Swarm** — Docker's built-in (simpler, less popular today) container orchestration tool, an alternative to Kubernetes.
- **Health checks** — `HEALTHCHECK` instruction in a Dockerfile lets Docker monitor whether a container is actually working, not just running.
- **Image layers & caching** — understanding layer order in a Dockerfile (put things that change least, like dependency installs, before things that change often, like app code) speeds up rebuilds significantly.
- **Registries vs repositories** — a registry (e.g. Docker Hub) hosts many repositories (e.g. `nginx`, `python`), and each repository holds multiple tagged image versions.

---

*End of notes.*
