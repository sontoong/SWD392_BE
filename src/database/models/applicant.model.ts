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

export interface Question {
  question: string;
  answer: string;
}
export interface ApplicantAttributes {
  applicantId?: number;
  projectId: number;
  candidateId: number;
  question: Question[];
  money: number;
  time: number;
  status?: string;
}
@Table({
  timestamps: true,
  tableName: 'applicants',
  modelName: 'Applicant'
})
class Applicant extends Model<ApplicantAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column
  applicantId!: number;

  @ForeignKey(() => Project)
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  projectId!: number;
  @BelongsTo(() => Project)
  project!: Project;

  @ForeignKey(() => Account)
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  candidateId!: number;
  @BelongsTo(() => Account)
  candidate!: Account;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  date!: Date;

  @Column({
    allowNull: true,
    type: DataType.JSON
  })
  question?: Question;

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  money!: number;
  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  time!: number;

  @Column({
    allowNull: true,
    type: DataType.ENUM('accepted', 'rejected', 'pending'),
    defaultValue:"pending"
  })
  status!: string;
}

export default Applicant;
