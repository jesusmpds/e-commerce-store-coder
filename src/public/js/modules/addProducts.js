const addProducts = (urlPath) => {
  if (urlPath === "/agregar-productos") {
    // Event listener for sending new product

    let form = document.getElementById("form");

    let title = document.getElementById("nombreProducto");
    let price = document.getElementById("precioProducto");
    let thumbnail = document.getElementById("thumbnailURL");
    let description = document.getElementById("productDescription");
    let code = document.getElementById("productCode");
    let stock = document.getElementById("productStock");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (
        title.value &&
        price.value &&
        thumbnail.value &&
        description.value &&
        category.value &&
        stock.value
      ) {
        socket.emit("newProduct", {
          name: title.value,
          description: description.value,
          code: code.value,
          imageURL: thumbnail.value,
          price: price.value,
          stock: stock.value,
        });
        document.getElementById("alert").innerHTML =
          '<div class="alert alert-success alert-dismissible fade show" role="alert">Se creo correctamente el producto <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        (document.getElementById("nombreProducto").value = ""),
          (document.getElementById("precioProducto").value = ""),
          (document.getElementById("thumbnailURL").value = "");
        document.getElementById("productDescription").value = "";
        document.getElementById("productCode").value = "";
        document.getElementById("productStock").value = "";
      }
    });
  }
};
