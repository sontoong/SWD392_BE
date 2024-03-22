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
  Default,
  AutoIncrement,
  PrimaryKey,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import CandidateInfo from './candidateInfo.model';
import EnterpriseInfo from './enterpriseInfo.model';
import Project from './project.model';
import Account from './account.model';
import Applicant from './applicant.model';

export interface ContractAttributes {
  contractId?: number;
  applicantId: number;
  fund: number;
  depositType: string;
  date: number;
  status?: string;
  signature?: string;
}
@Table({
  timestamps: true,
  tableName: 'contracts',
  modelName: 'Contract'
})
class Contract extends Model<ContractAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column
  contractId!: number;

  @ForeignKey(() => Applicant)
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  applicantId!: number;
  @BelongsTo(() => Applicant)
  applicant!: Applicant;

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  fund!: number;
  @Column({
    allowNull: true,
    type: DataType.ENUM('full', 'period'),
    defaultValue: 'period'
  })
  depositType!: string;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  date!: Date;

  @Column({
    allowNull: true,
    type: DataType.ENUM('completed', 'doing', 'canceled', 'pending'),
    defaultValue: 'pending'
  })
  status!: string;

  
  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  signature!: string;
}

export default Contract;
