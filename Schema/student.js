const mongoose = require('mongoose');

const lowerString = val => {
    return val.toLowerCase();
}

const upperString = val => {
    return val.toUpperCase();
}

const schemaStudent = new mongoose.Schema({
    firstName: { type: String, required: true, set: upperString, get: lowerString },
    lastName: { type: String, required: true },
    studentId: { type: String, require: true }
});

schemaStudent.virtual('fullName')
    .get(() => {
        return this.firstName + ' ' + this.lastName;
    })
    .set(v => {
        this.firstName = v.substr(0, v.indexOf(' '));
        this.lastName = v.substr(v.indexOf(' ') + 1);
    });

module.exports = schemaStudent;