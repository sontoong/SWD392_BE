import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType
} from 'sequelize-typescript';
import JobTitle from './jobTitle.model';
import Skill from './skill.model';

@Table({
  timestamps: false,
  tableName: 'job_title_skills',
  modelName: 'JobTitleSkill'
})
class JobTitleSkill extends Model {
  @ForeignKey(() => JobTitle)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  jobTitleId!: number;

  @ForeignKey(() => Skill)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  skillId!: number;
}

export default JobTitleSkill;
