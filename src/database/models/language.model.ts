import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany
} from 'sequelize-typescript';
import CandidateInfo from './candidateInfo.model';
import CandidateLanguage from './candidateLanguage.model';

@Table({
  timestamps: false,
  tableName: 'languages',
  modelName: 'Language'
})
class Language extends Model<LanguageAttributes> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    unique: true
  })
  declare languageId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  declare name: string;

  @BelongsToMany(() => CandidateInfo, () => CandidateLanguage)
  candidates?: CandidateInfo[];
}

export default Language;
