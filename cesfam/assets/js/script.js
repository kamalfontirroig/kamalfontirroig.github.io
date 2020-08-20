var map;
var marker;
var polygon;
var bounds;

var videlas =`<span style="color:#009900"> Videla </span>`
var aguirres=`<span style="color:#FFd000"> Aguirre </span>`
var guzmans='<span style="color:#FFA200"> Guzman </span>'
var surs=`<span style="color:#373bfd"> Sur </span>`
var pulgars=`<span style="color:#ff00e7"> Pulgar </span>`
var añazcos=`<span style="color:#c50000"> Añazco </span>`
var hectorReynos=`<span style="color:#00d258"> Hector Reyno </span>`
var errors ='<span style="color:gray"> La direccion no pertenece a un sector </span>'

window.onload = initMap;
function initMap() {
  var URLactual = window.location;
  params = new URL(URLactual).searchParams;
  direccion = params.get("direccion");
  if (typeof direccion !== "undefined") {
    document.getElementById("pac-input").value = direccion;
    document.getElementById("pac-input").focus();
  }
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 14.2,
    scaleControl: true,
  });
  bounds = new google.maps.LatLngBounds();
  google.maps.event.addListenerOnce(map, "tilesloaded", function (evt) {
    bounds = map.getBounds();
  });
  marker = new google.maps.Marker({
    position: center,
  });

  polygonGuzman.setMap(map);
  polygonAguirre.setMap(map);
  polygonVidela.setMap(map);
  polygonSur.setMap(map);
  polygonAñazco.setMap(map);
  polygonPulgar.setMap(map);
  polygonHectorReyno.setMap(map);


  /* input */
  var input = /** @type {!HTMLInputElement} */ (document.getElementById(
    "pac-input"
  ));
  var types = document.getElementById("type-selector");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", function () {
    marker.setMap(null);
    var place = autocomplete.getPlace();
    var newBounds = new google.maps.LatLngBounds();
    newBounds = bounds;
    if (!place.geometry) {
      window.alert(
        "Al escribir una direccion, debe elegir una de las sugerencias que entrega google. (NO PRESIONE 'ENTER')"
      );
      return;
    }

    /* END input */

    marker.setPosition(place.geometry.location);
    marker.setMap(map);
    newBounds.extend(place.geometry.location);
    map.fitBounds(newBounds);

    if (
      google.maps.geometry.poly.containsLocation(
        place.geometry.location,
        polygonGuzman
      )
    ) {
	  //alert("Pertenece al Cesfam Guzman");
	  $('#sugerencia').empty()
	  $('#sugerencia').append(guzmans)
    } else {
      if (
        google.maps.geometry.poly.containsLocation(
          place.geometry.location,
          polygonVidela
        )
      ) {
		$('#sugerencia').empty()
		$('#sugerencia').append(videlas) 
        //alert("Pertenece al Cesfam Videla");
      } else {
        if (
          google.maps.geometry.poly.containsLocation(
            place.geometry.location,
            polygonAguirre
          )
        ) {
			$('#sugerencia').empty()
			$('#sugerencia').append(aguirres)
         // alert("Pertenece al Cesfam Aguirre");
        } else {
			if (
				google.maps.geometry.poly.containsLocation(
				  place.geometry.location,
				  polygonSur
				)
			  ) {
				$('#sugerencia').empty()
				$('#sugerencia').append(surs)
			///	alert("Pertenece al Cesfam Sur");
			  } else {
				if (
					google.maps.geometry.poly.containsLocation(
					  place.geometry.location,
					  polygonPulgar
					)
				  ) {
					$('#sugerencia').empty()
					$('#sugerencia').append(pulgars)

				//	alert("Pertenece al Cesfam Pulgar");
				  } else {
					if (
						google.maps.geometry.poly.containsLocation(
						  place.geometry.location,
						  polygonAñazco
						)
					  ) {
						$('#sugerencia').empty()
						$('#sugerencia').append(añazcos)

					//	alert("Pertenece al Cesfam Añazco");
					  } else {
						if (
							google.maps.geometry.poly.containsLocation(
							  place.geometry.location,
							  polygonHectorReyno
							)
						  ) {
							$('#sugerencia').empty()
							$('#sugerencia').append(hectorReynos)

						//	alert("Pertenece al Cesfam Hector Reyno");
						  } else {
							('#sugerencia').empty()
							$('#sugerencia').append(errors)
						//	alert(
						//	  "No esta dentro de ningun sector, revisa direccion o chequea manualmente"
						//	);
						  }
        }
      }
    }
  }}}});
}
