const config = require("../../config");

const users = [
  {
    email: 'root2021@gmail.com',
    name: 'ROOT',
    password: config.defaultAdminPassword,
  },
  {
    email: 'jose2021@gmail.com',
    name: 'Jose Maria',
    password: config.defaultUserPassword
  },
  {
    email: 'maria2021@gmail.com',
    name: 'Maria Andrade',
    password: config.defaultUserPassword
  },
  {
    email: 'Veronica2021@gmail.com',
    name: 'Veronica Altamirano',
    password: config.defaultUserPassword
  },
  {
    email: 'Fernanda2021@gmail.com',
    name: 'Fernanda Moreta',
    password: config.defaultAdminPassword
  }
];
module.exports = users

