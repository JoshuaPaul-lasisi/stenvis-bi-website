import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://stenvisbi.com'),
  title: {
    default: 'Stenvis BI — Unlock the Power of Your Data',
    template: '%s | Stenvis BI',
  },
  description:
    'Stenvis BI transforms your business data into clear, actionable insights — helping SMEs and enterprises across Nigeria make smarter decisions, reduce waste, and outgrow the competition.',
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var saved = localStorage.getItem('stenvis-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/content.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
