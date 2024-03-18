import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType
} from 'sequelize-typescript';
import CandidateInfo from './candidateInfo.model';
import Language from './language.model';

@Table({
  timestamps: false,
  tableName: 'candidate_languages',
  modelName: 'CandidateLanguage'
})
class CandidateLanguage extends Model {
  @ForeignKey(() => CandidateInfo)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare candidateId: number;

  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare languageId: number;
}

export default CandidateLanguage;
