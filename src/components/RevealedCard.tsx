'use client';

import { RevealedCardProps } from '@/lib/types';

/**
 * RevealedCard - Displays a customizable card with star paper background,
 * editable message, and user-uploaded photo.
 * 
 * This is what the user sees after scratching a card - a beautiful
 * display of their personalized content.
 */
export default function RevealedCard({ data, onClick }: RevealedCardProps) {
  return (
    <div 
      className="revealed-card"
      onClick={onClick}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
        aspectRatio: '3/4',
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        cursor: onClick ? 'pointer' : 'default',
        background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d4c0 50%, #d4c4b0 100%)',
      }}
    >
      {/* Kraft Paper Background with Stars */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 10% 20%, #2d4a3e 2px, transparent 2px),
            radial-gradient(circle at 30% 70%, #2d4a3e 2px, transparent 2px),
            radial-gradient(circle at 50% 30%, #2d4a3e 2px, transparent 2px),
            radial-gradient(circle at 70% 80%, #2d4a3e 2px, transparent 2px),
            radial-gradient(circle at 90% 40%, #2d4a3e 2px, transparent 2px),
            radial-gradient(circle at 20% 90%, #2d4a3e 2px, transparent 2px),
            radial-gradient(circle at 80% 10%, #2d4a3e 2px, transparent 2px),
            radial-gradient(circle at 40% 50%, #2d4a3e 2px, transparent 2px),
            radial-gradient(circle at 60% 60%, #2d4a3e 2px, transparent 2px),
            radial-gradient(circle at 15% 45%, #2d4a3e 1.5px, transparent 1.5px),
            radial-gradient(circle at 85% 55%, #2d4a3e 1.5px, transparent 1.5px),
            radial-gradient(circle at 45% 15%, #2d4a3e 1.5px, transparent 1.5px),
            radial-gradient(circle at 55% 85%, #2d4a3e 1.5px, transparent 1.5px)
          `,
          backgroundSize: '100% 100%',
          opacity: 0.6,
        }}
      />

      {/* Content Container */}
      <div 
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem',
        }}
      >
        {/* Title (Optional) */}
        {data.title && (
          <h2 
            style={{
              fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
              fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
              fontWeight: 300,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '0.5rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            {data.title}
          </h2>
        )}

        {/* Main Message */}
        <h1 
          style={{
            fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
            fontWeight: 400,
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            lineHeight: 1.3,
          }}
        >
          {data.message || 'Your Message Here'}
        </h1>

        {/* Photo Frame */}
        <div 
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div 
            style={{
              width: '100%',
              maxWidth: '280px',
              aspectRatio: '4/3',
              backgroundColor: '#fff',
              padding: '0.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              transform: 'rotate(-2deg)',
            }}
          >
            {data.imageSrc ? (
              <img 
                src={data.imageSrc}
                alt="Custom photo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '0.9rem',
                }}
              >
                Upload a photo
              </div>
            )}
          </div>
        </div>

        {/* Subtitle (Optional) */}
        {data.subtitle && (
          <p 
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              color: '#ffffff',
              textAlign: 'center',
              marginTop: '0.5rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            {data.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}






