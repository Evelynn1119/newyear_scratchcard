'use client';

import { useRef, useState } from 'react';
import { CardEditorFormProps } from '@/lib/types';

/**
 * CardEditorForm - Allows users to customize their card content.
 * 
 * Users can:
 * - Edit the message text
 * - Upload their own photo (including HEIC format)
 * - Add title and subtitle
 */
export default function CardEditorForm({ data, onUpdate }: CardEditorFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate({
      ...data,
      message: e.target.value,
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...data,
      title: e.target.value,
    });
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...data,
      subtitle: e.target.value,
    });
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is HEIC/HEIF format
      const isHeic = file.type === 'image/heic' || 
                     file.type === 'image/heif' || 
                     file.name.toLowerCase().endsWith('.heic') || 
                     file.name.toLowerCase().endsWith('.heif');
      
      if (isHeic) {
        setIsConverting(true);
        try {
          // Dynamically import heic2any for client-side conversion
          const heic2any = (await import('heic2any')).default;
          const convertedBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.9,
          });
          
          // heic2any can return a single blob or an array
          const resultBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
          const blobUrl = URL.createObjectURL(resultBlob);
          
          onUpdate({
            ...data,
            imageSrc: blobUrl,
          });
        } catch (error) {
          console.error('Failed to convert HEIC image:', error);
          alert('無法轉換 HEIC 圖片，請嘗試使用其他格式（如 JPG 或 PNG）');
        } finally {
          setIsConverting(false);
        }
      } else {
        // For non-HEIC images, use directly
        const blobUrl = URL.createObjectURL(file);
        onUpdate({
          ...data,
          imageSrc: blobUrl,
        });
      }
    }
  };

  const handleRemovePhoto = () => {
    // Revoke the old blob URL to free memory
    if (data.imageSrc && data.imageSrc.startsWith('blob:')) {
      URL.revokeObjectURL(data.imageSrc);
    }
    onUpdate({
      ...data,
      imageSrc: '',
    });
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div 
      className="card-editor-form"
      style={{
        backgroundColor: '#fff',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%',
      }}
    >
      <h2 
        style={{
          fontFamily: "'Pacifico', cursive",
          fontSize: '1.5rem',
          color: '#e8524a',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        ✨ Customize Your Card
      </h2>

      {/* Title Input */}
      <div style={{ marginBottom: '1rem' }}>
        <label 
          htmlFor="title"
          style={{
            display: 'block',
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 600,
            fontSize: '0.9rem',
            color: '#666',
            marginBottom: '0.5rem',
          }}
        >
          Title (optional)
        </label>
        <input
          type="text"
          id="title"
          value={data.title || ''}
          onChange={handleTitleChange}
          placeholder="e.g., THE LUCKY CHARM"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '2px solid #e0e0e0',
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
        />
      </div>

      {/* Message Input */}
      <div style={{ marginBottom: '1rem' }}>
        <label 
          htmlFor="message"
          style={{
            display: 'block',
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 600,
            fontSize: '0.9rem',
            color: '#666',
            marginBottom: '0.5rem',
          }}
        >
          Message <span style={{ color: '#e8524a' }}>*</span>
        </label>
        <textarea
          id="message"
          value={data.message}
          onChange={handleMessageChange}
          placeholder="e.g., I LOVE YOU !!!"
          rows={3}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '2px solid #e0e0e0',
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '1rem',
            outline: 'none',
            resize: 'vertical',
            minHeight: '80px',
            transition: 'border-color 0.2s',
          }}
        />
      </div>

      {/* Photo Upload */}
      <div style={{ marginBottom: '1rem' }}>
        <label 
          style={{
            display: 'block',
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 600,
            fontSize: '0.9rem',
            color: '#666',
            marginBottom: '0.5rem',
          }}
        >
          Photo <span style={{ color: '#e8524a' }}>*</span>
        </label>
        
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <label
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              backgroundColor: '#fef2f2',
              border: '2px dashed #e8524a',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              textAlign: 'center',
              fontFamily: "'Quicksand', sans-serif",
              fontSize: '0.9rem',
              color: '#e8524a',
              transition: 'all 0.2s',
            }}
          >
            {isConverting ? '⏳ 轉換中...' : `📷 ${data.imageSrc ? 'Change Photo' : 'Upload Photo'}`}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.heic,.heif"
              onChange={handlePhotoChange}
              disabled={isConverting}
              style={{ display: 'none' }}
            />
          </label>
          
          {data.imageSrc && (
            <button
              onClick={handleRemovePhoto}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#fee2e2',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontFamily: "'Quicksand', sans-serif",
                fontSize: '0.9rem',
                color: '#dc2626',
              }}
            >
              ✕ Remove
            </button>
          )}
        </div>
        
        {data.imageSrc && (
          <div 
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem',
              backgroundColor: '#f0fdf4',
              borderRadius: '0.5rem',
              fontSize: '0.8rem',
              color: '#16a34a',
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            ✓ Photo uploaded successfully!
          </div>
        )}
      </div>

      {/* Subtitle Input */}
      <div style={{ marginBottom: '1rem' }}>
        <label 
          htmlFor="subtitle"
          style={{
            display: 'block',
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 600,
            fontSize: '0.9rem',
            color: '#666',
            marginBottom: '0.5rem',
          }}
        >
          Footer text (optional)
        </label>
        <input
          type="text"
          id="subtitle"
          value={data.subtitle || ''}
          onChange={handleSubtitleChange}
          placeholder="e.g., Your 2026 fortune message..."
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '2px solid #e0e0e0',
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
        />
      </div>

      {/* Tips */}
      <div 
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#fef3c7',
          borderRadius: '0.5rem',
          fontSize: '0.8rem',
          color: '#92400e',
          fontFamily: "'Quicksand', sans-serif",
        }}
      >
        <strong>💡 Tips:</strong>
        <ul style={{ margin: '0.5rem 0 0 1rem', paddingLeft: '0.5rem' }}>
          <li>Keep your message short and sweet</li>
          <li>Square or landscape photos work best</li>
          <li>支援 HEIC/HEIF 格式（iPhone 照片）</li>
          <li>The preview updates in real-time!</li>
        </ul>
      </div>
    </div>
  );
}






