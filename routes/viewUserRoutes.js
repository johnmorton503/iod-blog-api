const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", async (req, res, next) => {
    try {
        const users = await userController.getUsers();
        res.render('users', {layout : 'index', users: users});
    } catch (err) {
        next(err);
    }
  });

  router.get("/add", async (req, res, next) => {
    try {
        const users = await userController.getUsers();
        res.render('users-add', {layout : 'index'});
    } catch (err) {
        next(err);
    }
  });

module.exports = router;