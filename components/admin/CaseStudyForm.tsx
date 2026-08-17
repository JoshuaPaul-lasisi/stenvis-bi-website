'use client';

import { useState } from 'react';
import { saveCaseStudy } from '@/app/actions/case-studies';
import type { CaseStudy, CaseStudyMetric } from '@/lib/content/types';

export default function CaseStudyForm({ caseStudy }: { caseStudy?: CaseStudy }) {
  const [metrics, setMetrics] = useState<CaseStudyMetric[]>(
    caseStudy?.metrics && caseStudy.metrics.length > 0
      ? caseStudy.metrics
      : [
          { value: '', label: '' },
          { value: '', label: '' },
          { value: '', label: '' },
        ]
  );

  return (
    <form action={saveCaseStudy} className="admin-form">
      {caseStudy && <input type="hidden" name="id" value={caseStudy.id} />}
      <input type="hidden" name="metrics_json" value={JSON.stringify(metrics)} />

      <div className="form-row">
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" defaultValue={caseStudy?.title} required />
        </div>
        <div className="form-group">
          <label>Tag (industry/category)</label>
          <input type="text" name="tag" defaultValue={caseStudy?.tag} placeholder="e.g. Retail & FMCG" required />
        </div>
      </div>

      <div className="form-group">
        <label>Challenge</label>
        <textarea name="challenge" defaultValue={caseStudy?.challenge} rows={3} required />
      </div>

      <h3 className="admin-form-section-title">Metrics (up to 3 shown on the card)</h3>
      {metrics.map((m, i) => (
        <div key={i} className="admin-repeat-row">
          <input
            type="text"
            placeholder="Value, e.g. 3×"
            value={m.value}
            onChange={(e) => setMetrics((rows) => rows.map((r, j) => (j === i ? { ...r, value: e.target.value } : r)))}
          />
          <input
            type="text"
            placeholder="Label, e.g. Faster decisions"
            value={m.label}
            onChange={(e) => setMetrics((rows) => rows.map((r, j) => (j === i ? { ...r, label: e.target.value } : r)))}
          />
          <button
            type="button"
            className="admin-icon-btn admin-icon-btn-danger"
            onClick={() => setMetrics((rows) => rows.filter((_, j) => j !== i))}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="s-link" onClick={() => setMetrics((rows) => [...rows, { value: '', label: '' }])}>
        + Add Metric
      </button>

      <div className="form-group" style={{ marginTop: 20 }}>
        <label>Display Order</label>
        <input type="number" name="display_order" defaultValue={caseStudy?.display_order ?? 0} min={0} style={{ maxWidth: 120 }} />
      </div>

      <div className="admin-form-actions">
        <label className="admin-status-toggle">
          <input type="checkbox" name="status" value="published" defaultChecked={caseStudy?.status === 'published'} />
          Publish immediately
        </label>
        <button type="submit" className="btn-teal">
          {caseStudy ? 'Save Changes' : 'Add Case Study'}
        </button>
      </div>
    </form>
  );
}
