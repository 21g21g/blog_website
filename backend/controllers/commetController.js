const errorHandler = require("../middleware/error")
const Commet=require("../models/commetmodel/CommetModel")


const createCommet=async(req,res,next)=>{
    const {commets,postId,userId}=req.body
    try{
        if(userId!==req.user.id){
            next(errorHandler(400,"you are unauthorized"))

        }
        else{
            const newCommets = await Commet.create({
              commets,
              postId,
              userId,
            });
            res.status(200).json(newCommets)
        }

    }catch(error){
        next(error)
    }


}

const getCommets=(req,res)=>{

}

const getCommet=(req,res)=>{

}
const updateCommet=(req,res)=>{

}
const deleteCommet=(req,res)=>{

}


module.exports={createCommet,getCommets,getCommet,updateCommet,deleteCommet}