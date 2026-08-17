// Gemini AI Service for DeepGuard+
// Uses Google Gemini 2.0 Flash for deepfake analysis

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODELS_TO_TRY = [
  'gemini-3.7-flash',
  'gemini-1.5-flash',
  'gemini-1.5-pro'
];

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

  const prompt = `Analyze this image for signs of AI generation. Check systematically and report findings for each:

1. ANATOMY: hands (finger count/joints), ears, teeth, eyes (symmetry, reflections matching light source)
2. TEXT: any rendered text — check for garbling, inconsistent lettering
3. PHYSICS: shadows/reflections consistent with a single light source; perspective consistency of background objects
4. TEXTURE: skin/hair/fabric — look for unnatural smoothness, waxy uniformity, or repeating patterns
5. EDGES: unnatural blending between foreground/background, halo artifacts
6. METADATA: note if EXIF/C2PA data is present or stripped (mention you can't see this from pixels alone)

For each category, state: Consistent / Inconsistent / Inconclusive, with specific evidence.
Then give an overall confidence (Likely AI-generated / Likely authentic / Uncertain) — do NOT express this as a percentage, since visual analysis alone doesn't support a calibrated accuracy number.

Return your analysis as a valid JSON object with this exact structure:
{
  "verdict": "AUTHENTIC" | "MANIPULATED" | "AI_GENERATED",
  "confidence": <number 0-100 (map the overall confidence to a number for internal UI use, but do not explain it as a percentage in the summary)>,
  "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "summary": "<The overall confidence assessment: Likely AI-generated / Likely authentic / Uncertain>",
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
      "title": "<category name: ANATOMY, TEXT, PHYSICS, TEXTURE, EDGES, or METADATA>",
      "description": "<State: Consistent / Inconsistent / Inconclusive, with specific evidence.>",
      "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
      "region": "<area of image affected if applicable>"
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
- The provenanceChain must always start with "Original Image" as step 1.
- heatmapRegions should highlight the most suspicious areas based on your systematic checks.
- Return ONLY valid JSON, no additional text.`;

  const requestBody = JSON.stringify({
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
  });

  let lastError = null;
  let responseData = null;

  for (const model of MODELS_TO_TRY) {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY 
        },
        body: requestBody,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        const errorMessage = error?.error?.message || `HTTP ${response.status}`;
        
        // Fall back on rate limits, overload, or model-not-found
        if (response.status === 429 || response.status === 503 || response.status === 404) {
          console.warn(`[DeepGuard] Model ${model} unavailable (${response.status}): ${errorMessage}. Trying next model...`);
          lastError = new Error(`Gemini API error (${model}): ${errorMessage}`);
          continue;
        }
        
        // Fail immediately on fatal errors (auth, bad request)
        throw new Error(`Gemini API error: ${errorMessage}`);
      }

      responseData = await response.json();
      break; // Success! Exit the fallback loop
    } catch (err) {
      lastError = err;
      console.warn(`[DeepGuard] Failed to call ${model}:`, err.message);
      // Continue to next model on network errors
    }
  }

  if (!responseData) {
    throw lastError || new Error('All Gemini fallback models are currently overloaded. Please try again later.');
  }

  const text = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;

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
