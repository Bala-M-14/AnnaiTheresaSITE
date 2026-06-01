export const revalidate = 0

import Link from "next/link"
import { client } from "@/sanity/lib/client"
import Image from "next/image"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import FeedbackForm from "./Feedbackform"

// ── Types ──────────────────────────────────────────────────────────────────
interface GalleryImage {
  _id: string
  caption: string
  category: string
  date: string
  image: SanityImageSource
}

interface ValueCard {
  emoji: string
  title: string
  description: string
}

interface TeamMember {
  name: string
  role: string
  emoji: string
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
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/galary" },
  { label: "Activities", href: "/#activities" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
]

// ── Activities data ────────────────────────────────────────────────────────
const ACTIVITIES = [
  {
    emoji: "🥋",
    title: "Physical Education & Karate",
    color: "#ff6a3d",
    bg: "#fff4f1",
    rotate: "rotate-1",
    hoverRotate: "hover:-rotate-1",
    description:
      "Physical education is part of our curriculum — focusing on skill development and physical fitness. Karate and other activities improve strength and confidence. Students enjoy vast playground facilities and dedicated PE periods in their timetable every week.",
  },
  {
    emoji: "📚",
    title: "Library & Scouts",
    color: "#f5a623",
    bg: "#fffbf0",
    rotate: "-rotate-1",
    hoverRotate: "hover:rotate-1",
    description:
      "Our school library covers all areas of learning — growing vocabulary, general knowledge, and reading habits. We also offer Scouts and Guides, JRC training, and first-aid training to help students become responsible, prepared young citizens.",
  },
  {
    emoji: "💃",
    title: "Dance",
    color: "#e94fa0",
    bg: "#fff0f7",
    rotate: "rotate-2",
    hoverRotate: "hover:-rotate-2",
    description:
      "Dance is the hidden language of the soul of the body. Classes are conducted for Bharathanatyam, folk, and western dances. Many of our students have participated in Guinness World Records events and earned certificates for Bharathanatyam.",
  },
  {
    emoji: "🧘",
    title: "Yoga",
    color: "#4caf7d",
    bg: "#f0fff6",
    rotate: "-rotate-1",
    hoverRotate: "hover:rotate-1",
    description:
      "The school has a dedicated yoga class. Yoga is a great practice for both body and mind — offering peace, mindfulness, and inner balance to every student. It helps them stay calm and focused throughout the school day.",
  },
  {
    emoji: "🎵",
    title: "Bhajans",
    color: "#7c5cbf",
    bg: "#f5f0ff",
    rotate: "rotate-1",
    hoverRotate: "hover:-rotate-1",
    description:
      "Bhajan refers to devotional songs with a religious theme or spiritual ideas. Weekly bhajan classes are conducted by devotees of Lord Krishna from ISKCON and Sathya Sai Seva Samithi, instilling values and devotion in young hearts.",
  },
  {
    emoji: "🥷",
    title: "Karate",
    color: "#18253f",
    bg: "#f0f3f8",
    rotate: "-rotate-2",
    hoverRotate: "hover:rotate-2",
    description:
      "Karate is not about techniques and their execution, but about boldness and self-confidence. Weekly karate classes are conducted for students by well-experienced trainers, building discipline, focus, and strength.",
  },
]

// ── About Us data ──────────────────────────────────────────────────────────
const VALUES: ValueCard[] = [
  {
    emoji: "📖",
    title: "Academic Excellence",
    description:
      "We achieve consistent excellence with 100% results in Board Examinations. Our students excel in academics while developing critical thinking and problem-solving skills through innovative teaching methods.",
  },
  {
    emoji: "❤️",
    title: "Compassion & Care",
    description:
      "Every child is unique. We provide individual attention and personal care to ensure holistic growth. Our teachers closely monitor each student's progress and provide necessary guidance.",
  },
  {
    emoji: "🎨",
    title: "Creative Growth",
    description:
      "We nurture creativity through co-curricular and extracurricular activities including dance, arts, music, and sports. Students are encouraged to discover their talents and express themselves.",
  },
  {
    emoji: "🏆",
    title: "Holistic Development",
    description:
      "Education is about developing values, discipline, leadership, and social responsibility. We prepare students to face future challenges with courage, competence, and integrity.",
  },
]
const STATS = [
  { number: "300+", label: "Students", emoji: "🎒" },
  { number: "30+", label: "Teachers", emoji: "👩‍🏫" },
  { number: "26+", label: "Years", emoji: "🏆" },
  { number: "50+", label: "Awards", emoji: "🥇" },
]

// ── Page ───────────────────────────────────────────────────────────────────
export default async function Home() {
  const images = await getImages()

  return (
    <>
      <div className="relative">
        <header className="relative bg-[#18253f] text-white py-24 px-6 pt-6">

          <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none" aria-hidden="true">
            <Image src="/Sclfrn.jpg" alt="" fill className="object-cover" priority />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
            <nav aria-label="Main navigation" className="w-full mb-6">
              <ul className="flex justify-center flex-wrap gap-x-3 gap-y-2" role="list">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="
                        inline-block text-sm font-bold text-gray-300
                        border border-[#ff6a3d]/50 rounded-full px-3 py-1
                        transition-colors duration-200
                        hover:bg-[#ff6a3d] hover:text-white hover:border-[#ff6a3d]
                        md:border-2 md:border-[#ff6a3d] md:px-5 md:py-2
                      "
                    >
                      {item.label}
                    </Link>
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

          <div className="absolute bottom-0 left-0 w-full" aria-hidden="true">
            <svg viewBox="0 0 1440 120" className="w-full h-[120px]" preserveAspectRatio="none">
              <path fill="#ffffff" d="M0,80 C300,120 600,0 900,60 C1200,120 1440,40 1440,40 L1440,120 L0,120 Z" />
            </svg>
          </div>
        </header>

        {/* ════════════════════════════════════════════════════════════════
            HOME — Welcome + Campus
        ════════════════════════════════════════════════════════════════ */}
        <div className="relative bg-white">

          {/* Mobile */}
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
            <div className="mt-6 flex flex-col items-center gap-6 px-2">
              <div>
                <h2 className="text-2xl font-bold text-black leading-snug flex items-center justify-center gap-2">
                  Welcome to{" "}
                  <span className="text-[#ff6a3d]">Our School</span>
                  <span className="inline-block animate-bounce text-3xl" aria-hidden="true" style={{ animationDelay: "0.5s" }}>
                    📚
                  </span>
                </h2>
                <p className="text-base text-gray-600 mt-3 leading-relaxed text-center">
                  At Annai Theresa Matriculation Higher Secondary School, we
                  believe in nurturing young minds with knowledge, values, and
                  creativity. Our goal is to inspire every student to learn with
                  curiosity and grow with confidence.
                </p>
              </div>
              <div className="w-full max-w-xs">
                <Image
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3ZkaWgzNXA3eGxwYXEzOWh5eTRvbTBlam12MHlmOGhod3R6ZjA1diZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2fdRZCyM3nCUVKruB6/giphy.gif"
                  alt="Pencil drawing animation"
                  width={240}
                  height={240}
                  unoptimized
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center w-full">
              <div className="flex flex-col items-center gap-4 w-full px-2">
                <Image
                  src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aGo0eWFwMGFtMnR0MWltMm05amRhMm5mOTFmNzYwZ3hyMnI5bDMxcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VhtSLWxOQOGdFfGTTa/giphy.gif"
                  alt="School sketch animation"
                  width={200}
                  height={200}
                  unoptimized
                  className="w-48 h-auto rounded-xl shadow-lg"
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-black leading-snug flex items-center justify-center gap-2">
                    <span className="inline-block animate-bounce text-3xl" aria-hidden="true" style={{ animationDelay: "0.3s" }}>
                      🏫
                    </span>
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
              <SchoolImage
                src="/sclinside.jpeg"
                alt="Annai Theresa school campus interior"
                width={320}
                height={220}
                rotate="ccw"
                className="w-full max-w-[320px] mt-6"
              />
            </div>
          </div>

          {/* Desktop — Welcome */}
          <div className="hidden md:block">
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
              <div className="flex-shrink-0 w-[320px] lg:w-[420px]" aria-hidden="true" />
              <div className="mt-4 max-w-xl">
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-snug flex items-center gap-3">
                  Welcome to{" "}
                  <span className="text-[#ff6a3d]">Our School</span>
                  <span className="inline-block animate-bounce text-4xl lg:text-5xl" aria-hidden="true" style={{ animationDelay: "0.5s" }}>
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
              <div className="flex-shrink-0 w-[280px] lg:w-[320px]">
                <Image
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3ZkaWgzNXA3eGxwYXEzOWh5eTRvbTBlam12MHlmOGhod3R6ZjA1diZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2fdRZCyM3nCUVKruB6/giphy.gif"
                  alt="Pencil drawing animation"
                  width={180}
                  height={180}
                  unoptimized
                  className="w-full h-auto rounded-xl "
                />
              </div>
            </div>
          </div>

          {/* Desktop — Campus */}
          <div className="hidden md:flex items-center px-10 pb-20 pt-10 gap-14">
            <div className="flex-shrink-0 w-[280px] lg:w-[320px]">
              <Image
                src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aGo0eWFwMGFtMnR0MWltMm05amRhMm5mOTFmNzYwZ3hyMnI5bDMxcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VhtSLWxOQOGdFfGTTa/giphy.gif"
                alt="School sketch animation"
                width={280}
                height={280}
                unoptimized
                className="w-full h-auto rounded-xl "
              />
            </div>
            <div className="flex-1 flex justify-end">
              <div className="max-w-xl">
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-snug flex items-center gap-3">
                  <span className="inline-block animate-bounce text-4xl lg:text-5xl" aria-hidden="true" style={{ animationDelay: "0.3s" }}>
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

        {/* ════════════════════════════════════════════════════════════════
            ACTIVITIES
        ════════════════════════════════════════════════════════════════ */}

        {/* Wave: white → navy */}
        <div className="w-full overflow-hidden leading-none bg-white" aria-hidden="true">
          <svg viewBox="0 0 1440 60" className="w-full h-[60px]" preserveAspectRatio="none">
            <path fill="#18253f" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>

        <section id="activities" className="bg-[#18253f] pt-4 pb-20 px-5 md:px-10">

          <div className="max-w-5xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#ff6a3d]/15 border border-[#ff6a3d]/40 rounded-full px-5 py-1.5 mb-5">
              <span className="text-[#ff6a3d] text-xs font-bold uppercase tracking-widest">
                Beyond the Classroom
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Our <span className="text-[#ff6a3d]">Activities</span>{" "}
              <span className="float-emoji" style={{ animationDelay: "0s" }}>🎉</span>
            </h2>
            <p className="mt-4 text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              We believe a great school shapes the whole child — mind, body, and spirit.
              Explore the exciting activities that make our students thrive every day.
            </p>
            <div className="flex justify-center gap-2 mt-6" aria-hidden="true">
              {(["#ff6a3d", "#f5a623", "#e94fa0", "#4caf7d", "#7c5cbf"] as const).map((c, i) => (
                <div
                  key={i}
                  className="float-emoji w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: c, animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ACTIVITIES.map((act) => (
              <div
                key={act.title}
                className={`
                  activity-card
                  ${act.rotate} ${act.hoverRotate}
                  rounded-[24px]
                  transition-all duration-500
                  hover:scale-105
                  cursor-default
                  p-6 md:p-7
                `}
                style={{
                  backgroundColor: act.bg,
                  border: `5px solid ${act.color}`,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="float-emoji text-3xl md:text-4xl w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ backgroundColor: act.color + "22", animationDelay: "0.2s" }}
                    aria-hidden="true"
                  >
                    {act.emoji}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold leading-snug" style={{ color: act.color }}>
                    {act.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {act.description}
                </p>
                <div
                  className="mt-5 h-1.5 rounded-full w-2/3 opacity-60"
                  style={{ backgroundColor: act.color }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-16 text-center">
            <div className="rounded-[20px] border-[3px] border-yellow-400 bg-white/5 px-7 py-6 shadow-lg">
              <p className="text-yellow-300 text-sm md:text-base font-semibold leading-relaxed">
                <span className="text-xl" aria-hidden="true">🌟 </span>
                Every child has a unique spark — our activities help them discover it, nurture it, and shine.
                <span className="text-xl" aria-hidden="true"> 🌟</span>
              </p>
            </div>
          </div>
        </section>

        {/* Wave: navy → white */}
        <div className="w-full overflow-hidden leading-none bg-[#18253f]" aria-hidden="true">
          <svg viewBox="0 0 1440 60" className="w-full h-[60px]" preserveAspectRatio="none">
            <path fill="#ffffff" d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            ABOUT US
        ════════════════════════════════════════════════════════════════ */}

        {/* Wave: white → navy */}
        <div className="bg-white" aria-hidden="true">
          <svg viewBox="0 0 1440 80" className="w-full h-[80px]" preserveAspectRatio="none">
            <path fill="#18253f" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>

        {/* Stats strip */}
        <section id="about" className="bg-[#18253f] py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-sm font-bold text-[#ff6a3d] uppercase tracking-widest mb-2">
                By the Numbers
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-3">
                Our School at a{" "}
                <span className="text-[#ff6a3d]">Glance</span>
                <span className="inline-block animate-bounce text-3xl" aria-hidden="true" style={{ animationDelay: "0.4s" }}>
                  ⭐
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="text-3xl mb-1">{stat.emoji}</div>
                  <div className="text-3xl font-bold text-[#ff6a3d]">{stat.number}</div>
                  <div className="text-sm font-semibold text-gray-300 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wave: navy → white */}
        <div className="bg-white" aria-hidden="true">
          <svg viewBox="0 0 1440 80" className="w-full h-[80px]" preserveAspectRatio="none" style={{ display: "block" }}>
            <path fill="#18253f" d="M0,40 C360,0 1080,80 1440,40 L1440,0 L0,0 Z" />
          </svg>
        </div>

        {/* About — Who We Are */}
        <div className="relative bg-white">

          {/* Mobile */}
          <div className="flex flex-col items-center px-6 pt-8 pb-10 md:hidden">
            <SchoolImage
              src="/OIP1.webp"
              alt="About Annai Theresa school"
              width={300}
              height={200}
              rotate="cw"
              className="w-full max-w-[320px]"
            />
            <div className="mt-6 text-center px-2">
              <p className="text-xs font-bold text-[#ff6a3d] uppercase tracking-widest mb-1">Who We Are</p>
              <h2 className="text-2xl font-bold text-black leading-snug flex items-center justify-center gap-2">
                About <span className="text-[#ff6a3d]">Our School</span>
                <span className="inline-block animate-bounce text-3xl" style={{ animationDelay: "0.4s" }}>🏫</span>
              </h2>
              <p className="text-base text-gray-600 mt-3 leading-relaxed">
                Our institution believes that education is not merely the acquisition of knowledge but the development of values, discipline, leadership, and social responsibility. Through innovative teaching methods, dedicated faculty, and a student-centered approach, we prepare students to face challenges with courage and competence.
              </p>
              <p className="text-base text-gray-600 mt-3 leading-relaxed">
                With nearly 28 years of dedication to academic excellence and character building, we have nurtured generations of learners. We continue to uphold our tradition of excellence while embracing new opportunities for growth and innovation.
              </p>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center px-10 py-20 gap-14 max-w-6xl mx-auto">
            <div className="flex-shrink-0">
              <SchoolImage
                src="/OIP1.webp"
                alt="About Annai Theresa school"
                width={380}
                height={260}
                rotate="cw"
                className="w-[300px] lg:w-[380px]"
              />
            </div>
            <div className="max-w-xl">
              <p className="text-sm font-bold text-[#ff6a3d] uppercase tracking-widest mb-2">Who We Are</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-snug flex items-center gap-3">
                About <span className="text-[#ff6a3d]">Our School</span>
                <span className="inline-block animate-bounce text-4xl lg:text-5xl" aria-hidden="true" style={{ animationDelay: "0.4s" }}>
                  🏫
                </span>
              </h2>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                Our institution believes that education is not merely the acquisition of knowledge but the development of values, discipline, leadership, and social responsibility. Through innovative teaching methods, dedicated faculty, and a student-centered approach, we prepare students to face challenges with courage and competence.
              </p>
              <p className="text-lg text-gray-600 mt-3 leading-relaxed">
                With nearly 28 years of dedication to academic excellence and character building, we have nurtured generations of learners. We continue to uphold our tradition of excellence while embracing new opportunities for growth and innovation.
              </p>
            </div>
          </div>
        </div>

        {/* About — Our Mission */}
        <div className="relative bg-white">

          {/* Mobile */}
          <div className="flex flex-col items-center px-6 pb-10 md:hidden">
            <SchoolImage
              src="/sclinside.jpeg"
              alt="Our mission"
              width={300}
              height={200}
              rotate="ccw"
              className="w-full max-w-[320px]"
            />
            <div className="mt-6 text-center px-2">
              <p className="text-xs font-bold text-[#ff6a3d] uppercase tracking-widest mb-1">Our Mission</p>
              <h2 className="text-2xl font-bold text-black leading-snug flex items-center justify-center gap-2">
                <span className="inline-block animate-bounce text-3xl" style={{ animationDelay: "0.3s" }}>🎯</span>
                What We <span className="text-[#ff6a3d]">Stand For</span>
              </h2>
              <p className="text-base text-gray-600 mt-3 leading-relaxed">
                To provide quality education in a safe and supportive environment that inspires academic excellence and critical thinking. We nurture creativity, innovation, and leadership qualities in every student.
              </p>
              <p className="text-base text-gray-600 mt-3 leading-relaxed">
                We instill discipline, integrity, and respect for others while preparing students to contribute positively to society and the nation. Our goal is to develop lifelong learners and responsible citizens.
              </p>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center px-10 pb-20 gap-14 max-w-6xl mx-auto">
            <div className="flex-1 flex justify-end">
              <div className="max-w-xl">
                <p className="text-sm font-bold text-[#ff6a3d] uppercase tracking-widest mb-2">Our Mission</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-snug flex items-center gap-3">
                  <span className="inline-block animate-bounce text-4xl lg:text-5xl" aria-hidden="true" style={{ animationDelay: "0.3s" }}>
                    🎯
                  </span>
                  What We <span className="text-[#ff6a3d]">Stand For</span>
                </h2>
                <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                  To provide quality education in a safe and supportive environment that inspires academic excellence and critical thinking. We nurture creativity, innovation, and leadership qualities in every student.
                </p>
                <p className="text-lg text-gray-600 mt-3 leading-relaxed">
                  We instill discipline, integrity, and respect for others while preparing students to contribute positively to society and the nation. Our goal is to develop lifelong learners and responsible citizens.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <SchoolImage
                src="/sclinside.jpeg"
                alt="Our mission"
                width={380}
                height={260}
                rotate="ccw"
                className="w-[300px] lg:w-[380px]"
              />
            </div>
          </div>
        </div>

        {/* Featured Gallery Section */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-bold text-[#ff6a3d] uppercase tracking-widest mb-2">Memories & Moments</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#18253f] flex items-center justify-center gap-3">
                Featured <span className="text-[#ff6a3d]">Gallery</span>
                <span className="inline-block animate-bounce text-4xl md:text-5xl" aria-hidden="true" style={{ animationDelay: "0.4s" }}>
                  📸
                </span>
              </h2>
              <p className="text-gray-600 mt-4 text-lg">Explore the vibrant moments of our school community</p>
            </div>

            {/* Random Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {images
                .sort(() => Math.random() - 0.5)
                .slice(0, 6)
                .map((img, idx) => (
                  <div
                    key={img._id}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 h-64"
                    style={{
                      animation: `fadeIn 0.6s ease-out forwards`,
                      animationDelay: `${idx * 0.1}s`,
                      opacity: 0,
                    }}
                  >
                    <Image
                      src={urlFor(img.image)}
                      alt={img.caption || "School photo"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-lg">{img.caption}</h3>
                      <p className="text-gray-200 text-sm">{img.category}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* View All Gallery Button */}
            <div className="text-center">
              <a
                href="/galary"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#ff6a3d] to-[#ff8a5d] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg"
              >
                View Full Gallery 🏫
              </a>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-bold text-[#ff6a3d] uppercase tracking-widest mb-2">What Drives Us</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black flex items-center justify-center gap-3">
                Our <span className="text-[#ff6a3d]">Core Values</span>
                <span className="inline-block animate-bounce text-3xl md:text-4xl" aria-hidden="true" style={{ animationDelay: "0.6s" }}>
                  ⭐
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((v, i) => (
                <div
                  key={v.title}
                  className="value-card bg-white rounded-[24px] p-6 text-center
                    border-2 border-gray-100
                    shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                    transition-all duration-300 cursor-default
                    fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">{v.emoji}</div>
                  <h3 className="text-lg font-bold text-black mb-3">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Principal */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black flex items-center justify-center gap-3">
                Meet Our <span className="text-[#ff6a3d]">Principal</span>
                <span className="inline-block animate-bounce text-3xl md:text-4xl" aria-hidden="true" style={{ animationDelay: "0.5s" }}>
                  👋
                </span>
              </h2>
            </div>
            <div className="flex flex-col md:flex-row items-center max-w-4xl mx-auto gap-10 md:gap-20 px-4">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-44 h-44 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-[#ff6a3d]">
                  <Image
                    src="/women.jpg"
                    alt="Principal"
                    width={240}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-center mt-4 mb-1 text-black">
                  Mrs. M. Jayanthi
                </h3>
                <p className="text-center text-gray-500 text-sm">
                  M.Com., B.Ed.
                </p>
              </div>
              <p className="text-gray-600 text-center md:text-left mb-14 max-w-xl leading-relaxed text-sm md:text-base">
                <span className="text-black font-bold text-3xl">Principal's Message:</span><br />
                <br />
                For nearly three decades, our school has remained dedicated to shaping young minds and building strong foundations for future generations. We continue to uphold our tradition of excellence while embracing new opportunities for growth, innovation, and success.
                <br /><br />
                Every child is unique, and we are committed to providing individual attention and personal care to ensure the overall growth and well-being of our students. Our teachers closely monitor each student's progress and provide the necessary guidance to help them reach their full potential.
              </p>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="bg-gradient-to-b from-white to-gray-50 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-bold text-[#ff6a3d] uppercase tracking-widest mb-2">Who We Are</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black flex items-center justify-center gap-3">
                About Our <span className="text-[#ff6a3d]">School</span>
                <span className="inline-block animate-bounce text-3xl md:text-4xl" aria-hidden="true" style={{ animationDelay: "0.3s" }}>
                  📚
                </span>
              </h2>
            </div>

            {/* Main About Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  <strong>Established in 1996,</strong> our school has been a beacon of knowledge, excellence, and character building for generations of learners. With a strong commitment to academic achievement and holistic development, we strive to create a nurturing environment where every student is encouraged to discover their talents, build confidence, and achieve success.
                </p>
                <p>
                  Our institution believes that education is not merely the acquisition of knowledge but the development of values, discipline, leadership, and social responsibility. Through innovative teaching methods, dedicated faculty, and a student-centered approach, we prepare our students to face the challenges of the future with courage and competence.
                </p>
              </div>

              <div className="bg-[#18253f] text-white rounded-xl p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#ff6a3d]">🏆 Academic Excellence</h3>
                  <p className="text-sm leading-relaxed">
                    We are proud of our consistent academic performance, achieving <strong>100% results in both X Std and XII Std Board Examinations.</strong> Our students are guided to excel not only in academics but also in co-curricular and extracurricular activities, helping them become well-rounded individuals.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#ff6a3d]">❤️ Personal Care & Support</h3>
                  <p className="text-sm leading-relaxed">
                    Every child is unique, and we are committed to providing individual attention and personal care. Our teachers closely monitor each student's progress and provide the necessary guidance to help them reach their full potential.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-[#18253f] mb-4 flex items-center gap-3">
                  👁️ Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To empower students with knowledge, values, and life skills, enabling them to become responsible citizens, lifelong learners, and future leaders.
                </p>
              </div>

              <div className="bg-orange-50 border-2 border-[#ff6a3d] rounded-xl p-8">
                <h3 className="text-2xl font-bold text-[#18253f] mb-4 flex items-center gap-3">
                  🎯 Our Mission
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex gap-3">
                    <span className="text-[#ff6a3d] font-bold">•</span>
                    <span>To provide quality education in a safe and supportive environment.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#ff6a3d] font-bold">•</span>
                    <span>To inspire academic excellence and critical thinking.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#ff6a3d] font-bold">•</span>
                    <span>To nurture creativity, innovation, and leadership qualities.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#ff6a3d] font-bold">•</span>
                    <span>To instill discipline, integrity, and respect for others.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#ff6a3d] font-bold">•</span>
                    <span>To prepare students to contribute positively to society and the nation.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Leadership Team */}
            <div className="bg-white rounded-xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-[#18253f] mb-8 text-center">
                👥 Leadership Team
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-3">👔</div>
                  <h4 className="text-lg font-bold text-[#18253f] mb-1">Chairman</h4>
                  <p className="text-gray-600">Mr. M. Muruganandham</p>
                  <p className="text-sm text-gray-500">M.A.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">📖</div>
                  <h4 className="text-lg font-bold text-[#18253f] mb-1">Former Principal</h4>
                  <p className="text-gray-600">Mrs. P. Padma</p>
                  <p className="text-sm text-gray-500">M.A., M.Ed.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🎓</div>
                  <h4 className="text-lg font-bold text-[#18253f] mb-1">Principal</h4>
                  <p className="text-gray-600">Mrs. M. Jayanthi</p>
                  <p className="text-sm text-gray-500">M.Com., B.Ed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="contact" className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-bold text-[#ff6a3d] uppercase tracking-widest mb-2">Find Us</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black flex items-center justify-center gap-3">
                Our <span className="text-[#ff6a3d]">Location</span>
                <span className="inline-block animate-bounce text-3xl md:text-4xl" aria-hidden="true" style={{ animationDelay: "0.4s" }}>
                  📍
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Address & Details */}
              <div className="bg-gradient-to-br from-[#18253f] to-[#2a3a52] rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 text-[#ff6a3d]">📮 School Address</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <span className="text-xl">📍</span> Main Address
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      Annai Theresa Matriculation Higher Secondary School<br />
                      Srinivasapuram, AYYAPANTHANGAL, Chennai 600056<br />
                      Tamil Nadu, India
                    </p>
                  </div>

                  <div className="border-t border-gray-600 pt-6">
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <span className="text-xl">📞</span> Phone
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        <a href="tel:+916383925052" className="hover:text-[#ff6a3d] transition-colors">
                          +91 63839 25052
                        </a>
                      </li>
                      <li>
                        <a href="tel:+917448876777" className="hover:text-[#ff6a3d] transition-colors">
                          +91 74488 76777
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-gray-600 pt-6">
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <span className="text-xl">✉️</span> Email
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        <a href="mailto:annaitheresaschool1996@gmail.com" className="hover:text-[#ff6a3d] transition-colors">
                          annaitheresaschool1996@gmail.com
                        </a>
                      </li>
                      <li>
                        <a href="https://annaitheresa.in" className="hover:text-[#ff6a3d] transition-colors">
                          annaitheresa.in
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-gray-600 pt-6">
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <span className="text-xl">🕐</span> Visiting Hours
                    </h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li><strong>School Hours:</strong> 8:00 AM - 3:30 PM</li>
                      <li><strong>Office Hours:</strong> 7:30 AM - 4:00 PM</li>
                      <li><strong>Closed:</strong> Sundays & Public Holidays</li>
                    </ul>
                  </div>

                  <a
                    href="https://maps.app.goo.gl/4kgwg1WfNdMQNXNm9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 px-6 py-3 bg-[#ff6a3d] text-white font-bold rounded-lg hover:bg-[#ff8a5d] transition-all duration-300 hover:scale-105"
                  >
                    🗺️ Get Directions
                  </a>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-xl overflow-hidden shadow-xl border-4 border-[#ff6a3d] cursor-pointer hover:shadow-2xl transition-all duration-300">
                <a
                  href="https://maps.app.goo.gl/4kgwg1WfNdMQNXNm9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-[450px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden relative group"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7445454545454!2d80.25567890909091!3d13.34520909090909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f8f8f8f8f8f%3A0x8f8f8f8f8f8f8f8f!2sAnnai%20Theresa%20Matriculation%20Higher%20Secondary%20School!5e0!3m2!1sen!2sin!4v1716647000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Annai Theresa Matriculation Higher Secondary School Location"
                    className="w-full group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                    <span className="text-white text-lg font-bold">🗺️ Open in Google Maps</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Accessibility Note */}
            <div className="mt-12 bg-blue-50 border-l-4 border-[#18253f] p-6 rounded">
              <p className="text-gray-700 text-sm">
                <strong>♿ Accessibility:</strong> Our school is easily accessible by public transport. Regular bus routes pass near our campus. We have dedicated parking and ramps for differently-abled visitors.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#18253f] text-white py-16 px-6">
          <div className="max-w-6xl mx-auto">

            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

              {/* School Info */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[#ff6a3d]">🏫 About School</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Established in 1996, our school has been a beacon of knowledge, excellence, and character building for generations of learners. We provide quality education in a safe and supportive environment, inspiring academic excellence and critical thinking.
                </p>
                <p className="text-gray-400 text-xs">
                  <strong>Founded:</strong> 1996<br />
                  <strong>Legacy:</strong> 28 Years of Excellence<br />
                  <strong>Commitment:</strong> 100% Board Results
                </p>
              </div>

              {/* Contact Details */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#ff6a3d]">📞 Contact Us</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>
                    <strong>Address:</strong><br />
                    Annai Theresa Matriculation Higher Secondary School,
                    Srinivasapuram, AYYAPANTHANGAL, Chennai 600056,
                    Tamil Nadu, India
                  </p>
                  <p>
                    <strong>Phone:</strong><br />
                    +91 63839 25052<br />
                    +91 74488 76777
                  </p>
                  <p>
                    <strong>Email:</strong><br />
                    <a href="mailto:annaitheresaschool1996@gmail.com" className="text-[#ff6a3d] hover:text-white transition-colors">
                      annaitheresaschool1996@gmail.com
                    </a><br />
                    <a href="https://annaitheresa.in" className="text-[#ff6a3d] hover:text-white transition-colors">
                      annaitheresa.in
                    </a>
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#ff6a3d]">🔗 Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="/" className="hover:text-[#ff6a3d] transition-colors">Home</a></li>
                  <li><a href="/galary" className="hover:text-[#ff6a3d] transition-colors">Gallery</a></li>
                  <li><a href="/#activities" className="hover:text-[#ff6a3d] transition-colors">Activities</a></li>
                  <li><a href="/#about" className="hover:text-[#ff6a3d] transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-[#ff6a3d] transition-colors">Admissions</a></li>
                  <li><a href="#" className="hover:text-[#ff6a3d] transition-colors">News & Events</a></li>
                </ul>
              </div>

              {/* Timings */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#ff6a3d]">⏰ Timings</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>
                    <strong>School Hours:</strong><br />
                    Monday - Friday<br />
                    8:00 AM - 3:30 PM
                  </p>
                  <p>
                    <strong>Office Hours:</strong><br />
                    Monday - Friday<br />
                    7:30 AM - 4:00 PM
                  </p>
                  <p className="text-gray-400 text-xs mt-3">
                    🏖️ Closed on Sundays & Public Holidays
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-700 my-12"></div>

            {/* ── Feedback & Query Form ── */}
            <FeedbackForm />

            {/* Divider */}
            <div className="h-px bg-gray-700 my-12"></div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                © 2026 Annai Theresa Matriculation Higher Secondary School. All rights reserved.
              </p>
            </div>

          </div>
        </footer>
      </div>
    </>
  )
}