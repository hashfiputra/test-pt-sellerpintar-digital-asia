import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { isAxiosError } from "axios";

import Header from "@common/Header";
import Footer from "@common/Footer";

import { getArticle } from "@lib/articles";

import ArticleContent from "./page-content";
import ArticleOthers from "./page-others";

export type ArticleProps = {
  params: Promise<{ id: string }>;
};

async function getSharedData(id: string) {
  try {
    const article = await getArticle({ id });
    if (!article) return notFound();

    return article;
  } catch (e) {
    const status = isAxiosError(e) ? e.status : 500;
    if (status === 404) return notFound();

    throw e;
  }
}

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getSharedData(id);

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.user.username }],
    category: article.category.name,
    keywords: [article.category.name],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      authors: [article.user.username],
      images: [
        {
          url: article.imageUrl,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    },
  };
}

export default async function Article({ params }: ArticleProps) {
  const { id } = await params;
  const article = await getSharedData(id);
  const { categoryId } = article;

  return (
    <>
      <Header fixed={true}/>
      <main className="article" id="skip">
        <ArticleContent article={article}/>
        <ArticleOthers id={id} category={categoryId}/>
      </main>
      <Footer/>
    </>
  );
}
