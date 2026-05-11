import React, { useEffect, useState } from 'react';
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../[Toteminstinctcompts]/TottmLayout';

const TOTAL_ROUNDS = 2;
const WALLPAPER_UNLOCKED_KEY = '@Riddles_wallpaperUnlocked';
const WALLPAPER_WIN_COUNT_KEY = '@Riddles_wallpaperWinCount';
const WALLPAPER_COUNT = 7;

const WALLPAPERS = [
  require('../TotemAssets/i/wallpapers/1.png'),
  require('../TotemAssets/i/wallpapers/2.png'),
  require('../TotemAssets/i/wallpapers/3.png'),
  require('../TotemAssets/i/wallpapers/4.png'),
  require('../TotemAssets/i/wallpapers/5.png'),
  require('../TotemAssets/i/wallpapers/6.png'),
  require('../TotemAssets/i/wallpapers/7.png'),
];

const RiddlesResultScreen = ({ navigation, route }) => {
  const riddles = route?.params?.riddles || [];
  const answers = route?.params?.answers || [];
  const [wonWallpaperIndex, setWonWallpaperIndex] = useState(null);

  const correctCount = riddles.length
    ? answers.reduce(
        (acc, ans, i) => acc + (riddles[i].correctIndex === ans ? 1 : 0),
        0,
      )
    : 0;

  const wonWallpaper = correctCount >= TOTAL_ROUNDS;

  useEffect(() => {
    if (!riddles.length) return;

    if (wonWallpaper) {
      AsyncStorage.setItem(WALLPAPER_UNLOCKED_KEY, 'true');
      setWonWallpaperIndex(0);

      AsyncStorage.getItem(WALLPAPER_WIN_COUNT_KEY).then(raw => {
        const prev = Math.min(parseInt(raw || '0', 10), 999);
        const next = prev + 1;
        AsyncStorage.setItem(WALLPAPER_WIN_COUNT_KEY, String(next));
        setWonWallpaperIndex((next - 1) % WALLPAPER_COUNT);
      });
    } else {
      setWonWallpaperIndex(null);
    }
  }, [riddles.length, wonWallpaper]);

  const handleShare = () => {
    Share.share({
      message: `Riddles of the beast: I answered ${correctCount} out of ${TOTAL_ROUNDS} riddles correctly!`,
    });
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
                Riddles of the beast
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

        {wonWallpaper && wonWallpaperIndex !== null ? (
          <View style={styles.totemGuideWallpaperWrap}>
            <Image
              source={WALLPAPERS[wonWallpaperIndex]}
              style={styles.totemGuideWallpaperImage}
              resizeMode="cover"
            />
          </View>
        ) : (
          <View style={styles.totemGuideIntroImageWrap}>
            <Image source={require('../TotemAssets/i/riddlesScrn.png')} />
          </View>
        )}

        <LinearGradient
          colors={['#FBDFBC', '#FAC57F']}
          style={styles.totemGuideResultCard}
        >
          <View style={styles.totemGuideResultCardPadding}>
            <Text style={styles.totemGuideResultTitle}>Result</Text>
            <Text style={styles.totemGuideResultText}>
              {wonWallpaper
                ? `You answered ${correctCount} out of ${TOTAL_ROUNDS} riddles correctly, so you will receive a collection wallpaper. You can download the wallpaper in the 'Collection' tab.`
                : `You answered ${correctCount} out of ${TOTAL_ROUNDS} riddles correctly, so you don't get the wallpaper. Try again, I'm sure you'll get lucky!`}
            </Text>
          </View>
        </LinearGradient>

        <TouchableOpacity
          style={styles.totemGuideShareBtnWrap}
          activeOpacity={0.85}
          onPress={handleShare}
        >
          <LinearGradient
            colors={['#79080A', '#DF0F12']}
            style={styles.totemGuideShareBtn}
          >
            <Text style={styles.totemGuideShareBtnText}>Share</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    fontSize: 18,
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
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  totemGuideWallpaperWrap: {
    width: 214,
    height: 320,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#79080A',
    backgroundColor: '#FBDFBC',
  },
  totemGuideWallpaperImage: {
    width: '100%',
    height: '100%',
  },
  totemGuideResultCard: {
    width: '95%',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#79080A',
    marginBottom: 24,
  },
  totemGuideResultCardPadding: {
    padding: 35,
    paddingTop: 20,
  },
  totemGuideResultTitle: {
    color: '#79080A',
    fontSize: 24,
    fontFamily: 'Ubuntu-Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  totemGuideResultText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
  totemGuideShareBtnWrap: {
    width: '85%',
  },
  totemGuideShareBtn: {
    height: 69,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
  },
  totemGuideShareBtnText: {
    color: '#FAC57F',
    fontSize: 22,
    fontFamily: 'Ubuntu-Bold',
  },
});

export default RiddlesResultScreen;
