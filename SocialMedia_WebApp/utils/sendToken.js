const sendToken=(user,token,res)=>{
    const options={
        expires:new Date( Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    };
    res.status(200).cookie("token",token,options).send({
        success:true,
        user,
    })
};
module.exports=sendToken;