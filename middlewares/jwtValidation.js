const jwt= require('jsonwebtoken');

const jwtValidator=async (req,res,next)=>{
  try {
    const token= req.headers['access-token'];
    if(!token) return res.status(400).json('token inexistente');
    jwt.verify(token,process.env.SECRET,(error)=>{
    if(error) return res.status(401).json('token invalido');
    next()
})
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports={
  jwtValidator,
}