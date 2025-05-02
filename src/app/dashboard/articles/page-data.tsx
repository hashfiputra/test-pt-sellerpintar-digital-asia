"use client";

import { type MouseEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useIsMounted } from "usehooks-ts";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import Link from "next/link";
import Image from "next/image";

import { useFilter } from "@contexts/FilterContext";

import { type Article, type Articles } from "@lib/articles";
import { parseDate, toNumber } from "@lib/utils";

import Pagination from "@common/Pagination";

import * as TableUI from "@ui/Table";
import * as DialogUI from "@ui/Dialog";
import { Button } from "@ui/Button";

export type DashboardArticlesDataProps = {
  articles: Articles;
};

export default function DashboardArticlesData({ articles }: DashboardArticlesDataProps) {
  const router = useRouter();
  const mounted = useIsMounted();
  const [saved, setSaved] = useState<Articles | null>(articles);
  const [selected, setSelected] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { category, title } = useFilter();
  const { data, page = 1, limit = 0, total = 0 } = saved || {};
  const [current, setCurrent] = useState(page);

  const onPreview = useCallback((payload: Article) => {
    const { user, title, content, imageUrl } = payload;
    const data = { username: user.username, title, content, imageUrl };
    const stringify = JSON.stringify(data);
    const encode = btoa(stringify);

    window.open(`/article/preview?data=${encode}`, "_blank");
  }, []);

  const onDelete = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete("/api/articles/" + selected);

      router.refresh();
      setOpen(false);
      toast.success(data.message);
    } catch (e) {
      const response = axios.isAxiosError(e) ? e.response : null;
      const message = response?.data?.message || "Something went wrong, try again later";

      toast.error(message);
    }
  }, [selected, router]);

  const onClickDelete = useCallback((id: string) => {
    setOpen(true);
    setSelected(id);
  }, []);

  const onClick = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const page = e.currentTarget.getAttribute("data-number");
    const query = new URLSearchParams();

    query.set("limit", "10");
    if (page) query.set("page", page);
    if (category) query.set("category", category);
    if (title) query.set("title", title);

    try {
      const url = "/api/articles" + "?" + query.toString();
      const update = await axios.get(url);
      const parsed = toNumber(page);

      setCurrent(parsed);
      setSaved(update.data);
    } catch (e) {
      const response = axios.isAxiosError(e) ? e.response : null;
      const message = response?.data?.message || "Something went wrong, try again later";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [category, title]);

  const onPrevious = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const page = (current - 1).toString();
    const query = new URLSearchParams();

    query.set("limit", "10");
    if (page) query.set("page", page);
    if (category) query.set("category", category);
    if (title) query.set("title", title);

    try {
      const url = "/api/articles" + "?" + query.toString();
      const update = await axios.get(url);

      setCurrent(current - 1);
      setSaved(update.data);
    } catch (e) {
      const response = axios.isAxiosError(e) ? e.response : null;
      const message = response?.data?.message || "Something went wrong, try again later";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [current, category, title]);

  const onNext = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const page = (current + 1).toString();
    const query = new URLSearchParams();

    query.set("limit", "10");
    if (page) query.set("page", page);
    if (category) query.set("category", category);
    if (title) query.set("title", title);

    try {
      const url = "/api/articles" + "?" + query.toString();
      const update = await axios.get(url);

      setCurrent(current + 1);
      setSaved(update.data);
    } catch (e) {
      const response = axios.isAxiosError(e) ? e.response : null;
      const message = response?.data?.message || "Something went wrong, try again later";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [current, category, title]);

  useEffect(() => {
    if (!mounted()) return;

    setCurrent(1);
    setSaved(articles);
    setLoading(false);
  }, [mounted, articles]);

  useEffect(() => {
    if (!mounted()) return;
    const getUpdate = async () => {
      setLoading(true);

      const query = new URLSearchParams();
      if (category) query.set("category", category);
      if (title) query.set("title", title);
      query.set("limit", "10");
      query.set("page", "1");

      try {
        const url = "/api/articles" + "?" + query.toString();
        const update = await axios.get(url);

        setCurrent(1);
        setSaved(update.data);
      } catch (e) {
        const basic = "Something went wrong, try again later";
        const message = axios.isAxiosError(e) ? e.response?.data?.message : basic;

        setCurrent(1);
        setSaved(null);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    getUpdate().then();
  }, [mounted, category, title]);

  return (
    <div className="data" data-loading={loading}>
      <TableUI.Table id="articles-table">
        <TableUI.TableHeader>
          <TableUI.TableRow>
            <TableUI.TableHead>Thumbnail</TableUI.TableHead>
            <TableUI.TableHead>Title</TableUI.TableHead>
            <TableUI.TableHead>Category</TableUI.TableHead>
            <TableUI.TableHead>Created at</TableUI.TableHead>
            <TableUI.TableHead>Action</TableUI.TableHead>
          </TableUI.TableRow>
        </TableUI.TableHeader>
        <TableUI.TableBody>
          {data?.map((article) => (
            <TableUI.TableRow key={article.id}>
              <TableUI.TableCell>
                {!article.imageUrl && "No image"}
                {article.imageUrl && (
                  <div className="image">
                    <div className="image__wrapper">
                      <Image src={article.imageUrl} alt={article.title} fill={true}/>
                    </div>
                  </div>
                )}
              </TableUI.TableCell>
              <TableUI.TableCell>{article.title}</TableUI.TableCell>
              <TableUI.TableCell>{article.category.name}</TableUI.TableCell>
              <TableUI.TableCell>{parseDate(article.createdAt, true)}</TableUI.TableCell>
              <TableUI.TableAction>
                <Link className="preview" href="#" onClick={() => onPreview(article)}>Preview</Link>
                <Link className="edit" href={`/dashboard/articles-edit/${article.id}`}>Edit</Link>
                <button className="delete" onClick={() => onClickDelete(article.id)}>Delete</button>
              </TableUI.TableAction>
            </TableUI.TableRow>
          ))}
          {!data?.length && (
            <TableUI.TableRow>
              <TableUI.TableCell colSpan={3}>
                <span className="empty">
                  Nothing found in here
                </span>
              </TableUI.TableCell>
            </TableUI.TableRow>
          )}
        </TableUI.TableBody>
      </TableUI.Table>
      <div className="pagination">
        {!!data?.length && (
          <Pagination
            page={current}
            last={Math.ceil(total / limit)}
            onClick={onClick}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        )}
      </div>
      <DialogUI.Dialog open={open} onOpenChange={(open) => setOpen(!loading ? open : true)}>
        <DialogUI.DialogContent noClose>
          <DialogUI.DialogHeader>
            <DialogUI.DialogTitle>Delete Articles</DialogUI.DialogTitle>
            <DialogUI.DialogDescription>
              Deleting this articles is permanent and cannot be undone.
              All related content will be removed.
            </DialogUI.DialogDescription>
          </DialogUI.DialogHeader>
          <DialogUI.DialogFooter>
            <DialogUI.DialogClose asChild>
              <Button variant="outline" disabled={loading}>
                Cancel
              </Button>
            </DialogUI.DialogClose>
            <Button variant="destructive" disabled={loading} onClick={onDelete}>
              {loading && <Loader2 className="animate-spin"/>}
              Delete
            </Button>
          </DialogUI.DialogFooter>
        </DialogUI.DialogContent>
      </DialogUI.Dialog>
    </div>
  );
}
