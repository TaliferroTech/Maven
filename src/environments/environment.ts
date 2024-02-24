// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAC5LJoOG1hQWS-tHGbsizTnsNGSK7U1Ag",
    authDomain: "maven-inc-pa.firebaseapp.com",
    projectId: "maven-inc-pa",
    storageBucket: "maven-inc-pa.appspot.com",
    messagingSenderId: "823268638819",
    appId: "1:823268638819:web:b35c1a71db5051a39b7856",
    measurementId: "G-7MR812XN3Y"
  },
  FILE_PATH: "files",
  summaryRedirect: 'http://localhost:4200/email-check',
  SETTINGS: "settings",
  USERS: "users",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
