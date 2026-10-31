import { RawQuestion } from '../../types';

export const FLASH_CARDS_001: RawQuestion[] = [
    {
        "question": "What is Amazon Bedrock AgentCore?",
        "options": [
            {
                "id": "A",
                "text": "A managed ML training platform for custom models"
            },
            {
                "id": "D",
                "text": "An agentic platform to build, deploy, and operate AI agents securely at scale using any framework or model"
            },
            {
                "id": "C",
                "text": "A vector database for storing embeddings"
            },
            {
                "id": "B",
                "text": "A prompt management console for foundation models"
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
                "id": "B",
                "text": "Optimize model inference latency"
            },
            {
                "id": "A",
                "text": "Detect and filter undesirable content and protect sensitive information in inputs and outputs"
            },
            {
                "id": "C",
                "text": "Manage agent deployment infrastructure"
            },
            {
                "id": "D",
                "text": "Route requests between multiple models"
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
                "text": "A technique for fine-tuning models on custom data"
            },
            {
                "id": "C",
                "text": "A method that retrieves relevant external information and includes it in the model's context to improve accuracy"
            },
            {
                "id": "B",
                "text": "A model compression technique to reduce inference cost"
            },
            {
                "id": "D",
                "text": "A way to chain multiple model calls sequentially"
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
                "text": "RAG that uses larger embedding models"
            },
            {
                "id": "D",
                "text": "RAG where the agent actively controls the retrieval process, deciding when, what, and how to retrieve iteratively"
            },
            {
                "id": "C",
                "text": "RAG that stores results in a relational database"
            },
            {
                "id": "B",
                "text": "RAG that only works with Amazon Bedrock models"
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
                "text": "Total time to generate a complete response"
            },
            {
                "id": "D",
                "text": "Time between submitting a request and receiving the first output token"
            },
            {
                "id": "C",
                "text": "Time to load the model into memory"
            },
            {
                "id": "B",
                "text": "Time between consecutive token generations"
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
                "text": "An agent that performs all tasks for other agents"
            },
            {
                "id": "B",
                "text": "A dedicated agent that resolves conflicts between specialized agents and manages resource contention"
            },
            {
                "id": "C",
                "text": "An agent that monitors system performance"
            },
            {
                "id": "D",
                "text": "An agent that handles all user-facing communication"
            }
        ],
        "correct_answer": "B",
        "explanation": "The arbiter agent resolves conflicts, manages resource contention, and keeps multi-agent behavior aligned with task objectives, activating only when coordination is needed."
    },
    {
        "question": "What is prompt injection?",
        "options": [
            {
                "id": "B",
                "text": "Adding more examples to improve model accuracy"
            },
            {
                "id": "A",
                "text": "Content in an agent's input that attempts to override instructions or cause unauthorized actions"
            },
            {
                "id": "C",
                "text": "Injecting cached responses into a prompt for speed"
            },
            {
                "id": "D",
                "text": "Dynamically loading tool descriptions into the system prompt"
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
                "text": "A protocol for compressing model weights during inference"
            },
            {
                "id": "D",
                "text": "An open standard for connecting AI agents to external tools, data sources, and services"
            },
            {
                "id": "C",
                "text": "A security protocol for encrypting agent-to-agent messages"
            },
            {
                "id": "B",
                "text": "A format for storing conversation history"
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
                "text": "Content filters"
            },
            {
                "id": "B",
                "text": "Denied topics"
            },
            {
                "id": "C",
                "text": "Sensitive information filters"
            },
            {
                "id": "D",
                "text": "Word filters"
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
                "text": "The tendency of models to produce identical outputs for the same input"
            },
            {
                "id": "D",
                "text": "The inherent randomness causing the same input to produce different outputs across invocations"
            },
            {
                "id": "C",
                "text": "A model's ability to process multiple tasks simultaneously"
            },
            {
                "id": "B",
                "text": "The speed at which tokens are generated"
            }
        ],
        "correct_answer": "D",
        "explanation": "Stochasticity is a fundamental characteristic of LLMs that must be accounted for in reliability and testing strategies for agent systems."
    },
    {
        "question": "What is the purpose of a dead-letter queue (DLQ) in agent messaging?",
        "options": [
            {
                "id": "B",
                "text": "Store successfully processed messages for audit"
            },
            {
                "id": "A",
                "text": "Capture messages that fail repeated processing attempts to prevent blocking healthy execution"
            },
            {
                "id": "C",
                "text": "Queue high-priority messages for faster processing"
            },
            {
                "id": "D",
                "text": "Route messages between different agent types"
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
                "text": "Routes prompts to the nearest AWS Region for lower latency"
            },
            {
                "id": "B",
                "text": "Predicts response quality and routes requests to the optimal model within a family based on complexity"
            },
            {
                "id": "C",
                "text": "Distributes requests evenly across multiple model endpoints"
            },
            {
                "id": "D",
                "text": "Compresses prompts before sending them to the model"
            }
        ],
        "correct_answer": "B",
        "explanation": "Intelligent Prompt Routing dynamically routes simple queries to smaller models and complex queries to larger ones within a model family, reducing costs up to 30%."
    },
    {
        "question": "What is a 'hallucination' in generative AI?",
        "options": [
            {
                "id": "B",
                "text": "When a model refuses to generate any output"
            },
            {
                "id": "A",
                "text": "When a model generates plausible-sounding but factually incorrect or fabricated information"
            },
            {
                "id": "C",
                "text": "When a model produces output in the wrong language"
            },
            {
                "id": "D",
                "text": "When a model runs out of context window space"
            }
        ],
        "correct_answer": "A",
        "explanation": "Hallucination is a key reliability risk in agentic AI, especially when agents make decisions based on model-generated information rather than retrieved facts."
    },
    {
        "question": "What does the InvokeInlineAgent API allow in Amazon Bedrock?",
        "options": [
            {
                "id": "B",
                "text": "Invoke a pre-configured agent with fixed settings"
            },
            {
                "id": "A",
                "text": "Dynamically configure the FM, instructions, action groups, and knowledge bases at runtime without pre-creating an agent"
            },
            {
                "id": "C",
                "text": "Run an agent inside a Lambda function"
            },
            {
                "id": "D",
                "text": "Stream agent responses over WebSocket connections"
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
                "text": "Short-term (session) memory"
            },
            {
                "id": "B",
                "text": "Episodic memory"
            },
            {
                "id": "C",
                "text": "Long-term (persistent) memory"
            },
            {
                "id": "D",
                "text": "Procedural memory"
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
                "text": "Orchestrating parallel model inference calls"
            },
            {
                "id": "B",
                "text": "Coordinating distributed transactions with compensating actions for rollback on failure"
            },
            {
                "id": "C",
                "text": "Caching intermediate agent results"
            },
            {
                "id": "D",
                "text": "Logging agent decisions for compliance"
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
                "text": "Gradually reducing model size over time to save cost"
            },
            {
                "id": "B",
                "text": "Shutting down the entire system when one component fails"
            },
            {
                "id": "C",
                "text": "Maintaining partial functionality when components fail rather than experiencing complete failure"
            },
            {
                "id": "D",
                "text": "Slowly reducing the number of agents in production"
            }
        ],
        "correct_answer": "C",
        "explanation": "Graceful degradation involves detecting degraded conditions, activating fallback behaviors, and communicating reduced capabilities to users instead of full system failure."
    },
    {
        "question": "What is the purpose of Amazon Bedrock cross-region inference?",
        "options": [
            {
                "id": "B",
                "text": "Train models across multiple regions simultaneously"
            },
            {
                "id": "A",
                "text": "Automatically route inference requests to other regions for higher availability and throughput"
            },
            {
                "id": "C",
                "text": "Replicate model weights to edge locations"
            },
            {
                "id": "D",
                "text": "Synchronize agent memory across regions"
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
                "text": "A list of all models available in Amazon Bedrock"
            },
            {
                "id": "B",
                "text": "A structured classification of each agent's skills, limitations, and requirements for routing and substitution"
            },
            {
                "id": "C",
                "text": "A cost breakdown of agent operations"
            },
            {
                "id": "D",
                "text": "A security classification of data sensitivity levels"
            }
        ],
        "correct_answer": "B",
        "explanation": "Capability taxonomies enable orchestrators to make informed routing decisions and implement automatic fallback strategies when preferred agents are unavailable."
    },
    {
        "question": "What does Amazon Bedrock Data Automation provide for document processing?",
        "options": [
            {
                "id": "B",
                "text": "Only OCR text extraction from scanned documents"
            },
            {
                "id": "A",
                "text": "Document splitting, classification, extraction, normalization, and validation in a single managed service"
            },
            {
                "id": "C",
                "text": "Only PDF to text conversion"
            },
            {
                "id": "D",
                "text": "Manual document labeling and annotation tools"
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
                "text": "A hardware device that protects servers from power surges"
            },
            {
                "id": "B",
                "text": "A pattern that stops requests to a failing component temporarily, allowing it to recover"
            },
            {
                "id": "C",
                "text": "A rate limiter that caps requests per second"
            },
            {
                "id": "D",
                "text": "A load balancer that distributes traffic evenly"
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
                "text": "Content filters"
            },
            {
                "id": "B",
                "text": "Word filters"
            },
            {
                "id": "C",
                "text": "Contextual grounding checks"
            },
            {
                "id": "D",
                "text": "Denied topics"
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
                "text": "The ability to run on multiple platforms — enables portability"
            },
            {
                "id": "B",
                "text": "An operation producing the same result when executed multiple times — enables safe retries after failures"
            },
            {
                "id": "C",
                "text": "The ability to process inputs in any order — enables parallelism"
            },
            {
                "id": "D",
                "text": "Running identical code across regions — enables disaster recovery"
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
                "text": "User authentication and login pages"
            },
            {
                "id": "D",
                "text": "Unique verifiable identities for agents with fine-grained access control and a token vault"
            },
            {
                "id": "C",
                "text": "DNS-based service discovery for agents"
            },
            {
                "id": "B",
                "text": "API key management for external services"
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
                "text": "A pattern where one supervisor agent delegates all tasks to worker agents"
            },
            {
                "id": "D",
                "text": "A pattern where agents work independently on overlapping aspects of a problem, sharing findings through a common workspace without centralized supervision"
            },
            {
                "id": "C",
                "text": "A pattern where all agents process the same request for redundancy"
            },
            {
                "id": "B",
                "text": "A pattern where agents are deployed across multiple regions"
            }
        ],
        "correct_answer": "D",
        "explanation": "Swarm patterns leverage parallel exploration and diverse perspectives for emergent problem-solving, requiring controls for redundancy prevention and convergence detection."
    },
    {
        "question": "What is hierarchical chunking best suited for?",
        "options": [
            {
                "id": "B",
                "text": "Short FAQ documents with simple structure"
            },
            {
                "id": "A",
                "text": "Complex documents with nested structures, like academic papers with nested tables"
            },
            {
                "id": "C",
                "text": "Streaming real-time data from IoT sensors"
            },
            {
                "id": "D",
                "text": "Audio transcription files"
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
                "text": "Caches the full model response for identical prompts"
            },
            {
                "id": "C",
                "text": "Caches the processed stable system prompt prefix to reduce per-invocation input token costs"
            },
            {
                "id": "B",
                "text": "Stores prompt templates in a version-controlled repository"
            },
            {
                "id": "D",
                "text": "Pre-computes embeddings for frequently used prompts"
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
                "text": "The hardware resources an agent consumes during inference"
            },
            {
                "id": "B",
                "text": "The reasoning process: perceiving context, formulating a plan, selecting actions, and evaluating outcomes"
            },
            {
                "id": "C",
                "text": "The agent's ability to communicate with users in natural language"
            },
            {
                "id": "D",
                "text": "The model fine-tuning process for domain specialization"
            }
        ],
        "correct_answer": "B",
        "explanation": "Agent cognition encompasses context retrieval, prompt construction, model inference, output parsing, and action selection — powered by LLM inference."
    }
];
