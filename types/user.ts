export type UserRole = 'admin' | 'broker' | 'client';

export interface User {
  id: string;
  email: string;
  password: string;
  full_name: string;
  phone: string;
  role: UserRole;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}