import React, { PropTypes } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {cloneDeep} from 'lodash'
import I18n from 'react-native-i18n'
import ProgressIndicator from '../Components/ProgressIndicator'
import * as RegistrationModel from '../Models/RegistrationModel'
import { validateField } from '../Lib/validator'
import RegistrationActions from '../Redux/RegistrationRedux'
import { CustomInputField, CustomButton } from '../Components/FormGenerator'
import AccountDrawerBase from './Bases/AccountDrawerBase'
import DrawerHeader from '../Components/DrawerHeader'

import styles from './Styles/RegistrationScreenStyle'

class RegistrationScreen extends AccountDrawerBase {
  static propTypes = {
    dispatch: PropTypes.func,
    registering: PropTypes.bool,
    error: PropTypes.bool,
    message: PropTypes.string,
    attemptRegister: PropTypes.func.isRequired
  }

  static navigationOptions = AccountDrawerBase.getNavigationOptions()

  constructor (props) {
    super(props)
    this.state = {
      fields: cloneDeep(RegistrationModel.registration)
    }
    this.updateState = this.updateState.bind(this)
    this.handlePressRegister = this.handlePressRegister.bind(this)
  }

  updateState (newFieldState) {
    this.setState({ fields: newFieldState })
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // alert(JSON.stringify(newProps))
    if (!newProps.registering && !newProps.error) {
      this.goToLoginScreen()
    }
  }

  validateFields () {
    var state = this.state
    var isValid = true
    Object.keys(state.fields).map((field) => {
      const result = validateField(state.fields, field)
      this.updateState(result)
      if (!result[field].valid) {
        isValid = false
      }

      if (isValid && field === 'password_confirmation') {
        if (state.fields.password.value !== state.fields.password_confirmation.value) {
          isValid = false
          state.fields.password_confirmation.message = I18n.t('unmatchedPassword')
          state.fields.password_confirmation.valid = false
        } else {
          field.message = ''
          field.valid = true
        }
      }
    })
    return isValid
  }

  handlePressRegister () {
    if (this.validateFields()) {
      const { name, email, password, password_confirmation } = this.state.fields
      this.props.attemptRegister(name.value, email.value, password.value, password_confirmation.value)
    }
  }

  goToLoginScreen () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LoginScreen' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render () {
    const { password, email, name, password_confirmation } = this.state.fields
    const { registering } = this.props

    return (
      <View style={{flex: 1}}>
        <View style={styles.hasNavbar}>
          <DrawerHeader title={I18n.t('registration')} {...this.props} />
        </View>
        <View style={styles.fragmentContainer}>
          <ScrollView>
            <View style={styles.customContainer}>
              <View style={styles.formContainer}>
                <CustomInputField
                  field={name}
                  editable={!registering}
                  state={this.state.fields}
                  updateState={this.updateState}
                />
                <CustomInputField
                  field={email}
                  editable={!registering}
                  state={this.state.fields}
                  updateState={this.updateState}
                />
                <CustomInputField
                  field={password}
                  editable={!registering}
                  state={this.state.fields}
                  updateState={this.updateState}
                />
                <CustomInputField
                  field={password_confirmation}
                  editable={!registering}
                  state={this.state.fields}
                  updateState={this.updateState}
                />
                <CustomButton
                  disabled={registering}
                  onPress={() => this.handlePressRegister()}
                  style={styles.btnReg}
                  title={I18n.t('register')}
                />
                <View style={styles.alreadyHaveAccountContent}>
                  <Text>{I18n.t('alreadyHaveAnAccount?')} </Text>
                  <Text style={[styles.linkActionText]} onPress={() => this.goToLoginScreen()}>{I18n.t('login')}!</Text>
                </View>
              </View>
              <ProgressIndicator show={registering} text={I18n.t('registering')} />
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    registering: state.registration.registering,
    error: state.registration.error,
    message: state.registration.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptRegister: (name, email, password, passwordConfirmation) => dispatch(RegistrationActions.registrationRequest(name, email, password, passwordConfirmation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
