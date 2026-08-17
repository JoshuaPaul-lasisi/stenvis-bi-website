'use client';

import { useState } from 'react';
import { saveSiteContent } from '@/app/actions/settings';
import ImageUploadField from '@/components/admin/ImageUploadField';
import type { ClientIndustry, ClientLogo, SiteSettings } from '@/lib/content/types';

type IndustryRow = { label: string; percentage: number; color: string };
type LogoRow = { name: string };

export default function SettingsForm({
  settings,
  industries,
  logos,
}: {
  settings: SiteSettings;
  industries: ClientIndustry[];
  logos: ClientLogo[];
}) {
  const [industryRows, setIndustryRows] = useState<IndustryRow[]>(
    industries.length > 0
      ? industries.map((i) => ({ label: i.label, percentage: i.percentage, color: i.color }))
      : [{ label: '', percentage: 0, color: '#00AD8E' }]
  );
  const [logoRows, setLogoRows] = useState<LogoRow[]>(logos.length > 0 ? logos.map((l) => ({ name: l.name })) : [{ name: '' }]);

  const industryTotal = industryRows.reduce((sum, r) => sum + (Number(r.percentage) || 0), 0);

  return (
    <form action={saveSiteContent} className="admin-form">
      <input type="hidden" name="industries_json" value={JSON.stringify(industryRows)} />
      <input type="hidden" name="logos_json" value={JSON.stringify(logoRows)} />

      <ImageUploadField name="logo_url" label="Logo" defaultValue={settings.logo_url} />

      <div className="form-row">
        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" defaultValue={settings.phone} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" defaultValue={settings.email} required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>WhatsApp Number (digits only, with country code)</label>
          <input type="text" name="whatsapp_number" defaultValue={settings.whatsapp_number} placeholder="2349037906304" required />
        </div>
        <div className="form-group">
          <label>Location Line 1</label>
          <input type="text" name="location_line1" defaultValue={settings.location_line1} required />
        </div>
      </div>

      <div className="form-group">
        <label>Location Line 2</label>
        <input type="text" name="location_line2" defaultValue={settings.location_line2} />
      </div>

      <h3 className="admin-form-section-title">Homepage Stats</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Businesses Empowered</label>
          <input type="number" name="stat_businesses" defaultValue={settings.stat_businesses} min={0} />
        </div>
        <div className="form-group">
          <label>Client Satisfaction (%)</label>
          <input type="number" name="stat_satisfaction" defaultValue={settings.stat_satisfaction} min={0} max={100} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Dashboards &amp; Reports Delivered</label>
          <input type="number" name="stat_dashboards" defaultValue={settings.stat_dashboards} min={0} />
        </div>
        <div className="form-group">
          <label>Years of Combined Expertise</label>
          <input type="number" name="stat_years" defaultValue={settings.stat_years} min={0} />
        </div>
      </div>

      <h3 className="admin-form-section-title">
        Client Industries
        {industryTotal !== 100 && <span className="admin-form-hint"> — currently totals {industryTotal}%, doesn't need to be exactly 100 but the chart reads best that way</span>}
      </h3>
      {industryRows.map((row, i) => (
        <div key={i} className="admin-repeat-row">
          <input
            type="text"
            placeholder="Industry name"
            value={row.label}
            onChange={(e) => setIndustryRows((rows) => rows.map((r, j) => (j === i ? { ...r, label: e.target.value } : r)))}
          />
          <input
            type="number"
            placeholder="%"
            value={row.percentage}
            min={0}
            max={100}
            className="admin-repeat-row-num"
            onChange={(e) =>
              setIndustryRows((rows) => rows.map((r, j) => (j === i ? { ...r, percentage: Number(e.target.value) } : r)))
            }
          />
          <input
            type="color"
            value={row.color}
            className="admin-repeat-row-color"
            onChange={(e) => setIndustryRows((rows) => rows.map((r, j) => (j === i ? { ...r, color: e.target.value } : r)))}
          />
          <button
            type="button"
            className="admin-icon-btn admin-icon-btn-danger"
            onClick={() => setIndustryRows((rows) => rows.filter((_, j) => j !== i))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="s-link"
        onClick={() => setIndustryRows((rows) => [...rows, { label: '', percentage: 0, color: '#00AD8E' }])}
      >
        + Add Industry
      </button>

      <h3 className="admin-form-section-title">Client Logo Strip</h3>
      {logoRows.map((row, i) => (
        <div key={i} className="admin-repeat-row">
          <input
            type="text"
            placeholder="Client name"
            value={row.name}
            onChange={(e) => setLogoRows((rows) => rows.map((r, j) => (j === i ? { name: e.target.value } : r)))}
          />
          <button
            type="button"
            className="admin-icon-btn admin-icon-btn-danger"
            onClick={() => setLogoRows((rows) => rows.filter((_, j) => j !== i))}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="s-link" onClick={() => setLogoRows((rows) => [...rows, { name: '' }])}>
        + Add Client
      </button>

      <div className="admin-form-actions">
        <span />
        <button type="submit" className="btn-teal">
          Save Settings
        </button>
      </div>
    </form>
  );
}
