const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // find all tags
    // be sure to include its associated Product data
    let allTags = await Tag.findAll({ raw: true });
    for (let i in allTags) {
      let allProductTags = await ProductTag.findAll({
        where: {
          tag_id: allTags[i].id
        },
        raw: true
      });
      const productIds = [];
      allProductTags.map((pt) => productIds.push(pt.productId));

      allTags[i].products = await Product.findAll({
        where: { id: productIds },
        raw: true
      });
    }
    res.status(200).json(allTags);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    let tagData = await Tag.findOne({
      where: { id: req.params.id },
      raw: true
    });
    if (!tagData) {
      return res.status(200).json();
    }
    let allProductTags = await ProductTag.findAll({
      where: {
        tag_id: tagData.id
      },
      raw: true
    });
    const productIds = [];
    allProductTags.map((pt) => productIds.push(pt.productId));

    tagData.products = await Product.findAll({
      where: { id: productIds },
      raw: true
    });

    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updatedTag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deleteTag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
