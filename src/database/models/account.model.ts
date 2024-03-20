import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasOne,
  BeforeCreate,
  BeforeUpdate,
  Default
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import CandidateInfo from './candidateInfo.model';
import EnterpriseInfo from './enterpriseInfo.model';

@Table({
  timestamps: true,
  tableName: 'accounts',
  modelName: 'Account'
})
class Account extends Model<AccountAttributes> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  declare accountId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  declare googleId: string | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true
  })
  declare username: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true
  })
  declare email: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
    defaultValue: 'N/A'
  })
  declare phone: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    defaultValue: 'N/A'
  })
  declare password: string;

  // password hooks
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(account: Account) {
    if (account.changed('password')) {
      account.password = await bcrypt.hash(account.password, 12);
    }
  }

  @Column({
    type: DataType.ENUM('enterprise', 'candidate', 'admin'),
    allowNull: false,
    defaultValue: 'candidate'
  })
  declare role: 'enterprise' | 'candidate' | 'admin';

  @Column({
    type: DataType.STRING(255),
    defaultValue: 'default.jpg'
  })
  declare image: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0
  })
  declare wallet: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  declare verified: boolean | null;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true
  })
  declare active: boolean | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  declare passwordResetToken: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  declare passwordResetExpires: number | null;

  @HasOne(() => CandidateInfo)
  candidateInfo!: CandidateInfo;

  @HasOne(() => EnterpriseInfo)
  enterpriseInfo!: EnterpriseInfo;

  // verify password
  async verifyPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
  }

  // reset password token
  async createPasswordResetToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
  }
}

export default Account;
