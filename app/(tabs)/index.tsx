import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Later we'll add logic to actually record
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Notes App</Text>
      <Text style={styles.subtitle}>Start by recording your first voice note!</Text>

      <Pressable style={styles.button} onPress={handleStartRecording}>
        <Text style={styles.buttonText}>Start Recording</Text>
      </Pressable>

      {isRecording && <Text style={styles.status}>Recording…</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  status: {
    fontSize: 16,
    color: '#d00',
  },
});
