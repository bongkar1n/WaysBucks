const { user } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    const usersData = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password", "address", "logAs"],
      },
    });

    res.send({
      status: "success",
      message: "successfully get all users",
      data: {
        users: usersData,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await user.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "already delete 1 user",
      data: {
        id,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
