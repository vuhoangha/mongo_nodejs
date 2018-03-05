const mongoose = require('mongoose');
const studentSchema = require('./Schema/student');
const config = require('./config');

mongoose.connect(config.db_string);
let db = {};

const init = cb => {
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('we are connected!');
        if (cb) cb();
    });
};

const getClass = (collection, schema) => {
    return mongoose.model(collection, schema);
}

const getById = (collection, schema, id, cb) => {
    const classObj = getClass(collection, schema);
    classObj.findById(id, function (err, data) {
        if (err) cb(null);
        cb(data);
    });
};

const insert = (collection, schema, obj, cb) => {
    const classObj = getClass(collection, schema);
    const newObj = new classObj(obj);

    newObj.save(err => {
        if (err) console.log('Error: ', err);
        if (cb) cb();
    });
};

module.exports = {
    init,
    getById,
    insert
};