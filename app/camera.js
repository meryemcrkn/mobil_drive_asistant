import { Camera } from 'expo-camera';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [error, setError] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        // Önce mevcut izinleri kontrol et
        const { status: existingStatus } = await Camera.getCameraPermissionsAsync();
        
        if (existingStatus === 'granted') {
          setHasPermission(true);
          return;
        }

        // İzin yoksa yeni izin iste
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');

        if (status !== 'granted') {
          Alert.alert(
            'Kamera İzni Gerekli',
            'Bu özelliği kullanabilmek için kamera iznine ihtiyacımız var.',
            [
              {
                text: 'Tamam',
                onPress: () => router.back(),
                style: 'cancel'
              }
            ]
          );
        }
      } catch (err) {
        console.log('Kamera izni hatası:', err);
        setError('Kamera izni alınırken bir hata oluştu');
        Alert.alert(
          'Hata',
          'Kamera izni alınırken bir hata oluştu. Lütfen uygulamayı yeniden başlatın.',
          [
            {
              text: 'Tamam',
              onPress: () => router.back()
            }
          ]
        );
      }
    })();
  }, []);

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.back()}>
          <Text style={styles.buttonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6b48ff" />
        <Text style={styles.text}>Kamera izni isteniyor...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Kamera erişimi reddedildi</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.back()}>
          <Text style={styles.buttonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onCameraReady={handleCameraReady}
        ratio={Platform.OS === 'ios' ? '16:9' : '4:3'}
        useCamera2Api={Platform.OS === 'android'}
      >
        {!isCameraReady && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.text}>Kamera hazırlanıyor...</Text>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.back()}>
            <Text style={styles.buttonText}>Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  button: {
    backgroundColor: '#6b48ff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    marginBottom: 20,
  },
});

export default CameraScreen;
