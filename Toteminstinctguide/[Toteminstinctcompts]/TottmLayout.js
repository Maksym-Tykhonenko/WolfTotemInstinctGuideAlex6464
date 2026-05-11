import { ImageBackground, ScrollView } from 'react-native';

const TottmLayout = ({ children }) => {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../TotemAssets/i/fallbck.png')}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default TottmLayout;
