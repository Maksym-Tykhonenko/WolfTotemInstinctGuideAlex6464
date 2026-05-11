import BeastsAdviceScreen from './Toteminstinctguide/[Toteminstinctscrns]/BeastsAdviceScreen';
import RiddlesScreen from './Toteminstinctguide/[Toteminstinctscrns]/RiddlesScreen';
import CollectionScreen from './Toteminstinctguide/[Toteminstinctscrns]/CollectionScreen';
import PhotoModeIntro from './Toteminstinctguide/[Toteminstinctscrns]/PhotoModeIntro';
import AttentionIntroScreen from './Toteminstinctguide/[Toteminstinctscrns]/AttentionIntroScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ChooseModeScreen from './Toteminstinctguide/[Toteminstinctscrns]/ChooseModeScreen';

const Tab = createBottomTabNavigator();

const AnimatedTabButton = (props: Record<string, unknown>) => {
  const { children, style, onPress, onLongPress, ...rest } = props;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style as ViewStyle, styles.totemGuidetabButton]}
      {...rest}
    >
      <Animated.View
        style={[styles.totemGuidetabButtonInner, { transform: [{ scale }] }]}
      >
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.totemGuidetabBar],
        tabBarActiveTintColor: '#5C0405CC',
        tabBarButton: props => (
          <AnimatedTabButton {...(props as Record<string, unknown>)} />
        ),
        tabBarBackground: () => (
          <View style={StyleSheet.absoluteFill}>
            <LinearGradient
              colors={['#FBDFBC', '#FAC57F']}
              style={[StyleSheet.absoluteFill]}
            />
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="ChooseModeScreen"
        component={ChooseModeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.totemGuidetabIconWrap}>
              <Image
                source={require('./Toteminstinctguide/TotemAssets/icons/tab1.png')}
                tintColor={focused ? '#5C0405CC' : undefined}
              />
              {focused && <View style={styles.totemGuidetabDot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PhotoModeIntro"
        component={PhotoModeIntro}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.totemGuidetabIconWrap}>
              <Image
                source={require('./Toteminstinctguide/TotemAssets/icons/tab2.png')}
                tintColor={focused ? '#5C0405CC' : undefined}
              />
              {focused && <View style={styles.totemGuidetabDot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="BeastsAdviceScreen"
        component={BeastsAdviceScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.totemGuidetabIconWrap}>
              <Image
                source={require('./Toteminstinctguide/TotemAssets/icons/tab3.png')}
                tintColor={focused ? '#5C0405CC' : undefined}
              />
              {focused && <View style={styles.totemGuidetabDot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="RiddlesScreen"
        component={RiddlesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.totemGuidetabIconWrap}>
              <Image
                source={require('./Toteminstinctguide/TotemAssets/icons/tab4.png')}
                tintColor={focused ? '#5C0405CC' : undefined}
              />
              {focused && <View style={styles.totemGuidetabDot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AttentionIntroScreen"
        component={AttentionIntroScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.totemGuidetabIconWrap}>
              <Image
                source={require('./Toteminstinctguide/TotemAssets/icons/tab5.png')}
                tintColor={focused ? '#5C0405CC' : undefined}
              />
              {focused && <View style={styles.totemGuidetabDot} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TempleSettingsScreen"
        component={CollectionScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.totemGuidetabIconWrap}>
              <Image
                source={require('./Toteminstinctguide/TotemAssets/icons/tab6.png')}
                tintColor={focused ? '#5C0405CC' : undefined}
              />
              {focused && (
                <View style={[styles.totemGuidetabDot, { right: 11 }]} />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  totemGuidetabButton: {
    flex: 1,
  },
  totemGuidetabButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuidetabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  totemGuidetabDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#5C0405CC',
    position: 'absolute',
    top: 35,
  },
  totemGuidetabBar: {
    marginHorizontal: 16,
    elevation: 0,
    paddingTop: 18,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 34,
    paddingHorizontal: 6,
    borderColor: '#DF0F12',
    borderTopWidth: 1.9,
    borderTopColor: '#DF0F12',
    backgroundColor: 'transparent',
    borderRadius: 20,
    height: 72,
    paddingBottom: 20,
    overflow: 'hidden',
    borderWidth: 1.9,
  },
});

export default BottomTabs;
