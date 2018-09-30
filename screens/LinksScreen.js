import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import {Constants} from 'expo';
import { Button, Text, Icon } from 'react-native-elements';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Password',
  };
  state = {
    password: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text h4 style={{ textAlign: "center"}}>Accessing sensitive data on:</Text>
        <View style={{justifyContent: 'center',alignItems: 'center', paddingTop: 15}} >
          <Image source={require('../assets/images/chase.png')} style={{width: 120, height: 80}}/>
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row', alignContent: 'flex-start'}}>
          <Icon name='location-on'/>
          <Text style={styles.text}>Hayward, CA, US</Text>
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
          <Icon name='clock' type='feather'/>
          <Text style={styles.text}>4:41:24 PM GMT -7</Text>
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
          <Icon name='calendar' type='feather'/>
          <Text style={{fontSize: 18,paddingTop: 10,textAlign: 'center',paddingBottom: 20}}>29th September 2018</Text>
        </View>
          <Text h4 style={{textAlign: "center"}}>Master Password</Text>
        <View style={{paddingLeft:30, paddingRight:30}} >
          <PasswordInputText
            value={this.state.password}
            onChangeText={ (password) => this.setState({ password }) }
          />
          <Button
            large
            title='Login'
            backgroundColor="blue"
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    paddingTop: 10,
    textAlign: 'center'
  }
});
