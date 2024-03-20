import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import Post from './post.model';
import JobTitle from './jobTitle.model';

@Table({
  timestamps: false,
  tableName: 'post_job_titles', // Name of the intermediate table
  modelName: 'PostJobTitle'
})
class PostJobTitle extends Model {
  @ForeignKey(() => Post)
  @Column({
    allowNull: false
  })
  postId!: number;

  @ForeignKey(() => JobTitle)
  @Column({
    allowNull: false
  })
  jobTitleId!: number;
}

export default PostJobTitle;
