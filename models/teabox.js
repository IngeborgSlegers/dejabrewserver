module.exports = function (sequelize, DataTypes) {
    return sequelize.define('teabox', {
        teaId: {
            type: DataTypes.INTEGER,
            allowNull: false
          }, 
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false
          } 
    })
}