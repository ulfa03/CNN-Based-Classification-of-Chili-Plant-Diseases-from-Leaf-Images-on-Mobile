import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Platform } from 'react-native';

import About from './about';
import Chatbot from './chatbot';
import Dashboard from './dashboard';
import DetailResult from './detail-result';
import History from './history';
import ImagePreview from './image-preview';
import Predict from './predict';
import Result from './result';
import { styles } from './styles';
import { API_BASE_URL, diseaseInfo, HistoryItem, PredictionResult, ScreenType } from './types';

export default function RawitSehatApp() {
  const [screen, setScreen] = useState<ScreenType>('dashboard');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<any>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);

  // --- INI SAJA yang penting untuk "always back to dashboard" ---
  useEffect(() => {
    if (Platform.OS === 'android') {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        if (screen !== 'dashboard') {
          setScreen('dashboard');
          return true; // block exit app
        }
        return false; // izinkan keluar app
      });
      return () => subscription.remove();
    }
  }, [screen]);
  // ----------------------------------------------------------------

  const navigateTo = (nextScreen: ScreenType) => {
    setScreen(nextScreen);
  };

  const selectFromGallery = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access gallery is required!');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        setSelectedImageFile(result.assets[0]);
        navigateTo('imagePreview');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image from gallery');
    }
  };

  const takeFromCamera = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera is required!');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        setSelectedImageFile(result.assets[0]);
        navigateTo('imagePreview');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const predictDisease = async () => {
    if (!selectedImageFile) {
      Alert.alert('Error', 'No image selected');
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: selectedImageFile.uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      console.log('Mengirim permintaan klasifikasi ke server...');
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error('Failed to get prediction from server');
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      const diseaseData = diseaseInfo[data.predicted_class as keyof typeof diseaseInfo] || {
        symptoms: 'Informasi gejala tidak tersedia.',
        treatment: 'Konsultasikan dengan ahli pertanian untuk penanganan yang tepat.'
      };
      const result: PredictionResult = {
        disease: data.predicted_class,
        accuracy: `${data.confidence}%`,
        symptoms: diseaseData.symptoms,
        treatment: diseaseData.treatment,
        class_index: data.class_index
      };
      setPredictionResult(result);
      navigateTo('result');
    } catch (error: any) {
      if (error.name === 'AbortError') {
        Alert.alert('Timeout', 'Server terlalu lama merespons. Coba lagi.');
      } else {
        Alert.alert('Error', `Prediction failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveToHistory = () => {
    if (predictionResult && selectedImage) {
      const newHistoryItem: HistoryItem = {
        id: Date.now(),
        disease: predictionResult.disease,
        date: new Date().toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        accuracy: predictionResult.accuracy,
        image: selectedImage,
        symptoms: predictionResult.symptoms,
        treatment: predictionResult.treatment
      };
      setHistoryData(prev => [newHistoryItem, ...prev]);
      Alert.alert('Success', 'Hasil prediksi berhasil disimpan ke riwayat');
    }
  };

  const deleteHistoryItem = (id: number) => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin menghapus item ini?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => {
          setHistoryData(prev => prev.filter(item => item.id !== id));
        }}
      ]
    );
  };

  switch (screen) {
    case 'dashboard':
      return <Dashboard navigateTo={navigateTo} styles={styles} />;
    case 'predict':
      return <Predict navigateTo={navigateTo} takeFromCamera={takeFromCamera} selectFromGallery={selectFromGallery} styles={styles} />;
    case 'imagePreview':
      return <ImagePreview navigateTo={navigateTo} selectedImage={selectedImage} predictDisease={predictDisease} isLoading={isLoading} styles={styles} />;
    case 'result':
      return <Result navigateTo={navigateTo} selectedImage={selectedImage} predictionResult={predictionResult} saveToHistory={saveToHistory} styles={styles} />;
    case 'detailResult':
      return <DetailResult navigateTo={navigateTo} selectedImage={selectedImage} predictionResult={predictionResult} saveToHistory={saveToHistory} styles={styles} />;
    case 'history':
      return <History navigateTo={navigateTo} historyData={historyData} deleteHistoryItem={deleteHistoryItem} setSelectedImage={setSelectedImage} setPredictionResult={setPredictionResult} styles={styles} />;
    case 'chatbot':
      return <Chatbot navigateTo={navigateTo} styles={styles} />;
    case 'about':
      return <About navigateTo={navigateTo} styles={styles} />;
    default:
      return <Dashboard navigateTo={navigateTo} styles={styles} />;
  }
}
