'use client'

import Image from 'next/image'
import { useState } from 'react'

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

  return (
    <>
      {/* Clickable image */}
      <div
        className="cursor-pointer relative w-full h-full"
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(true)
          }
        }}
        aria-label={`View full size: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="card-img w-full h-full object-cover block"
          priority={false}
        />
      </div>

      {/* Fullscreen Modal */}
      {isOpen && (
        <>
          {/* Backdrop with fade animation */}
          <div
            className="fixed inset-0 bg-black z-50 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            style={{
              animation: 'fadeIn 0.3s ease-out',
            }}
          />

          {/* Modal Content - Full Screen */}
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center w-screen h-screen overflow-hidden"
            onClick={() => setIsOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-50 text-white hover:text-yellow-400 transition-colors duration-200"
              aria-label="Close lightbox"
            >
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Main Image - Takes up most of screen */}
            <div
              className="relative w-screen h-screen"
              onClick={(e) => e.stopPropagation()}
              style={{
                animation: 'zoomIn 0.4s ease-out',
              }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
                quality={95}
              />
            </div>

            {/* Info Section at bottom */}
            {(caption || category || date) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 md:p-8 text-white">
                <div className="max-w-4xl mx-auto">
                  {caption && (
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-300">
                      {caption}
                    </h2>
                  )}

                  <div className="flex flex-wrap gap-6 text-sm md:text-base">
                    {category && (
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 text-lg">📁</span>
                        <span className="font-semibold">{category}</span>
                      </div>
                    )}

                    {date && (
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 text-lg">📅</span>
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
          </div>

          {/* CSS Animations */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes zoomIn {
              from {
                opacity: 0;
                transform: scale(0.9);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
        </>
      )}
    </>
  )
}
