"use client";

import { type ComponentProps } from "react";

import * as Primitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { classMerge } from "@lib/utils";

export type DialogProps = ComponentProps<typeof Primitive.Root>;
export type DialogPortalProps = ComponentProps<typeof Primitive.Portal>;
export type DialogTriggerProps = ComponentProps<typeof Primitive.Trigger>;
export type DialogOverlayProps = ComponentProps<typeof Primitive.Overlay>;
export type DialogContentProps = ComponentProps<typeof Primitive.Content> & { noClose?: boolean };
export type DialogCloseProps = ComponentProps<typeof Primitive.Close>;
export type DialogTitleProps = ComponentProps<typeof Primitive.Title>;
export type DialogDescriptionProps = ComponentProps<typeof Primitive.Description>;
export type DialogHeaderProps = ComponentProps<"div">;
export type DialogFooterProps = ComponentProps<"div">;

export function Dialog(props: DialogProps) {
  return <Primitive.Root data-slot="dialog" {...props}/>;
}

export function DialogTrigger(props: DialogTriggerProps) {
  return <Primitive.Trigger data-slot="dialog-trigger" {...props}/>;
}

export function DialogPortal(props: DialogPortalProps) {
  return <Primitive.Portal data-slot="dialog-portal" {...props}/>;
}

export function DialogClose(props: DialogCloseProps) {
  return <Primitive.Close data-slot="dialog-close" {...props}/>;
}

export function DialogOverlay(props: DialogOverlayProps) {
  const {className, ...rest} = props;
  const classes = classMerge(
    "fixed inset-0 bg-overlay z-50 " +
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 " +
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
    className,
  );

  return <Primitive.Overlay data-slot="dialog-overlay" className={classes} {...rest}/>;
}

export function DialogContent(props: DialogContentProps) {
  const {className, children, noClose, ...rest} = props;
  const classes = classMerge(
    "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] " +
    "grid gap-4 p-6 bg-background w-full max-w-[calc(100%-2rem)] " +
    "rounded-md border duration-200 z-50 sm:max-w-100 " +
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 " +
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    className,
  );

  const classesClose =
    "absolute top-4 right-4 rounded-xs " +
    "opacity-70 transition-opacity ring-offset-background " +
    "hover:opacity-100 disabled:pointer-events-none " +
    "focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-hidden " +
    "data-[state=open]:bg-accent data-[state=open]:text-muted-foreground " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay/>
      <Primitive.Content data-slot="dialog-content" className={classes} {...rest}>
        {children}
        {!noClose && (
          <Primitive.Close className={classesClose}>
            <X/>
            <span className="sr-only">Close</span>
          </Primitive.Close>
        )}
      </Primitive.Content>
    </DialogPortal>
  );
}

export function DialogHeader(props: DialogHeaderProps) {
  const {className, ...rest} = props;
  const classes = classMerge("flex flex-col gap-2 text-center sm:text-left", className);

  return <div data-slot="dialog-header" className={classes} {...rest}/>;
}

export function DialogFooter(props: DialogFooterProps) {
  const {className, ...rest} = props;
  const classes = classMerge("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className);

  return <div data-slot="dialog-footer" className={classes} {...rest}/>;
}

export function DialogTitle(props: DialogTitleProps) {
  const {className, ...rest} = props;
  const classes = classMerge("text-lg font-semibold", className);

  return <Primitive.Title data-slot="dialog-title" className={classes} {...rest}/>;
}

export function DialogDescription(props: DialogDescriptionProps) {
  const {className, ...rest} = props;
  const classes = classMerge("text-muted-foreground text-sm", className);

  return <Primitive.Description data-slot="dialog-description" className={classes} {...rest}/>;
}
