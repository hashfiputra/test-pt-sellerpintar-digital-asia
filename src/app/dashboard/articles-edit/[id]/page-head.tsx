import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DashboardArticleEditHead() {
  return (
    <div className="head">
      <Link className="back" href="/dashboard/articles"><ArrowLeft/></Link>
      <h1 className="title">Edit Articles</h1>
    </div>
  );
}
