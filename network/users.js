const express = require("express")
const Users = require("../services/users")
const router = express.Router()
const userService = new Users()
const validationData = require('../utils/middlewares/validationData');
const { schemaIdUser, schemaUser } = require("../utils/Schemas/users");
router.get("/", (req,res,next)=>{
  userService.getUsers(req.query)
  .then(data=>{
    res.status(200).json(data)
  })
  .catch(error=>{next(error)})
})
router.get("/:id", validationData(schemaIdUser, "params"), (req,res,next)=>{
  userService.getUserId(req.params)
  .then(data=>{
    res.status(200).json(data)
  })
  .catch(error=>{next(error)})
})
router.post("/", validationData(schemaUser), (req,res,next)=>{
  const {body:user} = req
  userService.createUser({user})
  .then(id=>{
    res.status(200).json({
      message:"User created succesfully",
      id
    })
  })
  .catch(error=>{next(error)})
})
router.delete("/:id", validationData(schemaIdUser, "params"), (req,res,next)=>{
  userService.deleteUser(req.params)
  .then(id=>{
    res.status(200).json({
      message:"User deleted succesfully",
      id
    })
  })
  .catch(error=>{next(error)})
})
router.put("/:id", validationData(schemaIdUser, "params") ,validationData(schemaUser),  (req,res,next)=>{
  const {body:user, params:{id}} = req
  userService.updateUser({user, id})
  .then(id=>{
    res.status(200).json({
      message:"User deleted succesfully",
      id
    })
  })
  .catch(error=>{next(error)})
})



module.exports = router