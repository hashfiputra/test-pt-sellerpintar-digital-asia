"use client";

import { useState } from "react";
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
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@ui/Select";

import type { RegisterSchema } from "@lib/auth";
import { registerSchema } from "@lib/auth";

export default function Register() {
  const [visible, setVisible] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    setRequesting(true); // Start requesting from API

    try {
      const {data} = await axios.post("/api/auth/register", values);
      const {message} = data;

      form.reset();
      toast.success(message);
    } catch (e) {
      const isAxiosError = axios.isAxiosError(e);
      const message = isAxiosError ? e.response?.data?.message : "Something went wrong, try again later";
      toast.error(message);
    }

    setRequesting(false); // Finish requesting from API
  };

  return (
    <main className="register" id="skip">
      <Form {...form}>
        <form className="register__form" onSubmit={form.handleSubmit(onSubmit)}>
          <Link className="register__logo" href="/">
            <Brand className="register__brand" theme="light"/>
          </Link>
          <div className="register__fields">
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
                    <div className="register__password">
                      <Input type={visible ? "text" : "password"} placeholder="Input password" {...field}/>
                      {!visible && <Eye className="register__password-eye" onClick={() => setVisible(true)}/>}
                      {visible && <EyeOff className="register__password-eye" onClick={() => setVisible(false)}/>}
                    </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role"/>
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage/>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button className="register__submit" type="submit" disabled={requesting} full>
            {requesting && <Loader2 className="animate-spin"/>}
            Register
          </Button>
          <span className="register__help">
            <span className="register__help-text">Already have an account? </span>
            <Link className="register__help-link" href="/auth/login">Login</Link>
          </span>
        </form>
      </Form>
    </main>
  );
}
