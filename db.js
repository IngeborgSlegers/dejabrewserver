require('dotenv').config()

const Sequelize = require('sequelize')

const sequelize = new Sequelize(`postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/DejaBrew` , { 
    dialect: 'postgres', 
})

sequelize.authenticate()
    .then(() => console.log('prostgress db is connected'))
    .catch(err => console.log(err))

module.exports = sequelize