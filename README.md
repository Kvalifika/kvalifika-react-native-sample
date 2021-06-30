# Kvalifika SDK React Native Sample

Use Kvalifika SDK to easily integrate into your React Native app

Table of content:

- [Installation](#installation)
  - [For React Native <0.60](#for-react-native-060)
  - [iOS Specific Steps](#ios-specific-steps)
  - [Android Specific Parts](#android-specific-parts)
- [Initialize the SDK](#initialize-the-sdk)
- [Start Verification](#start-verification)
- [Handling Verifications](#handling-verifications)
  - [Callback Methods](#callback-methods)
  - [Error Codes](#error-codes)
- [UI Customizations](#ui-customizations)
  - [Appearance](#appearance)
  - [Language](#language)
- [ProGuard (Android)](#proguard-android)

&nbsp;

## Installation

Add NPM dependency by running

```bash
npm install @kvalifika/react-native-sdk
```

or

```bash
yarn add @kvalifika/react-native-sdk
```

&nbsp;

### For React Native <0.60

If your React Native version is larger than >= 0.60, you can ignore this step. Otherwise, please run the following command:

```bash
react-native link @kvalifika/react-native-sdk
```

&nbsp;

### iOS Specific Steps

Add sources to Podfile and use minimum iOS version `11.0`

```podspec
source 'https://github.com/CocoaPods/Specs.git'
source 'https://github.com/Kvalifika/kvalifika-cocoapods-specs.git'
source 'https://github.com/Kvalifika/zoom-cocoapods-specs.git'

platform :ios, '11.0'
```

Then navigate to `ios` folder and run `pod install`

`Note:` pod install might take long time

&nbsp;

Please add the following permissions to your app's Info.plist, so that the Kvalifika iOS SDK can access a user's camera to run a verification. You can do this in the property list view or by code. Right-click on Info.plist and select Open As -> Source Code. Add the lines below somewhere inside the <dict> </dict>

```plist
<!-- permission strings to be include in info.plist -->
<key>NSCameraUsageDescription</key>
<string>Please give us access to your camera, to complete the verification.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Please give us access to your photo library to verify you.</string>
```

&nbsp;

### Android Specific Parts

After installing NPM package, please do following steps to set up Android environment:

Please add following lines to `android/build.gradle` file:

1. Set `minSdkVersion` to `21` or higher
2. Add maven url to repositories `maven { url 'https://s3.eu-central-1.amazonaws.com/com.kvalifika.sdk' }`

**Code Example**

```groovy
// Top-level build.gradle file

buildscript {
  ext {
    minSdkVersion = 21
  }
}

allprojects {
  repositories {
    google()
    jcenter()
    maven { url 'https://s3.eu-central-1.amazonaws.com/com.kvalifika.sdk' }
  }
}
```

&nbsp;

## Initialize the SDK

```tsx
import {
  KvalifikaSDK,
  KvalifikaSDKLocale,
  KvalifikaSDKError,
} from '@kvalifika/react-native-sdk';
```

After that you need to initialize SDK in useEffect with **your appId**.

```tsx
const App = () => {
  useEffect(() => {
    KvalifikaSDK.initialize({
      appId: 'YOUR APP ID',
      locale: KvalifikaSDKLocale.EN,
    });
  }, []);

  return (
    <View>
      <Text>Kvalifika SDK Sample</Text>
    </View>
  );
};
```

&nbsp;

## Start Verification

Call `KvalifikaSDK.startSession()` on button press

```tsx
const App = () => {
  useEffect(() => {
    KvalifikaSDK.initialize({
      appId: 'YOUR APP ID',
      locale: KvalifikaSDKLocale.EN,
    });
  }, []);

  return (
    <View>
      <Button
        onPress={() => KvalifikaSDK.startSession()}
        title="Start Session"
      />
    </View>
  );
};
```

&nbsp;

## Handling Verifications

It's useful to know if a user has completed the verification flow or canceled it. For this, you can implement the callback methods.

&nbsp;

### Callback Methods

| Method       | Description                                                                                |
| ------------ | ------------------------------------------------------------------------------------------ |
| onInitialize | This callback method is triggered when SDK initializes.                                    |
| onStart      | This callback method is triggered when user starts verification.                           |
| onFinish     | This callback method is triggered when user completes verification. Get session data here. |
| onError      | This callback method is triggered on error. [Error Codes](#error-codes).                   |

&nbsp;

KvalifikaSDK uses NativeEventEmitter to communicate between Android and iOS native modules.<br />
**Make sure to remove callbacks on unmount.**

```tsx
const App = () => {
  useEffect(() => {
    KvalifikaSDK.onInitialize(() => {
      Alert.alert('Kvalifika', 'Kvalifika SDK Initialized');
    });

    KvalifikaSDK.onStart(sessionId => {
      console.log(`Started with id: ${sessionId}`);
    });

    KvalifikaSDK.onFinish(sessionId => {
      Alert.alert('Kvalifika', `Session finished with id: ${sessionId}`);
    });

    KvalifikaSDK.onError((error, message) => {
      console.log(error, message);

      if (error === KvalifikaSDKError.INVALID_APP_ID) {
      }

      if (error === KvalifikaSDKError.USER_CANCELLED) {
      }

      if (error === KvalifikaSDKError.TIMEOUT) {
      }

      if (error === KvalifikaSDKError.USER_CANCELLED) {
      }

      if (error === KvalifikaSDKError.SESSION_UNSUCCESSFUL) {
      }

      if (error === KvalifikaSDKError.ID_UNSUCCESSFUL) {
      }

      if (error === KvalifikaSDKError.CAMERA_PERMISSION_DENIED) {
      }

      if (error === KvalifikaSDKError.LANDSCAPE_MODE_NOT_ALLOWED) {
      }

      if (error === KvalifikaSDKError.REVERSE_PORTRAIT_NOT_ALLOWED) {
      }

      if (error === KvalifikaSDKError.FACE_IMAGES_UPLOAD_FAILED) {
      }

      if (error === KvalifikaSDKError.DOCUMENT_IMAGES_UPLOAD_FAILED) {
      }

      if (error === KvalifikaSDKError.COMPARE_IMAGES_FAILED) {
      }

      if (error === KvalifikaSDKError.UNKNOWN_INTERNAL_ERROR) {
      }
    });

    return () => {
      // Remove callbacks to avoid duplicate listeners if useEffect runs multiple times or remounts
      KvalifikaSDK.removeCallbacks();
    };
  }, []);

  useEffect(() => {
    KvalifikaSDK.initialize({
      appId: 'YOUR APP ID',
      locale: KvalifikaSDKLocale.EN,
    });
  }, []);

  return (
    <View>
      <Button
        onPress={() => KvalifikaSDK.startSession()}
        title="Start Session"
      />
    </View>
  );
};
```

&nbsp;

### Error Codes

| Error Code                    | Description                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| INVALID_APP_ID                | Kvalifika App Id is incorrect                                                            |
| USER_CANCELLED                | User cancelled before completing verification.                                           |
| TIMEOUT                       | Cancelled due to inactivity.                                                             |
| SESSION_UNSUCCESSFUL          | The Session was not performed successfully.                                              |
| ID_UNSUCCESSFUL               | The ID Scan was not performed successfully and identity document data was not generated. |
| CAMERA_PERMISSION_DENIED      | Camera is required but access prevented by user settings.                                |
| LANDSCAPE_MODE_NOT_ALLOWED    | Verification cancelled because device is in landscape mode.                              |
| REVERSE_PORTRAIT_NOT_ALLOWED  | Verification cancelled because device is in reverse portrait mode.                       |
| FACE_IMAGES_UPLOAD_FAILED     | Could not upload face images. Internal request failed.                                   |
| DOCUMENT_IMAGES_UPLOAD_FAILED | Could not upload ID card or passport images. Internal request failed.                    |
| COMPARE_IMAGES_FAILED         | Could not compare images. Internal request failed.                                       |
| UNKNOWN_INTERNAL_ERROR        | Session failed because of an unhandled internal error. This error comes with message.    |

&nbsp;

## UI Customizations

### Appearance

You can customize logo and icons.
**Add image in Android drawable resources folder (res/drawable folder) and reference it with filename**

```tsx
KvalifikaSDK.initialize({
  appId: 'YOUR APP ID',
  locale: KvalifikaSDKLocale.EN,
  logo: 'logo',
  documentIcon: 'document_icon',
  cancelIcon: 'cancel_icon',
  activeFlashIcon: 'active_flash_icon',
  inactiveFlashIcon: 'inactive_flash_icon',
});
```

&nbsp;

### Language

You can set locale when initializing SDK
Supported locales are:

| Code | Language |
| ---- | -------- |
| EN   | English  |
| GE   | Georgian |

```tsx
KvalifikaSDK.initialize({
  appId: 'YOUR APP ID',
  locale: KvalifikaSDKLocale.EN,
});
```

&nbsp;

### ProGuard (Android)

If you are using ProGuard in Android release build add following options to ProGuard file:

```
-keep class com.facetec.sdk.** { *; }
```
