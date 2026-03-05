export const galleryImage = {
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Sports", "Cultural", "Academic", "National"],
      },
    },
    {
      name: "date",
      title: "Event Date",
      type: "date",
    },
  ],
}