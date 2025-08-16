import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { ScreenType } from './types';

interface AboutProps {
  navigateTo: (screen: ScreenType) => void;
  styles: any;
}

const About: React.FC<AboutProps> = ({ navigateTo, styles }) => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" />
    <View style={styles.headerBar}>
      <TouchableOpacity onPress={() => navigateTo('dashboard')}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Tentang Aplikasi</Text>
    </View>

    <ScrollView contentContainerStyle={styles.aboutContent}>
      <View style={styles.characterContainer}>
        <Image source={require('../img/logo.png')} style={styles.aboutLogo} />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Deskripsi :</Text>
        <Text style={styles.cardText}>
          Aplikasi Rawit Sehat adalah aplikasi yang dapat memprediksi penyakit pada daun khusus tanaman cabai rawit. Ada 4 jenis penyakit yang dapat diprediksi yaitu daun kuning, bercak daun, daun keriting dan daun hama putih. Dengan aplikasi ini dapat memudahkan pengguna jika ingin mengetahui penyakit yang menyerang tanaman cabai beserta cara penanggulangan dan pengobatannya.{'\n\n'}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Cara Prediksi Penyakit:</Text>
        <Text style={styles.cardText}>
          1. Pada menu Utama pilih menu prediksi penyakit daun untuk memulai prediksi{'\n\n'}
          2. Pada halaman prediksi penyakit daun akan ada 2 pilihan untuk mengupload gambar, bisa dari album dan dari galeri{'\n\n'}
          3. jika menggunakan kamera maka akan membuka kamera dan dapat juga disesuaikan gambar yang diambil khusus penyakit daun cabai rawit, kemudian pilih prediksi dan akan menampilkan hasil prediksi dapat juga di simpan dalam Riwayat prediksi{'\n\n'}
          4. jika menggunakan album foto maka akan membuka album foto dan dapat juga disesuaikan gambar yang dipilih khusus penyakit daun cabai rawit, kemudian pilih prediksi dan akan menampilkan hasil prediksi dapat juga di simpan dalam Riwayat prediksi.{'\n\n'}
          5. jika memilih menu Riwayat prediksi pada bagian menu Utama maka akan menampilkan Riwayat prediksi yang sebelumnya telah disimpan{'\n\n'}
          6. jika memilih menu tentang aplikasi pada menu Utama maka akan menampilkan deskripsi dan cara menggunakan aplikasi.
        </Text>
      </View>
    </ScrollView>
  </SafeAreaView>
);

export default About;
