import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Microphone access is needed to record audio.');
      }
    };
    requestPermission();
  }, []);

  const handleStartRecording = () => {
    if (!hasPermission) {
      Alert.alert('Permission needed', 'Please allow microphone access before recording.');
      return;
    }
    setIsRecording(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Notes App</Text>
      <Text style={styles.subtitle}>Start by recording your first voice note!</Text>

      <Pressable style={styles.button} onPress={handleStartRecording}>
        <Text style={styles.buttonText}>Start Recording</Text>
      </Pressable>

      {isRecording && <Text style={styles.status}>Recording…</Text>}
      {hasPermission === false && (
        <Text style={styles.permissionWarning}>Microphone permission denied.</Text>
      )}
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
  permissionWarning: {
    fontSize: 14,
    color: 'red',
    marginTop: 10,
  },
});
