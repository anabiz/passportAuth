
module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({mgs: "you don't have access to this page"});
  }
};

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin == "true") {
      next();
    } else {
      res.status(401).json({ mgs: "This is an admin rout. You don't have access to this page" });
    }
}
