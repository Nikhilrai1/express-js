
const data = {
    employees: require("../model/employess.json"),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployees = (req, res) => {
    res.json(data.employees)
}

const createEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        name: req.body.name,
        age: req.body.age
    }
    if (!req.body.name || !req.body.age) {
        res.statsu(400).json({ "message": "required both name and age." })
    }
    data.setEmployees([...data.employees, newEmployee])
    res.status(201).json(data.employees)
}

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if (!employee) {
        return res.status(404).json({ "message": `Employee ID ${req.body.id} not found` })
    }

    if (req.body.name) employee.name = req.body.name;
    if (req.body.age) employee.age = req.body.age;

    const filterArray = data.employees.filter(emp => emp.id != parseInt(req.body.id));
    const unSortedArray = [...filterArray, employee];

    data.setEmployees(unSortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    res.status(200).json(data.employees)

}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if (!employee) {
        return res.status(404).json({ "message": `Employee ID ${req.body.id} not found` })
    }

    const filterArray = data.employees.filter(emp => emp.id != parseInt(req.body.id));
    const unSortedArray = [...filterArray];

    data.setEmployees(unSortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    res.status(200).json(data.employees)
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id))
    if (!employee) {
        return res.status(404).json({ "message": `Employee ID ${req.params.id} not found` })
    }
    res.status(200).json(employee)
}


module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}