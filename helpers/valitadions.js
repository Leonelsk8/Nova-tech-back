const User = require('../models/user.model');

const emailValidation = async (email) => {
  const isExist = await User.findOne({ email });
  if (isExist) {
    // si el usuario existe que me retorne un nuevo error
    throw new Error(`El email "${email}" ya se encuentra en uso.`);
  }
  return false;
};

module.exports = {
  emailValidation,
};
