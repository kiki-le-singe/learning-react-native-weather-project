import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

import Forecast from './components/Forecast';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4D4D4D',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    height: 40,
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
        <Text style={styles.welcome}>
          You input {this.state.zip}
        </Text>
        <Forecast main={main} description={description} temp={temp} />
        <TextInput style={styles.input} onSubmitEditing={this.handleTextChange} />
      </View>
    );
  }
}
