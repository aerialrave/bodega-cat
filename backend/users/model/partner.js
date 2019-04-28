const bcrypt = require('bcrypt');
// const db = require('../../testConDb');
const { Partner } = require('../models.js');

// Search consumers by email
const findUser = async (email) => {
  try {
    const user = await Partner.findOne({
      where: {
        email
      }
    });
    return user;
  } catch (err) {
    throw (err);
  }
};

// Save user's info after registration
const create = async (user) => {
  try {
    // hash user's clear text password
    const digest = bcrypt.hashSync(user.password, 11);
    const newUser = await Partner.create({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password_digest: digest,
      address: user.address,
      phone_number: user.phone_number
    });
    return newUser;
  } catch (err) {
    throw (err);
  }
};

// Verify user info
const login = async (user) => {
  try {
    // user lookup
    const userInfo = await findUser(user.email);
    // verify and compare inputted password with hashed password from database
    const authed = bcrypt.compareSync(user.password, userInfo.password_digest);
    // throw a fit if verification phase fails
    if (!authed) { throw new Error('Invalid Credentials'); }
    delete userInfo.password_digest;
    return userInfo;
  } catch (err) {
    throw (err);
  }
};

// Look up based on user's id
const findID = async (id) => {
  try {
    const user = await Partner.findByPk(id);
    return user;
  } catch (err) {
    throw (err);
  }
};

module.exports = {
  findUser,
  create,
  login,
  findID
}
