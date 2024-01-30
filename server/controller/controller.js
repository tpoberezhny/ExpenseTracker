const model = require("../models/model");

async function create_Categories(req, res) {
  try {
    const Create = new model.Categories({
      type: "Развлечения",
      color: "rgb(54, 162, 235)",
    });

    await Create.save();
    return res.json(Create);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating categories ${err}` });
  }
}

async function get_Categories(req, res) {
  let data = await model.Categories.find({});

  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  );
  return res.json(filter);
}

async function create_Transaction(req, res) {
  try {
    if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
    let { name, type, amount } = req.body;

    const create = new model.Transaction({
      name,
      type,
      amount,
      date: new Date(),
    });

    await create.save();
    return res.json(create);
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating transaction ${err}` });
  }
}

async function get_Transaction(req, res) {
  let data = await model.Transaction.find({});
  return res.json(data);
}

async function delete_Transaction(req, res) {
  try {
    if (!req.body)
      return res.status(400).json({ message: "Request body not found" });

    await model.Transaction.deleteOne(req.body);
    res.json({ message: "Запись была удалена" });
  } catch (err) {
    console.error("Error while deleting Transaction Record", err);
    res
      .status(500)
      .json({ message: "Error while deleting Transaction Record" });
  }
}

async function get_Labels(req, res) {
  model.Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json("Looup Collection Error");
    });
}

module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels,
};
