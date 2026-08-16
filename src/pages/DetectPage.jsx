import { useState } from 'react';
import MediaTypeSelector from '../components/MediaTypeSelector';
import ImageUploader from '../components/ImageUploader';
import TrustBadge from '../components/TrustBadge';
import LoadingScanner from '../components/LoadingScanner';
import VerdictBadge from '../components/VerdictBadge';
import DetectionVectors from '../components/DetectionVectors';
import ProvenanceChain from '../components/ProvenanceChain';
import DNAFingerprint from '../components/DNAFingerprint';
import HeatmapOverlay from '../components/HeatmapOverlay';
import FindingsPanel from '../components/FindingsPanel';
import ActionButtons from '../components/ActionButtons';
import TrustCertificate from '../components/TrustCertificate';
import PolicyModal from '../components/PolicyModal';
import { securityCompliance } from '../data/policies';
import { useAnalysis } from '../hooks/useAnalysis';

export default function DetectPage() {
  const {
    file,
    preview,
    mediaType,
    setMediaType,
    analysisResult,
    isAnalyzing,
    error,
    progress,
    dnaColors,
    mediaPurged,
    handleFileSelect,
    runAnalysis,
    resetAnalysis,
  } = useAnalysis();

  const [showTrustCenter, setShowTrustCenter] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <main className="flex-grow flex flex-col items-center px-margin-mobile md:px-margin-desktop py-12 max-w-5xl mx-auto w-full">
      {/* Loading Overlay — stable min-height prevents page jumping */}
      {isAnalyzing && (
        <div className="min-h-[420px] w-full flex items-center justify-center">
          <LoadingScanner progress={progress} fileName={file?.name || 'media'} />
        </div>
      )}

      {/* === UPLOAD STATE === */}
      {!analysisResult && !isAnalyzing && (
        <>
          <div className="text-center mb-10 animate-fade-in-up">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
              Upload Media for Analysis
            </h1>
            <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">
              Securely submit image or video files. Our advanced forensic algorithms
              will detect anomalies and synthetic manipulations.
            </p>
          </div>

          {/* Media Type Selection */}
          <MediaTypeSelector selected={mediaType} onSelect={setMediaType} />

          {/* Error Banner */}
          {error && (
            <div className="w-full mt-6 bg-error/10 border border-error/20 rounded-lg p-4 flex items-start gap-3 animate-fade-in-up">
              <span className="material-symbols-outlined text-error mt-0.5">error</span>
              <div className="flex-1">
                <h4 className="font-label-lg text-label-lg text-error mb-1">Analysis Error</h4>
                <p className="font-body-sm text-body-sm text-error/80">{error}</p>
              </div>
              <button onClick={() => resetAnalysis()} className="text-error/60 hover:text-error transition-colors">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          )}

          {/* Upload Zone - hidden after file is selected */}
          {!preview && (
            <div className="w-full mt-8 min-h-[280px]">
              <ImageUploader
                onFileSelect={handleFileSelect}
                mediaType={mediaType}
                disabled={isAnalyzing}
              />
            </div>
          )}

          {/* Preview & Analyze */}
          {preview && (
            <div className="w-full mt-8 animate-fade-in-up">
              <div className="bg-surface border border-outline rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-primary">
                    {mediaType === 'image' ? 'image' : 'movie'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-lg text-label-lg text-on-surface truncate">
                      {file?.name}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {(file?.size / (1024 * 1024)).toFixed(2)} MB • {file?.type}
                    </p>
                  </div>
                  <button
                    onClick={resetAnalysis}
                    className="text-on-surface-variant hover:text-error transition-colors active:scale-90"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                {mediaType === 'image' && (
                  <img
                    src={preview}
                    alt="Upload preview"
                    className="w-full max-h-64 object-contain rounded-lg border border-outline"
                  />
                )}

                {mediaType === 'video' && (
                  <video
                    src={preview}
                    controls
                    className="w-full max-h-64 rounded-lg border border-outline"
                  />
                )}
              </div>

              {/* Analyze Button */}
              <div className="mt-6 flex flex-col items-center">
                <button
                  onClick={runAnalysis}
                  className="bg-inverse-primary text-white font-label-lg text-label-lg px-8 py-4 rounded-lg flex items-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all duration-200 shadow-lg active:scale-95"
                >
                  <span className="material-symbols-outlined text-xl">troubleshoot</span>
                  Analyze Media
                </button>
                <p className="font-label-md text-label-md text-outline-variant mt-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  End-to-end encrypted transfer
                </p>
              </div>
            </div>
          )}

          {/* Trust Badge */}
          <div className="mt-10">
            <TrustBadge onClick={() => setShowTrustCenter(true)} />
          </div>
        </>
      )}

      {/* === RESULTS STATE === */}
      {analysisResult && !isAnalyzing && (
        <div className="w-full animate-fade-in-up">
          {/* Header & Verdict */}
          <header className="flex flex-col gap-4 border-b border-outline pb-6 mb-8">
            <div className="flex justify-between items-start flex-col md:flex-row gap-4">
              <div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
                  Forensic Analysis Results
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  File: <span className="font-code text-code">{file?.name || 'Unknown'}</span>
                </p>
              </div>
              <VerdictBadge
                verdict={analysisResult.verdict}
                confidence={analysisResult.confidence}
                riskLevel={analysisResult.riskLevel}
              />
            </div>
          </header>

          {/* Media Purged Confirmation */}
          {mediaPurged && (
            <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-center gap-3 animate-fade-in-up">
              <span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>
              <p className="font-label-md text-label-md text-green-400">
                Media successfully purged from server memory. Zero data retained.
              </p>
            </div>
          )}

          {/* Summary */}
          {analysisResult.summary && (
            <div className="bg-surface border border-outline rounded p-6 mb-6">
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">summarize</span>
                Executive Summary
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {analysisResult.summary}
              </p>
            </div>
          )}

          {/* Heatmap */}
          {preview && analysisResult.heatmapRegions && (
            <div className="mb-6">
              <HeatmapOverlay
                imageSrc={preview}
                regions={analysisResult.heatmapRegions}
              />
            </div>
          )}

          {/* Detection Vectors + Provenance Chain */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {analysisResult.detectionVectors && (
              <DetectionVectors vectors={analysisResult.detectionVectors} />
            )}
            {analysisResult.provenanceChain && (
              <ProvenanceChain chain={analysisResult.provenanceChain} />
            )}
          </div>

          {/* DNA Fingerprint */}
          {dnaColors && dnaColors.length > 0 && (
            <div className="mb-6">
              <DNAFingerprint
                colors={dnaColors}
                hash={analysisResult.technicalDetails?.estimatedTool || 'N/A'}
              />
            </div>
          )}

          {/* Findings */}
          {analysisResult.findings && analysisResult.findings.length > 0 && (
            <div className="mb-6">
              <FindingsPanel findings={analysisResult.findings} />
            </div>
          )}

          {/* Actions */}
          <div className="mb-6">
            <ActionButtons
              onDownloadCertificate={() => setShowCertificate(true)}
              onFlagIsolate={() => alert('Media flagged and isolated for review.')}
              dnaColors={dnaColors}
            />
          </div>

          {/* Trust Certificate Modal */}
          {showCertificate && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                 onClick={() => setShowCertificate(false)}>
              <div className="max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                   onClick={(e) => e.stopPropagation()}>
                <TrustCertificate
                  analysisResult={analysisResult}
                  fileName={file?.name}
                  hash={analysisResult.technicalDetails?.estimatedTool || ''}
                  dnaColors={dnaColors}
                />
                <button
                  onClick={() => setShowCertificate(false)}
                  className="mt-4 w-full bg-surface border border-outline text-on-surface font-label-lg py-3 rounded-lg hover:bg-surface-variant transition-all active:scale-[0.98]"
                >
                  Close Certificate
                </button>
              </div>
            </div>
          )}

          {/* New Analysis Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={resetAnalysis}
              className="bg-surface border border-outline text-on-surface font-label-lg text-label-lg px-8 py-3 rounded-lg hover:bg-surface-variant transition-all flex items-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined">refresh</span>
              New Analysis
            </button>
          </div>
        </div>
      )}

      {/* Trust Center Modal */}
      <PolicyModal
        isOpen={showTrustCenter}
        onClose={() => setShowTrustCenter(false)}
        policy={securityCompliance}
      />
    </main>
  );
}
