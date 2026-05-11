import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../[Toteminstinctcompts]/TottmLayout';

const RIDDLES = [
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What grows when shared?',
    options: ['Fear', 'Silence', 'Trust', 'Time'],
    correctIndex: 2,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What shows who you truly are?',
    options: ['Words', 'Actions', 'Dreams', 'Luck'],
    correctIndex: 1,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What makes a leader strong?',
    options: ['Power', 'Control', 'Responsibility', 'Speed'],
    correctIndex: 2,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What should you follow when lost?',
    options: ['Noise', 'Crowd', 'Instinct', 'Fear'],
    correctIndex: 2,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What breaks when betrayed?',
    options: ['Time', 'Trust', 'Strength', 'Focus'],
    correctIndex: 1,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What grows from challenge?',
    options: ['Comfort', 'Strength', 'Silence', 'Luck'],
    correctIndex: 1,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What defines your path?',
    options: ['Others', 'Fear', 'Choice', 'Chance'],
    correctIndex: 2,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What protects your energy?',
    options: ['Anger', 'Boundaries', 'Speed', 'Noise'],
    correctIndex: 1,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What leads before words?',
    options: ['Thought', 'Action', 'Hope', 'Doubt'],
    correctIndex: 1,
  },
  {
    beastId: 'wolf',
    beastName: 'Wolf',
    question: 'What matters when standing alone?',
    options: ['Approval', 'Courage', 'Noise', 'Time'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What wins long journeys?',
    options: ['Speed', 'Patience', 'Luck', 'Power'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What keeps you standing?',
    options: ['Noise', 'Balance', 'Anger', 'Fear'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What grows quietly?',
    options: ['Chaos', 'Strength', 'Pressure', 'Rush'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What calms the mind?',
    options: ['Control', 'Breath', 'Speed', 'Noise'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What makes progress real?',
    options: ['Plans', 'Consistency', 'Dreams', 'Luck'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What holds value over time?',
    options: ['Trends', 'Stability', 'Speed', 'Risk'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What keeps you grounded?',
    options: ['Fear', 'Purpose', 'Noise', 'Doubt'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What helps you endure?',
    options: ['Anger', 'Focus', 'Calm', 'Rush'],
    correctIndex: 2,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What carries you through storms?',
    options: ['Escape', 'Strength', 'Speed', 'Hope'],
    correctIndex: 1,
  },
  {
    beastId: 'bison',
    beastName: 'Bison',
    question: 'What should never be rushed?',
    options: ['Success', 'Noise', 'Rest', 'Thought'],
    correctIndex: 0,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What clears confusion?',
    options: ['Speed', 'Focus', 'Noise', 'Fear'],
    correctIndex: 1,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What reveals the truth?',
    options: ['Distance', 'Force', 'Rush', 'Doubt'],
    correctIndex: 0,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What sharpens decisions?',
    options: ['Emotion', 'Clarity', 'Pressure', 'Noise'],
    correctIndex: 1,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What makes action effective?',
    options: ['Timing', 'Speed', 'Power', 'Luck'],
    correctIndex: 0,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What should you cut first?',
    options: ['Goals', 'Distractions', 'Rest', 'Silence'],
    correctIndex: 1,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What improves direction?',
    options: ['Focus', 'Noise', 'Control', 'Fear'],
    correctIndex: 0,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What guides smart action?',
    options: ['Impulse', 'Vision', 'Pressure', 'Habit'],
    correctIndex: 1,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What weakens progress?',
    options: ['Doubt', 'Distraction', 'Rest', 'Planning'],
    correctIndex: 1,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What helps you move fast?',
    options: ['Strength', 'Clarity', 'Noise', 'Fear'],
    correctIndex: 1,
  },
  {
    beastId: 'falcon',
    beastName: 'Falcon',
    question: 'What matters before action?',
    options: ['Force', 'Intention', 'Speed', 'Luck'],
    correctIndex: 1,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What speaks without words?',
    options: ['Noise', 'Silence', 'Fear', 'Speed'],
    correctIndex: 1,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What reveals hidden truth?',
    options: ['Observation', 'Force', 'Noise', 'Rush'],
    correctIndex: 0,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What grows in stillness?',
    options: ['Chaos', 'Insight', 'Fear', 'Pressure'],
    correctIndex: 1,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What should you notice first?',
    options: ['Details', 'Noise', 'Speed', 'Opinion'],
    correctIndex: 0,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What guides quiet decisions?',
    options: ['Habit', 'Intuition', 'Logic', 'Rush'],
    correctIndex: 1,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What hides in plain sight?',
    options: ['Truth', 'Fear', 'Strength', 'Control'],
    correctIndex: 0,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What fades when rushed?',
    options: ['Accuracy', 'Speed', 'Power', 'Noise'],
    correctIndex: 0,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What protects awareness?',
    options: ['Silence', 'Control', 'Fear', 'Speed'],
    correctIndex: 0,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What helps you see more?',
    options: ['Stillness', 'Pressure', 'Noise', 'Force'],
    correctIndex: 0,
  },
  {
    beastId: 'lynx',
    beastName: 'Lynx',
    question: 'What should be trusted quietly?',
    options: ['Crowd', 'Intuition', 'Noise', 'Luck'],
    correctIndex: 1,
  },
];

const TOTAL_ROUNDS = 2;

const pickRandomRiddles = () => {
  const shuffled = [...RIDDLES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, TOTAL_ROUNDS);
};

const RiddlesScreen = ({ navigation }) => {
  const handleStart = () => {
    const params = { riddles: pickRandomRiddles() };
    const stack = navigation.getParent();

    if (stack?.navigate) {
      stack.navigate('RiddlesGameScreen', params);
    } else {
      navigation.navigate('RiddlesGameScreen', params);
    }
  };

  const renderHeader = () => (
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
  );

  const renderIntro = () => (
    <>
      <View style={styles.totemGuideIntroImageWrap}>
        <Image source={require('../TotemAssets/i/riddlesScrn.png')} />
      </View>

      <LinearGradient
        colors={['#FBDFBC', '#FAC57F']}
        style={styles.totemGuideIntroCard}
      >
        <View style={styles.totemGuideIntroCardPadding}>
          <Text style={styles.totemGuideIntroCardTitle}>
            Riddles from animals
          </Text>

          <Text style={styles.totemGuideIntroCardText}>
            If there are two riddles, answer them all correctly and you will get
            the wallpaper, if not, you will be lucky next time.
          </Text>

          <TouchableOpacity
            style={styles.totemGuideStartBtnWrap}
            activeOpacity={0.85}
            onPress={handleStart}
          >
            <LinearGradient
              colors={['#79080A', '#DF0F12']}
              style={styles.totemGuideStartBtn}
            >
              <Text style={styles.totemGuideStartBtnText}>Go</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );

  return (
    <TottmLayout>
      <View style={styles.totemGuideContainer}>
        {renderHeader()}
        {renderIntro()}
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
    textAlign: 'center',
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
  totemGuideIntroCard: {
    width: '95%',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#79080A',
    marginBottom: 30,
  },
  totemGuideIntroCardPadding: {
    padding: 10,
    paddingTop: 20,
    width: '100%',
  },
  totemGuideIntroCardTitle: {
    color: '#79080A',
    fontSize: 32,
    fontFamily: 'Ubuntu-Bold',
    marginBottom: 14,
    textAlign: 'center',
  },
  totemGuideIntroCardText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
  totemGuideStartBtnWrap: {
    width: '100%',
  },
  totemGuideStartBtn: {
    height: 59,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
    marginTop: 20,
  },
  totemGuideStartBtnText: {
    color: '#FAC57F',
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
  },
});

export default RiddlesScreen;
