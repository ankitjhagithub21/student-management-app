const addForm = document.getElementById('add-form')
const tableContainer = document.getElementById('table-container')
const formContainer = document.getElementById('form-container')
const studentContainer = document.getElementById('student-container')
const newName = document.getElementById('new-name')
const newCourse = document.getElementById('new-course')
const newRoll = document.getElementById('new-roll')
const newCollege = document.getElementById('new-college')
const editForm = document.getElementById('edit-form')


let editIndex;

const students = JSON.parse(localStorage.getItem('students')) || []


addForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let student = {
        name: e.target.name.value,
        course: e.target.course.value,
        roll: e.target.roll.value,
        college: e.target.college.value
    }

    if (isExist(student.roll)) {
        alert("Already Exist")
    } else {
        addStudent(student)
        alert('student added')
        addForm.reset()
    }
})


const isExist = (roll) => {
    let index = students.findIndex(student => student.roll == roll)
    if (index == -1) {
        return false;

    } else {
        return true
    }
}

const addStudent = (student) => {
    students.push(student)
    updateLs()
}

const updateLs = () => {
    localStorage.setItem('students', JSON.stringify(students))
    displayStudents()

}

const displayForm = () => {
    formContainer.style.display = "block"
    tableContainer.style.display = "none"
}
const displayTable = () => {
    formContainer.style.display = "none"
    tableContainer.style.display = "block"
}

const displayStudents = () => {
    studentContainer.innerHTML = ""
    students.forEach((student, index) => {
        let tr = document.createElement('tr')
        tr.innerHTML = `
        <th scope="row">${student.roll}</th>
        <td>${student.name}</td>
        <td>${student.course}</td>
        <td>${student.college}</td>
        <td><i class="fa-solid fa-trash"></i>
        <i class="fa-solid fa-edit mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
        </td>
        
        
        `
        studentContainer.appendChild(tr)

        tr.querySelector('.fa-trash').addEventListener('click', () => {
            students.splice(index, 1)
            updateLs()

        })
        tr.querySelector('.fa-edit').addEventListener('click', () => {
            editIndex = index
           newName.value = student.name
           newCourse.value = student.course
           newRoll.value = student.roll
           newCollege.value = student.college
        })
    })
}


editForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    students[editIndex].name = newName.value
    students[editIndex].course = newCourse.value
    students[editIndex].roll = newRoll.value
    students[editIndex].college = newCollege.value  
    updateLs()
    alert('changes saved')
    editForm.reset()
})

displayStudents()