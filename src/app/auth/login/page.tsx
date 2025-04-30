"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import Brand from "@ui/Brand";
import Input from "@ui/Input";
import Button from "@ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/Form";

import type { LoginSchema } from "@lib/auth";
import { loginSchema } from "@lib/auth";

export default function Login() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    setRequesting(true); // Start requesting from API

    try {
      await axios.post("/api/auth/login", values);

      router.replace("/");
      router.refresh();
    } catch (e) {
      const isAxiosError = axios.isAxiosError(e);
      const message = isAxiosError ? e.response?.data?.message : "Something went wrong, try again later";

      toast.error(message);
      setRequesting(false);
    }
  };

  return (
    <main className="login" id="skip">
      <Form {...form}>
        <form className="login__form" onSubmit={form.handleSubmit(onSubmit)}>
          <Link className="login__logo" href="/">
            <Brand className="login__brand" theme="light"/>
          </Link>
          <div className="login__fields">
            <FormField
              control={form.control}
              name="username"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Input username" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="login__password">
                      <Input type={visible ? "text" : "password"} placeholder="Input password" {...field}/>
                      {!visible && <Eye className="login__password-eye" onClick={() => setVisible(true)}/>}
                      {visible && <EyeOff className="login__password-eye" onClick={() => setVisible(false)}/>}
                    </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button className="login__submit" type="submit" disabled={requesting} full>
            {requesting && <Loader2 className="animate-spin"/>}
            Login
          </Button>
          <span className="login__help">
            <span className="login__help-text">Don’t have an account? </span>
            <Link className="login__help-link" href="/auth/register">Register</Link>
          </span>
        </form>
      </Form>
    </main>
  );
}
