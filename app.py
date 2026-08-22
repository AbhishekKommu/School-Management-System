from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

students = []

teachers = [
    {
        "id": 1,
        "name": "Dr. Anil Kumar",
        "subject": "Mathematics"
    },
    {
        "id": 2,
        "name": "Ms. Priya Sharma",
        "subject": "English"
    },
    {
        "id": 3,
        "name": "Mr. Ravi Reddy",
        "subject": "Science"
    }
]

attendance = []


@app.route("/")
def home():
    return render_template("index.html")


# Dashboard
@app.route("/api/dashboard")
def dashboard():
    return jsonify({
        "students": len(students),
        "teachers": len(teachers),
        "attendance": len(attendance)
    })


# Students
@app.route("/api/students", methods=["GET", "POST"])
def student_api():

    if request.method == "POST":

        data = request.json

        student = {
            "id": len(students) + 1,
            "name": data.get("name"),
            "age": data.get("age"),
            "gender": data.get("gender"),
            "class_name": data.get("class_name"),
            "roll": data.get("roll"),
            "phone": data.get("phone"),
            "address": data.get("address")
        }

        students.append(student)

        return jsonify({
            "success": True,
            "message": "Student added successfully",
            "student": student
        })

    return jsonify(students)


@app.route("/api/students/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):

    global students

    student = next(
        (s for s in students if s["id"] == student_id),
        None
    )

    if not student:
        return jsonify({
            "success": False,
            "message": "Student not found"
        }), 404

    students = [
        s for s in students
        if s["id"] != student_id
    ]

    return jsonify({
        "success": True,
        "message": "Student deleted successfully"
    })


# Teachers
@app.route("/api/teachers")
def teacher_api():
    return jsonify(teachers)


# Attendance
@app.route("/api/attendance", methods=["GET", "POST"])
def attendance_api():

    if request.method == "POST":

        data = request.json

        record = {
            "id": len(attendance) + 1,
            "student": data.get("student"),
            "date": data.get("date"),
            "status": data.get("status")
        }

        attendance.append(record)

        return jsonify({
            "success": True,
            "message": "Attendance saved successfully",
            "record": record
        })

    return jsonify(attendance)


if __name__ == "__main__":
    app.run(debug=True)