import e from "express";
import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const date = new Date();
      const review = req.body.text;
      const restaurantId = req.body.restaurant_id;

      const userInfo = {
        _id: req.body.user._id,
        name: req.body.user.name,
      };

      await ReviewsDAO.addReview(review, restaurantId, userInfo, date);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const review = req.body.text;
      const reviewId = req.body.review_id;
      const date = new Date();
      const userId = req.body.user_id;

      const reviewResponse = await ReviewsDAO.updateReview(
        review,
        date,
        reviewId,
        userId
      );

      const { error } = reviewResponse;
      if (error) {
        res.status(500).json({ error });
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "Unable to update the review - user may not be original poster"
        );
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;

      const deleteReviewResponse = await ReviewsDAO.deleteReview(
        reviewId,
        userId
      );

      if (deleteReviewResponse.deletedCount === 0) {
        throw new Error(
          "Unable to delete the review - user may not be original poster"
        );
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
