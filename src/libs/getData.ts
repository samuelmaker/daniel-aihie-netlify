import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import path from "path";

export type PostData = {
  layout?: string;
  title: string;
  slug: string;
  date: string;
  thumbnail: string;
  headerImg?: string;
  author?: string;
};

let PostsCache: { [directory: string]: PostData[] } = {};

export function parsePostMatter(fileContents: string) {
  const firstLine = fileContents.split(/\r?\n/, 1)[0].trim();
  if (firstLine.startsWith("---")) {
    const language = firstLine.slice(3).trim().toLowerCase();
    if (language && language !== "yaml" && language !== "yml") {
      throw new Error("Post front matter must use YAML");
    }
  }
  return matter(fileContents, {
    engines: {
      yaml: (source) => yaml.load(source, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
}

export function fetchPosts(directory: string): PostData[] {
  // Check if cache exists for the specific directory
  if (PostsCache[directory]) {
    return PostsCache[directory];
  }
  // Get file names under the specified directory
  const fileNames = fs.readdirSync(directory);
  const allPostsData = fileNames
    .filter((it) => it.endsWith(".md"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the metadata section
      const matterResult = parsePostMatter(fileContents);
      const matterData = matterResult.data as PostData;

      const slug = fileName.replace(/\.md$/, "");

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return matterData;
    });
  // Sort posts by date
  PostsCache[directory] = allPostsData.sort((a, b) =>
    a.date < b.date ? 1 : -1
  );
  return PostsCache[directory];
}

export function loadEditBySlug(directory: string, slug: string) {
  if (typeof slug !== "string" || !slug || slug.includes("/") || slug.includes("\\") || slug.includes("\0")) {
    return undefined;
  }
  const fullPath = path.resolve(directory, `${slug}.md`);
  if (path.dirname(fullPath) !== path.resolve(directory)) {
    return undefined;
  }
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = parsePostMatter(fileContents);
    const matterContent = matterResult.content as string;
    const matterData = matterResult.data as PostData;
    if (matterData.slug !== slug) {
      throw new Error(
        "slug field does not match with the path of its content source"
      );
    }
    return {
      ...matterData,
      content: matterContent,
    };
  } catch (error) {
    console.error(`Error loading the post with slug '${slug}':`, error);
    return undefined;
  }
}
