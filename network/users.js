const express = require("express")
const Users = require("../services/users")
const router = express.Router()
const userService = new Users()

router.get("/", (req,res,next)=>{
  userService.getUsers(req.query)
  .then(data=>{
    res.status(200).json(data)
  })
  .catch(error=>{next(error)})
})
router.get("/:id", (req,res,next)=>{
  userService.getUser(req.params)
  .then(data=>{
    res.status(200).json(data)
  })
  .catch(error=>{next(error)})
})
router.post("/", (req,res,next)=>{
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
router.delete("/:id", (req,res,next)=>{
  userService.deleteUser(req.params)
  .then(id=>{
    res.status(200).json({
      message:"User deleted succesfully",
      id
    })
  })
  .catch(error=>{next(error)})
})
router.put("/:id", (req,res,next)=>{
  const {body:user, params:{id}} = req
  console.log(id)
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