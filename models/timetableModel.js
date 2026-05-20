const db = require("../config/db");

const uploadTimetable = (data, callback) => {
  const sql = `
        INSERT INTO timetables (title, file_name, uploaded_by)
        VALUES (?, ?, ?)
    `;

  db.query(sql, [data.title, data.file_name, data.uploaded_by], callback);
};

const getAllTimetables = (callback) => {
  const sql = `
        SELECT timetables.*, admins.fullname
        FROM timetables
        LEFT JOIN admins
        ON timetables.uploaded_by = admins.id
        ORDER BY timetables.id ASC
    `;

  db.query(sql, callback);
};

const getSingleTimetable = (id, callback) => {
  const sql = `
        SELECT * FROM timetables
        WHERE id = ?
    `;

  db.query(sql, [id], callback);
};

const deleteTimetable = (id, callback) => {
  const sql = `
        DELETE FROM timetables
        WHERE id = ?
    `;

  db.query(sql, [id], callback);
};

module.exports = {
  uploadTimetable,
  getAllTimetables,
  getSingleTimetable,
  deleteTimetable,
};
