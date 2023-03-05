const mongoose = require('mongoose')

const udemyCoursesSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: [true, "Courses for this date already exists"]
    },

    courses:[
        {
            title: {
                type: String,
                required: true,
                unique: [true, "Course already exists"]
            },
            link: {
                type: String,
                required: true,
                unique: [true, "Link already exists"]
            },
            headline: {
                type: String
            },
            creator: {
                type: String
            },
            rating: {
                type: String
            }
        }
    ]
}) // We can have a second argument to Schema to overwrite the default collections name {collection: 'my-udemyCoursess'}

// Create Model for CRUD operations
var model;

try {
    model = new mongoose.model("udemy_course",udemyCoursesSchema)
}
catch(err){
    console.log(`[udemyCoursesDAO][model] Unable to create Model. Error: ${err}`)
}

module.exports = model