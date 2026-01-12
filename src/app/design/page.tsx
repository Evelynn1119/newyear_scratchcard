'use client';

import { useState } from 'react';
import CardEditorForm from '@/components/CardEditorForm';
import RevealedCard from '@/components/RevealedCard';
import { CustomCardData } from '@/lib/types';

/**
 * Design Page - Live preview editor for customizing cards.
 * 
 * Layout: Editor form on the left, live preview on the right.
 * Users can see their changes in real-time as they edit.
 */
export default function DesignPage() {
  // State for card data - this is what the user customizes
  const [cardData, setCardData] = useState<CustomCardData>({
    id: 'day-1',
    message: 'I LOVE YOU !!!',
    imageSrc: '',
    title: 'THE LUCKY CHARM',
    subtitle: 'Your 2026 fortune: Strength and grace.',
  });

  // Handler for updates from the editor form
  const handleUpdate = (newData: CustomCardData) => {
    setCardData(newData);
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: '#fef7f0',
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(232, 82, 74, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)
        `,
      }}
    >
      {/* Header */}
      <header 
        style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(232, 82, 74, 0.1)',
          backgroundColor: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: '1.8rem',
              color: '#e8524a',
              margin: 0,
            }}
          >
            ✨ Card Designer
          </h1>
          <a 
            href="/"
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: '0.9rem',
              color: '#e8524a',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              border: '2px solid #e8524a',
              borderRadius: '2rem',
              transition: 'all 0.2s',
            }}
          >
            ← Back to Cards
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem',
        }}
      >
        {/* Intro */}
        <div 
          style={{
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          <h2 
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '1.8rem',
              color: '#666',
              marginBottom: '0.5rem',
            }}
          >
            Create your personalized card
          </h2>
          <p 
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: '1rem',
              color: '#888',
            }}
          >
            Edit on the left, preview on the right ✨
          </p>
        </div>

        {/* Editor + Preview Layout */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Editor Form */}
          <div>
            <CardEditorForm 
              data={cardData} 
              onUpdate={handleUpdate} 
            />
          </div>

          {/* Right: Live Preview */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'sticky',
              top: '100px',
            }}
          >
            <h3 
              style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: '1rem',
                color: '#888',
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              📱 Live Preview
            </h3>
            <RevealedCard data={cardData} />
            
            {/* Download/Export hint */}
            <p 
              style={{
                marginTop: '1rem',
                fontFamily: "'Quicksand', sans-serif",
                fontSize: '0.85rem',
                color: '#aaa',
                textAlign: 'center',
              }}
            >
              Your changes are saved automatically
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div 
          style={{
            marginTop: '3rem',
            padding: '2rem',
            backgroundColor: '#fff',
            borderRadius: '1rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <h3 
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: '1.3rem',
              color: '#e8524a',
              marginBottom: '1rem',
            }}
          >
            How it works
          </h3>
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              { icon: '✏️', title: 'Edit Text', desc: 'Type your custom message and title' },
              { icon: '📷', title: 'Upload Photo', desc: 'Add your favorite memory' },
              { icon: '👀', title: 'Preview', desc: 'See changes in real-time' },
              { icon: '🎁', title: 'Share', desc: 'Send your personalized card!' },
            ].map((step, i) => (
              <div 
                key={i}
                style={{
                  textAlign: 'center',
                  padding: '1rem',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{step.icon}</div>
                <h4 
                  style={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#333',
                    marginBottom: '0.25rem',
                  }}
                >
                  {step.title}
                </h4>
                <p 
                  style={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: '0.85rem',
                    color: '#888',
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer 
        style={{
          padding: '2rem',
          textAlign: 'center',
          marginTop: '2rem',
        }}
      >
        <p 
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: '1.2rem',
            color: '#e8524a',
          }}
        >
          xoxo ✨
        </p>
      </footer>
    </div>
  );
}




