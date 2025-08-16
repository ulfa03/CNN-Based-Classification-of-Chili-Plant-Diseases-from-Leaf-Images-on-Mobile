import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { PredictionResult, ScreenType } from './types';

interface ResultProps {
  navigateTo: (screen: ScreenType) => void;
  selectedImage: string | null;
  predictionResult: PredictionResult | null;
  saveToHistory: () => void;
  styles: any;
}

const Result: React.FC<ResultProps> = ({ 
  navigateTo, 
  selectedImage, 
  predictionResult, 
  saveToHistory, 
  styles 
}) => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#6b7c32" />
    <View style={styles.headerBar}>
      <TouchableOpacity onPress={() => navigateTo('predict')}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Hasil Prediksi Penyakit Daun</Text>
    </View>

    <ScrollView contentContainerStyle={styles.resultContent}>
      <View style={styles.resultCard}>
        <View style={styles.resultImageContainer}>
          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.resultImage} />}
        </View>

        <Text style={styles.resultTitle}>Hasil Prediksi Penyakit Daun</Text>
        
        <View style={styles.resultInfo}>
          <Text style={styles.resultLabel}>Jenis Penyakit : <Text style={styles.resultValue}>{predictionResult?.disease}</Text></Text>
          <Text style={styles.resultLabel}>Tingkat Akurat : <Text style={styles.resultValue}>{predictionResult?.accuracy}</Text></Text>
        </View>

        <View style={styles.symptomSection}>
          <Text style={styles.sectionTitle}>Gejala</Text>
          <Text style={styles.sectionContent}>{predictionResult?.symptoms}</Text>
        </View>

        <View style={styles.actionButtonsRow}>
          <TouchableOpacity 
            style={styles.actionButtonSmall}
            onPress={() => navigateTo('dashboard')}
          >
            <Text style={styles.actionButtonText}>Tutup</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButtonSmall}
            onPress={() => navigateTo('detailResult')}
          >
            <Text style={styles.actionButtonText}>Rincian</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButtonSmall} 
            onPress={saveToHistory}
          >
            <Text style={styles.actionButtonText}>Simpan ke Riwayat</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.predictAgainButton}
          onPress={() => navigateTo('predict')}
          activeOpacity={0.8}
        >
          <Ionicons name="analytics" size={24} color="#fff" />
          <Text style={styles.buttonText}>Prediksi Lagi</Text>
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

export default Result;