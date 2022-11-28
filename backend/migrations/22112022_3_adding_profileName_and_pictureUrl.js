const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'picture_url', {
      type: DataTypes.STRING,
      allowNull: true,
    }),
    await queryInterface.addColumn('users', 'profile_name', {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'picture_url')
    await queryInterface.removeColumn('users', 'profile_name')

  },
}