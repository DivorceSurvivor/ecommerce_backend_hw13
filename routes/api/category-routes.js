const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    // find all categories
    // be sure to include its associated Products
    let categories = await Category.findAll({ raw: true });
    for (let i in categories) {
      categories[i].products = await Product.findAll({
        where: { category_id: categories[i].id },
        raw: true
      });
    }
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    let category = await Category.findOne({
      where: { id: req.params.id },
      raw: true
    });
    category.products = await Product.findAll({
      where: { category_id: req.params.id },
      raw: true
    });

    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deleteCategory);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
