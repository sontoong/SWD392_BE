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
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  declare enterpriseInfoId: number;

  @BelongsTo(() => Account, { foreignKey: 'accountId' })
  account!: Account;

  // enterprise info
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare enterpriseName: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  declare dob: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare enterpriseNation: string;

  @Column({
    type: DataType.BLOB,
    allowNull: true
  })
  declare enterpriseVerificationDocuments: Buffer;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare enterpriseVerificationType: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare enterpriseVerificationNumber: string;

  // company info
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare companyName: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM('small', 'medium', 'large')
  })
  declare companySize: 'small' | 'medium' | 'large';

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare companyWebAddress: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare companyVideoAddress: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare companyDescription: string;

  @Column({
    type: DataType.BLOB,
    allowNull: true
  })
  declare companyVerificationDocuments: Buffer;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare companyVerificationNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  declare companyTaxCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare companyNation: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare companyAddress: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare companyEmail: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare companyPhone: string;
}

export default EnterpriseInfo;
