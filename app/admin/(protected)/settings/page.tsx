import { getClientIndustries, getClientLogos, getSiteSettings } from '@/lib/content/queries';
import SettingsForm from '@/components/admin/SettingsForm';

export default async function SettingsPage() {
  const [settings, industries, logos] = await Promise.all([getSiteSettings(), getClientIndustries(), getClientLogos()]);

  return (
    <div className="admin-page">
      <h1>Site Settings</h1>
      <SettingsForm settings={settings} industries={industries} logos={logos} />
    </div>
  );
}
