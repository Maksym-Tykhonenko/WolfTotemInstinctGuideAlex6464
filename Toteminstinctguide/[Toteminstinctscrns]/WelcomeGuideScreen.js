import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../[Toteminstinctcompts]/TottmLayout';

const TOTEM_GUIDE_SLIDES = [
  {
    id: 'slide-1',
    image: require('../TotemAssets/i/oboard/1.png'),
    title: 'Find Your Wolf Totem',
    description:
      'Your voice and your look reveal who you truly are. Test your instinct through sound or personality traits and find the animal that matches your inner nature.',
    buttonText: 'Next',
  },
  {
    id: 'slide-2',
    image: require('../TotemAssets/i/oboard/2.png'),
    title: 'Wisdom & Rewards',
    description:
      'Choose any totem animal and receive advice in its unique style. Solve daily riddles from different animals to unlock exclusive wallpapers and build your personal collection.',
    buttonText: 'Okay',
  },
  {
    id: 'slide-3',
    image: require('../TotemAssets/i/oboard/3.png'),
    title: 'Voice or Personality traits Test',
    description:
      'Roar, growl, or show your expression — or upload a picture and choose what feels closest to you. Our system compares patterns to determine your true totem animal.',
    buttonText: 'Continue',
  },
  {
    id: 'slide-3.1',
    image: require('../TotemAssets/i/oboard/4.png'),
    title: 'Attention game',
    description:
      'Test your focus and concentration. For a few seconds you will see animals in a certain order. Remember their location. Then arrange them in the same order. The game has 3 rounds — with each round the time will be less and less.',
    buttonText: 'Start',
  },
  {
    id: 'slide-4',
    title: 'Importantly!!!',
    description:
      'The app does not use your data or files for its own use. All data is for your use and your use of this app only.',
    buttonText: 'Start',
    isImportant: true,
  },
];

const WelcomeGuideScreen = ({ navigation }) => {
  const [totemGuideCurrentIndex, setTotemGuideCurrentIndex] = useState(0);
  const [totemGuideAgreed, setTotemGuideAgreed] = useState(false);

  const handleTotemGuideNext = () => {
    if (totemGuideCurrentIndex < TOTEM_GUIDE_SLIDES.length - 1) {
      setTotemGuideCurrentIndex(prev => prev + 1);
      return;
    }

    navigation.navigate('BottomTabs');
  };

  const handleTotemGuidePrimaryPress = () => {
    const totemGuideCurrentSlide = TOTEM_GUIDE_SLIDES[totemGuideCurrentIndex];

    if (totemGuideCurrentSlide.isImportant) {
      if (totemGuideAgreed) {
        navigation.navigate('BottomTabs');
      }
      return;
    }

    handleTotemGuideNext();
  };

  const totemGuideCurrentSlide = TOTEM_GUIDE_SLIDES[totemGuideCurrentIndex];

  const renderTotemGuideSlide = item => (
    <View style={styles.totemGuideWelcomeSlide}>
      {item.image ? (
        <Image
          source={item.image}
          style={styles.totemGuideWelcomeImage}
          resizeMode="cover"
        />
      ) : null}

      <LinearGradient
        colors={['#FBDFBC', '#FAC57F']}
        style={[
          styles.totemGuideWelcomeGradientBoard,
          !item.image && styles.totemGuideWelcomeGradientBoardSolo,
        ]}
      >
        <View style={styles.totemGuideWelcomeTextBox}>
          <Text
            style={[
              styles.totemGuideWelcomeTitle,
              totemGuideCurrentIndex === 4 &&
                styles.totemGuideWelcomeTitleLarge,
            ]}
          >
            {item.title}
          </Text>

          <Text
            style={[
              styles.totemGuideWelcomeDescription,
              totemGuideCurrentIndex === 4 &&
                styles.totemGuideWelcomeDescriptionLarge,
            ]}
          >
            {item.description}
          </Text>
        </View>
      </LinearGradient>

      {item.isImportant ? (
        <TouchableOpacity
          style={styles.totemGuideWelcomeAgreeRow}
          activeOpacity={0.85}
          onPress={() => setTotemGuideAgreed(prev => !prev)}
        >
          <View
            style={[
              styles.totemGuideWelcomeCheckbox,
              totemGuideAgreed && styles.totemGuideWelcomeCheckboxChecked,
            ]}
          >
            {totemGuideAgreed ? (
              <Image
                source={require('../TotemAssets/i/checked.png')}
                style={styles.totemGuideWelcomeCheckboxMark}
              />
            ) : null}
          </View>

          <LinearGradient
            colors={['#FBDFBC', '#FAC57F']}
            style={styles.totemGuideWelcomeAgreeTextBox}
          >
            <View style={styles.totemGuideWelcomeAgreePadding}>
              <Text style={styles.totemGuideWelcomeAgreeText}>
                I have read the warning and agree to it.
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={[
          styles.totemGuideWelcomeButtonContainer,
          totemGuideCurrentIndex === 4 &&
            styles.totemGuideWelcomeButtonContainerLast,
        ]}
        onPress={handleTotemGuidePrimaryPress}
        disabled={item.isImportant && !totemGuideAgreed}
      >
        <LinearGradient
          colors={
            item.isImportant && !totemGuideAgreed
              ? ['#8E3A3A', '#B05050']
              : ['#79080A', '#DF0F12']
          }
          style={styles.totemGuideWelcomeButton}
        >
          <Text style={styles.totemGuideWelcomeButtonText}>
            {item.buttonText}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <TottmLayout>{renderTotemGuideSlide(totemGuideCurrentSlide)}</TottmLayout>
  );
};

const styles = StyleSheet.create({
  totemGuideWelcomeSlide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  totemGuideWelcomeImage: {
    width: 344,
    height: 344,
    maxWidth: 344,
    maxHeight: 344,
  },
  totemGuideWelcomeGradientBoard: {
    width: '100%',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#79080A',
    marginTop: 30,
    marginBottom: 50,
  },
  totemGuideWelcomeGradientBoardSolo: {
    marginTop: 10,
    marginBottom: 30,
  },
  totemGuideWelcomeTextBox: {
    padding: 30,
  },
  totemGuideWelcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#79080A',
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
  },
  totemGuideWelcomeTitleLarge: {
    fontSize: 32,
  },
  totemGuideWelcomeDescription: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'Ubuntu-Medium',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  totemGuideWelcomeDescriptionLarge: {
    fontSize: 18,
  },
  totemGuideWelcomeAgreeRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  totemGuideWelcomeCheckbox: {
    width: 79,
    height: 79,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#79080A',
    backgroundColor: '#FBDFBC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    opacity: 0.9,
  },
  totemGuideWelcomeCheckboxChecked: {
    backgroundColor: '#FAC57F',
  },
  totemGuideWelcomeCheckboxMark: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  totemGuideWelcomeAgreeTextBox: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#79080A',
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totemGuideWelcomeAgreePadding: {
    padding: 13,
  },
  totemGuideWelcomeAgreeText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
  },
  totemGuideWelcomeButton: {
    height: 70,
    borderRadius: 25,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
  },
  totemGuideWelcomeButtonText: {
    color: '#FAC57F',
    fontSize: 24,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
  },
  totemGuideWelcomeButtonContainer: {
    width: '90%',
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuideWelcomeButtonContainerLast: {
    marginTop: 90,
  },
});

export default WelcomeGuideScreen;
