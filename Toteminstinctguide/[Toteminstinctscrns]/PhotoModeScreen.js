// photo mode screen

import LinearGradient from 'react-native-linear-gradient';
import TottmLayout from '../[Toteminstinctcompts]/TottmLayout';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

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

const TOTEM_GUIDE_ATTRIBUTES = [
  { id: 'kind', label: 'Kind', icon: '😊' },
  { id: 'dominant', label: 'Dominant', icon: '🐺' },
  { id: 'loyal', label: 'Loyal', icon: '🤝' },
  { id: 'swift', label: 'Swift', icon: '⚡' },
  { id: 'silent', label: 'Silent', icon: '👁' },
  { id: 'strong', label: 'Strong', icon: '🦏' },
];

const getTotemGuideRandomAnimal = () => {
  const totemGuideIndex = Math.floor(
    Math.random() * TOTEM_GUIDE_TOTEM_ANIMALS.length,
  );
  return TOTEM_GUIDE_TOTEM_ANIMALS[totemGuideIndex];
};

const PhotoModeScreen = ({ navigation }) => {
  const [totemGuidePhase, setTotemGuidePhase] = useState('addPhoto');
  const [totemGuidePhotoUri, setTotemGuidePhotoUri] = useState(null);
  const [totemGuideSelectedAttributeIds, setTotemGuideSelectedAttributeIds] =
    useState([]);
  const [totemGuideAnimal, setTotemGuideAnimal] = useState(null);
  const totemGuideProcessingRef = useRef(null);

  useEffect(() => {
    if (totemGuidePhase !== 'processing') {
      return;
    }

    totemGuideProcessingRef.current = setTimeout(() => {
      setTotemGuideAnimal(getTotemGuideRandomAnimal());
      setTotemGuidePhase('result');
    }, 2500);

    return () => {
      if (totemGuideProcessingRef.current) {
        clearTimeout(totemGuideProcessingRef.current);
        totemGuideProcessingRef.current = null;
      }
    };
  }, [totemGuidePhase]);

  const handleTotemGuideAddPhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: 1,
      },
      totemGuideResponse => {
        if (
          totemGuideResponse.didCancel ||
          !totemGuideResponse.assets?.length
        ) {
          return;
        }

        const totemGuideUri = totemGuideResponse.assets[0].uri;
        setTotemGuidePhotoUri(totemGuideUri);
      },
    );
  };

  const toggleTotemGuideAttribute = totemGuideId => {
    setTotemGuideSelectedAttributeIds(totemGuidePrev =>
      totemGuidePrev.includes(totemGuideId)
        ? totemGuidePrev.filter(
            totemGuideItem => totemGuideItem !== totemGuideId,
          )
        : [...totemGuidePrev, totemGuideId],
    );
  };

  const handleTotemGuideChoose = () => {
    if (totemGuideSelectedAttributeIds.length === 0) {
      return;
    }

    setTotemGuidePhase('processing');
  };

  const handleTotemGuideShareAnimal = () => {
    if (!totemGuideAnimal) {
      return;
    }

    Share.share({
      message: `I found my totem animal: ${totemGuideAnimal.name}\n${totemGuideAnimal.description}`,
    });
  };

  const renderTotemGuideAddPhoto = () => (
    <>
      <LinearGradient
        colors={['#FBDFBC', '#FAC57F']}
        style={[styles.totemGuidePhotoCard, styles.totemGuidePhotoCardW88]}
      >
        <TouchableOpacity
          style={styles.totemGuidePhotoUploadArea}
          activeOpacity={0.85}
          onPress={handleTotemGuideAddPhoto}
        >
          {totemGuidePhotoUri ? (
            <Image
              source={{ uri: totemGuidePhotoUri }}
              style={styles.totemGuidePhotoPreview}
              resizeMode="cover"
            />
          ) : (
            <>
              <View style={styles.totemGuidePhotoAddIconWrap}>
                <Image source={require('../TotemAssets/i/addImg.png')} />
              </View>
              <Text style={styles.totemGuidePhotoAddLabel}>Add a picture</Text>
            </>
          )}
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        colors={['#FBDFBC', '#FAC57F']}
        style={styles.totemGuidePhotoCard}
      >
        <View style={styles.totemGuidePhotoAttributeHeader}>
          <Text style={styles.totemGuidePhotoAttributeTitle}>
            Choose something about you
          </Text>
        </View>

        <View style={styles.totemGuidePhotoAttributeGrid}>
          {TOTEM_GUIDE_ATTRIBUTES.map(totemGuideAttribute => {
            const totemGuideIsSelected =
              totemGuideSelectedAttributeIds.includes(totemGuideAttribute.id);

            return (
              <TouchableOpacity
                key={totemGuideAttribute.id}
                style={styles.totemGuidePhotoAttributeWrap}
                activeOpacity={0.85}
                onPress={() =>
                  toggleTotemGuideAttribute(totemGuideAttribute.id)
                }
              >
                <LinearGradient
                  colors={
                    totemGuideIsSelected
                      ? ['#79080A', '#DF0F12']
                      : ['#FBDFBC', '#FAC57F']
                  }
                  style={styles.totemGuidePhotoAttributeButton}
                >
                  <View style={styles.totemGuidePhotoAttributeRow}>
                    <Text style={styles.totemGuidePhotoAttributeIcon}>
                      {totemGuideAttribute.icon}
                    </Text>
                    <Text
                      style={[
                        styles.totemGuidePhotoAttributeLabel,
                        totemGuideIsSelected &&
                          styles.totemGuidePhotoAttributeLabelSelected,
                      ]}
                    >
                      {totemGuideAttribute.label}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        {totemGuideSelectedAttributeIds.length > 0 && (
          <View style={styles.totemGuidePhotoActionWrap}>
            <TouchableOpacity
              style={styles.totemGuidePhotoActionTouch}
              activeOpacity={0.85}
              onPress={handleTotemGuideChoose}
              disabled={totemGuideSelectedAttributeIds.length === 0}
            >
              <LinearGradient
                colors={
                  totemGuideSelectedAttributeIds.length > 0
                    ? ['#79080A', '#DF0F12']
                    : ['#8E3A3A', '#B05050']
                }
                style={styles.totemGuidePhotoActionButton}
              >
                <Text style={styles.totemGuidePhotoActionText}>Define</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    </>
  );

  const renderTotemGuideProcessing = () => (
    <View style={styles.totemGuidePhotoStatusWrap}>
      <LinearGradient
        colors={['#FBDFBC', '#FAC57F']}
        style={styles.totemGuidePhotoStatusBadge}
      >
        <View style={styles.totemGuidePhotoStatusPadding}>
          <Text style={styles.totemGuidePhotoStatusText}>
            Please wait... Preparing results
          </Text>
        </View>
      </LinearGradient>
    </View>
  );

  const renderTotemGuideResult = () => {
    if (!totemGuideAnimal) {
      return null;
    }

    return (
      <>
        <View style={styles.totemGuideResultImageWrap}>
          <Image source={totemGuideAnimal.image} />
        </View>

        <LinearGradient
          colors={['#FBDFBC', '#FAC57F']}
          style={styles.totemGuideResultCard}
        >
          <View style={styles.totemGuideResultCardPadding}>
            <Text style={styles.totemGuideResultCardTitle}>
              {totemGuideAnimal.name}
            </Text>
            <Text style={styles.totemGuideResultCardSubtitle}>
              {totemGuideAnimal.subtitle}
            </Text>
            <Text style={styles.totemGuideResultCardDescription}>
              {totemGuideAnimal.description}
            </Text>

            <TouchableOpacity
              style={styles.totemGuideResultShareTouch}
              activeOpacity={0.85}
              onPress={handleTotemGuideShareAnimal}
            >
              <LinearGradient
                colors={['#79080A', '#DF0F12']}
                style={styles.totemGuideResultShareButton}
              >
                <Text style={styles.totemGuideResultShareText}>Share</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </>
    );
  };

  return (
    <TottmLayout>
      <View style={styles.totemGuidePhotoContainer}>
        <View style={styles.totemGuidePhotoTopRow}>
          <LinearGradient
            colors={['#79080A', '#DF0F12']}
            style={styles.totemGuidePhotoTitlePill}
          >
            <View style={styles.totemGuidePhotoTitleRow}>
              <TouchableOpacity
                style={styles.totemGuidePhotoBackWrap}
                activeOpacity={0.85}
                onPress={() => navigation.goBack()}
              >
                <Image source={require('../TotemAssets/i/back.png')} />
              </TouchableOpacity>

              <Text style={styles.totemGuidePhotoTitleText}>
                Traits totem beast
              </Text>
            </View>
          </LinearGradient>

          <View style={styles.totemGuidePhotoThumbWrap}>
            <Image
              source={require('../TotemAssets/i/apphead.png')}
              style={styles.totemGuidePhotoThumbImage}
            />
          </View>
        </View>

        {totemGuidePhase === 'addPhoto' && renderTotemGuideAddPhoto()}
        {totemGuidePhase === 'processing' && renderTotemGuideProcessing()}
        {totemGuidePhase === 'result' && renderTotemGuideResult()}
      </View>
    </TottmLayout>
  );
};

const styles = StyleSheet.create({
  totemGuidePhotoContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 48,
    alignItems: 'center',
  },
  totemGuidePhotoTopRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  totemGuidePhotoTitlePill: {
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
    minHeight: 88,
  },
  totemGuidePhotoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  totemGuidePhotoBackWrap: {
    marginRight: 20,
  },
  totemGuidePhotoTitleText: {
    color: '#FAC57F',
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
    width: '80%',
  },
  totemGuidePhotoThumbWrap: {
    width: 88,
    height: 88,
    overflow: 'hidden',
  },
  totemGuidePhotoThumbImage: {
    width: '100%',
    height: '100%',
  },
  totemGuidePhotoCard: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#79080A',
    alignItems: 'center',
    marginBottom: 20,
  },
  totemGuidePhotoCardW88: {
    width: '88%',
  },
  totemGuidePhotoUploadArea: {
    width: '90%',
    minHeight: 300,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  totemGuidePhotoAddIconWrap: {
    position: 'relative',
    marginBottom: 12,
  },
  totemGuidePhotoAddLabel: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
  },
  totemGuidePhotoPreview: {
    width: '100%',
    height: 220,
    borderRadius: 16,
  },
  totemGuidePhotoAttributeHeader: {
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  totemGuidePhotoAttributeTitle: {
    color: '#79080A',
    fontSize: 16,
    fontFamily: 'Ubuntu-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  totemGuidePhotoAttributeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 12,
    paddingTop: 4,
  },
  totemGuidePhotoAttributeWrap: {
    width: '30%',
    marginBottom: 10,
  },
  totemGuidePhotoAttributeButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#79080A',
  },
  totemGuidePhotoAttributeRow: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  totemGuidePhotoAttributeIcon: {
    fontSize: 19,
  },
  totemGuidePhotoAttributeLabel: {
    color: '#79080A',
    fontSize: 10,
    fontFamily: 'Ubuntu-Bold',
  },
  totemGuidePhotoAttributeLabelSelected: {
    color: '#FAC57F',
  },
  totemGuidePhotoActionWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    width: '100%',
  },
  totemGuidePhotoActionTouch: {
    width: '90%',
  },
  totemGuidePhotoActionButton: {
    width: '100%',
    height: 49,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
  },
  totemGuidePhotoActionText: {
    color: '#FAC57F',
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
  },
  totemGuidePhotoStatusWrap: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  totemGuidePhotoStatusBadge: {
    width: '80%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#79080A',
  },
  totemGuidePhotoStatusPadding: {
    padding: 20,
    paddingHorizontal: 16,
  },
  totemGuidePhotoStatusText: {
    color: '#79080A',
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
  },
  totemGuideResultImageWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  totemGuideResultCard: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#79080A',
    alignItems: 'center',
  },
  totemGuideResultCardPadding: {
    padding: 16,
    paddingHorizontal: 16,
    width: '100%',
  },
  totemGuideResultCardTitle: {
    color: '#79080A',
    fontSize: 32,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  totemGuideResultCardSubtitle: {
    color: '#79080A',
    fontSize: 15,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    marginTop: 6,
  },
  totemGuideResultCardDescription: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
  totemGuideResultShareTouch: {
    width: '100%',
  },
  totemGuideResultShareButton: {
    width: '100%',
    height: 59,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FAC57F',
    marginTop: 10,
  },
  totemGuideResultShareText: {
    color: '#FAC57F',
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
  },
});

export default PhotoModeScreen;
