import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import Account from './account.model'; // Assuming you have an Account model

@Table({
  timestamps: true, // Assuming you want timestamps for payments
  tableName: 'payments',
  modelName: 'Payment'
})
class Payment extends Model<PaymentAttributes> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  paymentId!: number;

  @ForeignKey(() => Account)
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  enterpriseId!: number;

  @BelongsTo(() => Account)
  enterprise!: Account;

  @ForeignKey(() => Account)
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  candidateId!: number;

  @BelongsTo(() => Account)
  candidate!: Account;

  @Column({
    allowNull: false,
    type: DataType.DECIMAL(10, 2) // Example data type for currency amount
  })
  amount!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING // Assuming you want to store payment method
  })
  paymentMethod!: string;

  // You can add more attributes as needed
}

export default Payment;
