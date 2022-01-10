export const handleCart = (urlPath) => {
  if (/\/(productos).*/.test(urlPath)) {
    // Add to cart event handler------------------------------------------//
    const productListContainer = document.getElementById("productList");

    const addToCart = async (event) => {
      let carritoStorage = JSON.parse(localStorage.getItem("carrito"));

      if (event.target.innerText === "Agregar al carrito") {
        const data = {
          _id: event.target.attributes.productid.value,
        };
        if (carritoStorage === null || carritoStorage.length === 0) {
          console.log("POST");
          await fetch("/api/carrito", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              localStorage.setItem("carrito", JSON.stringify(data));
              Swal.fire("Genial", "Producto añadido correctamente", "success");
            });
        } else {
          console.log("PUT");
          await fetch("/api/carrito", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              localStorage.setItem("carrito", JSON.stringify(data));
              Swal.fire("Genial", "Producto añadido correctamente", "success");
            });
        }
      }
    };

    productListContainer.addEventListener("click", addToCart);
  }
  // Cart methods

  if (urlPath === "/carrito") {
    const cartContainer = document.getElementById("cartContainer");

    const eventHandler = async (event) => {
      if (event.target.id === "removeAll") {
        await fetch("/api/carrito", {
          method: "DELETE",
        }).then((res) => (window.location.href = "/carrito"));
        localStorage.removeItem("carrito");
      }

      if (event.target.id === "checkOut") {
        const total = document.getElementById("totalOrder").innerHTML;
        const productosStorage = JSON.parse(localStorage.getItem("carrito"));
        productosStorage.total = Number(total);
        await fetch("/api/ordenes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productosStorage),
        }).then(async (res) => {
          await fetch("/api/carrito", {
            method: "DELETE",
          }).then((res) => {
            localStorage.removeItem("carrito");
            Swal.fire(
              "Genial",
              "Tu pedido se ha generado correctamente",
              "success"
            );
          });
        });
      }
    };

    cartContainer.addEventListener("click", eventHandler);
  }
};
