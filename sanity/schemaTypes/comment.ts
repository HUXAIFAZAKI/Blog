import { defineType, defineField } from "sanity";

export const comment = defineType({
  name: "comment",
  type: "document",
  title: "Comment",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "comment",
      type: "text",
      title: "Comment",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blogSlug",
      type: "string",
      title: "Blog Slug",
      description: "The slug of the blog post this comment belongs to",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "approved",
      type: "boolean",
      title: "Approved",
      description: "Comments won't show on the site without approval",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      type: "datetime",
      title: "Created At",
      initialValue: new Date().toISOString(),
    }),
  ],
});
