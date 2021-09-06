const { user } = require("../../models");

// import joi validation
const Joi = require("joi");
// import bcrypt
const bcrypt = require("bcrypt");
//import jsonwebtoken
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const body = req.body;
  const { name, password, email } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(6).alphanum().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().min(6).required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }
  try {
    const userExist = await user.findOne({
      where: {
        email: body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (userExist) {
      return res.status(409).send({
        status: "failed",
        message: "Email already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await user.create({
      fullName: name,
      email,
      password: hashedPassword,
      logAs: "user",
    });

    const token = jwt.sign({ id: newUser.id }, process.env.Secret_Key);

    res.status(201).send({
      status: "success",
      message: "successfully create new user",
      data: {
        user: {
          fullName: newUser.fullName,
          token,
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

exports.login = async (req, res) => {
  const body = req.body;

  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const validUser = await user.findOne({
      where: {
        email: body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!validUser) {
      return res.status(400).send({
        status: "failed",
        message: "username and password do not match",
      });
    }

    const isValid = await bcrypt.compare(body.password, validUser.password);

    const token = jwt.sign({ id: validUser.id }, process.env.Secret_Key);

    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "user and password do not match",
      });
    }

    res.send({
      status: "success",
      message: "successfully login",
      data: {
        user: {
          fullName: validUser.fullName,
          email: validUser.email,
          token,
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
