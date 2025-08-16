import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { HistoryItem, PredictionResult, ScreenType } from './types';

interface HistoryProps {
  navigateTo: (screen: ScreenType) => void;
  historyData: HistoryItem[];
  deleteHistoryItem: (id: number) => void;
  setSelectedImage: (uri: string) => void;
  setPredictionResult: (result: PredictionResult) => void;
  styles: any;
}

const History: React.FC<HistoryProps> = ({ 
  navigateTo, 
  historyData, 
  deleteHistoryItem, 
  setSelectedImage, 
  setPredictionResult, 
  styles 
}) => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#6b7c32" />
    <View style={styles.headerBar}>
      <TouchableOpacity onPress={() => navigateTo('dashboard')}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Riwayat Prediksi</Text>
    </View>
    
    <ScrollView contentContainerStyle={styles.historyContent}>
      {historyData.length === 0 ? (
        <View style={styles.emptyHistoryContainer}>
          <Ionicons name="document-text-outline" size={64} color="#9ca3af" />
          <Text style={styles.emptyHistoryText}>Belum ada riwayat prediksi</Text>
          <Text style={styles.emptyHistorySubtext}>
            Lakukan prediksi penyakit daun untuk melihat riwayat di sini
          </Text>
        </View>
      ) : (
        historyData.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.historyItem}
            onPress={() => {
              setSelectedImage(item.image);
              setPredictionResult({
                disease: item.disease,
                accuracy: item.accuracy,
                symptoms: item.symptoms,
                treatment: item.treatment,
                class_index: 0
              });
              navigateTo('detailResult');
            }}
          >
            <Image source={{ uri: item.image }} style={styles.historyImage} />
            <View style={styles.historyInfo}>
              <Text style={styles.historyDisease}>{item.disease}</Text>
              <Text style={styles.historyDate}>{item.date}</Text>
              <Text style={styles.historyAccuracy}>Akurasi : {item.accuracy}</Text>
            </View>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => deleteHistoryItem(item.id)}
            >
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  </SafeAreaView>
);

export default History;