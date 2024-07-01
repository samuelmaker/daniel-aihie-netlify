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
  author?: string;
};

let PostsCache: PostData[];

export function fetchPosts(directory: string): PostData[] {
  if (PostsCache) {
    return PostsCache;
  }
  // Get file names under /edits
  const fileNames = fs.readdirSync(directory);
  const allPostsData = fileNames
    .filter((it) => it.endsWith(".md"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the Edits metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as PostData;
      // matterData.fullPath = fullPath;

      const slug = fileName.replace(/\.md$/, "");

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return matterData;
    });
  // Sort edits by date
  PostsCache = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return PostsCache;
}

export function loadEditBySlug(directory: string, slug: string) {
  const fullPath = path.join(directory, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents, {
      engines: {
        yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
      },
    });
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
