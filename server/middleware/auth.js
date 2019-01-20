const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];  // splitting for reason is that token in set something like this Bearer token_string
    const decodedToken = jwt.verify(token, 'secret_should_long_enough');
    req.userData = { email: decodedToken.email, user_id: decodedToken.userId };
    next();
  } catch (err) {
    res.status(401).json({
      message: "Authentication failed",
      error: err
    });
  }

}

//router.put('/:id',  checkAuth, postController.updatePost);
// add like this in router in which think user can access only if its login 