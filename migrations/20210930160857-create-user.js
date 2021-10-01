'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false,
        
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false
      },
      auth_token:{
        type:DataTypes.STRING,
        allowNull:true
      },
      ref_token:{
        type:DataTypes.STRING,
        allowNull:true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('user');
  }
};