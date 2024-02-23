import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  AutoIncrement
} from 'sequelize-typescript';

import CandidateInfoAttributes from '~/type';
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
  declare AccountId: number;

  @BelongsTo(() => Account, { foreignKey: 'AccountId' })
  account!: Account;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare Fullname: string;

  @Column({
    type: DataType.ENUM('male', 'female', 'other'),
    allowNull: false
  })
  declare Gender: 'male' | 'female' | 'other';

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare Address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare Nationality: string;

  @Column({
    type: DataType.ENUM('junior', 'middle', 'senior', 'expert'),
    allowNull: true
  })
  declare Experience: 'junior' | 'middle' | 'senior' | 'expert';

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare Specialty: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare JobTitle: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  declare Dob: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  declare ProfileDescription: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare Subscription: string;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  declare TagId: number;

  @BelongsTo(() => Tag, { foreignKey: 'TagId' })
  tag!: Tag;
}

export default CandidateInfo;
