// attention scrren

import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../[Toteminstinctcompts]/TottmLayout';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AttentionIntroScreen = ({ navigation }) => {
  const handleTotemGuideGo = () => {
    const totemGuideStack = navigation.getParent();

    if (totemGuideStack?.navigate) {
      totemGuideStack.navigate('AttentionGameScreen');
    } else {
      navigation.navigate('AttentionGameScreen');
    }
  };

  return (
    <TottmLayout>
      <View style={styles.totemGuideContainer}>
        <View style={styles.totemGuideHeaderRow}>
          <LinearGradient
            colors={['#79080A', '#DF0F12']}
            style={styles.totemGuideHeaderPill}
          >
            <View style={styles.totemGuideHeaderTitleRow}>
              <Text style={styles.totemGuideHeaderTitleText}>
                Attention game
              </Text>
            </View>
          </LinearGradient>

          <View style={styles.totemGuideHeaderThumbWrap}>
            <Image
              source={require('../TotemAssets/i/apphead.png')}
              style={styles.totemGuideHeaderThumbImage}
            />
          </View>
        </View>

        <Image
          source={require('../TotemAssets/i/oboard/4.png')}
          style={styles.totemGuideIntroImageWrap}
        />

        <LinearGradient
          colors={['#FBDFBC', '#FAC57F']}
          style={styles.totemGuideCard}
        >
          <View style={styles.totemGuideCardPadding}>
            <Text style={styles.totemGuideTitle}>Attention game</Text>

            <Text style={styles.totemGuideDesc}>
              For a couple of seconds you will be shown the animals and the
              order in which they are. Remember and repeat the order.
            </Text>

            <TouchableOpacity
              style={styles.totemGuideGoWrap}
              activeOpacity={0.85}
              onPress={handleTotemGuideGo}
            >
              <LinearGradient
                colors={['#79080A', '#DF0F12']}
                style={styles.totemGuideGoButton}
              >
                <Text style={styles.totemGuideGoText}>Go</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </TottmLayout>
  );
};

const styles = StyleSheet.create({
  totemGuideContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 48,
    alignItems: 'center',
    paddingBottom: 120,
  },
  totemGuideHeaderRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  totemGuideHeaderPill: {
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FAC57F',
    minHeight: 88,
    justifyContent: 'center',
  },
  totemGuideHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuideHeaderTitleText: {
    color: '#FAC57F',
    fontSize: 22,
    fontFamily: 'Ubuntu-Bold',
  },
  totemGuideHeaderThumbWrap: {
    width: 88,
    height: 88,
    overflow: 'hidden',
  },
  totemGuideHeaderThumbImage: {
    width: '100%',
    height: '100%',
  },
  totemGuideIntroImageWrap: {
    width: 317,
    height: 317,
    marginBottom: 12,
  },
  totemGuideCard: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#79080A',
  },
  totemGuideCardPadding: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  totemGuideTitle: {
    color: '#79080A',
    fontSize: 32,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  totemGuideDesc: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
  totemGuideGoWrap: {
    width: '100%',
    marginTop: 10,
  },
  totemGuideGoButton: {
    height: 56,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FAC57F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuideGoText: {
    color: '#FAC57F',
    fontSize: 21,
    fontFamily: 'Ubuntu-Bold',
  },
});

export default AttentionIntroScreen;
