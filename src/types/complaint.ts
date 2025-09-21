export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Resolved';
  user_email?: string;
  date_submitted: string;
  updated_at: string;
}

export interface NewComplaint {
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  user_email?: string;
}

export const CATEGORIES = ['Product', 'Service', 'Support', 'Billing', 'Technical'] as const;
export const PRIORITIES = ['Low', 'Medium', 'High'] as const;
export const STATUSES = ['Pending', 'In Progress', 'Resolved'] as const;