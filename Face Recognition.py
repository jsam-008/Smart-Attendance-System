import cv2
import numpy as np
import tensorflow as tf

model = tf.keras.models.load_model('face_recognition_model.h5')

def preprocess_image(image):
    image = cv2.resize(image, (128, 128))
    image = np.expand_dims(image, axis=0)
    image = image / 255.0
    return image

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    faces = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    detected_faces = faces.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in detected_faces:
        face = frame[y:y+h, x:x+w]
        processed_face = preprocess_image(face)
        prediction = model.predict(processed_face)

        if prediction[0][0] > 0.5:
            label = "Student Present"
        else:
            label = "Unknown"

        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
        cv2.putText(frame, label, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

    cv2.imshow('Face Recognition', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
