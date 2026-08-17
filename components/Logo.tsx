export default function Logo({ url }: { url?: string | null }) {
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt="Stenvis BI" width={34} height={34} className="logo-icon logo-icon-img" />
    );
  }
  return <div className="logo-icon">📊</div>;
}
