

module.exports = (sequelize, DataTypes) => {
  const center = sequelize.define('center', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    facilities: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  center.associate = (models) => {
    center.hasMany(models.event, {
      foreignKey: 'centerId',
    });
  };
  return center;
};
