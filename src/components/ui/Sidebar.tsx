"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";

import { useMobile } from "@hooks/useMobile";
import { classMerge } from "@lib/utils";

import Input from "@ui/Input";
import Brand from "@ui/Brand";
import { Button } from "@ui/Button";
import { Skeleton } from "@ui/Skeleton";
import { Separator } from "@ui/Separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@ui/Sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ui/Tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16.6875rem";
const SIDEBAR_WIDTH_MOBILE = "16.6875rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

export type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export type SidebarProviderProps = React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type SidebarProps = React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
};

export type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>;

export type SidebarMenuSubButtonProps = React.ComponentProps<"a"> & {
  asChild?: boolean;
  size?: "sm" | "md";
  isActive?: boolean;
};

export type SidebarTriggerProps = React.ComponentProps<typeof Button>;
export type SidebarRailProps = React.ComponentProps<"button">;
export type SidebarInsetProps = React.ComponentProps<"main">;
export type SidebarInputProps = React.ComponentProps<typeof Input>;
export type SidebarBrandProps = Omit<React.ComponentProps<typeof Brand>, "theme"> & { theme?: "dark" | "light" };
export type SidebarHeaderProps = React.ComponentProps<"div">;
export type SidebarFooterProps = React.ComponentProps<"div">;
export type SidebarSeparatorProps = React.ComponentProps<typeof Separator>;
export type SidebarContentProps = React.ComponentProps<"div">;
export type SidebarGroupProps = React.ComponentProps<"div">;
export type SidebarGroupLabelProps = React.ComponentProps<"div"> & { asChild?: boolean };
export type SidebarGroupActionProps = React.ComponentProps<"button"> & { asChild?: boolean };
export type SidebarGroupContentProps = React.ComponentProps<"div">;
export type SidebarMenuProps = React.ComponentProps<"ul">;
export type SidebarMenuItemProps = React.ComponentProps<"li">;
export type SidebarMenuActionProps = React.ComponentProps<"button"> & { asChild?: boolean; showOnHover?: boolean; };
export type SidebarMenuBadgeProps = React.ComponentProps<"div">;
export type SidebarMenuSkeletonProps = React.ComponentProps<"div"> & { showIcon?: boolean };
export type SidebarMenuSubProps = React.ComponentProps<"ul">;
export type SidebarMenuSubItemProps = React.ComponentProps<"li">;

const sidebarMenuButtonVariants = cva(
  "peer/menu-button " +
  "flex items-center gap-3 px-4 py-2 w-full " +
  "text-base text-left font-medium overflow-hidden rounded-sm " +
  "outline-hidden ring-sidebar-ring transition-[width,height,padding] " +
  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 " +
  "active:bg-sidebar-accent active:text-sidebar-accent-foreground " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-50 " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "group-has-data-[sidebar=menu-action]/menu-item:pr-8 " +
  "data-[active=true]:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent " +
  "data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground " +
  "group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! " +
  "[&>span:last-child]:truncate [&>svg]:size-5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-10 text-base",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const SidebarContext = React.createContext<
  SidebarContextProps | null
>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a <SidebarProvider>");

  return context;
}

export function SidebarProvider(props: SidebarProviderProps) {
  const isMobile = useMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const { defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...rest } = props;

  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = React.useCallback((value: boolean | ((value: boolean) => boolean)) => {
    const openState = typeof value === "function" ? value(open) : value;
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;

    if (setOpenProp) setOpenProp(openState);
    if (!setOpenProp) _setOpen(openState);
  }, [setOpenProp, open]);

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) return setOpenMobile((open) => !open);
    return setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== SIDEBAR_KEYBOARD_SHORTCUT) return;
      if (!event.metaKey && !event.ctrlKey) return;

      event.preventDefault();
      toggleSidebar();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo<SidebarContextProps>(() => ({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);

  const classes = classMerge(
    "group/sidebar-wrapper",
    "flex min-h-svh w-full",
    "has-data-[variant=inset]:bg-sidebar",
    className,
  );

  const styles = {
    "--sidebar-width": SIDEBAR_WIDTH,
    "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
    ...style,
  } as React.CSSProperties;

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div data-slot="sidebar-wrapper" className={classes} style={styles} {...rest}>
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

export function Sidebar(props: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  const { side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...rest } = props;

  if (collapsible === "none") {
    const classes = classMerge(
      "flex flex-col w-(--sidebar-width) h-full",
      "bg-sidebar text-sidebar-foreground",
      className,
    );

    return (
      <div data-slot="sidebar" className={classes} {...rest}>
        {children}
      </div>
    );
  }

  if (isMobile) {
    const style = { "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties;

    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...rest}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) pt-6 pb-4 [&>button]:hidden"
          style={style}
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  const classesGap = classMerge(
    "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
    "group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180",
    variant === "floating" || variant === "inset"
      ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
      : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
  );

  const classesContainer = classMerge(
    "hidden fixed inset-y-0 w-(--sidebar-width) h-svh",
    "transition-[left,right,width] duration-200 ease-linear z-10 md:flex",
    side === "left"
      ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
      : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
    variant === "floating" || variant === "inset"
      ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
      : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
    className,
  );

  const classesInner = classMerge(
    "flex flex-col w-full h-full pt-6 pb-4 bg-sidebar",
    "group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:rounded-lg",
    "group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
  );

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div data-slot="sidebar-gap" className={classesGap}/>
      <div data-slot="sidebar-container" className={classesContainer} {...rest}>
        <div data-sidebar="sidebar" data-slot="sidebar-inner" className={classesInner}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function SidebarTrigger(props: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar();
  const { className, onClick } = props;
  const classes = classMerge("size-7", className);

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      className={classes}
      variant="ghost"
      size="icon"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon/>
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export function SidebarRail(props: SidebarRailProps) {
  const { className, ...rest } = props;
  const { toggleSidebar } = useSidebar();
  const classes = classMerge(
    "hidden sm:flex absolute inset-y-0 w-4 z-20",
    "-translate-x-1/2 transition-all ease-linear",
    "after:absolute after:inset-y-0 after:left-1/2 after:w-[2px]",
    "hover:group-data-[collapsible=offcanvas]:bg-sidebar hover:after:bg-sidebar-border",
    "group-data-[side=left]:-right-4 group-data-[side=right]:left-0",
    "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
    "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
    "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize",
    "[[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
    "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
    "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
    className,
  );

  return (
    <button
      data-slot="sidebar-rail"
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarInset(props: SidebarInsetProps) {
  const { className, ...rest } = props;
  const classes = classMerge(
    "relative flex w-full flex-1 flex-col bg-background",
    "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0",
    "md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",
    "md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
    className,
  );

  return <main data-slot="sidebar-inset" className={classes} {...rest} />;
}

export function SidebarInput(props: SidebarInputProps) {
  const { className, ...rest } = props;
  const classes = classMerge("bg-background h-8 w-full shadow-none", className);

  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarBrand(props: SidebarBrandProps) {
  const { theme = "dark", className, ...rest } = props;
  const classes = classMerge("h-6", className);

  return <Brand data-slot="sidebar-brand" theme={theme} className={classes} {...rest}/>;
}

export function SidebarHeader(props: SidebarHeaderProps) {
  const { className, ...rest } = props;
  const classes = classMerge("flex flex-row gap-2 px-8", className);

  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarFooter(props: SidebarFooterProps) {
  const { className, ...rest } = props;
  const classes = classMerge("flex flex-col gap-2 p-2", className);

  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarSeparator(props: SidebarSeparatorProps) {
  const { className, ...rest } = props;
  const classes = classMerge("bg-sidebar-border mx-2 w-auto", className);

  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarContent(props: SidebarContentProps) {
  const { className, ...rest } = props;
  const classes = classMerge(
    "flex flex-col gap-6 flex-1 min-h-0",
    "overflow-auto group-data-[collapsible=icon]:overflow-hidden",
    className,
  );

  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarGroup(props: SidebarGroupProps) {
  const { className, ...rest } = props;
  const classes = classMerge("relative flex flex-col px-4 w-full min-w-0", className);

  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarGroupLabel(props: SidebarGroupLabelProps) {
  const { className, asChild = false, ...rest } = props;
  const Component = asChild ? Slot : "div";
  const classes = classMerge(
    "flex items-center shrink-0 px-2 h-8",
    "text-xs font-medium outline-hidden",
    "text-sidebar-foreground/70 ring-sidebar-ring rounded-md",
    "transition-[margin,opacity] duration-200 ease-linear",
    "focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
    "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
    className,
  );

  return (
    <Component
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarGroupAction(props: SidebarGroupActionProps) {
  const { className, asChild = false, ...rest } = props;
  const Component = asChild ? Slot : "button";
  const classes = classMerge(
    "absolute top-3.5 right-3 flex items-center justify-center p-0 w-5",
    "text-sidebar-foreground ring-sidebar-ring rounded-md aspect-square",
    "outline-hidden transition-transform [&>svg]:size-4 [&>svg]:shrink-0",
    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2",
    "after:absolute after:-inset-2 md:after:hidden",
    "group-data-[collapsible=icon]:hidden",
    className,
  );

  return (
    <Component
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarGroupContent(props: SidebarGroupContentProps) {
  const { className, ...rest } = props;
  const classes = classMerge("w-full text-sm", className);

  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarMenu(props: SidebarMenuProps) {
  const { className, ...rest } = props;
  const classes = classMerge("flex flex-col gap-2 w-full min-w-0", className);

  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarMenuItem(props: SidebarMenuItemProps) {
  const { className, ...rest } = props;
  const classes = classMerge("group/menu-item relative", className);

  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarMenuButton({ tooltip, ...props }: SidebarMenuButtonProps) {
  const { variant = "default", size = "default", asChild, isActive, className, onClick, ...rest } = props;
  const Component = asChild ? Slot : "button";

  const { isMobile, state, setOpenMobile } = useSidebar();
  const variants = sidebarMenuButtonVariants({ variant, size });
  const classes = classMerge(variants, className);

  const button = <Component
    data-slot="sidebar-menu-button"
    data-sidebar="menu-button"
    data-size={size}
    data-active={!!isActive}
    className={classes}
    onClick={(event) => {
      onClick?.(event);
      if (isMobile) setOpenMobile(false);
    }}
    {...rest}
  />;

  if (!tooltip) return button;
  if (typeof tooltip === "string") tooltip = { children: tooltip };

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

export function SidebarMenuAction(props: SidebarMenuActionProps) {
  const { className, asChild = false, showOnHover = false, ...rest } = props;
  const Component = asChild ? Slot : "button";
  const classes = classMerge(
    "absolute top-1.5 right-1 flex items-center justify-center p-0 w-5",
    "text-sidebar-foreground ring-sidebar-ring rounded-md outline-hidden",
    "aspect-square transition-transform focus-visible:ring-2",
    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    "peer-hover/menu-button:text-sidebar-accent-foreground",
    "after:absolute after:-inset-2 md:after:hidden",
    "peer-data-[size=default]/menu-button:top-1.5",
    "peer-data-[size=sm]/menu-button:top-1",
    "peer-data-[size=lg]/menu-button:top-2.5",
    "group-data-[collapsible=icon]:hidden",
    "[&>svg]:size-4 [&>svg]:shrink-0",
    showOnHover && "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground " +
    "group-focus-within/menu-item:opacity-100 " +
    "group-hover/menu-item:opacity-100 " +
    "data-[state=open]:opacity-100 " +
    "md:opacity-0",
    className,
  );

  return (
    <Component
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarMenuBadge(props: SidebarMenuBadgeProps) {
  const { className, ...rest } = props;
  const classes = classMerge(
    "absolute right-1 flex items-center justify-center px-1 h-5 min-w-5",
    "text-xs font-medium tabular-nums text-sidebar-foreground",
    "rounded-md select-none pointer-events-none",
    "peer-hover/menu-button:text-sidebar-accent-foreground",
    "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
    "peer-data-[size=default]/menu-button:top-1.5",
    "peer-data-[size=sm]/menu-button:top-1",
    "peer-data-[size=lg]/menu-button:top-2.5",
    "group-data-[collapsible=icon]:hidden",
    className,
  );

  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarMenuSkeleton(props: SidebarMenuSkeletonProps) {
  const { className, showIcon = false, ...rest } = props;
  const classes = classMerge("flex items-center gap-2 h-8 px-2 rounded-md", className);
  const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  const style = { "--skeleton-width": width } as React.CSSProperties;

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={classes}
      {...rest}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon"/>}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={style}
      />
    </div>
  );
}

export function SidebarMenuSub(props: SidebarMenuSubProps) {
  const { className, ...rest } = props;
  const classes = classMerge(
    "flex flex-col gap-1 px-2.5 py-0.5 mx-3.5",
    "border-l border-sidebar-border min-w-0 translate-x-px",
    "group-data-[collapsible=icon]:hidden",
    className,
  );

  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarMenuSubItem(props: SidebarMenuSubItemProps) {
  const { className, ...rest } = props;
  const classes = classMerge("group/menu-sub-item relative", className);

  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={classes}
      {...rest}
    />
  );
}

export function SidebarMenuSubButton(props: SidebarMenuSubButtonProps) {
  const { asChild = false, size = "md", isActive = false, className, ...rest } = props;
  const Component = asChild ? Slot : "a";
  const classes = classMerge(
    "flex items-center gap-2 px-2 h-7 min-w-0",
    "text-sidebar-foreground ring-sidebar-ring",
    "overflow-hidden rounded-md outline-hidden -translate-x-px",
    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    "active:bg-sidebar-accent active:text-sidebar-accent-foreground",
    "focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
    "[&>svg]:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate",
    "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
    "data-[size=sm]:text-xs data-[size=md]:text-sm",
    "group-data-[collapsible=icon]:hidden",
    className,
  );

  return (
    <Component
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={classes}
      {...rest}
    />
  );
}
