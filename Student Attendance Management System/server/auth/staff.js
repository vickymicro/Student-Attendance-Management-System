

function Staffauth(req,res,next){
    if(!req.user.isStaff) {
      return res.status(403).send('Access Denide ')
    }
    next();
  }
  export default Staffauth;