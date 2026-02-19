const bcrypt = require('bcrypt');
const db = require('./server/db');

const EMAIL = "fah.sitemgmt@outlook.it";
const PASSWORD = "Tonica1L&shi120";

bcrypt.hash(PASSWORD, 10).then(hash => {

  db.run(
    "INSERT INTO admins VALUES (NULL, ?, ?)",
    [EMAIL, hash],
    (err) => {

      if (err) {
        console.error("ERRORE:", err.message);
      } else {
        console.log("✅ ADMIN CREATO CON SUCCESSO");
      }

      process.exit();
    }
  );

});
