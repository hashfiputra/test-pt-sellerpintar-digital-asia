import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DashboardArticleCreateHead() {
  return (
    <div className="head">
      <Link className="back" href="/dashboard/articles"><ArrowLeft/></Link>
      <h1 className="title">Create Articles</h1>
    </div>
  );
}
