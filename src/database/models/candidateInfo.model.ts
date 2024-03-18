import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  HasMany
} from 'sequelize-typescript';

import Account from './account.model';
import JobTitle from './jobTitle.model';
import Language from './language.model';
import CandidateLanguage from './candidateLanguage.model';

@Table({
  timestamps: false,
  tableName: 'candidate_info',
  modelName: 'CandidateInfo'
})
class CandidateInfo extends Model<CandidateInfoAttributes> {
  @ForeignKey(() => Account)
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    unique: true
  })
  declare accountId: number;

  @BelongsTo(() => Account, { foreignKey: 'accountId' })
  account!: Account;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare fullname: string;

  @Column({
    type: DataType.ENUM('male', 'female', 'other'),
    allowNull: false
  })
  declare gender: 'male' | 'female' | 'other';

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare nationality: string;

  @Column({
    type: DataType.ENUM('junior', 'middle', 'senior', 'expert'),
    allowNull: true
  })
  declare experience: 'junior' | 'middle' | 'senior' | 'expert';

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare specialty: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  declare dob: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  declare profileDescription: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare subscription: string;

  @HasMany(() => CandidateLanguage)
  languages!: CandidateLanguage[];

  @ForeignKey(() => JobTitle)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  declare jobTitleId: number;

  // @BelongsTo(() => JobTitle, { foreignKey: 'jobTitleId' })
  // jobTitle!: JobTitle;
}

export default CandidateInfo;
