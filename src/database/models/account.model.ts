import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasOne,
  BeforeCreate,
  BeforeUpdate
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

import AccountAttributes from '~/type';
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
    unique: true
  })
  declare phone: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
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
    type: DataType.ENUM('enterprise', 'candidate', 'user'),
    allowNull: false
  })
  declare role: 'enterprise' | 'candidate' | 'user';

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true
  })
  declare verified: boolean | null;

  @Column({
    type: DataType.STRING(255),
    defaultValue: 'default.jpg'
  })
  declare image: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

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
}

export default Account;
