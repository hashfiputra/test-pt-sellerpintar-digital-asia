"use client";

import { type ComponentProps } from "react";
import * as Primitive from "@radix-ui/react-tooltip";

import { classMerge } from "@lib/utils";

export type TooltipProviderProps = ComponentProps<typeof Primitive.Provider>;
export type TooltipProps = ComponentProps<typeof Primitive.Root>;
export type TooltipTriggerProps = ComponentProps<typeof Primitive.Trigger>;
export type TooltipArrowProps = ComponentProps<typeof Primitive.Arrow>;
export type TooltipContentProps = ComponentProps<typeof Primitive.Content>;

export function TooltipProvider({ delayDuration, ...props }: TooltipProviderProps) {
  return <Primitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props}/>;
}

export function Tooltip(props: TooltipProps) {
  return (
    <TooltipProvider>
      <Primitive.Root data-slot="tooltip" {...props}/>
    </TooltipProvider>
  );
};

export function TooltipTrigger(props: TooltipTriggerProps) {
  return <Primitive.Trigger data-slot="tooltip-trigger" {...props}/>;
}

export function TooltipArrow(props: TooltipArrowProps) {
  const { className, ...rest } = props;
  const classes = classMerge(
    "bg-primary fill-primary size-2.5 " +
    "translate-y-[calc(-50%_-_2px)] rotate-45 " +
    "rounded-[2px] z-50",
    className,
  );

  return <Primitive.Arrow className={classes} {...rest}/>;
}

export function TooltipContent(props: TooltipContentProps) {
  const { className, sideOffset = 0, children, ...rest } = props;
  const classes = classMerge(
    "bg-primary text-primary-foreground text-xs text-balance " +
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 " +
    "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 " +
    "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 " +
    "animate-in fade-in-0 zoom-in-95 rounded-md w-fit px-3 py-1.5 z-50 " +
    "origin-(--radix-tooltip-content-transform-origin)",
    className,
  );

  return (
    <Primitive.Portal>
      <Primitive.Content data-slot="tooltip-content" sideOffset={sideOffset} className={classes} {...rest}>
        {children}
        <TooltipArrow/>
      </Primitive.Content>
    </Primitive.Portal>
  );
}
