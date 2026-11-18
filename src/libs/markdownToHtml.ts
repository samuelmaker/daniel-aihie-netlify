import { remark } from "remark";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, {
      ...defaultSchema,
      tagNames: [...(defaultSchema.tagNames || []), "iframe"],
      attributes: {
        ...defaultSchema.attributes,
        iframe: [
          ["src", /^https:\/\/player\.vimeo\.com\/video\/\d+(?:[?#].*)?$/, /^https:\/\/(?:www\.)?youtube\.com\/embed\/[\w-]+(?:[?#].*)?$/],
          "width", "height", "title", "allow", "allowFullScreen", "referrerPolicy", "frameBorder"
        ],
      },
    })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
