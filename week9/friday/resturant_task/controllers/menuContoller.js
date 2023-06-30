const Menu = require("../models/menuModel");
const Branch = require("../models/branchModel");

// create new menu
const newMenu = async (req, res) => {
  try {
    const branch = await Branch.findOne({
      branchName: req.body.branch.branchName,
    });

    if (!branch) {
      res.status(500).json({ message: "branch does not exist" });
    } else {
      const menu = await Menu.create({
        mealName: req.body.mealName,
        branch: {
          branchName: req.body.branch.branchName,
          branchId: branch._id,
        },
        main: req.body.main,
        side: req.body.side,
        drink: req.body.drink,
      });

      if (req.body.mealName === "citizenMeal") {
        branch.citizenMeal = menu._id;
        await branch.save();
        res.status(200).json(menu);
      } else if (req.body.mealName === "refuelMax") {
        branch.refuelMax = menu._id;
        await branch.save();
        res.status(200).json(menu);
      } else if (req.body.mealName === "refuel") {
        branch.refuel = menu._id;
        await branch.save();
        res.status(200).json(menu);
      } else if (req.body.mealName === "chickWizz") {
        branch.chickWizz = menu._id;
        await branch.save();
        res.status(200).json(menu);
      } else if (req.body.mealName === "bigBoyzMeal") {
        branch.bigBoyzMeal = menu._id;
        await branch.save();
        res.status(200).json(menu);
      } else {
        await Menu.findByIdAndDelete(menu.id);
        res.status(500).json({
          message: "no such meal type",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//update
const updateMenu = async (req, res) => {
  try {
    const menuId = req.params.id;
    const menu = await menu.findByIdAndUpdate(menuId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!menu) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: "updated menu",
        data: menu,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//delete
const deleteMenu = async (req, res) => {
  try {
    const menuId = req.params.id;
    const menu = await Menu.findByIdAndDelete(menuId);
    if (!menu) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      const branch = await Branch.findById(menu.branch.branchId);
      if (menu.mealName === "citizenMeal") {
        branch.citizenMeal = null;
        await branch.save();
      } else if (menu.mealName === "refuelMax") {
        branch.refuelMax = null;
        await branch.save();
      } else if (menu.mealName === "refuel") {
        branch.refuel = null;
        await branch.save();
      } else if (menu.mealName === "chickWizz") {
        branch.chickWizz = null;
        await branch.save();
      } else if (menu.mealName === "bigBoyzMeal") {
        branch.bigBoyzMeal = null;
        await branch.save();
      }
      res.status(200).json({
        messaage: "deleted nemu",
        data: menu,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  newMenu,
  updateMenu,
  deleteMenu,
};
