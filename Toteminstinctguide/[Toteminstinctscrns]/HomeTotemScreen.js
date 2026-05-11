// home
import TottmLayout from '../[Toteminstinctcompts]/TottmLayout';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HomeTotemScreen = () => {
  const totemGuideNavigation = useNavigation();

  return (
    <TottmLayout>
      <View style={styles.totemGuideHomeContainer}>
        <View style={styles.totemGuideHomeImageFrame}>
          <Image source={require('../TotemAssets/i/homelog.png')} />
        </View>

        <TouchableOpacity
          style={styles.totemGuideHomePrimaryButtonWrap}
          activeOpacity={0.85}
          onPress={() => totemGuideNavigation.navigate('ChooseModeScreen')}
        >
          <LinearGradient
            colors={['#79080A', '#DF0F12']}
            style={styles.totemGuideHomePrimaryButton}
          >
            <Text style={styles.totemGuideHomePrimaryText}>Totem beast</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.totemGuideHomeSecondaryButtonWrap}
          activeOpacity={0.85}
          onPress={() => totemGuideNavigation.navigate('BeastsAdviceScreen')}
        >
          <LinearGradient
            colors={['#FBDFBC', '#FAC57F']}
            style={styles.totemGuideHomeSecondaryButton}
          >
            <Text style={styles.totemGuideHomeSecondaryText}>
              Beast's advice
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.totemGuideHomeSecondaryButtonWrap}
          activeOpacity={0.85}
          onPress={() => totemGuideNavigation.navigate('RiddlesScreen')}
        >
          <LinearGradient
            colors={['#FBDFBC', '#FAC57F']}
            style={styles.totemGuideHomeSecondaryButton}
          >
            <Text style={styles.totemGuideHomeSecondaryText}>
              Riddles of the beast
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.totemGuideHomeBottomRow}>
          <TouchableOpacity
            style={styles.totemGuideHomeIconButtonWrap}
            activeOpacity={0.85}
            onPress={() => totemGuideNavigation.navigate('SavedAdvicesScreen')}
          >
            <LinearGradient
              colors={['#FBDFBC', '#FAC57F']}
              style={styles.totemGuideHomeIconButton}
            >
              <Image source={require('../TotemAssets/i/saved.png')} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.totemGuideHomeIconButtonWrap}
            activeOpacity={0.85}
            onPress={() => totemGuideNavigation.navigate('CollectionScreen')}
          >
            <LinearGradient
              colors={['#FBDFBC', '#FAC57F']}
              style={styles.totemGuideHomeIconButton}
            >
              <Image source={require('../TotemAssets/i/coll.png')} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TottmLayout>
  );
};

const styles = StyleSheet.create({
  totemGuideHomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 48,
  },
  totemGuideHomeImageFrame: {
    alignItems: 'center',
  },
  totemGuideHomePrimaryButtonWrap: {
    width: '100%',
    marginTop: 26,
    alignItems: 'center',
  },
  totemGuideHomePrimaryButton: {
    width: '95%',
    height: 80,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
  },
  totemGuideHomePrimaryText: {
    color: '#FAC57F',
    fontSize: 22,
    fontFamily: 'Ubuntu-Bold',
  },
  totemGuideHomeSecondaryButtonWrap: {
    width: '100%',
    marginTop: 14,
    alignItems: 'center',
  },
  totemGuideHomeSecondaryButton: {
    width: '86%',
    height: 74,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#79080A',
  },
  totemGuideHomeSecondaryText: {
    color: '#79080A',
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
  },
  totemGuideHomeBottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  totemGuideHomeIconButtonWrap: {
    marginHorizontal: 12,
  },
  totemGuideHomeIconButton: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#79080A',
  },
});

export default HomeTotemScreen;
