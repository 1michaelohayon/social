const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('messages', 'reply', {
      type: DataTypes.INTEGER,
      references: { model: 'messages', key: 'id' },
      allowNull: true,
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('messages', 'reply')
  },
}