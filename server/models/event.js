export default (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Date Field Required',
        },
      },
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Time Field Required!'
        },
      },
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'UserId Field Required!',
        },
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
