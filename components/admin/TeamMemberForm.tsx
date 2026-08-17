'use client';

import { saveTeamMember } from '@/app/actions/team';
import type { TeamMember } from '@/lib/content/types';

export default function TeamMemberForm({ member }: { member?: TeamMember }) {
  return (
    <form action={saveTeamMember} className="admin-form">
      {member && <input type="hidden" name="id" value={member.id} />}

      <div className="form-row">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" defaultValue={member?.name} required />
        </div>
        <div className="form-group">
          <label>Role</label>
          <input type="text" name="role" defaultValue={member?.role} placeholder="e.g. Lead BI Consultant" required />
        </div>
      </div>

      <div className="form-group">
        <label>Bio</label>
        <textarea name="bio" defaultValue={member?.bio} rows={4} />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Avatar Initials</label>
          <input type="text" name="avatar_initials" defaultValue={member?.avatar_initials} maxLength={3} placeholder="e.g. OS" />
        </div>
        <div className="form-group">
          <label>Display Order</label>
          <input type="number" name="display_order" defaultValue={member?.display_order ?? 0} min={0} />
        </div>
      </div>

      <div className="form-group">
        <label>Skills (comma-separated)</label>
        <input type="text" name="skills" defaultValue={member?.skills?.join(', ') ?? ''} placeholder="e.g. Power BI, SQL, Strategy" />
      </div>

      <div className="admin-form-actions">
        <label className="admin-status-toggle">
          <input type="checkbox" name="status" value="published" defaultChecked={member?.status === 'published'} />
          Publish immediately
        </label>
        <button type="submit" className="btn-teal">
          {member ? 'Save Changes' : 'Add Team Member'}
        </button>
      </div>
    </form>
  );
}
