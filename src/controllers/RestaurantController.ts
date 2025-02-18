
import Restaurant from "../models/Restaurant";
import User from "../models/User";

import { Utils } from "../utils/Utils";
import Category from "../models/Category";

export class RestaurantController {
  static async addRestaurant(req, res, next) {
    const restaurant = req.body;
    const path = req.file.path;
    const verification_token = Utils.generateVerificationToken();
    try {
      // create restaurant user
      const hash = await Utils.encryptPassword(restaurant.password);
      const data = {
        email: restaurant.email,
        verification_token,
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        phone: restaurant.phone,
        password: hash,
        name: restaurant.name,
        type: "restaurant",
        status: "active",
      };
      const user = await new User(data).save();
      //create categories
      const categoriesData= JSON. parse(restaurant.categories).map(x => {
        return {name: x, user_id: user._id};

      });
      const categories = Category.insertMany(categoriesData);

      // create restaurant
      let restaurant_data: any = {
        name: restaurant.res_name,
        short_name: restaurant.short_name,
        location: JSON.parse(restaurant.location),
        address: restaurant.address,
        openTime: restaurant.openTime,
        closeTime: restaurant.closeTime,
        status: restaurant.status,
        cuisines: JSON.parse(restaurant.cuisines),
        price: parseInt(restaurant.price),
        delivery_time: parseInt(restaurant.delivery_time),
        city_id: restaurant.city_id,
        user_id: user._id,
        cover: path,
      };
      if (restaurant.description)
        restaurant_data = {
          ...restaurant_data,
          description: restaurant.description,
        };
      const restaurantDoc = await new Restaurant(restaurant_data).save();
      res.send(restaurantDoc);
    } catch (e) {
      next(e);
    }
  }
  static async getRestaurants(req, res, next) {
    try {
      const cities = await Restaurant.find({ status: "active" });
      res.send(cities);
    } catch (e) {
      next(e);
    }
  }
}
