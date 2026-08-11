import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parseMDX } from "./utils/mdxParser";

// Fonction utilitaire pour résoudre le bon chemin selon la langue
const resolvePath = (filePath, locale = "fr") => {
  if (locale === "en" && filePath.startsWith("content/")) {
    return filePath.replace("content/", "content/en/");
  }
  return filePath;
};

// get index page data, ex: _index.md
export const getListPage = async (filePath, locale = "fr") => {
  const targetPath = resolvePath(filePath, locale);
  const fallbackPath = resolvePath("content/404.md", locale);

  let pageData, pageDataParsed;
  try {
    pageData = fs.readFileSync(path.join(process.cwd(), targetPath), "utf-8");
    pageDataParsed = matter(pageData);
  } catch (error) {
    // Fallback sur 404 si le fichier n'existe pas
    pageData = fs.readFileSync(path.join(process.cwd(), fallbackPath), "utf-8");
    pageDataParsed = matter(pageData);
  }

  let frontmatter, content;
  if (pageDataParsed) {
    content = pageDataParsed.content;
    frontmatter = pageDataParsed.data;
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
  const targetFolder = resolvePath(folder, locale);
  const absoluteFolder = path.join(process.cwd(), targetFolder);
  
  const filesPath = fs.readdirSync(absoluteFolder);
  const sanitizeFiles = filesPath.filter((file) => file.includes(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) => file.match(/^(?!_)/));
  
  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const pageData = fs.readFileSync(path.join(absoluteFolder, filename), "utf-8");
    const pageDataParsed = matter(pageData);
    const frontmatterString = JSON.stringify(pageDataParsed.data);
    const frontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;
    return { frontmatter: frontmatter, slug: url, content: content };
  });

  const publishedPages = singlePages.filter(
    (page) => !page.frontmatter.draft && page.frontmatter.layout !== "404" && page
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date()
  );

  return filterByDate;
};

// get regular page data, ex: about.md
export const getRegularPage = async (slug, locale = "fr") => {
  const publishedPages = getSinglePage("content", locale);
  const pageData = publishedPages.filter((data) => data.slug === slug);
  const fallbackPath = resolvePath("content/404.md", locale);
  const notFoundPage = fs.readFileSync(path.join(process.cwd(), fallbackPath), "utf-8");
  const notFoundDataParsed = matter(notFoundPage);

  let frontmatter, content;
  if (pageData[0]) {
    content = pageData[0].content;
    frontmatter = pageData[0].frontmatter;
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