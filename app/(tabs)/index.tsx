import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [recordingInstance, setRecordingInstance] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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

  const startRecording = async () => {
    if (!hasPermission) return Alert.alert('Please grant mic access');
    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecordingInstance(recording);
      setIsRecording(true);
      setIsPaused(false);
    } catch {
      Alert.alert('Error', 'Failed to start recording.');
    }
  };

  const pauseRecording = async () => {
    if (recordingInstance) {
      await recordingInstance.pauseAsync();
      setIsPaused(true);
    }
  };

  const resumeRecording = async () => {
    if (recordingInstance) {
      await recordingInstance.startAsync();
      setIsPaused(false);
    }
  };

  const stopRecording = async () => {
    if (recordingInstance) {
      await recordingInstance.stopAndUnloadAsync();
      setIsRecording(false);
      setIsPaused(false);
      setRecordingInstance(null);
      Alert.alert('Recording saved', 'Your recording has been saved successfully.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Notes App</Text>
      <Text style={styles.subtitle}>Start by recording your first voice note!</Text>

      {!isRecording && (
        <Pressable style={styles.button} onPress={startRecording}>
          <Text style={styles.buttonText}>Start Recording</Text>
        </Pressable>
      )}

      {isRecording && !isPaused && (
        <View style={{ flexDirection: 'row' }}>
          <Pressable style={styles.button} onPress={pauseRecording}>
            <Text style={styles.buttonText}>Pause</Text>
          </Pressable>
          <Pressable style={styles.buttonStop} onPress={stopRecording}>
            <Text style={styles.buttonText}>Stop</Text>
          </Pressable>
        </View>
      )}

      {isRecording && isPaused && (
        <View style={{ flexDirection: 'row' }}>
          <Pressable style={styles.button} onPress={resumeRecording}>
            <Text style={styles.buttonText}>Resume</Text>
          </Pressable>
          <Pressable style={styles.buttonStop} onPress={stopRecording}>
            <Text style={styles.buttonText}>Stop</Text>
          </Pressable>
        </View>
      )}

      {isRecording && !isPaused && <Text style={styles.status}>Recording…</Text>}
      {isRecording && isPaused && <Text style={styles.status}>Paused</Text>}

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
  buttonStop: {
    backgroundColor: '#d00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    marginLeft: 12,
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
