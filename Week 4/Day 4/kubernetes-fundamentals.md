# Kubernetes Fundamentals

## 1. Problems with Docker (Standalone)

Docker is great for building and running individual containers, but running containers **at scale in production** exposes several gaps:

- **No built-in orchestration** — If a container crashes, Docker doesn't automatically restart it on another host. There's no native mechanism to reschedule failed workloads.
- **No auto-scaling** — Docker can't automatically spin up more container instances when traffic increases, or scale down when it decreases.
- **No native load balancing** — Distributing traffic across multiple containers/hosts requires external tools (e.g., a manually configured reverse proxy).
- **Single-host limitation** — Native Docker (without Swarm) manages containers on one machine. Coordinating containers across multiple servers isn't handled out of the box.
- **No self-healing** — If a host machine goes down, containers on it don't automatically get rescheduled elsewhere.
- **Manual networking across hosts** — Setting up multi-host container networking is complex and not automated.
- **No rolling updates/rollbacks** — Updating an application across many containers with zero downtime, or rolling back a bad deployment, isn't natively supported.
- **No declarative desired-state management** — Docker runs what you tell it to run; it doesn't continuously reconcile "what should be running" vs. "what is running."
- **Storage orchestration** — Attaching persistent storage that follows a container as it moves between hosts is not handled natively.

**In short:** Docker solves *packaging and running* an application in a container. It does **not** solve *managing thousands of containers reliably across a cluster of machines* — that's a separate, much harder problem.

---

## 2. Why We Need Kubernetes

Kubernetes (K8s) was built to solve exactly the orchestration problems above:

| Need | How K8s Solves It |
|---|---|
| Automatic restart on failure | Self-healing via controllers (ReplicaSet, Deployment) |
| Scaling with demand | Horizontal Pod Autoscaler (HPA) |
| Traffic distribution | Built-in Services & load balancing |
| Multi-host scheduling | Scheduler places Pods on best-fit nodes across the cluster |
| Zero-downtime updates | Rolling updates & easy rollbacks |
| Config/secret management | ConfigMaps & Secrets, decoupled from app code |
| Storage that follows the app | Persistent Volumes (PV) & Persistent Volume Claims (PVC) |
| Declarative infrastructure | YAML manifests define desired state; K8s continuously reconciles |

Essentially, Kubernetes turns a group of machines into a single, programmable platform for running containerized applications reliably.

---

## 3. What is Kubernetes (K8s)?

- Kubernetes is an **open-source container orchestration platform**, originally designed by Google (based on their internal system called **Borg**), now maintained by the **Cloud Native Computing Foundation (CNCF)**.
- "K8s" is short for Kubernetes (K + 8 letters + s).
- It automates:
  - **Deployment** of containerized applications
  - **Scaling** up/down based on load
  - **Load balancing** of traffic across containers
  - **Self-healing** (restarting/replacing failed containers)
  - **Rolling updates and rollbacks**
  - **Service discovery** and networking between components
  - **Secret and configuration management**
  - **Storage orchestration**
- It works with **any container runtime** (Docker, containerd, CRI-O) as long as it follows the **Container Runtime Interface (CRI)**.
- Applications are described **declaratively** using YAML/JSON manifests — you describe the *desired state*, and Kubernetes' control loop continuously works to match the *actual state* to it.

---

## 4. Competitors / Alternatives to Kubernetes

| Tool | Description |
|---|---|
| **Docker Swarm** | Docker's own native orchestration tool. Simpler than K8s but less feature-rich and has smaller community/ecosystem support today. |
| **Apache Mesos (+ Marathon)** | General-purpose cluster manager; can run containers as well as other workloads, but more complex to operate. |
| **HashiCorp Nomad** | Lightweight, simple orchestrator that can schedule containers, VMs, and standalone binaries. |
| **Amazon ECS (Elastic Container Service)** | AWS's proprietary container orchestration service, simpler and tightly integrated with AWS, but AWS-locked. |
| **Amazon EKS / Google GKE / Azure AKS** | These are **managed Kubernetes** offerings — not really competitors, but managed alternatives to running vanilla K8s yourself. |
| **OpenShift (Red Hat)** | An enterprise Kubernetes distribution with added developer/operations tooling. |
| **Rancher** | A Kubernetes management platform for multi-cluster operations. |

**Why Kubernetes usually wins:** largest community and ecosystem, cloud-agnostic (avoids vendor lock-in), strong extensibility (CRDs, Operators), and it has become the **de facto industry standard**, backed by all major cloud providers.

---

## 5. Secrets and Configuration Management in Kubernetes

Kubernetes separates **application code** from **configuration/sensitive data**, following the 12-factor app principle.

### ConfigMaps
- Store **non-sensitive** configuration data as key-value pairs (e.g., environment settings, feature flags, config files).
- Can be injected into Pods as:
  - Environment variables
  - Command-line arguments
  - Mounted files/volumes
- Example use: database hostnames, log levels, app settings.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  LOG_LEVEL: "debug"
  API_URL: "https://api.example.com"
```

### Secrets
- Store **sensitive data**: passwords, API keys, tokens, TLS certificates.
- Stored as **Base64-encoded** strings (note: Base64 is encoding, *not* encryption — additional measures are needed for true security).
- Can be injected the same way as ConfigMaps (env vars or mounted volumes).
- Types: `Opaque` (generic), `kubernetes.io/tls`, `kubernetes.io/dockerconfigjson`, etc.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: YWRtaW4=
  password: cGFzc3dvcmQxMjM=
```

### Best Practices
- Never hardcode secrets in container images or manifests committed to version control.
- Enable **encryption at rest** for etcd (where Secrets are stored).
- Use **RBAC (Role-Based Access Control)** to restrict who/what can read Secrets.
- For production-grade secret management, integrate external tools like **HashiCorp Vault**, **AWS Secrets Manager**, or **Sealed Secrets**.
- Mount Secrets as volumes rather than environment variables where possible (env vars can leak via logs/process listings).

---

## 6. Kubernetes Cluster

A **Kubernetes cluster** is a set of machines (physical or virtual), called **nodes**, that work together to run containerized applications.

A cluster consists of two main types of nodes:

1. **Control Plane (Master) Node(s)** — Makes global decisions about the cluster (scheduling, detecting/responding to events, maintaining desired state).
2. **Worker Node(s)** — Actually run the application workloads (Pods/containers).

A production cluster typically has **multiple control plane nodes** (for high availability) and **multiple worker nodes** (for scalability and workload distribution).

```
                 ┌─────────────────────────┐
                 │      Control Plane       │
                 │  (API Server, etcd,      │
                 │  Scheduler, Controller   │
                 │  Manager)                │
                 └─────────────┬────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                        │                        │
 ┌──────┴───────┐       ┌────────┴───────┐       ┌────────┴───────┐
 │  Worker Node  │       │  Worker Node   │       │  Worker Node   │
 │  (kubelet,    │       │  (kubelet,     │       │  (kubelet,     │
 │  kube-proxy,  │       │  kube-proxy,   │       │  kube-proxy,   │
 │  Pods)        │       │  Pods)         │       │  Pods)         │
 └───────────────┘       └────────────────┘       └────────────────┘
```

---

## 7. Kubernetes Architecture

### A. Control Plane Components

| Component | Role |
|---|---|
| **kube-apiserver** | The front door to the cluster. Exposes the Kubernetes API; all communication (kubectl, internal components) goes through it. |
| **etcd** | A distributed, consistent key-value store that holds **all cluster state and configuration data** (the "source of truth"). |
| **kube-scheduler** | Watches for newly created Pods with no assigned node and decides which node they should run on, based on resource availability, constraints, affinity rules, etc. |
| **kube-controller-manager** | Runs controller processes (Node Controller, Replication Controller, Endpoints Controller, etc.) that continuously watch the cluster state and move it toward the desired state. |
| **cloud-controller-manager** | Integrates the cluster with underlying cloud provider APIs (e.g., managing load balancers, storage volumes, node lifecycle in AWS/GCP/Azure). |

### B. Worker Node Components

| Component | Role |
|---|---|
| **kubelet** | An agent running on every node; ensures containers described in PodSpecs are running and healthy. |
| **kube-proxy** | Maintains network rules on nodes, enabling communication to Pods from inside or outside the cluster. |
| **Container Runtime** | The software that actually runs containers (containerd, CRI-O, Docker via cri-dockerd). |

---

## 8. Kubelet

- The **primary node agent** that runs on **every worker node** (and often control-plane nodes too).
- Responsibilities:
  - Registers the node with the API server.
  - Watches the API server for **PodSpecs** assigned to its node.
  - Ensures the containers described in those PodSpecs are **running and healthy**, communicating with the container runtime via the **Container Runtime Interface (CRI)**.
  - Performs **liveness, readiness, and startup probes** to monitor container health.
  - Reports node and Pod status back to the control plane.
  - Does **not** manage containers that weren't created by Kubernetes.
- Think of kubelet as the "supervisor" on each node that makes sure reality matches what the control plane wants.

---

## 9. Kube-proxy

- A **network proxy** that runs on **every node** in the cluster.
- Responsibilities:
  - Implements the **Kubernetes Service concept** — maintaining network rules that allow communication to Pods from inside or outside the cluster.
  - Watches the API server for changes to **Services** and **Endpoints**, and updates rules accordingly.
  - Performs **load balancing** across the Pods backing a Service (using iptables, IPVS, or userspace modes).
  - Enables stable networking: even though Pods are ephemeral (IPs change when Pods restart), Services provide a **stable virtual IP and DNS name** that kube-proxy routes to the correct backend Pods.

**Modes of operation:**
| Mode | Description |
|---|---|
| **iptables** (default in most clusters) | Uses Linux iptables rules to redirect traffic to Pod IPs; simple but can have performance issues at very large scale. |
| **IPVS** | Uses the Linux kernel's IP Virtual Server for more efficient load balancing at scale. |
| **userspace** (legacy) | Older, slower method; largely deprecated. |

---

## Quick Summary Table

| Concept | One-liner |
|---|---|
| Docker | Packages & runs a single container |
| Docker's limitation | No orchestration across multiple hosts |
| Kubernetes | Orchestrates containers across a cluster of machines |
| Cluster | Group of nodes (control plane + workers) managed together |
| Control Plane | The "brain" — API server, etcd, scheduler, controller manager |
| Worker Node | Runs the actual application Pods |
| Kubelet | Node agent ensuring Pods run as specified |
| Kube-proxy | Handles networking/load balancing to Pods |
| ConfigMap | Non-sensitive configuration data |
| Secret | Sensitive data (passwords, keys, tokens) |
