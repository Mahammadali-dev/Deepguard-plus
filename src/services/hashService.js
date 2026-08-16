export const generatePerceptualHash = async (imageFile) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(imageFile);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = 8;
      canvas.height = 8;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Failed to get canvas context'));
      
      ctx.drawImage(img, 0, 0, 8, 8);
      const imageData = ctx.getImageData(0, 0, 8, 8);
      const data = imageData.data;
      
      let total = 0;
      const grays = [];
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        grays.push(gray);
        total += gray;
      }
      
      const avg = total / 64;
      const hash = grays.map(g => (g >= avg ? '1' : '0')).join('');
      resolve(hash);
    };
    
    img.onerror = () => reject(new Error('Failed to load image for hashing'));
    img.src = url;
  });
};

export const hashToColorGrid = (hash) => {
  const palette = ['#adc6ff', '#FF3B30', '#ffb595', '#cdc5c1', '#4b8eff', '#ef6719', '#005bc1', '#414755'];
  if (!hash || hash.length !== 64) return Array(64).fill(palette[3]);
  
  return hash.split('').map((bit, index) => {
    return palette[(index + parseInt(bit, 10) * 3) % palette.length];
  });
};

export const hashToHex = (hash) => {
  if (!hash || hash.length !== 64) return '';
  let hex = '';
  for (let i = 0; i < 64; i += 4) {
    hex += parseInt(hash.substring(i, i + 4), 2).toString(16);
  }
  return hex;
};
