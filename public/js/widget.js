/* Attach cambiarLetra() to #cp8Letra on click */
$('#cp8Letra').on('click', cambiarLetra());
/* Attach colorpicker to all the .cp8 items */
$('.cp8').colorpicker();

/* Function that ables or disables the background colorpicker depending on background seleciton */

$(document).ready(function() {
    $('#fondo').click(function() {
        if ($('#fondo')[0].value == 1) {
            $('#colorPickerCol').prop("disabled", false);
        } else {
            $('#colorPickerCol').prop("disabled", true);
        }
    });
});

/**
 * Changes the project description and background photo depending of the selection of the user
 * @param  {int} value The value of the project selected.
 */
function cambiarProyecto(value) {
    switch (value) {
        case '0':
            $("#descripcionColmena").html("Apoya al proyecto&nbsp;<strong>Tecnologia libre de conflicto</strong> con el que se pretende conseguir una vida digna para las mujeres v&iacute;ctimas de violencia sexual y para aquellas en riesgo de sufrirla en R.D. Congo. ");
            if ($('#fondo')[0].value == 0) {
                $("#colmenaDiv").css({
                    "background": "url(https://s22.postimg.org/6nlsttl5d/woman_898760_1920.jpg)",
                    "background-position": "center"
                });
            }
            break;
        case '1':
            $("#descripcionColmena").html("Apoya al proyecto&nbsp;<strong>Mujeres Valientes</strong> con el que se pretende conseguir evitar la violencia de g&eacute;nero, impulsar la participacion de las mujeres en puestos publicos y en labores economicas todo ello mediante la educaci&oacute;n.");
            if ($('#fondo')[0].value == 0) {
                $("#colmenaDiv").css({
                    "background": "url(https://s24.postimg.org/nig63r9ad/P1110519.jpg)",
                    "background-position": "50% 30%"
                });
            }
            break;
    }
}

/**
 * Changes the background color dynamically using colorpicker.
 */
function cambiarColor() {
    $('#cp8Fondo').colorpicker().on('changeColor', function(e) {
        $('#colmenaDiv').css("background", e.color.toString('rgba'));
    });
}

/**
 * Changes the color of the font dynamically using colorpicker
 */
function cambiarLetra() {
    $('#cp8Letra').colorpicker().on('changeColor', function(e) {
        $('#colmenaDiv').css("color", e.color.toString('rgba'));
    });
}

/**
 * Changes the background between photo and plain color
 * @param  {int} value The value of background selection
 */
function cambiarFondo(value) {
    switch (value) {
        case '0':
            cambiarProyecto($("#proyectPickerCol")[0].value);
            break;
        case '1':
            $("#colmenaDiv").css("background", $("#cp8Fondo").colorpicker('getValue'));
            cambiarColor();
            break;
    }
}

/**
 * Changes the quantity of the donation
 * @param  {int} value If the quantity is 100 it changes between 1 and 0
 * and if the quantity is different it sets that quantity
 */
function cambiarCantidad(value) {
    if (value == 100) {
        if ($('#colmenaCantidad').hasClass("unicoCol")) {
            $('#colmenaCantidad').html("1€");
            $('#colmenaCantidad').removeClass("unicoCol");
        } else {
            $('#colmenaCantidad').html("0€");
            $('#colmenaCantidad').addClass("unicoCol");
        }
    } else {
        switch (value) {
            case 0:
                $('#seg-0').prop('checked', true);
                break;
            case 1:
                $('#seg-1').prop('checked', true);
                break;
            case 3:
                $('#seg-3').prop('checked', true);
                break;
            case 5:
                $('#seg-5').prop('checked', true);
                break;
        }
        $('#colmenaCantidad').html(value + "€");
    }
}

/**
 * Changes the donation option between variable donation or fixed donation
 * @param  {int} value The value of donation selection
 */
function cambiarOpcionDon(value) {
    if (value == 0) {
        $('#fijoDon').removeClass('hidden');
        $('#variableDon').addClass('hidden');
        $('#togglePickerCol').prop('disabled', true);
        $('#colmenaCantidad').css('margin-top', '-2em');
    } else {
        $('#variableDon').removeClass('hidden');
        $('#fijoDon').addClass('hidden');
        $('#togglePickerCol').prop('disabled', false);
        $('#colmenaCantidad').css("margin-top", "-1.9em");
    }
}
/**
 * Send data for the creation of the script
 */
function sendData() {
    var empresa = $('#companyCol').val();
    var email = $('#emailCol').val();
    var proyecto = $('#proyectPickerCol').val();
    var donacion = $('#opcion').val();
    var fondo = $('#fondo').val();
    var colorFondo = $('#colorPickerCol').val();
    var colorLetra = $('#colorFontCol').val();
    createScript(empresa, email, proyecto, donacion, fondo, colorFondo, colorLetra);
}

/**
 * Creates the script for the company
 * @param  {string} empresa    The name of the company
 * @param  {string} email      The mail of the company
 * @param  {int} proyecto   The name of the project in numbers 0 is TLC and 1 Mujeres valientes
 * @param  {int} donacion   The type of donation in numbers 0 is unique and 1 multiple
 * @param  {int} fondo      The type of background in numbers 0 is photo and 1 is color
 * @param  {hex} colorFondo The background color in hexadecimal value
 * @param  {hex} colorLetra The font color in hexadecimal value
 */
function createScript(empresa, email, proyecto, donacion, fondo, colorFondo, colorLetra) {
    var script = '<div id="colmenaDiv">' + '<div id="colmenaText">';
    var style = '<style> #colmenaDiv {';
    /* Check the selected project */
    if (proyecto == 0) {
        script += '<p id="descripcionColmena">Apoya al proyecto&nbsp;<strong>Tecnologia libre de conflicto</strong> con el que se pretende conseguir una vida digna para las mujeres v&iacute;ctimas de violencia sexual y para aquellas en riesgo de sufrirla en R.D. Congo.</p>';
    } else {
        script += '<p id="descripcionColmena">Apoya al proyecto&nbsp;<strong>Mujeres Valientes</strong> con el que se pretende conseguir evitar la violencia de g&eacute;nero, impulsar la participacion de las mujeres en puestos publicos y en labores economicas todo ello mediante la educaci&oacute;n.</p>';
    }
    /* Donation mode */
    if (donacion == 0) {
        script += '<div id="fijoDon"><input class="tgl tgl-flip" id="cb5" type="checkbox" onchange="changeAmount(this.checked)" /><label class="tgl-btn" data-tg-off="No" data-tg-on="Apoyar" for="cb5"></label></div>';
    } else {
        script += '<div data-toggle="buttons" id="variableDon"><div class="select-style"><select onchange="multiChangeAmount(this.value)"><option value="0">0€</option><option value="1">1€</option><option value="3">3€</option><option value="5">5€</option></select></div></div>';
    }
    /* Finish the script html*/
    script += '</div><div id="colmenaCantidad" class="unicoCol">0€</div></div>';
    /* Css part */
    /* Background selection */
    if (fondo == 0) {
        if (proyecto == 0) {
            style += 'background: url(https://s22.postimg.org/6nlsttl5d/woman_898760_1920.jpg); background-position: center;';
        } else {
            style += 'background: url(https://s24.postimg.org/nig63r9ad/P1110519.jpg); background-position: 50% 30%;';
        }
    } else {
        style += 'background: ' + colorFondo + ';';
    }
    /* Font color selection */
    style += 'color: ' + colorLetra + ';';
    /* The rest of the CSS */
    style += 'background-repeat:no-repeat!important;background-size:cover!important;font-family:Arial,Helvetica,sans-serif!important;font-size:2vw!important;height:auto!important;max-width:100%!important;margin:5px}#colmenaDiv p{margin-top:0!important;font-size:2vw!important;text-align:left;margin-bottom:10px;line-height:1.75}#colmenaText{padding:.5em 1em 1em!important;font-weight:500}#colmenaCantidad{float:right!important;margin-top:-2em;margin-right:1em!important;font-size:1.6em!important;display:inline-block!important}.select-style{color:#000!important;padding:0;margin:0;border:1px solid #ccc;width:6em;border-radius:3px;overflow:hidden;background-color:#fff;background:#fff}.select-style select{font-size:2vw!important;padding:5px 8px;width:100%;border:none;box-shadow:none;background-color:transparent;background-image:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.select-style select:focus{outline:none}.tgl{display:none}.tgl,.tgl:after,.tgl:before,.tgl *,.tgl :after,.tgl :before,.tgl + .tgl-btn{box-sizing:border-box}.tgl::-moz-selection,.tgl:after::-moz-selection,.tgl:before::-moz-selection,.tgl ::-moz-selection,.tgl :after::-moz-selection,.tgl :before::-moz-selection,.tgl + .tgl-btn::-moz-selection{background:none}.tgl::selection,.tgl:after::selection,.tgl:before::selection,.tgl ::selection,.tgl :after::selection,.tgl :before::selection,.tgl + .tgl-btn::selection{background:none}.tgl + .tgl-btn{outline:0;display:block;width:3.5em;height:1.8em;position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.tgl + .tgl-btn:after,.tgl + .tgl-btn:before{position:relative;display:block;content:"";width:50%;height:100%}.tgl + .tgl-btn:after{left:0}.tgl + .tgl-btn:before{display:none}.tgl:checked + .tgl-btn:after{left:50%}.tgl-flip + .tgl-btn{padding:2px;-webkit-transition:all .2s ease;transition:all .2s ease;font-family:sans-serif;-webkit-perspective:100px;perspective:100px}.tgl-flip + .tgl-btn:after,.tgl-flip + .tgl-btn:before{display:inline-block;-webkit-transition:all .4s ease;transition:all .4s ease;width:100%;text-align:center;position:absolute;line-height:2em;font-size:1.7vw!important;font-weight:700;color:#fff;position:absolute;top:0;left:0;-webkit-backface-visibility:hidden;backface-visibility:hidden;border-radius:4px}.tgl-flip + .tgl-btn:after{content:attr(data-tg-on);background:#02C66F;-webkit-transform:rotateY(-180deg);transform:rotateY(-180deg)}.tgl-flip + .tgl-btn:before{background:#FF3A19;content:attr(data-tg-off)}.tgl-flip + .tgl-btn:active:before{-webkit-transform:rotateY(-20deg);transform:rotateY(-20deg)}.tgl-flip:checked + .tgl-btn:before{-webkit-transform:rotateY(180deg);transform:rotateY(180deg)}.tgl-flip:checked + .tgl-btn:after{-webkit-transform:rotateY(0);transform:rotateY(0);left:0;background:#7FC6A6}.tgl-flip:checked + .tgl-btn:active:after{-webkit-transform:rotateY(20deg);transform:rotateY(20deg)}';
    style += '</style>';

    script += style;

    var json = {};
    json.data = script;
    json.company = empresa;
    json.mail = email;
    var jsonReady = JSON.stringify(json);
        $.ajax({
        type: "POST",
        url: "http://192.168.1.34:3000/autosave",
        //url: "http://192.168.0.77:3000/json",
        data: jsonReady ,
        success: function( success ){
          if(!success) alert("Ese nombre ya existe");
        },
        dataType: "json",
        contentType: "application/json"
    });
}
