import { getArticle } from "@lib/articles";
import { getCategoriesAll } from "@lib/categories";

import DashboardArticleEditHead from "./page-head";
import DashboardArticleEditForm from "./page-form";

export type DashboardArticleEditProps = {
  params: Promise<{ id: string }>;
};

export default async function DashboardArticleEdit({ params }: DashboardArticleEditProps) {
  const { id } = await params;
  const article = await getArticle({ id });
  const categories = await getCategoriesAll();

  return (
    <main id="skip">
      <section className="section" id="articles-edit">
        <DashboardArticleEditHead/>
        <DashboardArticleEditForm article={article} categories={categories}/>
      </section>
    </main>
  );
}
