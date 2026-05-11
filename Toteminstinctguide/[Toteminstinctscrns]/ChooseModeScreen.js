// choose mode scrren

import TottmLayout from '../[Toteminstinctcompts]/TottmLayout';
import VoiceModeIntro from '../[Toteminstinctcompts]/VoiceModeIntro';

import React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ChooseModeScreen = ({ navigation }) => {
  const handleTotemGuideGo = () => {
    const totemGuideStack = navigation.getParent();

    if (totemGuideStack?.navigate) {
      totemGuideStack.navigate('VoiceModeScreen');
    } else {
      navigation.navigate('VoiceModeScreen');
    }
  };

  const renderTotemGuideHeader = () => (
    <View style={styles.totemGuideHeaderRow}>
      <LinearGradient
        colors={['#79080A', '#DF0F12']}
        style={styles.totemGuideHeaderPill}
      >
        <View style={styles.totemGuideHeaderTitleRow}>
          <Text style={styles.totemGuideHeaderTitleText}>
            Voice totem beast
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
  );

  return (
    <TottmLayout>
      <View style={styles.totemGuideContainer}>
        {renderTotemGuideHeader()}
        <VoiceModeIntro onGoPress={handleTotemGuideGo} />
      </View>
    </TottmLayout>
  );
};

const styles = StyleSheet.create({
  totemGuideContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 48,
    paddingBottom: 120,
    alignItems: 'center',
  },
  totemGuideHeaderRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 34,
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
});

export default ChooseModeScreen;
