import { RawQuestion } from '../../types';

export const SET_P03_QUESTIONS: RawQuestion[] = [
    {
        "question": "A financial services company uses a large FM on Amazon Bedrock to generate compliance summaries from regulatory documents. The model produces high-quality summaries, but inference costs are significant because the model processes thousands of documents each day.\n\nThe company wants to reduce inference costs while maintaining summary quality that is close to the current model's output. The company does not want to build or manage training infrastructure.\n\nWhich approach will meet these requirements with the LEAST operational effort?",
        "options":
        [
            {
                "id": "A",
                "text": "Reduce the maxTokens inference parameter in each request to limit the length of generated summaries.",
                "explanation": "Reducing maxTokens limits the output length but does not reduce the per-token cost of the large model. Summaries may be truncated and lose critical compliance details. This approach does not address the cost of the input tokens.",
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
                "text": "Use Amazon Bedrock Model Distillation to transfer the large model's knowledge to a smaller, lower-cost student model using the company's regulatory documents as prompts.",
                "explanation": "Model distillation in Amazon Bedrock transfers knowledge from a larger teacher model to a smaller student model. Amazon Bedrock generates synthetic responses from the teacher model and fine-tunes the student model, all within a managed, serverless workflow. The resulting student model provides lower inference costs while maintaining quality close to the teacher model. No training infrastructure management is required.",
                "references":
                [
                    {
                        "title": "Customize a model with distillation in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-distillation.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Switch to on-demand inference with a cross-Region inference profile to reduce costs by distributing requests across lower-cost Regions.",
                "explanation": "Cross-Region inference increases available throughput by distributing requests across Regions. It does not reduce the per-token price of a model. The cost structure remains the same regardless of which Region processes the request.",
                "references":
                [
                    {
                        "title": "Increase throughput with cross-Region inference",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Export the model from Amazon Bedrock, quantize it to 4-bit precision on an Amazon EC2 instance, and deploy the quantized model on Amazon SageMaker.",
                "explanation": "Quantization can reduce model size and cost. However, exporting base models from Amazon Bedrock is not supported. This approach also requires the company to manage EC2 and SageMaker infrastructure, which adds significant operational overhead.",
                "references":
                [
                    {
                        "title": "Customize your model to improve its performance for your use case",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A machine learning team has fine-tuned a Llama model using LoRA adapters in Amazon SageMaker AI. The team wants to deploy the fine-tuned model through Amazon Bedrock so that application developers can use the same Converse API and guardrails they use for other Bedrock models.\n\nThe LoRA adapters are stored as separate files. The team wants to use on-demand inference pricing.\n\nWhich steps must the team complete before invoking the model through Amazon Bedrock?",
        "options":
        [
            {
                "id": "A",
                "text": "Upload the LoRA adapter files directly to Amazon Bedrock and attach them to the base Llama model.",
                "explanation": "Amazon Bedrock Custom Model Import expects a single set of merged model weights in Safetensors format. You cannot upload separate LoRA adapter files and attach them to a base model in Amazon Bedrock.",
                "references":
                [
                    {
                        "title": "Use Custom model import to import a customized open-source model into Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-import-model.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Merge the LoRA adapters into the base model weights, serialize the merged model in Safetensors format, upload to Amazon S3, and run a Custom Model Import job in Amazon Bedrock.",
                "explanation": "Custom Model Import requires model weights to be merged and serialized in Safetensors format. For LoRA-PEFT adapters, you must merge the adapter weights into the base model before import. After the import job completes, the model is available for on-demand inference through the standard Bedrock APIs including the Converse API.",
                "references":
                [
                    {
                        "title": "Use Custom model import to import a customized open-source model into Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-import-model.html"
                    },
                    {
                        "title": "Amazon Bedrock Custom Model Import now generally available",
                        "url": "https://aws.amazon.com/blogs/machine-learning/amazon-bedrock-custom-model-import-now-generally-available/"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Deploy the fine-tuned model to a SageMaker real-time endpoint and configure Amazon Bedrock to route Converse API calls to the endpoint.",
                "explanation": "Amazon Bedrock does not route API calls to external SageMaker endpoints. Bedrock and SageMaker AI are separate inference platforms. To use the model through Bedrock APIs, it must be imported into Bedrock.",
                "references":
                [
                    {
                        "title": "Making inference requests",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Create a fine-tuning job in Amazon Bedrock using the same training data and the Llama base model, bypassing the SageMaker-trained adapters.",
                "explanation": "Creating a new fine-tuning job in Bedrock discards the work already done in SageMaker and requires re-training. The team wants to reuse the existing fine-tuned model, not create a new one.",
                "references":
                [
                    {
                        "title": "Customize your model to improve its performance for your use case",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A healthcare organization is building an ML model to predict patient readmission risk. A data scientist has trained an XGBoost model in Amazon SageMaker AI. Before deploying the model to production, the compliance team requires the following:\n\n- A report that identifies whether any protected attributes (such as age group or ethnicity) introduce bias in the model's predictions.\n- An explanation of how each feature contributes to individual predictions so that clinicians can understand the model's reasoning.\n\nWhich combination of SageMaker Clarify capabilities will meet these requirements?\n(Select TWO)",
        "options":
        [
            {
                "id": "A",
                "text": "Run a SageMaker Clarify bias analysis job that computes post-training bias metrics such as Disparate Impact and Difference in Positive Proportions in Predicted Labels across the protected attributes.",
                "explanation": "SageMaker Clarify computes post-training bias metrics that compare model predictions across groups defined by protected attributes. Metrics such as Disparate Impact and Difference in Positive Proportions in Predicted Labels identify whether the model's predictions are biased. The results are provided in a report suitable for compliance review.",
                "references":
                [
                    {
                        "title": "Fairness, model explainability and bias detection with SageMaker Clarify",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-configure-processing-jobs.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Enable Amazon SageMaker Model Monitor to detect data quality drift on the training dataset.",
                "explanation": "Model Monitor detects drift in live inference data compared to a baseline. Data quality drift monitoring checks for changes in data distributions, not for bias in model predictions. This does not produce a bias report or feature-level explanations.",
                "references":
                [
                    {
                        "title": "Data and model quality monitoring with Amazon SageMaker Model Monitor",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Run a SageMaker Clarify explainability job that uses Kernel SHAP to compute feature attributions for individual predictions.",
                "explanation": "SageMaker Clarify uses a scalable implementation of Kernel SHAP to compute feature attributions. SHAP values explain how each input feature contributes to each individual prediction in terms of both magnitude and direction. SHAP is model-agnostic and works with XGBoost. This meets the requirement for clinicians to understand individual model decisions.",
                "references":
                [
                    {
                        "title": "How Zopa enhanced their fraud detection application using Amazon SageMaker Clarify",
                        "url": "https://aws.amazon.com/blogs/machine-learning/how-zopa-enhanced-their-fraud-detection-application-using-amazon-sagemaker-clarify/"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use Amazon Bedrock model evaluation to run an LLM-as-a-judge evaluation on the XGBoost model's predictions.",
                "explanation": "Amazon Bedrock model evaluation is designed to evaluate foundation model outputs such as text generation quality. It does not evaluate traditional ML models like XGBoost, and it does not compute bias metrics or SHAP values.",
                "references":
                [
                    {
                        "title": "Evaluate the performance of Amazon Bedrock resources",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
                    }
                ]
            },
            {
                "id": "E",
                "text": "Configure SageMaker Clarify to compute pre-training bias metrics on the features used for inference.",
                "explanation": "Pre-training bias metrics analyze the training dataset before model training to detect imbalances in the data. They do not analyze the model's predictions. The compliance team requires a report on whether the model's predictions are biased, which requires post-training metrics.",
                "references":
                [
                    {
                        "title": "Fairness, model explainability and bias detection with SageMaker Clarify",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-configure-processing-jobs.html"
                    }
                ]
            }
        ],
        "correct_answer": ["A", "C"]
    },
    {
        "question": "A media company is building a content moderation pipeline using Amazon Bedrock Flows. The pipeline must perform the following steps in order:\n\n1. Accept a user-submitted article as input.\n2. Use an FM to classify the article as safe, borderline, or unsafe.\n3. If the article is classified as safe, generate a summary and return it.\n4. If the article is classified as borderline, send it to a human review queue via an AWS Lambda function.\n5. If the article is classified as unsafe, return a rejection message.\n\nThe company wants to build this pipeline visually in the Amazon Bedrock console without writing custom orchestration code.\n\nWhich combination of Amazon Bedrock Flows node types will the company use to implement the branching logic after classification?\n(Select TWO)",
        "options":
        [
            {
                "id": "A",
                "text": "A Condition node that evaluates the classification output and routes to different downstream nodes based on the result.",
                "explanation": "Condition nodes in Amazon Bedrock Flows evaluate expressions against the input and use conditional connections to route data to different downstream nodes. The company can define conditions for safe, borderline, and unsafe classifications, each routing to the appropriate next step.",
                "references":
                [
                    {
                        "title": "Key definitions for Amazon Bedrock Flows",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions-flow.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "An Iterator node that loops through each classification label and processes them sequentially.",
                "explanation": "An Iterator node processes each element of an array input sequentially. The classification produces a single label, not an array. An Iterator node is not appropriate for branching based on a single classification result.",
                "references":
                [
                    {
                        "title": "Key definitions for Amazon Bedrock Flows",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions-flow.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "A Lambda function node for the borderline path that invokes the Lambda function to send the article to the human review queue.",
                "explanation": "Lambda function nodes invoke an AWS Lambda function as a step in the flow. For the borderline classification path, the conditional connection from the Condition node routes to a Lambda function node that sends the article to the review queue. This meets the requirement without custom orchestration code outside the flow.",
                "references":
                [
                    {
                        "title": "Key definitions for Amazon Bedrock Flows",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions-flow.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "A Knowledge Base node that retrieves examples of previously moderated articles to help with classification.",
                "explanation": "A Knowledge Base node retrieves relevant chunks from a knowledge base for RAG. The pipeline requires branching logic based on a classification result, not retrieval of similar articles. Adding a Knowledge Base node does not implement the conditional routing.",
                "references":
                [
                    {
                        "title": "Key definitions for Amazon Bedrock Flows",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions-flow.html"
                    }
                ]
            },
            {
                "id": "E",
                "text": "A Storage node that persists the classification result to Amazon S3 before branching.",
                "explanation": "A Storage node saves data to an S3 bucket. Persisting the classification result is not part of the branching logic. The company needs to route the flow based on the result, not store it.",
                "references":
                [
                    {
                        "title": "Key definitions for Amazon Bedrock Flows",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions-flow.html"
                    }
                ]
            }
        ],
        "correct_answer": ["A", "C"]
    },
    {
        "question": "A company is developing a domain-specific FM for the oil and gas industry. The company has a large corpus of unlabeled geological survey reports, well logs, and seismic analysis documents. The company wants the model to understand industry terminology and produce responses that reflect domain-specific language patterns.\n\nThe company does not have labeled input-output pairs for specific tasks. The company wants to use Amazon Bedrock model customization.\n\nWhich customization method is MOST appropriate?",
        "options":
        [
            {
                "id": "A",
                "text": "Fine-tuning with the unlabeled documents as training data.",
                "explanation": "Fine-tuning requires labeled training data with input-output pairs so the model can learn the association between inputs and desired outputs. The company has unlabeled documents, so fine-tuning is not appropriate for this use case.",
                "references":
                [
                    {
                        "title": "Customize your model to improve its performance for your use case",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Continued pre-training with the unlabeled domain-specific corpus.",
                "explanation": "Continued pre-training, also known as domain adaptation, trains the model on unlabeled, proprietary data to improve its understanding of domain-specific language patterns, terminology, and concepts. This method does not require labeled input-output pairs. It extends the model's pre-training with the company's geological documents, making it more knowledgeable about oil and gas terminology.",
                "references":
                [
                    {
                        "title": "Customize models in Amazon Bedrock with your own data using fine-tuning and continued pre-training",
                        "url": "https://aws.amazon.com/blogs/aws/customize-models-in-amazon-bedrock-with-your-own-data-using-fine-tuning-and-continued-pre-training/"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Model distillation using a larger FM as the teacher model and the domain corpus as prompts.",
                "explanation": "Model distillation transfers knowledge from a larger teacher model to a smaller student model. The goal is to reduce cost by using a smaller model that mimics the teacher's outputs, not to adapt a model to domain-specific language. Distillation does not ingest unlabeled domain documents as training data.",
                "references":
                [
                    {
                        "title": "Customize a model with distillation in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-distillation.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Ingest the documents into an Amazon Bedrock knowledge base and use RAG instead of customization.",
                "explanation": "RAG retrieves relevant passages at query time and provides them as context to the FM. RAG does not change the model's understanding of domain terminology or language patterns. The model still processes the retrieved text with its original vocabulary and representations. RAG is complementary to, not a replacement for, domain adaptation.",
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
        "question": "An e-commerce company runs a customer service agent on Amazon Bedrock that handles returns and order tracking. The agent uses two action groups: one for order lookups and one for return processing. Each action group is backed by a separate AWS Lambda function.\n\nThe company now wants the agent to remember customer preferences and past interactions across multiple sessions. For example, if a customer mentioned in a previous session that they prefer email notifications, the agent should recall this preference in future sessions.\n\nWhich solution will meet this requirement with the LEAST custom code?",
        "options":
        [
            {
                "id": "A",
                "text": "Store conversation summaries in an Amazon DynamoDB table keyed by customer ID. Add an action group that reads and writes to the table. Instruct the agent to call this action group at the start and end of each session.",
                "explanation": "This approach requires the company to build a DynamoDB table, write a Lambda function for the action group, and manage the storage and retrieval logic. The agent must also be instructed to use the action group correctly, which adds complexity and is not deterministic.",
                "references":
                [
                    {
                        "title": "Use action groups to define actions for your agent to perform",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-action-create.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Enable memory for the agent and assign the same memoryId for each customer across sessions. Configure the memory retention duration.",
                "explanation": "Amazon Bedrock Agents supports memory that retains conversational context across multiple sessions. When memory is enabled, the agent automatically summarizes sessions and stores the summaries. By assigning the same memoryId for each customer, past session summaries are loaded into new sessions. This is a configuration change that requires no custom storage or retrieval code.",
                "references":
                [
                    {
                        "title": "Retain conversational context across multiple sessions using memory",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-memory.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Pass the full conversation history from all previous sessions in the sessionState of each InvokeAgent request.",
                "explanation": "Including full conversation histories from all sessions in every request would quickly exceed the model's context window limit. Session state is intended for structured attributes, not bulk conversation logs. This approach also increases latency and cost with every request.",
                "references":
                [
                    {
                        "title": "Control agent session context",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-session-state.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Create an Amazon Bedrock knowledge base that indexes all past conversation transcripts and associate it with the agent.",
                "explanation": "A knowledge base retrieves text chunks based on semantic similarity. Conversation transcripts mixed from many customers could return irrelevant results from other customers' sessions. This approach does not scope memory to individual customers and requires building an ingestion pipeline for transcripts.",
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
        "question": "A company is evaluating two FMs on Amazon Bedrock for a customer email response generation task. The company needs to compare the models across three dimensions: response helpfulness, tone appropriateness, and factual accuracy. The evaluation must use the company's own dataset of 500 representative customer emails.\n\nThe company wants the evaluation to run automatically without human reviewers for this initial comparison.\n\nWhich approach will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Create an automatic model evaluation job in Amazon Bedrock that uses LLM-as-a-judge with custom metrics for helpfulness, tone, and accuracy. Provide the 500 emails as a custom prompt dataset and select both models for evaluation.",
                "explanation": "Amazon Bedrock automatic model evaluation supports LLM-as-a-judge evaluations with custom metrics. You can define custom evaluation criteria and provide your own prompt dataset. The job can evaluate and compare multiple models. This approach meets all requirements: custom dataset, three evaluation dimensions, automatic execution, and model comparison.",
                "references":
                [
                    {
                        "title": "Effective cross-lingual LLM evaluation with Amazon Bedrock",
                        "url": "https://aws.amazon.com/blogs/machine-learning/effective-cross-lingual-llm-evaluation-with-amazon-bedrock/"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Create a human-based model evaluation job in Amazon Bedrock and assign the evaluation to an internal work team.",
                "explanation": "Human-based evaluation uses human reviewers to assess model outputs. The company explicitly wants the evaluation to run automatically without human reviewers for this initial comparison.",
                "references":
                [
                    {
                        "title": "Create a human-based model evaluation job",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-jobs-management-create-human.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Invoke each model with the 500 emails using the Converse API and compute BLEU scores against reference responses.",
                "explanation": "BLEU scores measure n-gram overlap between generated text and reference text. BLEU does not evaluate helpfulness, tone appropriateness, or factual accuracy. The company would also need to write custom code for orchestration and scoring.",
                "references":
                [
                    {
                        "title": "Carry out a conversation with the Converse API operations",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use Amazon Bedrock Guardrails to score both models on content policy compliance for each email.",
                "explanation": "Guardrails detect and filter harmful content based on predefined categories. Guardrails do not evaluate helpfulness, tone, or factual accuracy. They are safety filters, not quality evaluators.",
                "references":
                [
                    {
                        "title": "Detect and filter harmful content by using Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A government agency is building a knowledge base with Amazon Bedrock to answer citizen questions about tax regulations. The tax code documents contain deeply nested sections with clauses, sub-clauses, and cross-references. Individual sentences in isolation often lack sufficient context.\n\nDuring testing, the agency finds that retrieved chunks frequently miss surrounding context, causing the FM to generate incomplete or misleading answers. The agency wants to improve retrieval quality by providing broader context around each retrieved chunk.\n\nWhich chunking strategy will BEST address this issue?",
        "options":
        [
            {
                "id": "A",
                "text": "Fixed-size chunking with a large maximum token size of 1,000 tokens and 20% overlap between chunks.",
                "explanation": "Large fixed-size chunks include more surrounding text. However, fixed-size boundaries can still split clauses mid-sentence and may combine unrelated sections. Overlap helps but does not guarantee that the correct context is attached to each chunk.",
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
                "text": "Semantic chunking with a high breakpoint percentile threshold.",
                "explanation": "Semantic chunking groups semantically similar sentences together. This approach works well for narrative content but does not explicitly maintain a parent-child relationship between detailed passages and their broader context. For deeply nested legal structures, semantic similarity alone may not capture the hierarchical relationships.",
                "references":
                [
                    {
                        "title": "Amazon Bedrock Knowledge Bases now supports advanced parsing, chunking, and query reformulation",
                        "url": "https://aws.amazon.com/blogs/machine-learning/amazon-bedrock-knowledge-bases-now-supports-advanced-parsing-chunking-and-query-reformulation-giving-greater-control-of-accuracy-in-rag-based-applications/"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Hierarchical chunking with parent and child chunk sizes configured for the document structure.",
                "explanation": "Hierarchical chunking creates a two-level structure of parent and child chunks. During retrieval, the system retrieves small, precise child chunks but replaces them with their broader parent chunks to provide the FM with more comprehensive context. This approach directly addresses the problem of missing surrounding context in nested document structures.",
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
                "text": "No chunking, with each document treated as a single chunk.",
                "explanation": "Treating entire documents as single chunks means the full document is included in the context. For large tax code documents, this would exceed token limits and include large amounts of irrelevant text, increasing cost and potentially degrading response quality.",
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
        "question": "A retail company has deployed an ML model on Amazon SageMaker AI to predict customer churn. The model was trained on customer behavior data from the holiday season. Three months after deployment, the operations team notices that the model's prediction accuracy has dropped significantly, even though no code changes were made.\n\nThe team wants to set up automated detection of this type of degradation so they can be alerted and retrain the model proactively.\n\nWhich combination of Amazon SageMaker monitoring capabilities should the team configure?\n(Select TWO)",
        "options":
        [
            {
                "id": "A",
                "text": "Configure data quality monitoring to detect drift in the distribution of input features compared to the training baseline.",
                "explanation": "Data quality monitoring in SageMaker Model Monitor compares the statistical distribution of live inference input data against a baseline from the training data. When customer behavior patterns change (covariate shift), data quality monitoring detects the drift and raises an alert. This is a strong proxy for model degradation when ground truth labels are delayed.",
                "references":
                [
                    {
                        "title": "Data and model quality monitoring with Amazon SageMaker Model Monitor",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Configure feature attribution drift monitoring to detect changes in SHAP-based feature importance compared to the training baseline.",
                "explanation": "Feature attribution drift monitoring uses the NDCG score to compare global SHAP feature attributions between training data and live data. A significant change in which features drive predictions indicates that the model's behavior has shifted. Combined with data quality monitoring, this provides early detection of model degradation.",
                "references":
                [
                    {
                        "title": "Feature attribution drift for models in production",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-monitor-feature-attribution-drift.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Enable model invocation logging in Amazon Bedrock to capture all inference requests.",
                "explanation": "Model invocation logging is an Amazon Bedrock feature, not a SageMaker AI feature. It captures request and response data for Bedrock models. The company's model is deployed on SageMaker, so this option is not applicable.",
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
                "text": "Create a SageMaker Pipeline that retrains the model on a daily schedule regardless of drift detection.",
                "explanation": "Daily retraining without drift detection wastes compute resources when the model is still performing well. The team wants to be alerted proactively to retrain only when degradation is detected, not on a fixed schedule.",
                "references":
                [
                    {
                        "title": "Automation pipelines",
                        "url": "https://docs.aws.amazon.com/whitepapers/latest/build-secure-enterprise-ml-platform/automation-pipelines.html"
                    }
                ]
            },
            {
                "id": "E",
                "text": "Use Amazon SageMaker Clarify to run a one-time pre-training bias analysis on the original training data.",
                "explanation": "Pre-training bias analysis is a one-time assessment of the training data for fairness issues. It does not monitor live inference data for drift or degradation. The team needs ongoing automated monitoring, not a one-time analysis.",
                "references":
                [
                    {
                        "title": "Fairness, model explainability and bias detection with SageMaker Clarify",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-configure-processing-jobs.html"
                    }
                ]
            }
        ],
        "correct_answer": ["A", "B"]
    },
    {
        "question": "An enterprise IT department is deploying Amazon Q Business to provide employees with a generative AI assistant that can answer questions from internal documentation stored in Confluence, SharePoint, and Amazon S3.\n\nThe IT team needs the assistant to enforce existing document-level access permissions so that each employee sees answers derived only from documents they are authorized to view. The team also wants to block the assistant from discussing competitor products.\n\nWhich combination of Amazon Q Business features will meet these requirements?\n(Select TWO)",
        "options":
        [
            {
                "id": "A",
                "text": "Use the managed data source connectors for Confluence and SharePoint, which automatically crawl and sync document access control lists (ACLs).",
                "explanation": "Amazon Q Business provides managed connectors that crawl documents along with their ACLs. When a user queries the assistant, Amazon Q Business filters results based on the user's identity and group memberships, returning only content the user is authorized to view. This enforces existing permissions without custom code.",
                "references":
                [
                    {
                        "title": "Key concepts of Amazon Q Business",
                        "url": "https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/concepts-terms.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Create a single Amazon S3 data source and apply IAM bucket policies to restrict which users can access the bucket.",
                "explanation": "IAM bucket policies control who can access the S3 bucket at the AWS level. They do not provide document-level access control within Amazon Q Business based on employee identity. All users who query through Amazon Q Business would see results from documents in the bucket regardless of the bucket policy.",
                "references":
                [
                    {
                        "title": "Enterprise Features",
                        "url": "https://aws.amazon.com/q/business/features/"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Configure topic-level controls in Amazon Q Business admin controls to block discussions about competitor products.",
                "explanation": "Amazon Q Business supports admin controls and guardrails including topic-level controls. These controls can block the assistant from discussing specific topics such as competitor products. This meets the requirement to restrict the scope of the assistant's responses.",
                "references":
                [
                    {
                        "title": "Amazon Q Business",
                        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/rag-fully-managed-q-business.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Add a prompt instruction in the system prompt that tells the FM to never discuss competitor products.",
                "explanation": "System prompt instructions influence FM behavior but are not a reliable control mechanism. The FM may still discuss competitor products in edge cases or through prompt injection. Admin-level guardrails provide a more reliable blocking mechanism.",
                "references":
                [
                    {
                        "title": "Enterprise Features",
                        "url": "https://aws.amazon.com/q/business/features/"
                    }
                ]
            },
            {
                "id": "E",
                "text": "Deploy an Amazon Bedrock guardrail with a denied topic for competitor names and apply it to the Amazon Q Business application.",
                "explanation": "Amazon Q Business has its own built-in admin controls and guardrails. Amazon Bedrock Guardrails are a separate service designed for Amazon Bedrock model invocations and cannot be directly applied to Amazon Q Business applications.",
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
        "question": "A data science team uses Amazon SageMaker Pipelines to automate the ML lifecycle for a fraud detection model. The pipeline includes data processing, model training, evaluation, and conditional registration steps. The team wants to implement the following workflow:\n\n- After training, automatically evaluate the model on a held-out test set.\n- If the model's F1 score exceeds 0.85, register the model in Amazon SageMaker Model Registry with a \"PendingManualApproval\" status.\n- If the F1 score is below 0.85, skip registration and fail the pipeline.\n\nWhich SageMaker Pipelines feature enables the conditional logic between evaluation and registration?",
        "options":
        [
            {
                "id": "A",
                "text": "A ConditionStep that evaluates the F1 score from the evaluation step output and branches to the registration step or a FailStep.",
                "explanation": "SageMaker Pipelines supports ConditionStep, which evaluates conditions on pipeline parameters or step outputs. The condition can check whether the F1 score from the evaluation step exceeds the threshold and branch to either the model registration step or a FailStep. This implements the conditional workflow natively within the pipeline.",
                "references":
                [
                    {
                        "title": "Automation pipelines",
                        "url": "https://docs.aws.amazon.com/whitepapers/latest/build-secure-enterprise-ml-platform/automation-pipelines.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "An Amazon EventBridge rule that triggers a Lambda function to check the F1 score and call the Model Registry API.",
                "explanation": "EventBridge can react to pipeline events, but adding external Lambda-based orchestration defeats the purpose of using SageMaker Pipelines for workflow management. The conditional logic should be defined within the pipeline itself using built-in step types.",
                "references":
                [
                    {
                        "title": "Automation pipelines",
                        "url": "https://docs.aws.amazon.com/whitepapers/latest/build-secure-enterprise-ml-platform/automation-pipelines.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "A ClarifyCheckStep that evaluates the model for bias metrics and blocks registration if bias is detected.",
                "explanation": "ClarifyCheckStep evaluates bias metrics or feature attributions, not model quality metrics such as F1 score. This step addresses fairness, not the performance threshold requirement.",
                "references":
                [
                    {
                        "title": "Fairness, model explainability and bias detection with SageMaker Clarify",
                        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-configure-processing-jobs.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "A CallbackStep that pauses the pipeline and waits for a data scientist to approve model registration manually.",
                "explanation": "A CallbackStep pauses the pipeline to wait for an external signal. The requirement is for automatic conditional registration based on F1 score, not manual approval of the evaluation results. Manual intervention defeats the automation goal.",
                "references":
                [
                    {
                        "title": "Automation pipelines",
                        "url": "https://docs.aws.amazon.com/whitepapers/latest/build-secure-enterprise-ml-platform/automation-pipelines.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A company has built a call center summarization application that uses the Amazon Bedrock Converse API with a large context window model. Each request sends a full call transcript (averaging 8,000 tokens) along with a 2,000-token system prompt that includes summarization instructions and output format specifications.\n\nThe system prompt is identical across all requests. The company processes 10,000 calls per day and wants to reduce both latency and cost without changing the model or the system prompt content.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Enable prompt caching for the system prompt in each Converse request.",
                "explanation": "Prompt caching in Amazon Bedrock allows reusing a cached prompt prefix across requests. Because the system prompt is identical for all requests, it can be cached and reused. Subsequent requests skip the processing of the cached prefix, which reduces latency for the first tokens and lowers the input token cost for the cached portion. The unique transcript content in each request is processed normally.",
                "references":
                [
                    {
                        "title": "Prompt caching for faster model inference",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Submit all 10,000 transcripts as a single Amazon Bedrock batch inference job each day.",
                "explanation": "Batch inference reduces cost for large asynchronous workloads. However, call center operations typically need summaries soon after each call, not at the end of the day. Batch inference does not reduce per-request latency for individual calls.",
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
                "text": "Shorten the system prompt by removing formatting instructions and relying on the model's default behavior.",
                "explanation": "Removing formatting instructions changes the system prompt content, which the company does not want. The model's outputs may become inconsistent without explicit formatting guidance, and the token savings from a shorter prompt are limited compared to caching.",
                "references":
                [
                    {
                        "title": "Prompt engineering concepts",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Purchase Provisioned Throughput to process requests faster and reduce overall costs.",
                "explanation": "Provisioned Throughput reserves dedicated capacity for consistent throughput. It does not inherently reduce the per-token processing latency for the system prompt portion of each request. Provisioned Throughput is cost-effective for steady, high-volume workloads but does not specifically address the repeated processing of an identical prompt prefix.",
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
        "question": "A company is building an internal chatbot powered by Amazon Bedrock. The chatbot must redact personally identifiable information (PII) such as email addresses and phone numbers from user prompts before the prompt reaches the FM. The chatbot must also block the FM from generating responses that contain credit card numbers.\n\nThe company wants to apply these safeguards consistently across all FM invocations without modifying application code for each new PII type.\n\nWhich solution will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Write a preprocessing AWS Lambda function that uses regular expressions to detect and remove PII from prompts before calling the FM.",
                "explanation": "A custom Lambda function requires the company to write, test, and maintain regex patterns for each PII type. Adding new PII types requires code changes. This approach does not protect the FM's output from containing PII.",
                "references":
                [
                    {
                        "title": "What is AWS Lambda?",
                        "url": "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Create an Amazon Bedrock guardrail with sensitive information filters. Configure email and phone number entity types with the ANONYMIZE action for input, and configure credit card number entity type with the BLOCK action for output.",
                "explanation": "Amazon Bedrock Guardrails sensitive information filters detect PII entities using ML-based detection in both input prompts and model responses. You can configure different actions per entity type: ANONYMIZE replaces detected PII with a placeholder, and BLOCK prevents the response from being returned. Configuring email and phone with ANONYMIZE on input redacts them before reaching the FM. Configuring credit card with BLOCK on output prevents the model from returning credit card numbers. Adding new PII types is a configuration change, not a code change.",
                "references":
                [
                    {
                        "title": "Create your guardrail",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-components.html"
                    },
                    {
                        "title": "Detect and filter harmful content by using Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Add instructions to the system prompt that tell the FM to never include PII in responses and to ignore PII in user prompts.",
                "explanation": "System prompt instructions are not a reliable security control. The FM may still process PII in the input and could include PII in outputs despite instructions. Prompt-based controls can be bypassed through prompt injection.",
                "references":
                [
                    {
                        "title": "Prompt engineering concepts",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use Amazon Comprehend to detect PII entities in the prompt and replace them before sending the prompt to Amazon Bedrock.",
                "explanation": "Amazon Comprehend can detect PII, but integrating it requires custom code to call Comprehend, parse the response, redact entities, and then call Bedrock. This approach also does not protect FM output. Amazon Bedrock Guardrails provides built-in PII handling for both input and output without additional service integration.",
                "references":
                [
                    {
                        "title": "Detect and filter harmful content by using Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A travel company operates an Amazon Bedrock agent that helps customers book flights. The agent uses an action group with functions defined through function details. The company's booking API is hosted externally and requires complex authentication logic that varies by airline partner.\n\nThe company wants to handle the API calls and authentication in its own application rather than in an AWS Lambda function managed by the agent. The application must receive the function name and parameters that the agent determines, execute the booking, and return the result to the agent.\n\nWhich configuration will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Configure the action group to use return of control. Have the application process the InvokeAgent response, execute the booking API call, and return the result using the sessionState in the next InvokeAgent request.",
                "explanation": "Return of control configures the agent to return the predicted function and parameters to the calling application instead of invoking a Lambda function. The application receives the function details in the InvokeAgent response, executes the external API call with its own authentication logic, and sends the result back to the agent in the next invocation. This keeps all API and authentication logic in the application.",
                "references":
                [
                    {
                        "title": "Return control to the agent developer by sending elicited information in an InvokeAgent response",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-returncontrol.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Create a Lambda function that forwards the request to the company's application via an Amazon API Gateway endpoint.",
                "explanation": "This approach adds unnecessary infrastructure (Lambda plus API Gateway) as a proxy layer. The company would still need to manage the Lambda function and API Gateway configuration. Return of control directly sends the function details to the calling application, eliminating the proxy layer.",
                "references":
                [
                    {
                        "title": "Configure Lambda functions to send information that an Amazon Bedrock agent elicits from the user",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-lambda.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Define the action group using an OpenAPI schema and point the Lambda invocation to a Lambda function that makes the external API call.",
                "explanation": "A Lambda-backed action group requires the authentication logic to be implemented in the Lambda function. The company wants to handle API calls and authentication in its own application, not in a managed Lambda function.",
                "references":
                [
                    {
                        "title": "Use action groups to define actions for your agent to perform",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-action-create.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Store the airline partner API keys in the agent's session attributes and pass them to a Lambda function at runtime.",
                "explanation": "Storing API keys in session attributes exposes them through the agent's session and is not a secure credential management approach. This also still requires a Lambda function, whereas the company wants to handle the logic in its own application.",
                "references":
                [
                    {
                        "title": "Control agent session context",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-session-state.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A machine learning team is building an MLOps pipeline for a text classification model. The team uses Amazon SageMaker Pipelines for orchestration and wants to implement the following:\n\n- Version control for trained model artifacts with metadata about training datasets and performance metrics.\n- An approval workflow where a model must be manually approved before it can be deployed to a production endpoint.\n- The ability to roll back to a previous model version if the newly deployed model performs poorly.\n\nWhich AWS service provides these capabilities as part of the SageMaker MLOps workflow?",
        "options":
        [
            {
                "id": "A",
                "text": "Amazon SageMaker Model Registry",
                "explanation": "SageMaker Model Registry is a central repository for cataloging ML models. It tracks model versions along with metadata including training datasets, performance metrics, and inference container images. Each model version has an approval status (PendingManualApproval, Approved, Rejected) that gates deployment. You can deploy any registered version to an endpoint, enabling rollbacks by deploying a previous approved version.",
                "references":
                [
                    {
                        "title": "Automation pipelines",
                        "url": "https://docs.aws.amazon.com/whitepapers/latest/build-secure-enterprise-ml-platform/automation-pipelines.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Amazon SageMaker Experiments",
                "explanation": "SageMaker Experiments (MLflow in SageMaker) tracks experiments, hyperparameters, and metrics during model development. It is designed for experiment tracking and comparison, not for production model versioning with approval workflows or deployment management.",
                "references":
                [
                    {
                        "title": "MLREL05-BP02 Create a recoverable endpoint with a managed version control strategy",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlrel05-bp02.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Amazon ECR (Elastic Container Registry)",
                "explanation": "ECR stores and versions Docker container images used for model serving. ECR does not track model artifacts, training metadata, performance metrics, or provide approval workflows for model deployment.",
                "references":
                [
                    {
                        "title": "MLREL05-BP02 Create a recoverable endpoint with a managed version control strategy",
                        "url": "https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/mlrel05-bp02.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "AWS CodePipeline",
                "explanation": "CodePipeline orchestrates CI/CD workflows and can include manual approval stages. However, CodePipeline does not natively catalog model versions with ML-specific metadata or provide the model-centric versioning and rollback capabilities that the team requires.",
                "references":
                [
                    {
                        "title": "Automation pipelines",
                        "url": "https://docs.aws.amazon.com/whitepapers/latest/build-secure-enterprise-ml-platform/automation-pipelines.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A pharmaceutical company uses Amazon Bedrock to generate summaries of clinical trial reports. The company has noticed that the model occasionally generates statements that are not supported by the source documents provided in the prompt.\n\nThe company wants to automatically detect when a generated response contains statements that are not grounded in the provided source material. The company does not want to build a custom verification system.\n\nWhich Amazon Bedrock feature will meet this requirement?",
        "options":
        [
            {
                "id": "A",
                "text": "Configure a contextual grounding check in an Amazon Bedrock guardrail. Provide the source documents as the grounding source and set a grounding threshold.",
                "explanation": "Contextual grounding checks in Amazon Bedrock Guardrails evaluate whether model responses are grounded in a reference source. The check produces a grounding score that indicates how well the response is supported by the provided reference material. When the score falls below the configured threshold, the guardrail flags or blocks the response. This is a managed feature that requires no custom verification system.",
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
                "text": "Enable model invocation logging and review logs weekly for hallucinated content.",
                "explanation": "Model invocation logging captures request and response data for auditing. Manual weekly log review does not automatically detect ungrounded statements at runtime and does not prevent ungrounded responses from reaching users.",
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
                "text": "Use Automated Reasoning checks in an Amazon Bedrock guardrail to verify the response against the source documents.",
                "explanation": "Automated Reasoning checks translate a document into formal logical rules and verify whether a response is logically consistent with those rules. Automated Reasoning is designed for rule-based validation with numeric thresholds and conditions, not for detecting whether free-text summaries are grounded in source passages. Contextual grounding checks are the appropriate feature for hallucination detection.",
                "references":
                [
                    {
                        "title": "Automated Reasoning checks in Amazon Bedrock Guardrails",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-automated-reasoning-checks.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Lower the temperature parameter to 0 to eliminate hallucinations.",
                "explanation": "Setting temperature to 0 makes the model's output more deterministic by selecting the highest probability token at each step. This reduces randomness but does not eliminate hallucinations, because the model can still generate plausible-sounding but unsupported statements even with greedy decoding.",
                "references":
                [
                    {
                        "title": "Influence response generation with inference parameters",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A software company manages a multi-tenant SaaS platform. Each tenant has its own Amazon Bedrock knowledge base containing proprietary product documentation. The platform uses a shared application layer that calls the Amazon Bedrock RetrieveAndGenerate API.\n\nA security audit found that a bug in the tenant routing logic could cause a request to query the wrong tenant's knowledge base. The company wants to add a defense-in-depth control that prevents the shared application from accessing a knowledge base that does not belong to the requesting tenant, even if the application code has a bug.\n\nWhich approach will meet this requirement?",
        "options":
        [
            {
                "id": "A",
                "text": "Add input validation in the application code to verify that the knowledge base ID matches the tenant before each API call.",
                "explanation": "Input validation in the application layer is the control that already failed. A defense-in-depth approach adds a control at a different layer so that a single code bug cannot lead to cross-tenant access.",
                "references":
                [
                    {
                        "title": "Security best practices in IAM",
                        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use separate IAM roles per tenant with resource-based policies that scope each role's access to only that tenant's knowledge base ARN. Have the application assume the tenant-specific role before calling the API.",
                "explanation": "Using tenant-specific IAM roles with policies scoped to individual knowledge base ARNs creates a control at the IAM layer. Even if application code routes to the wrong knowledge base ID, the IAM role's policy denies access to any knowledge base that does not belong to the tenant. This is a defense-in-depth control independent of the application logic.",
                "references":
                [
                    {
                        "title": "Security best practices in IAM",
                        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Encrypt each knowledge base with a different AWS KMS key per tenant.",
                "explanation": "Per-tenant KMS keys provide data-at-rest isolation. However, if the application role has decrypt permissions on all tenant keys, a routing bug could still allow access to the wrong knowledge base. KMS encryption alone does not prevent the API call from succeeding.",
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
                "text": "Enable AWS CloudTrail logging for all Bedrock API calls and alert on cross-tenant access patterns.",
                "explanation": "CloudTrail logging and alerting detect cross-tenant access after it has occurred. This is a detective control, not a preventive control. The company wants to prevent unauthorized access, not just detect it.",
                "references":
                [
                    {
                        "title": "How CloudTrail works",
                        "url": "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/how-cloudtrail-works.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A company runs a document understanding application that processes thousands of long PDF contracts daily using an FM on Amazon Bedrock. Each contract is 50-100 pages. The company uses the InvokeModel API synchronously for each contract.\n\nThe processing does not need to be real-time. Results are collected at the end of each business day and fed into a reporting system. The company wants to significantly reduce the inference cost.\n\nWhich solution will meet this requirement?",
        "options":
        [
            {
                "id": "A",
                "text": "Switch from InvokeModel to the Converse API for each contract.",
                "explanation": "The Converse API provides a unified interface across models but does not change the per-token pricing. Both InvokeModel and Converse use the same on-demand pricing. This switch does not reduce inference costs.",
                "references":
                [
                    {
                        "title": "Carry out a conversation with the Converse API operations",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Submit the contracts as Amazon Bedrock batch inference jobs.",
                "explanation": "Amazon Bedrock batch inference processes large volumes of prompts asynchronously at a lower cost than on-demand inference. Because the company does not need real-time results and collects outputs at the end of each day, batch inference is appropriate. Batch pricing offers a significant discount compared to on-demand per-token pricing.",
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
                "text": "Enable prompt caching for the contract content in each request.",
                "explanation": "Prompt caching reduces cost when the same prompt prefix is reused across multiple requests. Each contract is a unique document, so there is no common prefix to cache. Prompt caching would provide minimal benefit in this scenario.",
                "references":
                [
                    {
                        "title": "Prompt caching for faster model inference",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Use a cross-Region inference profile to distribute the workload across Regions.",
                "explanation": "Cross-Region inference distributes requests for higher throughput availability. It does not reduce per-token pricing. The company's primary concern is cost, not throughput or availability.",
                "references":
                [
                    {
                        "title": "Increase throughput with cross-Region inference",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A company is designing a generative AI application that generates marketing copy for products. The application uses Amazon Bedrock Prompt Management to store and version prompt templates. The marketing team frequently iterates on prompt templates and needs to test new versions without affecting production traffic.\n\nThe company wants to deploy a new prompt version to production only after it has been validated, and needs the ability to quickly revert to the previous version if the new version underperforms.\n\nWhich approach will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Create a new prompt version in Prompt Management. Create an alias that points to the validated version. Update the alias to point to the new version when ready. Revert by pointing the alias back to the previous version.",
                "explanation": "Amazon Bedrock Prompt Management supports prompt versions and aliases. The application references the alias rather than a specific version. When a new prompt version is validated, updating the alias switches production traffic to the new version without code changes. If the new version underperforms, reverting the alias to the previous version provides an immediate rollback.",
                "references":
                [
                    {
                        "title": "Streamline generative AI development in Amazon Bedrock with Prompt Management and Prompt Flows",
                        "url": "https://aws.amazon.com/blogs/machine-learning/streamline-generative-ai-development-in-amazon-bedrock-with-prompt-management-and-prompt-flows-preview/"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Store prompt templates as files in an Amazon S3 bucket with versioning enabled. Have the application read the latest file version at runtime.",
                "explanation": "S3 versioning provides object-level version history. However, this requires custom code to manage which version the application uses, and there is no managed alias or routing mechanism. Reverting requires application changes to specify the previous S3 version ID.",
                "references":
                [
                    {
                        "title": "Streamline generative AI development in Amazon Bedrock with Prompt Management and Prompt Flows",
                        "url": "https://aws.amazon.com/blogs/machine-learning/streamline-generative-ai-development-in-amazon-bedrock-with-prompt-management-and-prompt-flows-preview/"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Hardcode the prompt template in the application source code and deploy a new application version for each template change.",
                "explanation": "Hardcoding prompts in source code requires a full application deployment for every prompt change. This is slow, mixes concerns between prompt engineering and application code, and makes rollback dependent on redeploying the previous application version.",
                "references":
                [
                    {
                        "title": "Streamline generative AI development in Amazon Bedrock with Prompt Management and Prompt Flows",
                        "url": "https://aws.amazon.com/blogs/machine-learning/streamline-generative-ai-development-in-amazon-bedrock-with-prompt-management-and-prompt-flows-preview/"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Create a separate Amazon Bedrock Flows flow for each prompt version and switch the application to call the new flow.",
                "explanation": "Creating a new flow for each prompt version is excessive. Flows orchestrate multi-step workflows with multiple nodes. The requirement is to manage prompt template versions, which is the purpose of Prompt Management's versioning and alias features, not separate flow definitions.",
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
        "question": "A company has deployed an Amazon Bedrock agent that assists field engineers with equipment troubleshooting. The agent uses a knowledge base containing equipment manuals and an action group that can create support tickets.\n\nField engineers report that the agent sometimes produces unexpected responses. The development team needs to understand the agent's step-by-step reasoning process, including which knowledge base chunks were retrieved, which action group functions were considered, and how the agent decided on its final response.\n\nWhich Amazon Bedrock feature provides this visibility?",
        "options":
        [
            {
                "id": "A",
                "text": "Enable model invocation logging to capture all requests and responses to Amazon CloudWatch Logs.",
                "explanation": "Model invocation logging captures the raw request and response payloads for auditing purposes. It does not expose the agent's internal reasoning steps, knowledge base retrieval details, or action group decision process.",
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
                "text": "Enable trace in the InvokeAgent request by setting enableTrace to true.",
                "explanation": "Trace enablement in Amazon Bedrock Agents exposes the agent's step-by-step reasoning process. The trace includes details about the preprocessing step, the orchestration step (including which functions were considered and the rationale), knowledge base retrieval results (including retrieved chunks and scores), and the post-processing step. This gives the development team full visibility into how the agent arrived at its response.",
                "references":
                [
                    {
                        "title": "Track agent's step-by-step reasoning process using trace",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/trace-events.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Create a CloudWatch dashboard with Amazon Bedrock runtime metrics for the agent.",
                "explanation": "CloudWatch metrics provide aggregate operational metrics such as invocation count, latency, and throttling. Metrics do not show the reasoning process for individual agent invocations or the content of retrieved knowledge base chunks.",
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
                "text": "Run a model evaluation job on the agent's FM to assess reasoning quality.",
                "explanation": "Model evaluation jobs assess model quality on a prompt dataset. They do not provide real-time visibility into an agent's orchestration steps, knowledge base retrieval, or action group decisions for individual conversations.",
                "references":
                [
                    {
                        "title": "Evaluate the performance of Amazon Bedrock resources",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    },
    {
        "question": "A company has an existing application that processes customer requests using a complex decision tree implemented in its backend services. The company wants to build an Amazon Bedrock agent that can handle natural language customer queries and invoke the appropriate backend services.\n\nThe backend services expose REST APIs with OpenAPI specifications. The company wants the agent to understand the full API surface, including endpoint paths, HTTP methods, request parameters, and response schemas.\n\nWhich method of defining the agent's action group will BEST leverage the existing API documentation?",
        "options":
        [
            {
                "id": "A",
                "text": "Define the action group using an OpenAPI schema that maps to the existing REST API specifications.",
                "explanation": "Amazon Bedrock Agents supports defining action groups using OpenAPI schemas. The company can reuse or adapt its existing OpenAPI specifications to define the agent's available actions. The OpenAPI schema describes endpoint paths, HTTP methods, parameters, and response schemas, giving the agent full understanding of the API surface. This approach directly leverages the existing documentation.",
                "references":
                [
                    {
                        "title": "Use action groups to define actions for your agent to perform",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-action-create.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Define the action group using function details with a separate function for each API endpoint.",
                "explanation": "Function details define individual functions with names, descriptions, and parameters. While this works, it requires manually translating each API endpoint into a function definition. The company already has OpenAPI specifications, so using them directly is more efficient and maintains consistency with the existing documentation.",
                "references":
                [
                    {
                        "title": "Use action groups to define actions for your agent to perform",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-action-create.html"
                    }
                ]
            },
            {
                "id": "C",
                "text": "Include descriptions of all API endpoints in the agent's system prompt instructions.",
                "explanation": "Including API descriptions in the system prompt consumes context window tokens and does not provide a structured way for the agent to invoke the APIs. The agent would not be able to actually call the endpoints based on prompt instructions alone.",
                "references":
                [
                    {
                        "title": "Enhance agent's accuracy using advanced prompt templates in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/advanced-prompts.html"
                    }
                ]
            },
            {
                "id": "D",
                "text": "Create a knowledge base containing the API documentation and let the agent retrieve API details at runtime.",
                "explanation": "A knowledge base can store API documentation, but retrieved text chunks do not give the agent the ability to invoke APIs. Action groups with structured definitions (OpenAPI or function details) are required for the agent to actually call external services.",
                "references":
                [
                    {
                        "title": "Retrieve data and generate AI responses with Amazon Bedrock Knowledge Bases",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
                    }
                ]
            }
        ],
        "correct_answer": "A"
    },
    {
        "question": "A company wants to deploy a generative AI application that generates reports from structured data. The application will experience unpredictable traffic spikes during quarterly earnings periods, with request volumes increasing 10x for a few days before returning to normal levels.\n\nDuring peak periods, the company needs high throughput to avoid request failures. Outside of peak periods, cost efficiency is the priority. The company does not want to pay for reserved capacity that sits idle during normal periods.\n\nWhich inference strategy will meet these requirements?",
        "options":
        [
            {
                "id": "A",
                "text": "Purchase Provisioned Throughput with a commitment term sized for peak demand.",
                "explanation": "Provisioned Throughput with a commitment term guarantees capacity but requires paying for the full allocation continuously. Sizing for peak demand means paying for 10x capacity during the majority of the time when traffic is at normal levels. This is not cost-efficient for spiky workloads.",
                "references":
                [
                    {
                        "title": "Increase model invocation capacity with Provisioned Throughput in Amazon Bedrock",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html"
                    }
                ]
            },
            {
                "id": "B",
                "text": "Use on-demand inference with a cross-Region inference profile to distribute peak traffic across Regions.",
                "explanation": "On-demand inference with cross-Region inference profiles provides pay-per-use pricing during normal periods and distributes peak traffic across multiple Regions for higher aggregate throughput. The company pays only for tokens consumed, and cross-Region routing helps absorb traffic spikes without pre-provisioned capacity. This balances cost efficiency during normal periods with throughput availability during peaks.",
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
                "text": "Use Amazon Bedrock batch inference exclusively and queue all requests for asynchronous processing.",
                "explanation": "Batch inference is designed for large-scale offline processing. Report generation during earnings periods likely needs timely results, not deferred batch processing. Batch inference also does not guarantee specific completion times during high-demand periods.",
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
                "text": "Deploy the model on Amazon SageMaker with auto-scaling configured for the endpoint.",
                "explanation": "SageMaker endpoints with auto-scaling can handle traffic spikes. However, the company would need to manage instance types, scaling policies, container images, and endpoint configuration. This adds significant operational overhead compared to using managed Amazon Bedrock inference.",
                "references":
                [
                    {
                        "title": "Making inference requests",
                        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference.html"
                    }
                ]
            }
        ],
        "correct_answer": "B"
    }
];
