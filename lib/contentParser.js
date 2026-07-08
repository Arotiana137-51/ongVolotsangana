import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parseMDX } from "./utils/mdxParser";

// Rewrite a "content/..." path to its localized twin ("content/en/...") when a
// non-default locale is requested, falling back to the French file if the
// localized one doesn't exist. FR files stay at the content/ root.
// ponytail: fall back to FR if the localized file is missing
const localize = (contentPath, locale) => {
  if (locale === "fr") return contentPath;
  const localized = contentPath.replace(/^content/, `content/${locale}`);
  return fs.existsSync(localized) ? localized : contentPath;
};

// get index page data, ex: _index.md
export const getListPage = async (filePath, locale = "fr") => {
  const pageData = fs.readFileSync(localize(filePath, locale), "utf-8");
  const pageDataParsed = matter(pageData);
  const notFoundPage = fs.readFileSync(path.join("content/404.md"), "utf-8");
  const notFoundDataParsed = matter(notFoundPage);
  let frontmatter, content;

  if (pageDataParsed) {
    content = pageDataParsed.content;
    frontmatter = pageDataParsed.data;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};

// get all single pages, ex: blog/post.md
export const getSinglePage = (folder, locale = "fr") => {
  const resolved = localize(folder, locale);
  const filesPath = fs.readdirSync(path.join(resolved));
  const sanitizeFiles = filesPath.filter((file) => file.includes(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/)
  );
  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const pageData = fs.readFileSync(path.join(resolved, filename), "utf-8");
    const pageDataParsed = matter(pageData);
    const frontmatterString = JSON.stringify(pageDataParsed.data);
    const frontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;
    return { frontmatter: frontmatter, slug: url, content: content };
  });

  const publishedPages = singlePages.filter(
    (page) =>
      !page.frontmatter.draft && page.frontmatter.layout !== "404" && page
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date()
  );

  return filterByDate;
};

// get regular page data, ex: about.md
export const getRegularPage = async (slug, locale = "fr") => {
  // Routes are enumerated from the French tree (source of truth); the localized
  // file, if present, supplies the translated frontmatter + body.
  // ponytail: assumes slug === filename (no url-frontmatter remap on these pages)
  const publishedPages = getSinglePage("content");
  const frPage = publishedPages.find((data) => data.slug === slug);
  const localizedFile = path.join(`content/${locale}`, `${slug}.md`);

  let frontmatter, content;
  if (locale !== "fr" && fs.existsSync(localizedFile)) {
    const parsed = matter(fs.readFileSync(localizedFile, "utf-8"));
    frontmatter = parsed.data;
    content = parsed.content;
  } else if (frPage) {
    content = frPage.content;
    frontmatter = frPage.frontmatter;
  } else {
    const notFoundDataParsed = matter(
      fs.readFileSync(path.join("content/404.md"), "utf-8"),
    );
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};
