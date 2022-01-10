const urlPath = window.location.pathname;

import { handlePasswordValidation } from "./modules/passwordUtilSignup.js";
import { handleLoginLogOut } from "./modules/auth.js";
import { handleAddProduct } from "./modules/addProduct.js";
import { handleCart } from "./modules/cart.js";

handleLoginLogOut(urlPath);
handlePasswordValidation(urlPath);
handleAddProduct(urlPath);
handleCart(urlPath);
