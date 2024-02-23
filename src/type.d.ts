interface AccountAttributes {
  AccountId: number;
  Username: string;
  Email: string | null;
  Password: string;
  Role: 'enterprise' | 'candidate';
  Verified?: boolean | null;
  Image?: string;
  created_at?: Date;
  updated_at?: Date;
}

export default AccountAttributes;

// Application interface
interface ApplicationAttributes {
  ApplicationId: number;
  PostId: number;
  CreateAt: Date;
  Status?: 'pending' | 'accepted' | 'rejected';
  CV: Buffer;
  InterviewDate: Date;
  InterviewTime: string;
  CandidateId: number;
}

export default ApplicationAttributes;

// CandidateInfo interface
interface CandidateInfoAttributes {
  AccountId: number;
  Fullname: string;
  Gender: 'male' | 'female' | 'other';
  Address: string;
  Nationality: string;
  Experience?: 'junior' | 'middle' | 'senior' | 'expert';
  Specialty?: string;
  JobTitle: string;
  Dob: Date;
  ProfileDescription: string;
  Subscription?: string;
  TagId?: number;
}

export default CandidateInfoAttributes;

// Contract interface
interface ContractAttributes {
  ContractId?: number;
}

export default ContractAttributes;

// EnterpriseInfo interface
interface EnterpriseInfoAttributes {
  AccountId: number;
  CompanyName: string;
  Contact: string;
  VerificationDocuments?: Buffer;
  Address: string;
}

export default EnterpriseInfoAttributes;

// Notification interface
interface NotificationAttributes {
  NotificationId?: number;
}

export default NotificationAttributes;

// Payment interface
interface PaymentAttributes {
  PaymentId?: number;
  CreateAt: Date;
  Method: string;
  CandidateId: number;
  EnterpriseId: number;
}

export default PaymentAttributes;

// Post interface
interface PostAttributes {
  PostId?: number;
  TagId: number;
  EnterpriseId: number;
  Content: string;
  PostTitle: string;
  Budget: number;
  JobTitle: string;
  Duration?: number | null;
  Experience: 'junior' | 'middle' | 'senior' | 'expert';
  ExpireDate?: Date | null;
}

export default PostAttributes;

// Tag interface
interface TagAttributes {
  TagId?: number;
  Name: string;
  TagDescription?: string;
}

export default TagAttributes;
