import { DataTypes, Model, type Optional } from 'sequelize';
import sequelize from '@/lib/db/sequelize';

interface NewsAttributes {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  content: string;
  summary: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  authorId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type NewsCreationAttributes = Optional<
  NewsAttributes,
  'id' | 'thumbnail' | 'summary' | 'isPublished' | 'publishedAt' | 'createdAt' | 'updatedAt'
>;

class News extends Model<NewsAttributes, NewsCreationAttributes> implements NewsAttributes {
  declare id: number;
  declare title: string;
  declare slug: string;
  declare thumbnail: string | null;
  declare content: string;
  declare summary: string | null;
  declare isPublished: boolean;
  declare publishedAt: Date | null;
  declare authorId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

News.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
    },
    thumbnail: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'news',
    modelName: 'News',
  }
);

export default News;
