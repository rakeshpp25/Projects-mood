import express from "express";
const router = express.Router();


router.get('/' ,(req,res) =>{
      res.json("this is product page fuck off")
})


export const product = router;