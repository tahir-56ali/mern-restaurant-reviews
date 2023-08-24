let restaurants;

export default class RestaurantsDAO {
  static async injectDB(conn) {
    try {
      if (restaurants) {
        return;
      }

      restaurants = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("restaurants");
    } catch (e) {
      console.log(
        `Unable to establish a collection handle in RestaurantsDAO: ${e}`
      );
    }
  }

  static async getRestaurants({
    filters = null,
    restaurantsPerPage = 20,
    page = 0,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters.name } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters.cuisine } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters.zipcode } };
      }
    }
    let cursor;

    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.log(`Unable to issue find command in RestaurantsDAO: ${e}`);
      return { restaurantsList: null, totalNumRestaurants: 0 };
    }

    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants = await restaurants.countDocuments(query);

      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.log(
        `Unable to convert array or count documents in RestaurantsDAO: ${e}`
      );
      return { restaurantsList: null, totalNumRestaurants: 0 };
    }
  }
}
