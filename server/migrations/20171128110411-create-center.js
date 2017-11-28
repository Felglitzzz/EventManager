module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('centers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,        
        type: Sequelize.STRING
      },
      location: {
        allowNull: false,        
        type: Sequelize.STRING
      },
      capacity: {
        allowNull: false,        
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,        
        type: Sequelize.INTEGER
      },
      facility: {
        allowNull: false,        
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,        
        type: Sequelize.STRING
      },
      dateBooked: {
        allowNull: false,        
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('centers');
  }
};