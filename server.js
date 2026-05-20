require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const app = express();

const adminRoutes = require("./routes/adminRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const resultRoutes = require("./routes/resultRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const advertRoutes = require("./routes/advertRoutes");
const flash = require("connect-flash");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "enoticeboardsecret",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");

  res.locals.error = req.flash("error");

  next();
});

app.set("view engine", "ejs");

app.use("/admin", adminRoutes);
app.use("/notices", noticeRoutes);
app.use("/results", resultRoutes);
app.use("/timetables", timetableRoutes);
app.use("/admissions", admissionRoutes);
app.use("/adverts", advertRoutes);

app.get("/", (req, res) => {
  res.redirect("/adverts/public/home");
});
const PORT = process.env.PORT || 3000;
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
