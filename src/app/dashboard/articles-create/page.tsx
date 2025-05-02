import { getCategoriesAll } from "@lib/categories";

import DashboardArticleCreateHead from "./page-head";
import DashboardArticleCreateForm from "./page-form";

export default async function DashboardArticleCreate() {
  const categories = await getCategoriesAll();

  return (
    <main id="skip">
      <section className="section" id="articles-create">
        <DashboardArticleCreateHead/>
        <DashboardArticleCreateForm categories={categories}/>
      </section>
    </main>
  );
}
