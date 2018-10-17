module.exports = (sequelize, DataTypes) => {
    const Tea = sequelize.define('tea', {
        teaName: {
            type: DataTypes.STRING,
            allowNull: false
          }, 
          teaType: {
            type: DataTypes.STRING,
            allowNull: false
          }, 
          teaDescription: {
            type: DataTypes.STRING,
            allowNull: false
          },
          temp: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          steepTime: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          teaPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          image: {
            type: DataTypes.BLOB,
            allowNull: true
          }
    })
    return Tea;
}