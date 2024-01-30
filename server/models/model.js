const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categories_model = new Schema({
  type: { type: String, default: "Продукты" },
  color: { type: String, default: "#FCBE44" },
});

const transaction_model = new Schema({
  name: { type: String, default: "Anonymous" },
  type: { type: String, default: "Продукты" },
  amount: { type: Number, default: 1000 },
  date: { type: Date, default: Date.now },
});

const Categories = mongoose.model("categories", categories_model);

const Transaction = mongoose.model("transaction", transaction_model);

exports.default = Transaction;
module.exports = {
  Categories,
  Transaction,
};
