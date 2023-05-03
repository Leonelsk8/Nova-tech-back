const User = require('../models/user.model');

const obtenerTodosLosUsuarios = async () => {
  return await User.find({});
};

const obtenerUsuarioPorId = async (id) => {
  return await User.findById(id);
};

const crearUsuario = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

const editarUsuario = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData);
};

const eliminarUsuario = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
};
