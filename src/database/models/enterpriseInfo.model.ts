import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import Account from './account.model';

@Table({
  timestamps: false,
  tableName: 'enterprise_info',
  modelName: 'EnterpriseInfo'
})
class EnterpriseInfo extends Model<EnterpriseInfoAttributes> {
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
  declare companyName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare contact: string;

  @Column({
    type: DataType.BLOB,
    allowNull: true
  })
  declare verificationDocuments: Buffer;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare address: string;
}

export default EnterpriseInfo;
