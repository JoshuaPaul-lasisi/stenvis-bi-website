import type { ClientLogo } from '@/lib/content/types';

export default function LogoStrip({ logos }: { logos: ClientLogo[] }) {
  if (logos.length === 0) return null;

  return (
    <div id="logo-strip">
      <div className="strip-label">Trusted by businesses across Nigeria</div>
      <div className="logos-row">
        {logos.map((logo) => (
          <div key={logo.id} className="logo-item">
            {logo.name}
          </div>
        ))}
      </div>
    </div>
  );
}
