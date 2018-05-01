import jwt from 'jsonwebtoken';

const generateToken = (id, username, isAdmin) =>
  jwt.sign(
    {
      id,
      username,
      isAdmin
    },
    process.env.SECRET
  );

const tokenData = {
  adminToken: () => generateToken(1, 'admin', true),
  userToken: () => generateToken(2, 'user', false),
  invalidAdminToken:
    'eyJhbGciOiJIUzI1NtttiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWtttF0IjoxNTIzNTkwNDcxLCJleHAiOjE1MjM2NzY4NzF9.cBwY15Dttjb_PjF370vWOaN4-zZlG5zUPmZBIuhIn_QcY',
  invalidUserToken:
    'eyJhbGciOiJddIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJyYW5kb21Vc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUyMzghdhcyODA5NywiZXhwIjoxNTIzODE0NDk3fQ.H9CJo_lXs_sR-tgZOFlMsm5zW0hduAD5zoX1GgxRhybQh4'
};

export default tokenData;
