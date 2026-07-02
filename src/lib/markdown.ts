// Server-only — do not import in Client Components
import { cache } from "react";
import fs from "fs";
import path from "path";
// @ts-ignore
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { slugify } from "./utils";

const CONTENT_DIR = path.join(process.cwd(), "content", "pages");

export const parseMarkdownFile = cache(
  async (
    filePath: string,
  ): Promise<{ content: string; frontmatter: Record<string, unknown> }> => {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data: frontmatter, content: markdownBody } = matter(fileContent);

      const file = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSanitize, {
          ...defaultSchema,
          tagNames: [
            ...(defaultSchema.tagNames || []),
            "p",
            "h2",
            "h3",
            "h4",
            "ul",
            "ol",
            "li",
            "strong",
            "em",
            "a",
            "blockquote",
            "br",
          ],
          attributes: {
            ...defaultSchema.attributes,
            "*": ["className", "aria-*", "role", "id"],
            a: ["href", "target", "rel"],
          },
        })
        .use(rehypeStringify)
        .process(markdownBody);

      return {
        content: String(file),
        frontmatter,
      };
    } catch (error) {
      console.error(`Failed to parse markdown file at ${filePath}`, error);
      return { content: "", frontmatter: {} };
    }
  },
);

export const getStoryContent = cache(
  async (): Promise<{ chapters: Record<string, string> }> => {
    const filePath = path.join(CONTENT_DIR, "story.md");
    const parsed = await parseMarkdownFile(filePath);

    const html = parsed.content;
    const chapters: Record<string, string> = {};

    if (!html) return { chapters };

    // Split by h2 boundaries
    // Note: Since we need to get the H2 text to slugify and find chapter boundaries,
    // we do a regex to extract segments.
    const regex = /<h2[^>]*>(.*?)<\/h2>([\s\S]*?)(?=<h2|$)/g;
    let match;

    while ((match = regex.exec(html)) !== null) {
      // text content of H2
      const h2Text = (match[1] || "").replace(/<[^>]+>/g, "").trim();
      const bodyContent = (match[2] || "").trim();

      if (h2Text) {
        const slug = slugify(h2Text);
        chapters[slug] = bodyContent;
      }
    }

    return { chapters };
  },
);

export const getPrivacyPolicyContent = cache(async (): Promise<string> => {
  const filePath = path.join(CONTENT_DIR, "privacy-policy.md");
  const parsed = await parseMarkdownFile(filePath);
  return parsed.content;
});

export const parseInlineMarkdown = cache(
  async (text: string): Promise<string> => {
    if (!text) return "";
    try {
      const file = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSanitize, {
          ...defaultSchema,
          tagNames: [
            ...(defaultSchema.tagNames || []),
            "p",
            "h2",
            "h3",
            "h4",
            "ul",
            "ol",
            "li",
            "strong",
            "em",
            "a",
            "blockquote",
            "br",
          ],
          attributes: {
            ...defaultSchema.attributes,
            "*": ["className", "aria-*", "role", "id"],
            a: ["href", "target", "rel"],
          },
        })
        .use(rehypeStringify)
        .process(text);

      return String(file);
    } catch (error) {
      console.error(`Failed to parse inline markdown: ${text}`, error);
      return text;
    }
  },
);
