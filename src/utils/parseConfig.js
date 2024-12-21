import "./mockEventEmitter";
import Parse from "parse";

// Initialize Parse with Back4App keys from environment variables
Parse.initialize(
  import.meta.env.VITE_BACK4APP_APP_ID,
  import.meta.env.VITE_BACK4APP_APP_JS
);
Parse.serverURL = "https://parseapi.back4app.com/";

export default Parse;
