const bcrypt = require("bcryptjs");
const adminModel = require("../models/adminModel");

const showLoginPage = (req, res) => {
  res.render("admin/login");
};

const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  adminModel.findAdminByEmail(email, (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    req.flash("error", "Admin not found");

    const admin = results[0];

    const isMatch = bcrypt.compareSync(password, admin.password);

    if (password === admin.password) {
      req.session.admin = {
        id: admin.id,
        fullname: admin.fullname,
        email: admin.email,
      };

      req.flash("success", "Login successful");

      res.redirect("/admin/dashboard");
    } else {
      req.flash("error", "Incorrect Password");

      res.redirect("/admin/login");
    }
  });
};

const dashboard = (req, res) => {
  res.render("admin/dashboard", {
    admin: req.session.admin,
  });
};

const logoutAdmin = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
};

module.exports = {
  showLoginPage,
  loginAdmin,
  dashboard,
  logoutAdmin,
};
