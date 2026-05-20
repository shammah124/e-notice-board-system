const db = require("../config/db");

const uploadAdmission = (data, callback) => {
  const sql = `
        INSERT INTO admissions (title, file_name, uploaded_by)
        VALUES (?, ?, ?)
    `;

  db.query(sql, [data.title, data.file_name, data.uploaded_by], callback);
};

const getAllAdmissions = (callback) => {
  const sql = `
        SELECT admissions.*, admins.fullname
        FROM admissions
        LEFT JOIN admins
        ON admissions.uploaded_by = admins.id
        ORDER BY admissions.id ASC
    `;

  db.query(sql, callback);
};

const getSingleAdmission = (id, callback) => {
  const sql = `
        SELECT * FROM admissions
        WHERE id = ?
    `;

  db.query(sql, [id], callback);
};

const deleteAdmission = (id, callback) => {
  const sql = `
        DELETE FROM admissions
        WHERE id = ?
    `;

  db.query(sql, [id], callback);
};

module.exports = {
  uploadAdmission,
  getAllAdmissions,
  getSingleAdmission,
  deleteAdmission,
};
