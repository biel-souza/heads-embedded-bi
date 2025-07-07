export interface User {
  id: number;
  name: string;
  user: string;
  type: string;
  company: {
    id: number;
    description: string;
    mobile_mode: boolean;
  };
  panels: { id: number; description: string; report_id: string; filter: string }[];
}

export interface Token {
  user: User;
  name: string;
  iat: number;
  exp: number;
  jti: string;
}
