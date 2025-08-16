import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { PredictionResult, ScreenType } from './types';

interface DetailResultProps {
  navigateTo: (screen: ScreenType) => void;
  selectedImage: string | null;
  predictionResult: PredictionResult | null;
  saveToHistory: () => void;
  styles: any;
}

const DetailResult: React.FC<DetailResultProps> = ({ 
  navigateTo, 
  selectedImage, 
  predictionResult, 
  saveToHistory, 
  styles 
}) => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#6b7c32" />
    <View style={styles.headerBar}>
      <TouchableOpacity onPress={() => navigateTo('result')}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Rincian Prediksi Penyakit Daun</Text>
    </View>

    <ScrollView contentContainerStyle={styles.detailContent}>
      <Text style={styles.detailTitle}>Hasil Prediksi Penyakit Daun</Text>
      
      <View style={styles.detailImageContainer}>
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.detailImage} />}
      </View>

      <View style={styles.detailInfo}>
        <Text style={styles.detailLabel}>Jenis Penyakit : <Text style={styles.detailValue}>{predictionResult?.disease}</Text></Text>
        <Text style={styles.detailLabel}>Tingkat Akurat : <Text style={styles.detailValue}>{predictionResult?.accuracy}</Text></Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.detailSectionTitle}>Gejala Penyakit</Text>
        <Text style={styles.detailSectionContent}>{predictionResult?.symptoms}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.detailSectionTitle}>Pengendalian dan Pengobatan</Text>
        <Text style={styles.detailSectionContent}>{predictionResult?.treatment}</Text>
      </View>

      <View style={styles.detailButtonsRow}>
        <TouchableOpacity 
          style={styles.detailActionButton}
          onPress={() => navigateTo('dashboard')}
        >
          <Text style={styles.detailActionButtonText}>Tutup</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.detailActionButton} 
          onPress={saveToHistory}
        >
          <Text style={styles.detailActionButtonText}>Simpan ke Riwayat</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
);

export default DetailResult;