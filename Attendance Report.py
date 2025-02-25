import pandas as pd

conn = sqlite3.connect('attendance.db')
query = "SELECT * FROM attendance"
df = pd.read_sql(query, conn)

df.to_csv('attendance_report.csv', index=False)
print("Attendance Report Generated.")
conn.close()
