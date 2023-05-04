import jwt from 'jsonwebtoken';

const authStaff=async(req,res,next)=>{
    const token=req.headers.token;
     console.log("token"+token);
     if(!token) return res.status(401).send('Access Denide no token provide')
     if(token == undefined) return res.status(401).send('Access Denide no token provide')
     try {
         console.log(token);
        const decoded=jwt.verify(token,process.env.JWT_KEY);
        req.user = decoded
        req.user ={isStaff:req.user.isStaff}
        console.log(req.user);
        next();
    } catch (error) {
        res.send("invalid token")
    }
}

export default authStaff;