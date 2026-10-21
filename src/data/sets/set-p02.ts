import { RawQuestion } from '../../types';

export const SET_P02_QUESTIONS: RawQuestion[] = [
    {
        "question": "An insurance company is building an AI assistant on Amazon Bedrock that answers employee questions about leave eligibility. The eligibility rules are defined in a formal HR policy document that contains numeric thresholds, such as tenure requirements, maximum leave days, and dependent conditions.\n\nThe compliance team requires that every response about eligibility must be validated against the policy rules by using a logic-based, verifiable method rather than a probabilistic similarity score. When a response violates a rule, the system must return an explanation that identifies which policy rules were not satisfied.\n\nWhich solution will meet these requirements with the LEAST operational overhead?",
        "options":
        [
            {
                "id": "A",
                "text": "Configure a contextual grounding check in an Amazon Bedrock guardrail. Provide the HR policy document as the grounding source and set a high grounding threshold.",
                "explanation": "Contextual grounding checks score how well a response is grounded in a reference source and how relevant the response is to the query. The scores are confidence values that are produced by a model, not a formal logical validation. Contextual grounding checks cannot prove that a response satisfies numeric rules and conditions, and they do not explain which specific policy rules were violated.",
                "references":
                [
                    {
                        "title": "Use contextual grounding check to filter hallucinations in responses",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Create an Automated Reasoning policy from the HR policy document. Attach the policy to an Amazon Bedrock guardrail by using Automated Reasoning checks, and apply the guardrail to the assistant's responses.",
                "explanation": "Automated Reasoning checks in Amazon Bedrock Guardrails translate a source document into a formal logical policy of rules and variables. The checks use mathematical, logic-based verification to determine whether a response is consistent with the policy. The findings identify invalid responses and explain which rules are not satisfied. Because the capability is managed within Guardrails, this solution meets the requirements with the least operational overhead.",
                "references":
                [
                    {
                        "title": "Automated Reasoning checks in Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-automated-reasoning-checks.html"
                    },
                    {
                        "title": "Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Run a weekly Amazon Bedrock model evaluation job that uses an LLM-as-a-judge evaluator with a custom metric that scores policy compliance.",
                "explanation": "LLM-as-a-judge evaluation jobs assess model quality offline on a prompt dataset. The evaluator model produces probabilistic scores, which does not meet the requirement for logic-based verification. Additionally, a scheduled evaluation job does not validate each response at runtime before the response reaches the employee.",
                "references":
                [
                    {
                        "title": "Model evaluation jobs that use a model as a judge",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Configure denied topics in an Amazon Bedrock guardrail for each type of leave that is not covered by the policy.",
                "explanation": "Denied topics block prompts and responses about topics that are not allowed in the application. Denied topics do not validate whether an answer about an allowed topic correctly applies numeric thresholds and conditions. This solution would block content instead of verifying its correctness.",
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
        "question": "A consumer electronics company uses Amazon Bedrock Knowledge Bases and the RetrieveAndGenerate API to power a product support assistant. The knowledge base contains separate documents for each product model.\n\nUsers frequently ask comparative, multi-part questions such as \"How does the battery warranty of the X200 compare to the Z900, and which model supports fast charging?\" For these questions, the retrieved chunks usually cover only one of the products, so the answers are incomplete. Single-product questions are answered correctly.\n\nWhich solution will improve the answers to multi-part questions with the LEAST development effort?",
        "options":
        [
            {
                "id": "A",
                "text": "Enable query decomposition in the orchestration configuration of the RetrieveAndGenerate request.",
                "explanation": "Query decomposition is a query reformulation technique that breaks a complex query into smaller subqueries. The knowledge base retrieves results for each subquery and combines the results before generation. For comparative questions, each product receives its own retrieval pass, so the relevant chunks for both products reach the FM. This is a configuration change that requires minimal development effort.",
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
                "text": "Increase the number of retrieved results from 5 to 100 in the vector search configuration.",
                "explanation": "Retrieving more results increases the chance that chunks for both products are included. However, the single query embedding is still dominated by one product, so the additional results are not guaranteed to cover the other product. This approach also significantly increases input tokens, latency, and cost for every request.",
                "references":
                [
                    {
                        "title": "Configure and customize queries and response generation",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Change the chunking strategy to hierarchical chunking and re-ingest all product documents.",
                "explanation": "Hierarchical chunking returns larger parent chunks to provide more surrounding context. The problem is not missing context within a single product document. The problem is that one query cannot effectively retrieve content for multiple products. Re-ingesting the corpus adds effort without solving the multi-part query issue.",
                "references":
                [
                    {
                        "title": "How content chunking works for knowledge bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Replace the embeddings model with a model that produces higher-dimensional vectors and rebuild the vector index.",
                "explanation": "A higher-dimensional embeddings model can capture more semantic detail. However, a single embedding of a multi-part query still represents a blend of both intents, so retrieval would continue to favor one product. Rebuilding the vector index also requires substantial effort.",
                "references":
                [
                    {
                        "title": "Supported models and Regions for Amazon Bedrock knowledge bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-supported.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A logistics company runs a document-processing application that invokes a single FM on Amazon Bedrock. The application processes a steady, predictable volume of requests 24 hours a day. The volume is forecast to remain stable for at least the next year.\n\nThe company requires guaranteed, consistent throughput for the application. Company policy requires all inference to run in the company's primary AWS Region. The company wants the lowest cost for this committed, long-term usage.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Request an increase to the on-demand tokens-per-minute and requests-per-minute quotas for the model.",
                "explanation": "Raising on-demand quotas increases the maximum request rate that the account is allowed to send. However, on-demand capacity is shared and is not reserved for the account, so throughput is not guaranteed during periods of high demand. On-demand pricing also does not provide a discount for a long-term commitment.",
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
                "explanation": "Cross-Region inference can increase available throughput by routing requests to other Regions. However, this solution violates the policy that requires inference to run in the primary Region. Cross-Region inference also does not reserve dedicated capacity.",
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
                "text": "Submit the requests as Amazon Bedrock batch inference jobs every hour.",
                "explanation": "Batch inference provides lower cost for large asynchronous workloads. However, batch jobs do not provide guaranteed throughput or predictable completion times for a continuous application workload. The application would need to be redesigned around asynchronous jobs.",
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
                "text": "Purchase Provisioned Throughput for the model in the primary Region with a 6-month commitment term. Invoke the model by using the provisioned model ARN.",
                "explanation": "Provisioned Throughput reserves a fixed number of model units for a model in a specific Region, which provides guaranteed, consistent throughput. Longer commitment terms provide a lower price than no-commitment Provisioned Throughput. For a steady, predictable, long-term workload in a single Region, a committed Provisioned Throughput purchase meets all the requirements.",
                "references":
                [
                    {
                        "title": "Increase model invocation capacity with Provisioned Throughput in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html"
                    },
                    {
                        "title": "Purchase Provisioned Throughput for an Amazon Bedrock model",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-thru-purchase.html"
                    }
                ]
            }
        ],
        "correct_answer": "D"
    },
    {
        "question": "A software company offers an in-IDE coding assistant that calls an FM on Amazon Bedrock through the Converse API. The FM is one of the models that Amazon Bedrock supports for latency-optimized inference. Each request contains unique code context from the user's current file.\n\nDevelopers report that suggestions arrive too slowly to be useful while they type. The company wants to reduce response latency without changing the model and without managing any inference infrastructure.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Invoke the model through a cross-Region inference profile so that requests are routed to Regions with spare capacity.",
                "explanation": "Cross-Region inference helps manage traffic bursts and increases available throughput by distributing requests across Regions. Cross-Region inference is not designed to reduce per-request latency, and routing to another Region can add network latency.",
                "references":
                [
                    {
                        "title": "Increase throughput with cross-Region inference",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Purchase Provisioned Throughput for the model and invoke the provisioned model.",
                "explanation": "Provisioned Throughput reserves dedicated capacity so that the application receives consistent throughput. Provisioned Throughput addresses capacity and throttling, not the per-token generation speed of the model. This solution also adds a capacity commitment cost that the scenario does not require.",
                "references":
                [
                    {
                        "title": "Increase model invocation capacity with Provisioned Throughput in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Set the performance configuration of the Converse request to use the optimized latency setting.",
                "explanation": "Latency-optimized inference in Amazon Bedrock runs supported models on optimized infrastructure to provide faster response times. You enable it by setting the latency parameter of the performance configuration to optimized in the request. The company continues to use the same model and does not manage any infrastructure.",
                "references":
                [
                    {
                        "title": "Optimize model inference for latency",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/latency-optimized-inference.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Enable prompt caching for the code context in each request.",
                "explanation": "Prompt caching reduces latency and cost when the same prompt prefix is reused across requests. In this scenario, each request contains unique code context, so cached prefixes would rarely be reused. Prompt caching would provide little latency benefit.",
                "references":
                [
                    {
                        "title": "Prompt caching for faster model inference",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html"
                    }
                ]
            }
        ],
        "correct_answer": "C"
    },
    {
        "question": "A telecommunications company has three Amazon Bedrock agents that separate teams own and maintain. One agent handles billing, one agent handles technical troubleshooting, and one agent handles plan upgrades. Each agent has its own action groups and knowledge base.\n\nThe company wants to provide customers with a single conversational entry point. Customer requests must be routed to the correct specialized agent. Complex requests that span multiple domains must be coordinated across agents, and the final response must be consolidated. The company wants to minimize custom orchestration code.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Create a supervisor agent by using Amazon Bedrock multi-agent collaboration. Associate the three existing agents as collaborator agents.",
                "explanation": "Multi-agent collaboration in Amazon Bedrock Agents lets a supervisor agent break down requests, delegate tasks to collaborator agents, and consolidate their outputs into a final response. The existing specialized agents can be associated as collaborators, so each team keeps ownership of its agent. The orchestration is managed by Amazon Bedrock, which minimizes custom code.",
                "references":
                [
                    {
                        "title": "Use multi-agent collaboration with Amazon Bedrock Agents",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-multi-agent-collaboration.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Merge all action groups and knowledge bases from the three agents into a single new agent.",
                "explanation": "A single agent with all action groups and knowledge bases could answer requests from every domain. However, this approach removes the separation of ownership between teams and makes the agent's instructions and tool selection more complex, which can reduce accuracy. The teams would also need to rebuild and maintain a new combined agent.",
                "references":
                [
                    {
                        "title": "Automate tasks in your application using AI agents",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Build an AWS Lambda function that uses an FM to classify each request, calls the appropriate agent by using the InvokeAgent API, and merges the responses.",
                "explanation": "A custom Lambda router can classify and dispatch requests. However, the company must write and maintain code for classification, multi-agent coordination, session handling, and response consolidation. This solution requires significant custom orchestration code.",
                "references":
                [
                    {
                        "title": "What is AWS Lambda?",
                        "url": "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Create an Amazon Bedrock Flows flow with a condition node that routes each request to one agent node based on keywords.",
                "explanation": "Flows can route inputs to different nodes with condition logic. However, keyword-based static routing sends each request to only one agent and cannot dynamically coordinate requests that span multiple domains. Handling multi-domain requests would require additional complex flow logic.",
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
        "question": "A subscription streaming company uses an Amazon Bedrock agent to help customers manage their accounts. The agent has an action group with functions that cancel subscriptions and issue refunds. The functions are implemented in an AWS Lambda function.\n\nDuring testing, the agent occasionally invoked the cancellation function based on ambiguous customer statements. The company requires that customers must explicitly confirm before the agent runs the cancellation or refund functions.\n\nWhich solution will meet this requirement with the LEAST development effort?",
        "options":
        [
            {
                "id": "A",
                "text": "Add instructions to the agent prompt that tell the agent to always ask the customer for confirmation before canceling or refunding.",
                "explanation": "Agent instructions influence the agent's behavior, but the FM does not deterministically follow them. The agent could still invoke the functions without confirmation in some conversations. This solution does not guarantee that confirmation always occurs.",
                "references":
                [
                    {
                        "title": "Enhance agent's accuracy using advanced prompt templates in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/advanced-prompts.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Configure the action group to return control to the application. Implement a confirmation dialog and the cancellation and refund logic in the application.",
                "explanation": "Return of control sends the function details to the application instead of invoking the Lambda function. The application could implement confirmation before acting. However, the company would need to move the existing business logic out of the Lambda function and build the confirmation handling, which requires more development effort.",
                "references":
                [
                    {
                        "title": "Return control to the agent developer by sending elicited information in an InvokeAgent response",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-returncontrol.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Create a guardrail with a denied topic for cancellations and refunds and associate the guardrail with the agent.",
                "explanation": "A denied topic would block all conversations about cancellations and refunds. Customers would no longer be able to cancel or request refunds through the agent. This solution does not implement a confirmation step.",
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
                "text": "Enable user confirmation for the cancellation and refund functions in the action group.",
                "explanation": "Amazon Bedrock Agents supports user confirmation for action group functions. When confirmation is enabled, the agent returns the function details to the application and requests explicit user approval before the function is invoked. The existing Lambda function remains unchanged, so this solution requires the least development effort.",
                "references":
                [
                    {
                        "title": "Get user confirmation before invoking action group function",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-userconfirmation.html"
                    }
                ]
            }
        ],
        "correct_answer": "D"
    },
    {
        "question": "A wealth management firm is building an Amazon Bedrock agent for financial analysts. Analysts upload CSV files that contain portfolio positions and ask questions such as \"Calculate the 30-day volatility for each holding and plot the results.\" The analyses vary widely and cannot be predicted in advance.\n\nThe firm needs accurate numerical calculations and generated charts. The firm does not want to build or manage compute infrastructure for running analysis code, and the code must run in an isolated environment.\n\nWhich solution will meet these requirements with the LEAST operational overhead?",
        "options":
        [
            {
                "id": "A",
                "text": "Create an action group that is backed by an AWS Lambda function with data analysis libraries. Implement a function for each type of calculation and chart.",
                "explanation": "A Lambda-backed action group can perform calculations. However, the firm would need to anticipate and implement every type of analysis in advance, which is not possible because the requests vary widely. Building and maintaining these functions creates significant operational overhead.",
                "references":
                [
                    {
                        "title": "Configure Lambda functions to send information that an Amazon Bedrock agent elicits from the user",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-lambda.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Enable code interpretation for the agent.",
                "explanation": "Code interpretation lets an Amazon Bedrock agent generate and run code in a secure, sandboxed environment that Amazon Bedrock manages. The agent can process uploaded files, perform calculations, and generate charts. The firm does not need to build or manage compute infrastructure, which results in the least operational overhead.",
                "references":
                [
                    {
                        "title": "Generate, run, and test code for your application by enabling code interpretation",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-code-interpretation.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Ingest the CSV files into an Amazon Bedrock knowledge base that is associated with the agent.",
                "explanation": "A knowledge base retrieves relevant text chunks for RAG. Retrieval does not run calculations or produce charts. Chunking tabular data would also fragment the rows that the analysis needs.",
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
                "text": "Switch the agent to a larger FM and include the full CSV contents in the prompt so that the model performs the calculations.",
                "explanation": "LLMs generate text token by token and are not reliable for precise numerical computation on large datasets. A larger model does not guarantee accurate calculations and cannot render charts. Including full files in the prompt also increases token cost.",
                "references":
                [
                    {
                        "title": "Prompt engineering concepts",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A productivity software company deploys an AI agent on Amazon Bedrock AgentCore Runtime. The agent schedules meetings by reading and writing events in each user's third-party calendar service. The calendar service supports OAuth 2.0.\n\nThe agent must act on behalf of each individual user only after the user grants consent. The company must not store long-lived credentials in agent code or environment variables. The company wants to minimize the custom code that is required to manage tokens.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Create a single service account in the calendar service. Store the service account API key in AWS Secrets Manager and retrieve the key at runtime.",
                "explanation": "Secrets Manager securely stores secrets. However, a single shared service account does not act on behalf of each individual user and does not capture per-user consent. This approach also grants the agent broad access to every user's calendar.",
                "references":
                [
                    {
                        "title": "What is AWS Secrets Manager?",
                        "url": "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Store the OAuth client secret in an environment variable of the agent. Implement the authorization code flow and token refresh logic in the agent code, and cache tokens in memory.",
                "explanation": "This approach stores a long-lived secret in an environment variable, which violates the requirement. The company must also write and maintain custom code for the OAuth flow and token refresh. Tokens cached in memory are lost when the session ends.",
                "references":
                [
                    {
                        "title": "Working with Lambda environment variables",
                        "url": "https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Use Amazon Bedrock AgentCore Identity with an OAuth 2.0 credential provider for the calendar service. Have the agent request user-delegated access tokens from AgentCore Identity at runtime.",
                "explanation": "AgentCore Identity manages agent identities and outbound authentication to third-party services. With an OAuth 2.0 credential provider, AgentCore Identity handles the user consent flow and stores tokens securely in a token vault. The agent retrieves user-scoped tokens at runtime without embedding long-lived credentials, which minimizes custom token management code.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock AgentCore Identity",
                        "url": "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Attach an IAM role to the AgentCore Runtime that grants permissions to call the calendar service API.",
                "explanation": "IAM roles grant permissions to AWS resources and APIs. IAM roles cannot authenticate to a third-party calendar service or represent user consent in that service. This solution does not provide access to user calendars.",
                "references":
                [
                    {
                        "title": "Use temporary credentials with AWS resources",
                        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html"
                    }
                ]
            }
        ],
        "correct_answer": "C"
    },
    {
        "question": "A company exposes a GenAI API through Amazon API Gateway. Each request runs an AWS Lambda function that reads customer context from Amazon DynamoDB and then invokes an FM on Amazon Bedrock. The operations team has two requirements.\n\nFirst, the team must receive an alert within minutes when the application experiences an increase in throttled model requests. Second, the team must be able to identify which component, such as the DynamoDB lookup or the Bedrock call, contributes most to latency for individual slow requests.\n\nWhich combination of steps will meet these requirements?\n(Select TWO)",
        "options":
        [
            {
                "id": "A",
                "text": "Create an Amazon CloudWatch alarm on the InvocationThrottles metric in the AWS/Bedrock namespace for the model.",
                "explanation": "Amazon Bedrock publishes runtime metrics to CloudWatch, including InvocationThrottles, InvocationLatency, and token counts. A CloudWatch alarm on InvocationThrottles notifies the team within minutes when throttling increases. This step meets the alerting requirement.",
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
                "text": "Create an AWS CloudTrail trail and query the events with Amazon Athena to calculate the latency of each component for every request.",
                "explanation": "CloudTrail records API activity, such as who called an API and when. CloudTrail does not capture a timed breakdown of each component in a request path. This approach cannot identify which component contributes most to the latency of a request.",
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
                "text": "Enable model invocation logging to Amazon S3 and run a daily Athena query that counts throttled requests.",
                "explanation": "Model invocation logging captures request and response data for auditing and analysis. A daily query does not meet the requirement to alert within minutes. Metrics-based alarms are the appropriate mechanism for near real-time alerting.",
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
                "text": "Enable AWS X-Ray active tracing on the Lambda function and instrument the AWS SDK clients for DynamoDB and Amazon Bedrock.",
                "explanation": "X-Ray traces individual requests as they travel through the application. With active tracing and SDK instrumentation, each downstream call to DynamoDB and Amazon Bedrock appears as a timed subsegment. The team can inspect traces of slow requests to see which component contributes most to latency.",
                "references":
                [
                    {
                        "title": "Visualize Lambda function invocations using AWS X-Ray",
                        "url": "https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html"
                    },
                    {
                        "title": "What is AWS X-Ray?",
                        "url": "https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html"
                    }
                ]
            },
            {
                "id": "E",
                "text": "Create an AWS Config rule that evaluates the Lambda function configuration for throttling settings.",
                "explanation": "AWS Config evaluates resource configurations for compliance. AWS Config does not monitor runtime throttling of model invocations or trace request latency. This step does not meet either requirement.",
                "references":
                [
                    {
                        "title": "What is AWS Config?",
                        "url": "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html"
                    }
                ]
            }
        ],
        "correct_answer":
        [
            "A",
            "D"
        ]
    },
    {
        "question": "An online retailer stores its product catalog, inventory, and customer order history in an Amazon Aurora PostgreSQL-Compatible Edition database. The retailer wants to add semantic product search and recommendations that are based on vector embeddings of product descriptions.\n\nQueries must combine vector similarity with relational filters and joins, such as in-stock status and the customer's past purchases, in a single SQL query. The development team has strong SQL skills. The retailer wants to avoid introducing and synchronizing a separate data store.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Create an Amazon OpenSearch Serverless vector search collection. Build a pipeline that synchronizes product data from Aurora to the collection.",
                "explanation": "OpenSearch Serverless provides scalable vector search. However, this solution introduces a separate data store and requires a synchronization pipeline. Joins with order history and inventory tables cannot be performed in a single SQL query.",
                "references":
                [
                    {
                        "title": "Working with vector search collections",
                        "url": "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-vector-search.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Index the product descriptions in Amazon Kendra and query the index from the application.",
                "explanation": "Amazon Kendra is an intelligent enterprise search service. Kendra introduces a separate service and cannot join search results with relational tables in a single SQL query.",
                "references":
                [
                    {
                        "title": "What is Amazon Kendra?",
                        "url": "https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Store the embeddings as attributes in an Amazon DynamoDB table. Use an AWS Lambda function to compute cosine similarity across all items for each query.",
                "explanation": "DynamoDB does not provide native vector similarity search. A Lambda function that scans every item for each query does not scale and has high latency and cost. This solution also introduces a separate data store.",
                "references":
                [
                    {
                        "title": "What is Amazon DynamoDB?",
                        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Enable the pgvector extension in the existing Aurora PostgreSQL database. Store embeddings in a vector column and create a vector index.",
                "explanation": "Aurora PostgreSQL supports the pgvector extension for storing embeddings and performing similarity search with approximate nearest neighbor indexes. Vector similarity can be combined with relational filters and joins in a single SQL query. The data stays in the existing database, so no additional data store or synchronization is required.",
                "references":
                [
                    {
                        "title": "Using Aurora PostgreSQL as a vector database",
                        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html"
                    }
                ]
            }
        ],
        "correct_answer": "D"
    },
    {
        "question": "A research institute is building a RAG application by using Amazon Bedrock Knowledge Bases. The application will index embeddings for several billion chunks from a historical archive of scientific publications. Researchers query the archive infrequently, and query latency of under one second is acceptable.\n\nThe institute wants to minimize the cost of storing and querying the vectors and does not want to provision or manage any clusters or instances.\n\nWhich vector store will meet these requirements MOST cost-effectively?",
        "options":
        [
            {
                "id": "A",
                "text": "Amazon OpenSearch Serverless vector search collection",
                "explanation": "OpenSearch Serverless provides low-latency, high-throughput vector search without cluster management. However, compute capacity is billed continuously in OpenSearch Compute Units, which makes it more expensive for a very large, infrequently queried archive.",
                "references":
                [
                    {
                        "title": "Amazon OpenSearch Serverless",
                        "url": "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Amazon S3 Vectors vector bucket and vector index",
                "explanation": "Amazon S3 Vectors provides purpose-built, durable vector storage with native similarity search APIs and no infrastructure to provision. S3 Vectors is designed to reduce the cost of storing and querying large vector datasets that are queried infrequently, with subsecond query performance. S3 Vectors integrates with Amazon Bedrock Knowledge Bases as a vector store.",
                "references":
                [
                    {
                        "title": "Working with S3 Vectors and vector buckets",
                        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors.html"
                    },
                    {
                        "title": "Using S3 Vectors with Amazon Bedrock Knowledge Bases",
                        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-bedrock-kb.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Amazon Aurora PostgreSQL-Compatible Edition with pgvector on provisioned instances",
                "explanation": "Aurora PostgreSQL with pgvector is a supported vector store for knowledge bases. However, provisioned instances must be sized, managed, and paid for continuously, which violates the requirement to avoid managing instances and is not the most cost-effective option for infrequent queries.",
                "references":
                [
                    {
                        "title": "Using Aurora PostgreSQL as a vector database",
                        "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Amazon MemoryDB with vector search",
                "explanation": "MemoryDB vector search stores vectors in memory to provide single-digit millisecond latency. Keeping several billion vectors in memory on provisioned nodes is very expensive and is not necessary when subsecond latency is acceptable.",
                "references":
                [
                    {
                        "title": "Vector search for MemoryDB",
                        "url": "https://docs.aws.amazon.com/memorydb/latest/devguide/vector-search.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A company uses an Amazon Bedrock knowledge base to answer questions about its internal support articles. The articles are authored in a content management system (CMS). Throughout the day, editors update a small number of articles. The CMS emits an event each time an article is published or deleted.\n\nThe company requires that updates appear in assistant responses within a few minutes of publication. Currently, a full data source sync runs once each night. The company wants to avoid waiting for full syncs.\n\nWhich solution will meet these requirements with the LEAST operational overhead?",
        "options":
        [
            {
                "id": "A",
                "text": "Create an Amazon EventBridge schedule that calls the StartIngestionJob API every 5 minutes for the data source.",
                "explanation": "Frequent sync jobs can reduce delay. However, each ingestion job scans the data source to detect changes, and only one ingestion job can run at a time for a data source. Jobs that overlap or run long cannot reliably meet a few-minutes requirement, and repeated scans add unnecessary processing.",
                "references":
                [
                    {
                        "title": "Sync your data with your Amazon Bedrock knowledge base",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Create a new knowledge base each time an article changes and switch the application to the new knowledge base.",
                "explanation": "Rebuilding an entire knowledge base for each change is slow, costly, and operationally complex. This approach also requires the application configuration to change after each update.",
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
                "text": "Use a custom data source. Configure the CMS events to invoke an AWS Lambda function that calls the IngestKnowledgeBaseDocuments API for published articles and the DeleteKnowledgeBaseDocuments API for deleted articles.",
                "explanation": "Direct ingestion lets you add, update, or delete specific documents in a knowledge base in a single API call without running a full sync of the data source. Driving direct ingestion from CMS events makes changes available within minutes. Only the changed documents are processed, which minimizes overhead.",
                "references":
                [
                    {
                        "title": "Ingest changes directly into a knowledge base",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-direct-ingestion.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Increase the chunk size of the data source so that the nightly sync processes fewer chunks, and run the sync twice each day.",
                "explanation": "Larger chunks might reduce the number of chunks, but they can lower retrieval precision. Running the sync twice each day still leaves hours of delay, which does not meet the few-minutes requirement.",
                "references":
                [
                    {
                        "title": "How content chunking works for knowledge bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
                    }
                ]
            }
        ],
        "correct_answer": "C"
    },
    {
        "question": "A legal technology company ingests contracts into an Amazon Bedrock knowledge base. The contracts use a proprietary markup in which each clause begins with a marker such as \"[[CLAUSE 14.2]]\". Legal reviewers require that each retrieved chunk contains exactly one complete clause. Each chunk must also include the clause number as metadata so that the application can filter and cite clauses.\n\nNone of the built-in chunking strategies split the documents at the clause markers.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Configure a custom transformation AWS Lambda function for the data source that splits documents at the clause markers and adds the clause number as chunk metadata. Specify an intermediate Amazon S3 bucket for the Lambda function input and output.",
                "explanation": "Knowledge bases support a custom transformation Lambda function during ingestion. The Lambda function can implement custom chunking logic and attach metadata to each chunk. The knowledge base uses an intermediate S3 bucket to pass files to and from the function. This solution splits documents at clause boundaries and adds clause metadata.",
                "references":
                [
                    {
                        "title": "Use a custom transformation Lambda function to define how your data is ingested",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-custom-transformation.html"
                    },
                    {
                        "title": "How content chunking works for knowledge bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Configure hierarchical chunking with a child chunk size that matches the average clause length.",
                "explanation": "Hierarchical chunking splits documents into parent and child chunks based on token sizes. Clauses vary in length, so token-based splitting does not align with the clause markers. Hierarchical chunking also does not add clause numbers as metadata.",
                "references":
                [
                    {
                        "title": "How content chunking works for knowledge bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Configure semantic chunking with a high breakpoint percentile threshold.",
                "explanation": "Semantic chunking splits text based on semantic similarity between sentences. Semantic boundaries do not reliably match the proprietary clause markers, so a clause could be split or merged with adjacent clauses. Semantic chunking does not add clause numbers as metadata.",
                "references":
                [
                    {
                        "title": "Semantic chunking in Amazon Bedrock Knowledge Bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html#kb-semantic-chunking"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Configure fixed-size chunking with a maximum token size equal to the longest clause and 0 percent overlap.",
                "explanation": "Fixed-size chunking splits text by token count without considering content boundaries. Chunks would frequently contain parts of multiple clauses. This approach does not add clause numbers as metadata.",
                "references":
                [
                    {
                        "title": "How content chunking works for knowledge bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "An industrial equipment manufacturer uses Amazon Bedrock Knowledge Bases with an Amazon OpenSearch Serverless vector store for a parts assistant. Each document has a metadata file that includes a product_line attribute.\n\nTechnicians often search for exact part numbers, such as \"HX-4420-B\", and receive semantically similar but incorrect parts. Technicians also mention a product line in their questions, such as \"for the Titan series\", and expect results from only that product line. The company does not want to write custom code to parse product lines from queries.\n\nWhich combination of configurations will meet these requirements?\n(Select TWO)",
        "options":
        [
            {
                "id": "A",
                "text": "Increase the number of retrieved results to 100 so that the exact part is more likely to be included.",
                "explanation": "Retrieving more results increases token usage and latency. Pure semantic search can still rank the exact part number low because embeddings do not preserve exact identifier matches well. This configuration does not restrict results to a product line.",
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
                "text": "Set the search type of the retrieval configuration to hybrid search.",
                "explanation": "Hybrid search combines semantic search with keyword search. Keyword matching improves retrieval of exact terms such as part numbers, while semantic search continues to handle natural language questions. OpenSearch Serverless vector stores support hybrid search for knowledge bases.",
                "references":
                [
                    {
                        "title": "Configure and customize queries and response generation",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
                    },
                    {
                        "title": "Hybrid search in Amazon Bedrock Knowledge Bases",
                        "url": "https://aws.amazon.com/blogs/machine-learning/amazon-bedrock-knowledge-bases-now-supports-hybrid-search/"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Switch the chunking strategy to semantic chunking and re-ingest the documents.",
                "explanation": "Semantic chunking changes how documents are split. Semantic chunking does not improve exact matching of part numbers and does not filter results by product line.",
                "references":
                [
                    {
                        "title": "Semantic chunking in Amazon Bedrock Knowledge Bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html#kb-semantic-chunking"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Replace the embeddings model with a multilingual embeddings model.",
                "explanation": "A multilingual embeddings model improves retrieval across languages. The scenario does not involve multiple languages, and a different embeddings model does not guarantee exact identifier matching or product line filtering.",
                "references":
                [
                    {
                        "title": "Supported models and Regions for Amazon Bedrock knowledge bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-supported.html"
                    }
                ]
            },
            {
                "id": "E",
                "text": "Configure implicit metadata filtering with a metadata schema that describes the product_line attribute.",
                "explanation": "Implicit metadata filtering uses an FM to analyze the query and automatically generate a metadata filter based on a schema that you provide. When a technician mentions a product line, the knowledge base applies a product_line filter without custom parsing code. This configuration restricts results to the requested product line.",
                "references":
                [
                    {
                        "title": "Configure and customize queries and response generation",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
                    },
                    {
                        "title": "Include metadata in a data source to improve knowledge base query",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-metadata.html"
                    }
                ]
            }
        ],
        "correct_answer":
        [
            "B",
            "E"
        ]
    },
    {
        "question": "A marketing company is building a content pipeline. An FM on Amazon Bedrock generates a draft campaign description. A human editor must review and approve each draft before the content is published. Editors can take up to 3 days to respond. After approval, a publishing step runs automatically.\n\nThe company wants a serverless solution that minimizes custom code and does not incur compute charges while the workflow waits for approval.\n\nWhich combination of steps will meet these requirements?\n(Select TWO)",
        "options":
        [
            {
                "id": "A",
                "text": "Create an AWS Lambda function that generates the draft and then polls an Amazon DynamoDB table every minute until the editor's approval appears.",
                "explanation": "Lambda functions have a maximum execution duration of 15 minutes, so a function cannot wait up to 3 days. A polling function would also incur compute charges while it waits.",
                "references":
                [
                    {
                        "title": "Lambda quotas",
                        "url": "https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html#function-configuration-deployment-and-execution"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use an AWS Step Functions Express workflow to orchestrate the process.",
                "explanation": "Express workflows are designed for high-volume, short-duration workloads and can run for a maximum of 5 minutes. Express workflows also do not support the callback task pattern. An Express workflow cannot wait days for human approval.",
                "references":
                [
                    {
                        "title": "Choosing workflow type in Step Functions",
                        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Use an AWS Step Functions Standard workflow with the optimized Amazon Bedrock integration to invoke the FM and generate the draft.",
                "explanation": "Standard workflows can run for up to 1 year, which supports a multi-day approval process. The optimized Amazon Bedrock integration lets a Task state invoke a model directly without a Lambda function, which minimizes custom code.",
                "references":
                [
                    {
                        "title": "Invoke and customize Amazon Bedrock models with Step Functions",
                        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/connect-bedrock.html"
                    },
                    {
                        "title": "Choosing workflow type in Step Functions",
                        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Send each draft to an Amazon SQS delay queue and configure the delay to match the expected review time.",
                "explanation": "The maximum delay for an SQS delay queue is 15 minutes. A delay queue only postpones message delivery and does not capture an editor's approval decision.",
                "references":
                [
                    {
                        "title": "Amazon SQS delay queues",
                        "url": "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-delay-queues.html"
                    }
                ]
            },
            {
                "id": "E",
                "text": "Add a Task state that uses the .waitForTaskToken callback pattern to send the task token to the editor's review application. Have the review application call SendTaskSuccess or SendTaskFailure with the token.",
                "explanation": "The callback pattern pauses the workflow until an external process returns the task token. The workflow waits without running compute, and Standard workflows are billed per state transition rather than for wait time. When the editor responds, the review application calls SendTaskSuccess or SendTaskFailure and the workflow continues to the publishing step.",
                "references":
                [
                    {
                        "title": "Discover service integration patterns in Step Functions",
                        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html"
                    }
                ]
            }
        ],
        "correct_answer":
        [
            "C",
            "E"
        ]
    },
    {
        "question": "A global consulting firm wants to build a GenAI assistant that answers employee questions from documents stored in Microsoft SharePoint and Confluence. Each document has access control lists (ACLs) that restrict which users and groups can view the document.\n\nThe assistant must return only content from documents that the requesting user is authorized to view in the source systems. The firm wants to minimize custom code for synchronizing documents and permissions.\n\nWhich solution will meet these requirements with the LEAST operational overhead?",
        "options":
        [
            {
                "id": "A",
                "text": "Export the documents to Amazon S3 each night. Create metadata files that list allowed groups for each document, and apply metadata filters in Amazon Bedrock Knowledge Bases queries.",
                "explanation": "Metadata filters can restrict retrieval based on attributes. However, the firm must build and maintain custom export jobs and must keep the permission metadata synchronized with source system ACLs. Nightly exports also leave permissions stale for up to a day.",
                "references":
                [
                    {
                        "title": "Include metadata in a data source to improve knowledge base query",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-metadata.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use Amazon Kendra connectors for SharePoint and Confluence that crawl document ACLs. Query the Kendra index with the user's identity by using user context filtering, and pass the results to an FM on Amazon Bedrock.",
                "explanation": "Amazon Kendra provides managed connectors for SharePoint and Confluence that ingest documents together with their ACLs. User context filtering returns only the documents that the requesting user or the user's groups can access. The retrieved passages can be passed to an FM on Amazon Bedrock for answer generation with minimal custom code.",
                "references":
                [
                    {
                        "title": "Filtering on user context",
                        "url": "https://docs.aws.amazon.com/kendra/latest/dg/user-context-filter.html"
                    },
                    {
                        "title": "Creating a data source connector",
                        "url": "https://docs.aws.amazon.com/kendra/latest/dg/data-source.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Build a custom ingestion pipeline that writes document embeddings and ACLs to Amazon OpenSearch Service. Implement document-level security roles for every user group.",
                "explanation": "OpenSearch Service can enforce document-level security. However, the firm must build custom connectors, keep ACLs synchronized, and maintain security roles for every group. This solution has high operational overhead.",
                "references":
                [
                    {
                        "title": "What is Amazon OpenSearch Service?",
                        "url": "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Ingest all documents into a single knowledge base and add instructions to the system prompt that tell the FM to answer only from documents that the user is allowed to access.",
                "explanation": "The FM has no reliable information about document permissions and does not enforce access control. Prompt instructions cannot prevent unauthorized content from being retrieved and exposed. This solution does not meet the security requirement.",
                "references":
                [
                    {
                        "title": "Prompt engineering concepts",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A bank is building an Amazon Bedrock agent that lets authenticated customers check balances and recent transactions. The agent's action group invokes an AWS Lambda function that queries the bank's core systems by customer ID.\n\nThe application authenticates each customer and knows the customer ID before the conversation starts. Security reviewers found that the agent extracts the customer ID from the conversation, so a user could type another customer's ID and access that customer's data. The bank must ensure that the Lambda function always uses the authenticated customer's ID.\n\nWhich solution will meet this requirement?",
        "options":
        [
            {
                "id": "A",
                "text": "Add instructions to the agent that tell it to ignore any customer ID that the user types.",
                "explanation": "Agent instructions guide the FM's behavior but are not a security control. A user could still manipulate the agent through prompt injection. The customer ID would still come from model output rather than from a trusted source.",
                "references":
                [
                    {
                        "title": "Enhance agent's accuracy using advanced prompt templates in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/advanced-prompts.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Configure a guardrail with a regular expression sensitive information filter that blocks customer ID patterns in user input.",
                "explanation": "A sensitive information filter can block or mask patterns. However, blocking all customer IDs in user input does not pass the authenticated ID to the Lambda function. The Lambda function would still rely on the agent to provide an ID.",
                "references":
                [
                    {
                        "title": "Remove PII from conversations by using sensitive information filters",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Pass the authenticated customer ID in the sessionAttributes of the session state in each InvokeAgent request. Update the Lambda function to read the customer ID from the session attributes in the event and ignore any customer ID parameter from the agent.",
                "explanation": "Session attributes are key-value pairs that the application sets in the session state of an InvokeAgent request. Amazon Bedrock passes session attributes to the action group Lambda function in the event without the FM generating them. The Lambda function can use the trusted, application-provided customer ID, which prevents users from accessing other customers' data.",
                "references":
                [
                    {
                        "title": "Control agent session context",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-session-state.html"
                    },
                    {
                        "title": "Configure Lambda functions to send information that an Amazon Bedrock agent elicits from the user",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-lambda.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Enable trace on the agent and review the traces weekly for unexpected customer IDs.",
                "explanation": "Traces help developers understand the agent's reasoning and debug behavior. A weekly review detects issues after data has already been exposed and does not prevent unauthorized access.",
                "references":
                [
                    {
                        "title": "Track agent's step-by-step reasoning process using trace",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/trace-events.html"
                    }
                ]
            }
        ],
        "correct_answer": "C"
    },
    {
        "question": "A company runs a RAG chatbot that calls an FM through the Amazon Bedrock InvokeModel API with a guardrail applied. Each prompt contains the company's system instructions, several retrieved document passages, and the user's question.\n\nThe guardrail's prompt attack filter frequently flags the system instructions and retrieved passages as prompt attacks, which blocks legitimate requests. The company wants the guardrail to evaluate only the user's question for prompt attacks and other input filters, while keeping the existing filter strengths.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Set the prompt attack filter strength to NONE in the guardrail.",
                "explanation": "Setting the filter strength to NONE removes the false positives but also removes protection against prompt attacks in user input. This solution does not keep the existing filter strengths.",
                "references":
                [
                    {
                        "title": "Detect prompt attacks with Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Apply the guardrail only to model output instead of the input.",
                "explanation": "Evaluating only the model output removes input filtering entirely. Prompt attacks in the user's question would no longer be detected before the prompt reaches the model.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Call the ApplyGuardrail API on the full assembled prompt before each InvokeModel call.",
                "explanation": "The ApplyGuardrail API evaluates whatever content is passed to it. Passing the full assembled prompt would continue to evaluate the system instructions and retrieved passages, so the false positives would remain.",
                "references":
                [
                    {
                        "title": "Use the ApplyGuardrail API in your application",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-use-independent-api.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Wrap only the user's question in guardrail input tags with a dynamic tag suffix, and specify the tag suffix in the guardrail configuration of the request.",
                "explanation": "Input tags mark the specific parts of a prompt that the guardrail evaluates. Content outside the tags, such as system instructions and retrieved passages, is not evaluated by the input filters. The prompt attack filter requires input tags to distinguish user input from developer-provided content. A dynamic tag suffix prevents users from injecting closing tags. The existing filter strengths remain unchanged.",
                "references":
                [
                    {
                        "title": "Apply tags to user input to filter content",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-tagging.html"
                    },
                    {
                        "title": "Detect prompt attacks with Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html"
                    }
                ]
            }
        ],
        "correct_answer": "D"
    },
    {
        "question": "A healthcare company plans to fine-tune an FM by using an Amazon Bedrock model customization job. The training data contains sensitive data and is stored in an Amazon S3 bucket. The security team has the following requirements:\n\n- Access to the training data during the job must not traverse the public internet.\n- The resulting custom model must be encrypted with a key that the company creates and controls.\n- Amazon Bedrock must be able to access only the specific training and output locations, and only on behalf of the company's account.\n\nWhich combination of steps will meet these requirements?\n(Select THREE)",
        "options":
        [
            {
                "id": "A",
                "text": "Configure the model customization job with a VPC configuration that specifies private subnets and security groups. Create an Amazon S3 gateway endpoint for the VPC.",
                "explanation": "Amazon Bedrock model customization jobs support a VPC configuration. With an S3 VPC endpoint, the job accesses training and validation data in Amazon S3 through the company's VPC without traversing the public internet. A bucket policy can further restrict access to the VPC endpoint.",
                "references":
                [
                    {
                        "title": "Protect model customization jobs using a VPC",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-model-customization.html"
                    },
                    {
                        "title": "Gateway endpoints",
                        "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Submit a request to AWS Support to opt out of Amazon Bedrock using the training data to improve base models.",
                "explanation": "Amazon Bedrock does not use customer prompts, completions, or training data to train base FMs, and customer data is not shared with model providers. An opt-out request is not necessary and does not address any of the stated requirements.",
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
                "text": "Specify a customer managed AWS KMS key for the custom model when creating the model customization job.",
                "explanation": "You can specify a customer managed AWS KMS key to encrypt the custom model that a customization job produces. The company creates and controls the key, including its key policy and rotation, which meets the encryption requirement.",
                "references":
                [
                    {
                        "title": "Encryption of custom models",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/encryption-custom-job.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Configure the S3 bucket policy to allow public read access so that Amazon Bedrock can reach the training data.",
                "explanation": "Public access exposes sensitive data and is never required for Amazon Bedrock. Amazon Bedrock accesses training data through the IAM service role that you provide for the job.",
                "references":
                [
                    {
                        "title": "Security best practices in IAM",
                        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
                    }
                ]
            },
            {
                "id": "E",
                "text": "Copy the training data into the job request payload so that Amazon Bedrock does not need access to Amazon S3.",
                "explanation": "Model customization jobs read training and validation data from Amazon S3 locations. Training datasets cannot be passed inline in the job request, so this approach is not possible.",
                "references":
                [
                    {
                        "title": "Prepare data for fine-tuning your models",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-prepare.html"
                    }
                ]
            },
            {
                "id": "F",
                "text": "Create an IAM service role for the job with permissions scoped to the specific training and output S3 prefixes. Add aws:SourceAccount and aws:SourceArn conditions to the role's trust policy.",
                "explanation": "The model customization service role grants Amazon Bedrock permissions to access data on the company's behalf. Scoping the permissions to specific S3 prefixes enforces least privilege. Using aws:SourceAccount and aws:SourceArn conditions in the trust policy prevents the confused deputy problem, so Amazon Bedrock can assume the role only on behalf of the company's account.",
                "references":
                [
                    {
                        "title": "Create a service role for model customization",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-iam-role.html"
                    },
                    {
                        "title": "The confused deputy problem",
                        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html"
                    }
                ]
            }
        ],
        "correct_answer":
        [
            "A",
            "C",
            "F"
        ]
    },
    {
        "question": "A company operates a customer support chatbot that uses the Amazon Bedrock Converse API. The application stores the conversation history in Amazon DynamoDB and sends the full history in the messages array with every request.\n\nLong conversations now exceed 100 turns. Input token costs and latency increase with each turn, and some requests approach the model's context window limit. The company wants to reduce input tokens per request while preserving the context that the model needs to respond accurately.\n\nWhich combination of steps will meet these requirements?\n(Select TWO)",
        "options":
        [
            {
                "id": "A",
                "text": "Reduce the maxTokens inference parameter in each Converse request.",
                "explanation": "The maxTokens parameter limits the number of tokens that the model generates in the response. It does not reduce the input tokens of the conversation history and could truncate responses.",
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
                "text": "Send only a sliding window of the most recent turns, together with a running summary of earlier turns that a smaller, lower-cost FM generates.",
                "explanation": "A sliding window keeps the most recent and most relevant exchanges verbatim. A running summary condenses earlier turns into far fewer tokens while retaining key facts. Using a smaller model for summarization keeps the additional cost low. This approach bounds input tokens per request while preserving context.",
                "references":
                [
                    {
                        "title": "Carry out a conversation with the Converse API operations",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Increase the temperature inference parameter so that the model produces more concise responses.",
                "explanation": "Temperature controls the randomness of the model's output. Temperature does not make responses shorter and does not reduce the input tokens from the conversation history.",
                "references":
                [
                    {
                        "title": "Influence response generation with inference parameters",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html#inference-randomness"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Store embeddings of earlier turns and retrieve only the past turns that are semantically relevant to the current user message to include in the request.",
                "explanation": "Semantic retrieval over earlier turns includes only the context that relates to the current message. Irrelevant turns are excluded, which reduces input tokens while preserving the information that the model needs. Managed services such as Amazon Bedrock AgentCore Memory provide similar retrieval of relevant conversation memory.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock AgentCore Memory",
                        "url": "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory.html"
                    }
                ]
            },
            {
                "id": "E",
                "text": "Move the full conversation history from the messages array into the system prompt.",
                "explanation": "Moving the history into the system prompt does not reduce the number of input tokens. The model still processes the same amount of content, and the structure of the conversation is lost.",
                "references":
                [
                    {
                        "title": "Carry out a conversation with the Converse API operations",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"
                    }
                ]
            }
        ],
        "correct_answer":
        [
            "B",
            "D"
        ]
    }
];
