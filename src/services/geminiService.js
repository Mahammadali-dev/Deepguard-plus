// Gemini AI Service for DeepGuard+
// Uses Google Gemini 2.0 Flash for deepfake analysis

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent';

/**
 * Convert a File/Blob to base64 string
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Extract JSON from Gemini's response (handles markdown code blocks)
 */
const extractJSON = (text) => {
  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // Extract from markdown code block
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1].trim());
      } catch {
        // Fallback: try to find JSON object in text
        const objMatch = text.match(/\{[\s\S]*\}/);
        if (objMatch) {
          return JSON.parse(objMatch[0]);
        }
      }
    }
    throw new Error('Failed to parse AI response as JSON');
  }
};

/**
 * Analyze an image for deepfake detection
 * Returns structured forensic analysis data
 */
export const analyzeImage = async (file) => {
  if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    throw new Error('Please set your Gemini API key in the .env file (VITE_GEMINI_API_KEY)');
  }

  const base64Image = await fileToBase64(file);
  const mimeType = file.type || 'image/jpeg';

  const prompt = `You are DeepGuard+, an advanced AI forensic analyst specializing in detecting manipulated and AI-generated media. Analyze this image with extreme precision.

Return your analysis as a valid JSON object with this exact structure:
{
  "verdict": "AUTHENTIC" | "MANIPULATED" | "AI_GENERATED",
  "confidence": <number 0-100>,
  "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "summary": "<2-3 sentence executive summary>",
  "detectionVectors": {
    "faceManipulation": <number 0-100>,
    "syntheticTexture": <number 0-100>,
    "lightingInconsistency": <number 0-100>,
    "compressionArtifacts": <number 0-100>,
    "metadataAnomaly": <number 0-100>,
    "edgeBlending": <number 0-100>
  },
  "findings": [
    {
      "title": "<finding title>",
      "description": "<detailed explanation>",
      "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
      "region": "<area of image affected>"
    }
  ],
  "heatmapRegions": [
    {
      "x": <0-100 percentage from left>,
      "y": <0-100 percentage from top>,
      "radius": <size 5-40>,
      "intensity": <0.0-1.0>
    }
  ],
  "provenanceChain": [
    {
      "step": <number>,
      "action": "<what happened>",
      "detail": "<explanation>",
      "icon": "image" | "face" | "auto_fix_high" | "content_copy" | "brush" | "tune" | "crop" | "palette",
      "isAlert": <boolean - true if this step indicates manipulation>
    }
  ],
  "technicalDetails": {
    "estimatedTool": "<suspected tool or model used>",
    "generationModel": "<if AI generated, suspected model>",
    "editComplexity": "SIMPLE" | "MODERATE" | "COMPLEX" | "PROFESSIONAL",
    "estimatedAge": "<how old the manipulation appears>"
  }
}

IMPORTANT RULES:
- Be thorough but accurate. Don't exaggerate findings.
- The provenanceChain must always start with "Original Image" as step 1.
- heatmapRegions should highlight the most suspicious areas.
- Return ONLY valid JSON, no additional text.`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'x-goog-api-key': API_KEY 
    },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType,
              data: base64Image,
            },
          },
        ],
      }],
      generationConfig: {
        temperature: 0.3,
        topK: 20,
        topP: 0.8,
        maxOutputTokens: 4096,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message || `Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('Empty response from Gemini API');
  }

  return extractJSON(text);
};

/**
 * Analyze a video frame (extracts first frame as image)
 */
export const analyzeVideo = async (file) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    video.preload = 'metadata';
    video.muted = true;

    video.onloadeddata = () => {
      video.currentTime = 1; // Skip to 1 second
    };

    video.onseeked = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      canvas.toBlob(async (blob) => {
        try {
          const imageFile = new File([blob], 'video-frame.jpg', { type: 'image/jpeg' });
          const result = await analyzeImage(imageFile);
          resolve(result);
        } catch (err) {
          reject(err);
        }
        URL.revokeObjectURL(video.src);
      }, 'image/jpeg', 0.95);
    };

    video.onerror = () => {
      reject(new Error('Failed to load video'));
      URL.revokeObjectURL(video.src);
    };

    video.src = URL.createObjectURL(file);
  });
};
