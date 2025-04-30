"use client";

import { type ComponentProps } from "react";

import * as Primitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { classMerge } from "@lib/utils";

type Variants = {
  inset?: boolean;
  variant?: "default" | "destructive";
};

export type DropdownProps = ComponentProps<typeof Primitive.Root>;
export type DropdownPortalProps = ComponentProps<typeof Primitive.Portal>;
export type DropdownTriggerProps = ComponentProps<typeof Primitive.Trigger>;
export type DropdownContentProps = ComponentProps<typeof Primitive.Content>;
export type DropdownGroupProps = ComponentProps<typeof Primitive.Group>;
export type DropdownItemProps = ComponentProps<typeof Primitive.Item> & Variants;
export type DropdownCheckboxItemProps = ComponentProps<typeof Primitive.CheckboxItem>;
export type DropdownRadioGroupProps = ComponentProps<typeof Primitive.RadioGroup>;
export type DropdownRadioItemProps = ComponentProps<typeof Primitive.RadioItem>;
export type DropdownLabelProps = ComponentProps<typeof Primitive.Label> & Variants;
export type DropdownSeparatorProps = ComponentProps<typeof Primitive.Separator>;
export type DropdownShortcutProps = ComponentProps<"span">;
export type DropdownSubProps = ComponentProps<typeof Primitive.Sub>;
export type DropdownSubTriggerProps = ComponentProps<typeof Primitive.SubTrigger> & Variants;
export type DropdownSubContentProps = ComponentProps<typeof Primitive.SubContent>;

export function Dropdown(props: DropdownProps) {
  return <Primitive.Root data-slot="dropdown-menu" {...props}/>;
}

export function DropdownPortal(props: DropdownPortalProps) {
  return <Primitive.Portal data-slot="dropdown-menu-portal" {...props}/>;
}

export function DropdownTrigger(props: DropdownTriggerProps) {
  return <Primitive.Trigger data-slot="dropdown-menu-trigger" {...props}/>;
}

export function DropdownContent(props: DropdownContentProps) {
  const {className, sideOffset = 4, ...rest} = props;
  const classes = classMerge(
    "bg-dropdown text-dropdown-foreground " +
    "overflow-x-hidden overflow-y-auto rounded-sm border shadow-dropdown-menu min-w-46 z-50 " +
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 " +
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 " +
    "data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2 " +
    "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 " +
    "max-h-(--radix-dropdown-menu-content-available-height) " +
    "origin-(--radix-dropdown-menu-content-transform-origin)",
    className,
  );

  return (
    <Primitive.Portal>
      <Primitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={classes}
        {...rest}
      />
    </Primitive.Portal>
  );
}

export function DropdownGroup(props: DropdownGroupProps) {
  return <Primitive.Group data-slot="dropdown-menu-group" {...props}/>;
}

export function DropdownItem(props: DropdownItemProps) {
  const {className, inset, variant = "default", ...rest} = props;
  const classes = classMerge(
    "relative flex items-center gap-2 px-3.25 py-2.75 " +
    "text-sm outline-hidden select-none cursor-default " +
    "focus:bg-accent focus:text-accent-foreground " +
    "data-[variant=destructive]:text-dropdown-destructive-foreground " +
    "data-[variant=destructive]:focus:text-dropdown-destructive-foreground " +
    "data-[variant=destructive]:focus:bg-dropdown-destructive/10 " +
    "data-[variant=destructive]:*:[svg]:!text-dropdown-destructive-foreground " +
    "dark:data-[variant=destructive]:focus:bg-destructive/20 " +
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 " +
    "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    className,
  );

  return (
    <Primitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={classes}
      {...rest}
    />
  );
}

export function DropdownCheckboxItem(props: DropdownCheckboxItemProps) {
  const {className, children, checked, ...rest} = props;
  const classes = classMerge(
    "relative flex items-center gap-2 py-1.5 pr-2 pl-8 " +
    "rounded-sm text-sm outline-hidden select-none cursor-default " +
    "focus:bg-accent focus:text-accent-foreground " +
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    className,
  );

  return (
    <Primitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={classes}
      checked={checked}
      {...rest}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <Primitive.ItemIndicator>
          <CheckIcon className="size-4"/>
        </Primitive.ItemIndicator>
      </span>
      {children}
    </Primitive.CheckboxItem>
  );
}

export function DropdownRadioGroup(props: DropdownRadioGroupProps) {
  return <Primitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props}/>;
}

export function DropdownRadioItem(props: DropdownRadioItemProps) {
  const {className, children, ...rest} = props;
  const classes = classMerge(
    "relative flex items-center gap-2 py-1.5 pr-2 pl-8 " +
    "text-sm rounded-sm outline-hidden select-none cursor-default " +
    "focus:bg-accent focus:text-accent-foreground " +
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    className,
  );

  return (
    <Primitive.RadioItem data-slot="dropdown-menu-radio-item" className={classes} {...rest}>
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <Primitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current"/>
        </Primitive.ItemIndicator>
      </span>
      {children}
    </Primitive.RadioItem>
  );
}

export function DropdownLabel(props: DropdownLabelProps) {
  const {className, inset, ...rest} = props;
  const classes = classMerge("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className);

  return (
    <Primitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={classes}
      {...rest}
    />
  );
}

export function DropdownSeparator(props: DropdownSeparatorProps) {
  const {className, ...rest} = props;
  const classes = classMerge("bg-border -mx-1 my-1 h-px", className);

  return <Primitive.Separator data-slot="dropdown-menu-separator" className={classes} {...rest}/>;
}

export function DropdownShortcut(props: DropdownShortcutProps) {
  const {className, ...rest} = props;
  const classes = classMerge("text-muted-foreground ml-auto text-xs tracking-widest", className);

  return <span data-slot="dropdown-menu-shortcut" className={classes} {...rest}/>;
}

export function DropdownSub(props: DropdownSubProps) {
  return <Primitive.Sub data-slot="dropdown-menu-sub" {...props}/>;
}

export function DropdownSubTrigger(props: DropdownSubTriggerProps) {
  const {className, inset, children, ...rest} = props;
  const classes = classMerge(
    "flex items-center px-2 py-1.5 rounded-sm text-sm outline-hidden select-none cursor-default " +
    "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[inset]:pl-8 " +
    "focus:bg-accent focus:text-accent-foreground",
    className,
  );

  return (
    <Primitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={classes}
      {...rest}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4"/>
    </Primitive.SubTrigger>
  );
}

export function DropdownSubContent(props: DropdownSubContentProps) {
  const {className, ...rest} = props;
  const classes = classMerge(
    "bg-dropdown text-dropdown-foreground " +
    "overflow-hidden rounded-sm border shadow-lg min-w-46 z-50 " +
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 " +
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 " +
    "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 " +
    "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 " +
    "origin-(--radix-dropdown-menu-content-transform-origin)",
    className);

  return <Primitive.SubContent data-slot="dropdown-menu-sub-content" className={classes} {...rest}/>;
}
