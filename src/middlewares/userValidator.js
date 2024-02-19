export const userValidator = (req, res, next) => {
  if (
    req.body.first_name === undefined ||
    typeof req.body.first_name !== 'string' ||
    req.body.last_name === undefined ||
    typeof req.body.last_name !== 'string' ||
    req.body.email === undefined ||
    typeof req.body.email !== 'string' ||
    req.body.age === undefined ||
    typeof req.body.age !== 'number' ||
    req.body.password === undefined ||
    typeof req.body.password !== 'string'
  )
    res.status(400).json({ msg: 'Invalid body' });
  else next();
};

export default userValidator;
