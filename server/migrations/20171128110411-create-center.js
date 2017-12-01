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
        unique: true,       
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('centers');
  }
};