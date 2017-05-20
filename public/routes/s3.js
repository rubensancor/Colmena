

//Funcion de cambiar la cantidad donada en el widget
function changeAmount(checked) {
  if( checked ){
    document.getElementById("colmenaCantidad").innerHTML = 1 + "€";
    addEuro();
  } else {
    document.getElementById("colmenaCantidad").innerHTML = 0 + "€";
    removeEuro();
  }
}

function clickOnLayer(e) {
    e = e || event;
    var target = e.target || e.srcElement;
    if (target.id == "layerProyect") {
        removeLayer()
    } else {
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }
    }
}

function removeLayer() {
    document.body.removeChild(document.getElementById('layerProyect'))
}


function colmenaEnviarDatos() {
    var don = {};
    var fecha = new Date();
    if(document.getElementById('colmenaCheckbox').checked)
    don.importe = "1";
    don.usada = "false";
    don.fecha = {};
    don.fecha.anyo = fecha.getFullYear();
    don.fecha.mes = fecha.getMonth()+1;
    don.fecha.dia = fecha.getDate();
    //don.email = {$smarty.post.email};
    if (don.importe == "1") {
      console.log("Enviando datos");
        var json = JSON.stringify(don);
        $.ajax({
            type: "POST",
            url: "http://10.45.1.60:3000/json",
            //url: "http://192.168.0.77:3000/json",
            data: json ,
            dataType: "json",
            contentType: "application/json"
        });
    }
}

/* Main */
var main_container = document.getElementById('colmenaWidget');
main_container.innerHTML = '' +
    '<div>' +
    '<input type="hidden" name="colmena_check" id="colmena_check" value="0" />' +
    '<input type="hidden" name="colmena_amount" id="colmena_amount" value="1" />' +
    '<div id="colmenaDiv" style=""> <div id="colmenaText"> <p id="descripcionColmena">Apoya al proyecto&nbsp;<strong>Tecnologia libre de conflicto</strong> con el que se pretende conseguir una vida digna para las mujeres v&iacute;ctimas de violencia sexual y para aquellas en riesgo de sufrirla en R.D. Congo.</p><div id="fijoDon"> <input class="tgl tgl-flip" id="cb5" type="checkbox"/> <label class="tgl-btn" data-tg-off="No" data-tg-on="Apoyar!" for="cb5" onclick="cambiarCantidad(100)"></label> </div></div><div id="colmenaCantidad" class="unicoCol">0€</div></div>'+
     '<style> #colmenaDiv{background:url(https://s22.postimg.org/6nlsttl5d/woman_898760_1920.jpg) center;background-repeat:no-repeat!important;background-size:cover!important;font-family:Arial,Helvetica,sans-serif!important;font-size:2vw!important;color:#fff;height:auto!important;max-width:100%!important;margin:5px}#colmenaDiv p{font-size:2vw!important;text-align:left;margin-bottom:10px}#colmenaText{padding:1em!important}#colmenaCantidad{float:right!important;margin-top:-2em;margin-right:1em!important;font-size:1.6em!important;display:inline-block!important}.select-style{color:#000!important;padding:0;margin:0;border:1px solid #ccc;width:6em;border-radius:3px;overflow:hidden;background:url(http://www.scottgood.com/jsg/blog.nsf/images/arrowdown.gif) 90% 50% no-repeat #fff}.select-style select{padding:5px 8px;width:100%;border:none;box-shadow:none;background-color:transparent;background-image:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.select-style select:focus{outline:0}.tgl{display:none}.tgl,.tgl *,.tgl :after,.tgl :before,.tgl+.tgl-btn,.tgl:after,.tgl:before{box-sizing:border-box}.tgl ::-moz-selection,.tgl :after::-moz-selection,.tgl :before::-moz-selection,.tgl+.tgl-btn::-moz-selection,.tgl::-moz-selection,.tgl:after::-moz-selection,.tgl:before::-moz-selection{background:0 0}.tgl ::selection,.tgl :after::selection,.tgl :before::selection,.tgl+.tgl-btn::selection,.tgl::selection,.tgl:after::selection,.tgl:before::selection{background:0 0}.tgl+.tgl-btn{outline:0;display:block;width:3.5em;height:1.8em;position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.tgl+.tgl-btn:after,.tgl+.tgl-btn:before{position:relative;display:block;content:"";width:50%;height:100%}.tgl+.tgl-btn:after{left:0}.tgl+.tgl-btn:before{display:none}.tgl:checked+.tgl-btn:after{left:50%}.tgl-flip+.tgl-btn{padding:2px;-webkit-transition:all .2s ease;transition:all .2s ease;font-family:sans-serif;-webkit-perspective:100px;perspective:100px}.tgl-flip+.tgl-btn:after,.tgl-flip+.tgl-btn:before{display:inline-block;-webkit-transition:all .4s ease;transition:all .4s ease;width:100%;text-align:center;line-height:2em;font-size:1.7vw!important;font-weight:700;color:#fff;position:absolute;top:0;left:0;-webkit-backface-visibility:hidden;backface-visibility:hidden;border-radius:4px}.tgl-flip+.tgl-btn:after{content:attr(data-tg-on);background:#02C66F;-webkit-transform:rotateY(-180deg);transform:rotateY(-180deg)}.tgl-flip+.tgl-btn:before{background:#FF3A19;content:attr(data-tg-off)}.tgl-flip+.tgl-btn:active:before{-webkit-transform:rotateY(-20deg);transform:rotateY(-20deg)}.tgl-flip:checked+.tgl-btn:before{-webkit-transform:rotateY(180deg);transform:rotateY(180deg)}.tgl-flip:checked+.tgl-btn:after{-webkit-transform:rotateY(0);transform:rotateY(0);left:0;background:#7FC6A6}.tgl-flip:checked+.tgl-btn:active:after{-webkit-transform:rotateY(20deg);transform:rotateY(20deg)}</style>⁠⁠⁠⁠'
