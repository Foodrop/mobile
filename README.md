# Overview
The current Foodrop mobile app is built with React Native and Expo. React Native is a JavaScript framework for writing real, natively rendering mobile applications for iOS and Android. Expo is a free and open source toolchain built around React Native to help you build native iOS and Android apps using JavaScript and React. We have chosen this stack for a couple reasons:
- fast development cycle due to one framework, multiple platforms
- faster development cycle due to Expo features like hot-reloading within iOS and Android simulators/devices
- FAST

In conclusion, please learn how to use Expo. Now let's build.

# Quickstart
Fastest way to run the app.

1. Install Expo
```
npm install -g expo-cli
```

2. Download Repo
```
git clone https://github.com/Foodrop/mobile.git
cd mobile
```

3. Install everything
```
npm install
```

4. Starting the app
```
expo start
```

5. The rest is history.

# Dev related info
- ```aws-exports.js``` contains configs to AWS Cognito.
- We've enforced MFA for all user authentication, so please register an account with your email and phone number to start developing.

If you hit an error, please submit an Github Issue.
