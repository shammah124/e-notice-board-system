const noticeModel = require("../models/noticeModel");

const showNotices = (req, res) => {
  noticeModel.getAllNotices((err, results) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    res.render("admin/notices", {
      notices: results,
    });
  });
};

const createNotice = (req, res) => {
  const data = {
    title: req.body.title,
    content: req.body.content,
    posted_by: req.session.admin.id,
  };

  noticeModel.createNotice(data, (err) => {
    if (err) {
      console.log(err);
      return res.send("Failed to create notice");
    }

    res.redirect("/notices");
  });
};

const editNoticePage = (req, res) => {
  const id = req.params.id;

  noticeModel.getSingleNotice(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    res.render("admin/editNotice", {
      notice: results[0],
    });
  });
};

const updateNotice = (req, res) => {
  const id = req.params.id;

  const data = {
    title: req.body.title,
    content: req.body.content,
  };

  noticeModel.updateNotice(id, data, (err) => {
    if (err) {
      console.log(err);
      return res.send("Update Failed");
    }

    res.redirect("/notices");
  });
};

const deleteNotice = (req, res) => {
  const id = req.params.id;

  noticeModel.deleteNotice(id, (err) => {
    if (err) {
      console.log(err);
      return res.send("Delete Failed");
    }

    res.redirect("/notices");
  });
};

const publicNotices = (req, res) => {
  noticeModel.getAllNotices((err, results) => {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    res.render("student/notices", {
      notices: results,
    });
  });
};

const searchNotices = (req, res) => {
  const keyword = req.query.keyword;

  noticeModel.searchNotices(keyword, (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Search Failed");
    }

    res.render("student/notices", {
      notices: results,
    });
  });
};

module.exports = {
  showNotices,
  createNotice,
  editNoticePage,
  updateNotice,
  deleteNotice,
  publicNotices,
  searchNotices,
};
