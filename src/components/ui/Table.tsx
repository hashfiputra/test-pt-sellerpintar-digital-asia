import { type ComponentProps } from "react";
import { classMerge } from "@lib/utils";

export type TableProps = ComponentProps<"table">;
export type TableHeaderProps = ComponentProps<"thead">;
export type TableBodyProps = ComponentProps<"tbody">;
export type TableFooterProps = ComponentProps<"tfoot">;
export type TableRowProps = ComponentProps<"tr">;
export type TableHeadProps = ComponentProps<"th">;
export type TableCellProps = ComponentProps<"td">;
export type TableActionProps = ComponentProps<"div">;
export type TableCaptionProps = ComponentProps<"caption">;

export function Table(props: TableProps) {
  const { className, ...others } = props;
  const classes = classMerge("bg-dashboard w-full text-xs sm:text-sm caption-bottom", className);

  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={classes}
        {...others}
      />
    </div>
  );
}

export function TableHeader(props: TableHeaderProps) {
  const { className, ...others } = props;
  const classes = classMerge("bg-dashboard-accent [&_tr]:border-b", className);

  return (
    <thead
      data-slot="table-header"
      className={classes}
      {...others}
    />
  );
}

export function TableBody(props: TableBodyProps) {
  const { className, ...others } = props;
  const classes = classMerge("[&_tr:last-child]:border-0", className);

  return (
    <tbody
      data-slot="table-body"
      className={classes}
      {...others}
    />
  );
}

export function TableFooter(props: TableFooterProps) {
  const { className, ...others } = props;
  const classes = classMerge("bg-dashboard-accent border-t font-medium [&>tr]:last:border-b-0", className);

  return (
    <tfoot
      data-slot="table-footer"
      className={classes}
      {...others}
    />
  );
}

export function TableRow(props: TableRowProps) {
  const { className, ...others } = props;
  const classes = classMerge(
    "border-b transition-colors",
    "hover:bg-dashboard-accent data-[state=selected]:bg-dashboard-accent",
    className,
  );

  return (
    <tr
      data-slot="table-row"
      className={classes}
      {...others}
    />
  );
}

export function TableHead(props: TableHeadProps) {
  const { className, ...others } = props;
  const classes = classMerge(
    "text-foreground px-3 py-2 sm:px-4 sm:py-3 sm:h-10",
    "text-center font-medium align-middle whitespace-nowrap",
    "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    className,
  );

  return (
    <th
      data-slot="table-head"
      className={classes}
      {...others}
    />
  );
}

export function TableCell(props: TableCellProps) {
  const { className, ...others } = props;
  const classes = classMerge(
    "px-3 py-2 h-19",
    "sm:px-4 sm:py-3 sm:h-21",
    "text-center align-middle whitespace-nowrap",
    "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    className,
  );

  return (
    <td
      data-slot="table-cell"
      className={classes}
      {...others}
    />
  );
}

export function TableAction(props: TableActionProps) {
  const { className, ...others } = props;
  const classes = classMerge(
    "flex flex-row items-center justify-center",
    "gap-3 text-center",
    className,
  );

  return (
    <TableCell>
      <div
        data-slot="table-cell-action"
        className={classes}
        {...others}
      />
    </TableCell>
  );
}

export function TableCaption(props: TableCaptionProps) {
  const { className, ...others } = props;
  const classes = classMerge("text-muted-foreground mt-4 text-sm", className);

  return (
    <caption
      data-slot="table-caption"
      className={classes}
      {...others}
    />
  );
}
