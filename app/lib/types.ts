export interface LoginCredentials {
  name: string;
  password: string;
  tenant: string;
  branch: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
}