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
