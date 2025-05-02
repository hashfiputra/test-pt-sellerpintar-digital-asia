"use client";

import { type MouseEvent, useMemo } from "react";
import * as PaginationUI from "@ui/Pagination";

export type PaginationProps = {
  page: number;
  last: number;
  onClick: (event: MouseEvent) => void | Promise<void>;
  onPrevious: (event: MouseEvent) => void | Promise<void>;
  onNext: (event: MouseEvent) => void | Promise<void>;
}

export default function Pagination(props: PaginationProps) {
  const { page, last, onClick, onPrevious, onNext } = props;
  const items = useMemo(() => {
    const result = [];
    const start = Math.max(1, page);
    const end = Math.min(last, page + 1);

    for (let i = start; i <= end; i++) {
      result.push(
        <PaginationUI.PaginationItem key={i}>
          <PaginationUI.PaginationLink
            href="#"
            data-number={i}
            isActive={i === page}
            onClick={onClick}
          >
            {i}
          </PaginationUI.PaginationLink>
        </PaginationUI.PaginationItem>,
      );
    }

    return result;
  }, [page, last, onClick]);

  return (
    <PaginationUI.Pagination>
      <PaginationUI.PaginationContent>
        <PaginationUI.PaginationItem>
          <PaginationUI.PaginationPrevious
            href="#"
            aria-disabled={page <= 1}
            onClick={onPrevious}
          />
        </PaginationUI.PaginationItem>
        {(page >= last - 1 && last > 2) && (
          <PaginationUI.PaginationItem key="pagination-ellipsis-left">
            <PaginationUI.PaginationEllipsis/>
          </PaginationUI.PaginationItem>
        )}
        {(page > 1 && page === last) && (
          <PaginationUI.PaginationItem>
            <PaginationUI.PaginationLink
              href="#"
              data-number={last - 1}
              isActive={false}
              onClick={onClick}
            >
              {last - 1}
            </PaginationUI.PaginationLink>
          </PaginationUI.PaginationItem>
        )}
        {items.map(item => item)}
        {(page <= last - 2 || last <= 2) && (
          <PaginationUI.PaginationItem key="pagination-ellipsis-right">
            <PaginationUI.PaginationEllipsis/>
          </PaginationUI.PaginationItem>
        )}
        <PaginationUI.PaginationItem>
          <PaginationUI.PaginationNext
            href="#"
            aria-disabled={page >= last}
            onClick={onNext}
          />
        </PaginationUI.PaginationItem>
      </PaginationUI.PaginationContent>
    </PaginationUI.Pagination>
  );
}
