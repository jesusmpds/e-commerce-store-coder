const urlPath = window.location.pathname;

import { handlePasswordValidation } from "./modules/passwordUtil.js";

handlePasswordValidation(urlPath);
