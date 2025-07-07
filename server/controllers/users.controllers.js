const { ApplicationError, ApplicationSuccess, MySQLDB_Helper, logMessage, Email_Helper } = require('node_helper');
const { generateOTP, generateOtpValues } = require('../helper/everywherefunction')

const login_Controller = async (req, res, next) => {
    try {
        const { userName, pass } = req.body;
        if (!userName || !pass) {
            throw new ApplicationError({message:"I did't get whole data to verfy the login", location: __locationObject })
        }else{
        const sql = `   SELECT userId, userMail, userName, pass, isActive, isDelete 
                        FROM users 
                        WHERE userName = ? 
                        AND pass = ?`;
        const result = await MySQLDB_Helper.executeQuery(sql, [userName, pass]);
        if (result.length === 0) {
            throw new ApplicationError({ location: __locationObject, errorObject: new Error("login details is incorrect") })
        } else if (result[0].isActive === 1) {
            res.json(ApplicationSuccess.getSuccessObject(result, "sucess "));
        } else if (result[0].isDelete === 1) {
            throw new ApplicationError({message: "Please Contact your Admin Account is Deactivated", location: __locationObject })
        } else {
            throw new ApplicationError({ message: "Your Account is not Active check your mail for otp and try to verify your Account first", location: __locationObject })

        }}
    }
    catch (err) {
        throw new ApplicationError({ location: __locationObject, errorObject: new Error(err) })
    }
};


const createUser_controller = async (req, res, next) => {
    try {
        let { userName, userMail, pass } = req.body;
        if (!userName || !userMail || !pass) {
            throw new ApplicationError({ message: "I did't get whole data to create the a user", location: __locationObject })
        }else{
        let otp, sql, result;

        otp = generateOTP({ type: 'numeric', length: 4, allowRepetition: false })

        const checkSql = `  SELECT userId, userMail, userName, isActive 
                            FROM users 
                            WHERE userMail = ? `
        let mail = await MySQLDB_Helper.executeQuery(checkSql, [userMail])

        if (mail.length === 0) {
            mail.push({ userMail: "", isActive: null })
        }
        if (mail[0].userMail === userMail && mail[0].isActive === 1) {
            throw new ApplicationError({message: `Account with a User Nme: ${mail[0].userName} is already Created using this mailId `, location: __locationObject })
        } else if (mail[0].isActive === 0) {
            sql = ` UPDATE users 
                    SET otp = ? 
                    WHERE userId = ?`
            result = await MySQLDB_Helper.executeQuery(sql, [otp, mail[0].userId])
            result.insertId = mail[0].userId
        } else {

            sql = ` INSERT INTO users (userName, userMail, pass, otp) 
                    VALUES (?,?,?,?) `
            result = await MySQLDB_Helper.executeQuery(sql, [userName, userMail, pass, otp])
        }
        if (!result) {
            throw new ApplicationError({message: "User data is not proper error from mysql", location: __locationObject });
        } else {
            const valuesObject = generateOtpValues(otp)
            const obj = {
                [userMail]: {
                    userName
                }
            }
            const success = () => {
                const userId = mail[0].userId;
                logMessage({level:"INFO", message:` OTP for user ${userId} will expire in 5 minutes.`});

                // This will run only ONCE after a 5-minute delay.
                setTimeout(async () => {
                    try {
                        console.log(`[${new Date().toLocaleTimeString()}] Expiring OTP for user ${userId}.`);
                        const updateSql = `UPDATE users SET otp = NULL WHERE userId = ?`;
                        await MySQLDB_Helper.executeQuery(updateSql, [userId]);
                    } catch (error) {
                        console.error("Failed to expire OTP:", error);
                    }
                }, 300000); // 5 minutes
                res.json(
                    ApplicationSuccess.getSuccessObject(result, "Check your Mail for otp")

                )
            }
            const error = (err) => {
                throw new ApplicationError({ message: "Error while Mail Sending", location: __locationObject, errorObject: new Error(err) })
            }


            // success()
            await Email_Helper.sendEmailToIndividualUsers(
                "test",
                "login",
                valuesObject,
                obj,
                ["vsherin4@gmail.com"],
                { successCallback: success, failureCallback: error }
            )
        }}
    } catch (err) {

        throw new ApplicationError({ location: __locationObject, errorObject: new Error(err) })
    }

}
const verifyOtp_controller = async (req, res, next) => {
    try {
        const { otp, userId } = req.body
        if (!otp || !userId) {
            throw new ApplicationError({message:"I did't get whole data to verfy the otp", location: __locationObject })
        }else{
        const sql = `   SELECT otp 
                        FROM users 
                        WHERE userId = ?`
        const result = await MySQLDB_Helper.executeQuery(sql, [userId])
        if (result[0].otp === otp) {
            const updateSql = ` UPDATE users 
                                SET isActive =? 
                                WHERE userId = ?`;
            await MySQLDB_Helper.executeQuery(updateSql, [true, userId])
            res.json(ApplicationSuccess.getSuccessObject(result, "User verifyed "))
        } else {
            throw new ApplicationError({message: "OTP is wrong check your mail again", location: __locationObject })
        }}
    } catch (err) {
        throw new ApplicationError({ location: __locationObject, errorObject: new Error(err) })
    }
}

const forgetPassword_controller = async (req, res, next) => {

    try {
        const { userName } = req.query;
        if (!userName) {
            throw new ApplicationError({message: "I did't get whole data to look for your password", location: __locationObject })
        }else{
    
        const sql = `   SELECT pass 
                        FROM users 
                        WHERE userName = ?`;
        const result = await MySQLDB_Helper.executeQuery(sql, [userName]);
        if (result.length === 0) {
            throw new ApplicationError({message: "I can't find your account create a new account ", location: __locationObject })

        } else {
            res.json(ApplicationSuccess.getSuccessObject(result[0], "This is your password"))
        }}
    
    } catch (err) {
        throw new ApplicationError({ location: __locationObject, errorObject: new Error(err) })
    }
}

const reSendOtp_controller = async (req, res, next) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            throw new ApplicationError({message: "I did't get whole data to resend Otp", location: __locationObject })
        } else {

            const otp = generateOTP({ type: 'numeric', length: 4, allowRepetition: false })
            const sql = `   UPDATE users
                            SET otp = ?
                            WHERE userId = ?`;
            await MySQLDB_Helper.executeQuery(sql, [otp, userId]);
            setTimeout(async () => {
                const updateSql = ` UPDATE users 
                                    SET otp = ? 
                                    WHERE userId = ?`
                await MySQLDB_Helper.executeQuery(updateSql, [0, userId])
                return;
            }, 300000);
            res.json(ApplicationSuccess.getSuccessObject(otp, "This is your stuff please you this atlest this time or else someone else will play with it"))
        }
    } catch (err) {
        throw new ApplicationError({ location: __locationObject, errorObject: new Error(err) })
    }
}
module.exports = {
    login_Controller,
    createUser_controller,
    verifyOtp_controller,
    forgetPassword_controller,
    reSendOtp_controller
}