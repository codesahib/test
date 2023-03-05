/* All the Data Fetching from DB takes place here */
const coursesModel = require("./udemyCoursesModel.js")

class udemyCoursesDAO{
    
    // Initialize the DB connection by defining Schema and creating Model 
    static async injectDB(conn){
        if(coursesModel){
            console.log("[udemyCoursesDAO][injectDB] Returning model")
            return
        }
    }

    static async getCourses(given_date){
        const date = given_date
        
        const query_args = {}
        if(date){
            console.log(`[udemyCoursesDAO][getCourses] Fetching list for date: ${date}`)
            query_args.date = date
        }
        else{
            console.log("[udemyCoursesDAO][getCourses] No date specified. Fetching all courses")
        }
        
        try{
            const courses_list = await coursesModel.find(query_args)
            return courses_list
        }
        catch(err){
            console.log(`[udemyCoursesDAO][getCourses] Cannot fetch list of courses. Error: ${err}`)
        }
    }

    static async getCourseDetails(given_date,given_index){
        const date = given_date
        const index = parseInt(given_index)
        
        const query_args = {}
        query_args.date = date

        try{
            const course_details = await coursesModel.find(query_args).slice('courses', index, 1)
            return course_details
        }
        catch(err){
            console.log(`[udemyCoursesDAO][getCourseDetails] Cannot fetch course details. Error: ${err}`)
        }
        
    }

    static async addCourses(given_date,given_courses) {
        const date = given_date
        const courses = given_courses

        var courses_for_this_date = {}
            
        courses_for_this_date["date"] = date
        courses_for_this_date["courses"] = courses

        try {
            await coursesModel.create(courses_for_this_date) // .create method declares new Model object and calls .save()
            return true
        }
        catch(err){
            console.log(`[udemyCoursesDAO][addCourses] Cannot add new courses. Error: ${err}`)
        }
    }
}

module.exports = udemyCoursesDAO

