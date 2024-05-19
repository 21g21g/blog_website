const express=require("express")
const {createCommet,getCommets,getCommet,updateCommet,deleteCommet}=require("../controllers/commetController")
const verfyToken=require("../middleware/verfyUser")
const router=express.Router()

router.post("/createcommet", verfyToken,createCommet);
router.get("/getcommets",getCommets)
router.get("/getcommet/:id", verfyToken,getCommet);
router.put("/updatecommet/:id", verfyToken,updateCommet);
router.delete("/deletecommet", verfyToken,deleteCommet);

module.exports=router
