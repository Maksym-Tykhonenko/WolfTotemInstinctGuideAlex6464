import React, { useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const TotemGuideSpnr = () => {
  const navigation = useNavigation();
  const timerRef = useRef(null);
  {
    /** 
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      try {
        navigation.replace('WelcomeGuideScreen');

        console.log('ok!');
      } catch (err) {
        console.warn('failed 1 replace', err);
        try {
          navigation.navigate('WelcomeGuideScreen');
        } catch (err2) {
          console.error('failed err 2', err2);
        }
      }
    }, 6000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        console.log('timer cleared');
      }
    };
  }, [navigation]);*/
  }

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../TotemAssets/i/fallbck.png')}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image source={require('../TotemAssets/i/ld_icon.png')} />
      </ScrollView>
    </ImageBackground>
  );
};

export default TotemGuideSpnr;
