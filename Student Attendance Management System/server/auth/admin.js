

function Adminauth(req,res,next){
  if(!req.user.isAdmin) {
    return res.status(403).send('Access Denide ')
  }
  next();
}
export default Adminauth;