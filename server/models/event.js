module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateBooked: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    center: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'event',
        Key: 'id',
        as: 'userId',
      },
    },
    centerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'event',
        Key: 'id',
        as: 'centerId',
      },
    },
  });
  event.associate = (models) => {
    event.belongsTo(models.center, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE',
    });

    event.belongsTo(models.user, {
      foreignKey: 'userId',      
    });
  };
  return event;
};
