"use client";

import type { ComponentProps } from "react";

import * as Primitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { classMerge } from "@lib/utils";

export type SelectProps = ComponentProps<typeof Primitive.Root>;
export type SelectGroupProps = ComponentProps<typeof Primitive.Group>;
export type SelectValueProps = ComponentProps<typeof Primitive.Value>;
export type SelectTriggerProps = ComponentProps<typeof Primitive.Trigger>;
export type SelectContentProps = ComponentProps<typeof Primitive.Content>;
export type SelectLabelProps = ComponentProps<typeof Primitive.Label>;
export type SelectItemProps = ComponentProps<typeof Primitive.Item>;
export type SelectSeparatorProps = ComponentProps<typeof Primitive.Separator>;
export type SelectScrollUpButtonProps = ComponentProps<typeof Primitive.ScrollUpButton>;
export type SelectScrollDownButtonProps = ComponentProps<typeof Primitive.ScrollDownButton>;

export function Select(props: SelectProps) {
  return <Primitive.Root data-slot="select" {...props}/>;
}

export function SelectGroup(props: SelectGroupProps) {
  return <Primitive.Group data-slot="select-group" {...props}/>;
}

export function SelectValue(props: SelectValueProps) {
  return <Primitive.Value data-slot="select-value" {...props}/>;
}

export function SelectTrigger(props: SelectTriggerProps) {
  const { className, children, ...rest } = props;
  const classes = classMerge(
    "flex items-center justify-between gap-2 " +
    "bg-background text-select-foreground text-sm px-3 py-2 h-10 w-full " +
    "border border-input rounded-md outline-none " +
    "whitespace-nowrap transition-[color,box-shadow] " +
    "dark:bg-input/30 dark:hover:bg-input/50 " +
    "disabled:cursor-not-allowed disabled:opacity-50 " +
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
    "*:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center " +
    "*:data-[slot=select-value]:gap-2 *:data-[slot=select-value]:line-clamp-1 " +
    "[&_svg:not([class*='text-'])]:text-select-foreground [&_svg:not([class*='size-'])]:size-4 " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    className,
  );

  return (
    <Primitive.Trigger data-slot="select-trigger" className={classes} {...rest}>
      {children}
      <Primitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50"/>
      </Primitive.Icon>
    </Primitive.Trigger>
  );
}

export function SelectContent(props: SelectContentProps) {
  const { className, children, position = "popper", ...rest } = props;
  const classes = classMerge(
    "relative bg-popover text-popover-foreground " +
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 " +
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 " +
    "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 " +
    "data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2 " +
    "origin-(--radix-select-content-transform-origin)" +
    "min-w-[8rem] max-h-(--radix-select-content-available-height) rounded-md border shadow-md " +
    "overflow-x-hidden overflow-y-auto z-50",
    position === "popper" && "data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 " +
    "data-[side=top]:-translate-y-1 data-[side=bottom]:translate-y-1",
    className,
  );

  const classesViewport = classMerge(
    "p-1",
    position === "popper" && "w-full scroll-my-1 " +
    "min-w-[var(--radix-select-trigger-width)] h-[var(--radix-select-trigger-height)]"
  );


  return (
    <Primitive.Portal>
      <Primitive.Content data-slot="select-content" className={classes} position={position} {...rest}>
        <SelectScrollUpButton/>
        <Primitive.Viewport className={classesViewport}>
          {children}
        </Primitive.Viewport>
        <SelectScrollDownButton/>
      </Primitive.Content>
    </Primitive.Portal>
  );
}

export function SelectLabel(props: SelectLabelProps) {
  const { className, ...rest } = props;
  const classes = classMerge("text-muted-foreground px-2 py-1.5 text-xs", className);

  return <Primitive.Label data-slot="select-label" className={classes} {...rest}/>;
}

export function SelectItem(props: SelectItemProps) {
  const { className, children, ...rest } = props;
  const classes = classMerge(
    "relative flex items-center gap-2 " +
    "cursor-default w-full rounded-sm " +
    "py-1.5 pr-8 pl-2 text-sm outline-hidden select-none " +
    "[&_svg:not([class*='text-'])]:text-muted-foreground " +
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 " +
    "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
    className,
  );

  return (
    <Primitive.Item data-slot="select-item" className={classes} {...rest}>
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <Primitive.ItemIndicator>
          <CheckIcon className="size-4"/>
        </Primitive.ItemIndicator>
      </span>
      <Primitive.ItemText>
        {children}
      </Primitive.ItemText>
    </Primitive.Item>
  );
}

export function SelectSeparator(props: SelectSeparatorProps) {
  const { className, ...rest } = props;
  const classes = classMerge("bg-border pointer-events-none -mx-1 my-1 h-px", className);

  return <Primitive.Separator data-slot="select-separator" className={classes} {...rest}/>;
}

export function SelectScrollUpButton(props: SelectScrollUpButtonProps) {
  const { className, ...rest } = props;
  const classes = classMerge("flex cursor-default items-center justify-center py-1", className);

  return (
    <Primitive.ScrollUpButton data-slot="select-scroll-up-button" className={classes} {...rest}>
      <ChevronUpIcon className="size-4"/>
    </Primitive.ScrollUpButton>
  );
}

export function SelectScrollDownButton(props: SelectScrollDownButtonProps) {
  const { className, ...rest } = props;
  const classes = classMerge("flex cursor-default items-center justify-center py-1", className);

  return (
    <Primitive.ScrollDownButton data-slot="select-scroll-down-button" className={classes} {...rest}>
      <ChevronDownIcon className="size-4"/>
    </Primitive.ScrollDownButton>
  );
}
