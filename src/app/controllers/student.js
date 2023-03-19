const {v4: uuidv4} = require("uuid");
const path = require("path");
const Student = require("./../models/students");

const viewPath = (fileName) => {
    return 'student/' + fileName;
}

exports.studentList = (req, res) => {
    res.render('student/index');
}
exports.createStudent = (req, res) => {
    res.render('student/create');
}
exports.saveStudent = async (req, res) => {
    try {
        const student = new Student({
            id: uuidv4(),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
        });
        await student.save();
        req.flash('success', 'Student is created')
        res.redirect('/students')

    }catch (error) {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        if(!errors) {
            errors = error.message;
        }
        req.session.errors = errors;
        res.redirect('back');
    }

}
exports.editStudent = (req, res) => {
    res.render('student/edit');
}
exports.updateStudent = (req, res) => {

}
exports.deleteStudent = (req, res) => {

}