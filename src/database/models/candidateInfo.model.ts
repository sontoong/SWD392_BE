import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  AutoIncrement
} from 'sequelize-typescript';

import Account from './account.model';
import Tag from './tag.model';

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
    type: DataType.STRING,
    allowNull: false
  })
  declare jobTitle: string;

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

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  declare tagId: number;

  @BelongsTo(() => Tag, { foreignKey: 'tagId' })
  tag!: Tag;
}

export default CandidateInfo;
