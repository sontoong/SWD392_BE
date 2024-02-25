// Account interface
interface AccountAttributes {
  accountId?: number;
  username: string;
  email: string;
  phone: string;
  password: string;
  role: 'enterprise' | 'candidate' | 'user' | 'admin';
  image?: string;
  verified?: boolean | null;
  active?: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Application interface
interface ApplicationAttributes {
  applicationId?: number;
  postId: number;
  status?: 'pending' | 'accepted' | 'rejected';
  cv: Buffer;
  interviewDate: Date;
  interviewTime: string;
  candidateId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// CandidateInfo interface
interface CandidateInfoAttributes {
  accountId?: number;
  fullname: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  nationality: string;
  experience?: 'junior' | 'middle' | 'senior' | 'expert';
  specialty?: string;
  jobTitle: string;
  dob: Date;
  profileDescription: string;
  subscription?: string;
  tagId?: number;
}

// Contract interface
interface ContractAttributes {
  contractId?: number;
}

// EnterpriseInfo interface
interface EnterpriseInfoAttributes {
  accountId?: number;
  companyName: string;
  contact: string;
  verificationDocuments?: Buffer;
  address: string;
}

// Notification interface
interface NotificationAttributes {
  notificationId?: number;
}

// Payment interface
interface PaymentAttributes {
  paymentId?: number;
  createAt: Date;
  method: string;
  candidateId: number;
  enterpriseId: number;
}

// Post interface
interface PostAttributes {
  postId?: number;
  tagId?: number;
  enterpriseId: number;
  content: string;
  postTitle: string;
  budget: number;
  jobTitle: string;
  duration?: number | null;
  participants?: number | null;
  experience: 'junior' | 'middle' | 'senior' | 'expert';
  // experience: string[];
  expireDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tag interface
interface TagAttributes {
  tagId?: number;
  name: string;
  tagDescription?: string;
}

module.exports = AccountAttributes;
module.exports = ApplicationAttributes;
module.exports = CandidateInfoAttributes;
module.exports = ContractAttributes;
module.exports = EnterpriseInfoAttributes;
module.exports = NotificationAttributes;
module.exports = PaymentAttributes;
module.exports = PostAttributes;
module.exports = TagAttributes;
