export default (sequelize, DataTypes) => {
  const center = sequelize.define('center', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'A center with this name exist',
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
          args: [3],
          msg: 'Name should be longer than 3 characters',
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
          args: [3],
          msg: 'Name should be longer than 3 words',
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
        msg: 'Capacity should contain only numbers',
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
    facilities: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description Field Required!',
        },
        is: {
          args: /([a-zA-Z0-9])+/,
          msg: 'Name can contain only alphabets and numbers',
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image field is required'
        },
        is: {
          args: /(\w)/i,
          msg: 'Image url can only contain strings'
        }
      }
    },
  });

  center.associate = (models) => {
    center.hasMany(models.event, {
      foreignKey: 'centerId',
    });
  };
  return center;
};
