var formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
});


window.onload = function () {
    renderProductos(listaProductos)
    $("body").addClass("d-inline")
}

function renderProductos(productos) {

    $("#productos").empty()
    var cartasDeProductos = `<div class="flex-productos">`

    for (i = 0; i < productos.length; i++) {
        var producto =
            `<div class="flex-producto">
                    <div class="card producto mx-1 my-1">
                        <div class="card-body">
                            <h5 class="card-title">${productos[i].nombre}</h5>
                            <img class="card-img-top" src="img/${productos[i].img}" >
                            <p class="card-text">${productos[i].desc} </p>
                            <div class="card-footer">
                                <div class="d-inline precio-unitario" ><b> ${formatter.format(productos[i].precioUnitario)}</b>
                                </div>
                                <div id="producto" class="btn btn-primary d-inline boton-falso" onclick="agregarAlCarro(${productos[i].id})" >Agregar
                                </div>
                            </div>
                        </div> 
                    </div>
             </div>`

        cartasDeProductos += producto
    }
    cartasDeProductos += `</div>`

    $("#productos").append(cartasDeProductos)
}

function buscarProducto(fraseBuscada) {
    var palabrasBuscadas = fraseBuscada.split(" ")
    var productosEncontrados = []
    console.log(palabrasBuscadas)
    if (palabrasBuscadas.length > 0) {

        for (i = 0; i < listaProductos.length; i++) {
            productoConcatenado = listaProductos[i].nombre + listaProductos[i].desc
            productoConcatenado = productoConcatenado.toLowerCase()
            for (j = 0; j < palabrasBuscadas.length; j++) {
                if (productoConcatenado.indexOf(palabrasBuscadas[j].toLowerCase()) >= 0) {
                    productosEncontrados.push(listaProductos[i])
                }
            }
        }

        if (productosEncontrados.length > 0) {
            alertify.success("Productos encontrados", 3)
            renderProductos(productosEncontrados)
        } else {
            alertify.error("No se encontraron productos", 3)
            renderProductos(listaProductos)
        }
    } else {
        renderProductos(listaProductos)
    }

}