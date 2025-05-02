import { getCategories } from "@lib/categories";
import { CategoryProvider } from "@contexts/CategoryContext";

import DashboardCategoryHead from "./page-head";
import DashboardCategoryData from "./page-data";

export default async function DashboardCategory() {
  const categories = await getCategories({ page: 1, limit: 10 });
  const { totalData } = categories;

  return (
    <main id="skip">
      <section className="section" id="category">
        <CategoryProvider>
          <DashboardCategoryHead total={totalData}/>
          <DashboardCategoryData categories={categories}/>
        </CategoryProvider>
      </section>
    </main>
  );
}
