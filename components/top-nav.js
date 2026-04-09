import Link from "next/link";

function SpreadsheetIcon() {
  return (
    <svg aria-hidden="true" className="mini-link-icon" viewBox="0 0 24 24">
      <path
        d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7zm0 1.5L17.5 7H14z"
        fill="currentColor"
        opacity="0.28"
      />
      <path
        d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7zm0 1.5L17.5 7H14zm-7 1h6v4H7zm0 6h10v2H7zm0 4h10v2H7zm0 4h6v2H7z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function TopNav({ activePath, spreadsheetUrl }) {
  return (
    <nav className="mini-menu" aria-label="Page navigation">
      <Link className={activePath === "/" ? "mini-link active" : "mini-link"} href="/">
        Table
      </Link>
      <Link
        className={activePath === "/calculator" ? "mini-link active" : "mini-link"}
        href="/calculator"
      >
        Calculator
      </Link>
      <Link
        className={activePath === "/experience" ? "mini-link active" : "mini-link"}
        href="/experience"
      >
        Experience
      </Link>
      <a
        className="mini-link mini-link-icon-only"
        href={spreadsheetUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Open source spreadsheet"
        title="Open source spreadsheet"
      >
        <SpreadsheetIcon />
      </a>
    </nav>
  );
}
