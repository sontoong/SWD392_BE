import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';
import PostJobTitle from './postJobTitle.model';
import Account from './account.model';
import AppError from '~/utils/appError';
import JobTitle from './jobTitle.model';
import { StringNullableChain } from 'lodash';
import { LargeNumberLike } from 'crypto';
import { Sequelize } from 'sequelize';
export interface OptionalRequirements {
  minimumCompletedProjects:
    | 'all'
    | '<3 projects'
    | '5-10 projects'
    | '>10 projects';
  rating: 'all' | '>3 stars' | '>4 stars';
  nation: string;
  language: 'all' | 'vn' | 'en' | 'cn';
  skills: string[];
  questions?: string[];
}

export interface ProjectAttributes {
  projectId?: number;
  projectField: number;
  title: string;
  description: string;
  funding: string;
  candidateRequirement: string;
  initialFunding: number;
  timeToComplete: string;
  createdBy: number;
  privacy: string;
  projectType: string;
  optionalRequirements: OptionalRequirements;
  expireDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  isCompleted?: boolean;
  isVerified?: boolean;
  applicationCount?: number;
  inviteSent?: number;
  inviteAccepted?: number;
  candidateCount?: number;
  status?: string;
}
@Table({
  timestamps: true,
  tableName: 'projects',
  modelName: 'Project'
})
class Project extends Model<ProjectAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column
  projectId!: number;

  @ForeignKey(() => Account)
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  createdBy!: number;
  @BelongsTo(() => Account)
  createdByAccount!: Account;

  @ForeignKey(() => JobTitle)
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  projectField!: number;
  @BelongsTo(() => JobTitle)
  createdByProjectField!: JobTitle;

  @Column({
    allowNull: false,
    type: DataType.TEXT
  })
  title!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  description!: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM('hourly', 'fixed')
  })
  funding!: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM('junior', 'senior', 'expert')
  })
  candidateRequirement!: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  initialFunding!: number;

  @Column({
    allowNull: false,
    type: DataType.ENUM('<1 month', '1-3 month', '>3 month')
  })
  timeToComplete!: string;

  @Column({
    type: DataType.ENUM('public', 'private', 'candidate'),
    allowNull: false
  })
  privacy!: string;

  @Column({
    type: DataType.ENUM('longterm', 'shortterm', 'unknown'),
    allowNull: false
  })
  projectType!: string;

  @Column({
    type: DataType.ENUM('hiring', 'closed', 'doing'),
    allowNull: true,
    defaultValue: 'hiring'
  })
  status!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  expireDate!: Date | null;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  })
  updatedAt!: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  isCompleted!: boolean;

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isVerified!: boolean;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: 0
  })
  applicationCount!: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  inviteSent!: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    defaultValue: 0
  })
  inviteAccepted!: number;

  @Column({
    allowNull: true,
    defaultValue: 0,

    type: DataType.INTEGER
  })
  candidateCount!: number;

  @Column({
    allowNull: true,
    type: DataType.JSON
  })
  optionalRequirements?: OptionalRequirements;
  static primaryKeyAttribute = 'projectId';
}

export default Project;
