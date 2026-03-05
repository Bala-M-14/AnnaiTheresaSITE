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
    <section className="relative bg-[#18253f] text-white py-24 px-8 pt-10 overflow-hidden">
      
      {/* Logo */}
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <Image
          src="/image.png"
          alt="ATMHS Logo"
          width={220}
          height={80}
          className="mb-6"
        />
        <h1 className="text-4xl font-arabic font-bold mb-4"><span className="text-[#ff6a3d]">ANNAI THERESA </span>MATRICULATION HIGHER SECONDARY SCHOOL</h1>      
        </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
      </div>

      {/* Curve */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-[120px]"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,80 C300,120 600,0 900,60 C1200,120 1440,40 1440,40 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

    </section>
  )
}