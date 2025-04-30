import Link from "next/link";

import Brand from "@ui/Brand";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__content">
        <Link className="footer__brand" href="/">
          <Brand className="footer__img" theme="dark"/>
        </Link>
        <span className="footer__copyright">
          © 2025 Blog genzet. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
