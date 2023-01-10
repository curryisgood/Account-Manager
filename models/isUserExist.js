"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userChk = void 0;
const connection_1 = require("./connection");
function userChk(email) {
    if (!email) {
        return false;
    }
    const DBChk = 'select * from user where email = ?';
    return new Promise((resolve, reject) => {
        connection_1.connection.query(DBChk, email, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                if (rows.length >= 1) {
                    resolve(true);
                }
                resolve(false);
            }
        });
    });
}
exports.userChk = userChk;
