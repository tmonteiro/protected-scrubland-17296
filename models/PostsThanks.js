module.exports = function(sequelize, DataType) {
    const PostsThanks = sequelize.define('PostsThanks', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cod_post: DataType.TEXT,
        thanks: DataType.JSONB
    });
    return PostsThanks;
};