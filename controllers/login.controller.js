
const User= require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

const login= async (req,res)=>{
  const {email,password}=req.body;
  try {
    const searchEmail=await User.findOne({email});
    if(!searchEmail) return res.status(404).json('el email o contraseña son incorrectos');
    const passwordMatch= await bcrypt.compareSync(password,searchEmail.password);
    if(!passwordMatch)return res.status(404).json('el email o contraseña son incorrectos');
// una vez que pasa la logica para asegurar la existencia del usuario uso jwt

    const payload={
      id: searchEmail._id,
      email: searchEmail.email,
      roleAdmin: searchEmail.roleAdmin,
    }

    const token= jwt.sign(payload,process.env.SECRET,{
      expiresIn:1200,
    });

    res.status(200).json({msg:'Login exitoso',token});
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports={
  login
};