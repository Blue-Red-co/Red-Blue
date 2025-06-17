const { ApplicationError, ApplicationSuccess, MySQLDB_Helper, logMessage, Email_Helper } = require('node_helper');


const login_Controller = async (req, res, next) => {
    const { userName, pass } = req.body;
    const sql = `SELECT userId, userMail, userName, pass, isActive, isDelete FROM users WHERE userName = ? AND pass = ?`;
    const result = await MySQLDB_Helper.executeQuery(sql, [userName, pass]);
    console.log(result.lenght === 0);

    if (result.length === 0) {
        throw new ApplicationError({ message: "login detail incorrect", location: __locationObject, errorObject: new Error("login details is wrong") })
    } else if (result[0].isActive == true) {
        res.json(ApplicationSuccess.getSuccessObject(result, "sucess "));
    } else if (result[0].isDelete === true) {
        throw new ApplicationError({ message: "Please Contact your Admin Account is Deactivated" })
    } else {
        throw new ApplicationError({ message: " Are you sure you actually fits here please check your stuff is there in your mail  " })

    }
};


const createUser_controller = async (req, res, next) => {

    let { userName, userMail, pass } = req.body;
    let otp, sql, result;
    function generateOTP() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }
    otp = generateOTP()

    const checkSql = 'SELECT userId, userMail, userName, isActive FROM users WHERE userMail = ? '
    let mail = await MySQLDB_Helper.executeQuery(checkSql, [userMail])

    if (mail.length === 0) {
        mail[0] = { userMail: "" }
    }
    if (mail[0].userMail === userMail && mail[0].isActive === 1) {
        throw new ApplicationError({ message: `User ${mail[0].userName} is already useing your stuff so please go and check who is cheating `, location: __locationObject })
    } else if (mail[0].isActive === 0) {
        sql = `UPDATE users SET otp = ? WHERE userId = ?`
        result = await MySQLDB_Helper.executeQuery(sql, [otp, mail[0].userId])
        result.insertId = mail[0].userId
    } else {

        sql = `INSERT INTO users (userName, userMAil, pass, otp) VALUES (?,?,?,?) `
        result = await MySQLDB_Helper.executeQuery(sql, [userName, userMail, pass, otp])
    }
    if (!result) {
        throw new ApplicationError({ message: "User data is not in proper format", location: __locationObject, errorObject: Error("user data is not proper error from mysql") });
    } else {
        const success = () => {
            setInterval(async() => {
            const updateSql = `UPDATE users SET otp = ? WHERE userId = ?`
            await MySQLDB_Helper.executeQuery(updateSql,[0,mail[0].userId])
            return;
        }, 60000);
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
        const updateSql = 'UPDATE users SET isActive =? WHERE userId = ?';
        await MySQLDB_Helper.executeQuery(updateSql, [true, userId])
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