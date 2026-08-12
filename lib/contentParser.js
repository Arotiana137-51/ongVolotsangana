import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parseMDX } from "./utils/mdxParser";

// Fonction utilitaire blindée pour résoudre le bon chemin selon la langue
const resolvePath = (filePath, locale = "fr") => {
  if (locale === "en") {
    if (filePath === "content") return "content/en";
    if (filePath.startsWith("content/")) {
      return filePath.replace("content/", "content/en/");
    }
  }
  return filePath;
};

export const getListPage = async (filePath, locale = "fr") => {
  const targetPath = resolvePath(filePath, locale);
  const fallbackPath = resolvePath("content/404.md", locale);
  let pageData, pageDataParsed;

  try {
    pageData = fs.readFileSync(path.join(process.cwd(), targetPath), "utf-8");
    pageDataParsed = matter(pageData);
  } catch (error) {
    pageData = fs.readFileSync(path.join(process.cwd(), fallbackPath), "utf-8");
    pageDataParsed = matter(pageData);
  }

  let frontmatter, content;
  if (pageDataParsed) {
    content = pageDataParsed.content;
    frontmatter = pageDataParsed.data;
  }

  const mdxContent = await parseMDX(content);
  return { frontmatter, content, mdxContent };
};

export const getSinglePage = (folder, locale = "fr") => {
  const targetFolder = resolvePath(folder, locale);
  const absoluteFolder = path.join(process.cwd(), targetFolder);
  
  // Sécurité : si le dossier n'existe pas, retourner un tableau vide
  if (!fs.existsSync(absoluteFolder)) {
    return [];
  }

  const filesPath = fs.readdirSync(absoluteFolder);
  const sanitizeFiles = filesPath.filter((file) => file.includes(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) => file.match(/^(?!_)/));
  
  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const pageData = fs.readFileSync(path.join(absoluteFolder, filename), "utf-8");
    const pageDataParsed = matter(pageData);
    const frontmatter = pageDataParsed.data;
    const content = pageDataParsed.content;
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;
    return { frontmatter, slug: url, content };
  });

  return singlePages.filter(
    (page) => !page.frontmatter.draft && page.frontmatter.layout !== "404" && new Date(page.frontmatter.date || new Date()) <= new Date()
  );
};

export const getRegularPage = async (slug, locale = "fr") => {
  const publishedPages = getSinglePage("content", locale);
  const pageData = publishedPages.filter((data) => data.slug === slug);
  const fallbackPath = resolvePath("content/404.md", locale);
  
  let frontmatter, content, mdxContent;
  
  if (pageData.length > 0) {
    content = pageData[0].content;
    frontmatter = pageData[0].frontmatter;
    mdxContent = await parseMDX(content);
  } else {
    const notFoundPage = fs.readFileSync(path.join(process.cwd(), fallbackPath), "utf-8");
    const notFoundDataParsed = matter(notFoundPage);
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data;
    mdxContent = await parseMDX(content);
  }

  return { frontmatter, content, mdxContent };
};