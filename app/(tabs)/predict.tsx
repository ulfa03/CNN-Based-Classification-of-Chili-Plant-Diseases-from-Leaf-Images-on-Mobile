import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ScreenType } from './types';

interface PredictProps {
  navigateTo: (screen: ScreenType) => void;
  takeFromCamera: () => void;
  selectFromGallery: () => void;
  styles: any;
  hasResult?: boolean;
  predictionResult?: {
    image: any;
    disease: string;
    accuracy: string;
    symptoms: string;
    tips: string;
  };
  onTutup?: () => void;
  onRincian?: () => void;
  onSimpanKeRiwayat?: () => void;
}

const Predict: React.FC<PredictProps> = ({ 
  navigateTo, 
  takeFromCamera, 
  selectFromGallery, 
  styles,
  hasResult = false,
  predictionResult,
  onTutup,
  onRincian,
  onSimpanKeRiwayat
}) => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#6b7c32" />
    <View style={styles.headerBar}>
      <TouchableOpacity onPress={() => navigateTo('dashboard')}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>
        {hasResult ? 'Hasil Prediksi Penyakit Daun' : 'Prediksi Penyakit Daun'}
      </Text>
    </View>

    <ScrollView contentContainerStyle={styles.predictContent}>
      {hasResult ? (
        // Layout dengan hasil prediksi
        <>
          <View style={styles.imageContainer}>
            <Image 
              source={predictionResult?.image} 
              style={styles.previewImage} 
            />
          </View>
          
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Hasil Prediksi Penyakit Daun</Text>
            
            <View style={styles.resultInfo}>
              <Text style={styles.resultLabel}>
                Jenis Penyakit: <Text style={styles.resultValue}>{predictionResult?.disease || 'Spot Leaf'}</Text>
              </Text>
            </View>
            
            <View style={styles.resultInfo}>
              <Text style={styles.resultLabel}>
                Tingkat Akurasi: <Text style={styles.resultValue}>{predictionResult?.accuracy || '99%'}</Text>
              </Text>
            </View>
            
            <View style={styles.symptomSection}>
              <Text style={styles.sectionTitle}>Gejala</Text>
              <Text style={styles.sectionContent}>
                {predictionResult?.symptoms || 'Gejala Pada Penyakit ini berupa Bercak kecil pada daun bentuk bulat dan yang berupa. Bercak mulanya berwarna sampai sekitar 0.5 cm, pusat bercak berwarna pucat dengan abu-abu dengan warna lebih putih dari warna abu-abu yang berupa dengan pinggiran bercak yang berupa abu-abu.'}
              </Text>
            </View>
            
            <View style={styles.symptomSection}>
              <Text style={styles.sectionTitle}>Tips</Text>
              <Text style={styles.sectionContent}>
                {predictionResult?.tips || 'Tips: Untuk mengetahui cara pengendalian dan pengobatan lebih lanjut untuk penyakit tersebut klik Rincian.'}
              </Text>
            </View>
            
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity 
                style={styles.actionButtonSmall}
                onPress={onTutup}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>Tutup</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButtonSmall}
                onPress={onRincian}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>Rincian</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButtonSmall}
                onPress={onSimpanKeRiwayat}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>Simpan Ke Riwayat</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
              style={styles.predictAgainButton}
              onPress={selectFromGallery}
              activeOpacity={0.8}
            >
              <Ionicons name="search" size={24} color="#fff" />
              <Text style={styles.buttonText}>Prediksi Penyakit</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // Layout awal
        <>
          <View style={styles.illustrationContainer}>
            <View style={styles.magnifyingGlass}>
              <View style={styles.plantStem} />
              <View style={styles.plantLeaf} />
              <View style={styles.glassCircle}>
                <View style={styles.glassInner} />
              </View>
              <View style={styles.glassHandle} />
            </View>
          </View>

          <Text style={styles.predictTitle}>
            Jaga Daun Cabai Anda, Mulai dari{'\n'}
            Sekarang
          </Text>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={takeFromCamera}
              activeOpacity={0.8}
            >
              <Ionicons name="camera" size={24} color="#fff" />
              <Text style={styles.buttonText}>Ambil Dari Kamera</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={selectFromGallery}
              activeOpacity={0.8}
            >
              <Ionicons name="images" size={24} color="#fff" />
              <Text style={styles.buttonText}>Pilih Dari Galeri</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      
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

export default Predict;