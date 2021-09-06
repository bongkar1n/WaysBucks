const { product } = require("../../models");

exports.addProduct = async (req, res) => {
  const { title, price } = req.body;
  const image = req.file.filename;

  try {
    const existData = await product.findOne({
      where: {
        title,
      },
    });

    if (existData) {
      return res.status(409).send({
        status: "failed",
        message: "product already exist",
      });
    }

    const addData = await product.create({
      title,
      price,
      image,
    });

    const data = await product.findOne({
      where: {
        id: addData.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(201).send({
      status: "success",
      message: "successfully add 1 product",
      data: {
        product: {
          data,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: "successfully get 1 product",
      data: {
        product: data,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const data = await product.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: "successfully get all products",
      data: {
        products: data,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.editProduct = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const updateData = await product.update(body, {
      where: {
        id,
      },
    });

    const updatedData = await product.findOne({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      message: "successfully update data",
      data: {
        product: updatedData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const findData = product.findOne({
      where: {
        id,
      },
    });

    if (!findData) {
      return res.status(400).send({
        status: "failed",
        message: "data is not found",
      });
    }
    const deleteData = await product.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "successfully delete 1 data",
      data: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
