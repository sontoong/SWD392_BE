import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasOne
} from 'sequelize-typescript';

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
  declare AccountId: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare Username: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  declare Email: string | null;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  declare Password: string;

  @Column({
    type: DataType.ENUM('enterprise', 'candidate'),
    allowNull: false
  })
  declare Role: 'enterprise' | 'candidate';

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true
  })
  declare Verified: boolean | null;

  @Column({
    type: DataType.STRING(255),
    defaultValue: 'default.jpg'
  })
  declare Image: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  @HasOne(() => CandidateInfo)
  candidateInfo!: CandidateInfo;

  @HasOne(() => EnterpriseInfo)
  enterpriseInfo!: EnterpriseInfo;
}

export default Account;
