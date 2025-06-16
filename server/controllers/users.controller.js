const { ApplicationError, ApplicationSuccess, MySQLDB_Helper, logMessage, Email_Helper } = require('node_helper');


const login_Controller = async (req, res, next) => {
    const { userName, pass } = req.body;
    const sql = `SELECT userId, userMail, userName, pass FROM users WHERE userName = ? AND pass = ?`;
    const result = await MySQLDB_Helper.executeQuery(sql, [userName, pass]);
    console.log(result.lenght === 0);

    if (result.length === 0) {
        throw new ApplicationError({ message: "login detail incorrect", location: __locationObject, errorObject: new Error("login details is wrong") })
    } else {
        res.json(ApplicationSuccess.getSuccessObject(result, "sucess"));
    }
};

const createUser_controller = async (req, res, next) => {

    let { userName, userMail, pass } = req.body;
    function generateOTP() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }
    const otp = generateOTP()


    const sql = `INSERT INTO users (userName, userMAil, pass, otp) VALUES (?,?,?,?) `
    const result = await MySQLDB_Helper.executeQuery(sql, [userName, userMail, pass, otp])

    if (!result) {
        throw new ApplicationError({ message: "User data is not in proper format", location: __locationObject, errorObject: Error("user data is not proper error from mysql") });
    } else {
        const success = () => {
            res.json(
                ApplicationSuccess.getSuccessObject(result, "send mail success")
            )
        }
        const error = () => {
            res.json(
                ApplicationSuccess.getSuccessObject(result, "error")
            )
        }
        const obj = {
            [userMail]: {
                userName,
                otp

            }
        }
        // success()
        await Email_Helper.sendEmailToIndividualUsers("test", "SuccessMessage", {}, obj, ["vsherin4@gmail.com"], { successCallback: success, failuerCallback: error })
    }

}

const verifyOtp_controller = async (req, res, next) => {
    const { otp, userId } = req.body
    const sql = `SELECT otp FROM users WHERE userId = ?`
    const result = await MySQLDB_Helper.executeQuery(sql, [userId])
    if (result[0].otp === otp) {
        res.json(ApplicationSuccess.getSuccessObject(result, "user verify "))
    } else {
        throw new ApplicationError({ message: "OTP wrong are you sure is that your own thing", location: __locationObject, errorObject: Error("not yours") })
    }

}
module.exports = {
    login_Controller,
    createUser_controller,
    verifyOtp_controller
}