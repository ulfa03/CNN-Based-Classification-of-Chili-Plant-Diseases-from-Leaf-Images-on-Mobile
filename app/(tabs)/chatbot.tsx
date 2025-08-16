// import { ArrowLeft, ChevronLeft, Send } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { diseaseInfo, ScreenType } from './types';

interface ChatbotProps {
  navigateTo: (screen: ScreenType) => void;
  styles: any;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string; 
}

type MenuLevel = 'main' | 'disease' | 'leaf-type' | 'treatment';

const Chatbot: React.FC<ChatbotProps> = ({ navigateTo, styles }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Saya RawitBot, asisten virtual untuk membantu Anda dengan informasi tanaman cabai. Silakan pilih kategori pertanyaan di bawah ini:',
      isBot: true,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [currentMenu, setCurrentMenu] = useState<MenuLevel>('main');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  const mainMenuOptions = useMemo(() => [
    { id: 'disease', text: '🦠 Jenis Penyakit', description: 'Informasi tentang penyakit tanaman cabai' },
    { id: 'leaf-type', text: '🍃 Jenis Daun', description: 'Mengenali kondisi daun cabai' },
    { id: 'treatment', text: '💊 Cara Merawat', description: 'Panduan perawatan tanaman cabai' }
  ], []);

  const diseaseMenuOptions = useMemo(() => [
    { id: 'Leaf Curl', text: 'Penyakit Keriting Daun', description: 'Gejala dan pengobatan keriting daun' },
    { id: 'Yellowish', text: 'Virus Gemini', description: 'Informasi virus gemini pada cabai' },
    { id: 'Leaf Spot', text: 'Bercak Daun', description: 'Penyakit bercak daun cabai' },
    { id: 'Whitefly', text: 'Kutu Kebul', description: 'Hama kutu kebul pada cabai' }
  ], []);

  const leafTypeMenuOptions = useMemo(() => [
    { id: 'Healthy', text: 'Daun Sehat', description: 'Ciri-ciri daun cabai yang sehat' },
    { id: 'Leaf Curl', text: 'Daun Keriting', description: 'Daun dengan gejala keriting' },
    { id: 'Yellowish', text: 'Daun Menguning', description: 'Daun dengan gejala menguning' },
    { id: 'Leaf Spot', text: 'Daun Berbercak', description: 'Daun dengan bercak-bercak' }
  ], []);

  const treatmentMenuOptions = useMemo(() => [
    { id: 'Leaf Curl', text: 'Pengobatan Keriting Daun', description: 'Cara mengobati keriting daun' },
    { id: 'Yellowish', text: 'Pengobatan Virus Gemini', description: 'Cara mengobati virus gemini' },
    { id: 'Leaf Spot', text: 'Pengobatan Bercak Daun', description: 'Cara mengobati bercak daun' },
    { id: 'Whitefly', text: 'Pengobatan Kutu Kebul', description: 'Cara mengobati kutu kebul' },
    { id: 'Healthy', text: 'Perawatan Daun Sehat', description: 'Cara mempertahankan daun sehat' }
  ], []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const scrollToBottom = useCallback(() => {
    try {
      if (scrollViewRef.current && isMountedRef.current) {
        const timer = setTimeout(() => {
          if (scrollViewRef.current && isMountedRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }
        }, 100);
        return () => clearTimeout(timer);
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    const cleanup = scrollToBottom();
    return cleanup;
  }, [messages, scrollToBottom]);

  const addBotMessage = useCallback((text: string) => {
    if (!text || typeof text !== 'string' || !isMountedRef.current) return;
    try {
      const botMessage: Message = {
        id: `bot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text: text.trim(),
        isBot: true,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => {
        if (!isMountedRef.current) return prev;
        return [...prev, botMessage];
      });
    } catch (error) {}
  }, []);

  const getOptionText = useCallback((diseaseKey: string, context: 'disease' | 'leaf-type' | 'treatment') => {
    try {
      if (!diseaseKey || typeof diseaseKey !== 'string') return 'Pilihan tidak valid';
      switch (context) {
        case 'disease':
          return diseaseMenuOptions.find(opt => opt.id === diseaseKey)?.text || diseaseKey;
        case 'leaf-type':
          return leafTypeMenuOptions.find(opt => opt.id === diseaseKey)?.text || diseaseKey;
        case 'treatment':
          return treatmentMenuOptions.find(opt => opt.id === diseaseKey)?.text || diseaseKey;
        default:
          return diseaseKey;
      }
    } catch (error) {
      return diseaseKey || 'Pilihan tidak valid';
    }
  }, [diseaseMenuOptions, leafTypeMenuOptions, treatmentMenuOptions]);

  const handleMainMenuSelection = useCallback((optionId: string) => {
    if (isLoading || !isMountedRef.current || !optionId) return;
    try {
      setIsLoading(true);
      const selectedOption = mainMenuOptions.find(opt => opt.id === optionId);
      if (!selectedOption) {
        setIsLoading(false);
        return;
      }
      const userMessage: Message = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text: selectedOption.text,
        isBot: false,
        timestamp: new Date().toISOString()
      };
      if (isMountedRef.current) setMessages(prev => [...prev, userMessage]);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        try {
          let responseText = '';
          let newMenu: MenuLevel = 'main';
          switch (optionId) {
            case 'disease':
              responseText = 'Pilih jenis penyakit yang ingin Anda ketahui:';
              newMenu = 'disease';
              break;
            case 'leaf-type':
              responseText = 'Pilih jenis daun yang ingin Anda ketahui:';
              newMenu = 'leaf-type';
              break;
            case 'treatment':
              responseText = 'Pilih jenis perawatan yang ingin Anda ketahui:';
              newMenu = 'treatment';
              break;
            default:
              responseText = 'Pilihan tidak valid. Silakan pilih dari menu yang tersedia.';
          }
          if (isMountedRef.current) {
            addBotMessage(responseText);
            setCurrentMenu(newMenu);
          }
        } catch (error) {
          if (isMountedRef.current) addBotMessage('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
          if (isMountedRef.current) setIsLoading(false);
        }
      }, 500);
    } catch (error) {
      if (isMountedRef.current) {
        setIsLoading(false);
        addBotMessage('Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  }, [isLoading, addBotMessage, mainMenuOptions]);

  const handleSubMenuSelection = useCallback((diseaseKey: string, context: 'disease' | 'leaf-type' | 'treatment') => {
    if (isLoading || !isMountedRef.current || !diseaseKey || !context) return;
    try {
      setIsLoading(true);
      const userMessage: Message = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text: getOptionText(diseaseKey, context),
        isBot: false,
        timestamp: new Date().toISOString()
      };
      if (isMountedRef.current) setMessages(prev => [...prev, userMessage]);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        try {
          let responseText = '';
          const diseaseData = diseaseInfo?.[diseaseKey as keyof typeof diseaseInfo];
          if (diseaseData) {
            if (context === 'disease' || context === 'leaf-type') {
              responseText = `${getOptionText(diseaseKey, context)}:\n\n${diseaseData.symptoms || 'Informasi gejala tidak tersedia'}`;
            } else if (context === 'treatment') {
              responseText = `${getOptionText(diseaseKey, context)}:\n\n${diseaseData.treatment || 'Informasi pengobatan tidak tersedia'}`;
            }
          } else {
            responseText = 'Maaf, informasi tidak tersedia untuk pilihan ini.';
          }
          if (isMountedRef.current) addBotMessage(responseText);
          const returnTimeout = setTimeout(() => {
            if (isMountedRef.current) {
              addBotMessage('Silakan pilih kategori pertanyaan lainnya atau ketik pertanyaan Anda:');
              setCurrentMenu('main');
            }
          }, 1000);
          timeoutRef.current = returnTimeout;
        } catch (error) {
          if (isMountedRef.current) addBotMessage('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
          if (isMountedRef.current) setIsLoading(false);
        }
      }, 500);
    } catch (error) {
      if (isMountedRef.current) {
        setIsLoading(false);
        addBotMessage('Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  }, [isLoading, addBotMessage, getOptionText]);

  const handleBackToMainMenu = useCallback(() => {
    if (isLoading || !isMountedRef.current) return;
    try {
      addBotMessage('Silakan pilih kategori pertanyaan:');
      setCurrentMenu('main');
    } catch (error) {}
  }, [isLoading, addBotMessage]);

  const getBotResponse = useCallback((userMessage: string): string => {
    if (!userMessage || typeof userMessage !== 'string') {
      return 'Maaf, saya belum memahami pertanyaan Anda. Silakan pilih dari menu yang tersedia atau tanyakan seputar penyakit tanaman cabai.';
    }
    try {
      const message = userMessage.toLowerCase().trim();
      if (message.includes('keriting') || message.includes('curl')) {
        const diseaseData = diseaseInfo?.['Leaf Curl'];
        return diseaseData ?
          `Penyakit keriting daun pada cabai:\n\n${diseaseData.symptoms || 'Informasi gejala tidak tersedia'}\n\nCara pengobatan:\n${diseaseData.treatment || 'Informasi pengobatan tidak tersedia'}` :
          'Informasi tentang penyakit keriting daun tidak tersedia.';
      }
      if (message.includes('virus gemini') || message.includes('yellowish') || message.includes('kuning')) {
        const diseaseData = diseaseInfo?.['Yellowish'];
        return diseaseData ?
          `Virus gemini pada cabai:\n\n${diseaseData.symptoms || 'Informasi gejala tidak tersedia'}\n\nCara pengobatan:\n${diseaseData.treatment || 'Informasi pengobatan tidak tersedia'}` :
          'Informasi tentang virus gemini tidak tersedia.';
      }
      if (message.includes('bercak daun') || message.includes('leaf spot') || message.includes('bercak')) {
        const diseaseData = diseaseInfo?.['Leaf Spot'];
        return diseaseData ?
          `Penyakit bercak daun pada cabai:\n\n${diseaseData.symptoms || 'Informasi gejala tidak tersedia'}\n\nCara pengobatan:\n${diseaseData.treatment || 'Informasi pengobatan tidak tersedia'}` :
          'Informasi tentang penyakit bercak daun tidak tersedia.';
      }
      if (message.includes('kutu kebul') || message.includes('whitefly') || message.includes('kutu')) {
        const diseaseData = diseaseInfo?.['Whitefly'];
        return diseaseData ?
          `Kutu kebul pada cabai:\n\n${diseaseData.symptoms || 'Informasi gejala tidak tersedia'}\n\nCara pengobatan:\n${diseaseData.treatment || 'Informasi pengobatan tidak tersedia'}` :
          'Informasi tentang kutu kebul tidak tersedia.';
      }
      if (message.includes('sehat') || message.includes('healthy') || message.includes('normal')) {
        const diseaseData = diseaseInfo?.['Healthy'];
        return diseaseData ?
          `Daun cabai yang sehat:\n\n${diseaseData.symptoms || 'Informasi tidak tersedia'}\n\nPerawatan:\n${diseaseData.treatment || 'Informasi perawatan tidak tersedia'}` :
          'Informasi tentang daun sehat tidak tersedia.';
      }
      if (message.includes('halo') || message.includes('hai') || message.includes('help')) {
        return 'Halo! Saya RawitBot, asisten virtual untuk membantu Anda dengan pertanyaan seputar tanaman cabai. Silakan pilih menu di bawah atau ketik pertanyaan Anda.';
      }
      if (message.includes('menu') || message.includes('kembali') || message.includes('back')) {
        return 'Silakan pilih kategori pertanyaan:';
      }
      return 'Maaf, saya belum memahami pertanyaan Anda. Silakan pilih dari menu yang tersedia atau tanyakan seputar penyakit tanaman cabai.';
    } catch (error) {
      return 'Terjadi kesalahan dalam memproses pertanyaan Anda. Silakan coba lagi.';
    }
  }, []);

  const formatTime = useCallback((timestamp: string | Date) => {
    try {
      let dateObj: Date;
      if (typeof timestamp === 'string') {
        dateObj = new Date(timestamp);
      } else {
        dateObj = timestamp;
      }
      if (!dateObj || isNaN(dateObj.getTime())) return '--:--';
      return dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return '--:--';
    }
  }, []);

  const renderMenuOptions = useCallback(() => {
    if (!isMountedRef.current) return null;
    try {
      let options: any[] = [];
      let showBackButton = false;
      switch (currentMenu) {
        case 'main':
          options = mainMenuOptions;
          break;
        case 'disease':
          options = diseaseMenuOptions;
          showBackButton = true;
          break;
        case 'leaf-type':
          options = leafTypeMenuOptions;
          showBackButton = true;
          break;
        case 'treatment':
          options = treatmentMenuOptions;
          showBackButton = true;
          break;
        default:
          options = [];
      }
      if (!options || options.length === 0) return null;
      return (
        <View style={chatStyles.questionsContainer}>
          {showBackButton && (
            <TouchableOpacity
              style={chatStyles.backButton}
              onPress={handleBackToMainMenu}
              disabled={isLoading}
            >
              {/* <ArrowLeft color="#6b7c32" size={16} /> */}
              <Text style={{fontSize: 16, color: "#6b7c32", marginRight: 4}}>⬅️</Text>
              <Text style={chatStyles.backButtonText}>Kembali ke Menu Utama</Text>
            </TouchableOpacity>
          )}
          {options.map((option, index) => {
            if (!option || !option.id) return null;
            return (
              <TouchableOpacity
                key={`${option.id}_${index}`}
                style={[chatStyles.questionButton, isLoading && chatStyles.disabledButton]}
                onPress={() => {
                  if (isLoading || !isMountedRef.current) return;
                  if (currentMenu === 'main') {
                    handleMainMenuSelection(option.id);
                  } else {
                    handleSubMenuSelection(option.id, currentMenu);
                  }
                }}
                disabled={isLoading}
              >
                <Text style={chatStyles.questionText}>{option.text}</Text>
                {option.description && (
                  <Text style={chatStyles.questionDescription}>{option.description}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      );
    } catch (error) {
      return null;
    }
  }, [currentMenu, isLoading, handleBackToMainMenu, handleMainMenuSelection, handleSubMenuSelection, mainMenuOptions, diseaseMenuOptions, leafTypeMenuOptions, treatmentMenuOptions]);

  const handleNavigation = useCallback(() => {
    try {
      if (navigateTo && typeof navigateTo === 'function') {
        navigateTo('dashboard');
      }
    } catch (error) {}
  }, [navigateTo]);

  if (!styles) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#f5f5f5' }]}>
      <StatusBar barStyle="light-content" backgroundColor="#6b7c32" />
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={handleNavigation}>
          {/* <ChevronLeft color="#fff" size={24} /> */}
          <Text style={{fontSize: 24, color: "#fff"}}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RawitBot</Text>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => {
            if (!message || !message.id) return null;
            return (
              <View key={message.id} style={[
                chatStyles.messageContainer,
                message.isBot ? chatStyles.botMessage : chatStyles.userMessage
              ]}>
                <View style={[
                  chatStyles.messageBubble,
                  message.isBot ? chatStyles.botBubble : chatStyles.userBubble
                ]}>
                  <Text style={[
                    chatStyles.messageText,
                    message.isBot ? chatStyles.botText : chatStyles.userText
                  ]}>
                    {message.text || ''}
                  </Text>
                  <Text style={[
                    chatStyles.timeText,
                    message.isBot ? chatStyles.botTimeText : chatStyles.userTimeText
                  ]}>
                    {formatTime(message.timestamp)}
                  </Text>
                </View>
              </View>
            );
          })}
          {/* Menu Options */}
          {renderMenuOptions()}
        </ScrollView>
        {/* Input Area */}
        <View style={chatStyles.inputContainer}>
          <TextInput
            style={chatStyles.textInput}
            placeholder="Ketik Pesan atau pilih menu di atas..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[chatStyles.sendButton, (!inputText?.trim() || isLoading) && chatStyles.disabledButton]}
            onPress={() => {
              if (isLoading || !inputText?.trim() || !isMountedRef.current) return;
              try {
                setIsLoading(true);
                const messageText = inputText.trim();
                const userMessage: Message = {
                  id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                  text: messageText,
                  isBot: false,
                  timestamp: new Date().toISOString()
                };
                if (isMountedRef.current) {
                  setMessages(prev => [...prev, userMessage]);
                  setInputText('');
                }
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                  if (!isMountedRef.current) return;
                  try {
                    const botResponse: Message = {
                      id: `bot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                      text: getBotResponse(messageText),
                      isBot: true,
                      timestamp: new Date().toISOString()
                    };
                    if (isMountedRef.current) setMessages(prev => [...prev, botResponse]);
                    if (messageText.toLowerCase().includes('menu') || messageText.toLowerCase().includes('kembali')) {
                      const menuTimeout = setTimeout(() => {
                        if (isMountedRef.current) setCurrentMenu('main');
                      }, 500);
                      timeoutRef.current = menuTimeout;
                    }
                  } catch (error) {
                    if (isMountedRef.current) addBotMessage('Terjadi kesalahan. Silakan coba lagi.');
                  } finally {
                    if (isMountedRef.current) setIsLoading(false);
                  }
                }, 1000);
              } catch (error) {
                if (isMountedRef.current) {
                  setIsLoading(false);
                  addBotMessage('Terjadi kesalahan. Silakan coba lagi.');
                }
              }
            }}
            disabled={!inputText?.trim() || isLoading}
          >
            {/* <Send color="#fff" size={20} /> */}
            <Text style={{fontSize: 20, color: "#fff"}}>📤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const chatStyles = StyleSheet.create({
  messageContainer: { marginVertical: 4, },
  botMessage: { alignItems: 'flex-start', },
  userMessage: { alignItems: 'flex-end', },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 16, position: 'relative', },
  botBubble: { backgroundColor: '#fff', borderBottomLeftRadius: 4, },
  userBubble: { backgroundColor: '#8b9a47', borderBottomRightRadius: 4, },
  messageText: { fontSize: 14, lineHeight: 18, },
  botText: { color: '#374151', },
  userText: { color: '#fff', },
  timeText: { fontSize: 11, marginTop: 4, alignSelf: 'flex-end', },
  botTimeText: { color: '#9ca3af', },
  userTimeText: { color: 'rgba(255, 255, 255, 0.8)', },
  questionsContainer: { marginTop: 16, },
  backButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#6b7c32', },
  backButtonText: { fontSize: 14, color: '#6b7c32', marginLeft: 8, fontWeight: '600', },
  questionButton: { backgroundColor: '#e5e7eb', padding: 12, borderRadius: 8, marginBottom: 8, borderLeftWidth: 4, borderLeftColor: '#8b9a47', },
  questionText: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4, },
  questionDescription: { fontSize: 12, color: '#6b7280', },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb', },
  textInput: { flex: 1, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 12, marginRight: 8, maxHeight: 100, fontSize: 14, },
  sendButton: { backgroundColor: '#8b9a47', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', },
  disabledButton: { opacity: 0.5, },
});

export default Chatbot;
