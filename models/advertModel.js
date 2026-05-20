const db = require("../config/db");

const uploadAdvert = (data, callback) => {
  const sql = `
        INSERT INTO adverts (title, image_name, uploaded_by)
        VALUES (?, ?, ?)
    `;

  db.query(sql, [data.title, data.image_name, data.uploaded_by], callback);
};

const getAllAdverts = (callback) => {
  const sql = `
        SELECT adverts.*, admins.fullname
        FROM adverts
        LEFT JOIN admins
        ON adverts.uploaded_by = admins.id
        ORDER BY adverts.id ASC
    `;

  db.query(sql, callback);
};

const getSingleAdvert = (id, callback) => {
  const sql = `
        SELECT * FROM adverts
        WHERE id = ?
    `;

  db.query(sql, [id], callback);
};

const deleteAdvert = (id, callback) => {
  const sql = `
        DELETE FROM adverts
        WHERE id = ?
    `;

  db.query(sql, [id], callback);
};

module.exports = {
  uploadAdvert,
  getAllAdverts,
  getSingleAdvert,
  deleteAdvert,
};
