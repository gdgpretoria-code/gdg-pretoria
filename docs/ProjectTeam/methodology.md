# Agile Scrum

Agile Scrum is a project management framework. It helps teams build complex products through short, iterative work cycles called sprints. The process relies on specific roles, regular meetings, and defined artifacts to deliver working software or project increments step by step.

## 1. The Core Pillars and Values

Scrum is built on empirical process control, which asserts that knowledge comes from experience and making decisions based on what is observed.

### Empirical Pillars

* *Transparency:* Process and work must be visible to those performing and receiving the work.
* *Inspection:* Artifacts and progress must be inspected frequently to detect variances.
* *Adaptation:* If aspects deviate outside acceptable limits, the process or materials must be adjusted.

### Scrum Values

* *Commitment:* Team members commit to achieving goals and supporting each other.
* *Focus:* The primary focus is on the sprint work to make the best progress.
* *Openness:* The team and stakeholders agree to be open about work and challenges.
* *Respect:* Members respect each other to be capable, independent professionals.
* *Courage:* Members have the courage to do the right thing and work through tough problem.

## 2. Advanced Role Dynamics

Scrum roles are structural responsibilities, not corporate job titles.

```text
┌────────────────────────────────────────────────────────┐
│                      SCRUM TEAM                        │
│                                                        │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────┐  │
│  │ Product Owner  │ │  Scrum Master  │ │ Developers │  │
│  │ (Value Maximizer)│ (Process Coach)│ (Creators) │  │
│  └───────┬────────┘ └───────┬────────┘ └─────┬──────┘  │
└──────────┼──────────────────┼────────────────┼─────────┘
           │                  │                │
     Defines "What"     Guides "How"     Builds "Increment"
```

### The Product Owner (PO)

* Maximises the value of the product resulting from the Scrum team's work.
* Soles responsible for backlog management, prioritizing items to align with strategy.
* Acts as the single point of contact for stakeholder requirement negotiations.

### The Scrum Master (SM)

*Accountable for establishing Scrum as defined in the Scrum Guide.
* Serves the team by clearing organizational impediments and shielding them from external interruptions.
* Serves the PO by finding techniques for effective product goal definition.

### The Developers

* Accountable for creating a plan for the Sprint (the Sprint Backlog).
* Instilling quality by adhering to a Definition of Done.
* Adapting their plan each day toward the Sprint Goal.

## 3. Lifecycle of Scrum Events (The Sprint Engine)

Sprints are the heartbeat of Scrum, where ideas are turned into value. They are fixed-length events of four weeks or less.

```text
[ Product Backlog ] 
       │
       ▼
┌────────────────────────────────────────────────────────┐
│                     THE SPRINT LOOP                    │
│                                                        │
│  1. Sprint Planning (Max 8 hrs for a 1-month sprint)   │
│         │                                              │
│         ▼                                              │
│  2. Sprint Backlog created + Sprint Goal locked        │
│         │                                              │
│         ▼                                              │
│  3. Execution & Daily Scrum (15 mins daily)            │
│         │                                              │
│         ▼                                              │
│  4. Sprint Review (Max 4 hrs) ──► Product Demo         │
│         │                                              │
│         ▼                                              │
│  5. Sprint Retrospective (Max 3 hrs) ──► Process Fixes │
└────────────────────────────────────────────────────────┘
```

### Sprint Planning

* The "Why":* The PO proposes how the product could increase its value in the current Sprint. The team collaborates to define a Sprint Goal.
* *The "What":* Developers select items from the Product Backlog to include in the current Sprint.
* *The "How":* Developers plan the specific work necessary to create an Increment that meets the Definition of Done.

### Daily Scrum

* A 15-minute event for the Developers to inspect progress toward the Sprint Goal.
* It produces an actionable plan for the next 24 hours of work.
* It is held at the same time and place every working day to reduce complexity.

### Sprint Review

* Held at the end of the Sprint to inspect the Increment and adapt the Product Backlog if needed.
* The Scrum team presents results to key stakeholders, and progress toward the Product Goal is discussed.
* This is a collaborative working session, not just a static status report slide presentation.

### Sprint Retrospective

* The purpose is to plan ways to increase quality and effectiveness.
* The team inspects how the last Sprint went regarding individuals, interactions, processes, tools, and their Definition of Done.
* Highly actionable process improvements are identified and implemented immediately in the next Sprint.

## 4. Artifact Commitments and Rigor

Each Scrum artifact contains a specific commitment to ensure it provides information that enhances transparency.

```text
┌───────────────────┬──────────────────────────────────┐
│     Artifact      │        Linked Commitment         │
├───────────────────┼──────────────────────────────────┤
│ Product Backlog   │ Product Goal (Future target)     │
│ Sprint Backlog    │ Sprint Goal (Current focus)      │
│ Increment         │ Definition of Done (Quality bar) │
└───────────────────┴──────────────────────────────────┘
```

* *Product Goal:* Describes a future state of the product which can serve as a target for the Scrum team to plan against.
* *Sprint Goal:* The single objective for the Sprint. It creates coherence and focus, encouraging the team to work together rather than on separate initiatives.
* *Definition of Done (DoD):* A formal description of the state of the Increment when it meets the quality measures required for the product. No work can be considered part of an Increment unless it meets this standard.

## 5. Industry Mechanics (Beyond the Scrum Guide)

While not strictly mandated by the core Scrum Guide, mature software teams universally implement these engineering mechanics to scale the framework:

* *User Stories:* A standard format for backlog items: "As a [user type], I want [action] so that [benefit].
* *"Story Points:* A relative unit of measure for sizing work effort, often using the Fibonacci sequence (1, 2, 3, 5, 8, 13).
* *Backlog Refinement:* An ongoing activity where the PO and team break down, clarify, and estimate backlog items for future sprints.
* *Velocity:* The average number of story points a team completes per sprint, used to forecast future capability.
* *Burn-down / Burn-up Charts:* Visual graphs tracking remaining work versus time within a single sprint or across a release cycle.