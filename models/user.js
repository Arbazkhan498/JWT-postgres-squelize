'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON(){
      return{...this.get(),id:undefined}
    }
  };
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    auth_token:{
      type:DataTypes.STRING,
      allowNull:true
    },
    ref_token:{
      type:DataTypes.STRING,
      allowNull:true
    }
  }, {
    sequelize,
    tableName:'user',
    modelName: 'User',
  });
  return User;
};