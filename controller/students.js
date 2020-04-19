const fs = require('fs')
const data = require('../data.json')
const { grade, date,  } = require('../utils')
const Intl = require('intl')

// Index
exports.index = function(req, res) {

    return res.render("students/index", { students: data.students }) 
}
// Create
exports.create = function(req, res) {
    return res.render("students/create")
}
// Post
exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all fields")
        }
    }


    birth = Date.parse(req.body.birth)
   
    let id = 1
    const lastStudents = data.students[data.students.length - 1]

    if (lastStudents) {
        id = lastStudents.id + 1
    }

    data.students.push({
        id, 
        ...req.body,
        birth, 
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

        return res.redirect(`/students/${id}`)
    })

}
// Show
exports.show = function(req, res) {
    const { id } = req.params

    foundStudents = data.students.find(function(students) {
        return students.id == id
    }) 

    if (!foundStudents) return res.send("Student not found")

    const student = {
        ...foundStudents,
        age: date(foundStudents.birth).birthDay,
        school_year: grade(foundStudents.school_year)
    }

    return res.render("students/show", { student })
}
// Edit
exports.edit = function(req, res) {
    const { id } = req.params

    const foundStudents = data.students.find(function(students) {
        return students.id == id
    })

    if (!foundStudents) return res.send("Student not found!")

    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth).iso
    }


    return res.render("students/edit", { student })
}
// Put
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundStudents = data.students.find(function(students, foundIndex) {
        if (id == students.id) {
            index = foundIndex
            return true
        }
    }) 

    if (!foundStudents) return res.send("Student not found!")

    const student = {
        ...foundStudents,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write error!")

        return res.redirect(`/students/${id}`)
    })
}
// Delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredStudents = data.students.filter(function(students) {
        return students.id != id
    })
    
    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write erro!")
        
        return res.redirect("/students")
    })
}