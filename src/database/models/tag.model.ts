import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany
} from 'sequelize-typescript';
import Post from './post.model';
import PostTag from './postTag.model';

@Table({
  timestamps: false,
  tableName: 'tag',
  modelName: 'Tag'
})
class Tag extends Model<TagAttributes> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  tagId!: number;

  // Define Many-to-Many relationship with Post model
  @BelongsToMany(() => Post, () => PostTag)
  posts!: Post[];

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  tagDescription!: string;
}

export default Tag;
