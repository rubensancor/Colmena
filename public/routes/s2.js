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

/* Funcion para cambiar la cantidad donada cuando se ofrece la posibilidad de elegir el importe*/
function multichangeAmount( value ) {
  document.getElementById("colmenaCantidad").innerHTML = value +"€";
}


/* Funcion para enviar los datos de la donacion al servidor */
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
    if (don.importe == "1") {
        var json = JSON.stringify(don);
        $.ajax({
            type: "POST",
            /* Direction of the colmena server */
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
    /* Change the following line to edit the html */
    '<div id="colmenaDiv"> <div id="colmenaText"> Apoya al proyecto&nbsp;<strong>Tecnologia libre de conflicto</strong> con el que se pretende conseguir una vida digna para las mujeres v&iacute;ctimas de violencia sexual y para aquellas en riesgo de sufrirla en R.D. Congo. <br> <br> </div> <div id="colmenaBottom"> <div id="colmenaToggle"> <input type="checkbox" id="colmenaCheckbox" onchange=changeAmount(this.checked) class="cbx hidden" /> <label for="colmenaCheckbox" class="lbl"></label> </div> <div id="colmenaCantidad"><strong>0€</strong></div> </div> </div>' +
    /* Change the following line to edit the css */
    '<style> #colmenaDiv { background: url(https://s22.postimg.org/6nlsttl5d/woman_898760_1920.jpg) no-repeat center; background-size: cover; background-repeat: no-repeat; font-family: Arial, Helvetica, sans-serif !important; font-size: 1em !important; color: white; height: auto !important; max-width: 100% !important;}#colmenaText { padding-top: 1em !important; padding-bottom: 0em; padding-left: 1em; padding-right: 1em;}#colmenaBottom{ width: 100%; margin: 0;}#colmenaToggle { padding-top: 0.5em; padding-left: 1em; width: 50%; margin: 0; float: left}#colmenaCantidad { font-size: 1.7em; padding-bottom: 1em; padding-right: 1em; text-align: right; width: auto;}.lbl { position: relative; display: block; height: 1em; width: 2.5em; background: #898989; border-radius: 100em; cursor: pointer; transition: all 0.3s ease;}.lbl:after { position: absolute; left: -0.2em; top: -0.23em; display: block; width: 1.4em; height: 1.4em; border-radius: 100%; background: #fff; box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.05);'+"content: '';"+ ' transition: all 0.3s ease;}.lbl:active:after { transform: scale(1.15, 0.95);}.cbx:checked~label { background: #FFA726;}.cbx:checked~label:after { left: 1.3em; background: #EF6C00;}.cbx:disabled~label { background: #FFA726; pointer-events: none;}.cbx:disabled~label:after { background: #FFA726;}.hidden { display: none;}'+
    '</style>⁠⁠⁠⁠'
