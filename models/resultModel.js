const db = require("../config/db");

const uploadResult = (data, callback) => {
  const sql = `
        INSERT INTO results (title, file_name, uploaded_by)
        VALUES (?, ?, ?)
    `;

  db.query(sql, [data.title, data.file_name, data.uploaded_by], callback);
};

const getAllResults = (callback) => {
  const sql = `
        SELECT results.*, admins.fullname
        FROM results
        LEFT JOIN admins
        ON results.uploaded_by = admins.id
        ORDER BY results.id ASC
    `;

  db.query(sql, callback);
};

const getSingleResult = (id, callback) => {
  const sql = `
        SELECT * FROM results
        WHERE id = ?
    `;

  db.query(sql, [id], callback);
};

const deleteResult = (id, callback) => {
  const sql = `
        DELETE FROM results
        WHERE id = ?
    `;

  db.query(sql, [id], callback);
};

module.exports = {
  uploadResult,
  getAllResults,
  getSingleResult,
  deleteResult,
};
