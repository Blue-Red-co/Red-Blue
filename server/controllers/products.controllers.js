const { MySQLDB_Helper, ApplicationSuccess, ApplicationError } = require("node_helper");

const getProduct_controller = async (req, res, next) => {
    try {
        const { productId } = req.query;
        if (!productId) {
            throw new ApplicationError({ location: __locationObject, errorObject: new Error("send the valuer your data") })
        } else {
            const sql = `   SELECT pr.productId, pr.productName as name, pr.productDescription as disp, pr.productImg as img, ca.categoryId, ca.categoryName  
                            FROM products pr
                            INNER JOIN categories ca ON pr.productId = ca.categoryId
                            WHERE productId = ? AND 
                            isDeleted = 0 `;
            const result = await MySQLDB_Helper.executeQuery(sql, [productId]);
            if (result.length !== 0) {
                res.json(ApplicationSuccess.getSuccessObject(result, "I got your product"))
            } else {
                throw new ApplicationError({message: "I did't get whole data to verfy the login", location: __locationObject })
                throw new ApplicationError({message: "Wrong Product Id or Product is Deleted", location: __locationObject })
                }
        }
    } catch (err) {
        throw new ApplicationError({location: __locationObject, errorObject: err })
    }
}

const getBannerDetails_controllers = async (req, res, next) => {
    try {
        const sql = `   SELECT id, bannerName, bannerImg, bannerImg
                        FROM banner; `;
        const result = await MySQLDB_Helper.executeQuery(sql, []);
        if (result.length === 0) {
            throw new ApplicationError({ location: __locationObject, errorObject: new Error("Banners not found") })
        } else {
            ApplicationSuccess.getSuccessObject(result, "Sucess")
        }
    } catch (err) {
        throw new ApplicationError({ location: __locationObject, errorObject: err })
    }
}

const getProducts_controller = async (req, res, next) => {
    try {

        const sql = `   SELECT pr.productId, pr.productName as name, pr.productDescription as disp, pr.productImg as img, ca.categoryId, ca.categoryName   
                        FROM products pr
                        INNER JOIN categories ca on pr.productId = ca.categoryId
                        WHERE isDeleted = 0;`;
        const result = await MySQLDB_Helper.executeQuery(sql, []);
        if (result.length !== 0) {
            res.json(ApplicationSuccess.getSuccessObject(result, "All your products"))
        } else {
            throw new ApplicationError({ message: "no Data found", location: __locationObject })
        }
    } catch (err) {
        throw new ApplicationError({location: __locationObject, errorObject: err})
    }
}

const getCategories_controllers = async(req, res, next) => {
    try{
        const sql = `   SELECT categoryId, categoryName, bgColor 
                        FROM categories;`;
        const result = await MySQLDB_Helper.executeQuery(sql, []);
        if(result.length !== 0){
            res.json(ApplicationSuccess.getSuccessObject(result, "I took all the categories"))
        }else{
            throw new ApplicationError({})
        }
    }catch(err){
        throw new ApplicationError({location: __locationObject, errorObject: err })
    }
}



module.exports = {
    getProduct_controller,
    getBannerDetails_controllers,
    getProducts_controller,
    getCategories_controllers
}