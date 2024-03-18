import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany
} from 'sequelize-typescript';
import PostJobTitle from './postJobTitle.model';
import Account from './account.model';
import AppError from '~/utils/appError';
import JobTitle from './jobTitle.model';

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

  @HasMany(() => PostJobTitle)
  jobTitles!: JobTitle[];

  //   validateExperience() {
  //     for (const exp of this.experience) {
  //       if (!experienceOptions.includes(exp)) {
  //         throw new AppError(`Invalid experience level: ${exp}`, 400);
  //       }
  //     }
  //   }
}

export default Post;
