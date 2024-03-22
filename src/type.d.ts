// Account interface
interface AccountAttributes {
  accountId?: number;
  googleId?: string | null;
  username: string;
  email: string;
  phone: string;
  password: string;
  role: 'enterprise' | 'candidate' | 'admin';
  image?: string;
  wallet?: number;
  verified?: boolean | null;
  active?: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
  passwordResetToken?: string | null;
  passwordResetExpires?: number | null;
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

interface LanguageAttributes {
  languageId?: number;
  name: string;
}

// CandidateInfo interface
interface CandidateInfoAttributes {
  candidateInfoId?: number;
  accountId?: number;
  fullname: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  nationality: string;
  experience?: 'junior' | 'middle' | 'senior' | 'expert';
  specialty?: string;
  dob: Date;
  profileDescription: string;
  subscription?: string;
  jobTitleId?: number;
}

// Contract interface
interface ContractAttributes {
  contractId?: number;
}

// EnterpriseInfo interface
// EnterpriseInfo interface
interface EnterpriseInfoAttributes {
  enterpriseInfoId?: number;
  accountId?: number;
  enterpriseName: string;
  dob: Date;
  enterpriseNation: string;
  enterpriseVerificationDocuments?: Buffer;
  enterpriseVerificationType?: string;
  enterpriseVerificationNumber?: string;
  companyName: string;
  companySize: number;
  companyWebAddress?: string;
  companyVideoAddress?: string;
  companyDescription?: string;
  companyVerificationDocuments?: Buffer;
  companyVerificationNumber?: string;
  companyTaxCode?: string;
  companyNation: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
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
  // jobTitleId?: number;
  enterpriseId: number;
  content: string;
  postTitle: string;
  language: string;
  jobTitle?: string;
  address: string;
  contract: string;
  budgetType: 'hourly' | 'project';
  budget?: number;
  duration?: number | null;
  durationType: 'long-term' | 'short-term';
  privacy: 'public' | 'private' | 'freelancer';
  participants?: number | null;
  ratingRequired?: 'all' | 'more than 3' | 'more than 4';
  // skillRequired?: Array<string>;
  // questions?: Array<string>;
  experience?: 'junior' | 'middle' | 'senior' | 'expert';
  // experience: string[];
  expireDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PaymentAttributes {
  paymentId?: number;
  createAt?: Date;
  paymentMethod: string;
  amount: number;
  candidateId: number;
  enterpriseId: number;
}

// jobTitle interface
interface JobTitleAttributes {
  jobTitleId?: number;
  jobTitleName: string;
  jobTitleDescription?: string | null;
  popularity?: number;
}

interface SkillAttributes {
  skillId?: number;
  skillName: string;
  // skillDescription?: string;
  // popularity?: number;
}

interface RatingAttributes {
  ratingId?: number;
  quality: float;
  price: float;
  time: float;
  responsibility: float;
  communication: float;
  overallRating: float;
  comment: string;
  candidateUsername: string;
  enterpriseUsername: string;
}

interface SendEmailOptions {
  email: string;
  subject: string;
  message: string;
}

module.exports = AccountAttributes;
module.exports = ApplicationAttributes;
module.exports = CandidateInfoAttributes;
module.exports = ContractAttributes;
module.exports = EnterpriseInfoAttributes;
module.exports = NotificationAttributes;
module.exports = PaymentAttributes;
module.exports = PostAttributes;
module.exports = JobTitleAttributes;
