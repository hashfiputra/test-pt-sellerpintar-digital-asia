"use client";

import type { ComponentProps } from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { createContext, useContext, useId } from "react";
import { Controller, FormProvider, useFormContext, useFormState } from "react-hook-form";
import { Root } from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";

import { classMerge } from "@lib/utils";
import Label from "@ui/Label";

type FormItemContextValue = { id: string };
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = { name: TName };

export type FormItemProps = ComponentProps<"div">;
export type FormLabelProps = ComponentProps<typeof Root>;
export type FormControlProps = ComponentProps<typeof Slot>;
export type FormDescriptionProps = ComponentProps<"p">;
export type FormMessageProps = ComponentProps<"p">;
export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = ControllerProps<TFieldValues, TName>;

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);
const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  if (!fieldContext) throw new Error("useFormField should be used within <FormField>");

  const {getFieldState} = useFormContext();
  const itemContext = useContext(FormItemContext);
  const {id} = itemContext;

  const formState = useFormState({name: fieldContext.name});
  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

export const Form = FormProvider;

export function FormItem(props: FormItemProps) {
  const id = useId();
  const {className, ...rest} = props;
  const classes = classMerge("grid gap-1", className);

  return (
    <FormItemContext.Provider value={{id}}>
      <div data-slot="form-item" className={classes} {...rest}/>
    </FormItemContext.Provider>
  );
}

export function FormLabel(props: FormLabelProps) {
  const {error, formItemId} = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      htmlFor={formItemId}
      {...props}
    />
  );
}

export function FormControl(props: FormControlProps) {
  const {error, formItemId, formDescriptionId, formMessageId} = useFormField();
  const describedby = !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`;
  const invalid = !!error;

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={describedby}
      aria-invalid={invalid}
      {...props}
    />
  );
}

export function FormDescription(props: FormDescriptionProps) {
  const {className, ...rest} = props;
  const {formDescriptionId} = useFormField();
  const classes = classMerge("text-destructive text-sm", className);

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={classes}
      {...rest}
    />
  );
}

export function FormMessage(props: FormMessageProps) {
  const {error, formMessageId} = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;
  if (!body) return null;

  const {className, ...rest} = props;
  const classes = classMerge("text-destructive text-sm", className);

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={classes}
      {...rest}
    >
      {body}
    </p>
  );
}

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormFieldProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{name: props.name}}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};
