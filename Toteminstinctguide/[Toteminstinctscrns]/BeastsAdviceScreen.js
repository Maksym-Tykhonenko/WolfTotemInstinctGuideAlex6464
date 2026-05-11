import LinearGradient from 'react-native-linear-gradient';

import TottmLayout from '../[Toteminstinctcompts]/TottmLayout';
import React, { useState } from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TOTEM_GUIDE_BEASTS = [
  {
    id: 'wolf',
    name: 'Wolf',
    trait: 'Direct & honest',
    description:
      'Short, bold advice that pushes you to act and trust your instinct.',
    image: require('../TotemAssets/i/wolf.png'),
    advice: [
      'Trust your instinct.',
      'Lead, even when unsure.',
      'Stand your ground.',
      'Protect what matters.',
      "Act, don't wait.",
      'Be loyal to yourself.',
      'Face challenges head-on.',
      'Speak the truth.',
      'Move with purpose.',
      'Choose your pack wisely.',
      "Don't fear solitude.",
      'Stay alert.',
      'Commit fully.',
      'Follow your inner call.',
      'Strength comes from focus.',
      'Take responsibility.',
      'Walk your own path.',
      'Confidence is built in action.',
      'Respect your boundaries.',
      'Trust who you are.',
    ],
  },
  {
    id: 'bison',
    name: 'Bison',
    trait: 'Calm & grounding',
    description: 'Steady advice that reminds you to slow down and stay strong.',
    image: require('../TotemAssets/i/bison.png'),
    advice: [
      'Move slowly, move strong.',
      'Stay grounded.',
      'Patience brings power.',
      "Don't rush your journey.",
      'Strength grows with time.',
      'Stand firm in storms.',
      'Keep your balance.',
      'One step is enough today.',
      'Endurance wins.',
      'Rest when needed.',
      'Trust steady progress.',
      'Be resilient.',
      'Carry your weight with pride.',
      'Calm is strength.',
      "Don't fear long paths.",
      'Stay rooted.',
      'Breathe deeply.',
      'Stability creates freedom.',
      'Hold your position.',
      'You are stronger than you think.',
    ],
  },
  {
    id: 'falcon',
    name: 'Falcon',
    trait: 'Clear & focused',
    description: 'Sharp advice that helps you see priorities and act fast.',
    image: require('../TotemAssets/i/falcon.png'),
    advice: [
      'See the bigger picture.',
      'Focus on one target.',
      'Act at the right moment.',
      'Clear your mind.',
      'Cut distractions.',
      'Decide fast.',
      'Precision beats force.',
      'Rise above doubt.',
      'Keep your vision sharp.',
      "Don't hesitate too long.",
      'Trust your timing.',
      'Think ahead.',
      'Speed comes from clarity.',
      'Stay light and alert.',
      'Choose wisely.',
      'Strike with purpose.',
      'Look forward, not back.',
      'Simplify your path.',
      'Focus brings power.',
      'Move with intention.',
    ],
  },
  {
    id: 'lynx',
    name: 'Lynx',
    trait: 'Subtle & intuitive',
    description:
      'Quiet advice that guides you through insight and hidden signs.',
    image: require('../TotemAssets/i/lynx.png'),
    advice: [
      'Observe before acting.',
      'Trust quiet signals.',
      'Not everything is visible.',
      'Listen more than you speak.',
      'Move unseen.',
      'Follow intuition.',
      'Notice small details.',
      'Silence holds answers.',
      'Stay aware.',
      'Patience reveals truth.',
      'Choose the right moment.',
      'Look between the lines.',
      'Stay adaptable.',
      'Mystery is strength.',
      'Let things unfold.',
      'Watch carefully.',
      'Insight comes quietly.',
      "Don't rush clarity.",
      'Trust what you sense.',
      'See what others miss.',
    ],
  },
];

const getTotemGuideRandomAdvice = totemGuideBeast => {
  const totemGuideIndex = Math.floor(
    Math.random() * totemGuideBeast.advice.length,
  );
  return totemGuideBeast.advice[totemGuideIndex];
};

const BeastsAdviceScreen = ({ navigation }) => {
  const [totemGuideCurrentIndex, setTotemGuideCurrentIndex] = useState(0);

  const totemGuideBeast = TOTEM_GUIDE_BEASTS[totemGuideCurrentIndex];

  const handleTotemGuidePrev = () => {
    setTotemGuideCurrentIndex(totemGuideIndex =>
      totemGuideIndex <= 0
        ? TOTEM_GUIDE_BEASTS.length - 1
        : totemGuideIndex - 1,
    );
  };

  const handleTotemGuideNext = () => {
    setTotemGuideCurrentIndex(totemGuideIndex =>
      totemGuideIndex >= TOTEM_GUIDE_BEASTS.length - 1
        ? 0
        : totemGuideIndex + 1,
    );
  };

  const handleTotemGuideChoose = () => {
    const totemGuideAdvice = getTotemGuideRandomAdvice(totemGuideBeast);
    const totemGuideStack = navigation.getParent();
    const totemGuideParams = {
      beastId: totemGuideBeast.id,
      adviceText: totemGuideAdvice,
    };

    if (totemGuideStack?.navigate) {
      totemGuideStack.navigate('BeastsAdviceResultScreen', totemGuideParams);
    } else {
      navigation.navigate('BeastsAdviceResultScreen', totemGuideParams);
    }
  };

  const renderTotemGuideHeader = () => (
    <View style={styles.totemGuideHeaderRow}>
      <LinearGradient
        colors={['#79080A', '#DF0F12']}
        style={styles.totemGuideHeaderPill}
      >
        <View style={styles.totemGuideHeaderTitleRow}>
          <Text style={styles.totemGuideHeaderTitleText}>Beast's advice</Text>
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

  const renderTotemGuideBrowse = () => (
    <>
      <View style={styles.totemGuideBeastImageWrap}>
        <Image
          source={totemGuideBeast.image}
          style={styles.totemGuideBeastImage}
        />
      </View>

      <LinearGradient
        colors={['#FBDFBC', '#FAC57F']}
        style={styles.totemGuideCard}
      >
        <View style={styles.totemGuideDotsRow}>
          {TOTEM_GUIDE_BEASTS.map((_, totemGuideIndex) => (
            <View
              key={totemGuideIndex}
              style={[
                styles.totemGuideDot,
                totemGuideIndex === totemGuideCurrentIndex &&
                  styles.totemGuideDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.totemGuideSavedButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('SavedAdvicesScreen')}
        >
          <Image source={require('../TotemAssets/i/svd.png')} />
        </TouchableOpacity>

        <View style={styles.totemGuideCardContent}>
          <Text style={styles.totemGuideCardTitle}>{totemGuideBeast.name}</Text>
          <Text style={styles.totemGuideCardTrait}>
            {totemGuideBeast.trait}
          </Text>
          <Text style={styles.totemGuideCardDescription}>
            {totemGuideBeast.description}
          </Text>

          <View style={styles.totemGuideNavRow}>
            {totemGuideCurrentIndex > 0 ? (
              <TouchableOpacity
                style={styles.totemGuideNavButtonWrap}
                activeOpacity={0.85}
                onPress={handleTotemGuidePrev}
              >
                <LinearGradient
                  colors={['#79080A', '#DF0F12']}
                  style={styles.totemGuideNavButton}
                >
                  <Image source={require('../TotemAssets/i/prevArr.png')} />
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <View style={styles.totemGuideNavButtonPlaceholder} />
            )}

            <TouchableOpacity
              style={styles.totemGuideChooseButtonWrap}
              activeOpacity={0.85}
              onPress={handleTotemGuideChoose}
            >
              <LinearGradient
                colors={['#79080A', '#DF0F12']}
                style={styles.totemGuideChooseButton}
              >
                <Text style={styles.totemGuideChooseButtonText}>Choose</Text>
              </LinearGradient>
            </TouchableOpacity>

            {totemGuideCurrentIndex < TOTEM_GUIDE_BEASTS.length - 1 ? (
              <TouchableOpacity
                style={styles.totemGuideNavButtonWrap}
                activeOpacity={0.85}
                onPress={handleTotemGuideNext}
              >
                <LinearGradient
                  colors={['#79080A', '#DF0F12']}
                  style={styles.totemGuideNavButton}
                >
                  <Image source={require('../TotemAssets/i/nextArr.png')} />
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <View style={styles.totemGuideNavButtonPlaceholder} />
            )}
          </View>
        </View>
      </LinearGradient>
    </>
  );

  return (
    <TottmLayout>
      <View style={styles.totemGuideContainer}>
        {renderTotemGuideHeader()}
        {renderTotemGuideBrowse()}
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
    fontSize: 20,
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
  totemGuideBeastImage: {},
  totemGuideCard: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#79080A',
    alignItems: 'center',
  },
  totemGuideCardContent: {
    padding: 20,
    paddingTop: 12,
    width: '100%',
  },
  totemGuideCardTitle: {
    color: '#79080A',
    fontSize: 32,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  totemGuideCardTrait: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    marginBottom: 14,
  },
  totemGuideCardDescription: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
  totemGuideDotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 3,
    position: 'absolute',
    top: 20,
    right: 15,
  },
  totemGuideDot: {
    width: 14,
    height: 14,
    borderRadius: 3,
    backgroundColor: '#A2171980',
    opacity: 0.6,
  },
  totemGuideDotActive: {
    backgroundColor: '#79080A',
    opacity: 1,
  },
  totemGuideSavedButton: {
    position: 'absolute',
    left: 10,
    top: 5,
    zIndex: 1,
  },
  totemGuideNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    marginTop: 20,
  },
  totemGuideNavButtonWrap: {
    flex: 0,
  },
  totemGuideNavButtonPlaceholder: {
    width: 59,
    height: 59,
  },
  totemGuideNavButton: {
    width: 59,
    height: 59,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
  },
  totemGuideChooseButtonWrap: {
    flex: 1,
  },
  totemGuideChooseButton: {
    height: 59,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
  },
  totemGuideChooseButtonText: {
    color: '#FAC57F',
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
  },
});

export default BeastsAdviceScreen;
