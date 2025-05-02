"use client";

import { type ChangeEvent, useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";

import { useCategory } from "@contexts/CategoryContext";
import { type AddSchema, addSchema, } from "@schemas/categories";

import Input from "@ui/Input";
import { Button } from "@ui/Button";
import * as DialogUI from "@ui/Dialog";
import * as FormUI from "@ui/Form";

export type DashboardCategoryHead = {
  total: number;
};

export default function DashboardCategoryHead({ total }: DashboardCategoryHead) {
  const router = useRouter();
  const { setCategory } = useCategory();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<AddSchema>({
    resolver: zodResolver(addSchema),
    defaultValues: { name: "" },
  });

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setCategory(value);
  }, [setCategory]);

  const onSubmit = useCallback(async (values: AddSchema) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/categories", values);

      form.reset();
      router.refresh();
      setOpen(false);
      toast.success(data.message);
    } catch (e) {
      const response = axios.isAxiosError(e) ? e.response : null;
      const message = response?.data?.message || "Something went wrong, try again later";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [router, form]);

  return (
    <DialogUI.Dialog open={open} onOpenChange={(open) => setOpen(!loading ? open : true)}>
      <div className="head">
        <div className="title">
          <span>Total category : {total}</span>
        </div>
        <div className="utility">
          <div className="search">
            <Search className="search__icon"/>
            <Input className="search__control" placeholder="Search Category" onChange={onChange}/>
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus/> Add Category
          </Button>
        </div>
      </div>
      <DialogUI.DialogContent className="p-0" noClose>
        <FormUI.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogUI.DialogHeader className="p-6">
              <DialogUI.DialogTitle>Add Category</DialogUI.DialogTitle>
              <DialogUI.DialogDescription className="sr-only">
                Add new category with your input
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
                Add
              </Button>
            </DialogUI.DialogFooter>
          </form>
        </FormUI.Form>
      </DialogUI.DialogContent>
    </DialogUI.Dialog>
  );
}
