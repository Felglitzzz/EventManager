import jwt from 'jsonwebtoken';
/**
 * @returns  { object } userDetails
 */
const getUserFromToken = () => {
  const userToken = localStorage.getItem('x-access-token');
  const decoded = jwt.decode(userToken);
  console.log(decoded);
  return {
    userId: decoded.id,
    userRole: decoded.role,
  };
};

export default getUserFromToken;

