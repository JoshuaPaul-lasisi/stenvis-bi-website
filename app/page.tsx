import fs from 'node:fs';
import path from 'node:path';
import Script from 'next/script';

const homepageHtml = fs.readFileSync(path.join(process.cwd(), 'app', 'homepage-content.html'), 'utf8');

export default function HomePage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: homepageHtml }} />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
