import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany
} from 'sequelize-typescript';
import JobTitle from './jobTitle.model';
import JobTitleSkill from './jobTitleSkill.model'; // Assuming you'll create this model for the junction table

@Table({
  timestamps: false,
  tableName: 'skills',
  modelName: 'Skill'
})
class Skill extends Model<SkillAttributes> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  skillId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  skillName!: string;

  @BelongsToMany(() => JobTitle, () => JobTitleSkill)
  jobTitles!: JobTitle[];
}

export default Skill;
