'use client'

import { useState, useEffect } from 'react'

interface ImageLightboxProps {
  src: string
  alt: string
  caption?: string
  category?: string
  date?: string
}

export function ImageLightbox({
  src,
  alt,
  caption,
  category,
  date,
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <div
        className="cursor-zoom-in relative w-full h-full"
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(true) }}
        aria-label={`View full size: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.25s ease-out',
          }}
          onClick={() => setIsOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsOpen(false) }}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10000,
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              borderRadius: '50%',
              width: 44,
              height: 44,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
            aria-label="Close"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Full screen image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'contain',
              display: 'block',
              animation: 'zoomIn 0.3s ease-out',
            }}
          />

          {/* Info bar */}
          {(caption || category || date) && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
                padding: '32px 24px 24px',
                color: 'white',
                zIndex: 10000,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {caption && (
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fde047', marginBottom: 8 }}>
                  {caption}
                </h2>
              )}
              <div style={{ display: 'flex', gap: 16, fontSize: '0.9rem' }}>
                {category && <span>📁 {category}</span>}
                {date && (
                  <span>📅 {new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                )}
              </div>
            </div>
          )}

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes zoomIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </>
  )
}