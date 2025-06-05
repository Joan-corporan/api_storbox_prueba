const jwt = require("jsonwebtoken");



const checkAdmin=async(req,res, next)=>{
try {
    const token = req.headers.authorization?.split(" ")[1];


if (!token) {
    return res.status(401).json({ message: "No se proporcionó token" });
}

const decodificado=jwt.verify(token, process.env.JWT_SECRET)
console.log("Token decodificado:", decodificado)
const isAdmin=decodificado.admin
console.log("decodificado:..............",isAdmin)
if(isAdmin){
   next()
}else{
   return res.status(403).json({
        message:"Acceso denegado: necesitas permisos de administrador"
    })
}
} catch (error) {
    console.log(error.message)
   return res.status(500).json({
        message: "Hubo un error al verificar el administrador",
        detail: error.message
    })
}







}
module.exports=checkAdmin
