const timetableModel = require("../models/timetableModel");

const fs = require("fs");

const path = require("path");

const showTimetables = (req, res) => {
  timetableModel.getAllTimetables((err, results) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    res.render("admin/timetables", {
      timetables: results,
    });
  });
};

const uploadTimetable = (req, res) => {
  const data = {
    title: req.body.title,
    file_name: req.file.filename,
    uploaded_by: req.session.admin.id,
  };

  timetableModel.uploadTimetable(data, (err) => {
    if (err) {
      console.log(err);
      return res.send("Upload Failed");
    }

    res.redirect("/timetables");
  });
};

const deleteTimetable = (req, res) => {
  const id = req.params.id;

  timetableModel.getSingleTimetable(id, (err, timetableData) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    const filePath = path.join(
      __dirname,
      "../public/uploads/timetables/",
      timetableData[0].file_name,
    );

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }

      timetableModel.deleteTimetable(id, (err) => {
        if (err) {
          console.log(err);
          return res.send("Delete Failed");
        }

        res.redirect("/timetables");
      });
    });
  });
};

const publicTimetables = (req, res) => {
  timetableModel.getAllTimetables((err, results) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    res.render("student/timetables", {
      timetables: results,
    });
  });
};

module.exports = {
  showTimetables,
  uploadTimetable,
  deleteTimetable,
  publicTimetables,
};
