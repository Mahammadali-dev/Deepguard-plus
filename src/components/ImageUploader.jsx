import React, { useRef, useState } from 'react';

const ImageUploader = ({ onFileSelect, mediaType = 'image', disabled = false }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const acceptedTypes = mediaType === 'video' ? 'video/mp4,video/quicktime,video/x-msvideo' : 'image/jpeg,image/png,image/webp';
  const badges = mediaType === 'video' ? ['MP4', 'MOV', 'AVI'] : ['JPG', 'PNG', 'WEBP'];
  const maxSize = mediaType === 'video' ? 'Max file size: 300MB' : 'Max file size: 50MB';

  return (
    <div
      className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-200 p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[300px]
        ${isDragActive ? 'border-primary bg-primary/10' : 'border-outline hover:border-primary/50 bg-surface/50'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedTypes}
        className="hidden"
        disabled={disabled}
      />
      
      <div className={`w-16 h-16 rounded-full bg-surface border border-outline flex items-center justify-center mb-6 transition-colors ${isDragActive ? 'text-primary border-primary' : 'text-on-surface'}`}>
        <span className="material-symbols-outlined text-3xl">
          cloud_upload
        </span>
      </div>

      <h3 className="text-xl font-medium text-on-surface mb-2">
        Drag & Drop files here
      </h3>
      <p className="text-on-surface opacity-70 mb-6">
        or click to browse
      </p>

      <div className="flex space-x-2 mb-4">
        {badges.map(badge => (
          <span key={badge} className="px-2 py-1 text-xs rounded bg-surface border border-outline text-on-surface opacity-80">
            {badge}
          </span>
        ))}
      </div>

      <p className="text-xs text-on-surface opacity-50">
        {maxSize}
      </p>
    </div>
  );
};

export default ImageUploader;
