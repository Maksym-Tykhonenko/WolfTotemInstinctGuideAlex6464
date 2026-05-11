import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../[Toteminstinctcompts]/TottmLayout';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOTEM_GUIDE_MEMORIZE_SECONDS = 5;
const TOTEM_GUIDE_ROUND_SECONDS = [15, 10, 5];
const TOTEM_GUIDE_TOTAL_ROUNDS = TOTEM_GUIDE_ROUND_SECONDS.length;
const TOTEM_GUIDE_STARS_PER_WON_ROUND = 4;
const TOTEM_GUIDE_ATTENTION_TOTAL_STARS_KEY = '@Attention_totalStars';

const TOTEM_GUIDE_ANIMALS = [
  { id: 'wolf', image: require('../TotemAssets/i/wolf.png') },
  { id: 'lynx', image: require('../TotemAssets/i/lynx.png') },
  { id: 'bison', image: require('../TotemAssets/i/bison.png') },
  { id: 'falcon', image: require('../TotemAssets/i/falcon.png') },
];

const TOTEM_GUIDE_BASE_IDS = TOTEM_GUIDE_ANIMALS.map(
  totemGuideItem => totemGuideItem.id,
);

const shuffleTotemGuideIds = () =>
  [...TOTEM_GUIDE_BASE_IDS].sort(() => Math.random() - 0.5);

const formatTotemGuideTime = totemGuideValue => {
  const totemGuideSafe = Math.max(totemGuideValue, 0);
  const totemGuideSeconds = String(totemGuideSafe).padStart(2, '0');
  return `00:${totemGuideSeconds}`;
};

const AttentionGameScreen = ({ navigation }) => {
  const [totemGuideRoundIndex, setTotemGuideRoundIndex] = useState(0);
  const [totemGuidePhase, setTotemGuidePhase] = useState('memorize');
  const [totemGuideSecondsLeft, setTotemGuideSecondsLeft] = useState(
    TOTEM_GUIDE_MEMORIZE_SECONDS,
  );
  const [totemGuideTargetOrder, setTotemGuideTargetOrder] = useState(
    shuffleTotemGuideIds(),
  );
  const [totemGuideSelectedOrder, setTotemGuideSelectedOrder] = useState([]);
  const [totemGuideRoundResults, setTotemGuideRoundResults] = useState([]);
  const [totemGuideFeedbackCorrectMap, setTotemGuideFeedbackCorrectMap] =
    useState([]);
  const [totemGuideTotalStars, setTotemGuideTotalStars] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem(TOTEM_GUIDE_ATTENTION_TOTAL_STARS_KEY)
      .then(totemGuideRaw => {
        const totemGuideParsed = Number(totemGuideRaw ?? 0);
        setTotemGuideTotalStars(
          Number.isFinite(totemGuideParsed) ? totemGuideParsed : 0,
        );
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (totemGuidePhase !== 'memorize') {
      return undefined;
    }

    const totemGuideTimer = setInterval(() => {
      setTotemGuideSecondsLeft(totemGuidePrev => {
        if (totemGuidePrev <= 1) {
          clearInterval(totemGuideTimer);
          setTotemGuidePhase('answer');
          setTotemGuideSecondsLeft(
            TOTEM_GUIDE_ROUND_SECONDS[totemGuideRoundIndex],
          );
          return 0;
        }

        return totemGuidePrev - 1;
      });
    }, 1000);

    return () => clearInterval(totemGuideTimer);
  }, [totemGuidePhase, totemGuideRoundIndex]);

  const handleTotemGuideEvaluateRound = () => {
    const totemGuideCorrectMap = totemGuideTargetOrder.map(
      (totemGuideId, totemGuideIndex) =>
        totemGuideSelectedOrder[totemGuideIndex] === totemGuideId,
    );

    const totemGuideIsRoundCorrect =
      totemGuideSelectedOrder.length === totemGuideTargetOrder.length &&
      totemGuideCorrectMap.every(Boolean);

    setTotemGuideFeedbackCorrectMap(totemGuideCorrectMap);
    setTotemGuideRoundResults(totemGuidePrev => [
      ...totemGuidePrev,
      totemGuideIsRoundCorrect,
    ]);

    if (totemGuideIsRoundCorrect) {
      setTotemGuideTotalStars(totemGuidePrev => {
        const totemGuideNext = totemGuidePrev + TOTEM_GUIDE_STARS_PER_WON_ROUND;

        AsyncStorage.setItem(
          TOTEM_GUIDE_ATTENTION_TOTAL_STARS_KEY,
          String(totemGuideNext),
        ).catch(() => {});

        return totemGuideNext;
      });
    }

    setTotemGuidePhase('feedback');
    setTotemGuideSecondsLeft(0);
  };

  useEffect(() => {
    if (totemGuidePhase !== 'answer') {
      return undefined;
    }

    const totemGuideTimer = setInterval(() => {
      setTotemGuideSecondsLeft(totemGuidePrev => {
        if (totemGuidePrev <= 1) {
          clearInterval(totemGuideTimer);
          setTimeout(() => handleTotemGuideEvaluateRound(), 0);
          return 0;
        }

        return totemGuidePrev - 1;
      });
    }, 1000);

    return () => clearInterval(totemGuideTimer);
  }, [totemGuidePhase, totemGuideSelectedOrder, totemGuideTargetOrder]);

  const getTotemGuideAnimalById = totemGuideId =>
    TOTEM_GUIDE_ANIMALS.find(
      totemGuideItem => totemGuideItem.id === totemGuideId,
    );

  const canTotemGuidePickAnimal = totemGuideId =>
    totemGuidePhase === 'answer' &&
    totemGuideSelectedOrder.length < totemGuideTargetOrder.length &&
    !totemGuideSelectedOrder.includes(totemGuideId);

  const handleTotemGuidePickAnimal = totemGuideId => {
    if (!canTotemGuidePickAnimal(totemGuideId)) {
      return;
    }

    setTotemGuideSelectedOrder(totemGuidePrev => [
      ...totemGuidePrev,
      totemGuideId,
    ]);
  };

  const handleTotemGuideRemoveAt = totemGuideIndex => {
    if (totemGuidePhase !== 'answer') {
      return;
    }

    setTotemGuideSelectedOrder(totemGuidePrev =>
      totemGuidePrev.filter(
        (_, totemGuideItemIndex) => totemGuideItemIndex !== totemGuideIndex,
      ),
    );
  };

  const handleTotemGuideNext = () => {
    if (totemGuideRoundIndex + 1 >= TOTEM_GUIDE_TOTAL_ROUNDS) {
      setTotemGuidePhase('result');
      return;
    }

    const totemGuideNextRound = totemGuideRoundIndex + 1;

    setTotemGuideRoundIndex(totemGuideNextRound);
    setTotemGuideTargetOrder(shuffleTotemGuideIds());
    setTotemGuideSelectedOrder([]);
    setTotemGuideFeedbackCorrectMap([]);
    setTotemGuideSecondsLeft(TOTEM_GUIDE_MEMORIZE_SECONDS);
    setTotemGuidePhase('memorize');
  };

  const handleTotemGuideShare = () => {
    const totemGuideSuccessRounds =
      totemGuideRoundResults.filter(Boolean).length;
    const totemGuideStars =
      totemGuideSuccessRounds * TOTEM_GUIDE_STARS_PER_WON_ROUND;

    Share.share({
      message: `Attention game: ${totemGuideSuccessRounds}/${TOTEM_GUIDE_TOTAL_ROUNDS} rounds correct. Reward: ${totemGuideStars} stars. Total saved stars: ${totemGuideTotalStars}.`,
    }).catch(() => {});
  };

  const renderTotemGuideSlotContent = totemGuideAnimalId => {
    if (!totemGuideAnimalId) {
      if (totemGuidePhase === 'memorize') {
        return (
          <Text style={styles.totemGuideSlotHint}>
            Set the appropriate animal
          </Text>
        );
      }

      return <Image source={require('../TotemAssets/i/addd.png')} />;
    }

    const totemGuideAnimal = getTotemGuideAnimalById(totemGuideAnimalId);

    if (!totemGuideAnimal) {
      return null;
    }

    return (
      <Image
        source={totemGuideAnimal.image}
        style={styles.totemGuideAnimalImage}
        resizeMode="contain"
      />
    );
  };

  const totemGuideSuccessRounds = totemGuideRoundResults.filter(Boolean).length;
  const totemGuideTimerDisplay =
    totemGuidePhase === 'feedback'
      ? '---'
      : formatTotemGuideTime(totemGuideSecondsLeft);

  const totemGuideShowSubmit =
    totemGuidePhase === 'answer' &&
    totemGuideSelectedOrder.length === totemGuideTargetOrder.length;

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

        {totemGuidePhase !== 'result' && (
          <>
            <View style={styles.totemGuideGameTopRow}>
              <LinearGradient
                colors={['#FAC57F', '#FAC57F']}
                style={styles.totemGuideRoundBadge}
              >
                <View style={styles.totemGuideRoundBadgePadding}>
                  <Text style={styles.totemGuideRoundBadgeText}>
                    Round {totemGuideRoundIndex + 1}/{TOTEM_GUIDE_TOTAL_ROUNDS}
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
                    {totemGuideTimerDisplay}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.totemGuideGrid}>
              {Array.from({ length: 4 }).map((_, totemGuideIndex) => {
                const totemGuideIsFeedback = totemGuidePhase === 'feedback';

                const totemGuideFillId =
                  totemGuidePhase === 'memorize' || totemGuideIsFeedback
                    ? totemGuideTargetOrder[totemGuideIndex]
                    : totemGuideSelectedOrder[totemGuideIndex];

                const totemGuideFeedbackStyle = totemGuideIsFeedback
                  ? totemGuideFeedbackCorrectMap[totemGuideIndex]
                    ? styles.totemGuideSlotCorrect
                    : styles.totemGuideSlotWrong
                  : null;

                return (
                  <View
                    key={`slot-${totemGuideIndex}`}
                    style={[styles.totemGuideSlot, totemGuideFeedbackStyle]}
                  >
                    {renderTotemGuideSlotContent(totemGuideFillId)}

                    {totemGuidePhase === 'answer' &&
                    totemGuideSelectedOrder[totemGuideIndex] ? (
                      <TouchableOpacity
                        style={styles.totemGuideRemoveWrap}
                        activeOpacity={0.85}
                        onPress={() =>
                          handleTotemGuideRemoveAt(totemGuideIndex)
                        }
                      >
                        <LinearGradient
                          colors={['#79080A', '#DF0F12']}
                          style={styles.totemGuideRemoveButton}
                        >
                          <Text style={styles.totemGuideRemoveText}>
                            Remove
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                );
              })}
            </View>

            {totemGuidePhase !== 'memorize' && (
              <View style={styles.totemGuidePickerRow}>
                {TOTEM_GUIDE_ANIMALS.map(totemGuideItem => {
                  const totemGuideSelected = totemGuideSelectedOrder.includes(
                    totemGuideItem.id,
                  );

                  return (
                    <TouchableOpacity
                      key={totemGuideItem.id}
                      style={[
                        styles.totemGuidePickerItem,
                        totemGuideSelected
                          ? styles.totemGuidePickerItemSelected
                          : null,
                        !canTotemGuidePickAnimal(totemGuideItem.id)
                          ? styles.totemGuidePickerItemDisabled
                          : null,
                      ]}
                      activeOpacity={0.85}
                      onPress={() =>
                        handleTotemGuidePickAnimal(totemGuideItem.id)
                      }
                      disabled={!canTotemGuidePickAnimal(totemGuideItem.id)}
                    >
                      <Image
                        source={totemGuideItem.image}
                        style={styles.totemGuidePickerImage}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {totemGuidePhase === 'memorize' && (
              <View style={styles.totemGuideActionWrap}>
                <LinearGradient
                  colors={['#FBDFBC', '#FAC57F']}
                  style={styles.totemGuideInfoCard}
                >
                  <Text style={styles.totemGuideRoundBadgeText}>
                    Remember the sequence
                  </Text>
                </LinearGradient>
              </View>
            )}

            {totemGuideShowSubmit && (
              <TouchableOpacity
                style={styles.totemGuideActionWrap}
                activeOpacity={0.85}
                onPress={handleTotemGuideEvaluateRound}
              >
                <LinearGradient
                  colors={['#79080A', '#DF0F12']}
                  style={styles.totemGuideActionButton}
                >
                  <Text style={styles.totemGuideActionText}>Answer</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}

            {totemGuidePhase === 'feedback' && (
              <TouchableOpacity
                style={styles.totemGuideActionWrap}
                activeOpacity={0.85}
                onPress={handleTotemGuideNext}
              >
                <LinearGradient
                  colors={['#79080A', '#DF0F12']}
                  style={styles.totemGuideActionButton}
                >
                  <Text style={styles.totemGuideActionText}>
                    {totemGuideRoundIndex + 1 >= TOTEM_GUIDE_TOTAL_ROUNDS
                      ? 'Result'
                      : 'Next round'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </>
        )}

        {totemGuidePhase === 'result' && (
          <>
            <View style={styles.totemGuideResultImageWrap}>
              <Image
                source={require('../TotemAssets/i/oboard/4.png')}
                style={styles.totemGuideResultImage}
              />
            </View>

            <LinearGradient
              colors={['#FBDFBC', '#FAC57F']}
              style={styles.totemGuideResultCard}
            >
              <View style={styles.totemGuideResultPadding}>
                <Text style={styles.totemGuideResultTitle}>Result</Text>

                <Text style={styles.totemGuideResultText}>
                  You have successfully completed {totemGuideSuccessRounds} out
                  of {TOTEM_GUIDE_TOTAL_ROUNDS} rounds so you will receive:
                </Text>

                <View style={styles.totemGuideStarsBadgeWrap}>
                  <ImageBackground
                    source={require('../TotemAssets/i/res.png')}
                    style={styles.totemGuideStarsBadge}
                  >
                    <Image source={require('../TotemAssets/i/star.png')} />
                    <Text style={styles.totemGuideStarsBadgeText}>
                      {String(totemGuideTotalStars).padStart(3, '0')}
                    </Text>
                  </ImageBackground>
                </View>

                <TouchableOpacity
                  style={styles.totemGuideActionWrap}
                  activeOpacity={0.85}
                  onPress={handleTotemGuideShare}
                >
                  <LinearGradient
                    colors={['#79080A', '#DF0F12']}
                    style={styles.totemGuideActionButton}
                  >
                    <Text style={styles.totemGuideActionText}>Share</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
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
    fontSize: 17,
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
  },
  totemGuideTimerBadgeText: {
    color: '#79080A',
    fontSize: 16,
    fontFamily: 'Ubuntu-Bold',
  },
  totemGuideInfoCard: {
    height: 100,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DF0F12',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4CF92',
  },
  totemGuideGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totemGuideSlot: {
    width: '48%',
    minHeight: 166,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DF0F12',
    backgroundColor: '#F4CF92',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  totemGuideSlotCorrect: {
    borderColor: '#00D22B',
  },
  totemGuideSlotWrong: {
    borderColor: '#DF0F12',
  },
  totemGuideSlotHint: {
    color: '#9D0B10',
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  totemGuideAnimalImage: {
    width: 128,
    height: 128,
  },
  totemGuideRemoveWrap: {
    width: '88%',
    marginTop: 8,
  },
  totemGuideRemoveButton: {
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuideRemoveText: {
    color: '#FAC57F',
    fontSize: 13,
    fontFamily: 'Ubuntu-Bold',
  },
  totemGuidePickerRow: {
    width: '100%',
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totemGuidePickerItem: {
    width: '23.5%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DF0F12',
    backgroundColor: '#F4CF92',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuidePickerItemDisabled: {
    opacity: 0.45,
  },
  totemGuidePickerItemSelected: {
    borderColor: '#79080A',
    borderWidth: 2,
  },
  totemGuidePickerImage: {
    width: 56,
    height: 56,
  },
  totemGuideActionWrap: {
    width: '100%',
    marginTop: 12,
  },
  totemGuideActionButton: {
    height: 56,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FAC57F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuideActionText: {
    color: '#FAC57F',
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
  },
  totemGuideResultImage: {
    width: 317,
    height: 317,
    marginBottom: 12,
  },
  totemGuideResultImageWrap: {
    width: 317,
    height: 317,
    marginBottom: 12,
  },
  totemGuideResultCard: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#79080A',
  },
  totemGuideResultPadding: {
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  totemGuideResultTitle: {
    color: '#B00012',
    fontSize: 28,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  totemGuideResultText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
  totemGuideStarsBadgeWrap: {
    alignSelf: 'center',
    marginTop: 15,
  },
  totemGuideStarsBadge: {
    width: 200,
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  totemGuideStarsBadgeText: {
    color: '#FAC57F',
    fontSize: 29,
    fontFamily: 'Ubuntu-Bold',
  },
});

export default AttentionGameScreen;
