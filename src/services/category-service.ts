import Category from 'src/db/models/Category';

async function getAll(): Promise<Category[]> {
  return Category.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });
}

export default {
  getAll,
} as const;
