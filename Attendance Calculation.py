from datetime import datetime
import sqlite3

conn = sqlite3.connect('attendance.db')
cursor = conn.cursor()

def mark_attendance(student_id, status):
    time_now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    cursor.execute("INSERT INTO attendance (student_id, status, timestamp) VALUES (?, ?, ?)", (student_id, status, time_now))
    conn.commit()

students_inside = {}

def update_attendance(rfid, face_detected):
    if face_detected and rfid:
        students_inside[rfid] = 'Present'
    elif rfid in students_inside:
        students_inside[rfid] = 'Absent'

for student, status in students_inside.items():
    mark_attendance(student, status)

conn.close()
