import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
  Default
} from 'sequelize-typescript';
import Account from './account.model';

@Table({
  timestamps: true,
  tableName: 'ratings',
  modelName: 'Rating'
})
class Rating extends Model<RatingAttributes> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  declare ratingId: number;

  @ForeignKey(() => Account)
  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  declare enterpriseUsername: string;

  @BelongsTo(() => Account, {
    foreignKey: 'enterpriseUsername',
    targetKey: 'username'
  })
  enterprise!: Account;

  @ForeignKey(() => Account)
  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  declare candidateUsername: string;

  @BelongsTo(() => Account, {
    foreignKey: 'candidateUsername',
    targetKey: 'username'
  })
  candidate!: Account;

  @Column({
    allowNull: false,
    type: DataType.FLOAT
  })
  declare quality: number;

  @Column({
    allowNull: false,
    type: DataType.FLOAT
  })
  declare price: number;

  @Column({
    allowNull: false,
    type: DataType.FLOAT
  })
  declare time: number;

  @Column({
    allowNull: false,
    type: DataType.FLOAT
  })
  declare responsibility: number;

  @Column({
    allowNull: false,
    type: DataType.FLOAT
  })
  declare communication: number;

  @Column({
    allowNull: false,
    type: DataType.FLOAT
  })
  declare overallRating: number;

  @Column({
    allowNull: false,
    type: DataType.TEXT
  })
  declare comment: string;
}

export default Rating;
