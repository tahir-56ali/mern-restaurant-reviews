let restaurants;

export default class RestaurantsDAO {
  static async injectDB(conn) {
    try {
      if (restaurants) {
        return;
      }

      restaurants = conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("restaurants");
    } catch (e) {
      console.log(
        `Unable to establish a collection handle in RestaurantsDAO: ${e}`
      );
    }
  }
}
