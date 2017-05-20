function cambiarProyecto(value) {
    switch (value) {
    case '0':
        $("#descripcionColmena").html("Apoya al proyecto&nbsp;<strong>Tecnologia libre de conflicto</strong> con el que se pretende conseguir una vida digna para las mujeres v&iacute;ctimas de violencia sexual y para aquellas en riesgo de sufrirla en R.D. Congo. ");
        if ($('#fondo')[0].value == 0) {
            $("#colmenaDiv").css({
                "background": "url(https://s22.postimg.org/6nlsttl5d/woman_898760_1920.jpg)"
                , "background-position": "center"
            });
        }
        break;
    case '1':
        $("#descripcionColmena").html("Apoya al proyecto&nbsp;<strong>Mujeres Valientes</strong> con el que se pretende conseguir evitar la violencia de g&eacute;nero, impulsar la participacion de las mujeres en puestos publicos y en labores economicas todo ello mediante la educaci&oacute;n.");
        if ($('#fondo')[0].value == 0) {
            $("#colmenaDiv").css({
                "background": "url(https://s24.postimg.org/nig63r9ad/P1110519.jpg)"
                , "background-position": "50% 30%"
            });
        }
        break;
    }
}

function cambiarColor() {
    $('#cp8Fondo').colorpicker().on('changeColor', function (e) {
        $('#colmenaDiv').css("background", e.color.toString('rgba'));
    });
}

function cambiarLetra() {
    $('#cp8Letra').colorpicker().on('changeColor', function (e) {
        $('#colmenaDiv').css("color", e.color.toString('rgba'));
    });
}


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

function cambiarCantidad(value) {
    if (value == 100) {
        if ($('#colmenaCantidad').hasClass("triky")) {
            $('#colmenaCantidad').html("1€");
            $('#colmenaCantidad').removeClass("triky");
        }
        else {
            $('#colmenaCantidad').html("0€");
            $('#colmenaCantidad').addClass("triky");
        }
    }
    else {
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

function cambiarOpcionDon(value) {
    if (value == 0) {
        $('#fijoDon').removeClass('hidden');
        $('#variableDon').addClass('hidden');
        $('#togglePickerCol').prop('disabled', true);
        $('#colmenaCantidad').css('margin-top', '-2em');
    }
    else {
        $('#variableDon').removeClass('hidden');
        $('#fijoDon').addClass('hidden');
        $('#togglePickerCol').prop('disabled', false);
        $('#colmenaCantidad').css("margin-top", "-1.9em");
    }
}