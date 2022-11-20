const { DataTypes } = require("sequelize")
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('liked_messages', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        primaryKey: true
    
      },
      message_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'messages', key: 'id' },
        primaryKey: true,
    
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    })

  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('liked_messages')
  },
}