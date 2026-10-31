import { RawQuestion } from '../../types';

export const SET_P05_QUESTIONS: RawQuestion[] = [
    {
        "question": "A financial services company is building an agentic AI system on AWS where agents process loan applications, access customer financial data, and execute transactions. The agents currently use long-lived IAM access keys stored in environment variables. The security team has flagged that if any agent is compromised, the attacker could access resources far beyond what the agent needs.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which combination of actions should the company take to implement least privilege with dynamic boundaries for its agents? (Select TWO.)",
        "options": [
            {
                "id": "A",
                "text": "Use AWS STS AssumeRole with session policies and short session durations (15 to 60 minutes) for all agent credential issuance, and apply IAM permission boundaries on all agent roles to cap the maximum permission ceiling.",
                "explanation": "The Agentic AI Lens recommends issuing temporary credentials via AWS STS AssumeRole with session policies and short durations. IAM permission boundaries establish a maximum permission ceiling that cannot be exceeded even if the agent's task-level policies are modified, preventing privilege escalation.",
                "references": [
                    {
                        "title": "AGENTSEC03-BP03: Implement least privilege with dynamic boundaries",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec03-bp03.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Create a single IAM role with broad permissions shared by all agents and rotate the access keys monthly.",
                "explanation": "Shared broad IAM roles and long-lived credentials directly violate the Agentic AI Lens best practices. A single shared role means that a compromise of any agent gives access to all resources, and monthly rotation still leaves a large exposure window.",
                "references": [
                    {
                        "title": "AGENTSEC03-BP03: Implement least privilege with dynamic boundaries",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec03-bp03.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Add contextual IAM Conditions to restrict access by region, resource tags, time windows, and source VPC, and use IAM Access Analyzer to generate least-privilege policies based on actual CloudTrail access patterns.",
                "explanation": "The Agentic AI Lens recommends layering IAM Conditions (aws:RequestedRegion, aws:ResourceTag, aws:CurrentTime, aws:SourceVpc) for defense-in-depth. IAM Access Analyzer provides data-driven baselines by analyzing actual CloudTrail usage to generate least-privilege policy recommendations.",
                "references": [
                    {
                        "title": "AGENTSEC03-BP03: Implement least privilege with dynamic boundaries",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec03-bp03.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Embed agent permissions directly in the system prompt instructions and rely on the foundation model to enforce access boundaries.",
                "explanation": "System prompt instructions are not a security control. The Agentic AI Lens specifically identifies relying on prompt-based alignment as an anti-pattern. Permission enforcement must use deterministic mechanisms like IAM policies, not probabilistic model behavior.",
                "references": [
                    {
                        "title": "AGENTSEC04-BP01: Implement guardrails and alignment controls",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec04-bp01.html"
                    }
                ]
            }
        ],
        "correct_answer": [
            "A",
            "C"
        ]
    },
    {
        "question": "A healthcare company operates a multi-agent AI system where specialized agents handle patient intake, diagnosis assistance, and treatment recommendations. The agents coordinate by calling each other directly over synchronous HTTP connections. Recently, when the diagnosis agent experienced high latency, the entire patient intake workflow failed because every downstream agent was blocked waiting for responses.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, what is the MOST effective architectural change to prevent cascading failures in this multi-agent system?",
        "options": [
            {
                "id": "A",
                "text": "Increase the timeout values on all synchronous HTTP connections between agents to accommodate latency spikes.",
                "explanation": "Increasing timeouts does not prevent cascading failures — it simply delays them and keeps resources blocked for longer periods. The Agentic AI Lens identifies direct synchronous calls as a common issue that leads to cascading failures.",
                "references": [
                    {
                        "title": "AGENTREL01-BP01: Implement a resilient messaging layer",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel01-bp01.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Implement a resilient messaging layer using Amazon SQS and Amazon EventBridge with dead-letter queues, persistence, and retry handling to decouple agent-to-agent communication.",
                "explanation": "The Agentic AI Lens recommends implementing a durable messaging substrate for agent communication. A messaging layer with persistence, retry, and dead-letter handling absorbs transient faults and lets workflows resume from where they stopped, preventing one agent's failure from cascading to the entire system.",
                "references": [
                    {
                        "title": "AGENTREL01-BP01: Implement a resilient messaging layer",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel01-bp01.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Deploy all agents in the same Lambda function to reduce network latency between agents.",
                "explanation": "Co-locating all agents in a single function creates a monolithic architecture that increases blast radius. The Agentic AI Lens recommends splitting compute, memory, reasoning, and orchestration into independently scalable layers with fail-fast boundaries.",
                "references": [
                    {
                        "title": "AGENTREL01-BP02: Establish modular, fault-isolated layers",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel01-bp02.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Add retry logic with exponential backoff to each agent's HTTP client configuration.",
                "explanation": "While retry logic is a useful component, retries alone on synchronous calls do not decouple agents. If the downstream agent is slow or failing, retries still block the calling agent and can amplify load on the failing service. A messaging layer provides the decoupling needed to prevent cascading failures.",
                "references": [
                    {
                        "title": "AGENTREL01-BP01: Implement a resilient messaging layer",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel01-bp01.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A retail company uses an AI agent on Amazon Bedrock that processes customer service requests. The agent uses the largest available foundation model for every request, including simple tasks like checking order status and answering frequently asked questions. Cost analysis shows that 80% of requests are simple lookups that a smaller model could handle equally well.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which approach should the company implement to optimize model invocation costs while maintaining quality for complex requests?",
        "options": [
            {
                "id": "A",
                "text": "Switch all requests to the smallest available model to minimize costs.",
                "explanation": "Using only the smallest model would degrade quality for the 20% of complex requests that require stronger reasoning capabilities. The Agentic AI Lens recommends matching model capability to task demand, not simply minimizing model size.",
                "references": [
                    {
                        "title": "AGENTCOST02-BP01: Architect tiered model selection for cost-performance optimization",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp01.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Implement tiered model selection with a pre-classifier that routes each invocation to a model tier based on task complexity, and configure model cascading with confidence-based escalation to a more capable model when the assigned model produces low-confidence outputs.",
                "explanation": "The Agentic AI Lens recommends architecting tiered model selection to match each task to the cheapest model capable of acceptable quality, and escalating only when confidence drops. A pre-classifier routes invocations by complexity, and cascading ensures complex tasks still get the reasoning power they need.",
                "references": [
                    {
                        "title": "AGENTCOST02-BP01: Architect tiered model selection for cost-performance optimization",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp01.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Purchase Provisioned Throughput for the large model to reduce per-request cost through volume commitment.",
                "explanation": "Provisioned Throughput provides consistent capacity at a committed price but does not address the fundamental cost issue of using an oversized model for simple tasks. The Agentic AI Lens focuses on matching model capability to task complexity, not just reducing per-unit cost.",
                "references": [
                    {
                        "title": "AGENTCOST02-BP01: Architect tiered model selection for cost-performance optimization",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp01.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Reduce the maximum output token limit on all requests to lower per-invocation costs.",
                "explanation": "While reducing output tokens can save some cost, it does not address the root issue: every invocation pays the higher per-token cost of the large model regardless of task complexity. The Agentic AI Lens recommends tiered model selection as the primary cost optimization strategy.",
                "references": [
                    {
                        "title": "AGENTCOST02-BP02: Cost optimize token consumption through efficient prompt engineering",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp02.html"
                    }
                ]
            }
        ],
        "correct_answer": "D"
    },
    {
        "question": "An enterprise is deploying a multi-agent system where agents from different business units interact to complete cross-functional tasks. The agents currently run in a flat network with no segmentation. Inter-agent messages rely solely on TLS for transport-level encryption. The security team is concerned that if one agent is compromised, it could impersonate other agents or tamper with messages in transit through queues.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which TWO actions should the enterprise take to secure multi-agent orchestration? (Select TWO.)",
        "options": [
            {
                "id": "A",
                "text": "Segment agents into trust zones based on role and risk profile, enforcing inter-zone communication at both the network layer (VPCs, security groups, AWS PrivateLink) and the application layer (Cedar policies in AgentCore Policy).",
                "explanation": "The Agentic AI Lens recommends establishing trust boundaries between agents. A flat agent network gives every compromised agent a direct path to every other one. Trust zones segmented at the network and IAM layers, with application-layer verification, stop one affected agent from escalating across the whole system.",
                "references": [
                    {
                        "title": "AGENTSEC06-BP03: Establish trust boundaries between agents",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec06-bp03.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Implement message-level signing using AWS KMS asymmetric keys for messages that cross trust boundaries or traverse queues and event buses, with separate keys per trust zone.",
                "explanation": "The Agentic AI Lens states that transport-level encryption stops protecting the payload when a message lands in a queue or event bus. Message-level signing with KMS asymmetric keys gives receiving agents cryptographic proof of sender identity and content integrity regardless of how many hops the message made.",
                "references": [
                    {
                        "title": "AGENTSEC06-BP01: Encrypt and sign inter-agent messages",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec06-bp01.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Enable AWS CloudTrail logging for all agent API calls and review the logs monthly.",
                "explanation": "While CloudTrail logging is important for auditing, it is a detective control, not a preventive one. It does not prevent impersonation or message tampering in real time. The Agentic AI Lens requires both trust boundary enforcement and message-level signing as preventive controls for multi-agent security.",
                "references": [
                    {
                        "title": "AGENTSEC06-BP04: Monitor and detect coordination anomalies",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec06-bp04.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Route all inter-agent traffic through a single API Gateway endpoint with an API key for authentication.",
                "explanation": "A shared API key is a weak authentication mechanism. The Agentic AI Lens identifies shared API keys as a common anti-pattern for agent authentication. API Gateway also does not provide message-level integrity verification for messages persisted in queues.",
                "references": [
                    {
                        "title": "AGENTSEC03-BP01: Implement strong authentication for agent identities",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec03-bp01.html"
                    }
                ]
            }
        ],
        "correct_answer": [
            "A",
            "B"
        ]
    },
    {
        "question": "A company has deployed an AI agent that processes employee expense reports and can approve reimbursements up to $10,000. The company currently routes every agent action—including viewing receipts, categorizing expenses, and approving payments—through human review. Reviewers are overwhelmed and have started rubber-stamping approvals without careful review.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which approach should the company implement to balance human oversight with agent autonomy?",
        "options": [
            {
                "id": "A",
                "text": "Remove all human review to eliminate the bottleneck and rely entirely on Amazon Bedrock Guardrails to enforce boundaries.",
                "explanation": "Removing all human review produces unbounded autonomy. The Agentic AI Lens explicitly states that routing no actions through review is as problematic as routing all of them. Guardrails complement but do not replace human oversight for high-risk decisions.",
                "references": [
                    {
                        "title": "AGENTSEC04-BP02: Human-in-the-loop for critical decisions",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec04-bp02.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Implement a deterministic risk classifier that routes read-only operations autonomously, low-risk writes through single-reviewer approval, and high-risk operations like payment approvals through stricter review, with timeout policies and escalation paths.",
                "explanation": "The Agentic AI Lens recommends risk-tiered approval that pauses agents only for decisions where human judgment actually changes the outcome. A deterministic risk classifier (not an LLM) categorizes operations, and reviewers receive sufficient context to make informed decisions within defined time windows with escalation paths.",
                "references": [
                    {
                        "title": "AGENTSEC04-BP02: Human-in-the-loop for critical decisions",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec04-bp02.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use an LLM to classify each agent action as low-risk or high-risk, and route high-risk actions to human review.",
                "explanation": "The Agentic AI Lens explicitly warns against delegating risk classification to an LLM that is exposed to the same untrusted content as the request it evaluates. Adversarial content could influence the LLM classifier into marking a request as low-risk. Deterministic logic must be the authoritative signal.",
                "references": [
                    {
                        "title": "AGENTSEC04-BP02: Human-in-the-loop for critical decisions",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec04-bp02.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Add a second AI agent to review the first agent's actions before execution.",
                "explanation": "Agent-on-agent review does not constitute human oversight. While agent-based validation can be part of a defense-in-depth strategy, the Agentic AI Lens requires human-in-the-loop review for critical decisions, especially financial approvals that carry business risk.",
                "references": [
                    {
                        "title": "AGENTSEC04-BP02: Human-in-the-loop for critical decisions",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec04-bp02.html"
                    }
                ]
            }
        ],
        "correct_answer": "C"
    },
    {
        "question": "A logistics company runs a multi-agent AI system where multiple specialized agents (routing, scheduling, inventory) need to coordinate shared resources like delivery fleet assignments. Agents currently coordinate peer-to-peer, and the team is experiencing deadlocks when two agents simultaneously try to assign the same delivery vehicle.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which design pattern should the company implement to resolve coordination conflicts reliably?",
        "options": [
            {
                "id": "A",
                "text": "Implement the arbiter agent pattern with a dedicated event-driven arbiter on Amazon Bedrock AgentCore Runtime that activates only for conflict resolution, stores conflict resolution policies in AWS Systems Manager Parameter Store, and escalates unresolvable conflicts to human review via Amazon SNS.",
                "explanation": "The Agentic AI Lens recommends the arbiter agent pattern for coordinated multi-agent systems. A dedicated arbiter that activates only for conflict resolution preserves agent autonomy for normal work while providing a single authoritative place to resolve contention. Policies stored externally can be updated without redeployment.",
                "references": [
                    {
                        "title": "AGENTREL04-BP01: Implement the arbiter agent pattern for coordinated multi-agent systems",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel04-bp01.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Add distributed locking using Amazon DynamoDB with conditional writes so agents acquire locks before accessing shared resources.",
                "explanation": "While distributed locking prevents simultaneous access, it does not resolve the higher-level coordination problem of conflicting task plans between agents. Locks can still produce deadlocks when multiple agents need multiple resources. The Agentic AI Lens recommends a centralized arbiter for conflict resolution.",
                "references": [
                    {
                        "title": "AGENTREL04-BP01: Implement the arbiter agent pattern for coordinated multi-agent systems",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel04-bp01.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Embed conflict resolution logic inside each specialized agent so they can negotiate directly.",
                "explanation": "The Agentic AI Lens identifies embedding conflict resolution logic inside specialized agents as an anti-pattern. It produces inconsistent arbitration across the system because each agent implements its own resolution strategy, and it makes specialized agents more complex and harder to maintain.",
                "references": [
                    {
                        "title": "AGENTREL04-BP01: Implement the arbiter agent pattern for coordinated multi-agent systems",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel04-bp01.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Route every agent interaction through the arbiter to ensure complete coordination oversight.",
                "explanation": "The Agentic AI Lens explicitly warns against routing every agent interaction through the arbiter, as it turns the arbiter into a performance bottleneck. The arbiter should activate only for conflict resolution while leaving routine coordination to the specialized agents.",
                "references": [
                    {
                        "title": "AGENTREL04-BP01: Implement the arbiter agent pattern for coordinated multi-agent systems",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel04-bp01.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A media company operates AI agents that generate content summaries. When an agent produces an unexpected output, the operations team spends hours manually correlating infrastructure logs across services. They can see Lambda duration and API Gateway latency metrics, but they have no visibility into the agent's reasoning steps, tool invocations, or memory operations.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which practice should the company implement FIRST to improve observability of their agentic system?",
        "options": [
            {
                "id": "A",
                "text": "Create Amazon CloudWatch dashboards for Lambda invocation counts and error rates.",
                "explanation": "Infrastructure metrics like Lambda invocation counts only explain whether an agent is running, not whether it is working correctly. The Agentic AI Lens identifies instrumentation of only infrastructure metrics as the Initial maturity level (Level 1) and a common issue.",
                "references": [
                    {
                        "title": "AGENTOPS05-BP01: Establish end-to-end tracing and telemetry for agent operations",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops05-bp01.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Establish end-to-end distributed tracing using Amazon Bedrock AgentCore Observability or OpenTelemetry spans that capture reasoning steps, tool invocations, memory operations, and model invocations across the full execution path.",
                "explanation": "The Agentic AI Lens recommends distributed tracing that captures the full execution path as the foundational observability practice. When an agent produces unexpected output, the investigation is only as good as the telemetry. End-to-end tracing enables precise reconstruction of every decision and action.",
                "references": [
                    {
                        "title": "AGENTOPS05-BP01: Establish end-to-end tracing and telemetry for agent operations",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops05-bp01.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Enable Amazon CloudWatch anomaly detection for all existing metrics.",
                "explanation": "Anomaly detection on infrastructure metrics alone misses behavioral anomalies specific to agent reasoning. The Agentic AI Lens positions behavioral baselines and anomaly detection (AGENTOPS05-BP02) as building on end-to-end tracing, not as a substitute for it.",
                "references": [
                    {
                        "title": "AGENTOPS05-BP02: Monitor agent behavior patterns and detect anomalies",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops05-bp02.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Implement structured logging for agent outputs only.",
                "explanation": "Logging only outputs misses the reasoning chain, tool invocations, and memory operations that explain why an output was produced. The Agentic AI Lens requires comprehensive tracing of the full execution path, not just inputs and outputs.",
                "references": [
                    {
                        "title": "AGENTOPS05-BP03: Implement structured logging and comprehensive audit trails",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops05-bp03.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A company's AI agent operates without iteration limits on its reasoning loop. The agent occasionally enters runaway loops where it reasons for dozens of iterations without improving output quality, consuming significant tokens and causing high latency. Users experience response times exceeding 30 seconds for simple queries.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which approach should the company implement to optimize the agent's reasoning pipeline?",
        "options": [
            {
                "id": "A",
                "text": "Set a maximum response time limit at the API Gateway level to kill long-running requests.",
                "explanation": "Killing requests at the API Gateway level produces failed responses rather than optimized ones. The root cause — unbounded reasoning iterations — remains unaddressed. The Agentic AI Lens focuses on designing the reasoning pipeline itself to be efficient.",
                "references": [
                    {
                        "title": "AGENTPERF02-BP01: Design efficient reasoning pipelines",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentperf02-bp01.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Design an efficient reasoning pipeline with bounded iteration limits and confidence-based early termination, so simple tasks resolve in one or two iterations while complex tasks receive the iterations they need, with retries bounded by explicit latency and token budgets.",
                "explanation": "The Agentic AI Lens recommends designing efficient reasoning pipelines with iteration caps and confidence-based early termination. Each iteration of the perceive-reason-act loop involves an LLM inference call, so the number of iterations multiplies both latency and cost. An efficient pipeline reaches accurate decisions in the fewest iterations the task requires.",
                "references": [
                    {
                        "title": "AGENTPERF02-BP01: Design efficient reasoning pipelines",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentperf02-bp01.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Move to a larger, faster model with higher throughput to reduce per-iteration latency.",
                "explanation": "A larger model does not address the root cause of unbounded iterations. Even with faster per-iteration processing, an agent that reasons for 30+ unnecessary iterations will still be slow and expensive. The Agentic AI Lens recommends bounding iterations as the primary control.",
                "references": [
                    {
                        "title": "AGENTPERF02-BP01: Design efficient reasoning pipelines",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentperf02-bp01.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Cache all agent responses to avoid re-processing repeated queries.",
                "explanation": "Caching helps with identical repeated queries but does not address the fundamental problem of unbounded reasoning loops on new queries. The Agentic AI Lens identifies runaway reasoning loops as a distinct performance issue that requires pipeline-level controls.",
                "references": [
                    {
                        "title": "AGENTCOST02-BP03: Use intelligent caching to reduce redundant model invocations",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp03.html"
                    }
                ]
            }
        ],
        "correct_answer": "D"
    },
    {
        "question": "An insurance company has separate agent and human user IAM roles but discovers during an audit that agent roles and human roles have become blurred over time. Some agents can assume human-designated roles through role chaining, and audit trails cannot clearly distinguish agent actions from human actions during incident investigations.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which solution addresses this identity separation issue?",
        "options": [
            {
                "id": "A",
                "text": "Use Amazon Bedrock AgentCore Identity for agent workload identities, route human operators through AWS IAM Identity Center, and apply Service Control Policies (SCPs) in AWS Organizations to prevent agents from assuming human-designated roles.",
                "explanation": "The Agentic AI Lens recommends separating agent and human permission spaces at the identity layer. AgentCore Identity centralizes agent identities, IAM Identity Center handles human access, and SCPs enforce hard trust boundaries preventing agents from assuming human roles. This makes audit attribution unambiguous.",
                "references": [
                    {
                        "title": "AGENTSEC03-BP02: Separate agent and human user permission",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec03-bp02.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Tag all agent IAM roles with a key-value pair and filter CloudTrail logs by tag during audits.",
                "explanation": "Tagging is a useful organizational practice but does not enforce separation. Without trust policy constraints and SCPs, agents can still assume human roles regardless of tags. Tags help with visibility but do not prevent the cross-assumption problem identified in the audit.",
                "references": [
                    {
                        "title": "AGENTSEC03-BP02: Separate agent and human user permission",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec03-bp02.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Create a naming convention that prefixes agent roles with 'agent-' and human roles with 'human-'.",
                "explanation": "Naming conventions provide documentation clarity but do not enforce security boundaries. Without SCPs and trust policy restrictions, a naming convention alone cannot prevent an agent from assuming any role it has permissions to assume.",
                "references": [
                    {
                        "title": "AGENTSEC03-BP02: Separate agent and human user permission",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec03-bp02.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Consolidate all identities into a single IAM Identity Center directory and use permission sets to differentiate agent and human access.",
                "explanation": "IAM Identity Center is designed for human workforce identities, not agent workload identities. The Agentic AI Lens recommends keeping agent identities in a separate system (AgentCore Identity) from human identities (IAM Identity Center) to maintain clear separation.",
                "references": [
                    {
                        "title": "AGENTSEC03-BP02: Separate agent and human user permission",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec03-bp02.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A SaaS company's AI agent system prompt and tool catalog have grown substantially over 6 months. The system prompt now contains 15,000 tokens of instructions, and each invocation includes descriptions for 40 tools even though most requests only use 2-3 tools. The company notices that the fixed input-token cost paid on every invocation has risen significantly even though traffic is flat.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which TWO approaches should the company use to optimize token consumption costs? (Select TWO.)",
        "options": [
            {
                "id": "A",
                "text": "Compress system prompts and tool descriptions to the minimum size required to maintain decision quality, and implement explicit output length constraints.",
                "explanation": "The Agentic AI Lens recommends cost-optimizing token consumption through efficient prompt engineering. Every token in a system prompt is paid for on every invocation, so prompt bloat compounds linearly with traffic. Compressing instructions and constraining outputs reduces the fixed cost of each call.",
                "references": [
                    {
                        "title": "AGENTCOST02-BP02: Cost optimize token consumption through efficient prompt engineering",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp02.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Enable Amazon Bedrock prompt caching for stable system prompts and implement semantic caching for semantically equivalent requests.",
                "explanation": "The Agentic AI Lens recommends intelligent caching at the prompt, semantic, and plan-template layers. Prompt caching reduces the cost of the stable system prompt prefix on every invocation. Semantic caching identifies semantically equivalent requests and returns cached results, turning repeated work into a one-time cost.",
                "references": [
                    {
                        "title": "AGENTCOST02-BP03: Use intelligent caching to reduce redundant model invocations",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp03.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Migrate to a more expensive model that processes tokens faster.",
                "explanation": "A faster model does not reduce the number of tokens being processed. The root cause is bloated prompts and unnecessary tool descriptions consuming tokens on every invocation. The Agentic AI Lens addresses token consumption efficiency, not processing speed.",
                "references": [
                    {
                        "title": "AGENTCOST02-BP02: Cost optimize token consumption through efficient prompt engineering",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp02.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Increase the number of agents so each handles fewer requests.",
                "explanation": "Adding more agents does not reduce token consumption per invocation. Each agent would still process the same bloated system prompt and full tool catalog, so total token consumption would remain the same or increase due to overhead.",
                "references": [
                    {
                        "title": "AGENTCOST02-BP02: Cost optimize token consumption through efficient prompt engineering",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp02.html"
                    }
                ]
            }
        ],
        "correct_answer": [
            "A",
            "B"
        ]
    },
    {
        "question": "A company is building its first AI agent on AWS and wants to ensure the agent's operational boundaries are enforced reliably. A junior developer suggests that carefully written system prompt instructions should be sufficient to keep the agent within its intended scope.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, why is this approach insufficient, and what should be implemented instead?",
        "options": [
            {
                "id": "A",
                "text": "Prompt instructions are sufficient for alignment if the system prompt is well-crafted and regularly tested.",
                "explanation": "The Agentic AI Lens explicitly identifies treating alignment as a prompt-engineering exercise as a common anti-pattern. A single adversarial input that influences the model can collapse multiple prompt-based boundaries at once because instruction-following does not provide reliable enforcement.",
                "references": [
                    {
                        "title": "AGENTSEC04-BP01: Implement guardrails and alignment controls",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec04-bp01.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Implement layered controls with deterministic enforcement (IAM scoping, input schema validation, policy engines) and probabilistic content controls (Amazon Bedrock Guardrails for input and output filtering) at distinct stages of the call chain.",
                "explanation": "The Agentic AI Lens recommends layered controls — deterministic where possible, probabilistic where necessary — to keep agents inside operational boundaries. Deterministic enforcement like IAM scoping and input validation operates independently of model behavior, while Bedrock Guardrails add content filtering. Multiple layers ensure a failure at one layer rarely results in a boundary violation.",
                "references": [
                    {
                        "title": "AGENTSEC04-BP01: Implement guardrails and alignment controls",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec04-bp01.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Deploy a second LLM as a safety filter that checks all agent outputs before they reach the user.",
                "explanation": "While output filtering is part of a defense-in-depth strategy, a single LLM filter alone is insufficient. The Agentic AI Lens requires layered controls at every stage: input, inference, output, and tool invocation. Deterministic controls must be the foundation, not another LLM.",
                "references": [
                    {
                        "title": "AGENTSEC04-BP01: Implement guardrails and alignment controls",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec04-bp01.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Apply Amazon Bedrock Guardrails only on model outputs to filter harmful content before it reaches the user.",
                "explanation": "The Agentic AI Lens specifically calls out applying content filtering only to outputs as a common issue. This leaves the inference path open to prompt injection and wastes capacity processing adversarial inputs that could have been rejected up front. Guardrails should be applied to both inputs and outputs.",
                "references": [
                    {
                        "title": "AGENTSEC04-BP01: Implement guardrails and alignment controls",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec04-bp01.html"
                    }
                ]
            }
        ],
        "correct_answer": "C"
    },
    {
        "question": "A company's user-facing AI agent waits for the complete response from the foundation model before any output reaches the user. Users report that the agent feels slow because they see nothing for 8-10 seconds before the full response appears, even though the total processing time is acceptable.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which practice addresses this perceived latency issue?",
        "options": [
            {
                "id": "A",
                "text": "Move the agent to a larger compute instance to reduce processing time.",
                "explanation": "Agent perceived latency is dominated by time-to-first-token (TTFT), not total compute time. A larger instance does not change the fundamental issue of buffering the complete response before delivery. The Agentic AI Lens distinguishes between total processing time and perceived latency.",
                "references": [
                    {
                        "title": "AGENTPERF02-BP04: Optimize streaming responses and time-to-first-token for agent interactions",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentperf02-bp04.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Implement streaming delivery with sub-second time-to-first-token using Amazon Bedrock streaming APIs, compress pre-inference work to preserve the TTFT budget, and surface progress events during tool invocations to avoid unexplained pauses.",
                "explanation": "The Agentic AI Lens states that user-facing agents are judged on perceived latency, not total processing time. TTFT is the dominant perceived-performance signal. Streaming keeps TTFT short even when total processing takes seconds. Progress events during tool invocations prevent the unexplained silences that users perceive as stalls.",
                "references": [
                    {
                        "title": "AGENTPERF02-BP04: Optimize streaming responses and time-to-first-token for agent interactions",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentperf02-bp04.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Cache all responses so that repeat queries return instantly.",
                "explanation": "Caching helps only for repeated identical queries. For new queries, which represent the majority of user interactions, the agent still buffers the complete response. The Agentic AI Lens identifies streaming delivery as the practice that addresses perceived latency for all queries.",
                "references": [
                    {
                        "title": "AGENTCOST02-BP03: Use intelligent caching to reduce redundant model invocations",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp03.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Add a loading spinner to the user interface while the agent processes the request.",
                "explanation": "A loading spinner is a UX improvement but does not change the fundamental latency problem. The Agentic AI Lens recommends streaming delivery to reduce perceived latency by showing the response as it is generated, which is architecturally different from simply indicating that processing is ongoing.",
                "references": [
                    {
                        "title": "AGENTPERF02-BP04: Optimize streaming responses and time-to-first-token for agent interactions",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentperf02-bp04.html"
                    }
                ]
            }
        ],
        "correct_answer": "D"
    },
    {
        "question": "A manufacturing company runs a multi-agent system where agents handle quality inspection, supply chain optimization, and production scheduling. Each agent has accreted unrelated tools and broader system prompts over time, making the system difficult to debug. When the quality inspection agent fails, it impacts supply chain functions because they share the same process.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which design principle should the company follow?",
        "options": [
            {
                "id": "A",
                "text": "Design specialized agents following actor model principles, where each agent encapsulates one atomic capability, owns its state, and communicates through messages, keeping the impact of failures proportional to the scope of the failing component.",
                "explanation": "The Agentic AI Lens recommends designing specialized agents that each own a single capability, their own state, and a narrow permission scope. This follows actor model principles where failures are isolated to the agent that encountered them and the broader environment continues running.",
                "references": [
                    {
                        "title": "AGENTREL01-BP03: Design specialized agents following actor model principles",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel01-bp03.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Merge all agents into one comprehensive agent with full capabilities to simplify the architecture.",
                "explanation": "A monolithic agent concentrates risk. The Agentic AI Lens identifies multi-purpose agents as a reliability risk because a single failure in one function affects every other function in the same process. The recommendation is to split, not merge.",
                "references": [
                    {
                        "title": "AGENTREL01-BP03: Design specialized agents following actor model principles",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel01-bp03.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Add more error handling and try-catch blocks within the multi-purpose agents.",
                "explanation": "Error handling within a multi-purpose agent does not address the fundamental architectural issue of shared process scope. The Agentic AI Lens addresses this at the architecture level — specialized agents with isolated state — not at the error-handling level within monolithic agents.",
                "references": [
                    {
                        "title": "AGENTREL01-BP03: Design specialized agents following actor model principles",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel01-bp03.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Deploy redundant copies of each multi-purpose agent for high availability.",
                "explanation": "Redundancy addresses availability of a single agent but does not address the blast radius problem. If a multi-purpose agent fails, the redundant copy has the same failure modes because the agents share the same architecture. The Agentic AI Lens recommends specialization to reduce blast radius.",
                "references": [
                    {
                        "title": "AGENTREL01-BP03: Design specialized agents following actor model principles",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel01-bp03.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A company deploys AI agents that act on behalf of users to access internal systems. Currently, when an agent needs to access a user's resources, it assumes the user's IAM role directly. This approach collapses the audit trail because CloudTrail shows the user's identity, not the agent's, and gives the agent the user's full permission set for the entire session.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which approach should the company use for delegated access?",
        "options": [
            {
                "id": "A",
                "text": "Use Amazon Bedrock AgentCore Identity's GetWorkloadAccessTokenForJWT to embed user context as claims in the agent's token, so downstream services enforce user-level authorization without the agent holding the user's credentials.",
                "explanation": "The Agentic AI Lens recommends propagating user context as signed token claims through the agent's call chain. This approach keeps audit attribution unambiguous (the agent identity is separate from the user context) and limits the agent's access to what the downstream service grants for that user context, not the user's full permission set.",
                "references": [
                    {
                        "title": "AGENTSEC03-BP02: Separate agent and human user permission",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec03-bp02.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Have the agent store the user's credentials in AWS Secrets Manager and retrieve them when needed.",
                "explanation": "Storing and using user credentials directly gives the agent full access under the user's identity. The Agentic AI Lens identifies this pattern as an anti-pattern because it collapses the audit trail and gives the agent the user's full permission set.",
                "references": [
                    {
                        "title": "AGENTSEC03-BP02: Separate agent and human user permission",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec03-bp02.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Create a shared service account that all agents use to access user resources.",
                "explanation": "A shared service account removes per-user and per-agent attribution from the audit trail entirely. The Agentic AI Lens recommends distinct identities that maintain full attribution of every action to the specific agent and user context involved.",
                "references": [
                    {
                        "title": "AGENTSEC03-BP01: Implement strong authentication for agent identities",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec03-bp01.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Configure the agent to use AssumeRole with the user's IAM role but with a shorter session duration.",
                "explanation": "Shorter session duration reduces the time window but does not solve the fundamental problem identified by the Agentic AI Lens: assuming the user's role collapses the audit trail and gives the agent the user's full permission set. The user context should be carried as claims, not assumed as credentials.",
                "references": [
                    {
                        "title": "AGENTSEC03-BP02: Separate agent and human user permission",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec03-bp02.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "An organization's multi-agent system uses hardcoded agent identifiers in the orchestration layer. When the preferred agent becomes unavailable, the orchestrator cannot adapt and the entire workflow fails. The team wants to make the system resilient to individual agent failures.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which TWO practices should the organization implement? (Select TWO.)",
        "options": [
            {
                "id": "A",
                "text": "Classify agents with a comprehensive capability taxonomy registered in Amazon Bedrock AgentCore Registry with structured capability metadata, enabling semantic search for agent discovery and automatic substitution.",
                "explanation": "The Agentic AI Lens recommends a structured capability taxonomy that gives orchestrators a basis for routing decisions. When a preferred agent is unavailable, the orchestrator can automatically find and substitute an equivalent agent based on capability metadata rather than hardcoded identifiers.",
                "references": [
                    {
                        "title": "AGENTREL04-BP02: Classify agents with a comprehensive capability taxonomy",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel04-bp02.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Implement pre-defined, ordered fallback chains for each critical agent with documented quality trade-offs, and validate fallback chains regularly using AWS Fault Injection Service.",
                "explanation": "The Agentic AI Lens recommends explicit fallback chains so one unavailable agent does not collapse the workflow. Pre-defined fallback chains let orchestrators swap in alternatives with reduced quality rather than a complete stall. Regular validation with fault injection ensures fallback chains actually work.",
                "references": [
                    {
                        "title": "AGENTREL04-BP03: Implement fallback mechanisms and graceful degradation for collaborative workflows",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel04-bp03.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Deploy each agent with three replicas to ensure at least one is always available.",
                "explanation": "While replication improves availability of individual agents, it does not address the architectural issue of hardcoded identifiers in the orchestrator. If the orchestrator only knows about a specific agent ID and that agent type is completely unavailable, replicas of the same type won't help if the issue affects all instances.",
                "references": [
                    {
                        "title": "AGENTREL04-BP03: Implement fallback mechanisms and graceful degradation for collaborative workflows",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel04-bp03.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Increase the orchestrator's retry count and timeout values to give agents more time to recover.",
                "explanation": "Longer retries and timeouts delay failure recognition rather than enabling graceful degradation. The Agentic AI Lens recommends capability-based routing and fallback chains as the solution to agent unavailability, not simply waiting longer for a failed agent to recover.",
                "references": [
                    {
                        "title": "AGENTREL04-BP03: Implement fallback mechanisms and graceful degradation for collaborative workflows",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel04-bp03.html"
                    }
                ]
            }
        ],
        "correct_answer": [
            "A",
            "B"
        ]
    },
    {
        "question": "A company stores its AI agent audit trails in mutable Amazon S3 storage. During a compliance audit, the auditors question the integrity of the logs because they could have been altered after the fact. Additionally, the logs contain personally identifiable information (PII) from customer interactions that should not be stored in raw form.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which approach should the company implement for audit trails?",
        "options": [
            {
                "id": "A",
                "text": "Encrypt the S3 bucket with AWS KMS and enable versioning.",
                "explanation": "While encryption and versioning improve security, versioning does not prevent deletion or modification of the current version. The Agentic AI Lens specifically recommends immutability through S3 Object Lock in compliance mode, which provides a stronger guarantee that records cannot be altered.",
                "references": [
                    {
                        "title": "AGENTOPS05-BP03: Implement structured logging and comprehensive audit trails",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops05-bp03.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use Amazon S3 Object Lock in compliance mode for immutable audit trails, and apply PII redaction through Amazon Bedrock Guardrails sensitive information filters before storing logs.",
                "explanation": "The Agentic AI Lens recommends immutable audit trails using S3 Object Lock in compliance mode, which prevents any principal (including root) from deleting or modifying records during the retention period. PII redaction through Bedrock Guardrails sensitive information filters addresses the data protection concern while maintaining audit trail completeness.",
                "references": [
                    {
                        "title": "AGENTOPS05-BP03: Implement structured logging and comprehensive audit trails",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops05-bp03.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Move audit trails to Amazon CloudWatch Logs with a 10-year retention policy.",
                "explanation": "CloudWatch Logs provides durable storage with retention policies, but the Agentic AI Lens specifically identifies the need for immutable storage that cannot be altered after the fact. CloudWatch Logs retention policies control how long data is kept, not whether it can be modified.",
                "references": [
                    {
                        "title": "AGENTOPS05-BP03: Implement structured logging and comprehensive audit trails",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops05-bp03.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Restrict write access to audit trail S3 buckets to only the agent service role.",
                "explanation": "Restricting write access reduces the risk of tampering but does not make logs immutable. The agent service role (or an administrator) could still modify or delete records. The Agentic AI Lens recommends S3 Object Lock in compliance mode for tamper-proof audit trails.",
                "references": [
                    {
                        "title": "AGENTOPS05-BP03: Implement structured logging and comprehensive audit trails",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops05-bp03.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A company runs an AI agent fleet where each agent instance maintains its own isolated cache. The team notices that when Agent A resolves a query, Agent B often processes the same query independently minutes later, duplicating the model inference cost. The fleet handles thousands of similar queries daily.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens sustainability pillar, which caching strategy should the company implement?",
        "options": [
            {
                "id": "A",
                "text": "Increase the cache size on each individual agent instance.",
                "explanation": "Larger per-instance caches still keep cache isolated to each agent. The Agentic AI Lens identifies treating each agent as an isolated system with its own cache as a common anti-pattern that misses fleet-wide amortization opportunities.",
                "references": [
                    {
                        "title": "AGENTSUS02-BP02: Establish efficient agent caching strategies",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsus02-bp02.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Establish shared caches exposed through Amazon Bedrock AgentCore Gateway that amortize work across the agent fleet, so one cache hit provides savings for every agent that asks the same question.",
                "explanation": "The Agentic AI Lens recommends shared caches that amortize work across the entire agent fleet. Every duplicate model call, tool invocation, and memory lookup is work the fleet has already done once. Shared caches turn repeated work into a one-time cost, and resource efficiency improves as usage patterns stabilize.",
                "references": [
                    {
                        "title": "AGENTSUS02-BP02: Establish efficient agent caching strategies",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsus02-bp02.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Disable caching entirely to simplify the architecture and rely on model inference scaling.",
                "explanation": "Disabling caching means every query pays the full model inference cost, even for identical or semantically equivalent requests. The Agentic AI Lens recommends caching at each integration point as a fundamental sustainability practice.",
                "references": [
                    {
                        "title": "AGENTSUS02-BP02: Establish efficient agent caching strategies",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsus02-bp02.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Route all requests through a single agent instance that maintains one large cache.",
                "explanation": "Routing all requests through a single instance creates a bottleneck and single point of failure. The Agentic AI Lens recommends shared caches accessible by all agents through a gateway, not funneling all traffic through one agent.",
                "references": [
                    {
                        "title": "AGENTSUS02-BP02: Establish efficient agent caching strategies",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsus02-bp02.html"
                    }
                ]
            }
        ],
        "correct_answer": "D"
    },
    {
        "question": "A startup has deployed behavioral baselines and anomaly detection for its AI agent system. However, the baselines were set once at deployment and have never been refreshed. Over time, the agent's behavior has legitimately evolved as new tools and capabilities were added, causing constant false positive alerts. Meanwhile, a gradual performance degradation has gone undetected because it slowly redefined the baseline.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, how should the company manage behavioral baselines for agent monitoring?",
        "options": [
            {
                "id": "A",
                "text": "Disable anomaly detection to eliminate false positive alert fatigue.",
                "explanation": "Disabling anomaly detection removes the ability to detect genuine behavioral drift and performance degradation. The Agentic AI Lens recommends improving baseline management, not removing the detection capability entirely.",
                "references": [
                    {
                        "title": "AGENTOPS05-BP02: Monitor agent behavior patterns and detect anomalies",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops05-bp02.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Widen the anomaly detection thresholds to reduce false positives.",
                "explanation": "Wider thresholds reduce false positives but also reduce detection sensitivity. This approach treats the symptom rather than the cause: stale baselines. The Agentic AI Lens requires baselines that adapt to legitimate evolution while detecting genuine drift.",
                "references": [
                    {
                        "title": "AGENTOPS05-BP02: Monitor agent behavior patterns and detect anomalies",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops05-bp02.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Continually maintain behavioral baselines using Amazon CloudWatch Anomaly Detection, with baselines that adjust automatically and anomaly detection that distinguishes between data drift, concept drift, and performance drift, annotated with deployment events to correlate metric changes with configuration changes.",
                "explanation": "The Agentic AI Lens recommends continually maintained baselines that adapt to legitimate behavioral evolution. CloudWatch Anomaly Detection provides automatic baseline adjustment. Distinguishing drift types and correlating with deployment events prevents both false positives from legitimate changes and undetected gradual degradation.",
                "references": [
                    {
                        "title": "AGENTOPS05-BP02: Monitor agent behavior patterns and detect anomalies",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops05-bp02.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Reset the baselines manually after every deployment and ignore alerts between deployments.",
                "explanation": "Manual baseline resets and ignoring alerts creates gaps in monitoring coverage. The Agentic AI Lens identifies stale baselines as a common issue and recommends automatic, continuous baseline maintenance rather than periodic manual resets.",
                "references": [
                    {
                        "title": "AGENTOPS05-BP02: Monitor agent behavior patterns and detect anomalies",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops05-bp02.html"
                    }
                ]
            }
        ],
        "correct_answer": "C"
    },
    {
        "question": "A company wants to standardize communication between its AI agents. Currently, each agent pair has its own custom message format, error format, and retry policy. Every time a new agent is added, the team must build a translation layer between it and every existing agent.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, which approach should the company adopt?",
        "options": [
            {
                "id": "A",
                "text": "Build a universal translation service that converts between all custom formats.",
                "explanation": "A universal translator adds complexity and becomes a bottleneck and single point of failure. The Agentic AI Lens recommends standardizing the protocols themselves rather than adding a translation layer on top of disparate formats.",
                "references": [
                    {
                        "title": "AGENTREL01-BP04: Standardize communication protocols",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel01-bp04.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Standardize communication protocols with a consistent taxonomy of message schemas registered in EventBridge Schema Registry, versioned endpoints, a canonical error format, and uniform retry policies, so agents compose into workflows without custom translation layers between every pair.",
                "explanation": "The Agentic AI Lens recommends standardized schemas, versioned endpoints, and a canonical error format across the agent fleet. This lets agents compose into workflows without custom translation layers at every boundary, reducing the N-squared integration problem to a linear one.",
                "references": [
                    {
                        "title": "AGENTREL01-BP04: Standardize communication protocols",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel01-bp04.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Reduce the number of agents to minimize the number of integration points.",
                "explanation": "Reducing agents may simplify integration but limits the system's capabilities and violates the Agentic AI Lens principle of specialized agents. The root issue is the lack of standardized protocols, not the number of agents.",
                "references": [
                    {
                        "title": "AGENTREL01-BP04: Standardize communication protocols",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel01-bp04.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Document each agent's custom message format in a shared wiki for reference.",
                "explanation": "Documentation helps developers understand formats but does not reduce the implementation burden of building translation layers. The Agentic AI Lens recommends protocol standardization to eliminate the need for per-pair integration work entirely.",
                "references": [
                    {
                        "title": "AGENTREL01-BP04: Standardize communication protocols",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentrel01-bp04.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A company uses AI agents that consume high volumes of repetitive requests. The team is considering fine-tuning a smaller model on their most common task categories to replace the general-purpose large model for those tasks. A team member is excited about fine-tuning and wants to customize models for all agent tasks, including low-volume niche tasks.\n\nAccording to the AWS Well-Architected Framework Agentic AI Lens, what should guide the decision to pursue model customization?",
        "options": [
            {
                "id": "A",
                "text": "Fine-tune models for all agent tasks to maximize quality across the board.",
                "explanation": "The Agentic AI Lens warns against pursuing model customization on low-volume workloads. Customization math only works when volume and task stability are high enough to justify the investment. Training cost for low-volume tasks may never amortize.",
                "references": [
                    {
                        "title": "AGENTCOST02-BP04: Implement model customization for long-term cost reduction",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp04.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Start with a break-even calculation to determine whether volume and task stability justify the training investment, and focus customization on high-volume recurring tasks where the one-time training cost amortizes across sustained per-invocation savings.",
                "explanation": "The Agentic AI Lens recommends that model customization decisions start with a break-even calculation, not enthusiasm for fine-tuning. Customizing smaller models for high-volume recurring tasks optimizes per-invocation costs into a one-time training expense. The math only works when volume and task stability are high enough to justify the investment.",
                "references": [
                    {
                        "title": "AGENTCOST02-BP04: Implement model customization for long-term cost reduction",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp04.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Avoid model customization entirely and rely on prompt engineering for all tasks.",
                "explanation": "The Agentic AI Lens recognizes model customization as a valid cost optimization strategy for the right workloads. Avoiding it entirely means missing potential savings on high-volume tasks where training cost would quickly amortize.",
                "references": [
                    {
                        "title": "AGENTCOST02-BP04: Implement model customization for long-term cost reduction",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp04.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Fine-tune the largest available model to get the best quality for customized tasks.",
                "explanation": "The Agentic AI Lens recommends customizing smaller models, not the largest ones. The goal is to bring a small model's quality up to acceptable levels for a specific task at lower per-invocation cost, not to further optimize an already expensive large model.",
                "references": [
                    {
                        "title": "AGENTCOST02-BP04: Implement model customization for long-term cost reduction",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentcost02-bp04.html"
                    }
                ]
            }
        ],
        "correct_answer": "C"
    }
];
