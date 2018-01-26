const userModel = (sequelize, DataTypes) => {
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
          args: ['^[a-z]+$', 'i'],
          msg: 'Surname can only contain letters',
        },
        len: {
          args: [3, 30],
          msg: 'Surname should be more than two characters',
        }
      }
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
          args: ['^[a-z]+$', 'i'],
          msg: 'Firstname can only contain letters',
        },
        len: {
          args: [3, 30],
          msg: 'Firstname should be more than two characters',
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username taken, Please use another',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username is required',
        },
        is: [/([a-zA-Z0-9])+/]
      }
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
          msg: 'Email field cannot be empty',
        },
        isEmail: {
          msg: 'Invalid email, Enter a valid email, like so: you@mail.com'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required',
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  user.associate = (models) => {
    user.hasMany(models.event, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return user;
};

export default userModel;
