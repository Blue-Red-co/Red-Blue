const { MySQLDB_Helper, ApplicationSuccess, ApplicationError } = require("node_helper");

const getProduct_controller = async (req, res, next) => {
    try {
        const { productId } =  req.query;
        if (!productId) {
            throw new ApplicationError({ location: __locationObject, errorObject: new Error("send the valuer your data") })
        }
        const sql = `SELECT productId, productName as name, productDescription as disp, productImg as img   
                FROM products
                WHERE productId = ? AND 
                isDeleted = 0 `;
        const result = await MySQLDB_Helper.executeQuery(sql, [productId]);
        if (result) {
            res.json(ApplicationSuccess.getSuccessObject(result, "I got your product"))
        } else {
            throw new ApplicationError({ location: __locationObject, errorObject: new Error("Wrong Product Id") })
        }
    } catch (err) {
        throw err
    }
}

const getBannerDetails_controllers = async (req, res, next) => {
    try{
    const sql = `   SELECT id, bannerName, bannerImg, bannerImg
                    FROM banner; `;
    const result = await MySQLDB_Helper.executeQuery(sql,[]);
    if(!result){
        throw new ApplicationError({location:__locationObject, errorObject: new Error("Banners not found")})
    }else{
        ApplicationSuccess.getSuccessObject(result, "Sucess")
    }
    }catch(err){
        throw new ApplicationError({location: __locationObject, errorObject: new Error(err)})
    }
}

module.exports = { 
    getProduct_controller,
    getBannerDetails_controllers
}