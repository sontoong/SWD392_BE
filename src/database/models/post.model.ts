import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany
} from 'sequelize-typescript';
import Tag from './tag.model';
import PostTag from './postTag.model';
import Account from './account.model';
import AppError from '~/utils/appError';

// const experienceOptions = ['junior', 'middle', 'senior', 'expert'];

@Table({
  timestamps: true,
  tableName: 'posts',
  modelName: 'Post'
})
class Post extends Model<PostAttributes> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  postId!: number;

  @ForeignKey(() => Account)
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  enterpriseId!: number;

  @BelongsTo(() => Account)
  enterprise!: Account;

  @Column({
    allowNull: false,
    type: DataType.TEXT
  })
  content!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  postTitle!: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  budget!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  jobTitle!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  duration!: number | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  participants!: number | null;

  @Column({
    allowNull: false,
    type: DataType.ENUM('junior', 'middle', 'senior', 'expert')
  })
  experience!: 'junior' | 'middle' | 'senior' | 'expert';

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  expireDate!: Date | null;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  createdAt!: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  updatedAt!: Date;

  @BelongsToMany(() => Tag, () => PostTag)
  tags!: Tag[];

  //   validateExperience() {
  //     for (const exp of this.experience) {
  //       if (!experienceOptions.includes(exp)) {
  //         throw new AppError(`Invalid experience level: ${exp}`, 400);
  //       }
  //     }
  //   }
}

export default Post;
