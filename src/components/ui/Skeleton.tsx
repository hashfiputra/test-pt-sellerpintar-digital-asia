import { type ComponentProps } from "react";
import { classMerge } from "@lib/utils";

export type SkeletonProps = ComponentProps<"div">;

export function Skeleton(props: SkeletonProps) {
  const { className, ...rest } = props;
  const classes = classMerge("bg-accent animate-pulse rounded-md", className);

  return <div data-slot="skeleton" className={classes} {...rest}/>;
}
