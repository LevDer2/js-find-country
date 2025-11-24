import {
  defaultModules,
  success,
  error,
} from "../node_modules/@pnotify/core/dist/PNotify.js";
import * as PNotifyMobile from "../node_modules/@pnotify/mobile/dist/PNotifyMobile.js";
import "@pnotify/core/dist/BrightTheme.css";
defaultModules.set(PNotifyMobile, {});

success({
  title: 'Success!',
  text: 'That thing that you were trying to do worked.'
});