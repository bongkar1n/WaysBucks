const { topping } = require("../../models");

exports.addTopping = async (req, res) => {
  const { title, price } = req.body;
  const image = req.file.filename;

  try {
    const existData = await topping.findOne({
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

    const addData = await topping.create({
      title,
      price,
      image,
    });

    const data = await topping.findOne({
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
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getTopping = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await topping.findOne({
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

exports.getSomeToppings = async (req, res) => {
  const { toppings } = req.body;
  try {
    const data = await topping.findAll({
      where: {
        id: JSON.parse(toppings),
        // id: toppings, [1, 2, 3]
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: "successfully get some products",
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

exports.getToppings = async (req, res) => {
  try {
    const data = await topping.findAll({
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

exports.editTopping = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const updateData = await topping.update(body, {
      where: {
        id,
      },
    });

    const updatedData = await topping.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
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
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteTopping = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteData = await topping.destroy({
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
