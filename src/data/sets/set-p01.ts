import { RawQuestion } from '../../types';

export const SET_P01_QUESTIONS: RawQuestion[] = [
    {
        "question": "A medical diagnostics company runs a chat-based AI application to help customers find appropriate tests from a catalog of diagnostic tests. Each test contains detailed descriptions, target conditions, specimen types, and specimen collection guidelines. The application uses Amazon Bedrock Knowledge Bases supported by Amazon OpenSearch Serverless to search the catalog of available diagnostic tests.\n\nInitially, the search provides sufficient recall. However, the search is unable to prioritize the most relevant documents. As a result, the company decides to continue using hybrid search. To achieve the desired accuracy, the company increases response results to 50 to pass to the LLM for summarization.\n\nThe company experiences an increase in customer use of the application. The company notices an increase in token usage. Now, the company wants to reduce token usage for each customer interaction without impacting accuracy.\n\nWhich solution will meet these requirements with the LEAST effort?",
        "options":
        [
            {
                "id": "A",
                "text": "Reconfigure the chunking strategy to use semantic-based adaptive chunking with overlap. Reduce the retrieval set to the top ten documents to pass to the LLM for summarization.",
                "explanation": "Adaptive semantic chunking with overlap is a strategy that you can use to improve retrieval quality. This strategy splits documents at logical boundaries rather than by fixed token costs. Reducing the retrieval set to ten documents would lower token usage and provide a broader context. However, you must reprocess and reindex the document corpus. Therefore, this solution requires additional effort.",
                "references":
                [
                    {
                        "title": "Semantic chunking in Amazon Bedrock Knowledge Bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html#kb-semantic-chunking"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Configure the knowledge base to use semantic search as the retrieval method.",
                "explanation": "Semantic search retrieves results based on vector similarity rather than keywords alone. Semantic search can improve relevance and provides good recall, but not precision. The company already uses hybrid search through OpenSearch Serverless, which includes semantic search. Switching to semantic-only search would not address the ranking issue or the token usage issue.",
                "references":
                [
                    {
                        "title": "Semantic search in OpenSearch",
                        "url": "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/semantic-search.html"
                    },
                    {
                        "title": "Hybrid search in Amazon Bedrock Knowledge Bases",
                        "url": "https://aws.amazon.com/blogs/machine-learning/amazon-bedrock-knowledge-bases-now-supports-hybrid-search/"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Configure the knowledge base to invoke a reranker model. Pass only the top five ranked documents to the LLM for summarization.",
                "explanation": "Knowledge bases support reranker models that can reorder retrieval results to improve precision. You can enable reranking and limit the retrieval set to the top five ranked documents. This solution maintains accuracy while reducing the tokens that pass to the LLM. This solution requires minimal effort because you can directly make a change in the knowledge base to improve search precision and reduce token costs.",
                "references":
                [
                    {
                        "title": "Reranker models in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/rerank.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Limit the context window by passing only the top five retrieved documents to the LLM for summarization.",
                "explanation": "Limiting the context window to pass only five documents can reduce token usage. However, this solution does not solve the root problem of poor relevant ranking. Without reranking, the five chosen documents might not be the most relevant, which could reduce the accuracy and quality of the answers. Any method that reduces document count without improving the ranking mechanism does not meet the requirement to maintain accuracy while reducing token usage.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock Knowledge Bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
                    },
                    {
                        "title": "Maximum number of retrieved results in Knowledge Bases",
                        "url": "https://aws.amazon.com/blogs/machine-learning/knowledge-bases-for-amazon-bedrock-now-supports-custom-prompts-for-the-retrieveandgenerate-api-and-configuration-of-the-maximum-number-of-retrieved-results/"
                    }
                ]
            }
        ],
        "correct_answer": "C"
    },
    {
        "question": "A financial analytics company wants to create a generative AI (GenAI) solution that can analyze a large amount of unstructured data. The unstructured data includes financial filing forms, quarterly earnings reports, analyst presentations, and audio/video (A/V) recordings of earnings calls. A GenAI developer must create a solution that can process the large amount of unstructured data.\n\nWhich solution will meet these requirements with the LEAST operational overhead?",
        "options":
        [
            {
                "id": "A",
                "text": "Use an Anthropic Claude FM in Amazon Bedrock with structured prompts to process multimodal content into standardized formats. Configure prompt templates for different document types. Create JSON schemas for validation. Store parsed data in Amazon S3 with automatic versioning for RAG workflows.",
                "explanation": "You can use Claude with structured prompts for multimodal content processing. However, this solution requires extensive prompt engineering and ongoing maintenance. You must create and maintain prompt templates and JSON schemas for different document types. Therefore, this solution requires additional operational overhead.",
                "references":
                [
                    {
                        "title": "Claude capabilities in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-claude.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use Amazon Textract and Amazon Transcribe to process multimodal content. Store extracted information in JSON format in an Amazon S3 bucket. Create a knowledge base by using Amazon Bedrock Knowledge Bases for RAG workflows.",
                "explanation": "Amazon Textract and Amazon Transcribe can process documents and A/V content. However, you must manage multiple services and coordinate outputs. Storing intermediate results in Amazon S3 and managing the JSON formatting requires additional operational overhead.",
                "references":
                [
                    {
                        "title": "Amazon Textract",
                        "url": "https://docs.aws.amazon.com/textract/latest/dg/what-is.html"
                    },
                    {
                        "title": "Amazon Transcribe",
                        "url": "https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Store the data in an Amazon S3 bucket. Create a knowledge base by using Amazon Bedrock Knowledge Bases for RAG workflows.",
                "explanation": "Amazon S3 can store unstructured data and Knowledge Bases can provide RAG workflows. However, Knowledge Bases does not support audio or video files. This solution does not process the A/V recording data types. Storing raw unstructured data without proper processing would limit the effectiveness of RAG implementation and could reduce the quality of generated insights.",
                "references":
                [
                    {
                        "title": "Supported document formats for Knowledge Base data sources",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-ds.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use Amazon Bedrock Data Automation (BDA) as a parser to extract insights from multimodal content. Create a knowledge base by using Amazon Bedrock Knowledge Bases for RAG workflows.",
                "explanation": "BDA extracts insights from unstructured multimodal content including documents, forms, and A/V recordings. BDA streamlines the processing of diverse financial data sources and can automatically create knowledge bases for RAG workflows. This solution automatically handles the processing of different data types and the integration with Knowledge Bases. Therefore, this solution requires the least operational overhead.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock Data Automation (BDA)",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/bda.html"
                    },
                    {
                        "title": "Building an AI-powered assistant for investment research with Amazon Bedrock",
                        "url": "https://aws.amazon.com/blogs/machine-learning/part-3-building-an-ai-powered-assistant-for-investment-research-with-multi-agent-collaboration-in-amazon-bedrock-and-amazon-bedrock-data-automation/"
                    }
                ]
            }
        ],
        "correct_answer": "D"
    },
    {
        "question": "A financial services company implemented a RAG-based document analysis system. The company used Amazon Bedrock Knowledge Bases to process quarterly reports and financial statements. The system currently processes thousands of documents daily.\n\nThe system uses a fixed-chunking approach that splits documents into 1,000-token segments without considering content boundaries. Recently, retrieval costs increased because of token inefficiency. Many chunks contain partial or fragmented financial information. The company needs to reduce retrieval costs while maintaining accuracy and comprehension of complex financial data.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Use Amazon Nova in Amazon Bedrock for chunk embedding and retrieval pre-processing. Use Anthropic Claude in Amazon Bedrock for complex summarization and analysis tasks.",
                "explanation": "Amazon Nova Lite is optimized for lower-cost inference and model orchestration across Nova and Claude can reduce overall compute costs. However, switching between models can increase total token usage because of redundant processing and context recreation. Retrieval will still require excessive tokens. This solution does not address the fundamental token efficiency issues within each model call.",
                "references":
                [
                    {
                        "title": "Amazon Nova models",
                        "url": "https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Enable semantic chunking in Knowledge Bases. Optimize the maximum tokens parameter.",
                "explanation": "Semantic chunking can group content into chunks that follow natural boundaries, such as paragraphs, tables, or sections. Semantic chunking provides meaningful content divisions while minimizing token waste and can prevent the fragmentation of financial data across chunks. You can adjust retrieval token limits to ensure that only the most relevant information passes to the model, which lowers costs while preserving comprehension. You can optimize the maximum tokens parameter to achieve the right balance between retrieval accuracy and token usage.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock Knowledge Bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
                    },
                    {
                        "title": "Semantic chunking in Knowledge Bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html#kb-semantic-chunking"
                    },
                    {
                        "title": "Contextual retrieval in Amazon Bedrock Knowledge Bases",
                        "url": "https://aws.amazon.com/blogs/machine-learning/contextual-retrieval-in-anthropic-using-amazon-bedrock-knowledge-bases/"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Reduce the chunk size in Knowledge Bases. Use Amazon Bedrock Agents with automated retrieval from the knowledge base.",
                "explanation": "Agents can automate knowledge base queries. However, agents do not inherently optimize token usage and automated retrieval might increase token consumption by including unnecessary context. Smaller chunks can improve retrieval precision, but could reduce the accuracy of the model.",
                "references":
                [
                    {
                        "title": "Contextual retrieval in Amazon Bedrock Knowledge Bases",
                        "url": "https://aws.amazon.com/blogs/machine-learning/contextual-retrieval-in-anthropic-using-amazon-bedrock-knowledge-bases/"
                    },
                    {
                        "title": "Amazon Bedrock Agents",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use an Anthropic Claude model in Amazon Bedrock with the maximum context window. Implement recursive summarization before ingestion for long documents.",
                "explanation": "You can use the maximum context window in a Claude model to process more content at once, and recursive summarization is a technique to condense long documents. However, this solution does not optimize token usage and does not address the issue of inefficient and fragmented fixed-size chunks. Using maximum context windows for all requests can lead to unnecessary token consumption and higher costs. Recursive summarization could cause information loss and increase total token usage through multiple model calls.",
                "references":
                [
                    {
                        "title": "TokenUsage API reference",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_TokenUsage.html"
                    },
                    {
                        "title": "Model parameters in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A retail company is implementing a generative AI (GenAI) powered customer service system by using Amazon Bedrock. The system must handle product inquiries and answer various customer questions through the company's website. The system will have significant traffic load level variations throughout the year. The system must access the company's extensive product catalog and customer data. The company wants to improve performance while maintaining response quality and accuracy.\n\nWhich combination of configurations will meet these requirements?\n(Select TWO)",
        "options":
        [
            {
                "id": "A",
                "text": "Create Amazon Bedrock knowledge bases with RAG that incorporate the product catalog and customer data. Remove outdated product data regularly.",
                "explanation": "You can create knowledge bases with RAG so that the system can incorporate an up-to-date product catalog and customer data. This configuration improves response accuracy and relevance by providing context from the company's specific information. Regularly removing outdated product data ensures that the knowledge base remains current.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock Knowledge Bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Deploy multiple FMs in parallel in Amazon Bedrock. Use A/B testing to dynamically route customer inquiries based on model performance.",
                "explanation": "Amazon Bedrock supports access to multiple FMs and A/B testing is an approach that you can use to compare model performance. However, deploying models in parallel and dynamically routing all inquiries does not meet the requirement to handle variable traffic loads while maintaining quality and accuracy.",
                "references":
                [
                    {
                        "title": "Foundation models in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/foundation-models-reference.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Use Amazon Bedrock batch inference to process customer inquiry files.",
                "explanation": "Batch inference can process many requests asynchronously. However, batch inference is not suitable for real-time customer service interactions. This configuration would introduce unnecessary latency and degrade the customer experience.",
                "references":
                [
                    {
                        "title": "Batch inference in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Implement response streaming on the FM.",
                "explanation": "Response streaming can improve perceived latency. However, response streaming does not meet the requirement to handle variable traffic loads or to maintain accuracy when accessing company data.",
                "references":
                [
                    {
                        "title": "Response generation in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
                    }
                ]
            },
            {
                "id": "E",
                "text": "Enable prompt caching for frequently asked questions and common inquiry patterns.",
                "explanation": "Prompt caching for frequently asked questions and common inquiry patterns can improve response times and reduce the load on an FM. This configuration is especially useful for a customer service system where many queries are likely to be repetitive.",
                "references":
                [
                    {
                        "title": "Prompt caching in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html"
                    }
                ]
            }
        ],
        "correct_answer":
        [
            "A",
            "E"
        ]
    },
    {
        "question": "A GenAI developer is designing a tool for an Amazon Bedrock agent. The tool provides sophisticated financial risk analysis by performing the following two key functions.\n\n1. The tool loads a 10 GB complex proprietary risk model into memory upon initialization.\n2. The tool maintains a persistent, long-lived WebSocket connection to a third-party service to receive real-time market data streams.\n\nThe agent will invoke the tool frequently to answer user queries. The solution must ensure that the risk model is not reloaded for each invocation and that the data stream connection is stable and always available.\n\nWhich approach will meet these requirements with the LEAST operational overhead?",
        "options":
        [
            {
                "id": "A",
                "text": "Package the tool and risk model into a container image. Deploy the image as an AWS Lambda function.",
                "explanation": "Lambda is ephemeral and event-driven. Therefore, Lambda is not suitable for this scenario. The multi-gigabyte risk model would need to be loaded during every cold start. Therefore, this approach would likely exceed the quotas for Lambda initialization and execution time. This approach could cause timeouts and poor performance. Lambda functions are not designed to maintain persistent, long-lived WebSocket connections.",
                "references":
                [
                    {
                        "title": "AWS Lambda quotas",
                        "url": "https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html#function-configuration-deployment-and-execution"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Deploy the tool on Amazon EC2 instances. Use a launch template with a preconfigured AMI that includes the risk model and WebSocket configuration.",
                "explanation": "You can use Amazon EC2 with launch templates and AMIs to preconfigure an instance with the risk model, and you can use WebSocket setup to make an MCP server run persistently. However, this approach requires lifecycle management, patching, and scaling of the EC2 instances. Therefore, this approach requires additional operational overhead.",
                "references":
                [
                    {
                        "title": "Amazon EC2 launch templates",
                        "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-launch-template.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Deploy the tool on an Amazon SageMaker Real-Time Inference endpoint. Use an initialization script to load the model.",
                "explanation": "SageMaker AI is designed to host large models, but SageMaker AI is optimized specifically for ML inference with a defined API contract and is not a general-purpose application hosting service. SageMaker Real-Time Inference endpoints are designed for model serving, but real-time inference endpoints are not optimized to maintain persistent WebSocket connections to external services.",
                "references":
                [
                    {
                        "title": "SageMaker real-time endpoints",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Deploy the tool as a containerized application on Amazon ECS. Use the AWS Fargate launch type.",
                "explanation": "This approach provides the most suitable architecture for a complex, stateful, and long-running tool. Amazon ECS on Fargate can run persistent containerized applications without server management. With this approach, the large risk model can be loaded into memory when the container starts, which avoids unacceptable latency on each call. Additionally, this approach supports the required long-lived WebSocket connection for the real-time data stream.",
                "references":
                [
                    {
                        "title": "Amazon ECS on AWS Fargate",
                        "url": "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html"
                    },
                    {
                        "title": "Architectural patterns for Amazon Bedrock agent tools",
                        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-serverless/pattern-agentic-ai-orchestration.html"
                    }
                ]
            }
        ],
        "correct_answer": "D"
    },
    {
        "question": "A company is implementing a RAG-based knowledge management system. The system will use Amazon Bedrock and Amazon OpenSearch Service. The system will ingest hundreds of new documents into the knowledge base on a daily basis. The system must maintain high accuracy and reliability for content across multiple departments.\n\nA GenAI developer wants to use Amazon Bedrock model evaluation to design a comprehensive evaluation process. The process must evaluate correctness, relevance, formality scale, and company-specific tone and style. The GenAI developer must run the evaluation on a weekly basis. The GenAI developer will create a RAG evaluation with LLM-as-a-judge and select the desired metrics.\n\nWhich solution will meet these requirements MOST cost-effectively?",
        "options":
        [
            {
                "id": "A",
                "text": "Create a human-validated evaluation dataset. Create custom metrics for formality scale and company-specific tone and style.",
                "explanation": "A human-validated dataset ensures an accurate representation of enterprise-specific use cases, terminology, and content patterns. Using LLM-as-a-judge with custom metrics provides an automated, consistent, and scalable evaluation. You can design custom metrics to assess formality scale and company-specific tone and style with consistent criteria.",
                "references":
                [
                    {
                        "title": "Create a dataset for a RAG evaluation",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation-prompt.html"
                    },
                    {
                        "title": "RAG evaluation metrics",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation-metrics.html"
                    },
                    {
                        "title": "RAG evaluation custom metrics",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-evaluation-custom-metrics-prompt-formats.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Create a human-validated evaluation dataset. Create a human-based model evaluation for formality scale and company-specific tone and style.",
                "explanation": "Using a human-validated dataset is most suitable for this scenario. However, human-based model evaluation is less efficient than custom metrics because of higher operational costs, longer evaluation cycles, and potential scoring inconsistencies. Managing both LLM and human evaluations adds unnecessary complexity to the process.",
                "references":
                [
                    {
                        "title": "Human-based model evaluation",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-human.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Use an industry-standard benchmark dataset. Create a human-based model evaluation for formality scale and company-specific tone and style.",
                "explanation": "An industry-standard benchmark dataset lacks enterprise-specific context and might not accurately represent real production scenarios or capture company-specific tone and style. Human-based model evaluation requires higher costs, longer evaluation cycles, and potential inconsistencies in scoring compared to custom metrics. To meet the requirements, you do not need to manage multiple evaluation types.",
                "references":
                [
                    {
                        "title": "Human-based model evaluation",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-human.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use an industry-standard benchmark dataset. Create custom metrics for formality scale and company-specific tone and style.",
                "explanation": "An industry-standard benchmark dataset lacks enterprise-specific context and might not accurately represent real production scenarios. You can use LLM-as-a-judge with custom metrics, but the dataset would compromise the evaluation results since an industry-standard benchmark dataset will not capture company-specific tone and style.",
                "references":
                [
                    {
                        "title": "RAG evaluation custom metrics",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-evaluation-custom-metrics-prompt-formats.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A retail company is using Amazon Bedrock to develop a generative AI (GenAI) application that will provide fashion recommendations to customers. The company wants to evaluate the quality of responses from two different FMs to determine which FM provides better fashion advice. Fashion experts who work for the company must perform the evaluations.\n\nWhich combination of steps will meet these requirements to set up an evaluation process?\n(Select THREE)",
        "options":
        [
            {
                "id": "A",
                "text": "Create a human-based evaluation job in Amazon Bedrock with custom metrics including \"Style Accuracy\".",
                "explanation": "You can create custom metrics for human evaluators to use when rating model responses. In this scenario, creating custom metrics that are specific to fashion recommendations would be suitable for the fashion experts to use when evaluating the models.",
                "references":
                [
                    {
                        "title": "HumanEvaluationCustomMetric",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/APIReference/API_HumanEvaluationCustomMetric.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Configure automatic model evaluation with built-in metrics for accuracy and coherence. Set up Amazon CloudWatch to monitor evaluation results.",
                "explanation": "You can use metrics, such as accuracy, in human evaluations. However, the metrics would be rated by humans, not automatically calculated.",
                "references":
                [
                    {
                        "title": "Accuracy evaluation",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-accuracy-evaluation.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Create an Amazon SageMaker Ground Truth labeling job. Specify \"AWS/Bedrock/Evaluation\" as the AwsManagedHumanLoopRequestSource.",
                "explanation": "Amazon Bedrock uses SageMaker Ground Truth for human workers. However, you do not need to create a labeling job in Ground Truth. Instead, you need to create a human-based evaluation in Amazon Bedrock.",
                "references":
                [
                    {
                        "title": "Create a model evaluation job that uses human workers",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-foundation-model-evaluate-human.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Create a custom prompt dataset with fashion-related queries in JSONL format. Store the dataset in an Amazon S3 bucket. Configure cross-origin resource sharing (CORS) permissions on the bucket.",
                "explanation": "Human-based model evaluations require a custom prompt dataset in JSONL format that is stored in an S3 bucket. For jobs that you create through the console, you must update the CORS configuration in the S3 bucket.",
                "references":
                [
                    {
                        "title": "Create a human-based model evaluation job",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-jobs-management-create-human.html"
                    }
                ]
            },
            {
                "id": "E",
                "text": "Use Amazon Comprehend to analyze the sentiment of model responses and automatically score responses based on positive fashion experts' feedback.",
                "explanation": "The company needs human fashion experts to evaluate the models. The company does not need automated sentiment analysis.",
                "references":
                [
                    {
                        "title": "Create a model evaluation job that uses human workers",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-foundation-model-evaluate-human.html"
                    }
                ]
            },
            {
                "id": "F",
                "text": "Create an Amazon Cognito user pool to manage the fashion expert workforce. Assign the fashion experts to a work team.",
                "explanation": "You must manage human evaluators as a work team. You can create a new Amazon Cognito managed work team by using the Amazon Bedrock console. For the fashion experts to evaluate the models, you must organize the fashion experts into a work team.",
                "references":
                [
                    {
                        "title": "Create a workforce",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-workforce-management-private-cognito.html"
                    },
                    {
                        "title": "Learn more about how to create a human-based model evaluation job",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-jobs-management-create-human.html"
                    }
                ]
            }
        ],
        "correct_answer":
        [
            "A",
            "D",
            "F"
        ]
    },
    {
        "question": "A company is deploying a generative AI (GenAI) solution across different business units to assist with documentation. The solution requires extensive testing and logging to provide audit trails and approval workflows of modifications throughout the solution's lifecycle. The solution must remain consistent in its instructions and responses. The solution must enforce role-based access to prompt templates and prevent inappropriate content generation.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Manage prompts in Amazon SageMaker Model Registry. Use SageMaker Clarify for real-time bias filtering and real-time toxicity filtering of model outputs. Set up AWS CloudTrail for audit logging.",
                "explanation": "Model Registry tracks model artifacts, not prompt templates. Clarify can evaluate bias and toxicity, but Clarify lacks real-time blocking integration with Amazon Bedrock prompts. CloudTrail can log API calls, but this solution does not address template governance and role consistency.",
                "references":
                [
                    {
                        "title": "Amazon SageMaker Model Registry",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html"
                    },
                    {
                        "title": "SageMaker Clarify",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-configure-processing-jobs.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use Amazon Bedrock Prompt Management to create prompt templates. Configure Amazon Bedrock Guardrails to enforce safety policies and role-based access controls (RBAC). Enable AWS CloudTrail with Amazon CloudWatch Logs to record all prompt invocations and template changes.",
                "explanation": "CloudTrail and CloudWatch Logs provide proper audit trails. Prompt Management and Guardrails cover template governance and safety. However, guardrails do not manage RBAC to templates.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock Prompt Management",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html"
                    },
                    {
                        "title": "Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
                    },
                    {
                        "title": "Amazon CloudWatch Logs",
                        "url": "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Manage prompt templates in Amazon S3 with object versioning enabled. Use Amazon Macie for toxic-content detection in generated text. Use AWS CloudTrail for audit logging.",
                "explanation": "S3 Versioning maintains file histories, but does not provide the necessary governance features to manage prompt templates or ensure consistent responses. Macie is designed to detect sensitive data in static content stored in Amazon S3, but cannot perform real-time content filtering or enforce safety policies for GenAI outputs, and cannot consider the requester's role or enforce prompt consistency requirements. CloudTrail provides audit logging capabilities, but this combination of services lacks the necessary features to manage prompt templates, enforce safety controls, and implement approval workflows to meet the requirements.",
                "references":
                [
                    {
                        "title": "Amazon S3 Versioning",
                        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html"
                    },
                    {
                        "title": "Amazon Macie",
                        "url": "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use Amazon Bedrock Prompt Management for parameterized templates and role definitions. Configure Amazon Bedrock Guardrails to enforce safety policies. Enable AWS CloudTrail with Amazon CloudWatch Logs to record all prompt invocations and template changes.",
                "explanation": "Prompt Management provides version-control and role-aware templates with built-in approval workflows. Guardrails apply configurable policies that automatically block unsafe generations. CloudTrail records every Amazon Bedrock API call, such as template creation, changes, and invocations. CloudWatch Logs can capture full prompt and response data. Therefore, this solution provides end-to-end traceability for auditors.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock Prompt Management",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html"
                    },
                    {
                        "title": "Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
                    },
                    {
                        "title": "AWS CloudTrail",
                        "url": "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/how-cloudtrail-works.html"
                    },
                    {
                        "title": "CloudWatch Logs",
                        "url": "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html"
                    }
                ]
            }
        ],
        "correct_answer": "D"
    },
    {
        "question": "A company fine-tunes a Meta Llama model by using proprietary training data in Amazon SageMaker AI. The company stores model weights in Hugging Face format. The company wants to import the model into Amazon Bedrock. The model files include Safetensors weights, configuration files, and tokenizer files. The model files are 45 GB in total size. The company needs a solution to provide a specific level of throughput for production workloads.\n\nWhich solution will meet these requirements with the LEAST operational overhead?",
        "options":
        [
            {
                "id": "A",
                "text": "Use Amazon Bedrock Custom Model Import to import the model files from Amazon S3. Deploy the model by using Amazon Bedrock Provisioned Throughput.",
                "explanation": "Custom Model Import supports importing Llama models in Hugging Face format from Amazon S3. For example, the Hugging Face format can include Safetensors weights, config.json files, and tokenizer files. After importing the model, the company can purchase Provisioned Throughput to provide dedicated compute capacity and throughput for production workloads. This approach meets both the import and throughput requirements.",
                "references":
                [
                    {
                        "title": "Using Custom Model Import to import customized models",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-import-model.html"
                    },
                    {
                        "title": "Purchasing Provisioned Throughput for custom models",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-model-use-pt.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Deploy the model directly on SageMaker AI endpoints. Integrate the model with Amazon Bedrock by using custom Amazon API Gateway configurations.",
                "explanation": "This approach does not use the Custom Model Import feature and would require complex custom integration work. Custom Model Import is specifically designed to import models from SageMaker AI and other environments, so you do not need custom API Gateway configurations.",
                "references":
                [
                    {
                        "title": "Using Custom Model Import to import customized models",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-import-model.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Convert the Hugging Face model to Amazon Bedrock format. Use Amazon Bedrock fine-tuning to recreate the model by using the training data.",
                "explanation": "You do not need to convert Hugging Face models to Amazon Bedrock format, since Custom Model Import directly supports Hugging Face format models. Additionally, recreating the model through fine-tuning would require access to the original training data. This approach would be unnecessarily complex because the fine-tuned model already exists.",
                "references":
                [
                    {
                        "title": "Supported model architectures for Custom Model Import",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-import-model.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use Amazon Bedrock Custom Model Import to import the Hugging Face format model files from Amazon S3. Deploy the model by using on-demand inference.",
                "explanation": "Custom Model Import can import Hugging Face format models from Amazon S3. However, on-demand inference does not provide guaranteed throughput. The company specifically requires a specific level of throughput for production workloads. On-demand inference operates on a pay-per-use basis without capacity guarantees.",
                "references":
                [
                    {
                        "title": "Deploy custom models for on-demand inference",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/deploy-custom-model-on-demand.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A company has a mobile app for users to record short videos. On the app, users can apply proprietary video and audio codecs to enhance the videos locally. The company wants to add features to summarize content and generate transcripts. The company wants features to detect objects and identify celebrities in the videos.\n\nWhich solution will meet these requirements with the LEAST operational overhead?",
        "options":
        [
            {
                "id": "A",
                "text": "Use an Amazon S3 presigned URL to upload videos to Amazon S3. Create an S3 event notification that invokes a Bedrock Data Automation (BDA) blueprint to orchestrate the processing steps. Use Amazon Rekognition for object detection and celebrity recognition. Use Amazon Bedrock FMs to generate summaries and transcripts.",
                "explanation": "Using S3 presigned URLs for secure uploads is the most suitable for this scenario. However, BDA has limitations for complex media processing workflows. S3 Event Notifications cannot directly trigger BDA blueprints. BDA has restricted FM options. This solution requires additional custom integration work and might not support all the required video processing capabilities through the BDA blueprint framework.",
                "references":
                [
                    {
                        "title": "S3 presigned URLs",
                        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html"
                    },
                    {
                        "title": "S3 Event Notifications and targets",
                        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html"
                    },
                    {
                        "title": "Bedrock Data Automation",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/bda.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use Amazon S3 PutObject to upload videos to Amazon S3. Create an S3 event notification that invokes an AWS Step Functions state machine. Set up the state machine to orchestrate processing by using AWS Lambda functions. Use Amazon Rekognition for object detection and celebrity recognition. Use an Amazon Bedrock FM for summarization and transcription.",
                "explanation": "Amazon S3 PutObject API operations require granting direct IAM permissions to users or applications, which violates the principle of least privilege. S3 Event Notifications cannot directly invoke Step Functions; you can use Lambda as an intermediary, but this solution requires additional operational overhead to create and manage the functions.",
                "references":
                [
                    {
                        "title": "S3 presigned URLs",
                        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html"
                    },
                    {
                        "title": "S3 Event Notifications and targets",
                        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html"
                    },
                    {
                        "title": "AWS service integrations with Step Functions",
                        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/connect-supported-services.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Use Amazon S3 PutObject to upload videos to Amazon S3. Create an S3 event notification that invokes an AWS Lambda function. Configure the function to process videos in parallel. Use AWS Step Functions for error handling and retries. Use Amazon Rekognition for object detection and celebrity recognition. Use Amazon Bedrock FMs to generate summaries and transcripts.",
                "explanation": "Amazon S3 PutObject API operations require granting direct IAM permissions to users or applications, which violates the principle of least privilege. Implementing each processing step as separate Lambda functions creates additional operational overhead, since managing multiple Lambda functions requires additional development effort. The solution relies solely on Amazon Bedrock FMs for all tasks, but Amazon Rekognition is a specialized computer vision service that is more suitable for celebrity recognition and object detection in videos.",
                "references":
                [
                    {
                        "title": "S3 presigned URLs",
                        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html"
                    },
                    {
                        "title": "Event bus targets",
                        "url": "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html"
                    },
                    {
                        "title": "AWS service integrations with Step Functions",
                        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/connect-supported-services.html"
                    },
                    {
                        "title": "Supported models in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use an Amazon S3 presigned URL to upload videos to Amazon S3. Configure Amazon S3 to send events to Amazon EventBridge. Create an EventBridge rule that invokes an AWS Step Functions state machine. Set up the state machine to orchestrate the processing steps by directly calling AWS service APIs. Use Amazon Rekognition for object detection and celebrity recognition. Use Amazon Bedrock FMs to generate summaries and transcripts.",
                "explanation": "This solution implements secure video uploads by using S3 presigned URLs, following the principle of least privilege. EventBridge is a serverless event bus service that efficiently routes S3 events to Step Functions for workflow orchestration. Step Functions has direct service integration that eliminates the need for intermediate Lambda functions, reducing operational overhead. This solution uses Amazon Rekognition for video analysis tasks including celebrity recognition and object detection, and uses Amazon Bedrock FMs for content summarization and transcript generation, maximizing the use of managed capabilities and minimizing custom code requirements.",
                "references":
                [
                    {
                        "title": "S3 presigned URLs",
                        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html"
                    },
                    {
                        "title": "Event bus targets",
                        "url": "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html"
                    },
                    {
                        "title": "AWS service integrations with Step Functions",
                        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/connect-supported-services.html"
                    },
                    {
                        "title": "Supported models in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html"
                    },
                    {
                        "title": "Amazon Rekognition celebrity recognition",
                        "url": "https://docs.aws.amazon.com/coursework"
                    }
                ]
            }
        ],
        "correct_answer": "D"
    },
    {
        "question": "A GenAI developer at a media company is building a question-answering AI assistant by using Amazon Bedrock Knowledge Bases. The AI assistant needs to answer user questions accurately based on only the most recent documents. The GenAI developer must ensure that the AI assistant ignores older documents.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Use a prompt template to instruct the model to ignore outdated documents.",
                "explanation": "Prompt templates control how the model responds. However, prompt templates do not control what documents the model retrieves. You must handle retrieval filtering through metadata filters.",
                "references":
                []
            },
            {
                "id": "B",
                "text": "Add a metadata filter for modification time.",
                "explanation": "You can use the metadata filter modification_time to restrict the source documents based on timestamps. You can add a metadata filter to ensure that the model retrieves only recently updated documents.",
                "references":
                [
                    {
                        "title": "Knowledge base configurations",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Set the search type to semantic.",
                "explanation": "Semantic search helps match user queries with semantically similar content based on meaning rather than exact keywords. However, semantic search does not filter based on document recency. Without a metadata filter, the model can still retrieve old documents.",
                "references":
                []
            },
            {
                "id": "D",
                "text": "Enable query modification.",
                "explanation": "Query modifications improve the handling of complex or multi-part questions. However, query modifications do not affect which documents the model retrieves based on recency.",
                "references":
                []
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A financial services company is building a chat-based AI assistant to simulate conversations with customers. The company wants to fine-tune an Amazon Bedrock FM on transcripts of real customer support chat conversations. The customer support transcripts are stored in an unstructured format. For regulatory compliance, the company must track where the fine-tuning dataset originated. The company must track how the dataset has been transformed. The company must ensure that only governed and approved data is used in the fine-tuning process.\n\nWhich solution will meet these requirements with the LEAST operational effort?",
        "options":
        [
            {
                "id": "A",
                "text": "Create an Amazon S3 bucket with appropriate governance controls. Store the raw customer support transcripts in the bucket. Use Amazon Athena to run SQL queries on the raw data and prepare the data for fine-tuning. Use Athena to export the curated results back in the original S3 bucket. Create a fine-tuning job in Amazon Bedrock that references the S3 path to the curated and approved data.",
                "explanation": "Amazon S3 is an object storage service that you can use to host data lakes. Athena can run SQL queries directly on data in Amazon S3 without needing to load the data into a database first. SQL queries are a suitable way to transform structured data. However, the company has unstructured text of customer support transcripts, so this solution would require additional operational effort to perform queries and transformation. Additionally, this solution alone would not meet the lineage and compliance requirements. You would need to add a service for lineage and compliance such as Data Catalog.",
                "references":
                [
                    {
                        "title": "Amazon Athena",
                        "url": "https://docs.aws.amazon.com/athena/latest/ug/what-is.html"
                    },
                    {
                        "title": "Amazon Bedrock fine-tuning jobs",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Store the raw customer support transcripts in an Amazon S3 bucket and reference the transcripts directly in the Amazon Bedrock fine-tuning job.",
                "explanation": "Amazon S3 is an object storage service that you can use to host data lakes. This solution does not address the governance, lineage, and compliance requirements. Additionally, the raw customer support transcripts would likely not be formatted correctly for an Amazon Bedrock fine-tuning job. You must perform additional transformations to make the transcripts the correct format.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock fine-tuning jobs",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Create an Amazon S3 bucket with appropriate governance controls. Store the raw customer support transcripts in the bucket. Scan the bucket by using an AWS Glue crawler. Store the metadata in AWS Glue Data Catalog. Prepare the data for fine-tuning by using AWS Glue ETL jobs. Transform the data to JSONL in the Amazon Bedrock Converse API format. Store the curated data in the original S3 bucket. Create a fine-tuning job in Amazon Bedrock that references the S3 path to the curated and approved data.",
                "explanation": "Amazon S3 is an object storage service that you can use to host data lakes. You can use an AWS Glue crawler to crawl a data source and infer the schema and metadata, then store the data in Data Catalog. AWS Glue ETL provides serverless extract, transform, and load functionality. This solution tracks and governs data lineage and data sources through AWS Glue, and makes the data available to fine-tune a model through Amazon Bedrock. Additionally, all services are serverless, so this solution requires the least operational effort.",
                "references":
                [
                    {
                        "title": "Amazon S3",
                        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
                    },
                    {
                        "title": "AWS Glue Data Catalog",
                        "url": "https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html"
                    },
                    {
                        "title": "AWS Glue crawlers",
                        "url": "https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html"
                    },
                    {
                        "title": "Amazon Bedrock fine-tuning jobs",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Create an Amazon S3 bucket with appropriate governance controls. Store the raw customer support transcripts in the bucket. Scan the S3 bucket by using an AWS Glue crawler. Store the metadata in AWS Glue Data Catalog. Prepare the data for fine-tuning by using Amazon EMR with Apache Spark jobs. Transform the data to JSONL in the Amazon Bedrock Converse API format. Store the curated data back in the original S3 bucket. Create a fine-tuning job in Amazon Bedrock that references the S3 path to the curated and approved data.",
                "explanation": "Amazon S3 is an object storage service that you can use to host data lakes. You can use an AWS Glue crawler to crawl a data source and infer the schema and metadata, then store the data in Data Catalog. Amazon EMR is a managed service that provides big data processing using Apache Spark or Apache Hadoop. Amazon EMR can transform the data in this scenario, but Amazon EMR does not provide built-in support to track data lineage and does not integrate with Data Catalog. For this solution, you must implement the components manually. Therefore, this solution requires additional operational effort.",
                "references":
                [
                    {
                        "title": "AWS Glue Data Catalog",
                        "url": "https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html"
                    },
                    {
                        "title": "AWS Glue crawlers",
                        "url": "https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html"
                    },
                    {
                        "title": "Amazon Bedrock fine-tuning jobs",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
                    },
                    {
                        "title": "Amazon EMR",
                        "url": "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html"
                    }
                ]
            }
        ],
        "correct_answer": "C"
    },
    {
        "question": "A GenAI developer builds an AI-powered customer service chat application for a company. The GenAI developer uses Amazon Bedrock to build the application. The application processes natural language inputs from users and generates real-time responses. The responses reference users' personally identifiable information (PII).\n\nThe GenAI developer must configure the application to handle PII appropriately. According to internal privacy policies, PII should not be inadvertently exposed during or after inference. Prompt data cannot be retained longer than necessary. The handling of PII must comply with defined storage and retention policies.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Use Amazon Bedrock Guardrails to filter PII from prompts and responses. Store interaction logs in Amazon S3 with server-side encryption using AWS KMS. Enable AWS CloudTrail to log Amazon Bedrock API usage and apply Amazon Macie to generate compliance reports. Configure S3 Lifecycle policies to enforce data retention limits.",
                "explanation": "Guardrails can prevent the generation of harmful or sensitive outputs. This solution uses Amazon S3 with AWS KMS for secure storage and CloudTrail for API visibility, and uses Macie for compliance scans. However, redacting PII from responses prevents the application from delivering user details. Additionally, compliance scans and S3 Lifecycle policies alone do not ensure the deletion of PII as required by retention policies.",
                "references":
                [
                    {
                        "title": "Guardrails data filters",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html"
                    },
                    {
                        "title": "Data retention through S3 Lifecycle management",
                        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use Amazon Macie to scan stored user prompts and responses in Amazon S3 for PII. Apply Amazon Comprehend for PII detection on stored logs to identify PII post-inference. Configure S3 Lifecycle policies to transition or expire objects after the retention period. Use AWS Config rules to monitor lifecycle policies that apply to S3 buckets and enforce remediation if a bucket is not compliant.",
                "explanation": "In this solution, all actions occur after the data is already written to Amazon S3. Therefore, this solution could expose PII during inference, and PII could be logged in raw form. Lifecycle policies and AWS Config rules enforce storage compliance, but this solution does not ensure that PII is redacted before or during model interaction. This solution is primarily reactive and does not meet the requirements.",
                "references":
                [
                    {
                        "title": "Amazon Comprehend PII detection",
                        "url": "https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html"
                    },
                    {
                        "title": "AWS Config rules",
                        "url": "https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config-rules.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Use Amazon Bedrock Guardrails to mask PII in user prompts before inference and redact PII from generated responses. Store prompts and model responses in Amazon S3. Use Amazon Macie to automatically classify and alert on PII stored in Amazon S3. Configure S3 Lifecycle policies to enforce data retention limits.",
                "explanation": "Guardrails can mask PII in user prompts before the prompts reach the model, reducing privacy risk at inference. Guardrails ensure that unredacted PII does not persist in logs or stored outputs, while the application can still present user-appropriate responses in real time. Macie provides automated sensitive data discovery in Amazon S3. S3 Lifecycle policies enforce retention limits to meet retention requirements.",
                "references":
                [
                    {
                        "title": "Guardrail sensitive data filters",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html"
                    },
                    {
                        "title": "Sensitive data discovery using Macie",
                        "url": "https://docs.aws.amazon.com/macie/latest/user/data-classification.html"
                    },
                    {
                        "title": "Data retention through S3 Lifecycle management",
                        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use Amazon Bedrock Guardrails to mask PII in user prompts before inference and redact PII from generated responses. Store prompts and model responses in Amazon S3. Use Amazon Macie to scan stored data for PII and trigger alerts for compliance violations. Apply an S3 Lifecycle policy to move data for archival storage. Configure IAM roles to control access to PII.",
                "explanation": "Guardrails can mask PII before and after inference. However, this solution moves data to archival storage rather than deleting the data, so it might violate retention requirements. Macie can classify sensitive data post-inference, but this solution does not ensure the removal of sensitive data in compliance with retention policies.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
                    }
                ]
            }
        ],
        "correct_answer": "C"
    },
    {
        "question": "A travel company is developing a new AI-powered travel recommendation application by using Amazon Bedrock Agents. Customers can use the application to input travel preferences and receive personalized itinerary suggestions. The company wants to avoid prompt injection attacks that could manipulate the FM to provide unauthorized access or bypass content filters. A GenAI developer must implement security measures to protect against prompt injection attacks.\n\nWhich combination of actions will meet these requirements?\n(Select THREE)",
        "options":
        [
            {
                "id": "A",
                "text": "Associate an Amazon Bedrock guardrail with the agent to implement content filtering and topic boundaries.",
                "explanation": "Guardrails provide built-in protection against prompt injection. Guardrails provide content filtering and enforce topic boundaries. This action validates and filters inputs before the inputs reach the FM.",
                "references":
                [
                    {
                        "title": "How to block denied topics",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-denied-topics.html"
                    },
                    {
                        "title": "Prompt injection",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-injection.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Update the system prompt to clearly define the scope of what the agent can and cannot do.",
                "explanation": "You can update the system prompt to clearly define boundaries and limitations to help prevent prompt injection. This action establishes strict behavioral constraints for the agent and creates a strong foundation for secure operation when combined with other protective measures. Newer models differentiate between system and user prompts, and system prompts can define the scope of what an agent can and cannot do.",
                "references":
                [
                    {
                        "title": "System prompts",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-create.html"
                    },
                    {
                        "title": "Prompt injection",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-injection.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Enable the default pre-processing prompt for the Amazon Bedrock agent to evaluate if user input is safe to process.",
                "explanation": "Every agent has a default pre-processing prompt that can determine if user input is safe to use. You can enable default pre-processing prompts in Agents to add an additional layer of security. A pre-processing prompt will evaluate user input before the input reaches the FM, which helps identify and filter potentially malicious prompts.",
                "references":
                [
                    {
                        "title": "Pre-processing prompts",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/advanced-prompts.html"
                    },
                    {
                        "title": "Prompt injection",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-injection.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Create an Amazon CloudWatch anomaly detection alarm to identify unusual prompt traffic patterns.",
                "explanation": "CloudWatch anomaly detection provides historical metrics to flag unusual spikes or drops and can notify you about anomalies. This action is a reactive monitoring control and does not prevent or filter prompt injection content or constrain model behavior at inference time. This action does not actively protect against prompt injection.",
                "references":
                [
                    {
                        "title": "CloudWatch anomaly detection",
                        "url": "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html"
                    }
                ]
            },
            {
                "id": "E",
                "text": "Create AWS Config custom rules to audit agent configuration settings and ensure that all deployed agents have an associated guardrail policy.",
                "explanation": "AWS Config can evaluate resource configurations against rules to detect drift or noncompliance. You can use AWS Config rules to deploy agents with certain settings, and this action can confirm if guardrails are attached. However, this action does not inspect or block malicious prompts at runtime. Using AWS Config rules does not mitigate prompt injection attacks.",
                "references":
                [
                    {
                        "title": "AWS Config custom rules",
                        "url": "https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_develop-rules.html"
                    }
                ]
            },
            {
                "id": "F",
                "text": "Deploy AWS WAF in front of the application to block malicious requests before the requests reach Amazon Bedrock.",
                "explanation": "AWS WAF can mitigate web application vulnerabilities. However, AWS WAF is not designed to detect or prevent prompt injection attacks. AWS WAF operates at the web application layer and cannot effectively analyze the semantic content of prompts.",
                "references":
                [
                    {
                        "title": "AWS WAF",
                        "url": "https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html"
                    }
                ]
            }
        ],
        "correct_answer":
        [
            "A",
            "B",
            "C"
        ]
    },
    {
        "question": "A GenAI developer is building a serverless application. The application uses AWS Lambda functions that are deployed in private subnets to process sensitive customer data. The Lambda functions need to invoke Amazon Bedrock FMs for AI-powered analytics. All API communication must remain within the AWS private network without internet exposure.\n\nThe GenAI developer tests the Lambda function. The Lambda function consistently times out when attempting to call Amazon Bedrock APIs. The Lambda function has proper IAM permissions for Amazon Bedrock access.\n\nWhich solution will resolve this connectivity issue?",
        "options":
        [
            {
                "id": "A",
                "text": "Create interface VPC endpoints for the Amazon Bedrock Runtime service in the VPC. Ensure that the endpoints are associated with the private subnets where Lambda functions are deployed. Verify that security groups allow HTTPS traffic on port 443 between Lambda and the VPC endpoints.",
                "explanation": "Interface VPC endpoints allow Lambda functions in private subnets to access Amazon Bedrock APIs without internet connectivity. The Runtime service requires the com.amazonaws.region.bedrock-runtime endpoint for model invocation operations. Security groups must allow outbound HTTPS traffic on port 443 from Lambda to the VPC endpoint, and the endpoint's security group must allow inbound HTTPS traffic. Private DNS is enabled by default, so existing Lambda code can continue to work without modification, and AWS automatically routes API calls through the VPC endpoint.",
                "references":
                [
                    {
                        "title": "VPC endpoints for Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/usingVPC.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Configure Amazon Route 53 private hosted zones for the Amazon Bedrock service endpoints that resolve to the internal VPC CIDR range. Enable custom DNS resolution in the VPC settings. Ensure that the Lambda execution role has Route 53 Resolver permissions for private DNS queries.",
                "explanation": "Route 53 private hosted zones can resolve custom domain names within a VPC, but they cannot automatically create network connectivity to external AWS services without underlying VPC endpoints. You can use private hosted zones for internal resources, but they cannot route traffic to AWS service endpoints unless VPC endpoints are already configured. Additionally, the resolver permissions are unnecessary because DNS resolution does not establish the required private network path to Amazon Bedrock.",
                "references":
                [
                    {
                        "title": "Private DNS",
                        "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/vpce-interface.html"
                    },
                    {
                        "title": "Private hosted zones",
                        "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Deploy dedicated proxy Lambda functions in the private subnets that handle all Amazon Bedrock API communications. Configure the proxy functions with enhanced networking permissions. Set up an internal Application Load Balancer between the application Lambda functions and the proxy Lambda functions to distribute API calls.",
                "explanation": "Proxy Lambda functions are a valid architectural pattern for some use cases, and Lambda to Lambda communication within a VPC is possible without additional networking infrastructure. However, proxy functions would have the same connectivity issue with Amazon Bedrock for this scenario, since the proxy functions would need internet access or VPC endpoints. This solution adds latency without solving the fundamental private network requirement for Amazon Bedrock access.",
                "references":
                [
                    {
                        "title": "Connect inbound interface VPC endpoints for Lambda",
                        "url": "https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc-endpoints.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Create an AWS Client VPN endpoint in the VPC. Configure the Lambda functions to route Amazon Bedrock API calls through the VPN connection. Add a route table entry to direct traffic to Amazon Bedrock through the Client VPN endpoint.",
                "explanation": "Client VPN is designed for secure remote access to AWS and on-premises networks. You cannot use Client VPN to connect to AWS services such as Amazon Bedrock. Lambda functions in a VPC do not need VPN connectivity to access AWS services securely. This solution does not meet the requirement for private API access.",
                "references":
                [
                    {
                        "title": "AWS Client VPN",
                        "url": "https://docs.aws.amazon.com/vpn/latest/clientvpn-user/what-is.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A legal services company wants to integrate diverse document management systems with an AI solution to enhance contract generation. The company needs to connect an existing contract template repository, internal legal knowledge bases, historical case documentation, and compliance wikis. The solution must maintain consistent access patterns. The solution must provide comprehensive data integration across all sources.\n\nWhich solution will meet these requirements with the LEAST operational overhead?",
        "options":
        [
            {
                "id": "A",
                "text": "Use Amazon Bedrock Knowledge Bases to create unified access to all document sources. Configure data source connectors for the template repository and knowledge bases. Set up automated synchronization to maintain the current content.",
                "explanation": "Knowledge Bases provides built-in capabilities to integrate multiple document sources through standardized connectors. Knowledge Bases handles authentication, synchronization, and content updates automatically, so this solution requires the least operational overhead. Additionally, this solution provides consistent access patterns across all document sources and maintains data freshness through automated synchronization.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock Knowledge Bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Implement Amazon Kendra with custom data source connectors. Set up incremental synchronization by using Amazon EventBridge rules. Create AWS Glue ETL jobs to standardize document formats across sources. Use Amazon S3 as the central document repository.",
                "explanation": "Amazon Kendra provides enterprise search capabilities. Using Amazon Kendra with custom data source connectors, EventBridge rules, and AWS Glue ETL jobs requires additional operational overhead. For this solution, you must maintain multiple integration components and transformation pipelines.",
                "references":
                [
                    {
                        "title": "Amazon Kendra",
                        "url": "https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Create a hybrid integration. Use Amazon AppFlow for software as a service (SaaS) based sources. Use AWS Transfer Family for on-premises sources. Deploy Amazon OpenSearch Service for unified search. Implement AWS Step Functions workflows to orchestrate data synchronization across sources.",
                "explanation": "Amazon AppFlow can integrate with SaaS applications, and Transfer Family can handle on-premises sources. However, combining Amazon AppFlow and Transfer Family with OpenSearch Service and Step Functions increases operational overhead. For this hybrid approach, you must manage multiple services, orchestration workflows, and synchronization patterns. Therefore, this solution requires additional operational overhead and creates potential points of failure.",
                "references":
                [
                    {
                        "title": "Amazon AppFlow",
                        "url": "https://docs.aws.amazon.com/appflow/latest/userguide/what-is-appflow.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Deploy Amazon OpenSearch Service with vector search capabilities. Create standardized connectors by using AWS Lambda functions to index content from each source. Implement custom authentication handlers. Maintain separate backup procedures for each system.",
                "explanation": "OpenSearch Service with vector search provides search capabilities across document repositories, and Lambda functions can create standardized connections. However, you must maintain custom connectors, authentication handlers, and backup procedures for each system. Therefore, this solution requires more operational overhead than using managed document integration services.",
                "references":
                [
                    {
                        "title": "Amazon OpenSearch Service",
                        "url": "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A media company is building an AI-powered content moderation system by using an FM in Amazon Bedrock. The system requires immediate detection and prevention of sensitive information and policy violations. Text and image content should not contain personally identifiable information (PII), misinformation, hate speech, and unsafe content. The solution must stop text and image content that violates these policies before the content reaches the editorial review process.\n\nThe company's compliance framework requires comprehensive documentation of FM limitations and biases with proper version control. Additionally, the policy requires event-driven monitoring that invokes automated compliance validation workflows within seconds of guardrail intervention.\n\nWhich solution will meet these requirements with the LEAST operational overhead?",
        "options":
        [
            {
                "id": "A",
                "text": "Configure Amazon Bedrock Guardrails with content filters for PII, misinformation, hate speech, and unsafe multimodal content. Store model card documentation in Amazon S3 with lifecycle policies enabled. Create Amazon EventBridge rules to invoke AWS Lambda functions that parse AWS CloudTrail API logs for policy violations.",
                "explanation": "Guardrails provide built-in content filtering. However, parsing CloudTrail logs for policy violations increases operational overhead and creates potential delays. Additionally, S3 Lifecycle policies do not provide the comprehensive version control that you need for model documentation.",
                "references":
                [
                    {
                        "title": "CloudTrail monitoring",
                        "url": "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-eventbridge.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Set up Amazon Comprehend for PII detection and sentiment analysis on user-generated content. Pass the content to Amazon Bedrock. Configure Amazon Bedrock Guardrails with content filters for misinformation, hate speech, and unsafe multimodal content. Maintain comprehensive model governance documentation with automated versioning in Amazon DynamoDB with global secondary indexes. Create AWS Lambda functions with Amazon EventBridge to perform continuous compliance monitoring and generate detailed violation reports.",
                "explanation": "Amazon Comprehend creates redundant PII detection capabilities when guardrails already provide integrated sensitive information filtering. DynamoDB does not provide the built-in document versioning capabilities that you need for proper model card governance, even with global secondary indexes. EventBridge provides periodic monitoring rather than event-driven, real-time monitoring. Therefore, this solution does not meet the immediate response requirement.",
                "references":
                [
                    {
                        "title": "Amazon Comprehend",
                        "url": "https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html"
                    },
                    {
                        "title": "DynamoDB constraints and limitations",
                        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Configure Amazon Bedrock Guardrails with content filters for PII, misinformation, hate speech, and unsafe multimodal content. Integrate Amazon Rekognition content moderation with custom trained models for enhanced visual content analysis and bulk processing capabilities. Document FM capabilities and limitations in standardized model cards with automated versioning in Amazon S3. Create AWS Lambda functions with Amazon EventBridge integration to orchestrate parallel processing workflows between Amazon Bedrock and Amazon Rekognition APIs.",
                "explanation": "This solution creates unnecessary service redundancy that violates the immediate response requirement. Guardrails support multimodal toxicity detection for images, so the integration with Amazon Rekognition is redundant for the same content moderation tasks. The proposed parallel processing workflows between Amazon Bedrock and Amazon Rekognition APIs would introduce significant latency through multiple API calls. Additionally, this solution requires complex orchestration logic and prevents the system from meeting the requirement for immediate content blocking. This solution doubles processing costs by running two content moderation services on identical content, and the orchestration complexity introduces multiple failure points that compromise system reliability.",
                "references":
                [
                    {
                        "title": "Amazon Rekognition",
                        "url": "https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html"
                    },
                    {
                        "title": "Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Configure Amazon Bedrock Guardrails with content filters for PII, misinformation, hate speech, and unsafe multimodal content. Document FM biases and limitations in standardized model cards with versioning enabled in Amazon S3. Configure an Amazon CloudWatch alarm to monitor the InvocationsIntervened Guardrails metric. Create an Amazon EventBridge rule that invokes an AWS Lambda compliance workflow when the alarm is triggered.",
                "explanation": "Guardrails provide built-in content filtering capabilities for text and multimodal content, offering immediate detection and prevention of policy violations with minimal setup. This solution uses Amazon S3 for version-controlled model card documentation, CloudWatch to monitor the built-in Guardrails metric InvocationsIntervened, and EventBridge with Lambda for automated compliance workflows. Therefore, this solution minimizes operational overhead by using built-in service features and integrations.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
                    },
                    {
                        "title": "CloudWatch metrics for Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-monitoring.html"
                    }
                ]
            }
        ],
        "correct_answer": "D"
    },
    {
        "question": "A company receives large merged PDF files from employees. Each PDF file includes multiple pages with distinct content types, including images and text. The images and text can be categorized into a predefined list. A GenAI developer creates an Amazon Bedrock Data Automation (BDA) project. The GenAI developer uses the BDA project in an AWS Step Functions workflow.\nThe GenAI developer defines custom outputs and provides relevant blueprints as expected. However, the extraction results are inconsistent. The first two pages are correct. However, most of the other pages are missed entirely. Downstream systems receive incomplete metadata.\n\nWhich combination of steps will resolve this issue with MINIMAL operational overhead?\n(Select TWO)",
        "options":
        [
            {
                "id": "A",
                "text": "Enable PDF page splitting in the BDA project.",
                "explanation": "Enabling PDF page splitting in the BDA project provides proper processing for multipage PDF files. This built-in feature automatically handles page segmentation, so all pages are processed correctly, without requiring additional custom code or services. If this feature is not turned on, the best matching blueprint will be used for the entire PDF file.",
                "references":
                [
                    {
                        "title": "How to split documents in Amazon Bedrock Data Automation",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/bda-document-splitting.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Refine the blueprint names and definitions. Include only one blueprint for each content type.",
                "explanation": "You can refine blueprint names and definitions and use one clear blueprint for each document type. This step can improve the accuracy and consistency of document classification, reduce potential conflicts in document type identification, and ensure that each page is correctly categorized. When you combine this step with document splitting, you have a comprehensive solution to process multipage PDF files with minimal operational overhead. One well-defined blueprint for each content type follows BDA best practices. Multiple blueprints of the same type in a project could lead to worse performance.",
                "references":
                [
                    {
                        "title": "Best practices for creating blueprints",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/bda-document-splitting.html#bda-blueprint-best-practices"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Refine the blueprint names and definitions. Provide multiple blueprints of the same content type.",
                "explanation": "You can refine blueprint names and definitions to improve the accuracy and consistency of document classification. However, providing multiple blueprints of the same document type directly goes against BDA best practices. This step could degrade PDF file processing performance.",
                "references":
                [
                    {
                        "title": "Best practices for creating blueprints",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/bda-document-splitting.html#bda-blueprint-best-practices"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Route all PDF files to the image modality.",
                "explanation": "You can route certain file types to specific modality types by configuring manual modality routing. Routing PDF files to a modality is a way to explicitly map how BDA processes specific content types. Routing all files to the image modality would mishandle text-heavy pages in the PDF files.",
                "references":
                [
                    {
                        "title": "How to route files to modality types",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/bda-routing-enablement.html#bda-modality-routing"
                    }
                ]
            },
            {
                "id": "E",
                "text": "Disable all modalities except the text modality.",
                "explanation": "There are four modalities in BDA: document, image, video, and audio. You can disable a modality for a project if you do not want processing for all types of files. Disabling all modalities except the document modality will disable the image modality, which you need to handle the images in this scenario. The PDF files that include images would be mishandled.",
                "references":
                [
                    {
                        "title": "How to disable modality types",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/bda-routing-enablement.html"
                    }
                ]
            }
        ],
        "correct_answer":
        [
            "A",
            "B"
        ]
    },
    {
        "question": "A company is implementing a data pipeline to feed customer transaction data into Amazon Bedrock FMs. The company wants to generate personalized recommendations for customers.\n\nA GenAI developer wants to avoid data quality issues that could affect model output accuracy. The GenAI developer wants to implement automated data validation before the FMs use the data. The company stores the data in Amazon S3 and catalogs the data in AWS Glue Data Catalog. The solution must detect anomalies and filter out low-quality data before the data reaches the FMs.\n\nWhich combination of steps will meet these requirements with MINIMAL operational overhead?\n(Select TWO)",
        "options":
        [
            {
                "id": "A",
                "text": "Use AWS Glue Data Quality for the data catalog with rule-based validation and anomaly detection. Create an Amazon EventBridge rule to send alerts when quality scores fall below defined thresholds.",
                "explanation": "Data Quality provides both rule-based validation and ML-powered anomaly detection capabilities. Data Quality can evaluate data quality against custom rules that are written in DQDL and can detect anomalies by analyzing data statistics over time. You can publish results to EventBridge, which provides automated alerting when quality issues are detected. This step provides custom validation rules and anomaly detection over time.",
                "references":
                [
                    {
                        "title": "AWS Glue Data Quality anomaly detection",
                        "url": "https://docs.aws.amazon.com/glue/latest/dg/data-quality-anomaly-detection.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Implement AWS Glue Data Quality for ETL jobs with Data Quality Definition Language (DQDL) rules that validate the data during processing. Configure the job to filter out records that fail validation before passing the data to Amazon Bedrock.",
                "explanation": "You can use Data Quality with DQDL rules to implement data validation during ETL processing. This step can filter out low-quality data before the data reaches Amazon Bedrock, preventing potential issues with model outputs. This approach integrates validation directly into the data processing pipeline without requiring additional services or custom code.",
                "references":
                [
                    {
                        "title": "Data Quality Definition Language (DQDL)",
                        "url": "https://docs.aws.amazon.com/glue/latest/dg/dqdl.html"
                    },
                    {
                        "title": "AWS Glue Data Quality",
                        "url": "https://docs.aws.amazon.com/glue/latest/dg/tutorial-data-quality.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Create an AWS Step Functions workflow to orchestrate serverless validation. Create AWS Lambda functions that run validation checks on the data and store validation results in Amazon DynamoDB.",
                "explanation": "A custom validation solution that uses Step Functions and Lambda functions requires significant development effort. You must implement validation logic, manage state, and handle errors. This approach introduces more operational overhead than using managed services that are specifically designed for data quality validation.",
                "references":
                [
                    {
                        "title": "AWS Step Functions",
                        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use Amazon Athena to run SQL queries that validate data constraints. Create an Amazon EventBridge rule that invokes an AWS Lambda function to query the results and generate quality metrics.",
                "explanation": "Athena can run SQL queries for validation. However, you must write and maintain custom SQL queries and Lambda functions to process the results. This step requires more operational overhead than using purpose-built data quality services. For example, Data Quality provides built-in validation capabilities and integration with the existing data catalog.",
                "references":
                [
                    {
                        "title": "Amazon Athena",
                        "url": "https://docs.aws.amazon.com/athena/latest/ug/what-is.html"
                    }
                ]
            },
            {
                "id": "E",
                "text": "Use Amazon SageMaker Data Wrangler to profile the data. Use SageMaker Model Monitor to detect data drift. Implement custom pre-processing logic in SageMaker processing jobs.",
                "explanation": "Data Wrangler and Model Monitor primarily focus on model development and monitoring, not data pipeline validation. Model Monitor can detect data drift, but this approach is designed to monitor production models, not to validate data before entering the FM pipeline.",
                "references":
                [
                    {
                        "title": "Amazon SageMaker Data Wrangler",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler.html"
                    },
                    {
                        "title": "SageMaker Model Monitor",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html"
                    }
                ]
            }
        ],
        "correct_answer":
        [
            "A",
            "B"
        ]
    },
    {
        "question": "A GenAI developer is developing a document summarization system by using Amazon Bedrock Knowledge Bases. Users upload large technical research papers that the system must summarize accurately.\n\nThe GenAI developer receives reports that generated summaries frequently omit critical sections from longer documents, even when the full source text was successfully uploaded and tokenized. Logs show no API errors or truncation messages. However, summaries frequently miss information near the middle or end of documents.\n\nWhich solution will resolve this issue?",
        "options":
        [
            {
                "id": "A",
                "text": "Select an FM with a larger context window. Allow the FM to process full-length documents in a single inference. Apply text compression and prompt shortening strategies when necessary.",
                "explanation": "You can select an FM with a larger context window to process longer documents. However, a larger context window would not impact the retrieval of the chunks. Client-side compression could remove important details and cause the loss of critical context. Therefore, this solution will not resolve the issue of summaries that omit critical sections from longer documents.",
                "references":
                [
                    {
                        "title": "Model parameters in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html"
                    },
                    {
                        "title": "Context windows",
                        "url": "https://docs.aws.amazon.com/nova/latest/userguide/prompting-long-context.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Configure semantic chunking in Amazon Bedrock. Submit each segment to Amazon Bedrock for summarization. Use prompt chaining to combine the partial summaries into a final consolidated summary.",
                "explanation": "Amazon Bedrock supports semantic chunking, which resolves the issue of missing information from longer documents by intelligently segmenting the text into coherent parts. Then, the model can summarize the segments individually. You can use prompt chaining for tasks that exceed a single model call's context or reasoning depth. In prompt chaining, outputs from one step (summaries of individual chunks) pass as structured input into a follow-up prompt (a final summarization request). This solution prevents context window overflow and ensures complete input coverage.",
                "references":
                [
                    {
                        "title": "Semantic chunking in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html#kb-semantic-chunking"
                    },
                    {
                        "title": "Prompt chaining by using Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/sample-bedrock-prompt-chaining.html"
                    },
                    {
                        "title": "The prompt chaining workflow",
                        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-patterns/workflow-for-prompt-chaining.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Retrieve a larger number of document chunks from an Amazon Bedrock knowledge base. Summarize each retrieved chunk independently. Return the combined results into a final summary.",
                "explanation": "Retrieving more chunks increases coverage. However, this solution does not ensure that the summarization process will preserve context across the entire document. This solution might produce summaries that are fragmented or omit details that span multiple chunks. You need a strategy to merge summaries coherently so that you maintain important relationships between sections, such as semantic chunking and prompt chaining.",
                "references":
                [
                    {
                        "title": "Chunk retrieval in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-retrieval.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Configure standard chunking in Amazon Bedrock. Split the document into evenly sized segments. Summarize each segment independently before combining the results into a final consolidated summary.",
                "explanation": "Standard chunking in Amazon Bedrock uses fixed-size and default chunking, which can break up sentences or separate related ideas. This solution can lead to summaries that omit details or lack cohesion, especially for documents where context spans multiple segments. This solution can process long inputs, but semantic chunking is more suitable to preserve accuracy by aligning chunks within a document's natural structure. Summarizing chunks individually without a synthesis step can produce disjointed results.",
                "references":
                [
                    {
                        "title": "Chunking strategies in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    }
];
