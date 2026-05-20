const resultModel = require("../models/resultModel");

const fs = require("fs");

const path = require("path");

const showResults = (req, res) => {
  resultModel.getAllResults((err, results) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    res.render("admin/results", {
      results,
    });
  });
};

const uploadResult = (req, res) => {
  const data = {
    title: req.body.title,
    file_name: req.file.filename,
    uploaded_by: req.session.admin.id,
  };

  resultModel.uploadResult(data, (err) => {
    if (err) {
      console.log(err);
      return res.send("Upload Failed");
    }

    res.redirect("/results");
  });
};

const deleteResult = (req, res) => {
  const id = req.params.id;

  resultModel.getSingleResult(id, (err, resultData) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    const filePath = path.join(
      __dirname,
      "../public/uploads/results/",
      resultData[0].file_name,
    );

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }

      resultModel.deleteResult(id, (err) => {
        if (err) {
          console.log(err);
          return res.send("Delete Failed");
        }

        res.redirect("/results");
      });
    });
  });
};

const publicResults = (req, res) => {
  resultModel.getAllResults((err, results) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    res.render("student/results", {
      results,
    });
  });
};

module.exports = {
  showResults,
  uploadResult,
  deleteResult,
  publicResults,
};
