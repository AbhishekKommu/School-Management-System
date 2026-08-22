document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboard();

        loadStudents();

        loadTeachers();

        loadAttendance();

    }
);


/* ================= NAVIGATION ================= */

function showSection(sectionName) {

    document
        .querySelectorAll(".section")
        .forEach(function (section) {

            section.classList.remove("active");

        });


    document
        .getElementById(sectionName)
        .classList.add("active");

}


/* ================= DASHBOARD ================= */

async function loadDashboard() {

    const response =
        await fetch("/api/dashboard");

    const data =
        await response.json();


    document
        .getElementById("studentCount")
        .textContent = data.students;


    document
        .getElementById("teacherCount")
        .textContent = data.teachers;


    document
        .getElementById("attendanceCount")
        .textContent = data.attendance;

}


/* ================= STUDENTS ================= */

async function addStudent() {

    const student = {

        name:
            document
            .getElementById("studentName")
            .value,

        age:
            document
            .getElementById("studentAge")
            .value,

        gender:
            document
            .getElementById("studentGender")
            .value,

        class_name:
            document
            .getElementById("studentClass")
            .value,

        roll:
            document
            .getElementById("studentRoll")
            .value,

        phone:
            document
            .getElementById("studentPhone")
            .value,

        address:
            document
            .getElementById("studentAddress")
            .value

    };


    if (
        !student.name ||
        !student.age ||
        !student.gender ||
        !student.class_name ||
        !student.roll
    ) {

        alert(
            "Please fill all required fields."
        );

        return;

    }


    const response =
        await fetch(
            "/api/students",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(student)

            }
        );


    const data =
        await response.json();


    alert(data.message);


    clearStudentForm();

    loadStudents();

    loadDashboard();

}


async function loadStudents() {

    const response =
        await fetch("/api/students");

    const students =
        await response.json();


    const table =
        document
        .getElementById("studentTable");


    table.innerHTML = "";


    students.forEach(function (student) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.age}</td>

            <td>${student.gender}</td>

            <td>${student.class_name}</td>

            <td>${student.roll}</td>

            <td>${student.phone || "-"}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">

                    Delete

                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


async function deleteStudent(id) {

    if (
        !confirm(
            "Are you sure you want to delete this student?"
        )
    ) {

        return;

    }


    const response =
        await fetch(
            `/api/students/${id}`,
            {
                method: "DELETE"
            }
        );


    const data =
        await response.json();


    alert(data.message);


    loadStudents();

    loadDashboard();

}


function clearStudentForm() {

    document
        .getElementById("studentName")
        .value = "";

    document
        .getElementById("studentAge")
        .value = "";

    document
        .getElementById("studentGender")
        .value = "";

    document
        .getElementById("studentClass")
        .value = "";

    document
        .getElementById("studentRoll")
        .value = "";

    document
        .getElementById("studentPhone")
        .value = "";

    document
        .getElementById("studentAddress")
        .value = "";

}


/* ================= TEACHERS ================= */

async function loadTeachers() {

    const response =
        await fetch("/api/teachers");

    const teachers =
        await response.json();


    const list =
        document
        .getElementById("teacherList");


    list.innerHTML = "";


    teachers.forEach(function (teacher) {

        const card =
            document.createElement("div");


        card.className =
            "teacher-card";


        card.innerHTML = `

            <div class="teacher-avatar">
                👩‍🏫
            </div>

            <h3>
                ${teacher.name}
            </h3>

            <p>
                📚 ${teacher.subject}
            </p>

        `;


        list.appendChild(card);

    });

}


/* ================= ATTENDANCE ================= */

async function saveAttendance() {

    const record = {

        student:
            document
            .getElementById(
                "attendanceStudent"
            ).value,

        date:
            document
            .getElementById(
                "attendanceDate"
            ).value,

        status:
            document
            .getElementById(
                "attendanceStatus"
            ).value

    };


    if (
        !record.student ||
        !record.date ||
        !record.status
    ) {

        alert(
            "Please complete all attendance fields."
        );

        return;

    }


    const response =
        await fetch(
            "/api/attendance",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(record)

            }
        );


    const data =
        await response.json();


    alert(data.message);


    document
        .getElementById(
            "attendanceStudent"
        ).value = "";

    document
        .getElementById(
            "attendanceDate"
        ).value = "";

    document
        .getElementById(
            "attendanceStatus"
        ).value = "";


    loadAttendance();

    loadDashboard();

}


async function loadAttendance() {

    const response =
        await fetch(
            "/api/attendance"
        );


    const records =
        await response.json();


    const table =
        document
        .getElementById(
            "attendanceTable"
        );


    table.innerHTML = "";


    records.forEach(function (record) {

        const row =
            document.createElement("tr");


        let statusClass = "";


        if (
            record.status === "Present"
        ) {

            statusClass = "present";

        }
        else if (
            record.status === "Absent"
        ) {

            statusClass = "absent";

        }
        else {

            statusClass = "late";

        }


        row.innerHTML = `

            <td>${record.id}</td>

            <td>${record.student}</td>

            <td>${record.date}</td>

            <td>

                <span
                    class="status ${statusClass}">

                    ${record.status}

                </span>

            </td>

        `;


        table.appendChild(row);

    });

}