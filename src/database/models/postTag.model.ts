import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import Post from './post.model';
import Tag from './tag.model';

@Table({
  timestamps: false,
  tableName: 'post_tag', // Name of the intermediate table
  modelName: 'PostTag'
})
class PostTag extends Model {
  @ForeignKey(() => Post)
  @Column({
    allowNull: false
  })
  postId!: number;

  @ForeignKey(() => Tag)
  @Column({
    allowNull: false
  })
  tagId!: number;
}

export default PostTag;
