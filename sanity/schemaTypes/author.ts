import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  type: "document",
  title: "Author",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Author Name",
      description: "Name of the author",
    }),
    defineField({
      name: "bio",
      type: "string",
      title: "Author's Bio",
      description: "Bio of the author",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
