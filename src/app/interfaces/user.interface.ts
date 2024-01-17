export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  user: LoginUser;
  token: string;
}

export interface LoginUser {
  email: string;
  name: string;
  cuit: string;
  address: string;
  phoneNumber: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  repeatedPassword: string;
}

export interface CreateUserResponse {
  id: string;
  email: string;
  company_id: string;
  active: boolean;
  created_at: string;
  modificated_at: string;
  deleted_at: string;
}

export interface ProfileData {
  name: string | undefined;
  cuit: string | undefined;
  address: string | undefined;
  phoneNumber: string | undefined;
}

