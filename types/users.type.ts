export interface UserType {
  id: number;
  type: string;
  active: boolean;
  user: string;
  password: string;
  name: string;
  created_at: string;
  updated_at: string;
  last_login_at: string;
  userCompanies: { company: { description: string; id: number } }[];
  userPanels: { panel: { description: string; id: number } }[];
}
