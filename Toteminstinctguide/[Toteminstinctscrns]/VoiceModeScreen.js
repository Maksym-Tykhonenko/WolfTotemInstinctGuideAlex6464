import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../[Toteminstinctcompts]/TottmLayout';

const TOTEM_GUIDE_TOTEM_ANIMALS = [
  {
    id: 'wolf',
    name: 'Wolf',
    subtitle: 'Leadership & instinct',
    description:
      'The Wolf represents inner strength, loyalty, and intuition. It guides you to trust yourself, act with confidence, and lead your own path.',
    image: require('../TotemAssets/i/wolf.png'),
  },
  {
    id: 'falcon',
    name: 'Falcon',
    subtitle: 'Focus & vision',
    description:
      'The Falcon stands for clarity, speed, and sharp decisions. It helps you see the bigger picture and strike at the right moment.',
    image: require('../TotemAssets/i/falcon.png'),
  },
  {
    id: 'bison',
    name: 'Bison',
    subtitle: 'Power & endurance',
    description:
      'The Bison symbolizes stability, patience, and raw strength. It reminds you to move forward steadily and stay grounded no matter the challenge.',
    image: require('../TotemAssets/i/bison.png'),
  },
  {
    id: 'lynx',
    name: 'Lynx',
    subtitle: 'Awareness & intuition',
    description:
      'The Lynx represents perception, mystery, and precision. It teaches you to notice what others miss and trust subtle signals.',
    image: require('../TotemAssets/i/lynx.png'),
  },
];

const getTotemGuideRandomAnimal = () => {
  const totemGuideIndex = Math.floor(
    Math.random() * TOTEM_GUIDE_TOTEM_ANIMALS.length,
  );
  return TOTEM_GUIDE_TOTEM_ANIMALS[totemGuideIndex];
};

const VoiceModeScreen = ({ navigation }) => {
  const [totemGuidePhase, setTotemGuidePhase] = useState('recording');
  const [totemGuideSecondsLeft, setTotemGuideSecondsLeft] = useState(15);
  const [totemGuideAnimal, setTotemGuideAnimal] = useState(null);

  const totemGuideTimerRef = useRef(null);
  const totemGuideProcessingRef = useRef(null);
  const totemGuidePulseAnim1 = useRef(new Animated.Value(0)).current;
  const totemGuidePulseAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (totemGuidePhase !== 'recording') {
      return;
    }

    setTotemGuideSecondsLeft(15);

    totemGuideTimerRef.current = setInterval(() => {
      setTotemGuideSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(totemGuideTimerRef.current);
          totemGuideTimerRef.current = null;
          setTotemGuidePhase('processing');
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (totemGuideTimerRef.current) {
        clearInterval(totemGuideTimerRef.current);
        totemGuideTimerRef.current = null;
      }
    };
  }, [totemGuidePhase]);

  useEffect(() => {
    if (totemGuidePhase !== 'recording') {
      totemGuidePulseAnim1.stopAnimation();
      totemGuidePulseAnim2.stopAnimation();
      totemGuidePulseAnim1.setValue(0);
      totemGuidePulseAnim2.setValue(0);
      return;
    }

    const createTotemGuidePulse = (totemGuideAnimValue, totemGuideDelay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(totemGuideDelay),
          Animated.timing(totemGuideAnimValue, {
            toValue: 1,
            duration: 1200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(totemGuideAnimValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      );

    const totemGuidePulse1 = createTotemGuidePulse(totemGuidePulseAnim1, 0);
    const totemGuidePulse2 = createTotemGuidePulse(totemGuidePulseAnim2, 600);

    totemGuidePulse1.start();
    totemGuidePulse2.start();

    return () => {
      totemGuidePulse1.stop();
      totemGuidePulse2.stop();
    };
  }, [totemGuidePhase, totemGuidePulseAnim1, totemGuidePulseAnim2]);

  useEffect(() => {
    if (totemGuidePhase !== 'processing') {
      return;
    }

    totemGuideProcessingRef.current = setTimeout(() => {
      setTotemGuideAnimal(getTotemGuideRandomAnimal());
      setTotemGuidePhase('result');
    }, 1700);

    return () => {
      if (totemGuideProcessingRef.current) {
        clearTimeout(totemGuideProcessingRef.current);
        totemGuideProcessingRef.current = null;
      }
    };
  }, [totemGuidePhase]);

  const handleTotemGuideShareAnimal = () => {
    if (!totemGuideAnimal) {
      return;
    }

    Share.share({
      message: `I found my totem animal: ${totemGuideAnimal.name} 
${totemGuideAnimal.description}`,
    });
  };

  const renderTotemGuideRecording = () => (
    <>
      <View style={styles.totemGuideVoiceTimerRow}>
        <Image source={require('../TotemAssets/i/clock.png')} />
        <View style={styles.totemGuideVoiceTimerBadge}>
          <Text style={styles.totemGuideVoiceTimerText}>
            {`00:${String(totemGuideSecondsLeft).padStart(2, '0')}`}
          </Text>
        </View>
      </View>

      <View style={styles.totemGuideVoiceMicWrap}>
        <View style={styles.totemGuideVoiceMicPulseContainer}>
          <Animated.View
            style={[
              styles.totemGuideVoicePulseRing,
              {
                transform: [
                  {
                    scale: totemGuidePulseAnim1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.6],
                    }),
                  },
                ],
                opacity: totemGuidePulseAnim1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 0],
                }),
              },
            ]}
          />

          <Animated.View
            style={[
              styles.totemGuideVoicePulseRing,
              {
                transform: [
                  {
                    scale: totemGuidePulseAnim2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.6],
                    }),
                  },
                ],
                opacity: totemGuidePulseAnim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 0],
                }),
              },
            ]}
          />

          <View style={styles.totemGuideVoiceMicOuter}>
            <View style={styles.totemGuideVoiceMicInner}>
              <Image source={require('../TotemAssets/i/microphn.png')} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.totemGuideVoiceStatusMargin}>
        <LinearGradient
          colors={['#FBDFBC', '#FAC57F']}
          style={styles.totemGuideVoiceStatusBadge}
        >
          <View style={styles.totemGuideVoiceStatusPadding}>
            <Text style={styles.totemGuideVoiceStatusText}>
              Voice is being recorded
            </Text>
          </View>
        </LinearGradient>
      </View>
    </>
  );

  const renderTotemGuideProcessing = () => (
    <>
      <View style={styles.totemGuideVoiceTimerRow}>
        <View style={styles.totemGuideVoiceTimerRow}>
          <Image source={require('../TotemAssets/i/clock.png')} />
          <View style={styles.totemGuideVoiceTimerBadge}>
            <Text style={styles.totemGuideVoiceTimerText}>Time is up</Text>
          </View>
        </View>
      </View>

      <View style={styles.totemGuideVoiceMicWrap}>
        <View style={styles.totemGuideVoiceMicOuter}>
          <View style={styles.totemGuideVoiceMicInner}>
            <Image source={require('../TotemAssets/i/microphn.png')} />
          </View>
        </View>
      </View>

      <View style={styles.totemGuideVoiceStatusMargin}>
        <LinearGradient
          colors={['#FBDFBC', '#FAC57F']}
          style={styles.totemGuideVoiceStatusBadge}
        >
          <View style={styles.totemGuideVoiceStatusPadding}>
            <Text style={styles.totemGuideVoiceStatusText}>
              Please wait... Preparing results
            </Text>
          </View>
        </LinearGradient>
      </View>
    </>
  );

  const renderTotemGuideResult = () => {
    if (!totemGuideAnimal) {
      return null;
    }

    return (
      <>
        <View style={styles.totemGuideVoiceImageWrap}>
          <Image source={totemGuideAnimal.image} />
        </View>

        <LinearGradient
          colors={['#FBDFBC', '#FAC57F']}
          style={styles.totemGuideVoiceCard}
        >
          <View style={styles.totemGuideVoiceStatusPadding}>
            <Text style={styles.totemGuideVoiceCardTitle}>
              {totemGuideAnimal.name}
            </Text>
            <Text style={styles.totemGuideVoiceCardSubtitle}>
              {totemGuideAnimal.subtitle}
            </Text>
            <Text style={styles.totemGuideVoiceCardDescription}>
              {totemGuideAnimal.description}
            </Text>

            <TouchableOpacity
              style={styles.totemGuideVoiceShareWrap}
              activeOpacity={0.85}
              onPress={handleTotemGuideShareAnimal}
            >
              <LinearGradient
                colors={['#79080A', '#DF0F12']}
                style={styles.totemGuideVoiceShareButton}
              >
                <Text style={styles.totemGuideVoiceShareText}>Share</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </>
    );
  };

  return (
    <TottmLayout>
      <View style={styles.totemGuideVoiceContainer}>
        <View style={styles.totemGuideVoiceTopRow}>
          <LinearGradient
            colors={['#79080A', '#DF0F12']}
            style={styles.totemGuideVoiceTitlePill}
          >
            <View style={styles.totemGuideVoiceTitleRow}>
              <TouchableOpacity
                style={styles.totemGuideVoiceBackWrap}
                activeOpacity={0.85}
                onPress={() => navigation.goBack()}
              >
                <Image source={require('../TotemAssets/i/back.png')} />
              </TouchableOpacity>

              <Text style={styles.totemGuideVoiceTitleText}>
                Voice totem beast
              </Text>
            </View>
          </LinearGradient>

          <View style={styles.totemGuideVoiceThumbWrap}>
            <Image
              source={require('../TotemAssets/i/apphead.png')}
              style={styles.totemGuideVoiceThumbImage}
            />
          </View>
        </View>

        {totemGuidePhase === 'recording' ? renderTotemGuideRecording() : null}
        {totemGuidePhase === 'processing' ? renderTotemGuideProcessing() : null}
        {totemGuidePhase === 'result' ? renderTotemGuideResult() : null}
      </View>
    </TottmLayout>
  );
};

const styles = StyleSheet.create({
  totemGuideVoiceContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 48,
    alignItems: 'center',
  },
  totemGuideVoiceTopRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totemGuideVoiceTitlePill: {
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FAC57F',
    minHeight: 88,
    justifyContent: 'center',
  },
  totemGuideVoiceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totemGuideVoiceBackWrap: {
    marginLeft: 12,
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F4CF92',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuideVoiceTitleText: {
    color: '#FAC57F',
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
    width: '80%',
  },
  totemGuideVoiceThumbWrap: {
    width: 88,
    height: 88,
    overflow: 'hidden',
  },
  totemGuideVoiceThumbImage: {
    width: '100%',
    height: '100%',
  },
  totemGuideVoiceImageWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  totemGuideVoiceCard: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#79080A',
    alignItems: 'center',
  },
  totemGuideVoiceCardTitle: {
    color: '#79080A',
    fontSize: 22,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  totemGuideVoiceCardSubtitle: {
    color: '#79080A',
    fontSize: 15,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    marginTop: 6,
  },
  totemGuideVoiceCardDescription: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
  totemGuideVoiceTimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    gap: 5,
  },
  totemGuideVoiceTimerBadge: {
    paddingHorizontal: 8,
    height: 70,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#79080A',
    backgroundColor: '#FAC57F',
    width: 120,
  },
  totemGuideVoiceTimerText: {
    color: '#79080A',
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
  },
  totemGuideVoiceMicWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 80,
  },
  totemGuideVoiceMicPulseContainer: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuideVoicePulseRing: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#79080A',
  },
  totemGuideVoiceMicOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#79080A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuideVoiceMicInner: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#79080A',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAC57F',
  },
  totemGuideVoiceStatusMargin: {
    marginTop: 80,
    width: '100%',
    alignItems: 'center',
  },
  totemGuideVoiceStatusBadge: {
    width: '80%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#79080A',
    backgroundColor: '#FBDFBC',
  },
  totemGuideVoiceStatusPadding: {
    padding: 16,
    paddingHorizontal: 12,
    width: '100%',
  },
  totemGuideVoiceStatusText: {
    color: '#79080A',
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
  },
  totemGuideVoiceShareWrap: {
    width: '100%',
  },
  totemGuideVoiceShareButton: {
    width: '100%',
    height: 50,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
    alignSelf: 'center',
    marginTop: 8,
  },
  totemGuideVoiceShareText: {
    color: '#FAC57F',
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
  },
});

export default VoiceModeScreen;
