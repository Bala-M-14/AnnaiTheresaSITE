'use client'

import Image from 'next/image'
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

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Clickable image */}
      <div
        className="cursor-zoom-in relative w-full h-full"
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setIsOpen(true)
        }}
        aria-label={`View full size: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover block"
          priority={false}
        />
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/95"
            onClick={() => setIsOpen(false)}
            style={{ animation: 'fadeIn 0.25s ease-out' }}
          />

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors duration-200"
            style={{ zIndex: 10001 }}
            aria-label="Close lightbox"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image wrapper — sits above backdrop */}
          <div
            className="relative flex items-center justify-center"
            style={{
              zIndex: 10000,
              width: '100vw',
              height: '100vh',
              padding: (caption || category || date) ? '60px 16px 120px' : '60px 16px 16px',
              animation: 'zoomIn 0.3s ease-out',
              boxSizing: 'border-box',
            }}
            onClick={() => setIsOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                display: 'block',
                borderRadius: '4px',
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Info bar */}
          {(caption || category || date) && (
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-white"
              style={{ zIndex: 10001 }}
            >
              <div className="max-w-4xl mx-auto">
                {caption && (
                  <h2 className="text-xl md:text-2xl font-bold mb-2 text-yellow-300">
                    {caption}
                  </h2>
                )}
                <div className="flex flex-wrap gap-4 text-sm md:text-base">
                  {category && (
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">📁</span>
                      <span className="font-semibold">{category}</span>
                    </div>
                  )}
                  {date && (
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">📅</span>
                      <span>
                        {new Date(date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes zoomIn {
              from { opacity: 0; transform: scale(0.92); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </>
  )
}