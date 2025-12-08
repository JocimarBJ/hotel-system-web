const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ message: 'Token required' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'trocasenhaaqui');
    req.user = payload; // { id, role }
    next();
  } catch(err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
