"use client";

import { type MouseEvent, useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useIsMounted } from "usehooks-ts";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { useCategory } from "@contexts/CategoryContext";
import { type EditSchema, editSchema } from "@schemas/categories";

import { type Categories } from "@lib/categories";
import { parseDate, toNumber } from "@lib/utils";

import Pagination from "@common/Pagination";
import * as TableUI from "@ui/Table";
import * as DialogUI from "@ui/Dialog";
import * as FormUI from "@ui/Form";
import { Button } from "@ui/Button";
import Input from "@ui/Input";

export type DashboardCategoryDataProps = {
  categories: Categories;
};

export default function DashboardCategoryData({ categories }: DashboardCategoryDataProps) {
  const router = useRouter();
  const mounted = useIsMounted();
  const [saved, setSaved] = useState<Categories | null>(categories);
  const [selected, setSelected] = useState<{ id: string; name: string }>();
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { category } = useCategory();
  const { data, currentPage = 1, totalPages = 0 } = saved || {};
  const [current, setCurrent] = useState(currentPage);
  const form = useForm<EditSchema>({
    resolver: zodResolver(editSchema),
    defaultValues: { name: "" },
  });

  const onEdit = useCallback(async (values: EditSchema) => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/categories/" + selected?.id, values);

      form.reset();
      router.refresh();
      setOpenEdit(false);
      toast.success(data.message);
    } catch (e) {
      const response = axios.isAxiosError(e) ? e.response : null;
      const message = response?.data?.message || "Something went wrong, try again later";

      toast.error(message);
    }
  }, [selected, router, form]);

  const onDelete = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete("/api/categories/" + selected?.id);

      form.reset();
      router.refresh();
      setOpenDelete(false);
      toast.success(data.message);
    } catch (e) {
      const response = axios.isAxiosError(e) ? e.response : null;
      const message = response?.data?.message || "Something went wrong, try again later";

      toast.error(message);
    }
  }, [selected, router, form]);

  const onClick = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const page = e.currentTarget.getAttribute("data-number");
    const query = new URLSearchParams();

    query.set("limit", "10");
    if (page) query.set("page", page);
    if (category) query.set("search", category);

    try {
      const url = "/api/categories" + "?" + query.toString();
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
  }, [category]);

  const onPrevious = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const page = (current - 1).toString();
    const query = new URLSearchParams();

    query.set("limit", "10");
    if (page) query.set("page", page);
    if (category) query.set("search", category);

    try {
      const url = "/api/categories" + "?" + query.toString();
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
  }, [current, category]);

  const onNext = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const page = (current + 1).toString();
    const query = new URLSearchParams();

    query.set("limit", "10");
    if (page) query.set("page", page);
    if (category) query.set("search", category);

    try {
      const url = "/api/categories" + "?" + query.toString();
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
  }, [current, category]);

  useEffect(() => {
    if (!mounted()) return;

    setCurrent(1);
    setSaved(categories);
    setLoading(false);
  }, [mounted, categories]);

  useEffect(() => {
    if (!mounted()) return;
    const getUpdate = async () => {
      setLoading(true);

      const query = new URLSearchParams();
      if (category) query.set("search", category);
      query.set("limit", "10");
      query.set("page", "1");

      try {
        const url = "/api/categories" + "?" + query.toString();
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
  }, [mounted, category]);

  return (
    <div className="data" data-loading={loading}>
      <TableUI.Table>
        <TableUI.TableHeader>
          <TableUI.TableRow>
            <TableUI.TableHead>Category</TableUI.TableHead>
            <TableUI.TableHead>Created at</TableUI.TableHead>
            <TableUI.TableHead>Action</TableUI.TableHead>
          </TableUI.TableRow>
        </TableUI.TableHeader>
        <TableUI.TableBody>
          {data?.map(({ id, name, createdAt }) => (
            <TableUI.TableRow key={id}>
              <TableUI.TableCell>{name}</TableUI.TableCell>
              <TableUI.TableCell>{parseDate(createdAt, true)}</TableUI.TableCell>
              <TableUI.TableAction>
                <button className="edit" onClick={() => {
                  setOpenEdit(true);
                  setSelected({ id, name });
                }}>
                  Edit
                </button>
                <button className="delete" onClick={() => {
                  setOpenDelete(true);
                  setSelected({ id, name });
                }}>
                  Delete
                </button>
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
            last={totalPages}
            onClick={onClick}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        )}
      </div>
      <DialogUI.Dialog open={openEdit} onOpenChange={(open) => setOpenEdit(!loading ? open : true)}>
        <DialogUI.DialogContent className="p-0" noClose>
          <FormUI.Form {...form}>
            <form onSubmit={form.handleSubmit(onEdit)}>
              <DialogUI.DialogHeader className="p-6">
                <DialogUI.DialogTitle>Edit Category</DialogUI.DialogTitle>
                <DialogUI.DialogDescription className="sr-only">
                  Edit current category with new name
                </DialogUI.DialogDescription>
              </DialogUI.DialogHeader>
              <div className="flex flex-col gap-4 px-6 pt-2 pb-8">
                <FormUI.FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormUI.FormItem>
                      <FormUI.FormLabel>Category</FormUI.FormLabel>
                      <FormUI.FormControl>
                        <Input type="text" placeholder="Input Category" autoComplete="off" {...field}/>
                      </FormUI.FormControl>
                      <FormUI.FormMessage/>
                    </FormUI.FormItem>
                  )}
                />
              </div>
              <DialogUI.DialogFooter className="px-6 pb-6">
                <DialogUI.DialogClose asChild>
                  <Button type="reset" variant="outline" disabled={loading}>
                    Cancel
                  </Button>
                </DialogUI.DialogClose>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="animate-spin"/>}
                  Save Changes
                </Button>
              </DialogUI.DialogFooter>
            </form>
          </FormUI.Form>
        </DialogUI.DialogContent>
      </DialogUI.Dialog>
      <DialogUI.Dialog open={openDelete} onOpenChange={(open) => setOpenDelete(!loading ? open : true)}>
        <DialogUI.DialogContent noClose>
          <DialogUI.DialogHeader>
            <DialogUI.DialogTitle>Delete Category</DialogUI.DialogTitle>
            <DialogUI.DialogDescription>
              Delete category &#34;{selected?.name}&#34;?
              This will remove it from master data permanently.
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
