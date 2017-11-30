export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Surname cannot be empty',
        },
        is: {
          args: /([A-Za-z])+/,
          msg: 'Surname can only contain letters',
        },
        len: {
          args: [3, 100],
          msg: 'Surname should be longer than two characters',
        },
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Firstname cannot be empty',
        },
        is: {
          args: /([A-Za-z])+/,
          msg: 'Firstname can only contain letters',
        },
        len: {
          args: [3, 100],
          msg: 'Firstname should be longer than two characters',
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username taken, use another',
      },
      validate: {
        is: {
          args: /([a-zA-Z0-9])+/,
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'A user with this email exists',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty',
        },
        isEmail: {
          args: true,
          msg: 'Field must contain a valid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required',
        },
        len: {
          args: [8],
          msg: 'Password should not be less than 8 characters',
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  // hooks: {
  //   beforeCreate
  // }
  user.associate = (models) => {
    user.hasMany(models.event, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return user;
};
