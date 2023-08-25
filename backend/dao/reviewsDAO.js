import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    try {
      if (reviews) {
        return;
      }

      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
    } catch (e) {
      console.log(
        `Unable to establish a collection handle in ReviewsDAO: ${e}`
      );
    }
  }

  static async addReview(review, restaurantId, user, date) {
    try {
      const reviewDoc = {
        text: review,
        user_id: user._id,
        name: user.name,
        restaurant_id: new ObjectId(restaurantId),
        date: date,
      };

      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.log(`addReview ${e}`);
      return { error: e };
    }
  }

  static async updateReview(review, date, reviewId, userId) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: new ObjectId(reviewId) },
        { $set: { text: review, date: date } }
      );

      return updateResponse;
    } catch (e) {
      console.log(`updateReview ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        user_id: userId,
        _id: new ObjectId(reviewId),
      });

      return deleteResponse;
    } catch (e) {
      console.log(`deleteReview ${e}`);
      throw e;
    }
  }
}
