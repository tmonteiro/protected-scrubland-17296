const HttpStatus = require('http-status');

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
    data,
    statusCode,
});
  
const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
    error: message,
}, statusCode);

class PoststhanksController {
    constructor(PostsThanks) {
        this.PostsThanks = PostsThanks;
    }

    getAll() {
        return this.PostsThanks.findAll({})
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    getByCod(params) {
        return this.PostsThanks.findOne({ where: params })
            .then(result => defaultResponse(result.thanks.users))
            .catch(error => errorResponse(error.message));
    }
    
    getByCodOrCreate(params) {
        const cod = params.cod;
        const user = params.user;
        return this.PostsThanks.findOrCreate({ where: {cod_post: cod} })
            .spread((result, created) => {

                var thanks = result.thanks;
                if (!thanks) {
                    thanks = {
                        users: [user]
                    };
                } else {
                    var arr = thanks.users;
                    arr.push(user);
                    thanks = {
                        users: arr
                    };
                }

                return this.PostsThanks.update({thanks: thanks}, { where: {cod_post: result.cod_post} })
                    .then((result) => {
                        return this.PostsThanks.findOne({ where: {cod_post: cod} })
                            .then(result => defaultResponse(result.thanks.users))
                            .catch(error => errorResponse(error.message));
                    })
                    .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
            })
            .catch(error => errorResponse(error.message));
    }

    create(data) {
        return this.PostsThanks.create(data)
            .then(result => defaultResponse(result, HttpStatus.CREATED))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    update(data, params) {
        return this.PostsThanks.update(data, { where: params })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(params) {
        return this.PostsThanks.destroy({ where: params })
            .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }
}

module.exports =  PoststhanksController;
