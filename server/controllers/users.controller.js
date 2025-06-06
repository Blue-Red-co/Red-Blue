const {ApplicationError, ApplicationSuccess, MySQLDB_Helper, logMessage} =require('node_helper');
const loginController = async (req, res, next) => {
const { userName, pass }  = req.body;
const sql = `SELECT userId, userMail, userName, pass FROM users WHERE userName = ? AND pass = ?`;
const result = await MySQLDB_Helper.executeQuery(sql, [userName, pass]);
if(!result){
 throw new ApplicationError({message: "login detail incorrect", location: __locationObject, errorObject: new Error("login details is wrong")})
}else{
    res.json(ApplicationSuccess.getSuccessObject(result, "sucess"));
} 
}

module.exports = {
    loginController
}