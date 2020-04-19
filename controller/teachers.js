const fs = require('fs')
const data = require('../data.json')
const { age, date, graduation } = require('../utils')
const Intl = require('intl')

//Index
exports.index = function(req, res) {

    return res.render("teachers/index", { teachers: data.teachers }) 
}
//Create
exports.create = function(req, res) {
    return res.render("teachers/create")
}
// Post
exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all fields")
        }
    }

    let { avatar_url, name, birth, grau, type, services } =  req.body


    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id, 
        avatar_url, 
        name, 
        birth, 
        grau, 
        type, 
        services, 
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

        return res.redirect("/teachers")
    })

    //return res.send(req.body)
} 
// Show
exports.show = function(req, res) {
    const { id } = req.params

    foundTeachers = data.teachers.find(function(teachers) {
        return teachers.id == id
    }) 

    if (!foundTeachers) return res.send("Teacher not found")

    const teacher = {
        ...foundTeachers,
        age: age(foundTeachers.birth),
        grau: graduation(foundTeachers.grau),
        services: foundTeachers.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeachers.created_at)
    }

    return res.render("teachers/show", { teacher })
}
// Edit
exports.edit = function(req, res) {
    const { id } = req.params

    const foundTeachers = data.teachers.find(function(teachers) {
        return teachers.id == id
    })

    if (!foundTeachers) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeachers,
        birth: date(foundTeachers.birth),
    }


    return res.render("teachers/edit", { teacher })
}
// Put
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundTeachers = data.teachers.find(function(teachers, foundIndex) {
        if (id == teachers.id) {
            index = foundIndex
            return true
        }
    }) 

    if (!foundTeachers) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeachers,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write error!")

        return res.redirect(`/teachers/${id}`)
    })
}
// Delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter(function(teachers) {
        return teachers.id != id
    })
    
    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write erro!")
        
        return res.redirect("/teachers")
    })
}