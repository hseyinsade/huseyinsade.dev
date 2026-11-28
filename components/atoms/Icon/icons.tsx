/** SVG paths for every icon on the site. All are drawn on a 16×16 or 24×24 grid (see `viewBox`). */
export const icons = {
  "arrow-up-right": {
    viewBox: "0 0 16 16",
    body: <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  check: {
    viewBox: "0 0 16 16",
    body: <path d="m3 8.5 3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  download: {
    viewBox: "0 0 16 16",
    body: <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  copy: {
    viewBox: "0 0 16 16",
    body: (
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="5" y="5" width="8" height="8" rx="1.5" />
        <path d="M3 10.5V4a1 1 0 0 1 1-1h6.5" strokeLinecap="round" />
      </g>
    ),
  },
  sun: {
    viewBox: "0 0 16 16",
    body: (
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="3" />
        <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1 1M12 12l1 1M3 13l1-1M12 4l1-1" strokeLinecap="round" />
      </g>
    ),
  },
  moon: {
    viewBox: "0 0 16 16",
    body: <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />,
  },
  inspect: {
    viewBox: "0 0 16 16",
    body: (
      <>
        <path d="M2 2h5M2 2v5M14 14H9M14 14V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="m6 6 3.2 7.5 1-3.3 3.3-1L6 6Z" fill="currentColor" />
      </>
    ),
  },
  play: {
    viewBox: "0 0 16 16",
    body: <path d="M4 2.5v11l9-5.5-9-5.5Z" fill="currentColor" />,
  },
  volume: {
    viewBox: "0 0 16 16",
    body: (
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 6v4h3l4 3V3L5 6H2Z" strokeLinejoin="round" />
        <path d="M11.5 5.5a3.5 3.5 0 0 1 0 5" strokeLinecap="round" />
      </g>
    ),
  },
  github: {
    viewBox: "0 0 24 24",
    body: (
      <path
        fill="currentColor"
        d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z"
      />
    ),
  },
  linkedin: {
    viewBox: "0 0 24 24",
    body: (
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
      />
    ),
  },
} as const;

export type IconName = keyof typeof icons;
