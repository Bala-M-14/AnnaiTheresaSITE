import { client } from "@/sanity/lib/client"
import Image from "next/image"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

// ── Types ──────────────────────────────────────────────────────────────────
interface GalleryImage {
  _id: string
  caption: string
  category: string
  date: string
  image: SanityImageSource
}

// ── Sanity helpers ─────────────────────────────────────────────────────────
const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source).url()
}

async function getImages(): Promise<GalleryImage[]> {
  return client.fetch(`
    *[_type == "galleryImage"] | order(date desc) {
      _id,
      caption,
      category,
      date,
      image
    }
  `)
}

// ── Reusable styled image card ─────────────────────────────────────────────
interface SchoolImageProps {
  src: string
  alt: string
  width: number
  height: number
  rotate?: "cw" | "ccw"
  priority?: boolean
  className?: string
}

function SchoolImage({
  src,
  alt,
  width,
  height,
  rotate = "cw",
  priority = false,
  className = "",
}: SchoolImageProps) {
  const rotateCls =
    rotate === "cw"
      ? "rotate-1 hover:-rotate-1"
      : "-rotate-1 hover:rotate-1"

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={`
        rounded-[24px] md:rounded-[28px]
        border-[5px] md:border-[6px] border-yellow-400
        shadow-[0_12px_30px_rgba(0,0,0,0.2)]
        bg-white p-1
        ${rotateCls}
        transition-all duration-500
        hover:scale-105
        school-image-fadein
        ${className}
      `}
    />
  )
}

// ── Nav items ──────────────────────────────────────────────────────────────
const NAV_ITEMS = ["Home", "Achievements", "About Us", "Academics", "Contact"]

// ── Page ───────────────────────────────────────────────────────────────────
export default async function Home() {
  const images = await getImages()

  return (
    <>
      {/* Inline keyframe definition — works without touching tailwind.config */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .school-image-fadein {
          opacity: 0;
          animation: fadeIn 0.9s ease-in-out forwards;
        }
      `}</style>

      <div className="relative">

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <header className="relative bg-[#18253f] text-white py-24 px-6 pt-6">

          {/* Background texture image */}
          <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none" aria-hidden="true">
            <Image
              src="/sclfrn.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Nav + Logo + Title */}
          <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">

            {/* Nav */}
            <nav aria-label="Main navigation" className="w-full mb-6">
              <ul className="flex justify-center flex-wrap gap-x-3 gap-y-2" role="list">
                {NAV_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="
                      text-sm font-bold text-gray-300 cursor-pointer
                      border border-[#ff6a3d]/50 rounded-full px-3 py-1
                      transition-colors duration-200
                      hover:bg-[#ff6a3d] hover:text-white hover:border-[#ff6a3d]
                      md:border-2 md:border-[#ff6a3d] md:px-5 md:py-2
                    "
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </nav>

            <Image
              src="/image.png"
              alt="ATMHS Logo"
              width={220}
              height={80}
              priority
              className="mb-6 w-[160px] md:w-[220px]"
            />

            <h1 className="text-xl sm:text-2xl md:text-4xl font-arabic font-bold mb-4 leading-snug px-2">
              <span className="text-[#ff6a3d]">ANNAI THERESA </span>
              MATRICULATION HIGHER SECONDARY SCHOOL
            </h1>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 w-full" aria-hidden="true">
            <svg viewBox="0 0 1440 120" className="w-full h-[120px]" preserveAspectRatio="none">
              <path fill="#ffffff" d="M0,80 C300,120 600,0 900,60 C1200,120 1440,40 1440,40 L1440,120 L0,120 Z" />
            </svg>
          </div>
        </header>

        {/* ── BELOW WAVE ──────────────────────────────────────────────────── */}
        <div className="relative bg-white">

          {/* ── MOBILE layout ── */}
          <div className="flex flex-col items-center px-6 pt-8 pb-10 md:hidden">
            <SchoolImage
              src="/OIP1.webp"
              alt="Annai Theresa school building"
              width={300}
              height={200}
              rotate="cw"
              priority
              className="w-full max-w-[320px]"
            />

            <div className="mt-6 text-center px-2">
              <h2 className="text-2xl font-bold text-black leading-snug flex items-center justify-center gap-2">
                Welcome to{" "}
                <span className="text-[#ff6a3d]">Our School</span>
                <span
                  className="inline-block animate-bounce text-3xl"
                  aria-hidden="true"
                  style={{ animationDelay: "0.5s" }}
                >
                  📚
                </span>
              </h2>
              <p className="text-base text-gray-600 mt-3 leading-relaxed">
                At Annai Theresa Matriculation Higher Secondary School, we
                believe in nurturing young minds with knowledge, values, and
                creativity. Our goal is to inspire every student to learn with
                curiosity and grow with confidence.
              </p>
            </div>

            {/* Mobile — Campus section */}
            <div className="mt-12 flex flex-col items-center w-full">
              <SchoolImage
                src="/sclinside.jpeg"
                alt="Annai Theresa school campus interior"
                width={320}
                height={220}
                rotate="ccw"
                className="w-full max-w-[320px]"
              />

              <div className="mt-6 text-center px-2">
                <h2 className="text-2xl font-bold text-black leading-snug">
                  Our <span className="text-[#ff6a3d]">Campus</span>
                </h2>
                <p className="text-base text-gray-600 mt-3 leading-relaxed">
                  Our campus provides a vibrant learning environment where
                  students explore knowledge, creativity, and teamwork. With
                  modern facilities and dedicated teachers, every child is
                  guided to reach their full potential.
                </p>
              </div>
            </div>
          </div>

          {/* ── DESKTOP — Section 1: image overlaps wave, text right ── */}
          <div className="hidden md:block">
            {/* Overlapping image */}
            <div className="absolute left-10 -top-[90px] z-20">
              <SchoolImage
                src="/OIP1.webp"
                alt="Annai Theresa school building"
                width={380}
                height={260}
                rotate="cw"
                priority
                className="w-[300px] lg:w-[380px]"
              />
            </div>

            <div className="flex items-start px-10 pb-16 pt-10 gap-14">
              {/* Spacer to clear the overlapping image */}
              <div className="flex-shrink-0 w-[320px] lg:w-[420px]" aria-hidden="true" />

              <div className="mt-4 max-w-xl">
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-snug flex items-center gap-3">
                  Welcome to{" "}
                  <span className="text-[#ff6a3d]">Our School</span>
                  <span
                    className="inline-block animate-bounce text-4xl lg:text-5xl"
                    aria-hidden="true"
                    style={{ animationDelay: "0.5s" }}
                  >
                    📚
                  </span>
                </h2>
                <p className="text-lg text-gray-600 mt-3 leading-relaxed">
                  At Annai Theresa Matriculation Higher Secondary School, we
                  believe in nurturing young minds with knowledge, values, and
                  creativity. Our goal is to inspire every student to learn
                  with curiosity and grow with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* ── DESKTOP — Section 2: text left, image right ── */}
          <div className="hidden md:flex items-center px-10 pb-20 pt-10 gap-14">

            <div className="flex-1 flex justify-end">
              <div className="max-w-xl">
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-snug flex items-center gap-3">
                  <span
                    className="inline-block animate-bounce text-4xl lg:text-5xl"
                    aria-hidden="true"
                    style={{ animationDelay: "0.3s" }}
                  >
                    🏫
                  </span>
                  Our <span className="text-[#ff6a3d]">Campus</span>
                </h2>
                <p className="text-lg text-gray-600 mt-3 leading-relaxed">
                  Our campus provides a vibrant learning environment where
                students explore knowledge, creativity, and teamwork. With
                  modern facilities and dedicated teachers, every child is
                  guided to reach their full potential.
                </p>
              </div>
            </div>

            <div className="flex-shrink-0">
              <SchoolImage
                src="/sclinside.jpeg"
                alt="Annai Theresa school campus interior"
                width={380}
                height={260}
                rotate="ccw"
                className="w-[300px] lg:w-[380px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}