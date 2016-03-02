import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  bigText: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
  },
  mainText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default class Weather extends Component {
  static propTypes = {
    main: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
  };

  render() {
    const { main, description, temp } = this.props;

    return (
      <View>
        <Text style={styles.bigText}>
          {main}
        </Text>
        <Text style={styles.bigText}>
          Current conditions: {description}
        </Text>
        <Text style={styles.bigText}>
          {temp} °F
        </Text>
      </View>
    );
  }
}
