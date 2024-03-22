import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  HasMany,
  BelongsTo
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
    // primaryKey: true
  })
  declare candidateInfoId: number;

  @BelongsTo(() => CandidateInfo, { foreignKey: 'candidateInfoId' })
  candidateInfo!: CandidateInfo;

  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
    // primaryKey: true
  })
  declare languageId: number;

  @BelongsTo(() => Language, { foreignKey: 'languageId' })
  language?: Language;
}

export default CandidateLanguage;
