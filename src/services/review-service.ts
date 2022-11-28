import User from '../db/models/User';
import Review from '../db/models/Review';

export async function getByUser(userId: number): Promise<Review[] | null> {
  const user = await User.findByPk(userId, {
    include: [Review],
  });
  if (!user) {
    return null;
  }
  return user.Reviews;
}

export interface IReviewRequest {
  content: string;
  stars: number;
  placeId: number;
}

export async function create(userId: number, review: IReviewRequest): Promise<number> {
  const dbReview = await Review.create({
    content: review.content,
    stars: review.stars,
    userId,
    placeId: review.placeId,
  });
  return dbReview.id;
}

export async function update(userId: number, id: number, review: IReviewRequest): Promise<void> {
  await Review.update(
    {
      content: review.content,
      stars: review.stars,
    },
    {
      where: { id, userId },
    }
  );
}

export async function remove(userId: number, id: number): Promise<void> {
  await Review.destroy({
    where: { id, userId },
  });
}
