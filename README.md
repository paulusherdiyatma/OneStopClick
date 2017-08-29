#  OneStopClick
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

* Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`

**Step 4:** Download [FBSDK](https://developers.facebook.com/docs/ios/) and place it under `Documents` and rename to `FacebookSDK`

**Step 5:** Run `react-native link` on the root folder

**Step 6:** Setup Social Login
  - ***iOS:***
    - open terminal and execute `cd ios`
    - install POD by running this command `pod install`
    - open your project using xcode and try to run from xcode. If there any error then fix it in xcode
  
  - ***Android:***
    - None


## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.


## Coding Environment

To contribute to this project, you need to install 

- `node` & `npm` or `yarn`
- `ignite-cli`
- `react-native-cli`
- Visual Studio Code
  - Extensions :
    - ESLint
    - Javascript Standard Style
    - Sonarqube

Those program and extensions will be helpfull to make the code standarized.

## Code Structures

The structures separate into two main groups named `App` and `Tests`. All test files must be mapped according to file path in `App` folder with prefix `Test` in the end of the file name.

- ***Components***

  All dummy or custom component that not directly related to redux are stored here. For example `ProgressIndicator`.

  Each component have their own style file. To generate a component and the style, run `ignite g component <ComponentName>`

- ***[Containers](/App/Containers/README.md)***

  Containers are the screen for our application and related to redux. Container also have their own style file. To generate a container, run ` ignite g container <ContainerName>`.

  If you want to add another screen then you should save in this folder.

- ***Redux***

  Generate redux related to our screen by run `ignite g redux <ReduxName>`. You do not need any additional setup for each redux file.

- ***Saga***

  Saga is side effect handler for redux. Saga event will be triggered when specified redux action dispatched. For example, `login request`, `register request`. To generate saga related to our redux by run `ignite g saga <SagaName>`. 
  
  You still need to update `sagas/index.js` to subscribe to redux action.

- ***Service***

  `Api.js` is the file that contain all endpoint to our api at http://onestopclick.tk, If you want to call api from another domain then create another file in this directory. After that define those new api in `sagas/index.js` then pass it to your redux.


  `StorageService.js` is the file that will be used as a layer for accessing the `AsyncStorage`.

- ***Model***

  This directory is used to define form model, for now only support `CustomInputField` that will be generated by component `FormGenerator.js`

- ***Navigation***

- ***[Themes](/App/Themes/README.md)***

- ***[Lib](/App/Lib/README.md)***

- ***[I18n](/App/I18n/README.md)***





## Troubleshooting

List all possible issue and how to solve it when initiating this app




## Release The Application

- [Android](documentations/release_android.md)
- [iOS](documentations/release_ios.md)
