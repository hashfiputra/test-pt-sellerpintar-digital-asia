import { type ComponentProps } from "react";
import { MountainSnow } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { classMerge } from "@lib/utils";

export type CardProps = ComponentProps<"div">;
export type CardHeaderProps = ComponentProps<"div">;
export type CardThumbnailProps = ComponentProps<"div">;
export type CardImageProps = ComponentProps<typeof Image> & { src?: string };
export type CardDateProps = ComponentProps<"div">;
export type CardTitleProps = ComponentProps<typeof Link>;
export type CardDescriptionProps = ComponentProps<"div">;
export type CardBadgesProps = ComponentProps<"div">;
export type CardActionProps = ComponentProps<"div">;
export type CardContentProps = ComponentProps<"div">;
export type CardFooterProps = ComponentProps<"div">;

export function Card(props: CardProps) {
  const { className, ...rest } = props;
  const classes = classMerge(
    "flex flex-col gap-4 " +
    "bg-card text-card-foreground",
    className,
  );

  return <div data-slot="card" className={classes} {...rest}/>;
}

export function CardHeader(props: CardHeaderProps) {
  const { className, ...rest } = props;
  const classes = classMerge(
    "@container/card-header " +
    "grid grid-rows-[auto_auto] " +
    "auto-rows-min items-start gap-1.5 px-6 " +
    "has-data-[slot=card-action]:grid-cols-[1fr_auto] " +
    "[.border-b]:pb-6",
    className,
  );

  return <div data-slot="card-header" className={classes} {...rest}/>;
}

export function CardThumbnail(props: CardThumbnailProps) {
  const { className, ...rest } = props;
  const classes = classMerge(
    "relative flex items-center justify-center " +
    "bg-secondary h-50 rounded-[12px] overflow-hidden " +
    "*:object-cover",
    className,
  );

  return <div data-slot="card-thumbnail" className={classes} {...rest}/>;
}

export function CardImage(props: CardImageProps) {
  const { className, src, alt, fill = true, ...rest } = props;
  const classes = classMerge("object-cover", className);

  if (src) return <Image data-slot="card-image" className={classes} src={src} alt={alt} fill={fill} {...rest}/>;
  if (!src) return <MountainSnow data-slot="card-placeholder" className="size-20 opacity-50"/>;
}

export function CardDate(props: CardDateProps) {
  const { className, ...rest } = props;
  const classes = classMerge("text-xs text-dropdown-foreground", className);

  return <div data-slot="card-date" className={classes} {...rest}/>;
}

export function CardTitle(props: CardTitleProps) {
  const { className, ...rest } = props;
  const classes = classMerge("font-semibold", className);

  return <Link data-slot="card-title" className={classes} {...rest}/>;
}

export function CardDescription(props: CardDescriptionProps) {
  const { className, ...rest } = props;
  const classes = classMerge("text-sm text-dropdown-foreground", className);

  return <div data-slot="card-description" className={classes} {...rest}/>;
}

export function CardBadges(props: CardBadgesProps) {
  const { className, ...rest } = props;
  const classes = classMerge("flex flex-row flex-wrap items-center gap-2", className);

  return <div data-slot="card-badges" className={classes} {...rest}/>;
}

export function CardAction(props: CardActionProps) {
  const { className, ...rest } = props;
  const classes = classMerge(
    "col-start-2 " +
    "row-span-2 row-start-1 " +
    "self-start justify-self-end",
    className,
  );

  return <div data-slot="card-action" className={classes} {...rest}/>;
}

export function CardContent(props: CardContentProps) {
  const { className, ...rest } = props;
  const classes = classMerge("flex flex-col gap-2", className);

  return <div data-slot="card-content" className={classes} {...rest}/>;
}

export function CardFooter(props: CardFooterProps) {
  const { className, ...rest } = props;
  const classes = classMerge("flex items-center px-6 [.border-t]:pt-6", className);

  return <div data-slot="card-footer" className={classes} {...rest}/>;
}
