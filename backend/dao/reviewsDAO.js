let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    try {
      if (reviews) {
        return;
      }

      reviews = conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
    } catch (e) {
      console.log(
        `Unable to establish a collection handle in ReviewsDAO: ${e}`
      );
    }
  }
}
