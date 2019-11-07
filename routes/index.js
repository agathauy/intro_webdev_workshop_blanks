const appRoot = require('app-root-path');
const logger = require(`${appRoot}/libs/logger.js`); // eslint-disable-line


module.exports = (app) => {

    const homepage_get = app.controllers.homepage.homepage_get;

    const controller = Object.assign(
        {},

        homepage_get
    );

    app.route('/')
        .get(controller.homepage_get);



    // app.get("*", (req, res) => {
    //     res.redirect("/");
    // });

}