#include <WiFi.h>
#include <FirebaseESP32.h>

// Wi-Fi credentials
const char* ssid = "Anshuman";          // Replace with your Wi-Fi SSID
const char* password = "87654321";      // Replace with your Wi-Fi password

// Firebase project details
#define FIREBASE_HOST "https://gotime-44111-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "gQ5wAcFVTLaywB7aPMsg6ILJlqxHiNAFBboQnJ5L"

// Firebase path for A Block, Ground Floor, 1st Bathing Area
const char* FIREBASE_PATH = "/washrooms/block-1/floors/floor-1/bathingAreas/0/isOccupied";

// Firebase and Wi-Fi objects
FirebaseData firebaseData;
FirebaseConfig firebaseConfig;
FirebaseAuth firebaseAuth;

// Pin connected to the occupancy sensor
#define SENSOR_PIN 2  // GPIO pin connected to the sensor

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println();
  Serial.println("Connected to Wi-Fi");

  // Configure Firebase
  firebaseConfig.host = FIREBASE_HOST;
  firebaseConfig.signer.tokens.legacy_token = FIREBASE_AUTH;

  // Initialize Firebase
  Firebase.begin(&firebaseConfig, &firebaseAuth);
  Firebase.reconnectWiFi(true);

  Serial.println("Connected to Firebase");

  // Initialize the sensor pin
  pinMode(SENSOR_PIN, INPUT);
}

void loop() {
  // Read the sensor state (1 for occupied, 0 for unoccupied)
  bool isOccupied = digitalRead(SENSOR_PIN);

  // Update the Firebase Realtime Database
  if (Firebase.setBool(firebaseData, FIREBASE_PATH, isOccupied)) {
    Serial.print("Updated Block A Ground Floor 1st Bathing Area to ");
    Serial.println(isOccupied ? "Occupied" : "Unoccupied");
  } else {
    Serial.print("Failed to update Firebase: ");
    Serial.println(firebaseData.errorReason());
  }

  // Wait for a while before the next update
  delay(5000); // Update every 5 seconds
}