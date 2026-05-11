import React, { useCallback, useState } from 'react';
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../[Toteminstinctcompts]/TottmLayout';

const TOTEM_GUIDE_SAVED_ADVICE_KEY = '@BeastsAdvice_saved';

const TOTEM_GUIDE_BEAST_IMAGES = {
  wolf: require('../TotemAssets/i/wolf.png'),
  bison: require('../TotemAssets/i/bison.png'),
  falcon: require('../TotemAssets/i/falcon.png'),
  lynx: require('../TotemAssets/i/lynx.png'),
};

const getTotemGuideBeastImage = item => {
  const totemGuideBeastId = item.id.split('_')[0];
  return (
    TOTEM_GUIDE_BEAST_IMAGES[totemGuideBeastId] || TOTEM_GUIDE_BEAST_IMAGES.wolf
  );
};

const SavedAdvicesScreen = ({ navigation }) => {
  const [totemGuideList, setTotemGuideList] = useState([]);

  const loadTotemGuideSaved = useCallback(async () => {
    try {
      const totemGuideRaw = await AsyncStorage.getItem(
        TOTEM_GUIDE_SAVED_ADVICE_KEY,
      );

      if (totemGuideRaw) {
        const totemGuideData = JSON.parse(totemGuideRaw);
        setTotemGuideList(Array.isArray(totemGuideData) ? totemGuideData : []);
      } else {
        setTotemGuideList([]);
      }
    } catch (_) {
      setTotemGuideList([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTotemGuideSaved();
    }, [loadTotemGuideSaved]),
  );

  const handleTotemGuideShare = item => {
    Share.share({
      message: `${item.beastName}: ${item.text}`,
    });
  };

  const handleTotemGuideDelete = async item => {
    const totemGuideNextList = totemGuideList.filter(
      entry => entry.id !== item.id,
    );

    setTotemGuideList(totemGuideNextList);

    try {
      await AsyncStorage.setItem(
        TOTEM_GUIDE_SAVED_ADVICE_KEY,
        JSON.stringify(totemGuideNextList),
      );
    } catch (_) {
      setTotemGuideList(totemGuideList);
    }
  };

  const renderTotemGuideHeader = () => (
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

          <Text style={styles.totemGuideHeaderTitleText}>Saved</Text>
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

  const renderTotemGuideEmpty = () => (
    <View style={styles.totemGuideEmptyWrap}>
      <LinearGradient
        colors={['#FBDFBC', '#FAC57F']}
        style={styles.totemGuideEmptyCard}
      >
        <View style={styles.totemGuideEmptyPadding}>
          <Text style={styles.totemGuideEmptyText}>You have no saved...</Text>
        </View>
      </LinearGradient>
    </View>
  );

  const renderTotemGuideCard = item => (
    <LinearGradient
      key={item.id}
      colors={['#FBDFBC', '#FAC57F']}
      style={styles.totemGuideCard}
    >
      <View style={styles.totemGuideCardInner}>
        <View style={styles.totemGuideCardImageWrap}>
          <Image
            source={getTotemGuideBeastImage(item)}
            style={styles.totemGuideCardImage}
          />
        </View>

        <View style={styles.totemGuideCardContent}>
          <Text style={styles.totemGuideCardTitle}>
            Advice from {item.beastName.toLowerCase()}
          </Text>

          <Text style={styles.totemGuideCardText}>{item.text}</Text>

          <View style={styles.totemGuideCardActions}>
            <TouchableOpacity
              style={styles.totemGuideShareBtnWrap}
              activeOpacity={0.85}
              onPress={() => handleTotemGuideShare(item)}
            >
              <LinearGradient
                colors={['#79080A', '#DF0F12']}
                style={styles.totemGuideShareBtn}
              >
                <Text style={styles.totemGuideShareBtnText}>Share</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.totemGuideDeleteBtnWrap}
              activeOpacity={0.85}
              onPress={() => handleTotemGuideDelete(item)}
            >
              <LinearGradient
                colors={['#79080A', '#DF0F12']}
                style={styles.totemGuideDeleteBtn}
              >
                <Image source={require('../TotemAssets/i/delete.png')} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <TottmLayout>
      <View style={styles.totemGuideContainer}>
        {renderTotemGuideHeader()}
        {totemGuideList.length === 0
          ? renderTotemGuideEmpty()
          : totemGuideList.map(renderTotemGuideCard)}
      </View>
    </TottmLayout>
  );
};

const styles = StyleSheet.create({
  totemGuideContainer: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 10,
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
    marginRight: 40,
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
  totemGuideEmptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    bottom: 30,
  },
  totemGuideEmptyCard: {
    width: '85%',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#79080A',
    minHeight: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  totemGuideEmptyPadding: {
    padding: 20,
  },
  totemGuideEmptyText: {
    color: '#79080A',
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
  },
  totemGuideCard: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#79080A',
    marginBottom: 16,
    overflow: 'hidden',
  },
  totemGuideCardInner: {
    flexDirection: 'row',
    padding: 12,
  },
  totemGuideCardImageWrap: {
    width: 124,
    height: 154,
    marginRight: 12,
  },
  totemGuideCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  totemGuideCardContent: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 100,
  },
  totemGuideCardTitle: {
    color: '#79080A',
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
    marginBottom: 4,
  },
  totemGuideCardText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 20,
    marginBottom: 4,
  },
  totemGuideCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  totemGuideShareBtnWrap: {
    flex: 1,
  },
  totemGuideShareBtn: {
    height: 46,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
  },
  totemGuideShareBtnText: {
    color: '#FAC57F',
    fontSize: 16,
    fontFamily: 'Ubuntu-Bold',
  },
  totemGuideDeleteBtnWrap: {
    flex: 0,
  },
  totemGuideDeleteBtn: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
  },
});

export default SavedAdvicesScreen;
