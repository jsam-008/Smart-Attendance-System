document.addEventListener("DOMContentLoaded", function() {
    const departments = ["CSE", "ECE", "EEE", "MECH"];
    const years = ["1", "2", "3", "4"];
    const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"]; 

    const studentNames = [
        "John Doe", "Jane Smith", "Alice Johnson", "Bob Williams", "Michael Brown", 
        "Emma Davis", "Olivia Martinez", "William Wilson", "Sophia Anderson", "Liam Thompson",
        "James Taylor", "Isabella Clark", "Lucas Rodriguez", "Mia Lewis", "Ethan Hall",
        "Benjamin Allen", "Ava Young", "Mason King", "Charlotte Scott", "Daniel Wright",
        "Henry Walker", "Emily Perez", "Jack Nelson", "Grace Carter", "Samuel Evans",
        "Lily Baker", "Jacob Gonzalez", "Chloe Turner", "Matthew Adams", "Samantha Hill"
    ];

    function generateAttendance() {
        const students = [];
        for (let i = 0; i < 30; i++) { 
            const statusOptions = ["Present", "Absent", "Late"];
            const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
            const randomTime = randomStatus === "Absent" ? "-" : `9:${Math.floor(Math.random() * 30) + 1} AM`;
            const studentName = studentNames[i % studentNames.length];

            students.push({
                id: `${100 + i + 1}`,
                name: studentName,
                status: randomStatus,
                time: randomTime
            });
        }
        return students;
    }

    const attendanceData = {};
    departments.forEach(dept => {
        attendanceData[dept] = {};
        years.forEach(year => {
            attendanceData[dept][year] = {};
            semesters.forEach(sem => {
                attendanceData[dept][year][sem] = generateAttendance();
            });
        });
    });

    document.getElementById("loadAttendance").addEventListener("click", function() {
        const dept = document.getElementById("department").value;
        const year = document.getElementById("year").value;
        const semester = document.getElementById("semester").value;

        const tbody = document.getElementById("attendance-data");
        tbody.innerHTML = "";

        if (attendanceData[dept] && attendanceData[dept][year] && attendanceData[dept][year][semester]) {
            attendanceData[dept][year][semester].forEach(student => {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${student.id}</td><td>${student.name}</td><td>${student.status}</td><td>${student.time}</td>`;
                tbody.appendChild(row);
            });

            
            document.getElementById("attendance-section").classList.remove("hidden");
        } else {
            tbody.innerHTML = "<tr><td colspan='4'>No records found</td></tr>";
        }
    });
});
