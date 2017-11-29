export default (sequelize, DataTypes) => {
  const center = sequelize.define('center', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'A center with this name exist'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name Field Required!',
        },
        is: {
          args: /([a-zA-Z0-9])+/,
          msg: 'Name can contain only alphabets and numbers',
        },
        len: {
          args: [3, 20],
          msg: 'Name should be longer than 3 words and less than 40 words',
        },
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Location Field Required!',
        },
        is: {
          args: /([a-zA-Z0-9])+/,
          msg: 'Location can contain alphabets and numbers',
        },
        len: {
          args: [3, 20],
          msg: 'Name should be longer than 3 words and less than 40 words',
        },
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: {
        args: true,
        msg: 'Capacity Field Required!',
      },
      isInt: {
        args: true,
        msg: 'Capacity should contain only Numbers',
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: {
        args: true,
        msg: 'Price Field Required!',
      },
      isInt: {
        args: true,
        msg: 'Price should contain only Numbers',
      },
    },
    facility: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateBooked: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Date.now(),
    },
  });

  center.associate = (models) => {
    center.hasMany(models.event, {
      foreignKey: 'centerId',
    });
  };
  return center;
};
