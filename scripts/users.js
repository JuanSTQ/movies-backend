/* DEBUG=app:* node scripts/users.js  */
const { default: axios } = require("axios");
const users = require("../utils/Mocks/users");

const newArr = users.map(async user=>{
  const id = await axios({
    url:"http://localhost:3000/auth/sign-up",
    method: "post",
    data: user
  })
  return id
})
console.log(newArr)