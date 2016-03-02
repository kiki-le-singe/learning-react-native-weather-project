import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

import Forecast from './components/Forecast';

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
      forecast: {
        main: 'Clouds',
        description: 'few clouds',
        temp: 45.7,
      },
    };
  }

  handleTextChange = e => {
    console.log(e.nativeEvent.text);

    this.setState({ zip: e.nativeEvent.text });
  };

  render() {
    const { forecast } = this.state;
    const { main, description, temp } = forecast;

    return (
      <View style={styles.container}>
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
            <Forecast main={main} description={description} temp={temp} />
          </View>
      </View>
    );
  }
}
