const urlPath = window.location.pathname;

import { handlePasswordValidation } from "./modules/passwordUtilSignup.js";
import { handleLoginLogOut } from "./modules/auth.js";
import { handleAddProduct } from "./modules/addProduct.js";
import { handleCart } from "./modules/cart.js";
import { handleChat } from "./modules/chat.js";

handleLoginLogOut(urlPath);
handlePasswordValidation(urlPath);
handleAddProduct(urlPath);
handleCart(urlPath);
handleChat(urlPath);
