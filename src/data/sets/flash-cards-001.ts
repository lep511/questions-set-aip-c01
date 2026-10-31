import { RawQuestion } from '../../types';

export const FLASH_CARDS_001: RawQuestion[] = [
    {
        "question": "What is Amazon Bedrock AgentCore?",
        "options": [
            {
                "id": "A",
                "text": "A managed ML training and hyperparameter tuning platform for building custom foundation models from scratch"
            },
            {
                "id": "B",
                "text": "A centralized prompt management and versioning console integrated with Amazon CloudWatch for observability"
            },
            {
                "id": "C",
                "text": "A fully managed vector database service for storing and querying high-dimensional embeddings at scale"
            },
            {
                "id": "D",
                "text": "A platform to build, deploy, and operate AI agents at scale using any framework or model"
            }
        ],
        "correct_answer": "D",
        "explanation": "AgentCore is a modular platform for building, deploying, and operating agents. It includes Runtime, Memory, Gateway, Identity, Observability, and built-in tools."
    },
    {
        "question": "Which AgentCore service converts APIs and Lambda functions into MCP-compatible tools for agents?",
        "options": [
            {
                "id": "A",
                "text": "AgentCore Runtime"
            },
            {
                "id": "B",
                "text": "AgentCore Memory"
            },
            {
                "id": "C",
                "text": "AgentCore Gateway"
            },
            {
                "id": "D",
                "text": "AgentCore Identity"
            }
        ],
        "correct_answer": "C",
        "explanation": "AgentCore Gateway converts existing APIs and Lambda functions into agent-compatible tools with MCP support, enabling tool discovery and secure communication."
    },
    {
        "question": "What is the primary purpose of Amazon Bedrock Guardrails?",
        "options": [
            {
                "id": "A",
                "text": "Detect and filter undesirable content and protect sensitive information"
            },
            {
                "id": "B",
                "text": "Optimize model inference latency by caching frequent requests and pre-warming model endpoints across regions"
            },
            {
                "id": "C",
                "text": "Manage agent deployment infrastructure including compute provisioning, scaling, and health monitoring"
            },
            {
                "id": "D",
                "text": "Route requests between multiple foundation models using weighted traffic distribution and failover rules"
            }
        ],
        "correct_answer": "A",
        "explanation": "Bedrock Guardrails provides content filters, denied topics, word filters, sensitive information filters, and contextual grounding checks."
    },
    {
        "question": "What is Retrieval-Augmented Generation (RAG)?",
        "options": [
            {
                "id": "A",
                "text": "A supervised fine-tuning technique that adapts pre-trained models on domain-specific labeled datasets for better accuracy"
            },
            {
                "id": "B",
                "text": "A model compression technique using knowledge distillation and quantization to reduce inference cost at scale"
            },
            {
                "id": "C",
                "text": "A method that retrieves relevant external information and includes it in the model's context"
            },
            {
                "id": "D",
                "text": "A prompt chaining technique that sequences multiple model calls with intermediate validation steps"
            }
        ],
        "correct_answer": "C",
        "explanation": "RAG enhances LLM outputs by retrieving relevant information from external knowledge sources and grounding model reasoning in retrieved real-world data."
    },
    {
        "question": "What is 'agentic RAG' compared to standard RAG?",
        "options": [
            {
                "id": "A",
                "text": "RAG that uses larger embedding models with higher-dimensional vector spaces for more precise semantic matching"
            },
            {
                "id": "B",
                "text": "RAG that exclusively works with Amazon Bedrock models and Knowledge Bases using OpenSearch Serverless indexes"
            },
            {
                "id": "C",
                "text": "RAG that persists retrieved results in Amazon DynamoDB tables with TTL-based expiration for caching"
            },
            {
                "id": "D",
                "text": "RAG where the agent actively controls retrieval, deciding when and what to retrieve iteratively"
            }
        ],
        "correct_answer": "D",
        "explanation": "In agentic RAG, retrieval is a dynamic reasoning action the agent invokes iteratively, unlike standard RAG where retrieval is a static preprocessing step."
    },
    {
        "question": "Which chunking strategy is best for documents without clear contextual boundaries, such as legal or technical manuals?",
        "options": [
            {
                "id": "A",
                "text": "Fixed-size chunking"
            },
            {
                "id": "B",
                "text": "Hierarchical chunking"
            },
            {
                "id": "C",
                "text": "Semantic chunking"
            },
            {
                "id": "D",
                "text": "No chunking (process entire document)"
            }
        ],
        "correct_answer": "C",
        "explanation": "Semantic chunking groups content by meaning rather than fixed size, making it ideal for documents without clear structural boundaries."
    },
    {
        "question": "What does Time-to-First-Token (TTFT) measure?",
        "options": [
            {
                "id": "A",
                "text": "Total wall-clock time from request submission to receiving the complete generated response including all tokens"
            },
            {
                "id": "B",
                "text": "The inter-token latency measuring the average delay between generating consecutive output tokens"
            },
            {
                "id": "C",
                "text": "The cold-start time required to load model weights from Amazon S3 into accelerator memory before inference"
            },
            {
                "id": "D",
                "text": "Time between submitting a request and receiving the first output token"
            }
        ],
        "correct_answer": "D",
        "explanation": "TTFT is the primary perceived-performance metric for interactive agent interactions. Low TTFT makes agents feel faster even when total processing time is identical."
    },
    {
        "question": "What is the 'arbiter agent' pattern in multi-agent systems?",
        "options": [
            {
                "id": "A",
                "text": "An agent that performs all tasks for other agents and acts as a centralized processing gateway in the system"
            },
            {
                "id": "B",
                "text": "A dedicated agent that resolves conflicts between specialized agents and manages resource contention"
            },
            {
                "id": "C",
                "text": "An agent that continuously monitors system performance metrics and triggers CloudWatch alarms on anomalies"
            },
            {
                "id": "D",
                "text": "An agent that handles all user-facing communication and translates between natural language and agent protocols"
            }
        ],
        "correct_answer": "B",
        "explanation": "The arbiter agent resolves conflicts, manages resource contention, and keeps multi-agent behavior aligned with task objectives, activating only when coordination is needed."
    },
    {
        "question": "What is prompt injection?",
        "options": [
            {
                "id": "A",
                "text": "Input content that attempts to override agent instructions or cause unauthorized actions"
            },
            {
                "id": "B",
                "text": "A few-shot prompting technique that adds curated examples to the system prompt for improved model accuracy"
            },
            {
                "id": "C",
                "text": "Pre-loading cached API responses into the agent context window to reduce downstream tool invocation latency"
            },
            {
                "id": "D",
                "text": "Dynamically loading tool descriptions and action group definitions into the system prompt at invocation time"
            }
        ],
        "correct_answer": "A",
        "explanation": "Prompt injection is a security concern where untrusted input attempts to override the agent's system prompt or cause actions outside its defined scope."
    },
    {
        "question": "What is the Model Context Protocol (MCP)?",
        "options": [
            {
                "id": "A",
                "text": "A protocol for compressing and quantizing model weights during distributed inference across multiple accelerators"
            },
            {
                "id": "B",
                "text": "A standardized format for storing multi-turn conversation history with token-level timestamps and metadata"
            },
            {
                "id": "C",
                "text": "An encryption protocol for signing and verifying inter-agent messages using AWS KMS asymmetric keys"
            },
            {
                "id": "D",
                "text": "An open standard for connecting AI agents to external tools, data sources, and services"
            }
        ],
        "correct_answer": "D",
        "explanation": "MCP defines a standardized interface for tool discovery, invocation, and result handling that enables agents to interact with tools without custom integration code."
    },
    {
        "question": "Which Bedrock Guardrails filter can detect and redact PII like email addresses and phone numbers?",
        "options": [
            {
                "id": "A",
                "text": "Content filters that detect hate, insults, sexual, and violence categories in text and images"
            },
            {
                "id": "B",
                "text": "Denied topics that block user-defined subjects using semantic matching on inputs and outputs"
            },
            {
                "id": "C",
                "text": "Sensitive information filters"
            },
            {
                "id": "D",
                "text": "Word filters that use case-insensitive whole-word and whole-phrase exact matching on custom terms"
            }
        ],
        "correct_answer": "C",
        "explanation": "Sensitive information filters detect PII in standard formats or custom regex entities and can block or mask (anonymize) the data in inputs and responses."
    },
    {
        "question": "What is 'stochasticity' in the context of LLM-powered agents?",
        "options": [
            {
                "id": "A",
                "text": "The deterministic property where models consistently produce identical outputs for the same input and temperature"
            },
            {
                "id": "B",
                "text": "The tokens-per-second throughput rate at which the model generates output during streaming inference"
            },
            {
                "id": "C",
                "text": "A model's built-in ability to process multiple independent tasks simultaneously using batch inference APIs"
            },
            {
                "id": "D",
                "text": "Inherent randomness causing the same input to produce different outputs across invocations"
            }
        ],
        "correct_answer": "D",
        "explanation": "Stochasticity is a fundamental characteristic of LLMs that must be accounted for in reliability and testing strategies for agent systems."
    },
    {
        "question": "What is the purpose of a dead-letter queue (DLQ) in agent messaging?",
        "options": [
            {
                "id": "A",
                "text": "Capture messages that fail repeated processing to prevent blocking healthy execution"
            },
            {
                "id": "B",
                "text": "Store successfully processed messages in an immutable audit trail with S3 Object Lock compliance mode"
            },
            {
                "id": "C",
                "text": "Queue high-priority messages in a separate FIFO queue for guaranteed ordered and faster processing"
            },
            {
                "id": "D",
                "text": "Route messages between different agent types based on capability taxonomy and semantic matching rules"
            }
        ],
        "correct_answer": "A",
        "explanation": "DLQs capture poison-pill messages that fail processing, preventing them from blocking healthy workflow execution in resilient agent architectures."
    },
    {
        "question": "What does Amazon Bedrock Intelligent Prompt Routing do?",
        "options": [
            {
                "id": "A",
                "text": "Routes prompts to the nearest AWS Region using latency-based DNS routing for lower response times"
            },
            {
                "id": "B",
                "text": "Predicts response quality and routes requests to the optimal model within a family based on complexity"
            },
            {
                "id": "C",
                "text": "Distributes requests evenly across multiple provisioned throughput model endpoints using round-robin scheduling"
            },
            {
                "id": "D",
                "text": "Compresses and tokenizes prompts before sending them to the model to reduce input token consumption"
            }
        ],
        "correct_answer": "B",
        "explanation": "Intelligent Prompt Routing dynamically routes simple queries to smaller models and complex queries to larger ones within a model family, reducing costs up to 30%."
    },
    {
        "question": "What is a 'hallucination' in generative AI?",
        "options": [
            {
                "id": "A",
                "text": "When a model generates plausible but factually incorrect information"
            },
            {
                "id": "B",
                "text": "When a model refuses to generate any output due to overly aggressive content filtering guardrail configuration"
            },
            {
                "id": "C",
                "text": "When a model produces output in an unexpected language despite locale-specific system prompt instructions"
            },
            {
                "id": "D",
                "text": "When a model exceeds the context window limit and silently truncates earlier conversation turns"
            }
        ],
        "correct_answer": "A",
        "explanation": "Hallucination is a key reliability risk in agentic AI, especially when agents make decisions based on model-generated information rather than retrieved facts."
    },
    {
        "question": "What does the InvokeInlineAgent API allow in Amazon Bedrock?",
        "options": [
            {
                "id": "A",
                "text": "Configure FM, instructions, and action groups dynamically at runtime without pre-creating an agent"
            },
            {
                "id": "B",
                "text": "Invoke a pre-configured agent with fixed settings and persistent session state stored in AgentCore Memory"
            },
            {
                "id": "C",
                "text": "Run an agent inside a Lambda function with provisioned concurrency and VPC networking configuration"
            },
            {
                "id": "D",
                "text": "Stream agent responses over bidirectional WebSocket connections with AgentCore Runtime session isolation"
            }
        ],
        "correct_answer": "A",
        "explanation": "Inline agents allow dynamic configuration at invocation time, eliminating the need to manage separate pre-configured agent resources per use case."
    },
    {
        "question": "Which type of agent memory stores durable knowledge that persists across sessions?",
        "options": [
            {
                "id": "A",
                "text": "Short-term session memory with TTL-based expiration scoped to the current conversation or task context"
            },
            {
                "id": "B",
                "text": "Episodic memory that records specific past interactions and retrieves them to inform current agent decisions"
            },
            {
                "id": "C",
                "text": "Long-term (persistent) memory"
            },
            {
                "id": "D",
                "text": "Procedural memory that stores learned execution patterns for how agents approach recurring task types"
            }
        ],
        "correct_answer": "C",
        "explanation": "Long-term memory stores learned preferences, historical outcomes, and domain knowledge that persists across sessions, unlike short-term memory scoped to the current task."
    },
    {
        "question": "What is the 'saga pattern' used for in multi-agent workflows?",
        "options": [
            {
                "id": "A",
                "text": "Orchestrating parallel model inference calls across multiple foundation models using fan-out and fan-in patterns"
            },
            {
                "id": "B",
                "text": "Coordinating distributed transactions with compensating actions for rollback on failure"
            },
            {
                "id": "C",
                "text": "Caching intermediate agent results in Amazon ElastiCache to avoid redundant tool invocations across steps"
            },
            {
                "id": "D",
                "text": "Logging agent decisions and reasoning chains to immutable audit trails for regulatory compliance purposes"
            }
        ],
        "correct_answer": "B",
        "explanation": "The saga pattern maintains data consistency across agent boundaries by defining compensating transactions for each step to enable rollback when downstream steps fail."
    },
    {
        "question": "What is 'graceful degradation' in an agentic AI system?",
        "options": [
            {
                "id": "A",
                "text": "Gradually reducing model size and parameter count over time using progressive distillation to save inference cost"
            },
            {
                "id": "B",
                "text": "Immediately shutting down the entire agentic system when any single component fails or becomes unresponsive"
            },
            {
                "id": "C",
                "text": "Maintaining partial functionality when components fail instead of complete failure"
            },
            {
                "id": "D",
                "text": "Progressively decommissioning agents from production based on utilization metrics and cost-per-outcome thresholds"
            }
        ],
        "correct_answer": "C",
        "explanation": "Graceful degradation involves detecting degraded conditions, activating fallback behaviors, and communicating reduced capabilities to users instead of full system failure."
    },
    {
        "question": "What is the purpose of Amazon Bedrock cross-region inference?",
        "options": [
            {
                "id": "A",
                "text": "Route inference requests to other regions for higher availability and throughput"
            },
            {
                "id": "B",
                "text": "Train and fine-tune foundation models across multiple regions simultaneously using distributed data parallelism"
            },
            {
                "id": "C",
                "text": "Replicate model weights to CloudFront edge locations for ultra-low-latency inference at the network edge"
            },
            {
                "id": "D",
                "text": "Synchronize AgentCore Memory namespaces and session state across regions for multi-region agent deployments"
            }
        ],
        "correct_answer": "A",
        "explanation": "Cross-region inference routes requests to regions with available capacity, improving availability and reducing throttling for production agent workloads."
    },
    {
        "question": "What is a 'capability taxonomy' in multi-agent systems?",
        "options": [
            {
                "id": "A",
                "text": "A comprehensive catalog listing all foundation models available in Amazon Bedrock with pricing and region availability"
            },
            {
                "id": "B",
                "text": "A structured classification of agent skills, limitations, and requirements for routing and substitution"
            },
            {
                "id": "C",
                "text": "A detailed cost breakdown of agent operations segmented by model tier, token consumption, and tool invocations"
            },
            {
                "id": "D",
                "text": "A multi-level security classification system for categorizing data sensitivity levels across agent workflows"
            }
        ],
        "correct_answer": "B",
        "explanation": "Capability taxonomies enable orchestrators to make informed routing decisions and implement automatic fallback strategies when preferred agents are unavailable."
    },
    {
        "question": "What does Amazon Bedrock Data Automation provide for document processing?",
        "options": [
            {
                "id": "A",
                "text": "Document splitting, classification, extraction, normalization, and validation in one managed service"
            },
            {
                "id": "B",
                "text": "OCR text extraction from scanned documents with automatic table detection and key-value pair recognition"
            },
            {
                "id": "C",
                "text": "PDF to text conversion with layout preservation, font detection, and multi-column paragraph reflow support"
            },
            {
                "id": "D",
                "text": "Manual document labeling and annotation tools with active learning for training custom extraction models"
            }
        ],
        "correct_answer": "A",
        "explanation": "Bedrock Data Automation uses blueprints for each document type and handles the full pipeline: split, classify, extract, normalize, and validate with confidence scores."
    },
    {
        "question": "What is the 'circuit breaker' pattern (automatic cutoff) in agent architectures?",
        "options": [
            {
                "id": "A",
                "text": "A physical hardware device installed in data center racks that protects servers from electrical power surges"
            },
            {
                "id": "B",
                "text": "A pattern that stops requests to a failing component temporarily, allowing it to recover"
            },
            {
                "id": "C",
                "text": "A rate limiter that caps the maximum number of API requests per second using token bucket algorithms"
            },
            {
                "id": "D",
                "text": "A load balancer that distributes incoming traffic evenly across agent instances using health-check probes"
            }
        ],
        "correct_answer": "B",
        "explanation": "Circuit breakers detect elevated error rates, temporarily halt requests (blocked mode), then probe for recovery — preventing cascading failures in agent workflows."
    },
    {
        "question": "Which Bedrock Guardrails feature checks that model responses are grounded in provided reference material?",
        "options": [
            {
                "id": "A",
                "text": "Content filters that detect harmful text across hate, insults, sexual, violence, and misconduct categories"
            },
            {
                "id": "B",
                "text": "Word filters that use case-insensitive whole-word matching to block profanity and custom-defined terms"
            },
            {
                "id": "C",
                "text": "Contextual grounding checks"
            },
            {
                "id": "D",
                "text": "Denied topics that use semantic matching to block user-defined subjects in both inputs and model outputs"
            }
        ],
        "correct_answer": "C",
        "explanation": "Contextual grounding checks verify that model responses are factually grounded in the provided source material, helping reduce hallucinations."
    },
    {
        "question": "What is 'idempotency' and why is it important for agents?",
        "options": [
            {
                "id": "A",
                "text": "The ability to run on multiple cloud platforms and operating systems simultaneously — enables vendor portability"
            },
            {
                "id": "B",
                "text": "An operation producing the same result when executed multiple times — enables safe retries"
            },
            {
                "id": "C",
                "text": "The ability to accept and process inputs in any arbitrary order without dependencies — enables parallelism"
            },
            {
                "id": "D",
                "text": "Running identical application code across multiple AWS regions with automatic state synchronization"
            }
        ],
        "correct_answer": "B",
        "explanation": "Idempotent operations can be safely retried after failures without risk of duplicate side effects, which is critical for reliable agent task execution."
    },
    {
        "question": "What does AgentCore Identity provide for AI agents?",
        "options": [
            {
                "id": "A",
                "text": "Managed user authentication with hosted login pages, MFA, and social federation for end-user applications"
            },
            {
                "id": "B",
                "text": "Centralized API key management and automatic rotation for external third-party service integrations"
            },
            {
                "id": "C",
                "text": "DNS-based service discovery using AWS Cloud Map that enables agents to locate peer services by name"
            },
            {
                "id": "D",
                "text": "Unique verifiable identities for agents with fine-grained access control and a token vault"
            }
        ],
        "correct_answer": "D",
        "explanation": "AgentCore Identity assigns unique, verifiable identities to agents, centralizes token issuance and the token vault, and enables secure interactions with enterprise systems."
    },
    {
        "question": "What is a 'swarm' pattern in multi-agent systems?",
        "options": [
            {
                "id": "A",
                "text": "A hierarchical pattern where one supervisor agent decomposes tasks and delegates them to specialized worker agents"
            },
            {
                "id": "B",
                "text": "A geo-distribution pattern where agents are deployed across multiple AWS regions for latency optimization"
            },
            {
                "id": "C",
                "text": "A redundancy pattern where all agents process the same request independently to ensure fault-tolerant results"
            },
            {
                "id": "D",
                "text": "Agents working independently on overlapping aspects of a problem, sharing findings without centralized supervision"
            }
        ],
        "correct_answer": "D",
        "explanation": "Swarm patterns leverage parallel exploration and diverse perspectives for emergent problem-solving, requiring controls for redundancy prevention and convergence detection."
    },
    {
        "question": "What is hierarchical chunking best suited for?",
        "options": [
            {
                "id": "A",
                "text": "Complex documents with nested structures, like academic papers with nested tables"
            },
            {
                "id": "B",
                "text": "Short FAQ documents with simple question-answer pairs and consistent single-paragraph formatting throughout"
            },
            {
                "id": "C",
                "text": "Streaming real-time IoT sensor data that requires continuous ingestion with sub-second processing latency"
            },
            {
                "id": "D",
                "text": "Audio transcription files generated by Amazon Transcribe with speaker diarization and timestamp metadata"
            }
        ],
        "correct_answer": "A",
        "explanation": "Hierarchical chunking preserves parent-child relationships in documents, making it ideal for technical docs and papers with complex formatting and nested structures."
    },
    {
        "question": "What does Amazon Bedrock prompt caching do?",
        "options": [
            {
                "id": "A",
                "text": "Caches the full model response for identical prompts and returns it instantly on subsequent matching requests"
            },
            {
                "id": "B",
                "text": "Stores versioned prompt templates in a managed repository with rollback, A/B testing, and approval workflows"
            },
            {
                "id": "C",
                "text": "Caches the stable system prompt prefix to reduce per-invocation input token costs"
            },
            {
                "id": "D",
                "text": "Pre-computes and stores vector embeddings for frequently used prompts to accelerate semantic search retrieval"
            }
        ],
        "correct_answer": "C",
        "explanation": "Prompt caching reduces cost by caching the stable prefix (system prompt, tool definitions) so it isn't re-processed on every invocation, saving input token costs."
    },
    {
        "question": "What is 'agent cognition'?",
        "options": [
            {
                "id": "A",
                "text": "The total hardware resources including GPU memory, compute units, and network bandwidth consumed during inference"
            },
            {
                "id": "B",
                "text": "Perceiving context, formulating a plan, selecting actions, and evaluating outcomes"
            },
            {
                "id": "C",
                "text": "The agent's built-in natural language understanding and generation capability for multi-turn user conversations"
            },
            {
                "id": "D",
                "text": "The supervised fine-tuning and reinforcement learning process used to specialize a model for a specific domain"
            }
        ],
        "correct_answer": "B",
        "explanation": "Agent cognition encompasses context retrieval, prompt construction, model inference, output parsing, and action selection — powered by LLM inference."
    }
];
