const jwt = require('jsonwebtoken');


// // auth middleware for the application
// const userAuth = async (req, res, next)=>{
//     const hasAuthorization = req.headers.authorization;
//     if(!hasAuthorization) {
//         res.status(404).json({
//             message: 'No authorization found'
//         })
//     } else {
//         console.log(hasAuthorization)
//         const token = hasAuthorization.split(' ')[1];
//         const decodedToken = await jwt.verify(token, "mySecret")
//         req.userId = decodedToken.userId
//     }
//     next();
// }


// auth middleware for the application
const userAuth = async (req, res, next)=>{
    const hasAuthorization = req.headers.authorization;
    if(!hasAuthorization) {
        res.status(404).json({
            message: 'No authorization found'
        })
    } 
    const token = hasAuthorization.split(' ')[1];
    try {
        console.log(hasAuthorization)
        const decodedToken = await jwt.verify(token, "mySecret")
        req.user = JSON.stringify(decodedToken)
        req.userId = decodedToken.userId
        req.userEmail = decodedToken.email
        req.username = decodedToken.username
        next()
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {userAuth}