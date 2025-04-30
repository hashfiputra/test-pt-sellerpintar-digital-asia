import { type ComponentProps } from "react";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

import { classMerge } from "@lib/utils";
import { type ButtonProps, buttonVariants } from "@ui/Button";

type LinkProps = { isActive?: boolean };
type LinkSizeProps = Pick<ButtonProps, "size">;

export type PaginationProps = ComponentProps<"nav">;
export type PaginationContentProps = ComponentProps<"ul">;
export type PaginationItemProps = ComponentProps<"li">;
export type PaginationLinkProps = ComponentProps<"a"> & LinkProps & LinkSizeProps;
export type PaginationPreviousProps = ComponentProps<typeof PaginationLink>;
export type PaginationNextProps = ComponentProps<typeof PaginationLink>;
export type PaginationEllipsisProps = ComponentProps<"span">;

export function Pagination(props: PaginationProps) {
  const { className, ...rest } = props;
  const classes = classMerge("flex justify-center mx-auto w-full", className);

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={classes}
      {...rest}
    />
  );
}

export function PaginationContent(props: PaginationContentProps) {
  const { className, ...rest } = props;
  const classes = classMerge("flex flex-row items-center gap-1.5", className);

  return <ul data-slot="pagination-content" className={classes} {...rest}/>;
}

export function PaginationItem(props: PaginationItemProps) {
  return <li data-slot="pagination-item" {...props} />;
}

export function PaginationLink(props: PaginationLinkProps) {
  const { className, isActive, size = "icon", ...rest } = props;
  const variants = buttonVariants({ variant: isActive ? "outline" : "ghost", size, className });
  const classes = classMerge(
    variants,
    "aria-disabled:opacity-50 aria-disabled:pointer-events-none",
    isActive && "pointer-events-none",
  );

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={classes}
      {...rest}
    />
  );
}

export function PaginationPrevious(props: PaginationPreviousProps) {
  const { className, ...rest } = props;
  const classes = classMerge("gap-1 !pl-2.5 !pr-4", className);

  return (
    <PaginationLink aria-label="Go to previous page" size="default" className={classes} {...rest}>
      <ChevronLeftIcon/>
      <span>Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext(props: PaginationNextProps) {
  const { className, ...rest } = props;
  const classes = classMerge("gap-1 !pl-4 !pr-2.5", className);

  return (
    <PaginationLink aria-label="Go to next page" size="default" className={classes} {...rest}>
      <span>Next</span>
      <ChevronRightIcon/>
    </PaginationLink>
  );
}

export function PaginationEllipsis(props: PaginationEllipsisProps) {
  const { className, ...rest } = props;
  const classes = classMerge("flex size-9 items-center justify-center", className);

  return (
    <span aria-hidden data-slot="pagination-ellipsis" className={classes} {...rest}>
      <MoreHorizontalIcon className="size-4"/>
      <span className="sr-only">More pages</span>
    </span>
  );
}
