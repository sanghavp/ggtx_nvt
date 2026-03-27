import sequelize from '@/lib/db/sequelize';
import User from './user.model';
import News from './news.model';
import SiteSetting from './siteSetting.model';
import Milestone from './milestone.model';

/* --- Associations --- */

// User hasMany News (author)
User.hasMany(News, { foreignKey: 'authorId', as: 'articles' });
News.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

/* --- DB Init helper --- */

async function initDatabase() {
  await sequelize.authenticate();
  // Chỉ sync ở development, production dùng migrations
  if (process.env.NODE_ENV !== 'production') {
    await sequelize.sync({ alter: true });
  }
}

export { sequelize, User, News, SiteSetting, Milestone, initDatabase };
