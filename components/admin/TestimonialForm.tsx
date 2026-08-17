'use client';

import { saveTestimonial } from '@/app/actions/testimonials';
import type { Testimonial } from '@/lib/content/types';

export default function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  return (
    <form action={saveTestimonial} className="admin-form">
      {testimonial && <input type="hidden" name="id" value={testimonial.id} />}

      <div className="form-group">
        <label>Quote</label>
        <textarea name="quote" defaultValue={testimonial?.quote} rows={4} required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Author Name</label>
          <input type="text" name="author_name" defaultValue={testimonial?.author_name} required />
        </div>
        <div className="form-group">
          <label>Author Role</label>
          <input type="text" name="author_role" defaultValue={testimonial?.author_role} placeholder="e.g. CEO, Company" required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Avatar Initials</label>
          <input type="text" name="avatar_initials" defaultValue={testimonial?.avatar_initials} maxLength={3} placeholder="e.g. AO" />
        </div>
        <div className="form-group">
          <label>Star Rating (1–5)</label>
          <input type="number" name="stars" defaultValue={testimonial?.stars ?? 5} min={1} max={5} />
        </div>
      </div>

      <div className="form-group">
        <label>Display Order</label>
        <input type="number" name="display_order" defaultValue={testimonial?.display_order ?? 0} min={0} style={{ maxWidth: 120 }} />
      </div>

      <div className="admin-form-actions">
        <label className="admin-status-toggle">
          <input type="checkbox" name="status" value="published" defaultChecked={testimonial?.status === 'published'} />
          Publish immediately
        </label>
        <button type="submit" className="btn-teal">
          {testimonial ? 'Save Changes' : 'Add Testimonial'}
        </button>
      </div>
    </form>
  );
}
