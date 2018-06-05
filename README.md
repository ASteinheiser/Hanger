# Hanger Native

Hanger is an Android and iOS application written in react-native...

## Install Dependencies
```
git clone git@github.com:ASteinheiser/hanger.git
yarn install
react-native link
```

## Run
```
react-native run-ios
react-native run-android
```

## Install To Android Device
```
cd android/ && ./gradlew assembleRelease
react-native run-android --variant=release
```

## Install To iOS Device
```
open /ios/Hanger.xcodeproj in XCode
run project
```
