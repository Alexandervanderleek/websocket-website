const configureRoutes = (app) => {
    app.use('/api/users', require('./api/users'));
    app.use('/api/auth', require('./api/auth'));
    app.use('/', (req,res)=>{
        res.status(200).send("Welcome")
    })
}


module.exports = configureRoutes;