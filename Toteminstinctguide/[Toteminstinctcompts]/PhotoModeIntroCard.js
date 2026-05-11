import React, { useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const REF_WIDTH = 375;
const REF_HEIGHT = 812;

const PhotoModeIntroCard = ({ onGoPress }) => {
  const width = REF_WIDTH;
  const height = REF_HEIGHT;
  const rw = width / REF_WIDTH;
  const rh = height / REF_HEIGHT;
  const rs = Math.min(rw, rh);

  const s = useMemo(
    () => ({
      imageWrap: {
        width: '100%',
        alignItems: 'center',
        marginBottom: height * 0.022,
      },
      image: {
        width: 314,
        height: 314,
        resizeMode: 'contain',
      },
      card: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: width * 0.059,
        borderWidth: 1,
        borderColor: '#79080A',
        alignItems: 'center',
      },
      cardPadding: { padding: width * 0.04, width: '100%' },
      cardTitle: {
        color: '#79080A',
        fontSize: Math.round(32 * rs),
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
        marginBottom: height * 0.006,
      },
      cardDescription: {
        color: '#000',
        fontSize: Math.round(15 * rs),
        fontFamily: 'Ubuntu-Regular',
        textAlign: 'center',
        marginTop: height * 0.015,
      },
      actionWrap: { width: '100%', marginTop: height * 0.025 },
      actionButton: {
        width: '100%',
        height: height * 0.059,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FAC57F',
        alignSelf: 'center',
      },
      actionText: {
        color: '#FAC57F',
        fontSize: Math.round(20 * rs),
        fontFamily: 'Ubuntu-Bold',
      },
    }),
    [width, height, rs],
  );

  return (
    <>
      <View style={s.imageWrap}>
        <View style={s.image}>
          <Image
            source={require('../TotemAssets/i/oboard/2.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
      </View>

      <LinearGradient colors={['#FBDFBC', '#FAC57F']} style={s.card}>
        <View style={s.cardPadding}>
          <Text style={s.cardTitle}>Traits mode</Text>
          <Text style={s.cardDescription}>
            Discover your totem animal by selecting the traits that describe
            your personality and instincts.
          </Text>

          <TouchableOpacity
            style={s.actionWrap}
            activeOpacity={0.85}
            onPress={onGoPress}
          >
            <LinearGradient
              colors={['#79080A', '#DF0F12']}
              style={s.actionButton}
            >
              <Text style={s.actionText}>Go</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
};

export default PhotoModeIntroCard;
