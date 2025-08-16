import { StyleSheet } from 'react-native';

const font = {
  regular: 'Jost_400Regular',
  medium: 'Jost_500Medium',
  semibold: 'Jost_600SemiBold',
  bold: 'Jost_700Bold',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  dashboardHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  dashboardTitle: {
    fontSize: 22,
    fontFamily: font.bold,
    color: '#374151',
  },
  dashboardContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  
  subtitle: {
    fontSize: 14,
    fontFamily: font.regular,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
  },
  menuContainer: {
    padding: 20,
    gap: 16,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8b9a47',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: font.medium,
    flex: 1,
  },

  // Header Bar Styles
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#6b7c32',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 30,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: font.semibold,
  },

  // Predict Screen Styles
  predictContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
  },
  illustrationContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  magnifyingGlass: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  plantStem: {
    position: 'absolute',
    left: 20,
    top: 35,
    width: 2,
    height: 30,
    backgroundColor: '#92400e',
  },
  plantLeaf: {
    position: 'absolute',
    left: 15,
    top: 30,
    width: 12,
    height: 8,
    backgroundColor: '#22c55e',
    borderRadius: 6,
    transform: [{ rotate: '-20deg' }],
  },
  glassCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#9ca3af',
    backgroundColor: 'rgba(219, 234, 254, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  glassHandle: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 4,
    backgroundColor: '#9ca3af',
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
  },
  predictTitle: {
    fontSize: 18,
    fontFamily: font.medium,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  actionButtonsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#8b9a47',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: font.medium,
  },
  tipContainer: {
    width: '100%',
    alignItems: 'center',
  },
  tipDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 16,
  },
  tipText: {
    fontSize: 12,
    fontFamily: font.regular,
    color: '#6b7280',
    textAlign: 'left',
    lineHeight: 16,
  },

  // Image Preview Styles
  previewContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: '#f3f4f6',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  previewText: {
    fontSize: 16,
    fontFamily: font.regular,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  previewButtonsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#8b9a47',
    padding: 16,
    borderRadius: 12,
  },
  predictButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#6b7c32',
    padding: 16,
    borderRadius: 12,
  },
  disabledButton: {
    opacity: 0.6,
  },

  // Result Styles
  resultContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 40,
  },
  resultCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  resultImageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#f3f4f6',
  },
  resultImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  resultTitle: {
    fontSize: 18,
    fontFamily: font.bold,
    color: '#374151',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultInfo: {
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 14,
    fontFamily: font.regular,
    color: '#374151',
    marginBottom: 4,
  },
  resultValue: {
    fontFamily: font.bold,
    color: '#6b7c32',
  },
  symptomSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: font.bold,
    color: '#374151',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    fontFamily: font.regular,
    color: '#6b7280',
    lineHeight: 20,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  actionButtonSmall: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: font.medium,
    color: '#374151',
  },
  predictAgainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#6b7c32',
    padding: 16,
    borderRadius: 12,
  },

  // Detail Result Styles
  detailContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 40,
  },
  detailTitle: {
    fontSize: 18,
    fontFamily: font.bold,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
  },
  detailImageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#f3f4f6',
  },
  detailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailInfo: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: font.regular,
    color: '#374151',
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: font.bold,
    color: '#6b7c32',
  },
  detailSection: {
    marginBottom: 16,
  },
  detailSectionTitle: {
    fontSize: 16,
    fontFamily: font.bold,
    color: '#374151',
    marginBottom: 8,
  },
  detailSectionContent: {
    fontSize: 14,
    fontFamily: font.regular,
    color: '#6b7280',
    lineHeight: 20,
  },
  detailButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    gap: 16,
  },
  detailActionButton: {
    flex: 1,
    backgroundColor: '#8b9a47',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailActionButtonText: {
    fontSize: 14,
    fontFamily: font.medium,
    color: '#fff',
  },

  // History Styles
  historyContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 40,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  historyImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyDisease: {
    fontSize: 16,
    fontFamily: font.bold,
    color: '#374151',
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 12,
    fontFamily: font.regular,
    color: '#6b7280',
    marginBottom: 2,
  },
  historyAccuracy: {
    fontSize: 12,
    fontFamily: font.medium,
    color: '#6b7c32',
  },
  deleteButton: {
    padding: 8,
  },

  // About Screen Styles
  aboutContent: {
    flexGrow: 1,
  },
  aboutContainer: {
    alignItems: 'center',
  },
  aboutLogo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: -70,
  },
  aboutVersion: {
    fontSize: 16,
    fontFamily: font.regular,
    color: '#6b7280',
    marginBottom: 16,
  },
  aboutDescription: {
    fontSize: 14,
    fontFamily: font.regular,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  aboutFeatures: {
    width: '100%',
    paddingHorizontal: 16,
  },
  featuresTitle: {
    fontSize: 16,
    fontFamily: font.bold,
    color: '#374151',
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 14,
    fontFamily: font.regular,
    color: '#374151',
    marginBottom: 4,
    lineHeight: 20,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: font.regular,
    color: '#6b7280',
  },
  emptyHistoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyHistoryText: {
    fontSize: 16,
    fontFamily: font.regular,
    color: '#6b7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyHistorySubtext: {
    fontSize: 14,
    fontFamily: font.regular,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
  logoImage: {
    width: 300,
    height: 300,
    marginBottom: -70,
    resizeMode: 'contain',
  },
  
  // Menu Icon Styles
  menuIconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 16,
  },

  characterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCard: {
    backgroundColor: '#f3f4f6',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  cardTitle: {
  fontSize: 16,
  fontFamily: font.bold,
  color: '#374151',
  marginBottom: 8,
  marginTop: 6,
  textAlign: 'center',
},
  cardText: {
    fontSize: 14,
    fontFamily: font.regular,
    color: '#374151',
    lineHeight: 20,
  },
});

export default {};
