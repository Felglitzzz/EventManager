export default (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Date.now(),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'UserId Field Required!',
        },
      },
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
      validate: {
        notEmpty: {
          args: true,
          msg: 'CenterId Field Required!',
        },
      },
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
