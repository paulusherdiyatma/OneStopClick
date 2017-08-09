import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  button: {
    position: 'absolute',
    top: 20,
    padding: 10
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  contentContainer: {
    borderWidth: 2,
    borderColor: '#2F1F37',
    borderRadius: 3,
    marginBottom: 10,
    paddingBottom: 20
  },
  titleLabel: {
    backgroundColor: '#2F1F37',
    color: 'white',
    padding: 5
  }
})
