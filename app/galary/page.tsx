// This component is rendered on the server so that async data fetching
// can work. It does not need to be a client component.

import Image from "next/image"
import { client } from "@/sanity/lib/client"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source).width(800).auto("format").url()
}

interface GalleryImage {
  _id: string
  caption: string
  category: string
  date: string
  image: SanityImageSource
}

async function getGallery() {
  return client.fetch<GalleryImage[]>(`
    *[_type == "galleryImage"] | order(date desc){
      _id,
      caption,
      category,
      date,
      image
    }
  `)
}

export default async function Gallery() {
  const items = await getGallery()

  return (
    <main className="min-h-screen bg-white">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatBounce {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes galleryPop {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }

        .hero-text    { animation: fadeIn 0.8s ease-out forwards; }
        .float-icon   { display: inline-block; animation: floatBounce 2.4s ease-in-out infinite; }

        .gallery-item {
          opacity: 0;
          animation: galleryPop 0.7s ease-out forwards;
        }
        .gallery-item:nth-child(1)  { animation-delay: 0.05s; }
        .gallery-item:nth-child(2)  { animation-delay: 0.12s; }
        .gallery-item:nth-child(3)  { animation-delay: 0.19s; }
        .gallery-item:nth-child(4)  { animation-delay: 0.26s; }
        .gallery-item:nth-child(5)  { animation-delay: 0.33s; }
        .gallery-item:nth-child(6)  { animation-delay: 0.40s; }
        .gallery-item:nth-child(7)  { animation-delay: 0.47s; }
        .gallery-item:nth-child(8)  { animation-delay: 0.54s; }
        .gallery-item:nth-child(9)  { animation-delay: 0.61s; }
        .gallery-item:nth-child(n+10) { animation-delay: 0.65s; }

        /* Tilted border polaroid effect */
        .gallery-item:nth-child(odd)  { transform-origin: center; }
        .gallery-item:nth-child(3n+1) { --card-rotate:  1.2deg; }
        .gallery-item:nth-child(3n+2) { --card-rotate: -1.4deg; }
        .gallery-item:nth-child(3n)   { --card-rotate:  0.8deg; }

        .card-inner {
          transform: rotate(var(--card-rotate, 1deg));
          transition: transform 0.45s cubic-bezier(.34,1.56,.64,1),
                      box-shadow 0.45s ease;
        }
        .gallery-item:hover .card-inner {
          transform: rotate(0deg) scale(1.04);
          box-shadow: 0 24px 56px rgba(0,0,0,0.22);
        }

        /* Image zoom on hover */
        .card-img { transition: transform 0.55s ease; }
        .gallery-item:hover .card-img { transform: scale(1.07); }

        /* Shine overlay */
        .card-shine::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          pointer-events: none;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.4s;
        }
        .gallery-item:hover .card-shine::after { opacity: 1; }

        /* Category badge colors */
        .badge { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.08em;
                 text-transform: uppercase; padding: 2px 10px; border-radius: 999px; }
      `}</style>

      {/* ── HERO HEADER ─────────────────────────────────────────────────── */}
      <header className="relative bg-[#18253f] text-white pt-6 pb-32 px-6 overflow-hidden">

        {/* Subtle dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#ff6a3d]/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-8 -left-16 w-80 h-80 rounded-full bg-[#f5a623]/10 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-4xl mx-auto text-center hero-text">
          {/* Breadcrumb pill */}
          <div className="inline-flex items-center gap-2 bg-[#ff6a3d]/15 border border-[#ff6a3d]/35 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#ff6a3d] text-xs font-bold uppercase tracking-widest">
              Our Memories
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            School{" "}
            <span className="text-[#ff6a3d]">Gallery</span>{" "}
            <span className="float-icon" aria-hidden="true">📷</span>
          </h1>

          <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            A living scrapbook of moments — celebrations, learning, and the
            everyday joy that makes our school special.
          </p>

          {/* Decorative dots */}
          <div className="flex justify-center gap-2 mt-8" aria-hidden="true">
            {(["#ff6a3d", "#f5a623", "#e94fa0", "#4caf7d", "#7c5cbf"] as const).map(
              (c, i) => (
                <div
                  key={i}
                  className="float-icon w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: c, animationDelay: `${i * 0.18}s` }}
                />
              )
            )}
          </div>
        </div>

        {/* Wave at bottom of hero */}
        <div className="absolute bottom-0 left-0 w-full" aria-hidden="true">
          <svg viewBox="0 0 1440 120" className="w-full h-[120px]" preserveAspectRatio="none">
            <path
              fill="#ffffff"
              d="M0,80 C300,120 600,0 900,60 C1200,120 1440,40 1440,40 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </header>

      {/* ── GALLERY GRID ─────────────────────────────────────────────────── */}
      <section className="relative bg-white">
        <div className="max-w-6xl mx-auto px-6 -mt-6 pb-24">

          {items.length === 0 ? (
            /* Empty state */
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🖼️</div>
              <h2 className="text-2xl font-bold text-[#18253f] mb-2">No photos yet</h2>
              <p className="text-gray-500">Check back soon — memories are being added!</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {items.map((img) => (
                <div key={img._id} className="gallery-item break-inside-avoid">
                  <div
                    className="card-inner bg-white rounded-[20px] overflow-hidden"
                    style={{
                      boxShadow: "0 8px 28px rgba(0,0,0,0.13)",
                      border: "4px solid #facc15", /* yellow-400 — matches site */
                    }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden card-shine">
                      <Image
                        src={urlFor(img.image)}
                        alt={img.caption || "School photo"}
                        width={800}
                        height={600}
                        className="card-img w-full h-auto object-cover block"
                      />

                      {/* Category badge overlaid on image */}
                      {img.category && (
                        <div className="absolute top-3 left-3">
                          <span
                            className="badge text-white"
                            style={{ backgroundColor: "#ff6a3d" }}
                          >
                            {img.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Caption */}
                    <div className="px-4 py-3">
                      {img.caption && (
                        <p className="text-sm font-bold text-[#18253f] leading-snug mb-1">
                          {img.caption}
                        </p>
                      )}
                      {img.date && (
                        <p className="text-xs text-gray-400 font-medium">
                          📅{" "}
                          {new Date(img.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER CTA ────────────────────────────────────────────────────── */}
      <div className="bg-white" aria-hidden="true">
        <svg viewBox="0 0 1440 60" className="w-full h-[60px]" preserveAspectRatio="none">
          <path fill="#18253f" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      <section className="bg-[#18253f] py-14 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-yellow-300 font-semibold text-sm md:text-base leading-relaxed">
            <span className="text-xl" aria-hidden="true">🌟 </span>
            Every photo tells a story of curiosity, joy, and growth at Annai
            Theresa Matriculation Higher Secondary School.
            <span className="text-xl" aria-hidden="true"> 🌟</span>
          </p>
        </div>
      </section>
    </main>
  )
}