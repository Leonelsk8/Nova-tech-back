const {
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} = require('../services/user.services');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  try {
    const users = await obtenerTodosLosUsuarios();
    if (users.length === 0) {
      res.status(200).json('Aún no existen usuarios.');
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await obtenerUsuarioPorId(id);
    if (!user) {
      res.status(404).json('Usuario no encontrado.');
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userData = req.body;

    const salt = bcrypt.genSaltSync(10);
    userData.password = bcrypt.hashSync(userData.password, salt);

    await crearUsuario(userData);
    res.status(200).json('Se ha registrado con éxito.');
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const editedUser = await editarUsuario(id, userData);
    if (!editedUser) {
      res.status(404).json('Usuario no encontrado.');
      return;
    }
    res.status(200).json(editedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await eliminarUsuario(id);
    if (!deletedUser) {
      res.status(404).json('Usuario no encontrado.');
      return;
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const disableUser = async (req, res) => {
  try {
    const { id } = req.params;
    const disabled = { disabled: true };
    const disabledUser = await editarUsuario(id, disabled);
    if (!disabledUser) {
      res.status(404).json('Usuario no encontrado.');
      return;
    }
    const userDis = await obtenerUsuarioPorId(id);
    res.status(200).json(userDis);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  disableUser,
};
