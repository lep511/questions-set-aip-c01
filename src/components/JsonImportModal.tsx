import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileCode, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  BookOpen, 
  Layers,
  Sparkles,
  FileText
} from 'lucide-react';
import { NormalizedQuestion, RawQuestion } from '../types';
import { normalizeQuestions, DEFAULT_AWS_EXAM_JSON } from '../data/defaultExam';
import { SAMPLE_ML_EXAM_JSON, SAMPLE_WEB_EXAM_JSON } from '../data/samplePresets';

interface JsonImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadQuestions: (questions: NormalizedQuestion[], examTitle?: string) => void;
  currentCount: number;
}

export const JsonImportModal: React.FC<JsonImportModalProps> = ({
  isOpen,
  onClose,
  onLoadQuestions,
  currentCount,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'presets'>('upload');
  const [jsonText, setJsonText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const processJsonData = (rawText: string, title?: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const parsed = JSON.parse(rawText);
      const normalized = normalizeQuestions(parsed);

      if (normalized.length === 0) {
        throw new Error("The JSON array does not contain any questions.");
      }

      onLoadQuestions(normalized, title);
      setSuccessMessage(`Successfully loaded ${normalized.length} questions!`);
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err: any) {
      setErrorMessage(err?.message || "Invalid JSON format. Please check the structure and try again.");
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      setErrorMessage("Please select a valid .json file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        processJsonData(content, file.name.replace('.json', ''));
      }
    };
    reader.onerror = () => {
      setErrorMessage("Failed to read file.");
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handlePasteSubmit = () => {
    if (!jsonText.trim()) {
      setErrorMessage("Please paste JSON text into the box.");
      return;
    }
    processJsonData(jsonText, "Custom Pasted Exam");
  };

  const handleDownloadSample = () => {
    const sample = [
      {
        "question": "What is the primary vector search engine option in AWS for generative AI RAG applications?",
        "options": [
          {
            "id": "A",
            "text": "Amazon OpenSearch Serverless with vector engine",
            "explanation": "OpenSearch Serverless provides managed vector collections with low operational overhead.",
            "references": [
              {
                "title": "OpenSearch Serverless Docs",
                "url": "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless.html"
              }
            ]
          },
          {
            "id": "B",
            "text": "Amazon Simple Queue Service (SQS)",
            "explanation": "SQS is a message broker service, not a vector store."
          }
        ],
        "correct_answer": "A"
      }
    ];

    const blob = new Blob([JSON.stringify(sample, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-exam-schema.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#12141A] border border-[#1F2430] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#D1D5DB]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#1F2430] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-[#F3F4F6] flex items-center gap-2">
              <FileCode className="w-5 h-5 text-[#C5A059]" />
              <span>Load JSON Exam Files</span>
            </h3>
            <p className="text-xs text-[#9CA3AF]">
              Upload custom question banks or select from curated presets
            </p>
          </div>

          <button
            id="close-import-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#161922] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="px-4 pt-3 border-b border-[#1F2430] flex items-center gap-2">
          <button
            id="tab-upload-btn"
            onClick={() => { setActiveTab('upload'); setErrorMessage(null); }}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'upload'
                ? 'border-[#C5A059] text-[#DFB76C]'
                : 'border-transparent text-[#9CA3AF] hover:text-[#F3F4F6]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              Upload .JSON File
            </span>
          </button>

          <button
            id="tab-paste-btn"
            onClick={() => { setActiveTab('paste'); setErrorMessage(null); }}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'paste'
                ? 'border-[#C5A059] text-[#DFB76C]'
                : 'border-transparent text-[#9CA3AF] hover:text-[#F3F4F6]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Paste JSON Text
            </span>
          </button>

          <button
            id="tab-presets-btn"
            onClick={() => { setActiveTab('presets'); setErrorMessage(null); }}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'presets'
                ? 'border-[#C5A059] text-[#DFB76C]'
                : 'border-transparent text-[#9CA3AF] hover:text-[#F3F4F6]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Sample Presets
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Alerts */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Error loading JSON</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <p className="font-semibold">{successMessage}</p>
            </div>
          )}

          {/* TAB 1: File Upload (Drag & Drop + Input) */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3 ${
                  isDragging
                    ? 'border-[#C5A059] bg-[#C5A059]/10'
                    : 'border-[#1F2430] hover:border-[#C5A059]/50 bg-[#161922]/50'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 text-[#DFB76C] flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#F3F4F6]">
                    Click to browse or drag and drop your .json file here
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-1">
                    Supports exams with single & multiple choice, option explanations, and documentation links.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#9CA3AF]">Need the schema reference?</span>
                <button
                  onClick={handleDownloadSample}
                  className="text-xs text-[#DFB76C] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Sample Schema .json
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Raw JSON Paste */}
          {activeTab === 'paste' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#D1D5DB] mb-1">
                  Paste JSON Array:
                </label>
                <textarea
                  id="json-textarea-input"
                  rows={9}
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  placeholder={`[\n  {\n    "question": "Sample Question...",\n    "options": [\n      { "id": "A", "text": "Option 1", "explanation": "Why this is right/wrong" },\n      { "id": "B", "text": "Option 2" }\n    ],\n    "correct_answer": "A"\n  }\n]`}
                  className="w-full font-mono text-xs p-3 rounded-xl border border-[#1F2430] bg-[#0E1015] text-[#F3F4F6] focus:outline-hidden focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  id="submit-pasted-json-btn"
                  onClick={handlePasteSubmit}
                  className="px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#DFB76C] text-[#0A0B0E] text-xs font-bold shadow-lg shadow-[#C5A059]/20 transition cursor-pointer"
                >
                  Parse & Load Exam
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Curated Presets */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <div 
                onClick={() => processJsonData(JSON.stringify(DEFAULT_AWS_EXAM_JSON), "AWS GenAI Certification Set")}
                className="p-4 rounded-xl border border-[#1F2430] bg-[#161922] hover:border-[#C5A059]/50 cursor-pointer transition flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-bold text-sm text-[#F3F4F6] flex items-center gap-2">
                    <span>AWS Certified Generative AI Exam</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#C5A059]/20 text-[#DFB76C] text-[10px] font-mono">
                      {DEFAULT_AWS_EXAM_JSON.length} Questions
                    </span>
                  </h4>
                  <p className="text-xs text-[#9CA3AF] mt-1">
                    Bedrock, OpenSearch, RAG reranking, KMS security, Multimodal Converse API, Prompt Management, Agent Memory, Model Distillation, and Guardrails.
                  </p>
                </div>
                <button className="shrink-0 px-3.5 py-1.5 rounded-lg bg-[#C5A059] text-[#0A0B0E] text-xs font-bold shadow-xs">
                  Load
                </button>
              </div>

              <div 
                onClick={() => processJsonData(JSON.stringify(SAMPLE_ML_EXAM_JSON), "Machine Learning Core Concepts")}
                className="p-4 rounded-xl border border-[#1F2430] bg-[#161922] hover:border-[#C5A059]/50 cursor-pointer transition flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-bold text-sm text-[#F3F4F6] flex items-center gap-2">
                    <span>Machine Learning Fundamentals</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#1F2430] text-[#D1D5DB] text-[10px] font-mono">
                      Sample
                    </span>
                  </h4>
                  <p className="text-xs text-[#9CA3AF] mt-1">
                    Activation functions, regularization, overfitting mitigation, and training techniques.
                  </p>
                </div>
                <button className="shrink-0 px-3.5 py-1.5 rounded-lg bg-[#1F2430] hover:bg-[#2A3244] text-[#D1D5DB] text-xs font-semibold">
                  Load
                </button>
              </div>

              <div 
                onClick={() => processJsonData(JSON.stringify(SAMPLE_WEB_EXAM_JSON), "Frontend & React Deep Dive")}
                className="p-4 rounded-xl border border-[#1F2430] bg-[#161922] hover:border-[#C5A059]/50 cursor-pointer transition flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-bold text-sm text-[#F3F4F6] flex items-center gap-2">
                    <span>Frontend & React Concepts</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#1F2430] text-[#D1D5DB] text-[10px] font-mono">
                      Sample
                    </span>
                  </h4>
                  <p className="text-xs text-[#9CA3AF] mt-1">
                    React performance hooks, state management, and modern component patterns.
                  </p>
                </div>
                <button className="shrink-0 px-3.5 py-1.5 rounded-lg bg-[#1F2430] hover:bg-[#2A3244] text-[#D1D5DB] text-xs font-semibold">
                  Load
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
