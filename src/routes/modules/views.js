const isAuthenticated = require("../../middleware/isAuthenticated");
const logger = require("../../utils/logger");
const router = require("express").Router();

// --------------------------Product Views---------------------------//
module.exports = (productsController, cartController) => {
  router.get("/", isAuthenticated, (req, res) => {
    res.redirect("/productos");
    return;
  });

  router.get("/productos", isAuthenticated, async (req, res) => {
    try {
      const userInfo = req.user.toJSON();
      let listaDeProductos = await productsController.getAllProducts(req, res);

      res.render("pages/productos", { listaDeProductos, userInfo });
      return;
    } catch (error) {
      console.log(error);
    }
  });

  router.get(
    "/productos/categoria/:categoria",
    isAuthenticated,
    async (req, res) => {
      try {
        const userInfo = req.user.toJSON();
        let listaDeProductos = await productsController.getProductByCategory(
          req
        );
        listaDeProductos._id = listaDeProductos._id.toString();
        res.render("pages/productos", {
          listaDeProductos: [listaDeProductos],
          userInfo,
        });
        return;
      } catch (error) {
        console.log(error);
      }
    }
  );
  // -------------------------Cart View -------------------------------//
  router.get("/carrito", isAuthenticated, async (req, res) => {
    try {
      const userInfo = req.user.toJSON();
      let listaDeProductosEnCarro = await cartController.getCartByUserId(
        req,
        res
      );
      if (listaDeProductosEnCarro === null) {
        res.render("pages/carrito", {
          listaDeProductosEnCarro: false,
          userInfo,
        });
        return;
      }
      res.render("pages/carrito", {
        listaDeProductosEnCarro,
        userInfo,
      });
      return;
    } catch (error) {
      console.log(error);
    }
  });

  // ---------------- Chat Views--------------------------------/

  // --------------- Other views------------------------------/

  router.get("/perfil", isAuthenticated, (req, res) => {
    const userInfo = req.user.toJSON();
    res.render("pages/perfil", { userInfo });
  });

  router.get("/agregar-productos", isAuthenticated, (req, res) => {
    res.render("pages/adminPanel");
  });

  return router;
};
