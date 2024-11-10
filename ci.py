import cv2
from deepface import DeepFace
import time
import os
import matplotlib.pyplot as plt

capture_duration = 15
capture_interval = 3

output_dir = "captured_images"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)


cap = cv2.VideoCapture(0)
start_time = time.time()
image_count = 0
emotions_data = []

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to capture image from webcam.")
        break

    current_time = time.time()
    if current_time - start_time >= capture_duration:
        break

    if (current_time - start_time) >= image_count * capture_interval:
        try:
            analysis = DeepFace.analyze(frame, actions=["emotion"])

            dominant_emotion = analysis[0]["dominant_emotion"]
            emotions_data.append(dominant_emotion)

            cv2.putText(frame, dominant_emotion, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

            image_path = os.path.join(output_dir, f"image_{image_count}.jpg")
            cv2.imwrite(image_path, frame)
            image_count += 1

        except Exception as e:
            print(f"Error during analysis: {e}")

    cv2.imshow("Emotion Detection", frame)

    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()


emotion_colors = {
    "angry": "red",
    "sad": "blue",
    "happy": "yellow",
    "surprised": "orange",
    "neutral": "gray",

}

emotion_counts = {}
for emotion in emotions_data:
    emotion_counts[emotion] = emotion_counts.get(emotion, 0) + 1


emotion_labels = list(emotion_counts.keys())
emotion_values = list(emotion_counts.values())


plt.figure(figsize=(2, 2)) 


pie_colors = [emotion_colors.get(emotion, "lightgray") for emotion in emotion_labels]

plt.pie(emotion_values, labels=emotion_labels, autopct="%1.1f%%", startangle=140, colors=pie_colors, wedgeprops=dict(width=0.1))
plt.axis("equal") 


plt.title("Frequency of Detected Emotions over 15 seconds")
plt.legend(emotion_labels, loc="center left", bbox_to_anchor=(1, 0.5))
plt.savefig('plot.png')  # Saves as PNG by default

# Optional: Specify DPI for resolution, format, and transparent background
plt.savefig('plot_high_res.png', dpi=300, format='png', transparent=True)
plt.show()