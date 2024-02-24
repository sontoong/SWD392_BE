import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import TagAttributes from '~/type';
import CandidateInfo from './candidateInfo.model';

@Table({
  timestamps: false,
  tableName: 'tag',
  modelName: 'Tag'
})
class Tag extends Model<TagAttributes> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  declare tagId: number;

  @HasMany(() => CandidateInfo) // Define foreign key relationship
  candidateInfos!: CandidateInfo[];

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  declare tagDescription: string;
}

export default Tag;
