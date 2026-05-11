import React, { useCallback, useRef, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import TottmLayout from '../[Toteminstinctcompts]/TottmLayout';

import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { captureRef } from 'react-native-view-shot';

const TOTEM_GUIDE_WALLPAPER_WIN_COUNT_KEY = '@Riddles_wallpaperWinCount';
const TOTEM_GUIDE_ATTENTION_TOTAL_STARS_KEY = '@Attention_totalStars';
const TOTEM_GUIDE_PURCHASED_WALLPAPERS_KEY = '@Collection_purchasedWallpapers';
const TOTEM_GUIDE_WALLPAPER_COUNT = 7;

const TOTEM_GUIDE_WALLPAPERS = [
  require('../TotemAssets/i/wallpapers/1.png'),
  require('../TotemAssets/i/wallpapers/2.png'),
  require('../TotemAssets/i/wallpapers/3.png'),
  require('../TotemAssets/i/wallpapers/4.png'),
  require('../TotemAssets/i/wallpapers/5.png'),
  require('../TotemAssets/i/wallpapers/6.png'),
  require('../TotemAssets/i/wallpapers/7.png'),
];

const TOTEM_GUIDE_WALLPAPER_PRICES = [10, 10, 10, 10, 10, 10, 10];

const CollectionScreen = ({ navigation }) => {
  const [totemGuideLegacyUnlockedCount, setTotemGuideLegacyUnlockedCount] =
    useState(0);
  const [totemGuidePurchasedIndexes, setTotemGuidePurchasedIndexes] = useState(
    [],
  );
  const [totemGuideTotalStars, setTotemGuideTotalStars] = useState(0);
  const [totemGuideCaptureIndex, setTotemGuideCaptureIndex] = useState(null);

  const totemGuideImageRef = useRef(null);
  const totemGuideShakeByIndexRef = useRef({});

  const getTotemGuideShakeAnim = totemGuideIndex => {
    if (!totemGuideShakeByIndexRef.current[totemGuideIndex]) {
      totemGuideShakeByIndexRef.current[totemGuideIndex] = new Animated.Value(
        0,
      );
    }

    return totemGuideShakeByIndexRef.current[totemGuideIndex];
  };

  const triggerTotemGuideBuyShake = totemGuideIndex => {
    const totemGuideShake = getTotemGuideShakeAnim(totemGuideIndex);

    totemGuideShake.setValue(0);

    Animated.sequence([
      Animated.timing(totemGuideShake, {
        toValue: -8,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(totemGuideShake, {
        toValue: 8,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(totemGuideShake, {
        toValue: -6,
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.timing(totemGuideShake, {
        toValue: 6,
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.timing(totemGuideShake, {
        toValue: 0,
        duration: 35,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const loadTotemGuideData = useCallback(async () => {
    try {
      const [totemGuideLegacyRaw, totemGuidePurchasedRaw, totemGuideStarsRaw] =
        await Promise.all([
          AsyncStorage.getItem(TOTEM_GUIDE_WALLPAPER_WIN_COUNT_KEY),
          AsyncStorage.getItem(TOTEM_GUIDE_PURCHASED_WALLPAPERS_KEY),
          AsyncStorage.getItem(TOTEM_GUIDE_ATTENTION_TOTAL_STARS_KEY),
        ]);

      const totemGuideLegacy = Math.min(
        parseInt(totemGuideLegacyRaw || '0', 10),
        TOTEM_GUIDE_WALLPAPER_COUNT,
      );

      setTotemGuideLegacyUnlockedCount(
        Number.isFinite(totemGuideLegacy) ? totemGuideLegacy : 0,
      );

      const totemGuideParsedPurchased = totemGuidePurchasedRaw
        ? JSON.parse(totemGuidePurchasedRaw)
        : [];

      const totemGuideNormalizedPurchased = Array.isArray(
        totemGuideParsedPurchased,
      )
        ? totemGuideParsedPurchased.filter(
            totemGuideIndex =>
              Number.isInteger(totemGuideIndex) &&
              totemGuideIndex >= 0 &&
              totemGuideIndex < TOTEM_GUIDE_WALLPAPER_COUNT,
          )
        : [];

      setTotemGuidePurchasedIndexes(totemGuideNormalizedPurchased);

      const totemGuideStars = Number(totemGuideStarsRaw ?? 0);
      setTotemGuideTotalStars(
        Number.isFinite(totemGuideStars) ? totemGuideStars : 0,
      );
    } catch (_) {
      setTotemGuideLegacyUnlockedCount(0);
      setTotemGuidePurchasedIndexes([]);
      setTotemGuideTotalStars(0);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTotemGuideData();
    }, [loadTotemGuideData]),
  );

  const isTotemGuideUnlocked = totemGuideIndex =>
    totemGuideIndex < totemGuideLegacyUnlockedCount ||
    totemGuidePurchasedIndexes.includes(totemGuideIndex);

  const handleTotemGuideBuy = async totemGuideIndex => {
    if (isTotemGuideUnlocked(totemGuideIndex)) {
      return;
    }

    const totemGuidePrice = TOTEM_GUIDE_WALLPAPER_PRICES[totemGuideIndex] ?? 10;

    if (totemGuideTotalStars < totemGuidePrice) {
      triggerTotemGuideBuyShake(totemGuideIndex);
      return;
    }

    const totemGuideNextStars = totemGuideTotalStars - totemGuidePrice;
    const totemGuideNextPurchased = [
      ...new Set([...totemGuidePurchasedIndexes, totemGuideIndex]),
    ];

    setTotemGuideTotalStars(totemGuideNextStars);
    setTotemGuidePurchasedIndexes(totemGuideNextPurchased);

    try {
      await Promise.all([
        AsyncStorage.setItem(
          TOTEM_GUIDE_ATTENTION_TOTAL_STARS_KEY,
          String(totemGuideNextStars),
        ),
        AsyncStorage.setItem(
          TOTEM_GUIDE_PURCHASED_WALLPAPERS_KEY,
          JSON.stringify(totemGuideNextPurchased),
        ),
      ]);
    } catch (_) {
      console.log('error', _);
    }
  };

  const shareTotemGuideImage = async () => {
    try {
      const totemGuideTmpUri = await captureRef(totemGuideImageRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile',
      });

      const totemGuideFileUri = totemGuideTmpUri.startsWith('file://')
        ? totemGuideTmpUri
        : `file://${totemGuideTmpUri}`;

      const totemGuidePathToCheck = totemGuideFileUri.replace('file://', '');
      const totemGuideExists = await RNFS.exists(totemGuidePathToCheck);

      if (!totemGuideExists) {
        return;
      }

      await Share.open({
        url: totemGuideFileUri,
        type: 'image/png',
        failOnCancel: false,
      });
    } catch (totemGuideError) {
      if (!totemGuideError?.message?.includes('User did not share')) {
        console.error('shareWallpaper error', totemGuideError);
      }
    }
  };

  const handleTotemGuideShareWallpaper = async totemGuideIndex => {
    setTotemGuideCaptureIndex(totemGuideIndex);

    requestAnimationFrame(() => {
      setTimeout(async () => {
        await shareTotemGuideImage();
        setTotemGuideCaptureIndex(null);
      }, 80);
    });
  };

  const renderTotemGuideHeader = () => (
    <View style={styles.totemGuideHeaderRow}>
      <LinearGradient
        colors={['#79080A', '#DF0F12']}
        style={styles.totemGuideHeaderPill}
      >
        <View style={styles.totemGuideHeaderTitleRow}>
          <Text style={styles.totemGuideHeaderTitleText}>Collection</Text>
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

  const renderTotemGuideGrid = () => {
    const totemGuideList = [];

    for (
      let totemGuideIndex = 0;
      totemGuideIndex < TOTEM_GUIDE_WALLPAPER_COUNT;
      totemGuideIndex++
    ) {
      const totemGuideUnlocked = isTotemGuideUnlocked(totemGuideIndex);
      const totemGuidePrice =
        TOTEM_GUIDE_WALLPAPER_PRICES[totemGuideIndex] ?? 10;

      totemGuideList.push(
        <View key={totemGuideIndex} style={styles.totemGuideTileWrap}>
          <View style={styles.totemGuideTileImageWrap}>
            <Image
              source={TOTEM_GUIDE_WALLPAPERS[totemGuideIndex]}
              style={styles.totemGuideTileImage}
              resizeMode="cover"
            />
          </View>

          {totemGuideUnlocked ? (
            <View style={styles.totemGuideTileActions}>
              <TouchableOpacity
                style={styles.totemGuideTileBtnWrap}
                activeOpacity={0.85}
                onPress={() => handleTotemGuideShareWallpaper(totemGuideIndex)}
              >
                <LinearGradient
                  colors={['#79080A', '#DF0F12']}
                  style={[styles.totemGuideTileBtn, styles.totemGuidePriceBtn]}
                >
                  <Image source={require('../TotemAssets/i/shr.png')} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.totemGuideLockOverlay}>
              <Animated.View
                style={[
                  styles.totemGuideTileBtnWrap,
                  {
                    transform: [
                      { translateX: getTotemGuideShakeAnim(totemGuideIndex) },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => handleTotemGuideBuy(totemGuideIndex)}
                >
                  <LinearGradient
                    colors={['#79080A', '#DF0F12']}
                    style={[
                      styles.totemGuideTileBtn,
                      styles.totemGuidePriceBtn,
                    ]}
                  >
                    <Image
                      source={require('../TotemAssets/i/star.png')}
                      style={styles.totemGuidePriceStar}
                    />
                    <Text style={styles.totemGuidePriceText}>
                      {String(totemGuidePrice).padStart(3, '0')}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
        </View>,
      );
    }

    return (
      <ScrollView
        style={styles.totemGuideScroll}
        contentContainerStyle={styles.totemGuideScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.totemGuideGrid}>{totemGuideList}</View>
      </ScrollView>
    );
  };

  return (
    <TottmLayout>
      <View style={styles.totemGuideContainer}>
        {renderTotemGuideHeader()}

        <View style={styles.totemGuideBalanceWrap}>
          <LinearGradient
            colors={['#79080A', '#DF0F12']}
            style={styles.totemGuideBalanceBadge}
          >
            <Image
              source={require('../TotemAssets/i/star.png')}
              style={styles.totemGuideBalanceStar}
            />
            <Text style={styles.totemGuideBalanceText}>
              {String(totemGuideTotalStars).padStart(3, '0')}
            </Text>
          </LinearGradient>
        </View>

        {renderTotemGuideGrid()}

        {totemGuideCaptureIndex !== null && (
          <View style={styles.totemGuideCaptureWrap} pointerEvents="none">
            <Image
              source={TOTEM_GUIDE_WALLPAPERS[totemGuideCaptureIndex]}
              style={styles.totemGuideCaptureImage}
              resizeMode="contain"
              ref={totemGuideImageRef}
            />
          </View>
        )}
      </View>
    </TottmLayout>
  );
};

const styles = StyleSheet.create({
  totemGuideContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 48,
    paddingBottom: 60,
  },
  totemGuideHeaderRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  totemGuideBalanceWrap: {
    alignItems: 'center',
    marginBottom: 14,
  },
  totemGuideBalanceBadge: {
    minWidth: 165,
    height: 70,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: '#FAC57F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuideBalanceStar: {
    width: 55,
    height: 50,
  },
  totemGuideBalanceText: {
    color: '#FAC57F',
    marginLeft: 8,
    fontSize: 32,
    fontFamily: 'Ubuntu-Bold',
  },
  totemGuideScroll: {
    flex: 1,
  },
  totemGuideScrollContent: {
    paddingBottom: 40,
  },
  totemGuideGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  totemGuideTileWrap: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#79080A',
    overflow: 'hidden',
  },
  totemGuideTileImageWrap: {
    width: '100%',
    aspectRatio: 9 / 15,
  },
  totemGuideTileImage: {
    width: '100%',
    height: '100%',
  },
  totemGuideTileActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1000,
  },
  totemGuideTileBtnWrap: {
    flex: 0,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
  totemGuideTileBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: '#FAC57F',
  },
  totemGuidePriceBtn: {
    width: 120,
    height: 44,
    borderRadius: 20,
    flexDirection: 'row',
  },
  totemGuidePriceStar: {
    width: 35,
    height: 35,
  },
  totemGuidePriceText: {
    color: '#FAC57F',
    marginLeft: 6,
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
  },
  totemGuideLockOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.28)',
    justifyContent: 'flex-end',
  },
  totemGuideCaptureWrap: {
    position: 'absolute',
    left: -9999,
    top: 0,
    width: 1080,
    height: 1920,
  },
  totemGuideCaptureImage: {
    width: 1080,
    height: 1920,
  },
});

export default CollectionScreen;
