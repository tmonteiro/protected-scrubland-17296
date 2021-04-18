var fs = require("fs");
var path = require("path");
var Sequelize = require('sequelize');

var database = null;

const loadModels = function(sequelize) {
    const dir = path.join(__dirname,'../models');
    const models = [];
    fs.readdirSync(dir).forEach(function(file){
        const modelDir = path.join(dir, file);
        const model = sequelize.import(modelDir);
        models[model.name] = model;
    });
    return models;
};

module.exports = function() {
    if(!database) {
        const sequelize = new Sequelize(process.env.DATABASE_URL, {ssl: true});

        database = {
            sequelize,
            Sequelize,
            models: {},
        };

        database.models = loadModels(sequelize);
        sequelize.sync().done(() => database);
    }
    return database;
};