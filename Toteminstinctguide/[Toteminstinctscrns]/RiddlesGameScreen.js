import React, { useEffect, useRef, useState } from 'react';
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

const TOTEM_GUIDE_TOTAL_ROUNDS = 2;
const TOTEM_GUIDE_TIMER_SECONDS = 15;
const TOTEM_GUIDE_WALLPAPER_UNLOCKED_KEY = '@Riddles_wallpaperUnlocked';
const TOTEM_GUIDE_WALLPAPER_WIN_COUNT_KEY = '@Riddles_wallpaperWinCount';
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

const TOTEM_GUIDE_BEAST_IMAGES = {
  wolf: require('../TotemAssets/i/wolf.png'),
  bison: require('../TotemAssets/i/bison.png'),
  falcon: require('../TotemAssets/i/falcon.png'),
  lynx: require('../TotemAssets/i/lynx.png'),
};

const RiddlesGameScreen = ({ navigation, route }) => {
  const totemGuideRiddles = route?.params?.riddles || [];

  const [totemGuideCurrentRound, setTotemGuideCurrentRound] = useState(0);
  const [totemGuideSelectedIndex, setTotemGuideSelectedIndex] = useState(null);
  const [totemGuideAnswers, setTotemGuideAnswers] = useState([]);
  const [totemGuideSecondsLeft, setTotemGuideSecondsLeft] = useState(
    TOTEM_GUIDE_TIMER_SECONDS,
  );
  const [totemGuidePhase, setTotemGuidePhase] = useState('game');
  const [totemGuideWonWallpaperIndex, setTotemGuideWonWallpaperIndex] =
    useState(null);
  const totemGuideTimerRef = useRef(null);

  const totemGuideCurrentRiddle = totemGuideRiddles[totemGuideCurrentRound];
  const totemGuideHasAnswered = totemGuideSelectedIndex !== null;

  const totemGuideCorrectCount = totemGuideRiddles.length
    ? totemGuideAnswers.reduce(
        (totemGuideAcc, totemGuideAnswer, totemGuideIndex) =>
          totemGuideAcc +
          (totemGuideRiddles[totemGuideIndex].correctIndex === totemGuideAnswer
            ? 1
            : 0),
        0,
      )
    : 0;

  const totemGuideWonWallpaper =
    totemGuideCorrectCount >= TOTEM_GUIDE_TOTAL_ROUNDS;

  useEffect(() => {
    if (
      totemGuidePhase !== 'game' ||
      !totemGuideCurrentRiddle ||
      totemGuideHasAnswered
    ) {
      if (totemGuideTimerRef.current) {
        clearInterval(totemGuideTimerRef.current);
        totemGuideTimerRef.current = null;
      }
      return;
    }

    setTotemGuideSecondsLeft(TOTEM_GUIDE_TIMER_SECONDS);

    totemGuideTimerRef.current = setInterval(() => {
      setTotemGuideSecondsLeft(totemGuidePrev => {
        if (totemGuidePrev <= 1) {
          if (totemGuideTimerRef.current) {
            clearInterval(totemGuideTimerRef.current);
            totemGuideTimerRef.current = null;
          }

          const totemGuideIsLast =
            totemGuideCurrentRound + 1 >= TOTEM_GUIDE_TOTAL_ROUNDS;

          setTotemGuideAnswers(totemGuidePrevAnswers => {
            const totemGuideNextAnswers = [...totemGuidePrevAnswers, -1];

            if (totemGuideIsLast) {
              setTotemGuidePhase('result');
            }

            return totemGuideNextAnswers;
          });

          if (!totemGuideIsLast) {
            setTotemGuideCurrentRound(totemGuideRound => totemGuideRound + 1);
            setTotemGuideSelectedIndex(null);
          }

          return 0;
        }

        return totemGuidePrev - 1;
      });
    }, 1000);

    return () => {
      if (totemGuideTimerRef.current) {
        clearInterval(totemGuideTimerRef.current);
        totemGuideTimerRef.current = null;
      }
    };
  }, [
    totemGuidePhase,
    totemGuideCurrentRiddle,
    totemGuideHasAnswered,
    totemGuideCurrentRound,
  ]);

  useEffect(() => {
    if (totemGuidePhase !== 'result' || !totemGuideRiddles.length) {
      return;
    }

    if (totemGuideWonWallpaper) {
      AsyncStorage.setItem(TOTEM_GUIDE_WALLPAPER_UNLOCKED_KEY, 'true');
      setTotemGuideWonWallpaperIndex(0);

      AsyncStorage.getItem(TOTEM_GUIDE_WALLPAPER_WIN_COUNT_KEY).then(
        totemGuideRaw => {
          const totemGuidePrev = Math.min(
            parseInt(totemGuideRaw || '0', 10),
            999,
          );
          const totemGuideNext = totemGuidePrev + 1;

          AsyncStorage.setItem(
            TOTEM_GUIDE_WALLPAPER_WIN_COUNT_KEY,
            String(totemGuideNext),
          );

          setTotemGuideWonWallpaperIndex(
            (totemGuideNext - 1) % TOTEM_GUIDE_WALLPAPER_COUNT,
          );
        },
      );
    } else {
      setTotemGuideWonWallpaperIndex(null);
    }
  }, [totemGuidePhase, totemGuideRiddles.length, totemGuideWonWallpaper]);

  const handleTotemGuideSelectAnswer = totemGuideIndex => {
    if (totemGuideSelectedIndex !== null) {
      return;
    }

    setTotemGuideSelectedIndex(totemGuideIndex);

    if (totemGuideTimerRef.current) {
      clearInterval(totemGuideTimerRef.current);
      totemGuideTimerRef.current = null;
    }

    setTotemGuideAnswers(totemGuidePrev => [
      ...totemGuidePrev,
      totemGuideIndex,
    ]);
  };

  const handleTotemGuideNextOrResult = () => {
    if (totemGuideCurrentRound + 1 >= TOTEM_GUIDE_TOTAL_ROUNDS) {
      setTotemGuidePhase('result');
    } else {
      setTotemGuideCurrentRound(totemGuideRound => totemGuideRound + 1);
      setTotemGuideSelectedIndex(null);
      setTotemGuideSecondsLeft(TOTEM_GUIDE_TIMER_SECONDS);
    }
  };

  const handleTotemGuideShare = () => {
    Share.share({
      message: `Riddles of the beast: I answered ${totemGuideCorrectCount} out of ${TOTEM_GUIDE_TOTAL_ROUNDS} riddles correctly!`,
    });
  };

  if (!totemGuideCurrentRiddle) {
    return (
      <TottmLayout>
        <View style={styles.totemGuideContainer}>
          <Text>No riddles available.</Text>
        </View>
      </TottmLayout>
    );
  }

  const totemGuideBeastImage =
    TOTEM_GUIDE_BEAST_IMAGES[totemGuideCurrentRiddle.beastId] ||
    TOTEM_GUIDE_BEAST_IMAGES.wolf;

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

        {totemGuidePhase === 'game' && (
          <>
            <View style={styles.totemGuideGameTopRow}>
              <LinearGradient
                colors={['#FAC57F', '#FAC57F']}
                style={styles.totemGuideRoundBadge}
              >
                <View style={styles.totemGuideRoundBadgePadding}>
                  <Text style={styles.totemGuideRoundBadgeText}>
                    Round {totemGuideCurrentRound + 1}/
                    {TOTEM_GUIDE_TOTAL_ROUNDS}
                  </Text>
                </View>
              </LinearGradient>

              <View style={styles.totemGuideTimerRow}>
                <View style={styles.totemGuideTimerIconWrap}>
                  <Image
                    source={require('../TotemAssets/i/time.png')}
                    style={styles.totemGuideTimerIcon}
                  />
                </View>

                <View style={styles.totemGuideTimerBadge}>
                  <Text style={styles.totemGuideTimerBadgeText}>
                    {totemGuideHasAnswered
                      ? '---'
                      : `00:${String(totemGuideSecondsLeft).padStart(2, '0')}`}
                  </Text>
                </View>
              </View>
            </View>

            <LinearGradient
              colors={['#FBDFBC', '#FAC57F']}
              style={styles.totemGuideRiddleCard}
            >
              <View style={styles.totemGuideRiddleCardInner}>
                <View style={styles.totemGuideRiddleImageWrap}>
                  <Image
                    source={totemGuideBeastImage}
                    style={styles.totemGuideRiddleImage}
                  />
                </View>

                <View style={styles.totemGuideRiddleTextWrap}>
                  <Text style={styles.totemGuideRiddleFrom}>
                    Riddle from the{' '}
                    {totemGuideCurrentRiddle.beastName.toLowerCase()}
                  </Text>
                  <Text style={styles.totemGuideRiddleQuestion}>
                    {totemGuideCurrentRiddle.question}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.totemGuideOptionsGrid}>
              {totemGuideCurrentRiddle.options.map(
                (totemGuideOption, totemGuideIndex) => {
                  const totemGuideIsSelected =
                    totemGuideSelectedIndex === totemGuideIndex;
                  const totemGuideIsCorrect =
                    totemGuideCurrentRiddle.correctIndex === totemGuideIndex;
                  const totemGuideShowGreen =
                    totemGuideHasAnswered && totemGuideIsCorrect;
                  const totemGuideShowRed =
                    totemGuideHasAnswered &&
                    totemGuideIsSelected &&
                    !totemGuideIsCorrect;

                  return (
                    <TouchableOpacity
                      key={totemGuideIndex}
                      style={styles.totemGuideOptionWrap}
                      activeOpacity={0.85}
                      onPress={() =>
                        handleTotemGuideSelectAnswer(totemGuideIndex)
                      }
                      disabled={totemGuideHasAnswered}
                    >
                      <LinearGradient
                        colors={
                          totemGuideShowGreen
                            ? ['#2E7D32', '#4CAF50']
                            : totemGuideShowRed
                            ? ['#8E3A3A', '#B05050']
                            : ['#79080A', '#DF0F12']
                        }
                        style={styles.totemGuideOptionBtn}
                      >
                        <View style={styles.totemGuideOptionBtnPadding}>
                          <Text style={styles.totemGuideOptionBtnText}>
                            {totemGuideOption}
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                },
              )}
            </View>

            {totemGuideHasAnswered && (
              <TouchableOpacity
                style={styles.totemGuideNextBtnWrap}
                activeOpacity={0.85}
                onPress={handleTotemGuideNextOrResult}
              >
                <LinearGradient
                  colors={['#79080A', '#DF0F12']}
                  style={styles.totemGuideNextBtn}
                >
                  <Text style={styles.totemGuideNextBtnText}>
                    {totemGuideCurrentRound + 1 >= TOTEM_GUIDE_TOTAL_ROUNDS
                      ? 'Result'
                      : 'Next'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </>
        )}

        {totemGuidePhase === 'result' && (
          <>
            {totemGuideWonWallpaper && totemGuideWonWallpaperIndex !== null ? (
              <View style={styles.totemGuideWallpaperWrap}>
                <Image
                  source={TOTEM_GUIDE_WALLPAPERS[totemGuideWonWallpaperIndex]}
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
                  {totemGuideWonWallpaper
                    ? `You answered ${totemGuideCorrectCount} out of ${TOTEM_GUIDE_TOTAL_ROUNDS} riddles correctly, so you will receive a collection wallpaper. You can download the wallpaper in the 'Collection' tab.`
                    : `You answered ${totemGuideCorrectCount} out of ${TOTEM_GUIDE_TOTAL_ROUNDS} riddles correctly, so you don't get the wallpaper. Try again, I'm sure you'll get lucky!`}
                </Text>
              </View>
            </LinearGradient>

            <TouchableOpacity
              style={styles.totemGuideShareBtnWrap}
              activeOpacity={0.85}
              onPress={handleTotemGuideShare}
            >
              <LinearGradient
                colors={['#79080A', '#DF0F12']}
                style={styles.totemGuideShareBtn}
              >
                <Text style={styles.totemGuideShareBtnText}>Share</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
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
    alignItems: 'center',
  },
  totemGuideHeaderRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  },
  totemGuideHeaderBackWrap: {
    marginLeft: 12,
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F4CF92',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 22,
  },
  totemGuideHeaderTitleText: {
    color: '#FAC57F',
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
    width: '80%',
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
  totemGuideGameTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  totemGuideRoundBadge: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#79080A',
    height: 69,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '40%',
  },
  totemGuideRoundBadgePadding: {
    padding: 13,
  },
  totemGuideRoundBadgeText: {
    color: '#79080A',
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
  },
  totemGuideTimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  totemGuideTimerIconWrap: {
    width: 59,
    height: 59,
    borderRadius: 17,
    backgroundColor: '#FAC57F',
    borderWidth: 1.5,
    borderColor: '#79080A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuideTimerIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  totemGuideTimerBadge: {
    minWidth: 100,
    height: 59,
    borderRadius: 18,
    backgroundColor: '#FAC57F',
    borderWidth: 1.5,
    borderColor: '#79080A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  totemGuideTimerBadgeText: {
    color: '#79080A',
    fontSize: 16,
    fontFamily: 'Ubuntu-Bold',
  },
  totemGuideRiddleCard: {
    width: '95%',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#79080A',
    marginBottom: 20,
    overflow: 'hidden',
    marginTop: 10,
  },
  totemGuideRiddleCardInner: {
    flexDirection: 'row',
    padding: 16,
  },
  totemGuideRiddleImageWrap: {
    width: 124,
    height: 154,
    marginRight: 12,
  },
  totemGuideRiddleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  totemGuideRiddleTextWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  totemGuideRiddleFrom: {
    color: '#79080A',
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
    marginBottom: 6,
  },
  totemGuideRiddleQuestion: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 24,
    marginTop: 10,
  },
  totemGuideOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '95%',
    gap: 10,
    marginBottom: 24,
  },
  totemGuideOptionWrap: {
    width: '48%',
  },
  totemGuideOptionBtn: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FAC57F',
    alignItems: 'center',
    justifyContent: 'center',
    height: 99,
  },
  totemGuideOptionBtnPadding: {
    padding: 13,
  },
  totemGuideOptionBtnText: {
    color: '#FAC57F',
    fontSize: 22,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
  },
  totemGuideNextBtnWrap: {
    width: '85%',
    marginTop: 20,
  },
  totemGuideNextBtn: {
    height: 69,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
  },
  totemGuideNextBtnText: {
    color: '#FAC57F',
    fontSize: 22,
    fontFamily: 'Ubuntu-Bold',
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

export default RiddlesGameScreen;
