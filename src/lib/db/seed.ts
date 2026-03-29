import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { User, SiteSetting, Milestone, News, initDatabase } from '@/lib/db/models';
import logger from '@/lib/logger';

async function seed() {
  try {
    await initDatabase();
    logger.info('Database connected, starting seed...');

    // Seed admin user
    const existingAdmin = await User.findOne({ where: { email: 'admin@nvt.edu.vn' } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      await User.create({
        email: 'admin@nvt.edu.vn',
        password: hashedPassword,
        name: 'Admin NVT',
        role: 'ADMIN',
      });
      logger.info('Admin user created: admin@nvt.edu.vn');
    }

    // Seed site settings
    const settings = [
      { key: 'hero_title', value: 'Trung tâm GDNN-GDTX Nguyễn Văn Tố - Hoàn Kiếm', type: 'hero' },
      { key: 'hero_subtitle', value: 'Nơi ươm mầm tri thức - Vững bước tương lai', type: 'hero' },
      { key: 'hero_cta_text', value: 'Tìm hiểu thêm', type: 'hero' },
      { key: 'hero_cta_link', value: '/gioi-thieu', type: 'hero' },
      { key: 'stat_students', value: '500+', type: 'stats' },
      { key: 'stat_students_label', value: 'Học viên', type: 'stats' },
      { key: 'stat_teachers', value: '50+', type: 'stats' },
      { key: 'stat_teachers_label', value: 'Giảng viên', type: 'stats' },
      { key: 'stat_years', value: '20+', type: 'stats' },
      { key: 'stat_years_label', value: 'Năm hoạt động', type: 'stats' },
      { key: 'stat_courses', value: '15+', type: 'stats' },
      { key: 'stat_courses_label', value: 'Ngành đào tạo', type: 'stats' },
      {
        key: 'about_content',
        value: '<p>Cụ Nguyễn Văn Tố (1889 – 1947) sinh ra trong một gia đình nhà nho tại làng Đông Thành, huyện Thọ Xương, nay thuộc phường Hàng Bồ, quận Hoàn Kiếm, Hà Nội. Lãnh hội tri thức Nho học và Tây học, từ năm 1906, Cụ làm việc tại Viễn Đông Bác Cổ (nay là Bảo tàng Lịch sử Quốc gia Việt Nam).</p><p>Cụ là Hội trưởng đầu tiên của Hội Truyền bá chữ Quốc ngữ. Sau Cách mạng tháng Tám, Chủ tịch Hồ Chí Minh mời Cụ làm Bộ trưởng Bộ Cứu tế Xã hội. Ngày 6/1/1946, Cụ trúng cử Đại biểu Quốc hội khóa I và được bầu làm Trưởng Ban Thường trực Quốc hội (Chủ tịch Quốc hội đầu tiên của nước Việt Nam Dân chủ Cộng hòa). Cụ Nguyễn Văn Tố đã cống hiến trọn đời cho sự nghiệp cách mạng và anh dũng hy sinh năm 1947.</p><p>Trung tâm Giáo dục Nghề nghiệp - Giáo dục Thường xuyên Nguyễn Văn Tố tự hào mang tên Cụ, là nơi ươm mầm tri thức, vững bước tương lai cho hàng triệu học viên, viết tiếp truyền thống hiếu học và yêu nước.</p>',
        type: 'about',
      },
      { key: 'about_hero_title', value: 'Truyền thống vang dội, vững bước tương lai', type: 'about' },
      {
        key: 'about_hero_description',
        value: 'Trung tâm mang tên nhà yêu nước Nguyễn Văn Tố, kế thừa tinh thần hiếu học và đào tạo thế hệ trẻ vững vàng bước vào tương lai.',
        type: 'about',
      },
      { key: 'footer_address', value: 'Địa chỉ trung tâm GDNN-GDTX Nguyễn Văn Tố - Hoàn Kiếm', type: 'general' },
      { key: 'footer_phone', value: '0123 456 789', type: 'general' },
      { key: 'footer_email', value: 'info@nvt.edu.vn', type: 'general' },
    ];

    for (const setting of settings) {
      const [record, created] = await SiteSetting.findOrCreate({
        where: { key: setting.key },
        defaults: setting,
      });
      if (!created) {
        await record.update(setting);
      }
    }
    logger.info(`Seeded ${settings.length} site settings`);

    // Seed milestones
    const milestones = [
      { year: '2000', title: 'Thành lập trung tâm', description: 'Trung tâm GDNN-GDTX Nguyễn Văn Tố - Hoàn Kiếm chính thức được thành lập.', sortOrder: 1 },
      { year: '2005', title: 'Mở rộng ngành đào tạo', description: 'Bổ sung thêm 5 ngành đào tạo mới đáp ứng nhu cầu xã hội.', sortOrder: 2 },
      { year: '2010', title: 'Nâng cấp cơ sở vật chất', description: 'Đầu tư xây dựng phòng học, phòng thực hành hiện đại.', sortOrder: 3 },
      { year: '2020', title: 'Chuyển đổi số', description: 'Áp dụng công nghệ số vào giảng dạy và quản lý.', sortOrder: 4 },
    ];

    for (const milestone of milestones) {
      await Milestone.findOrCreate({
        where: { year: milestone.year, title: milestone.title },
        defaults: milestone,
      });
    }
    logger.info(`Seeded ${milestones.length} milestones`);

    // Seed News from FB JSON
    const adminUser = await User.findOne({ where: { email: 'admin@nvt.edu.vn' } });
    if (adminUser) {
      try {
        const fbPostsPath = path.join(process.cwd(), 'public', 'fb_posts.json');
        if (fs.existsSync(fbPostsPath)) {
          const fbPosts = JSON.parse(fs.readFileSync(fbPostsPath, 'utf8'));
          for (const post of fbPosts) {
            const slug = post.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            await News.findOrCreate({
              where: { title: post.title },
              defaults: {
                title: post.title,
                slug,
                summary: post.content.substring(0, 150) + '...',
                content: `<p>${post.content}</p>`,
                thumbnail: post.thumbnail,
                authorId: adminUser.id,
                isPublished: true,
                publishedAt: new Date(post.publishedAt)
              }
            });
          }
          logger.info(`Seeded ${fbPosts.length} news articles from FB`);
        }
      } catch (err) {
        logger.warn({ err }, 'Failed to seed FB posts');
      }
    }

    logger.info('Seed completed successfully!');
  } catch (error) {
    logger.error({ error }, 'Seed failed');
    throw error;
  }
}

export default seed;
