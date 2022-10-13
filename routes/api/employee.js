const express = require("express")
const path = require("path")
const ROLES_LIST = require("../../config/roles_list")
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee } = require("../../controllers/employeeController")
const verifyRoles = require("../../middleware/verifyRoles")
const router = express.Router()

router.route("/")
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee)


router.route("/:id")
    .get(getEmployee)

module.exports = router;