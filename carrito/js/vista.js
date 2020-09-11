var formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });


window.onload = function () {

    var cartasDeProductos = ''

    for (i = 0; i < listaProductos.length; i++) {
        var producto =
                    '<div class="card producto mx-1 my-1">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title">' + listaProductos[i].nombre + '</h5>' +
                            '<img class="card-img-top" src="img/' + listaProductos[i].img + '" >' +
                            '<p class="card-text">' + listaProductos[i].desc + '</p>' +
                            '<div class="card-footer">' +
                                '<div class="d-inline precio-unitario" ><b>' + formatter.format(listaProductos[i].precioUnitario) +'</b>' +
                                '</div>' +
                                '<div id="producto" class="btn btn-primary d-inline"' + listaProductos[i].id + '" onclick="agregarAlCarro(' + listaProductos[i].id + ')" >Agregar' + 
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'

        cartasDeProductos += producto
    }

    $("#productos").append('<div class="row">' + cartasDeProductos + '</div>')
}




