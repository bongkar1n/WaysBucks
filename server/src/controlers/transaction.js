const {
  transaction,
  topping,
  user,
  orderDetail,
  product,
} = require("../../models");

exports.addTransaction = async (req, res) => {
  const { userId } = req;
  const { orderId, admin } = req.body;

  try {
    const dataOrderDetail = await orderDetail.findAll({
      where: {
        userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const records = await dataOrderDetail.map(function (result) {
      return result.dataValues.id;
    });

    console.log(records);

    const data = await transaction.create({
      userId,
      orderId: JSON.stringify(records),
      admin,
      status: "waiting",
    });

    console.log("data :", data);

    const showData = await transaction.findOne({
      where: {
        id: data.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    console.log("showData :", showData);

    const showOrder = await orderDetail.findAll({
      where: {
        id: JSON.parse(data.orderId),
      },
      include: {
        model: product,
        as: "product",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "productId"],
      },
    });

    res.status(201).send({
      status: "success",
      message: "successfully create 1 data",
      // data: {
      //   id: showData.id,
      //   user: showData.user,
      //   order: showOrder,
      //   admin: showData.admin,
      //   status: showData.status,
      // },
      data: showData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getTransactions = async (req, res) => {
  const { userId } = req;
  try {
    const dataOrderDetail = await orderDetail.findAll({
      where: {
        userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const records = await dataOrderDetail.map(function (result) {
      return result.dataValues.id;
    });

    console.log(records);

    const data = await transaction.findAll({
      include: {
        model: user,
        as: "user",
        attributes: ["id", "fullName", "email"],
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
    });

    const showDetailOrder = await orderDetail.findAll({
      where: {
        // id: JSON.parse(records),
        id: records,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: "successfully get all transaction",
      data: data,
      // data: {
      //   id: data.id,
      //   admin: data.admin,
      //   status: data.status,
      //   user: data.user,
      //   orderId: showDetailOrder,
      // },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getDetailTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await transaction.findOne({
      where: {
        id,
      },
      include: {
        model: user,
        as: "user",
        attributes: ["id", "fullName", "email"],
      },

      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
    });

    res.send({
      status: "success",
      message: "successfully get detail transaction",
      data: {
        transaction: data,
        // detail,
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

exports.editTransaction = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const data = await transaction.update(body, {
      where: {
        id,
      },
    });

    const showData = await transaction.findOne({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "successfully update data",
      data: showData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteData = await transaction.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "successfully delete data",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getUserTransaction = async (req, res) => {
  const { id } = req.user;

  try {
    const data = await transaction.findOne({
      where: {
        userId: id,
      },
    });

    res.send({
      status: "success",
      message: "successfully get all transaction by userId",
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
