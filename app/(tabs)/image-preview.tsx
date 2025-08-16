import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { ScreenType } from './types';

interface ImagePreviewProps {
  navigateTo: (screen: ScreenType) => void;
  selectedImage: string | null;
  predictDisease: () => void;
  isLoading: boolean;
  styles: any;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  navigateTo, 
  selectedImage, 
  predictDisease, 
  isLoading, 
  styles 
}) => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#6b7c32" />
    <View style={styles.headerBar}>
      <TouchableOpacity onPress={() => navigateTo('predict')}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Prediksi Penyakit Daun</Text>
    </View>

    <ScrollView contentContainerStyle={styles.previewContent}>
      <View style={styles.imageContainer}>
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.previewImage} />}
      </View>

      <Text style={styles.previewText}>
        Gambar Berhasil Dimuat, tekan tombol prediksi untuk menganalisis penyakit
      </Text>

      <View style={styles.previewButtonsContainer}>
        <TouchableOpacity 
          style={styles.previewButton}
          onPress={() => navigateTo('predict')}
          activeOpacity={0.8}
        >
          <Ionicons name="images" size={24} color="#fff" />
          <Text style={styles.buttonText}>Pilih Ulang Gambar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.predictButton, isLoading && styles.disabledButton]}
          onPress={predictDisease}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons name="analytics" size={24} color="#fff" />
          )}
          <Text style={styles.buttonText}>
            {isLoading ? 'Memproses...' : 'Prediksi Penyakit'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tipContainer}>
        <View style={styles.tipDivider} />
        <Text style={styles.tipText}>
          Tips: Pastikan daun cabai jelas dan memiliki pencahayaan yang cukup{'\n'}
          untuk hasil deteksi yang optimal
        </Text>
      </View>
    </ScrollView>
  </SafeAreaView>
);

export default ImagePreview;