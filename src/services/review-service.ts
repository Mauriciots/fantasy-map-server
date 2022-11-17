import User from '../db/models/User';
import Review from '../db/models/Review';

// userId should be fetched from request header auth.
const userId = 1;

export async function getByUser(): Promise<Review[] | null> {
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

export async function create(review: IReviewRequest): Promise<number> {
  const dbReview = await Review.create({
    content: review.content,
    stars: review.stars,
    userId,
    placeId: review.placeId,
  });
  return dbReview.id;
}

export async function update(id: number, review: IReviewRequest): Promise<void> {
  await Review.update(
    {
      content: review.content,
      stars: review.stars,
    },
    {
      where: { id },
    }
  );
}

export async function remove(id: number): Promise<void> {
  await Review.destroy({
    where: { id },
  });
}
