const { orderDetail, topping, product, user } = require("../../models");

exports.addOrderDetail = async (req, res) => {
  const { userId } = req;
  const { productId, topping, totalPrice } = req.body;

  try {
    const data = await orderDetail.create({
      userId,
      productId,
      topping,
      totalPrice,
    });

    const findData = await orderDetail.findOne({
      where: {
        id: data.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "productId"],
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.status(201).send({
      status: "success",
      message: "successfully create 1 data",
      data: findData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getOrderDetails = async (req, res) => {
  const { userId } = req;

  try {
    const data = await orderDetail.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: user,
          as: "user",
          attributes: ["id", "fullName"],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "productId", "userId"],
      },
    });

    res.send({
      status: "success",
      message: "successfully get order details",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getOrderDetail = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  try {
    const data = await orderDetail.findOne({
      where: {
        id,
      },
      include: [
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: user,
          as: "user",
          attributes: ["id", "fullName"],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "productId", "userId"],
      },
    });

    const showTopping = await topping.findAll({
      where: {
        id: JSON.parse(data.topping),
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "productId"],
      },
    });

    res.send({
      status: "success",
      message: "successfully get 1 order detail",
      data: {
        userId: data.userId,
        totalPrice: 50000,
        product: data.product,
        topping: showTopping,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
