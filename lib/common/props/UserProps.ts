export interface UserProps {
  email: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  status?: 'active' | 'blocked' | 'inactive';
  googleToken?: string;
  githubToken?: string;
  role: 'admin' | 'moderator' | 'user';
}
