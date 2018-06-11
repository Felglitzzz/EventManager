import jwt from 'jsonwebtoken';
/**
 * @description return user information
 *
 * @returns {object} decoded user information
 */
const getUserFromToken = () => {
  const token = localStorage.getItem('x-access-token');

  if (token) {
    const decoded = jwt.decode(token);
    return {
      userId: decoded.id,
      isAdmin: decoded.isAdmin,
      username: decoded.username,
      token
    };
  }
  return { error: 'No Token Provided' };
};

export default getUserFromToken;
