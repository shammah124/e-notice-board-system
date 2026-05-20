const db = require("../config/db");

const createNotice = (data, callback) => {
  const sql = `
        INSERT INTO notices (title, content, posted_by)
        VALUES (?, ?, ?)
    `;

  db.query(sql, [data.title, data.content, data.posted_by], callback);
};

const getAllNotices = (callback) => {
  const sql = `
        SELECT notices.*, admins.fullname
        FROM notices
        LEFT JOIN admins
        ON notices.posted_by = admins.id
        ORDER BY notices.id ASC
    `;

  db.query(sql, callback);
};

const getSingleNotice = (id, callback) => {
  const sql = `
        SELECT * FROM notices
        WHERE id = ?
    `;

  db.query(sql, [id], callback);
};

const updateNotice = (id, data, callback) => {
  const sql = `
        UPDATE notices
        SET title = ?, content = ?
        WHERE id = ?
    `;

  db.query(sql, [data.title, data.content, id], callback);
};

const deleteNotice = (id, callback) => {
  const sql = `
        DELETE FROM notices
        WHERE id = ?
    `;

  db.query(sql, [id], callback);
};

const searchNotices = (keyword, callback) => {
  const sql = `
        SELECT notices.*, admins.fullname
        FROM notices
        LEFT JOIN admins
        ON notices.posted_by = admins.id
        WHERE notices.title LIKE ?
        ORDER BY notices.id DESC
    `;

  db.query(sql, [`%${keyword}%`], callback);
};

module.exports = {
  createNotice,
  getAllNotices,
  getSingleNotice,
  updateNotice,
  deleteNotice,
  searchNotices,
};
