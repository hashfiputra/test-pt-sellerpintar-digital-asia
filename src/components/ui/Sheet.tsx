"use client";

import { type ComponentProps } from "react";
import * as Primitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { classMerge } from "@lib/utils";

type SheetSide = "top" | "right" | "bottom" | "left";

export type SheetProps = ComponentProps<typeof Primitive.Root>;
export type SheetTriggerProps = ComponentProps<typeof Primitive.Trigger>;
export type SheetCloseProps = ComponentProps<typeof Primitive.Close>;
export type SheetPortalProps = ComponentProps<typeof Primitive.Portal>;
export type SheetOverlayProps = ComponentProps<typeof Primitive.Overlay>;
export type SheetContentProps = ComponentProps<typeof Primitive.Content> & { side?: SheetSide };
export type SheetHeaderProps = ComponentProps<"div">;
export type SheetFooterProps = ComponentProps<"div">;
export type SheetTitleProps = ComponentProps<typeof Primitive.Title>;
export type SheetDescriptionProps = ComponentProps<typeof Primitive.Description>;

export function Sheet(props: SheetProps) {
  return <Primitive.Root data-slot="sheet" {...props} />;
}

export function SheetTrigger(props: SheetTriggerProps) {
  return <Primitive.Trigger data-slot="sheet-trigger" {...props} />;
}

export function SheetClose(props: SheetCloseProps) {
  const { className, ...rest } = props;
  const classes = classMerge(
    "absolute right-4 top-4 " +
    "rounded-xs opacity-70 ring-offset-background transition-opacity " +
    "disabled:pointer-events-none hover:opacity-100 data-[state=open]:bg-secondary " +
    "focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-ring",
    className,
  );

  return (
    <Primitive.Close data-slot="sheet-close" className={classes} {...rest}>
      <X className="size-4"/>
      <span className="sr-only">Close</span>
    </Primitive.Close>
  );
}

export function SheetPortal(props: SheetPortalProps) {
  return <Primitive.Portal data-slot="sheet-portal" {...props} />;
}

export function SheetOverlay(props: SheetOverlayProps) {
  const { className, ...rest } = props;
  const classes = classMerge(
    "fixed inset-0 bg-black/50 z-50 " +
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 " +
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
    className,
  );

  return (
    <Primitive.Overlay
      data-slot="sheet-overlay"
      className={classes}
      {...rest}
    />
  );
}

export function SheetContent(props: SheetContentProps) {
  const { className, children, side = "right", ...rest } = props;
  const classes = classMerge(
    "flex flex-col gap-4 shadow-lg " +
    "fixed bg-background transition ease-in-out z-50 " +
    "data-[state=open]:animate-in data-[state=open]:duration-500 " +
    "data-[state=closed]:animate-out data-[state=closed]:duration-300",
    side === "right" && "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm " +
    "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
    side === "left" && "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm " +
    "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
    side === "top" && "inset-x-0 top-0 h-auto " +
    "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
    side === "bottom" && "inset-x-0 bottom-0 h-auto " +
    "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
    className,
  );

  return (
    <SheetPortal>
      <SheetOverlay/>
      <Primitive.Content data-slot="sheet-content" className={classes} {...rest}>
        {children}
        <SheetClose/>
      </Primitive.Content>
    </SheetPortal>
  );
}

export function SheetHeader(props: SheetHeaderProps) {
  const { className, ...rest } = props;
  const classes = classMerge("flex flex-col gap-1.5 p-4", className);

  return <div data-slot="sheet-header" className={classes} {...rest}/>;
}

export function SheetFooter(props: SheetFooterProps) {
  const { className, ...rest } = props;
  const classes = classMerge("mt-auto flex flex-col gap-2 p-4", className);

  return <div data-slot="sheet-footer" className={classes} {...rest}/>;
}

export function SheetTitle(props: SheetTitleProps) {
  const { className, ...rest } = props;
  const classes = classMerge("text-foreground font-semibold", className);

  return <Primitive.Title data-slot="sheet-title" className={classes} {...rest}/>;
}

export function SheetDescription(props: SheetDescriptionProps) {
  const { className, ...rest } = props;
  const classes = classMerge("text-sm text-muted-foreground", className);

  return <Primitive.Description data-slot="sheet-description" className={classes} {...rest}/>;
}
