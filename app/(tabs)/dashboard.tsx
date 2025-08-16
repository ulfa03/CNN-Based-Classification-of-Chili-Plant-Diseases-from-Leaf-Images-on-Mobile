import React from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { ScreenType } from './types';

interface DashboardProps {
  navigateTo: (screen: ScreenType) => void;
  styles: any;
}

const Dashboard: React.FC<DashboardProps> = ({ navigateTo, styles }) => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <View style={styles.dashboardHeader}>
      <Text style={styles.dashboardTitle}>Dashboard</Text>
    </View>
    
    <ScrollView contentContainerStyle={styles.dashboardContent}>
      <View style={styles.header}>
        <View style={styles.characterContainer}>
          <Image 
            source={require('../img/logo.png')}
            style={styles.logoImage}
          />
        </View>
        
        <Text style={styles.subtitle}>
          <Text style={{ fontWeight: 'bold' }}>Solusi Pintar</Text> untuk{'\n'}
          Memantau Kesehatan Daun Cabai Anda
        </Text>
      </View>
      
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigateTo('predict')}
          activeOpacity={0.8}
        >
          <Image 
            source={require('../img/search.png')}
            style={styles.menuIconImage}
          />
          <Text style={styles.menuText}>Prediksi Penyakit Daun</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigateTo('history')}
          activeOpacity={0.8}
        >
          <Image 
            source={require('../img/history.png')}
            style={styles.menuIconImage}
          />
          <Text style={styles.menuText}>Riwayat Prediksi</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigateTo('chatbot')}
          activeOpacity={0.8}
        >
          <Image 
            source={require('../img/chatbot.png')}
            style={styles.menuIconImage}
          />
          <Text style={styles.menuText}>RawitBot</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigateTo('about')}
          activeOpacity={0.8}
        >
          <Image 
            source={require('../img/about.png')}
            style={styles.menuIconImage}
          />
          <Text style={styles.menuText}>Tentang Aplikasi</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
);

export default Dashboard;