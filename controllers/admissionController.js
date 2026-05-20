const admissionModel = require("../models/admissionModel");

const fs = require("fs");

const path = require("path");

const showAdmissions = (req, res) => {
  admissionModel.getAllAdmissions((err, results) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    res.render("admin/admissions", {
      admissions: results,
    });
  });
};

const uploadAdmission = (req, res) => {
  const data = {
    title: req.body.title,
    file_name: req.file.filename,
    uploaded_by: req.session.admin.id,
  };

  admissionModel.uploadAdmission(data, (err) => {
    if (err) {
      console.log(err);
      return res.send("Upload Failed");
    }

    res.redirect("/admissions");
  });
};

const deleteAdmission = (req, res) => {
  const id = req.params.id;

  admissionModel.getSingleAdmission(id, (err, admissionData) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    const filePath = path.join(
      __dirname,
      "../public/uploads/admissions/",
      admissionData[0].file_name,
    );

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }

      admissionModel.deleteAdmission(id, (err) => {
        if (err) {
          console.log(err);
          return res.send("Delete Failed");
        }

        res.redirect("/admissions");
      });
    });
  });
};

const publicAdmissions = (req, res) => {
  admissionModel.getAllAdmissions((err, results) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    res.render("student/admissions", {
      admissions: results,
    });
  });
};

module.exports = {
  showAdmissions,
  uploadAdmission,
  deleteAdmission,
  publicAdmissions,
};
