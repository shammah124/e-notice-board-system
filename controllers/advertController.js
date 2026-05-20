const advertModel = require("../models/advertModel");

const noticeModel = require("../models/noticeModel");

const fs = require("fs");

const path = require("path");

const showAdverts = (req, res) => {
  advertModel.getAllAdverts((err, results) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    res.render("admin/adverts", {
      adverts: results,
    });
  });
};

const uploadAdvert = (req, res) => {
  const data = {
    title: req.body.title,
    image_name: req.file.filename,
    uploaded_by: req.session.admin.id,
  };

  advertModel.uploadAdvert(data, (err) => {
    if (err) {
      console.log(err);
      return res.send("Upload Failed");
    }

    res.redirect("/adverts");
  });
};

const deleteAdvert = (req, res) => {
  const id = req.params.id;

  advertModel.getSingleAdvert(id, (err, advertData) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    const filePath = path.join(
      __dirname,
      "../public/uploads/adverts/",
      advertData[0].image_name,
    );

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }

      advertModel.deleteAdvert(id, (err) => {
        if (err) {
          console.log(err);
          return res.send("Delete Failed");
        }

        res.redirect("/adverts");
      });
    });
  });
};

const homepage = (req, res) => {
  advertModel.getAllAdverts((err, adverts) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    noticeModel.getAllNotices((err, notices) => {
      if (err) {
        console.log(err);
        return res.send("Database Error");
      }

      res.render("student/index", {
        adverts,
        notices,
      });
    });
  });
};

module.exports = {
  showAdverts,
  uploadAdvert,
  deleteAdvert,
  homepage,
};
