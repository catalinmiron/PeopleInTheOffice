package com.peopleintheoffice;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.microsoft.codepush.react.CodePush;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.marianhello.react.BackgroundGeolocationPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;
import com.learnium.RNDeviceInfo.RNDeviceInfo;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new RNDeviceInfo(),
          new MainReactPackage(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
            new RNNetworkInfoPackage(),
            new LinearGradientPackage(),
            new ReactNativePushNotificationPackage(),
            new BackgroundGeolocationPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
