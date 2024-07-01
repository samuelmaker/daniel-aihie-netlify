import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const editsDirectory = path.join(process.cwd(), "decap_cms/content/edits");

export type EditsContent = {
  date: string;
  title: string;
  thumbnail: string;
  slug: string;
};

let EditsCache: EditsContent[];

export function fetchEditsContent(): EditsContent[] {
  if (EditsCache) {
    return EditsCache;
  }
  // Get file names under /edits
  const fileNames = fs.readdirSync(editsDirectory);
  const allEditsData = fileNames
    .filter((it) => it.endsWith(".md"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(editsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the Edits metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as EditsContent;
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
  EditsCache = allEditsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return EditsCache;
}

export function listEditsContent(): EditsContent[] {
  return fetchEditsContent();
}
export function loadEditBySlug(slug: string) {
  const fullPath = path.join(editsDirectory, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents, {
      engines: {
        yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
      },
    });
    const matterContent = matterResult.content;
    const matterData = matterResult.data as EditsContent;
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
