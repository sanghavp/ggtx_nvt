import { DataTypes, Model, type Optional } from 'sequelize';
import sequelize from '@/lib/db/sequelize';

interface MilestoneAttributes {
  id: number;
  year: string;
  title: string;
  description: string | null;
  sortOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type MilestoneCreationAttributes = Optional<
  MilestoneAttributes,
  'id' | 'description' | 'sortOrder' | 'createdAt' | 'updatedAt'
>;

class Milestone extends Model<MilestoneAttributes, MilestoneCreationAttributes>
  implements MilestoneAttributes {
  declare id: number;
  declare year: string;
  declare title: string;
  declare description: string | null;
  declare sortOrder: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Milestone.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    year: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'milestones',
    modelName: 'Milestone',
  }
);

export default Milestone;
