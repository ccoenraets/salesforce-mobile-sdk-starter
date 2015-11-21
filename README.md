## Getting Started with the Salesforce Mobile SDK

### Step 1: Create a Cordova Application

> The instructions below require Cordova 5. 

To create an application using the Cordova CLI:

1. Install Cordova:
    ```
    npm install -g cordova
    ```

    On a Mac, you may have to use sudo:
    ```
    sudo npm install -g cordova
    ```

1. Create a new application:
    ```
    cordova create firstapp com.mycompany.firstapp FirstApp
    ```

1. Navigate (cd) to the project directory
    ```
    cd firstapp
    ```

1. Add some useful Cordova plugins (optional):
    ```
    cordova plugin add cordova-plugin-device
    cordova plugin add cordova-plugin-console
    cordova plugin add cordova-plugin-statusbar
    ```
    
    > Checkout [this page](https://cordova.apache.org/docs/en/latest/guide/cli/index.html) in the Cordova documentation formore information on the Cordova CLI and plugins 


### Step 2: Add the Salesforce Mobile SDK Plugin

1. Add the Salesforce Mobile SDK plugin:
    ```
    cordova plugin add https://github.com/forcedotcom/SalesforceMobileSDK-CordovaPlugin
    ```

1. Create the Salesforce Mobile SDK config file (bootconfig.json) in the ```www``` folder of your project:
    ```
    {
      "remoteAccessConsumerKey": "3MVG9Iu66FKeHhINkB1l7xt7kR8czFcCTUhgoA8Ol2Ltf1eYHOU4SqQRSEitYFDUpqRWcoQ2.dBv_a1Dyu5xa",
      "oauthRedirectURI": "testsfdc:///mobilesdk/detect/oauth/done",
      "oauthScopes": [
        "web",
        "api"
      ],
      "isLocal": true,
      "startPage": "index.html",
      "errorPage": "error.html",
      "shouldAuthenticate": true,
      "attemptOfflineLoad": false
    }
    ```

    > For a production application, you should create a Connected App in Salesforce and provide your own Connected App ID and Callback URI.
    
    
### Step 3: Build and Run     

1. Add a platform. For example to add iOS:
    ```
    cordova platform add ios
    cordova build ios
    ```

1. Run the project. For example, for iOS, open the project (platforms/ios/FirstApp.xcodeproj) in Xcode and run it in the emulator or on your iOS device


### Step 4: Access Salesforce Data using ForceJS
 
1. Delete the ```firstapp/www``` folder in the generated project folder.

1. Clone [this](https://github.com/ccoenraets/salesforce-mobile-sdk-starter) repository, or click [here](https://github.com/ccoenraets/salesforce-mobile-sdk-starter/archive/master.zip) to download the sample application zip file, and unzip the file anywhere on your file system.

1. Copy the ```www``` folder from the GitHub project to the ```firstapp/www``` folder in your own project folder.

1. Rebuild the project 
```
cordova build ios
```

1. Run the project
 
> This project uses ForceJS instead of the ForceTK library that ships with the Mobile SDK. One difference between these two libraries is that ForceJS doesn’t have a dependency on jQuery.
 
To solve the iOS7+ status bar issue where the header of your application collides with the iOS status bar:
 
1. Make sure you installed the status bar plugin as described above

1. Add the following preferences to your project’s config.xml:
 
    ```
    <preference name="DisallowOverscroll" value="true"/>
    <preference name="StatusBarOverlaysWebView" value="false" />
    <preference name="StatusBarBackgroundColor" value="#ffffff" />
    <preference name="StatusBarStyle" value="default" />
    ```

1. Rebuild and run the project

## Step 5: Running in the Browser
 
To run the application in the browser using ForceServer:

1. Install ForceServer

```
npm install -g force-server
```

or

```
sudo npm install -g force-server
```

1. Navigate (cd) to your app's ```www``` directory

1. Start the server

```
force-server
```

This command will start the server on port 8200, and automatically load your app (http://localhost:8200) in a browser window. You'll see the Salesforce login window (make sure you enable the popup), and the list of contacts will appear after you log in. If you don’t have a free Salesforce Developer Edition to log in to, you can create one here.

You can change the port number and the web root. Type the following command for more info:

```
force-server --help
```