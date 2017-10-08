const PoststhanksController = require('../controllers/poststhanks');

module.exports = function(app) {
    const poststhanksController = new PoststhanksController(app.datasource.models.PostsThanks);

    app.route('/')
        .get((req, res) => {
            res.render('index', { title: 'Shazam' });
        });

    app.route('/posts')
        .get((req, res) => {
            poststhanksController.getAll()
            .then((response) => {
                res.status(response.statusCode);
                res.jsonp(response.data);
            });
        })
        .post((req, res) => {
            poststhanksController.create(req.body)
              .then((response) => {
                res.status(response.statusCode);
                res.jsonp(response.data);
              });
          });

    app.route('/posts/:cod_post')
        .get((req, res) => {
            poststhanksController.getByCod(req.params)
            .then((response) => {
                res.status(response.statusCode);
                res.jsonp(response.data);
            });
        })
        .put((req, res) => {
            poststhanksController.update(req.body, req.params)
            .then((response) => {
                res.status(response.statusCode);
                res.jsonp(response.data);
            });
        })
        .delete((req, res) => {
            poststhanksController.delete(req.params)
            .then((response) => {
                res.sendStatus(response.statusCode);
            });
        });

    app.route('/posts/:cod/:user')
        .get((req, res) => {
            poststhanksController.getByCodOrCreate(req.params)
            .then((response) => {
                res.status(response.statusCode);
                res.jsonp(response.data);
            });
        })
        .put((req, res) => {
            poststhanksController.update(req.body, req.params)
            .then((response) => {
                res.status(response.statusCode);
                res.jsonp(response.data);
            });
        })
        .delete((req, res) => {
            poststhanksController.delete(req.params)
            .then((response) => {
                res.sendStatus(response.statusCode);
            });
        });
    
    app.route('/posts/delete/:cod_post')
        .get((req, res) => {
            poststhanksController.delete(req.params)
            .then((response) => {
                res.status(response.statusCode);
                res.jsonp(response.data);
            });
        }); 
};