import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {white} from '../assets/Colors';
import {normalize, screenHeight, screenWidth, vh, vw} from '../dimension';
import LinearGradient from 'react-native-linear-gradient';
export default class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDot: 0,
    };
  }
  componentDidMount() {
    this.scrollInterval = setInterval(() => {
      this.setState(
        prev => ({
          selectedDot:
            prev.selectedDot == this.props.images.length - 1
              ? 0
              : prev.selectedDot + 1,
        }),
        () => {
          this.scrollRef.current.scrollTo({
            animated: true,
            y: 0,
            x: screenWidth * this.state.selectedDot,
          });
        },
      );
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.scrollInterval);
  }
  scrollRef = React.createRef();
  setSelectedIndex = event => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.floor(contentOffset / viewSize);
    this.setState({selectedDot: selectedIndex});
  };
  render() {
    return (
      <View style={[styles.mainContainer, this.props.style]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.scrollview}
          ref={this.scrollRef}
          onMomentumScrollEnd={this.setSelectedIndex}>
          {this.props.images.map((item, index) => (
            <View key={index}>
              {this.props.type == 'onBoarding' ? (
                <Image source={{uri: item.img}} style={styles.image} />
              ) : this.props.type == 'Movies' ? (
                <TouchableOpacity
                  onPress={() => {
                    if (item.media_type == 'movie') {
                      this.props.navigation.navigate('Movie', {id: item.id});
                    } else if (item.media_type == 'tv') {
                      this.props.navigation.navigate('TvShow', {id: item.id});
                    }
                  }}>
                  <Image source={{uri: item.img}} style={styles.image} />
                </TouchableOpacity>
              ) : null}
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'black']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0.6}}
                style={[
                  styles.linearGradient,
                  {
                    height:
                      this.props.type == 'onBoarding'
                        ? vh(150)
                        : this.props.type == 'Movies'
                        ? vh(50)
                        : null,
                  },
                ]}>
                <Text style={styles.text}>{item.text}</Text>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>
        <View style={styles.dotBox}>
          {this.props.images.map((item, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === this.state.selectedDot ? 'white' : null,
                },
              ]}
            />
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
  },
  scrollview: {
    flex: 1,
    width: '100%',
  },
  image: {
    height: '100%',
    width: screenWidth,
    resizeMode: 'cover',
  },
  dotBox: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: vh(0),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: vh(14),
    width: vw(11),
    borderWidth: vh(2),
    borderColor: 'white',
    borderRadius: normalize(10),
    margin: normalize(5),
  },
  text: {
    color: white,
    fontSize: normalize(16),
    marginBottom: vh(20),
  },
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: normalize(20),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
