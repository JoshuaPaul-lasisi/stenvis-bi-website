import type { SiteSettings } from '@/lib/content/types';

export default function StatsSection({ settings }: { settings: SiteSettings }) {
  return (
    <div id="stats">
      <div className="stats-inner">
        <div className="stat-block reveal">
          <span className="s-num" data-target={settings.stat_businesses}>
            0
          </span>
          +
          <div className="s-desc">Businesses Empowered Across Nigeria</div>
        </div>
        <div className="stat-block reveal reveal-delay-1">
          <span className="s-num amber" data-target={settings.stat_satisfaction}>
            0
          </span>
          %<div className="s-desc">Client Satisfaction Rate</div>
        </div>
        <div className="stat-block reveal reveal-delay-2">
          <span className="s-num" data-target={settings.stat_dashboards}>
            0
          </span>
          +
          <div className="s-desc">Dashboards &amp; Reports Delivered</div>
        </div>
        <div className="stat-block reveal reveal-delay-3">
          <span className="s-num amber" data-target={settings.stat_years}>
            0
          </span>
          <div className="s-desc">Years of Combined BI Expertise</div>
        </div>
      </div>
    </div>
  );
}
