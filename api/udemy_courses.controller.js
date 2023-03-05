const UCoursesDAO = require("../dao/udemyCoursesDAO.js")
const fs = require("fs")
const path = require("path")    

const createRequire =  require("module").createRequire;
const data = require("../data/courses.json")

var __dirname = path.resolve();

/* All the Data Manipulation takes place here */
class ProjectsController {
    static async apiGetUCourses(req, res) {
        const date = req.params.date
        try{
            // const coursesList = await UCoursesDAO.getCourses(date)
            /* Temporary fix till Mongo is not integrated */
            var coursesList = null
            if(date === "" || date === undefined){
                coursesList = data
            }
            else {
                coursesList = data[date]
            }
            /* *** */
            if(coursesList.length === 0){
                console.log("[udemy_courses.controller][apiGetUCourses] Status: 400")
                res.status(400).json({"message":"Course list not available", "result":[]})
            }
            else{
                console.log("[udemy_courses.controller][apiGetUCourses] Status: 200")
                res.status(200).json({"message":"Success","result": coursesList})
            }
        }
        catch(err){
            console.log(`[udemy_courses.controller][apiGetUCourses] Error: ${err}`)
        }
    }

    static async apiCourseDetails(req, res) {
        const date = req.params.date
        const index = req.params.index
        try{
            const courseDetails = await UCoursesDAO.getCourseDetails(date,index)
            if(courseDetails.length === 0){
                console.log("[udemy_courses.controller][apiCourseDetails] Status: 400")
                res.status(400).json({"message":"Course list not available", "result":[]})
            }
            else{
                console.log("[udemy_courses.controller][apiCourseDetails] Status: 200")
                res.status(200).json({"message":"Success","result": courseDetails})
            }
        }
        catch(err){
            console.log(`[udemy_courses.controller][apiCourseDetails] Error: ${err}`)
        }
    }

    static async apiAddUCourses(req, res) {
        const date = req.params.date
        // console.log("[udemy_courses.controller][apiAddUCourses] Request: \n" + JSON.stringify(courses_to_be_added,null,2))

        var latestCourseList = JSON.parse(fs.readFileSync(path.resolve(__dirname, "udemy_courses/courses.json"),"utf-8"))

        try{
            const status = await UCoursesDAO.addCourses(date,latestCourseList)
            
            if(status) res.status(200).json({"message":"Success"})
            else res.status(400).json({"message":"Courses Not added"})
        }
        catch(err){
            console.log(`[udemy_courses.controller][apiAddUCourses] Error: ${err}`)
        }
    }
}

module.exports = ProjectsController