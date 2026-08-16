export const STORAGE_KEY = 'deepguard_history';

export const getHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading history from localStorage', error);
    return [];
  }
};

export const saveAnalysis = (analysis) => {
  try {
    const history = getHistory();
    
    // Strip large Base64 dataURL to prevent localStorage QuotaExceededError (5MB limit)
    const { imageDataUrl, ...safeAnalysis } = analysis;

    const newHistory = [safeAnalysis, ...history].slice(0, 50); // FIFO up to 50 items
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return safeAnalysis;
  } catch (error) {
    console.error('Error saving analysis to localStorage', error);
    return null;
  }
};

export const getAnalysisById = (id) => {
  const history = getHistory();
  return history.find(item => item.id === id) || null;
};

export const deleteAnalysis = (id) => {
  try {
    const history = getHistory();
    const newHistory = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Error deleting analysis', error);
  }
};

export const clearHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing history', error);
  }
};

export const getStats = () => {
  const history = getHistory();
  const total = history.length;
  
  let authentic = 0;
  let manipulated = 0;
  let aiGenerated = 0;
  let totalConfidence = 0;

  history.forEach(item => {
    const classification = item.result?.classification?.toLowerCase() || '';
    if (classification === 'authentic') authentic++;
    else if (classification === 'manipulated') manipulated++;
    else if (classification === 'ai_generated' || classification === 'aigenerated') aiGenerated++;
    
    totalConfidence += item.result?.confidence || 0;
  });

  const averageConfidence = total > 0 ? (totalConfidence / total) : 0;

  return { total, authentic, manipulated, aiGenerated, averageConfidence };
};
