const { DataTypes } = require("sequelize")
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('followers', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        primaryKey: true
    
      },
      follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        primaryKey: true
    
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    })

  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('`followe`rs')
  },
}