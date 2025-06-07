const { ApplicationError, ApplicationSuccess, MySQLDB_Helper, logMessage } = require('node_helper');


const login_Controller = async (req, res, next) => {
    const { userName, pass } = req.body;
    const sql = `SELECT userId, userMail, userName, pass FROM users WHERE userName = ? AND pass = ?`;
    const result = await MySQLDB_Helper.executeQuery(sql, [userName, pass]);
    if (!result) {
        throw new ApplicationError({ message: "login detail incorrect", location: __locationObject, errorObject: new Error("login details is wrong") })
    } else {
        res.json(ApplicationSuccess.getSuccessObject(result, "sucess"));
    }
};

const createUser_controller = async (req, res, next) => {

    let { userName, userMail, pass } = req.body;

    const sql = `INSERT INTO users (userName, userMAil, pass) VALUES (?,?,?) `
    const result = await MySQLDB_Helper.executeQuery(sql, [userName, userMail, pass])

    if (!result) {
        throw new ApplicationError({ message: "User data is not in proper format", location: __locationObject, errorObject: Error("user data is not proper error from mysql") });
    } else {
        res.json(
            ApplicationSuccess.getSuccessObject(result, "Sucess")
        )
    }

}

module.exports = {
    login_Controller,
    createUser_controller
}