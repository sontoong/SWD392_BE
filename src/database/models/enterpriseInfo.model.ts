import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import EnterpriseInfoAttributes from '~/type';
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
  declare AccountId: number;

  @BelongsTo(() => Account, { foreignKey: 'AccountId' })
  account!: Account;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare CompanyName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare Contact: string;

  @Column({
    type: DataType.BLOB,
    allowNull: true
  })
  declare VerificationDocuments: Buffer;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare Address: string;
}

export default EnterpriseInfo;
