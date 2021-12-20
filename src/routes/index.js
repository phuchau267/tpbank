
const userRouter = require('./user');
const siteRouter = require('./site');
// o day phai sap xep cai "/:slug" sau do toi "/" phai nam cuoi 
function route(app) {
    
    app.use('/user', userRouter);
    app.use('/', siteRouter);
    
}

module.exports = route;