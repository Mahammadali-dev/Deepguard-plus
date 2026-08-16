import { useState } from 'react';
import { analyzeImage, analyzeVideo } from '../services/geminiService';
import { generatePerceptualHash, hashToColorGrid } from '../services/hashService';
import { saveAnalysis } from '../services/storageService';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const jitter = (base) => base + Math.random() * 800;

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'video/x-matroska'];

export const useAnalysis = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mediaType, setMediaType] = useState('image');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [dnaColors, setDnaColors] = useState([]);
  const [mediaPurged, setMediaPurged] = useState(false);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    
    // Validate file type
    const allowedTypes = mediaType === 'video' ? ALLOWED_VIDEO_TYPES : ALLOWED_IMAGE_TYPES;
    if (!allowedTypes.includes(selectedFile.type)) {
      const allowed = mediaType === 'video' ? 'MP4, MOV, AVI, WebM, MKV' : 'JPG, PNG, WebP, GIF, BMP';
      setError(`Unsupported file type "${selectedFile.type || 'unknown'}". Accepted formats: ${allowed}.`);
      return;
    }

    // Validate file size: 50MB for images, 300MB for videos
    const maxSize = mediaType === 'video' ? 300 * 1024 * 1024 : 50 * 1024 * 1024;
    const maxLabel = mediaType === 'video' ? '300MB' : '50MB';
    if (selectedFile.size > maxSize) {
      setError(`File size exceeds the ${maxLabel} limit.`);
      return;
    }
    
    setFile(selectedFile);
    setError(null);
    setPreview(URL.createObjectURL(selectedFile));
    setAnalysisResult(null);
    setDnaColors([]);
    setProgress(0);
    setMediaPurged(false);
  };

  const runAnalysis = async () => {
    if (!file) {
      setError('No file selected for analysis.');
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    setProgress(0);
    setAnalysisResult(null);
    setMediaPurged(false);
    
    try {
      // Realistic staggered progress
      await delay(jitter(400));
      setProgress(18);
      await delay(jitter(300));
      setProgress(32);
      
      let result;
      if (mediaType === 'image') {
        result = await analyzeImage(file);
      } else {
        result = await analyzeVideo(file);
      }
      
      await delay(jitter(200));
      setProgress(58);
      
      let hash = null;
      let colors = [];
      if (mediaType === 'image') {
        hash = await generatePerceptualHash(file);
        colors = hashToColorGrid(hash);
        setDnaColors(colors);
      }
      
      await delay(jitter(300));
      setProgress(87);
      
      const analysisEntry = {
        id: Date.now().toString(),
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        timestamp: new Date().toISOString(),
        result,
        imageDataUrl: mediaType === 'image' ? preview : null,
        hash
      };
      
      saveAnalysis(analysisEntry);

      await delay(jitter(200));
      setProgress(100);
      await delay(400);

      setAnalysisResult(result);
      setMediaPurged(true);
    } catch (err) {
      setError(err.message || 'Analysis failed. Please check your connection and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setPreview(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setError(null);
    setProgress(0);
    setDnaColors([]);
    setMediaPurged(false);
  };

  return {
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
    resetAnalysis
  };
};
