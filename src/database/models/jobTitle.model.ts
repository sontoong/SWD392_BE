import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import Post from './post.model';
import PostJobTitle from './postJobTitle.model';
import Skill from './skill.model';
import JobTitleSkill from './jobTitleSkill.model';
import CandidateInfo from './candidateInfo.model';

@Table({
  timestamps: false,
  tableName: 'job_titles',
  modelName: 'JobTitle'
})
class JobTitle extends Model<JobTitleAttributes> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  jobTitleId!: number;

  // Define Many-to-Many relationship with Post model
  @BelongsToMany(() => Post, () => PostJobTitle)
  posts!: Post[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  jobTitleName!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  jobTitleDescription!: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 10
    }
  })
  popularity?: number;

  @ForeignKey(() => CandidateInfo)
  candidateInfoId!: number;

  @BelongsTo(() => CandidateInfo)
  candidateInfo!: CandidateInfo;

  @BelongsToMany(() => Skill, () => JobTitleSkill)
  skills!: Skill[];
}

export default JobTitle;
