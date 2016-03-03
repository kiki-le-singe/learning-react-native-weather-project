import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';

import Forecast from './components/Forecast';
import config from './config';

const baseFontSize = 16;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column',
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30,
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
  },
  zipCode: {
    width: 50,
    height: baseFontSize,
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: '#FFFFFF',
  },
});

export default class Weather extends Component {
  constructor() {
    super();

    this.state = {
      zip: '',
      forecast: null,
      weatherImg: require('./assets/img/sky.jpg'),
    };
  }

  handleTextChange = e => {
    const zip = e.nativeEvent.text;

    this.setState({ zip });

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${zip}&units=imperial&appid=${config.appid}`)
      .then(response => response.json())
      .then(responseJSON => {
        const { cod } = responseJSON;

        if (cod === '404') {
          return this.setState({
            forecast: null,
          });
        }

        const { weather, main } = responseJSON;
        const [w] = weather;
        const { main: weatherMain, description: weatherDescription } = w;
        let weatherImg;

        if (weatherMain === 'Rain') {
          weatherImg = require('./assets/img/rain.jpg');
        } else if (weatherMain === 'Snow') {
          weatherImg = require('./assets/img/snow.jpg');
        } else {
          weatherImg = require('./assets/img/sky.jpg');
        }

        return this.setState({
          forecast: {
            main: weatherMain,
            description: weatherDescription,
            temp: main.temp,
          },
          weatherImg,
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  renderForecast() {
    const { forecast } = this.state;

    if (forecast) {
      const { main, description, temp } = forecast;

      return (
        <Forecast main={main} description={description} temp={temp} />
      );
    }

    return null;
  }

  render() {
    const { weatherImg } = this.state;

    return (
      <View style={styles.container}>
        <Image source={weatherImg} resizeMode="cover" style={styles.backdrop}>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current weather for
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  onSubmitEditing={this.handleTextChange}
                />
              </View>
            </View>
            { this.renderForecast() }
          </View>
        </Image>
      </View>
    );
  }
}
