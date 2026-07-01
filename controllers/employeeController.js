const Employee=require("../model/employeeSchema");

// GET ALL EMPLOYEES

const getAllEmployees = async (req, res) => {

    try {

        const employees = await Employee.find().sort({ createdAt: -1 });

        res.status(200).json(employees);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// GET SINGLE EMPLOYEE

const getEmployeeById =async (req, res) => {

  const id = req.params.id;

  const employee = await Employee.findById(id);

  if (!employee) {
    return res.status(404).json({
      message: "Employee Not Found"
    });
  }

  res.status(200).json(employee);

};

// ADD EMPLOYEE

const addEmployee = async (req, res) => {

  try {

    const { name, email, department, salary } = req.body;

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee with this email already exists."
      });
    }

    // Generate Employee ID
    const lastEmployee = await Employee.findOne().sort({ employeeId: -1 });

    let employeeId = "EMP0001";

    if (lastEmployee && lastEmployee.employeeId) {
      const lastNumber = parseInt(lastEmployee.employeeId.replace("EMP", ""));
      employeeId = `EMP${String(lastNumber + 1).padStart(4, "0")}`;
    }

    const newEmployee = new Employee({
      employeeId,
      name,
      email,
      department,
      salary
    });

    await newEmployee.save();

    res.status(201).json({
      message: "Employee Added Successfully",
      employee: newEmployee
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

// UPDATE EMPLOYEE

const updateEmployee = async (req, res) => {

  try {

    const id = req.params.id;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee Not Found"
      });
    }

    employee.name = req.body.name || employee.name;

    employee.email = req.body.email || employee.email;

    employee.department = req.body.department || employee.department;

    employee.salary = req.body.salary || employee.salary;

    await employee.save();

    res.status(200).json({
      message: "Employee Updated Successfully",
      employee
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

// DELETE EMPLOYEE

const deleteEmployee = async (req, res) => {

  try {

    const id = req.params.id;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee Not Found"
      });
    }

    await Employee.findByIdAndDelete(id);

    res.status(200).json({
      message: "Employee Deleted Successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
};