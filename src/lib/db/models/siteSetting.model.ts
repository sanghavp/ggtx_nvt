import { DataTypes, Model, type Optional } from 'sequelize';
import sequelize from '@/lib/db/sequelize';

interface SiteSettingAttributes {
  id: number;
  key: string;
  value: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type SiteSettingCreationAttributes = Optional<SiteSettingAttributes, 'id' | 'createdAt' | 'updatedAt'>;

class SiteSetting extends Model<SiteSettingAttributes, SiteSettingCreationAttributes>
  implements SiteSettingAttributes {
  declare id: number;
  declare key: string;
  declare value: string;
  declare type: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

SiteSetting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'general',
      comment: 'Loại setting: about, hero, stats, general...',
    },
  },
  {
    sequelize,
    tableName: 'site_settings',
    modelName: 'SiteSetting',
  }
);

export default SiteSetting;
