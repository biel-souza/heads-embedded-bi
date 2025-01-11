export interface User {
  id: number;
  name: string;
  user: string;
  type: string;
  company: { id: number; description: string; pbi_client_id: string; pbi_password: string; pbi_user: string };
  panels: { id: number; description: string; report_id: string }[];
}

export interface Token {
  user: User;
  name: string;
  iat: number;
  exp: number;
  jti: string;
}
