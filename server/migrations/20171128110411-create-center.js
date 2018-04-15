module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('centers', {
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
    facilities: {
      allowNull: false,
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    type: {
      allowNull: false,
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATEONLY
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATEONLY
    }
  }),
  down: queryInterface => queryInterface.dropTable('centers')
};
