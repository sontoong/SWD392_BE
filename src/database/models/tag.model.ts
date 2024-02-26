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
    allowNull: false,
    unique: true
  })
  tagName!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  tagDescription!: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 10
    }
  })
  popularity?: number;
}

export default Tag;
