import { RawQuestion } from '../../types';

export const SET_002_QUESTIONS: RawQuestion[] = [
{
    "question": "A European bank runs a GenAI application on Amazon Bedrock in the eu-central-1 Region. During peak periods, the application receives throttling errors. Regulatory requirements mandate that all inference data must remain within the European Union. The company wants to increase throughput resilience without violating data residency requirements and without purchasing provisioned throughput.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Use a cross-Region inference profile that is scoped to the EU geography so that requests are distributed only across AWS Regions within the European Union.",
        "explanation": "Cross-Region inference profiles are scoped to geographies. An EU-scoped inference profile routes inference traffic only across Regions within the European Union, which increases available throughput and resilience during peak demand while keeping inference data within the required geography. This solution is a built-in Amazon Bedrock capability with no capacity commitment.",
        "references": [
          {
            "title": "Increase throughput with cross-Region inference",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Use a global cross-Region inference profile to maximize the number of Regions available for routing requests.",
        "explanation": "A globally scoped inference profile can route requests to Regions outside the European Union. This would violate the data residency requirement even though it would increase throughput. Geography matters here, and the broadest routing scope is the wrong choice for this compliance constraint.",
        "references": [
          {
            "title": "Increase throughput with cross-Region inference",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Deploy an AWS Lambda function that retries throttled requests against Amazon Bedrock in the us-east-1 Region as a fallback.",
        "explanation": "Failing over to us-east-1 sends inference data to a Region outside the European Union, which directly violates the data residency requirement. This solution also introduces custom failover code that the company must maintain.",
        "references": [
          {
            "title": "Data protection in Amazon Bedrock",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Enable Amazon Bedrock batch inference for all application requests to avoid on-demand throttling limits.",
        "explanation": "Batch inference is designed for large offline workloads that tolerate delayed processing. The application in this scenario serves live traffic, and converting interactive requests to batch jobs would introduce unacceptable latency. Batch inference addresses a different workload pattern than peak-period throttling for a live application.",
        "references": [
          {
            "title": "Process multiple prompts with batch inference",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  },
{
    "question": "A pharmaceutical company ingests research PDFs into an Amazon Bedrock knowledge base. The PDFs contain dense data tables and multi-column layouts. With the default parser, users report that answers derived from tables are frequently wrong because table rows and columns are jumbled in the retrieved chunks. The company must improve how tabular content is extracted during ingestion.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Reduce the chunk size in the chunking configuration so that each table fits within a single chunk.",
        "explanation": "The problem occurs during parsing, before chunking. The default parser extracts the text without preserving table structure, so rows and columns are already jumbled when chunking begins. Smaller chunks would fragment the malformed text further and would not restore the tabular relationships.",
        "references": [
          {
            "title": "How content chunking and parsing works for knowledge bases",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking-parsing.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Configure the knowledge base to use an advanced parsing option, such as a foundation model parser, to extract tables and complex layouts with their structure preserved during ingestion.",
        "explanation": "Amazon Bedrock Knowledge Bases supports advanced parsing options beyond the default parser, including foundation-model-based parsing that can interpret complex document elements such as tables and multi-column layouts. Parsing tables with their structure preserved means the resulting chunks retain row and column relationships, which directly fixes the incorrect answers derived from tabular data.",
        "references": [
          {
            "title": "Parsing options for your data source",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking-parsing.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Switch the knowledge base to semantic chunking so that related table content is grouped by meaning.",
        "explanation": "Semantic chunking groups sentences by topical similarity after parsing has already produced text. Semantic chunking operates on the parser's output, so it cannot repair table structure that the default parser failed to preserve. This changes the wrong stage of the ingestion pipeline.",
        "references": [
          {
            "title": "How content chunking and parsing works for knowledge bases",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking-parsing.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Increase the number of retrieved results in the retrieval configuration so the model receives more chunks that contain table fragments.",
        "explanation": "Retrieving more chunks increases the volume of context, but every chunk still contains jumbled table content from the default parser. Feeding the model more malformed fragments does not restore row and column relationships and can add noise that further degrades answer quality.",
        "references": [
          {
            "title": "Query configurations for knowledge bases",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
          }
        ]
      }
    ],
    "correct_answer": "B"
  },
{
    "question": "A company is starting a GenAI project to summarize legal contracts. The team must select an FM from Amazon Bedrock. The team has shortlisted four candidate models and has assembled a dataset of representative contracts with reference summaries written by the legal team. The team must compare the candidate models on summarization quality for this specific dataset in a repeatable way before committing to one model.\n\nWhich approach will meet these requirements with the LEAST custom development?",
    "options": [
      {
        "id": "A",
        "text": "Select the candidate model with the largest parameter count and the highest scores on public benchmark leaderboards.",
        "explanation": "Public benchmarks measure general capabilities on generic datasets. Benchmark rankings frequently do not predict performance on a specific domain task such as legal contract summarization. Parameter count also does not guarantee task quality and drives up cost. This approach skips the required evaluation on the company's own data.",
        "references": [
          {
            "title": "Amazon Bedrock model evaluation",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Run Amazon Bedrock model evaluation jobs against each candidate model by using the company's contract dataset with reference summaries. Compare the models on summarization quality metrics.",
        "explanation": "Amazon Bedrock model evaluation runs evaluation jobs against models by using built-in or custom datasets and produces metrics for tasks that include summarization. Using the company's own dataset with reference summaries gives a repeatable, task-specific comparison across all four candidates without building an evaluation harness. This is the managed capability designed for exactly this model selection workflow.",
        "references": [
          {
            "title": "Amazon Bedrock model evaluation",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Fine-tune each of the four candidate models on the contract dataset. Select the model that achieves the lowest training loss.",
        "explanation": "Fine-tuning all four candidates is expensive and unnecessary before base model selection, and training loss measures how well a model fit the training data, not summarization quality on held-out contracts. Customization decisions come after a base model is selected, not as the selection mechanism.",
        "references": [
          {
            "title": "Custom models in Amazon Bedrock",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Build a custom evaluation pipeline with AWS Lambda functions that invoke each model, compute similarity scores against the reference summaries, and write the results to Amazon DynamoDB.",
        "explanation": "A custom pipeline can produce a comparison, but the team would need to design metrics, build invocation and scoring code, and maintain the pipeline. Amazon Bedrock model evaluation provides this workflow as a managed feature, so building it from scratch does not minimize custom development.",
        "references": [
          {
            "title": "Amazon Bedrock model evaluation",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
          }
        ]
      }
    ],
    "correct_answer": "B"
  },
{
    "question": "A company processes inbound customer emails with a GenAI workflow that has three steps. First, an FM classifies the email as a complaint, a question, or feedback. Second, based on the classification, the workflow routes the email to one of two different prompts: complaints receive an empathetic escalation draft, and questions receive an answer generated from a knowledge base. Third, the output is formatted and returned. The team wants to build and modify this multi-step workflow visually, with deterministic routing between steps and MINIMAL custom orchestration code.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Create an Amazon Bedrock flow with prompt nodes, a condition node for routing based on the classification output, and a knowledge base node. Build and update the workflow in the visual builder.",
        "explanation": "Amazon Bedrock Flows provides a visual builder for linking prompts, knowledge bases, conditions, and other nodes into a deterministic, multi-step GenAI workflow. A condition node routes the email to the correct downstream prompt based on the classification result, and a knowledge base node handles the question path. The team can modify the workflow visually without writing orchestration code, which matches every requirement.",
        "references": [
          {
            "title": "Build an end-to-end generative AI workflow with Amazon Bedrock Flows",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Create an Amazon Bedrock agent with instructions that describe the classification rules and the response style for each email type. Let the agent orchestrate the steps.",
        "explanation": "An agent uses FM-driven reasoning to decide its steps dynamically, which introduces nondeterminism into a workflow that has fixed, predefined routing. The scenario calls for deterministic routing and visual editing of a known pipeline, which is the design point of Flows rather than agents. Agents fit problems where the steps are not known in advance.",
        "references": [
          {
            "title": "Automate tasks in your application using AI agents",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Build an AWS Step Functions state machine with a Choice state for routing and Task states that invoke Amazon Bedrock APIs for each step.",
        "explanation": "Step Functions can orchestrate this workflow deterministically. However, the team would write and maintain state machine definitions, integrate each Bedrock call, and handle prompt management and knowledge base retrieval in task code. Amazon Bedrock Flows provides the same deterministic orchestration with native prompt and knowledge base nodes and a visual builder, so Step Functions is more custom work than the requirement demands.",
        "references": [
          {
            "title": "AWS Step Functions",
            "url": "https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Write an AWS Lambda function that performs the classification call, applies if-else routing logic, calls the appropriate prompt, and formats the output.",
        "explanation": "A single Lambda function can implement the workflow, but all orchestration, routing, prompt handling, and knowledge base integration become custom code that the team must maintain and redeploy for every workflow change. This is the maximum-code option, and it provides no visual editing capability.",
        "references": [
          {
            "title": "AWS Lambda",
            "url": "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  },
{
    "question": "A company has dozens of existing internal REST APIs and AWS Lambda functions for inventory, orders, and shipping. The company is building AI agents on Amazon Bedrock AgentCore and wants the agents to use these existing capabilities as tools through the Model Context Protocol (MCP). The company does not want to rewrite the APIs or build and host its own MCP servers.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Use Amazon Bedrock AgentCore Gateway to convert the existing APIs and Lambda functions into MCP-compatible tools that agents can discover and invoke.",
        "explanation": "AgentCore Gateway transforms existing resources, such as REST APIs defined by OpenAPI specifications and Lambda functions, into MCP-compatible tools without requiring the company to rewrite the services or build and host MCP server infrastructure. Agents can then discover and invoke the tools through the gateway, which is exactly the requirement in this scenario.",
        "references": [
          {
            "title": "Amazon Bedrock AgentCore Gateway",
            "url": "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Develop a custom MCP server for each API by using the open source MCP SDK. Deploy the servers on Amazon ECS with AWS Fargate.",
        "explanation": "Custom MCP servers would work functionally, but the company would build, containerize, deploy, secure, and operate dozens of servers. This directly violates the requirement to avoid building and hosting MCP servers, and it creates ongoing maintenance for every API change.",
        "references": [
          {
            "title": "Amazon Bedrock AgentCore Gateway",
            "url": "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Rewrite the internal REST APIs as Amazon Bedrock knowledge bases so the agents can retrieve inventory, order, and shipping information.",
        "explanation": "Knowledge bases provide retrieval over indexed documents. Inventory, orders, and shipping are live transactional systems that require API calls and actions, not document retrieval. Indexed snapshots would be immediately stale, and a knowledge base cannot perform actions such as creating a shipment.",
        "references": [
          {
            "title": "Amazon Bedrock Knowledge Bases",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Embed the API documentation in each agent's system prompt so the agent can construct HTTP requests to the internal APIs directly.",
        "explanation": "Agents cannot make arbitrary HTTP calls simply because API documentation appears in the prompt. Tools must be exposed through a supported invocation mechanism. This approach also bloats every prompt with documentation tokens and provides no authentication, schema validation, or reliable invocation path.",
        "references": [
          {
            "title": "Amazon Bedrock AgentCore",
            "url": "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  },
{
    "question": "A developer is building a chat application on Amazon Bedrock. When users ask about current order status, the model must call the company's order lookup function and incorporate the result into its response. The application uses a single FM through the Converse API. The developer wants the model to decide when to call the function, without creating an Amazon Bedrock agent or adding orchestration services.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Define the order lookup function as a tool in the toolConfig field of the Converse API request. When the response stop reason indicates tool use, run the function and return the result to the model in a follow-up message.",
        "explanation": "The Converse API supports tool use. The developer defines the tool's name, description, and input schema in toolConfig. When the model decides the tool is needed, the response returns a tool use request with extracted parameters and a corresponding stop reason. The application runs the function locally and sends the result back in a follow-up message so the model can generate the final answer. This achieves model-driven function calling with no agent and no additional services.",
        "references": [
          {
            "title": "Use a tool to complete an Amazon Bedrock model response",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/tool-use.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Create an Amazon Bedrock knowledge base from a nightly export of the orders database. Attach the knowledge base to the Converse API requests.",
        "explanation": "A nightly export would be up to 24 hours stale, which is unacceptable for current order status. Knowledge bases suit relatively static reference content, not live transactional lookups. The requirement is a function call against live data, not document retrieval.",
        "references": [
          {
            "title": "Amazon Bedrock Knowledge Bases",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Add a keyword detector in the application that checks user messages for the phrase \"order status\" and calls the lookup function before invoking the model.",
        "explanation": "Keyword matching is brittle. Users phrase order inquiries in many ways, and the detector would both miss valid requests and trigger falsely. The requirement states that the model should decide when to call the function, which is what tool use provides. Keyword routing also cannot extract structured parameters such as an order number reliably.",
        "references": [
          {
            "title": "Use a tool to complete an Amazon Bedrock model response",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/tool-use.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Fine-tune the FM on historical order status conversations so the model learns to answer order status questions directly.",
        "explanation": "Fine-tuning cannot give a model access to live order data. The model would generate plausible but fabricated order statuses based on training patterns, which is worse than no answer for this use case. Live data requires a retrieval or tool invocation mechanism at inference time.",
        "references": [
          {
            "title": "Custom models in Amazon Bedrock",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  },
{
    "question": "A company's AI governance board has approved two specific FMs in Amazon Bedrock for production use. Developers in the production AWS account must be prevented from invoking any other model, including new models that AWS adds to the account's model access over time. The control must apply to both the InvokeModel and Converse APIs.\n\nWhich solution will enforce this restriction?",
    "options": [
      {
        "id": "A",
        "text": "Attach IAM policies to the developers' roles that allow the bedrock:InvokeModel, bedrock:InvokeModelWithResponseStream, bedrock:Converse, and bedrock:ConverseStream actions only on the ARNs of the two approved models.",
        "explanation": "IAM authorizes Amazon Bedrock invocation actions at the level of the foundation model resource ARN. Allowing the invocation actions only on the two approved model ARNs means any request to another model is implicitly denied, including models added to the account later, because IAM denies anything not explicitly allowed. This is a deterministic, centrally managed control that covers both API families.",
        "references": [
          {
            "title": "Identity-based policy examples for Amazon Bedrock",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/security_iam_id-based-policy-examples.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Create an Amazon Bedrock guardrail that blocks requests that mention unapproved model names. Apply the guardrail to all invocations.",
        "explanation": "Guardrails evaluate the content of prompts and responses, not which model a request targets. The model is selected in the API call itself, outside the content that a guardrail inspects. Guardrails are a content safety control, not an authorization mechanism, so they cannot enforce model access restrictions.",
        "references": [
          {
            "title": "Amazon Bedrock Guardrails",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Instruct developers to use only the two approved model IDs. Monitor AWS CloudTrail for invocations of other models and follow up on violations.",
        "explanation": "This is a detective control that relies on voluntary compliance and after-the-fact review. Unapproved invocations would succeed before anyone notices. The requirement is prevention, which needs an authorization control that blocks the request, not monitoring that reports it later.",
        "references": [
          {
            "title": "Logging Amazon Bedrock API calls using AWS CloudTrail",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Tag the two approved models with an approved tag. Write an IAM policy that allows invocation only on models that have the tag.",
        "explanation": "Foundation models in Amazon Bedrock are AWS-managed resources, and customers cannot apply their own tags to base FMs to drive authorization decisions this way. Scoping the allow statement directly to the approved model ARNs is the supported mechanism for this restriction.",
        "references": [
          {
            "title": "Identity-based policy examples for Amazon Bedrock",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/security_iam_id-based-policy-examples.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  },
{
    "question": "A company applies an Amazon Bedrock guardrail to its production chatbot. The safety team wants to tighten the content filter thresholds and add a new denied topic. The team must test the modified configuration against a suite of test prompts before the changes affect production traffic, and the team must be able to roll production back to the previous configuration quickly if the new configuration blocks too many legitimate queries.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Modify the guardrail's working draft and test it with the test prompt suite. When testing passes, create a new guardrail version and update the application to reference the new version number. Roll back by pointing the application to the previous version number if needed.",
        "explanation": "Amazon Bedrock guardrails have a working draft and immutable numbered versions. The team can edit and test the working draft without affecting production, because production references a specific version. Creating a new version snapshots the tested configuration, and the application switches between version numbers for promotion or rollback. This gives safe testing, controlled deployment, and instant rollback.",
        "references": [
          {
            "title": "Deploy your Amazon Bedrock guardrail",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-deploy.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Update the guardrail configuration that production currently uses. Monitor Amazon CloudWatch InvocationsIntervened metrics and revert the changes if the intervention rate increases.",
        "explanation": "Editing the configuration that production traffic uses exposes real users to untested changes, which violates the requirement to test before production impact. Reverting by manually re-editing the configuration is slow and error-prone compared to switching a version reference, and the original settings could be misremembered.",
        "references": [
          {
            "title": "CloudWatch metrics to monitor Amazon Bedrock guardrails",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-guardrails-cw-metrics.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Create a second, independent guardrail with the new configuration. Manually keep the two guardrails synchronized and swap the guardrail identifier in the application during a maintenance window.",
        "explanation": "A parallel guardrail can be tested safely, but maintaining two independent guardrails invites configuration drift, and swapping identifiers duplicates what versioning already provides natively within a single guardrail. This approach adds ongoing synchronization burden without any benefit over versions.",
        "references": [
          {
            "title": "Deploy your Amazon Bedrock guardrail",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-deploy.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Run an Amazon Bedrock model evaluation job with the test prompts to validate the new thresholds. Apply the changes directly to production after the evaluation report is generated.",
        "explanation": "Model evaluation assesses model output quality against datasets. It is not the mechanism for testing a guardrail configuration's intervention behavior, and this option still applies untested changes directly to the production configuration with no fast rollback path.",
        "references": [
          {
            "title": "Amazon Bedrock model evaluation",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  },
{
    "question": "A SaaS company operates an AI writing assistant on Amazon Bedrock. Analysis shows that about 70 percent of user requests are simple tasks, such as grammar fixes, that a smaller, cheaper model in the same model family handles with quality equal to the large model. The remaining 30 percent are complex tasks that require the large model. The company wants to reduce inference costs by matching each request to an appropriately capable model, and the company wants to keep a single endpoint in the application code with no custom classification logic.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Use Amazon Bedrock intelligent prompt routing to route each request between the smaller model and the larger model in the same model family based on predicted response quality.",
        "explanation": "Intelligent prompt routing exposes a single router endpoint and dynamically routes each prompt to the model that is predicted to deliver the required quality at the lowest cost, between models in the same family. Simple requests flow to the cheaper model and complex requests to the larger model, with no classification logic in the application. This matches every requirement: cost reduction, quality preservation, one endpoint, no custom code.",
        "references": [
          {
            "title": "Intelligent prompt routing",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Build an AWS Lambda classifier that calls a small model to label each request as simple or complex, then invokes the corresponding model endpoint.",
        "explanation": "A custom classifier can approximate routing, but it adds a classification inference call to every request, adds latency, and requires building, tuning, and maintaining the classifier and routing code. The requirement explicitly excludes custom classification logic, and intelligent prompt routing provides this capability as a managed feature.",
        "references": [
          {
            "title": "Intelligent prompt routing",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Switch all traffic to the smaller model and enable prompt caching to offset any quality loss on complex requests.",
        "explanation": "Routing all traffic to the smaller model degrades the 30 percent of complex requests that require the large model's capability. Prompt caching reduces cost and latency for repeated prompt prefixes but does nothing to improve a model's output quality. This option sacrifices the quality requirement.",
        "references": [
          {
            "title": "Prompt caching for faster model inference",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Purchase provisioned throughput for the large model to lower the effective per-request cost at the application's volume.",
        "explanation": "Provisioned throughput commits to dedicated capacity on the large model, which means the company keeps paying large-model rates for the 70 percent of requests that a cheaper model handles equally well. This option optimizes the price of the wrong architecture instead of matching model capability to request complexity.",
        "references": [
          {
            "title": "Provisioned throughput for Amazon Bedrock",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  },
{
    "question": "A GenAI developer operates a report generation feature that uses the Converse API on Amazon Bedrock. Users report that long reports frequently end abruptly in the middle of a sentence. The developer inspects an affected API response and needs to confirm the cause and fix the behavior.\n\nWhich combination of steps will identify and resolve the issue?\n\n(Select TWO)",
    "options": [
      {
        "id": "A",
        "text": "Check the stopReason field in the Converse API response to determine whether generation stopped because the max_tokens limit was reached.",
        "explanation": "The Converse API response includes a stopReason field that reports why generation ended, such as end_turn for natural completion or max_tokens when the output hit the configured token limit. A stopReason of max_tokens on the truncated responses confirms that the output limit, not the model, is cutting off the reports mid-sentence. Checking this field is the correct diagnostic step.",
        "references": [
          {
            "title": "Carry out a conversation with the Converse API operations",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Increase the maxTokens inference parameter to a value large enough to accommodate the expected length of a full report.",
        "explanation": "If stopReason confirms max_tokens, the fix is to raise the maxTokens parameter so the model can complete the full report before hitting the output limit. This directly resolves mid-sentence truncation caused by an output token cap that is set below the length of the desired response.",
        "references": [
          {
            "title": "Inference request parameters",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Remove all stop sequences from the request so the model is never interrupted during generation.",
        "explanation": "A stop sequence match is a plausible cause of early termination, but stop sequences end generation at an exact configured string, which would produce truncation at consistent phrases, not random mid-sentence cutoffs on long outputs. Blindly removing stop sequences without confirming the stop reason risks breaking output formatting that depends on them, and it does not address a max_tokens cause.",
        "references": [
          {
            "title": "Inference request parameters",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Lower the temperature parameter so the model produces more complete and coherent responses.",
        "explanation": "Temperature controls randomness in token sampling and influences creativity and variability. Temperature has no effect on when generation stops or on output length limits. This parameter cannot cause or fix mid-sentence truncation.",
        "references": [
          {
            "title": "Inference request parameters",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html"
          }
        ]
      },
      {
        "id": "E",
        "text": "Configure SDK retries with exponential backoff so truncated requests are automatically retried until a complete response is returned.",
        "explanation": "Retries address transient failures such as throttling. A response truncated by the max_tokens limit is a successful API call, so no retry occurs, and a retry with the same parameters would truncate at the same point. This step addresses the wrong failure mode.",
        "references": [
          {
            "title": "Retry behavior in the AWS SDKs",
            "url": "https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html"
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
    "question": "A company uses Amazon Bedrock Knowledge Bases for a RAG application that answers questions about technical maintenance manuals. The manuals contain deeply nested sections where a procedure often depends on context from its parent section. Users report that answers frequently lack the surrounding context needed to interpret retrieved procedures correctly. The company wants to improve response quality without building custom preprocessing pipelines.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Configure fixed-size chunking with a small chunk size of 300 tokens to increase the number of chunks that can be retrieved for each query.",
        "explanation": "Fixed-size chunking splits documents into chunks of an approximate token size regardless of document structure. A small chunk size increases the risk of separating a procedure from its surrounding context. This approach would likely make the reported problem worse because retrieved chunks would contain even less contextual information.",
        "references": [
          {
            "title": "How content chunking works for knowledge bases",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Configure hierarchical chunking so that the knowledge base organizes chunks into parent and child chunks and returns parent chunks that include broader context during retrieval.",
        "explanation": "Hierarchical chunking organizes content into parent chunks and smaller child chunks. During retrieval, the system searches against child chunks for precision but can return the associated parent chunk to provide broader context. This structure is well suited for documents with nested sections where surrounding context is needed to interpret retrieved content. This is a built-in Knowledge Bases capability and does not require custom preprocessing pipelines.",
        "references": [
          {
            "title": "How content chunking works for knowledge bases",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Configure the no chunking option so that each manual is treated as a single chunk during ingestion.",
        "explanation": "The no chunking option treats each document as a single unit. Full technical manuals are typically too large to be useful as a single retrieval unit and can exceed the effective context that the generation model can use. This approach reduces retrieval precision because entire manuals would be returned instead of relevant sections.",
        "references": [
          {
            "title": "How content chunking works for knowledge bases",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Build an AWS Lambda function that preprocesses the manuals into custom context-aware segments before ingestion into the knowledge base.",
        "explanation": "A custom Lambda preprocessing function could produce context-aware segments. However, this approach requires the company to build and maintain custom chunking logic, which contradicts the requirement to avoid custom preprocessing pipelines. Hierarchical chunking provides this capability as a built-in Knowledge Bases feature.",
        "references": [
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
    "question": "A legal technology company runs an application on Amazon Bedrock that analyzes contracts. Each user request includes the same lengthy system prompt and a static set of legal guidelines that total several thousand tokens, followed by a short user question. The company observes high latency and high input token costs because the static content is reprocessed on every request. The company wants to reduce cost and latency without changing the model or the content of the prompts.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Enable prompt caching and place cache checkpoints after the static portions of the prompt so that repeated prefixes are cached across requests.",
        "explanation": "Prompt caching in Amazon Bedrock allows repeated static portions of a prompt, such as long system instructions and reference content, to be cached at checkpoints. Subsequent requests that reuse the cached prefix skip reprocessing those tokens, which reduces both response latency and input token costs. This solution requires no change to the model or the prompt content.",
        "references": [
          {
            "title": "Prompt caching for faster model inference",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Purchase provisioned throughput for the model to guarantee capacity for the repeated prompt content.",
        "explanation": "Provisioned throughput provides dedicated model capacity measured in model units and is intended for consistent, high-volume workloads that need guaranteed throughput. Provisioned throughput does not avoid reprocessing static prompt tokens on each request, so it does not reduce input token consumption or the latency caused by processing the repeated prefix.",
        "references": [
          {
            "title": "Provisioned throughput",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Reduce the maximum tokens inference parameter to limit the size of the model's responses.",
        "explanation": "The maximum tokens parameter limits the length of the generated output. The cost and latency problem in this scenario is caused by repeatedly processing large static input content, not by long outputs. Reducing output length does not address input token reprocessing.",
        "references": [
          {
            "title": "Inference request parameters",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Enable cross-Region inference to route requests to Regions with lower utilization.",
        "explanation": "Cross-Region inference distributes traffic across Regions to improve throughput and resilience during demand spikes. It does not reduce the number of input tokens processed per request, so it does not address the cost or the latency caused by reprocessing static prompt content.",
        "references": [
          {
            "title": "Cross-Region inference",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  },
{
    "question": "A retail company is building a product assistant that uses an FM on Amazon Bedrock. The assistant must answer questions about product specifications, pricing, and inventory. This information changes daily. The company wants answers to always reflect the most current data. The company wants to minimize ongoing model management effort and cost.\n\nWhich approach will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Fine-tune the FM on the product catalog every day so the model weights contain the latest product information.",
        "explanation": "Fine-tuning adapts model weights by using labeled training data. Fine-tuning is suited for adapting style, tone, or task behavior, not for injecting frequently changing factual data. Daily fine-tuning jobs would be costly, operationally heavy, and would still risk serving stale data between training runs.",
        "references": [
          {
            "title": "Customize your model to improve its performance for your use case",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Use continued pre-training with the unlabeled product catalog data to keep the model current.",
        "explanation": "Continued pre-training exposes a model to large amounts of unlabeled domain data to improve domain familiarity. Like fine-tuning, it modifies model weights and would need to be repeated whenever data changes. It is not designed to keep a model synchronized with data that changes daily, and it adds significant cost and management effort.",
        "references": [
          {
            "title": "Customize your model to improve its performance for your use case",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Create an Amazon Bedrock knowledge base over the product data and use RAG so the model retrieves current information at query time. Sync the data source when the product data changes.",
        "explanation": "RAG with Amazon Bedrock Knowledge Bases retrieves relevant information from the data source at query time and augments the prompt with that information. Because the data is retrieved rather than baked into model weights, responses reflect the current state of the data after each sync. This approach avoids repeated training jobs and minimizes both cost and ongoing model management effort for frequently changing data.",
        "references": [
          {
            "title": "Retrieve data and generate AI responses with Amazon Bedrock Knowledge Bases",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Include the full product catalog in the prompt of every request so the model always has the latest data.",
        "explanation": "Including the full catalog in every prompt would consume a very large number of input tokens per request, increasing cost and latency. The catalog could also exceed the model's context window. Retrieving only the relevant information at query time with RAG is far more efficient.",
        "references": [
          {
            "title": "Design a prompt",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/design-a-prompt.html"
          }
        ]
      }
    ],
    "correct_answer": "C"
  },
{
    "question": "A GenAI developer is building an Amazon Bedrock agent for an ecommerce company. The agent must be able to look up order status and initiate returns by calling the company's existing internal REST APIs during a conversation. The developer wants the agent to determine when to call the APIs and which parameters to pass based on the user's request.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Create an action group for the agent. Define the available operations by using an OpenAPI schema or function details, and attach an AWS Lambda function that calls the internal APIs.",
        "explanation": "Action groups define the actions that an Amazon Bedrock agent can perform. The developer describes the operations and their parameters by using an OpenAPI schema or function details. The agent uses the FM's reasoning to decide when to invoke an action and extracts the required parameters from the conversation. The attached Lambda function executes the business logic, such as calling the internal REST APIs.",
        "references": [
          {
            "title": "Use action groups to define actions for your agent to perform",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-action-create.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Create a knowledge base that contains the API documentation and associate the knowledge base with the agent.",
        "explanation": "A knowledge base provides the agent with information to retrieve and reference when generating responses. A knowledge base does not give the agent the ability to execute API calls or perform actions. Attaching API documentation would let the agent describe the APIs but not invoke them.",
        "references": [
          {
            "title": "Retrieve data and generate AI responses with Amazon Bedrock Knowledge Bases",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Configure Amazon Bedrock Guardrails with custom policies that instruct the model to call the internal APIs when needed.",
        "explanation": "Guardrails implement safeguards such as content filters, denied topics, and sensitive information filters. Guardrails evaluate inputs and outputs. Guardrails cannot execute API calls or add action capabilities to a model.",
        "references": [
          {
            "title": "Amazon Bedrock Guardrails",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Add the API endpoint URLs and authentication details to the agent's instruction prompt so the model can call the APIs directly.",
        "explanation": "Agent instructions describe the agent's task and behavior. An FM cannot make outbound HTTP calls on its own based on URLs in a prompt. Additionally, placing authentication details in a prompt is a security risk. Action execution in Amazon Bedrock Agents is performed through action groups.",
        "references": [
          {
            "title": "How Amazon Bedrock Agents works",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-how.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  },
{
    "question": "A software company builds a GenAI application on Amazon Bedrock. The company plans to evaluate FMs from several different model providers and expects to switch between models frequently. Currently, the application uses the InvokeModel API with provider-specific request bodies, and each model switch requires rewriting the request and response handling code. The company wants to switch between models with minimal code changes. The application also needs to maintain multi-turn conversations.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Continue to use the InvokeModel API and create a separate request-formatting module for each model provider.",
        "explanation": "The InvokeModel API requires request bodies that follow each model provider's native format. Building and maintaining a formatting module for each provider is custom code that must be updated whenever a model is added or changed. This approach does not minimize code changes.",
        "references": [
          {
            "title": "Submit prompts and generate responses with model inference",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Use the Converse API, which provides a consistent request and response format across supported Amazon Bedrock models and supports multi-turn conversations.",
        "explanation": "The Converse API provides a unified interface that works consistently across the Amazon Bedrock models that support it. Switching models typically requires changing only the model ID rather than rewriting request and response handling. The Converse API accepts a messages structure that supports multi-turn conversations, which meets both requirements with minimal code changes.",
        "references": [
          {
            "title": "Carry out a conversation with the Converse API operations",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Deploy each candidate model to a separate Amazon SageMaker AI endpoint and standardize on the SageMaker AI runtime API.",
        "explanation": "Deploying models to SageMaker AI endpoints adds infrastructure to deploy and manage. Amazon Bedrock third-party models such as Anthropic Claude are accessed through the Bedrock API, and this approach does not apply to them. This solution adds operational overhead when Amazon Bedrock already provides a unified inference interface.",
        "references": [
          {
            "title": "Deploy models for inference in Amazon SageMaker AI",
            "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Use Amazon Bedrock intelligent prompt routing to avoid writing model-specific request code.",
        "explanation": "Intelligent prompt routing routes each request to a model within the same model family based on predicted response quality and cost. It is a cost and quality optimization feature, not a general-purpose abstraction for switching between models from different providers under application control. The requirement is a consistent API across providers, which the Converse API addresses.",
        "references": [
          {
            "title": "Intelligent prompt routing",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html"
          }
        ]
      }
    ],
    "correct_answer": "B"
  },
{
    "question": "A company stores documents from the HR, finance, and engineering departments in a single Amazon S3 bucket and ingests them into one Amazon Bedrock knowledge base. Employees must be able to retrieve information only from their own department's documents when they query the knowledge base. The company wants to enforce this behavior at retrieval time without creating a separate knowledge base for each department.\n\nWhich combination of steps will meet these requirements?\n\n(Select TWO)",
    "options": [
      {
        "id": "A",
        "text": "Create a metadata file for each source document in Amazon S3 that includes a department attribute, and sync the data source so the attribute is associated with the document's chunks.",
        "explanation": "Amazon Bedrock Knowledge Bases supports associating metadata with source documents by using metadata files stored alongside the documents in Amazon S3. During ingestion, the metadata attributes are stored with the document's chunks in the vector store. This step makes the department attribute available for filtering at query time.",
        "references": [
          {
            "title": "Retrieve data and generate AI responses with Amazon Bedrock Knowledge Bases",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Apply a metadata filter on the department attribute in the retrieval configuration of the Retrieve or RetrieveAndGenerate API call based on the requesting user's department.",
        "explanation": "Knowledge base queries support metadata filtering in the retrieval configuration. By applying a filter on the department attribute that matches the requesting user's department, only chunks from that department's documents are considered during retrieval. Combined with metadata files on the source documents, this enforces department-level scoping at retrieval time without separate knowledge bases.",
        "references": [
          {
            "title": "Query configurations for knowledge bases",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Create a separate knowledge base and a separate vector store for each department, and route queries to the correct knowledge base.",
        "explanation": "Separate knowledge bases per department would achieve isolation, but the company explicitly wants to avoid creating a separate knowledge base for each department. This approach also multiplies the ingestion pipelines and vector stores to manage, increasing operational overhead.",
        "references": [
          {
            "title": "Retrieve data and generate AI responses with Amazon Bedrock Knowledge Bases",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Configure Amazon Bedrock Guardrails with denied topics for each department so responses about other departments are blocked.",
        "explanation": "Denied topics block content related to configured topics in prompts and responses. Guardrails operate on content, not on document-level access scoping, and cannot reliably determine which department a retrieved chunk came from. This approach does not enforce retrieval-time filtering of source documents.",
        "references": [
          {
            "title": "Amazon Bedrock Guardrails",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
          }
        ]
      },
      {
        "id": "E",
        "text": "Attach IAM policies to each employee's role that deny s3:GetObject access to the other departments' prefixes in the S3 bucket.",
        "explanation": "IAM policies on the S3 bucket control access to the raw objects in Amazon S3. However, knowledge base queries retrieve content from the vector store using the knowledge base's service role, not the end user's role. Restricting S3 object access for users does not filter what the knowledge base returns at query time.",
        "references": [
          {
            "title": "Identity-based policy examples for Amazon Bedrock",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/security_iam_id-based-policy-examples.html"
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
    "question": "A healthcare company runs a RAG application that uses Amazon Bedrock Knowledge Bases to answer questions from clinical policy documents. During testing, reviewers find that the model sometimes produces statements that are not supported by the retrieved documents and sometimes answers questions that are unrelated to the user's query. The company must automatically detect and block these responses before they reach users.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Set the model's temperature parameter to 0 to make responses deterministic.",
        "explanation": "Lowering temperature reduces randomness in token selection, which can reduce some variability. However, a low temperature does not verify responses against the retrieved source documents and cannot detect or block unsupported statements. Hallucinations can still occur with deterministic sampling.",
        "references": [
          {
            "title": "Influence response generation with inference parameters",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Configure Amazon Bedrock Guardrails with a contextual grounding check. Set grounding and relevance thresholds to block responses that are not supported by the retrieved source or that do not answer the user's query.",
        "explanation": "The contextual grounding check in Amazon Bedrock Guardrails evaluates model responses against the source information and the user's query. The grounding score measures whether the response is factually supported by the source, and the relevance score measures whether the response addresses the query. Responses that score below the configured thresholds are blocked. This directly meets the requirement to automatically detect and block unsupported or irrelevant responses.",
        "references": [
          {
            "title": "Use contextual grounding check to filter hallucinations in responses",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Configure Amazon Bedrock Guardrails content filters with the highest strength for all harmful content categories.",
        "explanation": "Content filters detect and block harmful content in categories such as hate, insults, violence, and prompt attacks. Content filters do not compare responses against retrieved source documents, so they cannot detect factually unsupported statements or irrelevant answers.",
        "references": [
          {
            "title": "Amazon Bedrock Guardrails",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Add an instruction to the system prompt that tells the model to answer only from the retrieved documents.",
        "explanation": "Prompt instructions can reduce the likelihood of ungrounded answers, but the model might not always follow instructions. This approach provides no detection or enforcement mechanism, so unsupported responses can still reach users. The requirement to automatically detect and block such responses needs an enforcement layer such as the contextual grounding check.",
        "references": [
          {
            "title": "Design a prompt",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/design-a-prompt.html"
          }
        ]
      }
    ],
    "correct_answer": "B"
  },
{
    "question": "A financial institution runs an application on Amazon EC2 instances in private subnets. The application invokes FMs through the Amazon Bedrock runtime API. The institution's compliance requirements state that traffic between the application and Amazon Bedrock must not traverse the public internet.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Create an interface VPC endpoint powered by AWS PrivateLink for the Amazon Bedrock runtime service and route the application's API calls through the endpoint.",
        "explanation": "Interface VPC endpoints powered by AWS PrivateLink establish a private connection between the VPC and Amazon Bedrock. Traffic between the VPC and Amazon Bedrock stays on the AWS network and does not traverse the public internet. You can also attach endpoint policies to further control access through the endpoint.",
        "references": [
          {
            "title": "Use an interface VPC endpoint (AWS PrivateLink) to create a private connection to Amazon Bedrock",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Deploy a NAT gateway in a public subnet and route the private subnets' traffic to Amazon Bedrock through the NAT gateway.",
        "explanation": "A NAT gateway allows instances in private subnets to initiate outbound connections to the internet. Traffic through a NAT gateway to a public service endpoint traverses the public internet, which violates the compliance requirement.",
        "references": [
          {
            "title": "NAT gateways",
            "url": "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Create a gateway VPC endpoint for Amazon Bedrock and update the route tables of the private subnets.",
        "explanation": "Gateway VPC endpoints are available only for Amazon S3 and Amazon DynamoDB. Amazon Bedrock is accessed privately through interface VPC endpoints powered by AWS PrivateLink, not through gateway endpoints.",
        "references": [
          {
            "title": "Gateway endpoints",
            "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Attach an internet gateway to the VPC and restrict outbound traffic to Amazon Bedrock IP ranges by using security groups.",
        "explanation": "An internet gateway routes traffic over the public internet, which violates the compliance requirement regardless of security group restrictions. Additionally, restricting by service IP ranges is brittle because service IP addresses can change.",
        "references": [
          {
            "title": "Enable VPC internet access using internet gateways",
            "url": "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  },
{
    "question": "A media company must generate summaries for an archive of 5 million articles by using an FM on Amazon Bedrock. The articles are stored in Amazon S3. The summaries are not needed in real time and can be produced over several hours. The company wants to minimize inference costs and avoid building custom orchestration for processing the archive.\n\nWhich solution will meet these requirements MOST cost-effectively?",
    "options": [
      {
        "id": "A",
        "text": "Purchase provisioned throughput for the model and invoke the model synchronously for each article.",
        "explanation": "Provisioned throughput provides dedicated capacity with a term commitment and is intended for sustained, predictable workloads that need guaranteed throughput. For a one-time or periodic bulk processing job that is not latency sensitive, provisioned throughput adds cost, and synchronous invocation of millions of requests still requires custom orchestration.",
        "references": [
          {
            "title": "Provisioned throughput",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Create an Amazon Bedrock batch inference job that reads the input records from Amazon S3 and writes the model outputs back to Amazon S3.",
        "explanation": "Batch inference in Amazon Bedrock processes large numbers of prompts asynchronously. You provide input records in Amazon S3, and Amazon Bedrock runs the inference job and writes the outputs to Amazon S3. Batch inference is offered at a lower price than on-demand inference and requires no custom orchestration, which makes it the most cost-effective fit for large, non-latency-sensitive workloads.",
        "references": [
          {
            "title": "Process multiple prompts with batch inference",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Create an AWS Lambda function that invokes the model with on-demand InvokeModel calls. Use Amazon SQS to fan out one message per article and run thousands of concurrent Lambda invocations.",
        "explanation": "This architecture can process the archive, but it uses on-demand inference pricing, pays for Lambda and SQS on top of inference, and requires the company to build and operate custom orchestration, error handling, and throttling management. Batch inference provides this capability as a managed feature at a lower inference price.",
        "references": [
          {
            "title": "AWS Lambda",
            "url": "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Use the ConverseStream API to stream summaries for each article and reduce perceived latency.",
        "explanation": "Streaming APIs return output tokens incrementally to reduce perceived latency for interactive use cases. Streaming does not reduce inference cost and still requires invoking the model once per article with custom orchestration. The workload in this scenario is not latency sensitive, so streaming provides no benefit.",
        "references": [
          {
            "title": "Carry out a conversation with the Converse API operations",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"
          }
        ]
      }
    ],
    "correct_answer": "B"
  },
{
    "question": "A company is preparing to launch a customer-facing summarization feature built on Amazon Bedrock. The team has narrowed the choice to two candidate FMs. Before launch, the team must compare the quality of the models' responses, including attributes such as helpfulness and correctness, against a custom dataset of company-specific prompts. The team wants to minimize manual human review effort.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Create Amazon Bedrock model evaluation jobs that use an LLM-as-a-judge to score each candidate model's responses on the custom prompt dataset.",
        "explanation": "Amazon Bedrock model evaluation supports evaluations in which a judge model scores another model's responses against quality dimensions such as helpfulness and correctness. You can supply a custom prompt dataset so the evaluation reflects company-specific use cases. This approach produces comparable quality scores for the candidate models while minimizing manual human review effort.",
        "references": [
          {
            "title": "Evaluate the performance of Amazon Bedrock resources",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Create a human-based model evaluation job in which a work team reviews and rates every response from both candidate models.",
        "explanation": "Human-based evaluation jobs use human workers to rate responses and are valuable for subjective judgments. However, this approach maximizes rather than minimizes manual review effort, which contradicts the requirement. Automated evaluation with a judge model achieves the comparison with far less human effort.",
        "references": [
          {
            "title": "Evaluate the performance of Amazon Bedrock resources",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Deploy both models behind the application, split production traffic between them, and compare Amazon CloudWatch invocation latency and error metrics.",
        "explanation": "CloudWatch invocation metrics measure operational characteristics such as latency, invocation counts, and errors. These metrics do not measure response quality attributes such as helpfulness or correctness. Additionally, the comparison must happen before launch, so routing production customer traffic to unvalidated models is not appropriate.",
        "references": [
          {
            "title": "Monitor Amazon Bedrock with Amazon CloudWatch",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-cw.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Compare the two models by using only their published scores on public academic benchmarks.",
        "explanation": "Public benchmark scores measure general capabilities on standardized tasks. They do not reflect performance on the company's specific prompts, domain, and summarization requirements. The requirement to evaluate against a custom dataset means an evaluation job on that dataset is needed.",
        "references": [
          {
            "title": "Evaluate the performance of Amazon Bedrock resources",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  },
{
    "question": "A company uses an FM on Amazon Bedrock to extract structured fields from customer emails. The model understands the task but produces output in inconsistent formats. Sometimes the model returns prose, and sometimes the model returns lists with varying field names. The company wants the model to consistently return output in a specific format with MINIMAL effort and cost.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Fine-tune the FM by using a labeled dataset of emails and correctly formatted outputs.",
        "explanation": "Fine-tuning can teach a model a consistent output format. However, fine-tuning requires preparing a labeled training dataset, running a customization job, and paying to host or invoke the custom model. For an output formatting problem, this approach involves significantly more effort and cost than prompt engineering.",
        "references": [
          {
            "title": "Customize your model to improve its performance for your use case",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Add few-shot examples to the prompt that demonstrate the exact output format the model must follow.",
        "explanation": "Few-shot prompting includes example input-output pairs directly in the prompt. Providing examples that demonstrate the exact expected format is an effective and documented prompt engineering technique to make model outputs consistent. This approach requires only prompt changes, with no training jobs or additional infrastructure, so it involves minimal effort and cost.",
        "references": [
          {
            "title": "Prompt engineering concepts",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Run continued pre-training on the FM by using the company's archive of customer emails.",
        "explanation": "Continued pre-training uses unlabeled data to improve a model's domain familiarity. It does not teach a specific output format because there are no labeled examples of the desired output. It is also the most expensive and effort-intensive customization option, which contradicts the requirement.",
        "references": [
          {
            "title": "Customize your model to improve its performance for your use case",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Increase the temperature parameter so the model explores more output variations until it finds the correct format.",
        "explanation": "Increasing temperature increases randomness in token selection, which makes outputs more varied, not more consistent. This change would make the formatting problem worse.",
        "references": [
          {
            "title": "Influence response generation with inference parameters",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html"
          }
        ]
      }
    ],
    "correct_answer": "B"
  },
{
    "question": "A company is building a semantic search feature for an internal document repository. Users must be able to find documents based on meaning rather than exact keyword matches. The company plans to store the document representations in a vector database and compare them to user queries at search time.\n\nWhich approach will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Use an embeddings model, such as Amazon Titan Text Embeddings, to convert documents and queries into vectors. Store the document vectors in a vector database and perform similarity search at query time.",
        "explanation": "Embeddings models convert text into numerical vector representations that capture semantic meaning. Documents are embedded and stored in a vector database, and each query is embedded at search time so the database can return the most similar documents. This is the standard architecture for semantic search and directly meets the requirements.",
        "references": [
          {
            "title": "Amazon Titan Text Embeddings models",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Use a text generation model to compare the user's query against each document in the repository and rate the similarity of each pair.",
        "explanation": "Invoking a text generation model once per document for every query does not scale. For a large repository, each search would require thousands of model invocations, resulting in high latency and cost. Embeddings with a vector database perform this comparison efficiently.",
        "references": [
          {
            "title": "Submit prompts and generate responses with model inference",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Use Amazon Comprehend to extract key phrases from the documents and match user queries against the extracted phrases.",
        "explanation": "Key phrase extraction identifies important terms in text, but matching queries against extracted phrases is still a form of keyword matching. This approach does not capture semantic similarity, so queries phrased differently from the document text would fail to match. It also does not produce vectors for a vector database.",
        "references": [
          {
            "title": "Key phrases in Amazon Comprehend",
            "url": "https://docs.aws.amazon.com/comprehend/latest/dg/how-key-phrases.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Use an image generation model to create visual representations of the documents and compare the generated images.",
        "explanation": "Image generation models create images from text prompts. They do not produce semantic vector representations of text and are not applicable to text-based semantic search.",
        "references": [
          {
            "title": "Supported foundation models in Amazon Bedrock",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  },
{
    "question": "A marketing company wants to fine-tune an FM in Amazon Bedrock so that the model writes product copy in the company's specific brand voice. The company has thousands of examples of past prompts and the corresponding approved marketing copy. A GenAI developer must prepare the training data for the Amazon Bedrock model customization job.\n\nWhich approach will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Format the examples as prompt-completion pairs in JSON Lines (JSONL) files. Upload the files to an Amazon S3 bucket and reference the S3 location in the customization job.",
        "explanation": "Amazon Bedrock fine-tuning jobs require labeled training data formatted as JSON Lines, where each line contains a record with the prompt and the expected completion. The training data must be stored in Amazon S3, and the customization job references the S3 location. This matches the documented data preparation requirements for fine-tuning.",
        "references": [
          {
            "title": "Prepare the datasets for model customization",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-prepare.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Store the examples as items in an Amazon DynamoDB table and reference the table name in the customization job.",
        "explanation": "Amazon Bedrock model customization jobs read training data from Amazon S3. DynamoDB is not a supported input source for customization jobs, so the developer would need to export the data to S3 in the required format anyway.",
        "references": [
          {
            "title": "Prepare the datasets for model customization",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-prepare.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Concatenate all approved marketing copy into large unlabeled text files and submit the files as fine-tuning training data.",
        "explanation": "Unlabeled raw text is the input format for continued pre-training, not fine-tuning. Fine-tuning requires labeled prompt-completion pairs so the model learns the mapping from input to the desired output. Submitting unlabeled text would not teach the model to respond to prompts in the brand voice.",
        "references": [
          {
            "title": "Prepare the datasets for model customization",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-prepare.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Create an Amazon Bedrock knowledge base from the approved marketing copy and select the knowledge base as the training data source for the customization job.",
        "explanation": "Knowledge bases are used for retrieval at inference time in RAG workflows. A knowledge base is not an input source for model customization jobs. Fine-tuning requires JSONL training files in Amazon S3.",
        "references": [
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
    "question": "A fintech company is building an assistant that uses the Amazon Bedrock Converse API. When a user asks about a stock, the application must fetch the current price from an internal pricing API and return the price to the model so the model can compose the answer. The model must decide when a price lookup is needed and must supply the ticker symbol as a structured parameter.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Define a tool specification in the toolConfig field of the Converse API request. Handle the model's toolUse response by calling the pricing API and returning the result to the model in a toolResult message.",
        "explanation": "The Converse API supports tool use. The application defines available tools with an input schema in the toolConfig field. When the model determines that a tool is needed, it returns a toolUse block that contains structured parameters, such as the ticker symbol. The application calls the pricing API and sends the result back in a toolResult block so the model can generate the final answer. This is the documented pattern for this exact requirement.",
        "references": [
          {
            "title": "Use a tool to complete an Amazon Bedrock model response",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/tool-use.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Create an Amazon Bedrock knowledge base that contains historical stock prices and use RAG to retrieve prices at query time.",
        "explanation": "A knowledge base retrieves ingested content, which reflects the state of the data at the last sync. Stock prices change continuously, so retrieved prices would be stale. This approach also does not provide the model with a mechanism to request a live API lookup with structured parameters.",
        "references": [
          {
            "title": "Retrieve data and generate AI responses with Amazon Bedrock Knowledge Bases",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Instruct the model in the system prompt to output the ticker symbol in brackets, and parse the response text with a regular expression to detect when a lookup is needed.",
        "explanation": "Prompt-and-parse approaches rely on the model consistently following formatting instructions, which is not guaranteed. Parsing free text with regular expressions is brittle and error-prone. Tool use provides a native, structured mechanism for the same goal, so custom text parsing is unnecessary.",
        "references": [
          {
            "title": "Use a tool to complete an Amazon Bedrock model response",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/tool-use.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Fine-tune the FM on a dataset of stock prices so the model can answer pricing questions directly.",
        "explanation": "Fine-tuning bakes information into model weights at training time. The model would only know prices as of the training data and could not provide current prices. Fine-tuning is not a mechanism for accessing real-time data.",
        "references": [
          {
            "title": "Customize your model to improve its performance for your use case",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  },
{
    "question": "A company operates a customer-facing chatbot that invokes an FM through the Amazon Bedrock Converse API. Responses to complex questions can take more than 20 seconds to generate completely. Users see a blank screen until the full response arrives, and many users abandon the chat. The company wants to improve the perceived responsiveness of the chatbot without changing the model.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Use the ConverseStream API so the application receives and displays tokens incrementally as the model generates them.",
        "explanation": "The ConverseStream API returns the model's output as a stream of events so the application can display text to the user as it is generated. Users start reading the response almost immediately instead of waiting for the full generation to complete, which directly improves perceived responsiveness without changing the model.",
        "references": [
          {
            "title": "Carry out a conversation with the Converse API operations",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Purchase provisioned throughput for the model to increase generation capacity.",
        "explanation": "Provisioned throughput provides dedicated capacity for consistent, high-volume workloads. It does not change how the application receives the response. Users would still wait for the full response before seeing anything, so the perceived latency problem would remain.",
        "references": [
          {
            "title": "Provisioned throughput",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Increase the maximum tokens inference parameter so the model can generate the response in a single pass.",
        "explanation": "The maximum tokens parameter sets an upper bound on output length. Increasing it does not make generation faster and does not change when the user first sees output. If anything, allowing longer outputs can increase total generation time.",
        "references": [
          {
            "title": "Influence response generation with inference parameters",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Lower the temperature parameter so the model selects tokens more quickly.",
        "explanation": "Temperature controls the randomness of token selection, not the speed of generation. Lowering temperature does not meaningfully reduce generation time and does not change when the user first sees output.",
        "references": [
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
    "question": "A GenAI application invokes an FM on Amazon Bedrock by using on-demand throughput. During short traffic spikes, some requests fail with ThrottlingException errors, and the failed requests are currently discarded. The company must reduce the number of user-visible failures during spikes. The company wants to continue using on-demand throughput and the same FM.\n\nWhich combination of steps will meet these requirements?\n\n(Select TWO)",
    "options": [
      {
        "id": "A",
        "text": "Implement retries with exponential backoff and jitter for throttled requests, using the retry capabilities of the AWS SDK.",
        "explanation": "ThrottlingException indicates that the request rate temporarily exceeded available capacity. Retrying with exponential backoff and jitter is the documented AWS best practice for handling throttling. Because spikes are short, most retried requests succeed, which reduces user-visible failures without changing the throughput model.",
        "references": [
          {
            "title": "Retry behavior in AWS SDKs and tools",
            "url": "https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Invoke the model through a cross-Region inference profile so requests are distributed across multiple Regions during demand spikes.",
        "explanation": "Cross-Region inference routes requests across Regions within a geography to access greater capacity during bursts, which reduces throttling. It is a built-in Amazon Bedrock capability, uses the same FM, and remains on-demand, so it meets all the stated constraints.",
        "references": [
          {
            "title": "Cross-Region inference",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Configure the application to retry throttled requests immediately in a tight loop until each request succeeds.",
        "explanation": "Retrying immediately without backoff amplifies the load during a spike and can worsen throttling for all requests. AWS guidance specifically recommends exponential backoff with jitter instead of immediate, repeated retries.",
        "references": [
          {
            "title": "Retry behavior in AWS SDKs and tools",
            "url": "https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Use intelligent prompt routing to send throttled requests to a different model family.",
        "explanation": "Intelligent prompt routing routes requests between models within the same model family based on quality and cost, not as a throttling failover mechanism. Additionally, the company must continue to use the same FM, and routing to different models does not meet that constraint.",
        "references": [
          {
            "title": "Intelligent prompt routing",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html"
          }
        ]
      },
      {
        "id": "E",
        "text": "Increase the temperature and top-p parameters so the model processes requests faster during spikes.",
        "explanation": "Temperature and top-p control randomness in token sampling. These parameters have no effect on request throttling, which is caused by exceeding service capacity limits, not by model sampling settings.",
        "references": [
          {
            "title": "Influence response generation with inference parameters",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html"
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
    "question": "A company has configured Amazon Bedrock Guardrails with content filters, denied topics, and sensitive information filters for its GenAI applications. The company also hosts an open source LLM on an Amazon SageMaker AI endpoint for a specialized workload. Company policy requires the same guardrail policies to be applied to the inputs and outputs of the SageMaker-hosted model.\n\nWhich solution will meet these requirements with the LEAST development effort?",
    "options": [
      {
        "id": "A",
        "text": "Call the ApplyGuardrail API to evaluate the user inputs and the SageMaker-hosted model's outputs against the existing guardrail, independently of Amazon Bedrock model invocation.",
        "explanation": "The ApplyGuardrail API evaluates content against a configured guardrail without invoking an Amazon Bedrock model. The application can pass user inputs and the self-hosted model's outputs to ApplyGuardrail and act on the assessment. This reuses the exact same guardrail policies already configured, so it meets the requirement with the least development effort.",
        "references": [
          {
            "title": "Use the ApplyGuardrail API in your application",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-use-independent-api.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Re-implement the guardrail policies by building an AWS Lambda function that uses Amazon Comprehend to detect harmful content and PII in requests and responses.",
        "explanation": "Comprehend can detect PII and perform some content analysis, but this approach requires building and maintaining custom detection logic and cannot easily replicate guardrail features such as denied topics and configurable filter strengths. It duplicates policy definitions in two places, which increases development effort and drift risk.",
        "references": [
          {
            "title": "Amazon Comprehend PII detection",
            "url": "https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Add instructions to the SageMaker-hosted model's system prompt that describe the guardrail policies and tell the model to refuse noncompliant requests.",
        "explanation": "Prompt-based instructions depend on the model following them, provide no enforcement guarantee, and can be circumvented through prompt injection. This approach does not apply the company's actual guardrail policies and does not satisfy a policy compliance requirement.",
        "references": [
          {
            "title": "Amazon Bedrock Guardrails",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Retire the SageMaker AI endpoint and require the specialized workload to use only Amazon Bedrock FMs so guardrails apply automatically.",
        "explanation": "Migrating the specialized workload off its model is a significant change that may not be feasible if the open source model was chosen for capabilities not available in Amazon Bedrock. The ApplyGuardrail API exists specifically to extend guardrails to models outside Amazon Bedrock, making migration unnecessary.",
        "references": [
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
    "question": "A company in a regulated industry runs a GenAI application on Amazon Bedrock. Auditors require two capabilities. First, the company must retain the full prompts and model responses of all model invocations for review. Second, the company must be able to identify which IAM principal made each Amazon Bedrock API call and when.\n\nWhich combination of steps will meet these requirements?\n\n(Select TWO)",
    "options": [
      {
        "id": "A",
        "text": "Enable Amazon Bedrock model invocation logging and configure the logs to be delivered to Amazon S3 or Amazon CloudWatch Logs.",
        "explanation": "Model invocation logging captures the full request and response data of model invocations, including prompts and model outputs, and delivers the logs to Amazon S3 or CloudWatch Logs. This directly meets the requirement to retain prompts and responses for audit review. Invocation logging is disabled by default and must be enabled.",
        "references": [
          {
            "title": "Monitor model invocation using CloudWatch Logs and Amazon S3",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Use AWS CloudTrail to record Amazon Bedrock API activity, including the identity of the caller and the time of each call.",
        "explanation": "CloudTrail records API calls made to Amazon Bedrock, including the identity of the principal that made the call, the source, and the timestamp. This meets the requirement to attribute each API call to an IAM principal for audit purposes.",
        "references": [
          {
            "title": "Monitor Amazon Bedrock API calls using CloudTrail",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Enable AWS X-Ray tracing on the application to capture the content of prompts and responses.",
        "explanation": "X-Ray traces application request flows for performance analysis and distributed debugging. X-Ray does not capture the content of model prompts and responses and is not an audit logging mechanism for API caller identity.",
        "references": [
          {
            "title": "What is AWS X-Ray?",
            "url": "https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Enable Amazon GuardDuty to log all Amazon Bedrock invocations and the identity of each caller.",
        "explanation": "GuardDuty is a threat detection service that analyzes data sources to identify suspicious activity. GuardDuty produces security findings, not audit logs of prompts, responses, or complete API call histories.",
        "references": [
          {
            "title": "What is Amazon GuardDuty?",
            "url": "https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html"
          }
        ]
      },
      {
        "id": "E",
        "text": "Use AWS Config to record the prompts and responses of each model invocation as configuration items.",
        "explanation": "AWS Config records the configuration state of AWS resources over time. It does not record API invocation content such as prompts and responses, and it is not designed for API activity auditing.",
        "references": [
          {
            "title": "What is AWS Config?",
            "url": "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html"
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
    "question": "Multiple development teams in a company share a single AWS account and invoke the same FM on Amazon Bedrock by using on-demand throughput. The finance department requires a breakdown of Amazon Bedrock usage costs by team. The company cannot apply tags directly to the base FM.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Create an application inference profile for each team that references the FM. Attach cost allocation tags to each profile and require each team to invoke the model through its own profile.",
        "explanation": "Application inference profiles are resources that you create to track usage and costs when invoking a model. You can attach tags to an application inference profile, and each team invokes the model through its own profile ARN. With cost allocation tags activated, costs can be broken down by team. This is the documented purpose of application inference profiles and addresses the fact that base FMs cannot be tagged directly.",
        "references": [
          {
            "title": "Set up a model invocation resource using inference profiles",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Use Amazon CloudWatch metrics for the model to determine each team's share of the invocation count.",
        "explanation": "CloudWatch metrics for Amazon Bedrock report aggregate invocation counts and token usage by model. The metrics do not attribute usage to individual teams that share the same account and model, so they cannot produce a per-team cost breakdown.",
        "references": [
          {
            "title": "Monitor Amazon Bedrock with Amazon CloudWatch",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-cw.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Migrate each team into a separate AWS account and use consolidated billing to separate the costs.",
        "explanation": "Separate accounts would isolate costs, but migrating teams into new accounts is a major organizational and operational change. Application inference profiles solve the cost attribution requirement within the existing shared account with far less effort.",
        "references": [
          {
            "title": "Consolidated billing for AWS Organizations",
            "url": "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Apply cost allocation tags directly to the base FM, using one tag value for each team.",
        "explanation": "Base foundation models in Amazon Bedrock are not taggable resources, which the scenario states. Even if tagging were possible, a single shared model could carry only one set of tag values and could not attribute usage from different teams separately.",
        "references": [
          {
            "title": "Tagging Amazon Bedrock resources",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/tagging.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  },
{
    "question": "A GenAI developer is testing an Amazon Bedrock agent that has multiple action groups and an associated knowledge base. For some user requests, the agent calls the wrong action or skips the knowledge base when it should have queried it. The developer must inspect the agent's step-by-step reasoning, including how the agent interpreted the input and why it chose each action, to diagnose the behavior.\n\nWhich solution will meet these requirements?",
    "options": [
      {
        "id": "A",
        "text": "Enable the trace when invoking the agent, and examine the trace events to review the agent's pre-processing, orchestration steps, and action selections.",
        "explanation": "Amazon Bedrock Agents provides a trace that shows the agent's reasoning process throughout the steps of its orchestration, including how the input was interpreted, which knowledge base or action group was selected, and the rationale at each step. Enabling the trace during InvokeAgent, or viewing it in the console test window, is the documented way to diagnose why an agent chose a specific action.",
        "references": [
          {
            "title": "Track agent's step-by-step reasoning process using trace",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/trace-events.html"
          }
        ]
      },
      {
        "id": "B",
        "text": "Enable Amazon Bedrock model invocation logging and analyze the logged prompts and responses to reconstruct the agent's decisions.",
        "explanation": "Model invocation logging captures raw model requests and responses. Reconstructing the agent's multi-step orchestration logic from raw invocation logs is indirect and incomplete compared to the agent trace, which is purpose-built to expose the agent's reasoning, orchestration steps, and action choices in a structured format.",
        "references": [
          {
            "title": "Monitor model invocation using CloudWatch Logs and Amazon S3",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
          }
        ]
      },
      {
        "id": "C",
        "text": "Review AWS CloudTrail events for the InvokeAgent API calls to determine why the agent selected each action.",
        "explanation": "CloudTrail records that API calls occurred, along with caller identity and timing. CloudTrail does not capture the agent's internal reasoning or orchestration steps, so it cannot explain why the agent chose a particular action.",
        "references": [
          {
            "title": "Monitor Amazon Bedrock API calls using CloudTrail",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html"
          }
        ]
      },
      {
        "id": "D",
        "text": "Increase the detail of the agent's instructions and observe whether the agent's behavior changes across repeated test invocations.",
        "explanation": "Refining instructions may eventually be part of the fix, but trial-and-error observation does not provide visibility into the agent's reasoning. The developer's requirement is to inspect why the agent made each decision, which is exactly what the trace provides. Diagnosis should precede instruction changes.",
        "references": [
          {
            "title": "How Amazon Bedrock Agents works",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-how.html"
          }
        ]
      }
    ],
    "correct_answer": "A"
  }
];
