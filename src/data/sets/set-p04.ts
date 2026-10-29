import { RawQuestion } from '../../types';

export const SET_P04_QUESTIONS: RawQuestion[] = [
    {
        "question": "A SaaS company hosts a generative AI chatbot that serves thousands of concurrent users. The chatbot uses a large, expensive FM on Amazon Bedrock for all requests. Cost analysis reveals that most user queries are simple greetings or straightforward FAQ-style questions that a smaller model could handle equally well. Only a small fraction of requests require the reasoning capabilities of the larger model.\n\nThe company wants to reduce inference costs without degrading response quality for complex queries. The company does not want to build custom routing logic.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Use Amazon Bedrock Intelligent Prompt Routing with a default prompt router for the model family.",
                "explanation": "Intelligent Prompt Routing in Amazon Bedrock dynamically predicts the response quality of each model for each request and routes the request to the model with the best response quality within a model family. Simple queries are routed to a smaller, lower-cost model, and complex queries are routed to the larger model. Default prompt routers are provided by Amazon Bedrock, so no custom routing logic is needed. This can reduce costs by up to 30% without compromising accuracy.",
                "references":
                [
                    {
                        "title": "Understanding intelligent prompt routing in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Deploy a classifier model on Amazon SageMaker to categorize each query as simple or complex, then route to the appropriate Bedrock model.",
                "explanation": "A custom classifier could route queries, but building, training, deploying, and maintaining a separate SageMaker model adds significant operational complexity. The company wants to avoid building custom routing logic.",
                "references":
                [
                    {
                        "title": "Understanding intelligent prompt routing in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Switch all requests to the smaller model to reduce costs.",
                "explanation": "Using only the smaller model reduces cost but degrades response quality for complex queries. The company wants to maintain quality for those queries.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock Cost Optimization",
                        "url": "https://aws.amazon.com/bedrock/cost-optimization/"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Purchase Provisioned Throughput for the large model to get a volume discount.",
                "explanation": "Provisioned Throughput reserves capacity at a consistent price but does not reduce per-request cost by routing simple queries to a cheaper model. The company would still pay for the large model for every request.",
                "references":
                [
                    {
                        "title": "Increase model invocation capacity with Provisioned Throughput in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A startup is building a multi-tenant AI assistant platform. Each tenant requires a different FM, different system instructions, and different sets of tools (action groups). Tenants are onboarded and modified frequently. The startup does not want to create and maintain hundreds of pre-configured Amazon Bedrock agents.\n\nThe startup needs to configure the agent's model, instructions, and action groups dynamically at the time each request is processed.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Create one Amazon Bedrock agent per tenant with tenant-specific configurations and update each agent when tenant settings change.",
                "explanation": "Creating a separate agent per tenant would work functionally but requires managing hundreds of agents. Each configuration change requires updating and preparing the agent, which adds latency and operational overhead for a frequently changing tenant base.",
                "references":
                [
                    {
                        "title": "Automate tasks in your application using AI agents",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use the InvokeInlineAgent API to configure the FM, instructions, action groups, and knowledge bases dynamically at runtime for each request.",
                "explanation": "Inline agents allow dynamic configuration at runtime through the InvokeInlineAgent API. The startup can specify the foundation model, instructions, action groups, guardrails, and knowledge bases at invocation time without pre-creating agents. This eliminates the need to manage separate agent resources per tenant and supports instant configuration changes.",
                "references":
                [
                    {
                        "title": "Configure an inline agent at runtime",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-create-inline.html"
                    },
                    {
                        "title": "Build a dynamic, role-based AI agent using Amazon Bedrock inline agents",
                        "url": "https://aws.amazon.com/blogs/machine-learning/build-a-dynamic-role-based-ai-agent-using-amazon-bedrock-inline-agents/"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Use Amazon Bedrock Flows with a condition node that routes each tenant to a different prompt node.",
                "explanation": "Flows can implement conditional routing, but each tenant would still need its own prompt node configuration within the flow. As tenants are added or modified, the flow definition must be updated. This does not provide true runtime dynamic configuration.",
                "references":
                [
                    {
                        "title": "Build an end-to-end generative AI workflow with Amazon Bedrock Flows",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Store tenant configurations in Amazon DynamoDB and pass the full configuration as part of the system prompt to a single shared agent.",
                "explanation": "Passing configuration details in the system prompt does not change the agent's actual tools or model. The agent would still use the same action groups and FM for all tenants. System prompt content cannot add or remove action groups or switch the underlying model.",
                "references":
                [
                    {
                        "title": "Configure an inline agent at runtime",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-create-inline.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A mortgage lender processes thousands of loan application packets daily. Each packet contains multiple document types including W-2 forms, pay stubs, bank statements, and tax returns. The lender needs to automatically classify each document, extract key fields such as income amounts and employer names, and validate that extracted values conform to expected formats.\n\nThe lender wants a managed solution that handles classification, extraction, normalization, and validation without building custom ML pipelines.\n\nWhich AWS service will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Amazon Textract with custom queries for each document type.",
                "explanation": "Amazon Textract extracts text, forms, and tables from documents. However, Textract does not automatically classify documents into types, does not normalize extracted values into standard formats, and does not validate extracted data against business rules. The lender would need to build classification and validation logic separately.",
                "references":
                [
                    {
                        "title": "Detect signatures on documents or images using the signatures feature in Amazon Textract",
                        "url": "https://aws.amazon.com/blogs/machine-learning/detect-signatures-on-documents-or-images-using-the-signatures-feature-in-amazon-textract/"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Amazon Bedrock Data Automation with blueprints configured for each document type.",
                "explanation": "Amazon Bedrock Data Automation provides automatic document splitting, classification, extraction, normalization, and validation in a single managed service. Blueprints define the extraction schema for each document type. The service automatically classifies incoming documents and routes them to the appropriate blueprint. It also provides confidence scores and bounding box data for transparency, and supports value normalization and cross-field validation rules.",
                "references":
                [
                    {
                        "title": "Scalable intelligent document processing using Amazon Bedrock Data Automation",
                        "url": "https://aws.amazon.com/blogs/machine-learning/scalable-intelligent-document-processing-using-amazon-bedrock-data-automation/"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Build a custom pipeline with Amazon Comprehend for classification and Amazon Textract for extraction, connected by AWS Step Functions.",
                "explanation": "This approach could work but requires the lender to build, orchestrate, and maintain a custom pipeline with multiple services. Normalization and validation would need to be implemented separately. This does not meet the requirement for a managed solution without custom ML pipelines.",
                "references":
                [
                    {
                        "title": "Simplify multimodal generative AI with Amazon Bedrock Data Automation",
                        "url": "https://aws.amazon.com/blogs/machine-learning/simplify-multimodal-generative-ai-with-amazon-bedrock-data-automation/"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Ingest the documents into an Amazon Bedrock knowledge base and use the RetrieveAndGenerate API to extract fields.",
                "explanation": "Knowledge bases are designed for RAG, not structured document processing. RetrieveAndGenerate retrieves relevant passages and generates natural language answers. It does not reliably extract specific fields with confidence scores, perform classification, or validate data against business rules.",
                "references":
                [
                    {
                        "title": "Retrieve data and generate AI responses with Amazon Bedrock Knowledge Bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A ride-sharing company uses ML models for real-time pricing and driver matching. The models require features such as current demand in a zone, driver availability, and weather conditions. These features must be available with single-digit millisecond latency during inference. The same features are also used for offline model training with historical data.\n\nThe company wants a single system that serves features for both real-time inference and offline training without maintaining separate feature pipelines.\n\nWhich AWS service will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Amazon ElastiCache for Redis with periodic exports to Amazon S3 for training.",
                "explanation": "ElastiCache provides low-latency reads, but it is not purpose-built for ML features. Periodic S3 exports would require custom synchronization logic. ElastiCache does not provide built-in feature versioning, lineage tracking, or automatic replication to an offline store.",
                "references":
                [
                    {
                        "title": "Create, store, and share features with Feature Store",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Amazon SageMaker Feature Store configured in Online and Offline mode.",
                "explanation": "SageMaker Feature Store is purpose-built for storing, sharing, and managing ML features. In Online and Offline mode, features written to the online store for real-time inference are automatically replicated to the offline store (backed by Amazon S3) for training and batch inference. The online store provides single-digit millisecond latency. This eliminates the need for separate feature pipelines.",
                "references":
                [
                    {
                        "title": "Create, store, and share features with Feature Store",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Amazon DynamoDB with DynamoDB Streams writing to an Amazon S3 data lake for training.",
                "explanation": "DynamoDB provides low-latency reads, and Streams can replicate data to S3 via Lambda. However, this requires custom integration code and does not provide built-in ML feature management such as feature group organization, discoverability, or time-travel queries for point-in-time training datasets.",
                "references":
                [
                    {
                        "title": "Create, store, and share features with Feature Store",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Amazon Bedrock Knowledge Bases with a structured data store connection.",
                "explanation": "Knowledge Bases with structured data stores convert natural language queries to SQL for data retrieval. This is designed for question-answering over databases, not for serving ML features at single-digit millisecond latency during model inference.",
                "references":
                [
                    {
                        "title": "Build a knowledge base by connecting to a structured data store",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-build-structured.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A law firm uses an Amazon Bedrock knowledge base for legal research. Attorneys report that retrieval results are often only loosely related to their queries. The knowledge base uses semantic vector search, but many retrieved chunks mention similar legal concepts without actually answering the specific question.\n\nThe firm wants to improve the relevance of retrieved results so that the most pertinent passages appear first, without rebuilding the vector index or changing the embeddings model.\n\nWhich solution will MOST effectively improve retrieval relevance?",
        "options":
        [
            {
                "id": "A",
                "text": "Increase the number of retrieved results from 5 to 50.",
                "explanation": "Retrieving more results increases the chance of including relevant passages but also returns many more irrelevant ones. The FM must process more tokens, increasing cost and latency. The ranking order of results does not improve.",
                "references":
                [
                    {
                        "title": "Configure and customize queries and response generation",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Enable a reranking model in the knowledge base retrieval configuration.",
                "explanation": "Reranker models in Amazon Bedrock assess the relevance of each retrieved chunk to the specific query using deeper semantic understanding. The reranker reorders results so the most relevant passages appear first. This produces fewer but more relevant results without rebuilding the index or changing the embeddings model. The higher-quality results also reduce the tokens sent to the FM for generation.",
                "references":
                [
                    {
                        "title": "Improve the relevance of query responses with a reranker model in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/rerank.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Switch from semantic search to hybrid search.",
                "explanation": "Hybrid search combines semantic search with keyword search, which helps with exact term matching. However, the problem is that semantically similar but non-answering passages rank highly. Hybrid search improves keyword recall but does not reorder results by query-specific relevance. A reranker is more targeted at the relevance-ranking problem.",
                "references":
                [
                    {
                        "title": "Configure and customize queries and response generation",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Re-ingest the documents with semantic chunking and a lower breakpoint threshold.",
                "explanation": "Semantic chunking can improve chunk boundaries, but it requires re-ingestion and does not directly address the ranking of results. Chunks may still be semantically similar but not directly relevant to the query.",
                "references":
                [
                    {
                        "title": "How content chunking works for knowledge bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A company uses Amazon Bedrock Guardrails with a third-party FM hosted on Amazon SageMaker. The application sends user prompts to the SageMaker endpoint and returns the model's response. The company wants to apply the same content filtering, denied topic detection, and PII redaction to both the user prompt and the model response.\n\nThe company cannot use the Amazon Bedrock InvokeModel API because the model is hosted on SageMaker, not on Amazon Bedrock.\n\nWhich approach will allow the company to use Amazon Bedrock Guardrails with the SageMaker-hosted model?",
        "options":
        [
            {
                "id": "A",
                "text": "Call the ApplyGuardrail API on the user prompt before sending it to SageMaker, and call it again on the model response before returning it to the user.",
                "explanation": "The ApplyGuardrail API evaluates text independently of any foundation model invocation. The company can call it with source=INPUT to evaluate the user prompt, then call the SageMaker endpoint, and finally call ApplyGuardrail with source=OUTPUT to evaluate the model response. This decoupled approach works with any model hosted anywhere, including SageMaker endpoints.",
                "references":
                [
                    {
                        "title": "Use the ApplyGuardrail API in your application",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-use-independent-api.html"
                    },
                    {
                        "title": "Implement model-independent safety measures with Amazon Bedrock Guardrails",
                        "url": "https://aws.amazon.com/blogs/machine-learning/implement-model-independent-safety-measures-with-amazon-bedrock-guardrails/"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Attach the guardrail directly to the SageMaker endpoint configuration.",
                "explanation": "Amazon Bedrock Guardrails cannot be attached to SageMaker endpoint configurations. Guardrails are a Bedrock feature that is applied through Bedrock APIs (InvokeModel, Converse, or ApplyGuardrail), not through SageMaker endpoint settings.",
                "references":
                [
                    {
                        "title": "Detect and filter harmful content by using Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Import the SageMaker model into Amazon Bedrock using Custom Model Import, then apply the guardrail inline.",
                "explanation": "Custom Model Import supports specific open-source model architectures in Safetensors format. The third-party model may not be compatible. Even if import were possible, it would require changing the inference pipeline from SageMaker to Bedrock, which is a significant architectural change.",
                "references":
                [
                    {
                        "title": "Use Custom model import to import a customized open-source model into Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-import-model.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Build a custom content filter using Amazon Comprehend to replicate the guardrail functionality.",
                "explanation": "Building a custom content filter with Comprehend would require implementing each guardrail capability (content filters, denied topics, PII detection, word filters) from scratch. This duplicates managed functionality that the ApplyGuardrail API already provides.",
                "references":
                [
                    {
                        "title": "Use the ApplyGuardrail API in your application",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-use-independent-api.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A company wants to build a generative AI application that can answer natural language questions about sales data stored in an Amazon Redshift data warehouse. The data includes tables for orders, products, and customers. The application must convert user questions into SQL queries, run them against Redshift, and return natural language answers.\n\nThe company does not want to build a custom text-to-SQL pipeline.\n\nWhich solution will meet these requirements with the LEAST development effort?",
        "options":
        [
            {
                "id": "A",
                "text": "Create an Amazon Bedrock knowledge base connected to the Amazon Redshift data warehouse as a structured data store. Use the RetrieveAndGenerate API to answer natural language questions.",
                "explanation": "Amazon Bedrock Knowledge Bases supports connecting to structured data stores including Amazon Redshift. The service converts natural language questions into SQL queries, executes them against the data warehouse, and uses an FM to generate natural language responses. This managed NL-to-SQL capability requires no custom text-to-SQL pipeline.",
                "references":
                [
                    {
                        "title": "Build a knowledge base by connecting to a structured data store",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-build-structured.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Export the Redshift data to Amazon S3 as CSV files, ingest them into an unstructured knowledge base, and use vector search to answer questions.",
                "explanation": "Exporting relational data as CSV files and using vector search loses the relational structure. Aggregation queries (such as total sales by region) cannot be reliably answered from chunked text. This approach is designed for unstructured documents, not structured databases.",
                "references":
                [
                    {
                        "title": "Retrieve data and generate AI responses with Amazon Bedrock Knowledge Bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Build a custom AWS Lambda function that uses an FM to generate SQL from user questions, runs the SQL against Redshift, and formats the response.",
                "explanation": "A custom Lambda function could implement text-to-SQL, but the company must build and maintain the prompt engineering for SQL generation, query validation, error handling, and response formatting. This requires significant development effort.",
                "references":
                [
                    {
                        "title": "Build a knowledge base by connecting to a structured data store",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-build-structured.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use Amazon Q Business with a Redshift connector to answer questions about the sales data.",
                "explanation": "Amazon Q Business provides managed connectors for many enterprise data sources. However, Amazon Q Business is designed primarily for unstructured enterprise content (documents, wikis, knowledge articles) rather than SQL-based analytics on data warehouse tables.",
                "references":
                [
                    {
                        "title": "Key concepts of Amazon Q Business",
                        "url": "https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/concepts-terms.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A company deploys AI agents using Amazon Bedrock AgentCore Runtime. The agents need to interact with the company's internal REST APIs and third-party services. The company wants to expose these APIs as tools that agents can discover and invoke, using a standard protocol.\n\nThe company does not want to write custom integration code for each API. The APIs already have well-defined interfaces.\n\nWhich Amazon Bedrock AgentCore capability will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Amazon Bedrock AgentCore Gateway to convert existing APIs into MCP-compatible tools.",
                "explanation": "AgentCore Gateway converts existing APIs, Lambda functions, and services into Model Context Protocol (MCP)-compatible tools. Agents can discover and invoke these tools through Gateway endpoints. The company does not need to write custom integration code for each API because Gateway handles the conversion to a standard protocol.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock AgentCore Gateway",
                        "url": "https://docs.aws.amazon.com/marketplace/latest/userguide/bedrock-agentcore-gateway.html"
                    },
                    {
                        "title": "Deployment Pattern 1 - Amazon Bedrock AgentCore",
                        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/mcp-deployment-patterns-on-aws/deployment-pattern-1-amazon-bedrock-agent-core.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Amazon Bedrock AgentCore Memory to cache API responses for faster tool invocations.",
                "explanation": "AgentCore Memory is designed for maintaining conversational context across sessions, not for converting APIs into agent tools or caching API responses.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock AgentCore",
                        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/amazon-bedrock-agent-core.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Amazon Bedrock AgentCore Identity to authenticate agents to the APIs.",
                "explanation": "AgentCore Identity manages agent identities and outbound authentication. While important for securing agent-to-service communication, Identity does not convert APIs into discoverable tools or provide a standard protocol for tool invocation.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock AgentCore",
                        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/amazon-bedrock-agent-core.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Create action groups in a traditional Amazon Bedrock Agent with OpenAPI schemas for each API.",
                "explanation": "Traditional Bedrock Agents with action groups can invoke APIs, but each agent must be pre-configured with the action groups. The company is using AgentCore Runtime, and the requirement is to make tools discoverable using a standard protocol. AgentCore Gateway provides this capability with MCP compatibility.",
                "references":
                [
                    {
                        "title": "Use action groups to define actions for your agent to perform",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-action-create.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A company has built a product recommendation system that uses Amazon Titan Multimodal Embeddings to generate vector representations of product images and descriptions. The system stores these embeddings and performs similarity searches to find visually and semantically similar products.\n\nA new requirement asks the system to support queries where a user uploads a photo of a product they saw in a store and the system finds the most similar products in the catalog.\n\nWhich capability of Amazon Titan Multimodal Embeddings makes this possible?",
        "options":
        [
            {
                "id": "A",
                "text": "Amazon Titan Multimodal Embeddings generates embeddings from both images and text in a shared vector space, so an image query can be compared against text-based product embeddings.",
                "explanation": "Amazon Titan Multimodal Embeddings creates embeddings for both images and text in a unified vector space. An image of a product and a text description of a similar product will have nearby vectors. This means a user can upload a photo and the system can find similar products even if the catalog entries were indexed using text descriptions, images, or both. The cross-modal similarity enables image-to-text and image-to-image search.",
                "references":
                [
                    {
                        "title": "Cost-effective document classification using the Amazon Titan Multimodal Embeddings Model",
                        "url": "https://aws.amazon.com/blogs/machine-learning/cost-effective-document-classification-using-the-amazon-titan-multimodal-embeddings-model/"
                    },
                    {
                        "title": "Overview of Amazon Titan models",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-models.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Amazon Titan Multimodal Embeddings can generate text descriptions from images, which are then used for keyword search.",
                "explanation": "Titan Multimodal Embeddings generates vector embeddings, not text descriptions. Image captioning is a different capability. The power of multimodal embeddings is that images and text are represented in the same vector space, enabling direct similarity comparison without converting between modalities.",
                "references":
                [
                    {
                        "title": "Overview of Amazon Titan models",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-models.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Amazon Titan Multimodal Embeddings uses image classification to label the uploaded photo, then performs a text search on the labels.",
                "explanation": "Multimodal embeddings do not perform image classification or labeling. They create dense vector representations that capture semantic meaning. Similarity search is performed in the vector space, not through labels or keywords.",
                "references":
                [
                    {
                        "title": "Enhance image search experiences with Amazon Personalize, Amazon OpenSearch Service, and Amazon Titan Multimodal Embeddings in Amazon Bedrock",
                        "url": "https://aws.amazon.com/blogs/machine-learning/enhance-image-search-experiences-with-amazon-personalize-amazon-opensearch-service-and-amazon-titan-multimodal-embeddings-in-amazon-bedrock/"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Amazon Titan Multimodal Embeddings stores the uploaded image in Amazon S3 and performs pixel-level comparison against catalog images.",
                "explanation": "Embeddings represent images as dense vectors capturing semantic meaning, not pixel-level data. Similarity search compares vectors using distance metrics, not pixel comparisons. The model does not store images in S3.",
                "references":
                [
                    {
                        "title": "Overview of Amazon Titan models",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-models.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A company needs to build a serverless generative AI workflow that performs the following steps:\n\n1. Accept a batch of customer reviews as input.\n2. For each review, invoke an FM on Amazon Bedrock to generate a sentiment summary.\n3. Aggregate the summaries into a final report.\n4. Store the report in Amazon S3.\n\nThe company wants to orchestrate this workflow without writing custom retry logic or error handling code. The company also does not want to manage any compute infrastructure.\n\nWhich solution will meet these requirements with the LEAST development effort?",
        "options":
        [
            {
                "id": "A",
                "text": "Build an AWS Step Functions Standard workflow that uses the optimized Amazon Bedrock InvokeModel integration in a Map state to process reviews in parallel, then writes the report to S3.",
                "explanation": "Step Functions provides an optimized integration with Amazon Bedrock's InvokeModel API, allowing direct model invocation from a Task state without Lambda. A Map state can iterate over the reviews and invoke the model for each one. Step Functions provides built-in retry, error handling, and timeout mechanisms. The final report can be written to S3 using the S3 integration. No compute infrastructure is needed.",
                "references":
                [
                    {
                        "title": "Invoke and customize Amazon Bedrock models with Step Functions",
                        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/connect-bedrock.html"
                    },
                    {
                        "title": "Build generative AI apps using AWS Step Functions and Amazon Bedrock",
                        "url": "https://aws.amazon.com/blogs/aws/build-generative-ai-apps-using-aws-step-functions-and-amazon-bedrock/"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Create an AWS Lambda function that loops through the reviews, calls the Bedrock InvokeModel API for each, and writes the results to S3.",
                "explanation": "A Lambda function would work but requires the company to write custom retry logic, error handling, and timeout management. If the batch is large, the Lambda function could exceed its 15-minute execution limit. This approach requires more development effort than Step Functions.",
                "references":
                [
                    {
                        "title": "What is AWS Lambda?",
                        "url": "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Use Amazon Bedrock batch inference to process all reviews at once.",
                "explanation": "Batch inference processes prompts asynchronously in bulk. However, batch inference does not provide the workflow orchestration needed to aggregate summaries into a report or write to S3. Additional code would be needed to handle the aggregation and storage steps.",
                "references":
                [
                    {
                        "title": "Process multiple prompts with batch inference",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use Amazon Bedrock Flows with a prompt node for each review.",
                "explanation": "Flows process a single input through a sequence of nodes. Processing a batch of reviews would require iterating outside the flow or creating a dynamic number of prompt nodes, which Flows does not support. Step Functions with a Map state is designed for this iteration pattern.",
                "references":
                [
                    {
                        "title": "Build an end-to-end generative AI workflow with Amazon Bedrock Flows",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A financial compliance team needs to audit all FM invocations made through Amazon Bedrock in their AWS account. The audit must capture the full request prompt, the model's response, the model ID, the timestamp, and the identity of the caller. The audit logs must be stored for 7 years to meet regulatory requirements.\n\nWhich combination of steps will meet these requirements?\n(Select TWO)",
        "options":
        [
            {
                "id": "A",
                "text": "Enable Amazon Bedrock model invocation logging with text logging to Amazon S3. Configure an S3 lifecycle policy to retain logs for 7 years.",
                "explanation": "Model invocation logging captures full request and response data, model ID, timestamps, and caller identity for all supported Bedrock API operations. Logging to Amazon S3 supports large payloads and long-term retention. An S3 lifecycle policy ensures logs are retained for the required 7 years. S3 also supports encryption and access controls for compliance.",
                "references":
                [
                    {
                        "title": "Monitor model invocation using CloudWatch Logs and Amazon S3",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use AWS CloudTrail to log all Bedrock API calls, which automatically captures request and response payloads.",
                "explanation": "CloudTrail logs API activity including who called an API and when. However, CloudTrail captures management events and metadata, not the full request prompts and model response content. CloudTrail alone does not meet the requirement to capture full request and response data.",
                "references":
                [
                    {
                        "title": "How CloudTrail works",
                        "url": "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/how-cloudtrail-works.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Create an IAM service role for model invocation logging with permissions scoped to the specific S3 bucket and CloudWatch log group.",
                "explanation": "Model invocation logging requires an IAM service role with permissions to write to the configured S3 bucket and optionally to CloudWatch Logs. The role must be scoped to the specific destination resources. Without this role, logging cannot deliver the log data to the destination.",
                "references":
                [
                    {
                        "title": "Monitor model invocation using CloudWatch Logs and Amazon S3",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Enable Amazon CloudWatch Metrics for Amazon Bedrock to capture detailed invocation data.",
                "explanation": "CloudWatch Metrics for Bedrock provide aggregate operational metrics such as invocation count, latency, and token usage. Metrics do not capture individual request prompts, model responses, or caller identity. Metrics are for monitoring, not for auditing individual invocations.",
                "references":
                [
                    {
                        "title": "Monitor Amazon Bedrock with Amazon CloudWatch",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-cw.html"
                    }
                ]
            },
            {
                "id": "E",
                "text": "Use Amazon Bedrock Guardrails to log all blocked content for compliance.",
                "explanation": "Guardrails filter content and can log blocked interactions, but they do not log all invocations. Only requests that trigger a guardrail action are logged by guardrails. The requirement is to audit all FM invocations, not just blocked ones.",
                "references":
                [
                    {
                        "title": "Detect and filter harmful content by using Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
                    }
                ]
            }
        ],
        "correct_answer": ["A", "C"]
    },
    {
        "question": "A data science team needs to create a large labeled dataset for training a text classification model. The team has 100,000 unlabeled text samples. A subset of samples requires domain expertise to label correctly, while simpler samples can be labeled by less specialized workers.\n\nThe team wants to minimize the total cost of labeling by automatically labeling the samples that are easy for the model to classify, and routing only the uncertain samples to human annotators.\n\nWhich Amazon SageMaker feature will meet this requirement?",
        "options":
        [
            {
                "id": "A",
                "text": "Amazon SageMaker Ground Truth with automated data labeling enabled.",
                "explanation": "SageMaker Ground Truth with automated data labeling creates a model that learns from human annotations and automatically labels data objects that the model can classify with high confidence. Only the data objects where the model is uncertain are sent to human annotators. As the model improves, more objects are labeled automatically. This reduces the number of objects that require human labeling, lowering the total cost.",
                "references":
                [
                    {
                        "title": "Using the Amazon Mechanical Turk Workforce",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-workforce-management-public.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use an FM on Amazon Bedrock to label all 100,000 samples in a single batch inference job.",
                "explanation": "An FM could generate labels, but FM-generated labels are probabilistic and may not be accurate enough for training a specialized classification model. There is no mechanism to identify uncertain samples or route them to human review. The company also cannot control the labeling quality or apply domain-specific annotation guidelines.",
                "references":
                [
                    {
                        "title": "Process multiple prompts with batch inference",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Manually label all 100,000 samples using a private workforce in SageMaker Ground Truth.",
                "explanation": "Manually labeling all samples with human annotators provides high-quality labels but is the most expensive approach. The team wants to minimize cost by automatically labeling easy samples.",
                "references":
                [
                    {
                        "title": "Workforce Authentication and Restrictions",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-security-workforce-authentication.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use Amazon Comprehend to automatically classify all samples and use the results as training labels.",
                "explanation": "Amazon Comprehend provides pre-built classification models for common categories. For domain-specific classification, Comprehend may not produce accurate labels. Using potentially inaccurate labels to train another model could degrade performance. There is also no human-in-the-loop mechanism for uncertain cases.",
                "references":
                [
                    {
                        "title": "Amazon SageMaker Ground Truth with automated data labeling",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-workforce-management-public.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A company has an Amazon Bedrock knowledge base that indexes internal policy documents stored in Amazon S3. The company's help desk website is also a valuable source of answers that is updated daily. The help desk content is not available as files but is accessible through the company's website at help.example.com.\n\nThe company wants to add the help desk website content to the same knowledge base so that queries can retrieve answers from both the policy documents and the help desk website.\n\nWhich solution will meet this requirement?",
        "options":
        [
            {
                "id": "A",
                "text": "Add a Web Crawler data source to the existing knowledge base with the help desk URL. Sync the data source on a daily schedule.",
                "explanation": "Amazon Bedrock Knowledge Bases supports a Web Crawler data source connector that crawls specified URLs and ingests the content into the knowledge base. By adding a Web Crawler data source pointing to help.example.com alongside the existing S3 data source, the knowledge base can retrieve answers from both sources. A daily sync schedule keeps the help desk content current.",
                "references":
                [
                    {
                        "title": "Crawl web pages for your knowledge base",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/webcrawl-data-source-connector.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Scrape the website with a custom Lambda function, save the HTML to S3, and ingest it through the existing S3 data source.",
                "explanation": "A custom scraping pipeline would work but adds operational complexity. The company must build and maintain the scraper, handle website changes, and manage the HTML-to-text conversion. The Web Crawler data source connector provides this functionality as a managed feature.",
                "references":
                [
                    {
                        "title": "Crawl web pages for your knowledge base",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/webcrawl-data-source-connector.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Create a separate knowledge base for the website content and query both knowledge bases from the application.",
                "explanation": "Two separate knowledge bases would require the application to query each one, merge results, and handle deduplication. A single knowledge base with multiple data sources provides unified retrieval across all content without application-level merging.",
                "references":
                [
                    {
                        "title": "Retrieve data and generate AI responses with Amazon Bedrock Knowledge Bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Add the help desk URL as a prompt instruction in the system prompt so the FM can browse the website when needed.",
                "explanation": "FMs on Amazon Bedrock do not browse websites during inference. Adding a URL in the system prompt does not give the model access to the website content. The content must be indexed in the knowledge base for retrieval.",
                "references":
                [
                    {
                        "title": "Prompt engineering concepts",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A healthcare company uses an Amazon Bedrock knowledge base for a patient FAQ chatbot. The knowledge base indexes documents about various medical specialties. Each document has a metadata field called specialty with values such as cardiology, dermatology, and orthopedics.\n\nWhen a patient selects their medical specialty in the chatbot UI before asking a question, the application must restrict knowledge base retrieval to only documents from that specialty.\n\nWhich approach will meet this requirement?",
        "options":
        [
            {
                "id": "A",
                "text": "Create a separate knowledge base for each specialty and route queries to the appropriate knowledge base.",
                "explanation": "Separate knowledge bases per specialty would work but adds operational overhead for managing multiple knowledge bases. When new specialties are added, a new knowledge base must be created. A single knowledge base with metadata filtering is more maintainable.",
                "references":
                [
                    {
                        "title": "Retrieve data and generate AI responses with Amazon Bedrock Knowledge Bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Pass an explicit metadata filter for the specialty attribute in the retrieval configuration of the Retrieve or RetrieveAndGenerate API request.",
                "explanation": "Amazon Bedrock Knowledge Bases supports metadata filtering. The application can pass an explicit filter in the retrieval configuration that restricts results to documents where the specialty metadata matches the patient's selected specialty. This is applied programmatically in the API request, ensuring only relevant documents are retrieved.",
                "references":
                [
                    {
                        "title": "Include metadata in a data source to improve knowledge base query",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-metadata.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Prepend the specialty name to the user's question so that semantic search favors documents from that specialty.",
                "explanation": "Prepending the specialty name might bias semantic search slightly, but it does not guarantee that only documents from that specialty are returned. Other specialties with similar terminology could still appear in results. An explicit metadata filter provides deterministic filtering.",
                "references":
                [
                    {
                        "title": "Configure and customize queries and response generation",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Configure a guardrail with denied topics for each specialty that the patient did not select.",
                "explanation": "Denied topics block content about specific topics entirely. Using denied topics would prevent the chatbot from ever discussing those specialties, even when a different patient selects them. Denied topics are static guardrail configurations, not per-request dynamic filters.",
                "references":
                [
                    {
                        "title": "Block denied topics to help remove harmful content",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-denied-topics.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A company wants to generate an image of a new product packaging design using Amazon Bedrock. The design must show a specific product bottle placed on a wooden table with soft lighting. The company has an existing photo of the product bottle.\n\nWhich Amazon Bedrock capability allows the company to generate an image that incorporates the existing product photo into a new scene?",
        "options":
        [
            {
                "id": "A",
                "text": "Use an Amazon Titan Image Generator model with image conditioning to reference the existing product photo while generating the new scene.",
                "explanation": "Amazon Titan Image Generator supports image conditioning, which allows providing a reference image that guides the generation of a new image. The company can provide the product bottle photo as a reference and use a text prompt describing the desired scene. The model generates a new image that incorporates the visual characteristics of the reference product into the specified setting.",
                "references":
                [
                    {
                        "title": "Overview of Amazon Titan models",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-models.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use Amazon Titan Multimodal Embeddings to generate a vector from the product photo and pass it to a text generation model.",
                "explanation": "Titan Multimodal Embeddings creates vector representations for similarity search and classification. Embeddings cannot be used to generate images or to condition an image generation model. A different capability is needed.",
                "references":
                [
                    {
                        "title": "Overview of Amazon Titan models",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-models.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Use Amazon Rekognition to analyze the product photo and pass the analysis to a text-to-image model.",
                "explanation": "Amazon Rekognition can analyze images to detect objects and labels, but passing text labels to a text-to-image model does not preserve the specific visual appearance of the product bottle. The generated image would be based on generic descriptions, not the actual product design.",
                "references":
                [
                    {
                        "title": "Overview of Amazon Titan models",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-models.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use Amazon Bedrock Data Automation to extract features from the product photo and reconstruct it in a new scene.",
                "explanation": "Bedrock Data Automation is designed for document processing tasks such as classification, extraction, and validation of structured data from documents. It is not an image generation or scene composition tool.",
                "references":
                [
                    {
                        "title": "Scalable intelligent document processing using Amazon Bedrock Data Automation",
                        "url": "https://aws.amazon.com/blogs/machine-learning/scalable-intelligent-document-processing-using-amazon-bedrock-data-automation/"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A company uses Amazon Bedrock to power a customer-facing chatbot. The security team requires that all inference traffic between the company's VPC and Amazon Bedrock must not traverse the public internet.\n\nWhich configuration will meet this requirement?",
        "options":
        [
            {
                "id": "A",
                "text": "Create a VPC endpoint (AWS PrivateLink) for the Amazon Bedrock Runtime service in the company's VPC. Configure the application to use the VPC endpoint.",
                "explanation": "AWS PrivateLink provides private connectivity between VPCs and AWS services without exposing traffic to the public internet. Creating a VPC endpoint for the Bedrock Runtime service ensures that all inference API calls travel through the AWS private network. No internet gateway, NAT device, or VPN connection is needed.",
                "references":
                [
                    {
                        "title": "Data protection in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Configure a VPN connection from the VPC to the AWS network and route Bedrock traffic through the VPN.",
                "explanation": "A VPN connection provides encrypted connectivity but is typically used for connecting on-premises networks to AWS. For VPC-to-AWS service communication, a VPC endpoint (PrivateLink) is the standard approach. A VPN adds unnecessary complexity and latency for this use case.",
                "references":
                [
                    {
                        "title": "Data protection in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Enable encryption in transit with TLS for all Bedrock API calls.",
                "explanation": "All Bedrock API calls already use TLS encryption in transit by default. TLS encrypts the data but does not change the network path. Traffic still routes through the public internet unless a VPC endpoint is configured.",
                "references":
                [
                    {
                        "title": "Data protection in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Deploy the application in a private subnet with a NAT gateway for outbound access to Bedrock.",
                "explanation": "A NAT gateway provides outbound internet access from a private subnet. Traffic to Bedrock through a NAT gateway still traverses the public internet, which does not meet the security requirement.",
                "references":
                [
                    {
                        "title": "Data protection in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A retail company uses an Amazon Bedrock agent to help store managers generate weekly performance reports. The agent invokes an FM to analyze sales data and produce narrative summaries. The company notices that the agent occasionally produces different report formats and sometimes includes speculative forecasts that are not based on the provided data.\n\nThe company wants the agent to strictly follow a specific report template and to avoid generating speculative content. The company has tried adding instructions to the agent but the FM does not consistently follow them.\n\nWhich approach will MOST reliably control the agent's output format and behavior?",
        "options":
        [
            {
                "id": "A",
                "text": "Increase the temperature parameter to give the model more flexibility to follow the template.",
                "explanation": "Increasing temperature adds more randomness to the model's output, which would make the format even less consistent. Lower temperature would be more appropriate for consistent formatting, but temperature alone does not enforce a specific template structure.",
                "references":
                [
                    {
                        "title": "Influence response generation with inference parameters",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Customize the agent's orchestration prompt template to include detailed formatting rules and explicit constraints against speculation in the advanced prompt configuration.",
                "explanation": "Amazon Bedrock Agents supports advanced prompt templates that override the default prompts for preprocessing, orchestration, knowledge base response generation, and post-processing steps. Customizing the orchestration prompt template allows the company to embed detailed formatting rules and behavioral constraints directly into the prompt that the FM processes at each orchestration step. This provides more reliable control than high-level agent instructions because the formatting rules are embedded in the actual prompt template.",
                "references":
                [
                    {
                        "title": "Enhance agent's accuracy using advanced prompt templates in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/advanced-prompts.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Create a guardrail with a denied topic for speculative forecasts and apply it to the agent.",
                "explanation": "A denied topic could block speculative content, but denied topics work by detecting and blocking entire responses that match a topic description. This could result in blocked responses rather than corrected ones. Denied topics also do not control the output format or template structure.",
                "references":
                [
                    {
                        "title": "Block denied topics to help remove harmful content",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-denied-topics.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Switch to a different FM that is more instruction-following.",
                "explanation": "A different model might follow instructions better in some cases, but no model deterministically follows every instruction. The underlying issue is that the formatting and behavioral requirements need to be embedded at the prompt template level for maximum reliability, regardless of which model is used.",
                "references":
                [
                    {
                        "title": "Supported foundation models in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A company builds a RAG application using Amazon Bedrock Knowledge Bases. The application indexes technical documentation that includes complex diagrams, flowcharts, and tables embedded in PDF files. Users report that answers about information contained in diagrams and tables are often inaccurate or missing.\n\nThe company wants to improve how the knowledge base processes and understands visual content within the PDF documents.\n\nWhich solution will address this issue?",
        "options":
        [
            {
                "id": "A",
                "text": "Increase the chunk size to ensure that diagrams and their surrounding text are captured in the same chunk.",
                "explanation": "Increasing chunk size includes more surrounding text but does not extract information from visual elements like diagrams and flowcharts. Standard text chunking skips non-text content. The visual information is still lost.",
                "references":
                [
                    {
                        "title": "How content chunking works for knowledge bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Configure a foundation model or Amazon Bedrock Data Automation as a parser for the data source to extract and describe visual content from PDFs during ingestion.",
                "explanation": "Amazon Bedrock Knowledge Bases supports using a foundation model or Amazon Bedrock Data Automation as a parser during data ingestion. These parsers can interpret visual elements such as tables, diagrams, and charts within documents, converting them into text descriptions that are then chunked and indexed. This enables the knowledge base to retrieve information that was originally represented visually.",
                "references":
                [
                    {
                        "title": "How content chunking works for knowledge bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
                    },
                    {
                        "title": "Building a multimodal RAG based application using Amazon Bedrock Data Automation and Amazon Bedrock Knowledge Bases",
                        "url": "https://aws.amazon.com/blogs/machine-learning/building-a-multimodal-rag-based-application-using-amazon-bedrock-data-automation-and-amazon-bedrock-knowledge-bases/"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Switch from semantic search to hybrid search to better match visual content.",
                "explanation": "Hybrid search combines semantic and keyword search. If the visual content was never extracted into text during ingestion, neither semantic nor keyword search can find it. The issue is at the parsing stage, not the search stage.",
                "references":
                [
                    {
                        "title": "Configure and customize queries and response generation",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Convert all PDFs to plain text before uploading to S3 to simplify parsing.",
                "explanation": "Converting PDFs to plain text would strip out all visual elements including diagrams, tables, and flowcharts. This makes the problem worse by permanently removing the visual information that users are asking about.",
                "references":
                [
                    {
                        "title": "How content chunking works for knowledge bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A company runs an Amazon Bedrock agent that assists HR staff with employee questions. The agent has a knowledge base with HR policies and an action group that can look up employee records. During peak enrollment periods, the agent experiences increased latency and occasional throttling errors.\n\nThe company wants to ensure the agent can handle traffic spikes during enrollment periods without being throttled. The company's policy requires all inference to remain in the us-east-1 Region.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Request a service quota increase for the model's tokens-per-minute and requests-per-minute limits in us-east-1.",
                "explanation": "Increasing the on-demand service quotas raises the maximum allowed request rate for the account in the Region. On-demand inference in a single Region respects the account's quota limits. Requesting a quota increase for the specific model ensures the agent can handle higher traffic volumes during enrollment periods while remaining in us-east-1.",
                "references":
                [
                    {
                        "title": "Quotas for Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/quotas.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use a cross-Region inference profile to distribute requests across multiple Regions.",
                "explanation": "Cross-Region inference distributes requests to other Regions. This violates the requirement that all inference must remain in us-east-1.",
                "references":
                [
                    {
                        "title": "Increase throughput with cross-Region inference",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Switch the agent to a smaller model that has higher default throughput limits.",
                "explanation": "A smaller model might have higher default quotas, but it may not provide the same quality of responses for complex HR policy questions. The company should address the throughput issue directly rather than compromising model quality.",
                "references":
                [
                    {
                        "title": "Supported foundation models in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Enable prompt caching to reduce the number of tokens processed per request.",
                "explanation": "Prompt caching reduces latency and cost for repeated prompt prefixes but does not increase the throughput quota. If requests are being throttled due to quota limits, caching does not prevent additional requests from being throttled.",
                "references":
                [
                    {
                        "title": "Prompt caching for faster model inference",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A company has built a generative AI application that uses multiple FMs on Amazon Bedrock for different tasks: a large model for complex reasoning, a small model for summarization, and an embeddings model for search. The company wants centralized visibility into cost and usage across all models.\n\nThe company needs to track the total input tokens, output tokens, and invocation count per model per day. The company does not want to instrument the application code to collect these metrics.\n\nWhich solution will meet this requirement with the LEAST effort?",
        "options":
        [
            {
                "id": "A",
                "text": "Use Amazon CloudWatch metrics in the AWS/Bedrock namespace to view InputTokenCount, OutputTokenCount, and Invocations metrics, grouped by the ModelId dimension.",
                "explanation": "Amazon Bedrock publishes runtime metrics to CloudWatch automatically, including InputTokenCount, OutputTokenCount, and Invocations. These metrics include a ModelId dimension that allows grouping by model. CloudWatch dashboards can visualize daily usage across all models without any application code changes.",
                "references":
                [
                    {
                        "title": "Monitor Amazon Bedrock with Amazon CloudWatch",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-cw.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Enable model invocation logging and parse the logs with Amazon Athena to aggregate token counts per model per day.",
                "explanation": "Model invocation logging captures detailed per-request data including token counts. However, setting up logging, configuring Athena tables, and writing aggregation queries requires more effort than using the built-in CloudWatch metrics that are already published automatically.",
                "references":
                [
                    {
                        "title": "Monitor model invocation using CloudWatch Logs and Amazon S3",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Use AWS Cost Explorer to view Bedrock costs broken down by model.",
                "explanation": "Cost Explorer shows spending but reports costs in dollars, not token counts or invocation counts. The company needs to track technical usage metrics (tokens and invocations), not just financial spend.",
                "references":
                [
                    {
                        "title": "Monitor Amazon Bedrock with Amazon CloudWatch",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-cw.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Add custom logging in the application code to record token counts for each API call to a DynamoDB table.",
                "explanation": "Custom logging requires instrumenting the application code, which the company wants to avoid. This approach also requires building and maintaining a DynamoDB table, write logic, and aggregation queries.",
                "references":
                [
                    {
                        "title": "Monitor Amazon Bedrock with Amazon CloudWatch",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-cw.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    }
];
