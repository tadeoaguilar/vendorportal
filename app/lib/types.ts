export interface LoginCredentials {
  name: string;
  password: string;
  tenant: string;
  branch: string;
  vendor: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
}

export interface VendorData {
  id: string,
  Date: { value: Date },
  Status: { value: string },
  Amount: { value: number },
  Vendor: { value: string },
  ReferenceNbr: { value: string },
  VendorRef: { value: string },
  Type: { value: string },
  Balance: { value: number }
}

export interface VendorProfile {
  id: string,
  Date: { value: Date },
  Status: { value: string },
  Amount: { value: number },
  Vendor: { value: string },
  ReferenceNbr: { value: string },
  VendorRef: { value: string },
  Type: { value: string },
  Balance: { value: number }
}