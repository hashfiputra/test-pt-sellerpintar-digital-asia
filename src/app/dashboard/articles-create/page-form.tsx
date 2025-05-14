"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import axios from "axios";

import { type AddSchema, editSchema } from "@schemas/articles";
import { type Categories } from "@lib/categories";

import Input from "@ui/Input";
import { Button } from "@ui/Button";
import { Textarea } from "@ui/Textarea";
import * as FormUI from "@ui/Form";
import * as SelectUI from "@ui/Select";
import * as DropzoneUI from "@ui/Dropzone";
import { DropzoneContent } from "@ui/Dropzone";

export type DashboardArticlesCreateFormProps = {
  categories: Categories;
};

export default function DashboardArticlesCreateForm({ categories }: DashboardArticlesCreateFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<AddSchema>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: "",
      content: "",
      categoryId: "",
      imageUrl: "",
    },
  });

  const cleanupObjectURL = useCallback(() => {
    const currentUrl = form.getValues("imageUrl");
    const isObjectUrl = currentUrl?.startsWith("blob:");
    if (isObjectUrl) URL.revokeObjectURL(currentUrl);
  }, [form]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    maxFiles: 1,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      cleanupObjectURL();
      const objectUrl = URL.createObjectURL(file);
      form.setValue("imageUrl", objectUrl);
    },
  });

  const onPreview = useCallback(async () => {
    const valid = await form.trigger();
    if (!valid) return;

    const data = {
      title: form.getValues("title"),
      content: form.getValues("content"),
      imageUrl: form.getValues("imageUrl"),
    };

    const stringify = JSON.stringify(data);
    const encode = btoa(stringify);

    window.open(`/article/preview?data=${encode}`, "_blank");
  }, [form]);

  const onSubmit = useCallback(async (values: AddSchema) => {
    try {
      setLoading(true);

      const response = await fetch(values.imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "image.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("image", file);

      const upload = await axios.post("/api/image", formData);
      const created = await axios.post("/api/articles", { ...values, imageUrl: upload.data.imageUrl });
      const { message } = created.data;

      toast.success(message);
    } catch (e) {
      const isAxiosError = axios.isAxiosError(e);
      const message = isAxiosError ? e.response?.data?.message : "Something went wrong, try again later";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => cleanupObjectURL();
  }, [cleanupObjectURL]);

  return (
    <FormUI.Form {...form}>
      <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="fields">
          <FormUI.FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormUI.FormItem>
                <FormUI.FormLabel>Thumbnails</FormUI.FormLabel>
                <FormUI.FormControl>
                  <DropzoneUI.Dropzone {...getRootProps()}>
                    <input {...getInputProps()}/>
                    <DropzoneContent
                      objectUrl={field.value}
                      alt="Thumbnail preview upload"
                      isDragActive={isDragActive}
                      openDropzone={open}
                      deletePreview={() => form.setValue("imageUrl", "")}
                    />
                  </DropzoneUI.Dropzone>
                </FormUI.FormControl>
                <FormUI.FormMessage/>
              </FormUI.FormItem>
            )}
          />
          <FormUI.FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormUI.FormItem>
                <FormUI.FormLabel>Title</FormUI.FormLabel>
                <FormUI.FormControl>
                  <Input type="text" placeholder="Input title" autoComplete="off" {...field}/>
                </FormUI.FormControl>
                <FormUI.FormMessage/>
              </FormUI.FormItem>
            )}
          />
          <FormUI.FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormUI.FormItem>
                <FormUI.FormLabel>Category</FormUI.FormLabel>
                <SelectUI.Select value={field.value} onValueChange={field.onChange}>
                  <FormUI.FormControl>
                    <div className="relative">
                      {field.value && <SelectUI.SelectReset onClick={() => form.setValue("categoryId", "")}/>}
                      <SelectUI.SelectTrigger data-empty={!field.value}>
                        <SelectUI.SelectValue placeholder="Select category"/>
                      </SelectUI.SelectTrigger>
                    </div>
                  </FormUI.FormControl>
                  <FormUI.FormMessage/>
                  <SelectUI.SelectContent>
                    {categories.data.map((category) => category.id ? (
                      <SelectUI.SelectItem value={category.id} key={category.id}>
                        {category.name}
                      </SelectUI.SelectItem>
                    ) : null)}
                  </SelectUI.SelectContent>
                </SelectUI.Select>
              </FormUI.FormItem>
            )}
          />
        </div>
        <FormUI.FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormUI.FormItem className="content">
              <FormUI.FormControl>
                <Textarea placeholder="Type a content..." autoComplete="off" {...field}/>
              </FormUI.FormControl>
              <FormUI.FormMessage/>
            </FormUI.FormItem>
          )}
        />
        <div className="buttons">
          <Button type="reset" variant="outline" disabled={loading} asChild={!loading}>
            <Link href="/dashboard/articles">Cancel</Link>
          </Button>
          <Button type="button" variant="secondary" disabled={loading} onClick={onPreview}>
            Preview
          </Button>
          <Button type="submit" variant="default" disabled={loading}>
            {loading && <Loader2 className="animate-spin"/>}
            Upload
          </Button>
        </div>
      </form>
    </FormUI.Form>
  );
}
