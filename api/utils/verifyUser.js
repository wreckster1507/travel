import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, '88053838289f6ca6edef965acbf60399cc407345efbcac0ce11078eb73775e54', (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user;
    next();
  });
};
