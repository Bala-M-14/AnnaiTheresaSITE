import { client } from "@/sanity/lib/client"
import Image from "next/image"
import imageUrlBuilder from "@sanity/image-url"

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source).url()
}

async function getImages() {
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

export default async function Home() {
  const images = await getImages()

  return (
    <div className="relative">

      {/* ── HERO ── */}
      <section className="relative bg-[#18253f] text-white py-24 px-6 pt-6">

        {/* Background image */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <Image src="/sclfrn.jpg" alt="Background" fill className="object-cover" />
        </div>

        {/* Nav + Logo + Title */}
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">

          {/* Nav */}
          <nav className="w-full mb-6">
            <ul className="flex justify-center flex-wrap gap-x-3 gap-y-2">
              {["Home", "Achievements", "About Us", "Academics", "Contact"].map((item) => (
                <li
                  key={item}
                  className="
                    text-sm font-bold text-gray-300 cursor-pointer
                    relative after:absolute after:bottom-0 after:left-0
                    after:w-0 after:h-[2px] after:bg-[#ff6a3d]
                    after:transition-all after:duration-300
                    hover:after:w-full hover:text-white
                    md:border-2 md:border-[#ff6a3d] md:rounded-full
                    md:px-5 md:py-2 md:after:hidden
                    md:hover:bg-[#ff6a3d] md:hover:text-white
                    transition-colors pb-0.5
                    border border-[#ff6a3d]/40 rounded-full px-3 py-1
                    md:border-2 md:border-[#ff6a3d] md:rounded-full md:px-5 md:py-2
                  "
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>

          <Image src="/image.png" alt="ATMHS Logo" width={220} height={80} className="mb-6 w-[160px] md:w-[220px]" />

          <h1 className="text-xl sm:text-2xl md:text-4xl font-arabic font-bold mb-4 leading-snug px-2">
            <span className="text-[#ff6a3d]">ANNAI THERESA </span>
            MATRICULATION HIGHER SECONDARY SCHOOL
          </h1>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" className="w-full h-[120px]" preserveAspectRatio="none">
            <path fill="#ffffff" d="M0,80 C300,120 600,0 900,60 C1200,120 1440,40 1440,40 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* ── BELOW WAVE ── */}
      <div className="relative bg-white">

        {/* MOBILE: normal flow, centered */}
        <div className="flex flex-col items-center px-6 pt-8 pb-10 md:hidden">
          <Image
            src="/OIP1.webp"
            alt="School"
            width={300}
            height={200}
            className="
              w-full max-w-[320px]
              rounded-[24px]
              border-[5px] border-yellow-400
              shadow-[0_12px_30px_rgba(0,0,0,0.2)]
              rotate-1 hover:-rotate-1
              transition-all duration-300
              hover:scale-105
              bg-white p-1
            "
          />
          <div className="mt-6 text-center px-2">
            <h2 className="text-2xl font-bold text-black leading-snug">
              Welcome to <span className="text-[#ff6a3d]">Our School</span>
            </h2>
            <p className="text-base text-gray-600 mt-3 leading-relaxed">
              At Annai Theresa Matriculation Higher Secondary School, we believe in nurturing young minds with knowledge, values, and creativity.
              Our goal is to inspire every student to learn with curiosity and grow with confidence.
            </p>
          </div>

          {/* Mobile: Campus section */}
          <div className="mt-12 flex flex-col items-center w-full">
            <Image
              src="/sclinside.jpeg"
              alt="Campus"
              width={320}
              height={220}
              className="
                w-full max-w-[320px]
                rounded-[24px]
                border-[5px] border-yellow-400
                shadow-[0_12px_30px_rgba(0,0,0,0.2)]
                -rotate-1 hover:rotate-1
                transition-all duration-300
                hover:scale-105
                bg-white p-1
              "
            />
            <div className="mt-6 text-center px-2">
              <h2 className="text-2xl font-bold text-black leading-snug">
                Our <span className="text-[#ff6a3d]">Campus</span>
              </h2>
              <p className="text-base text-gray-600 mt-3 leading-relaxed">
                Our campus provides a vibrant learning environment where students
                explore knowledge, creativity, and teamwork. With modern facilities
                and dedicated teachers, every child is guided to reach their full
                potential.
              </p>
            </div>
          </div>
        </div>

        {/* DESKTOP: image overlapping wave on left, text to right */}
        <div className="hidden md:block">
          <div className="absolute left-10 -top-[90px] z-20">
            <Image
              src="/OIP1.webp"
              alt="School"
              width={380}
              height={260}
              className="
                w-[300px] lg:w-[380px]
                rounded-[28px]
                border-[6px] border-yellow-400
                shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                rotate-1 hover:-rotate-1
                transition-all duration-700
                hover:scale-105
                bg-white p-1
                opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]
              "
            />
          </div>

          <div className="flex items-start px-10 pb-16 pt-10 gap-14">
            <div className="flex-shrink-0 w-[320px] lg:w-[420px]" />
            <div className="mt-8 max-w-xl text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-snug">
                Welcome to <span className="text-[#ff6a3d]">Our School</span>
              </h2>
              <h3 className="text-lg text-gray-600 mt-2">At Annai Theresa Matriculation Higher Secondary School, we believe in nurturing young minds with knowledge, values, and creativity.
              Our goal is to inspire every student to learn with curiosity and grow with confidence.</h3>
            </div>
          </div>
        </div>

        {/* SECOND SECTION - IMAGE RIGHT */}
        <div className="hidden md:block">
          <div className="flex items-start px-10 pb-20 pt-20 gap-14">

            {/* Text aligned with above text */}
            <div className="flex-1 flex justify-end">
              <div className="max-w-xl text-left">
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-snug">
                  Our <span className="text-[#ff6a3d]">Campus</span>
                </h2>
                <h3 className="text-lg text-gray-600 mt-2">
                  Our campus provides a vibrant learning environment where students
                  explore knowledge, creativity, and teamwork. With modern facilities
                  and dedicated teachers, every child is guided to reach their full
                  potential.
                </h3>
              </div>
            </div>

            {/* Image on right */}
            <div className="flex-shrink-0">
              <Image
                src="/sclinside.jpeg"
                alt="Campus"
                width={380}
                height={260}
                className="
                  w-[300px] lg:w-[380px]
                  rounded-[28px]
                  border-[6px] border-yellow-400
                  shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                  -rotate-1 hover:rotate-1
                  transition-all duration-700
                  hover:scale-105
                  bg-white p-1
                  opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]
                "
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}