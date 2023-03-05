const express = require("express")
const UCoursesCtrl = require("../api/udemy_courses.controller.js")


const router = express.Router()

router.route("/").get(UCoursesCtrl.apiGetUCourses)
router.route("/add-courses/:date").get(UCoursesCtrl.apiAddUCourses)

router.route("/:date/").get(UCoursesCtrl.apiGetUCourses)
router.route("/:date/course:index").get(UCoursesCtrl.apiCourseDetails)



module.exports =  router