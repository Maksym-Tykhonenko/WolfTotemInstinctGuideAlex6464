import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../[Toteminstinctcompts]/TottmLayout';

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

const TOTEM_GUIDE_SAVED_ADVICE_KEY = '@BeastsAdvice_saved';

const TOTEM_GUIDE_BEAST_META = {
  wolf: {
    name: 'Wolf',
    image: require('../TotemAssets/i/wolf.png'),
  },
  bison: {
    name: 'Bison',
    image: require('../TotemAssets/i/bison.png'),
  },
  falcon: {
    name: 'Falcon',
    image: require('../TotemAssets/i/falcon.png'),
  },
  lynx: {
    name: 'Lynx',
    image: require('../TotemAssets/i/lynx.png'),
  },
};

const BeastsAdviceResultScreen = ({ navigation, route }) => {
  const totemGuideBeastId = route?.params?.beastId || 'wolf';
  const totemGuideAdviceText = route?.params?.adviceText || '';
  const totemGuideBeast =
    TOTEM_GUIDE_BEAST_META[totemGuideBeastId] || TOTEM_GUIDE_BEAST_META.wolf;
  const totemGuideAdviceId = `${totemGuideBeastId}_${totemGuideAdviceText}`;

  const [totemGuideIsSaved, setTotemGuideIsSaved] = useState(false);

  useEffect(() => {
    const loadTotemGuideSavedState = async () => {
      try {
        const totemGuideRaw = await AsyncStorage.getItem(
          TOTEM_GUIDE_SAVED_ADVICE_KEY,
        );
        const totemGuideList = totemGuideRaw ? JSON.parse(totemGuideRaw) : [];

        setTotemGuideIsSaved(
          totemGuideList.some(
            totemGuideItem => totemGuideItem.id === totemGuideAdviceId,
          ),
        );
      } catch (_) {
        // ignore
      }
    };

    loadTotemGuideSavedState();
  }, [totemGuideAdviceId]);

  const handleTotemGuideShare = () => {
    Share.share({
      message: `${totemGuideBeast.name}: ${totemGuideAdviceText}`,
    });
  };

  const handleTotemGuideToggleSave = async () => {
    try {
      const totemGuideRaw = await AsyncStorage.getItem(
        TOTEM_GUIDE_SAVED_ADVICE_KEY,
      );
      const totemGuideList = totemGuideRaw ? JSON.parse(totemGuideRaw) : [];
      const totemGuideExists = totemGuideList.some(
        totemGuideItem => totemGuideItem.id === totemGuideAdviceId,
      );

      const totemGuideNextList = totemGuideExists
        ? totemGuideList.filter(
            totemGuideItem => totemGuideItem.id !== totemGuideAdviceId,
          )
        : [
            ...totemGuideList,
            {
              id: totemGuideAdviceId,
              beastName: totemGuideBeast.name,
              text: totemGuideAdviceText,
            },
          ];

      await AsyncStorage.setItem(
        TOTEM_GUIDE_SAVED_ADVICE_KEY,
        JSON.stringify(totemGuideNextList),
      );

      setTotemGuideIsSaved(!totemGuideExists);
    } catch (_) {
      // ignore
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
              <TouchableOpacity
                style={styles.totemGuideHeaderBackWrap}
                activeOpacity={0.85}
                onPress={() => navigation.goBack()}
              >
                <Image source={require('../TotemAssets/i/back.png')} />
              </TouchableOpacity>

              <Text style={styles.totemGuideHeaderTitleText}>
                Beast's advice
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

        <View style={styles.totemGuideBeastImageWrap}>
          <Image source={totemGuideBeast.image} />
        </View>

        <LinearGradient
          colors={['#FBDFBC', '#FAC57F']}
          style={styles.totemGuideCard}
        >
          <View style={styles.totemGuideCardContent}>
            <Text style={styles.totemGuideAdviceCardTitle}>
              Advice from {totemGuideBeast.name}
            </Text>

            <Text style={styles.totemGuideAdviceCardText}>
              {totemGuideAdviceText}
            </Text>

            <View style={styles.totemGuideAdviceActionsRow}>
              <TouchableOpacity
                style={styles.totemGuideShareButtonWrap}
                activeOpacity={0.85}
                onPress={handleTotemGuideShare}
              >
                <LinearGradient
                  colors={['#79080A', '#DF0F12']}
                  style={styles.totemGuideShareButton}
                >
                  <Text style={styles.totemGuideShareButtonText}>Share</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.totemGuideSaveButtonWrap}
                activeOpacity={0.85}
                onPress={handleTotemGuideToggleSave}
              >
                <LinearGradient
                  colors={
                    totemGuideIsSaved
                      ? ['#8E3A3A', '#B05050']
                      : ['#79080A', '#DF0F12']
                  }
                  style={styles.totemGuideSaveButton}
                >
                  {totemGuideIsSaved ? (
                    <Image source={require('../TotemAssets/i/savedic.png')} />
                  ) : (
                    <Image source={require('../TotemAssets/i/save.png')} />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
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
    marginLeft: 20,
  },
  totemGuideHeaderBackWrap: {
    marginRight: 14,
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
  totemGuideBeastImageWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  totemGuideCard: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#79080A',
    alignItems: 'center',
  },
  totemGuideCardContent: {
    padding: 12,
    paddingHorizontal: 15,
    width: '100%',
  },
  totemGuideAdviceCardTitle: {
    color: '#79080A',
    fontSize: 32,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
    marginBottom: 28,
  },
  totemGuideAdviceCardText: {
    color: '#000',
    fontSize: 28,
    fontFamily: 'Ubuntu-Medium',
    textAlign: 'center',
    marginBottom: 12,
  },
  totemGuideAdviceActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    marginTop: 20,
  },
  totemGuideShareButtonWrap: {
    flex: 1,
  },
  totemGuideShareButton: {
    height: 59,
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
  },
  totemGuideShareButtonText: {
    color: '#FAC57F',
    fontSize: 22,
    fontFamily: 'Ubuntu-Bold',
  },
  totemGuideSaveButtonWrap: {},
  totemGuideSaveButton: {
    width: 59,
    height: 59,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
  },
});

export default BeastsAdviceResultScreen;
