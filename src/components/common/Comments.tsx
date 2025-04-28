"use client";

import { useLayoutEffect, useMemo, useRef } from "react";

export default function Comments() {
  const comment = useRef<Comment>(null);
  const content = useMemo(() => "\n" +
    "\n" +
    "Code by Hashfi Putra\n" +
    "Used for test PT. Sellerpintar Digital Asia\n" +
    "\n", []);

  useLayoutEffect(() => {
    if (comment.current) return;
    comment.current = document.createComment(content);
    document.prepend(comment.current);
  }, [comment, content]);

  return null;
}
