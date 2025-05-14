$(document).ready(function () {
    const opciones = {
        POS: ['Silos 1 BV y 4 QR', 'Silos 2 BV y 5 QR', 'Silos 1 y 2 BV', 'Silos 4 y 5 QR', 'Silo 1 BV', 'Silo 2 BV', 'Silo 4 QR', 'Silo 5 QR'],
        ATM: ['Silo 2 BV', 'Silo 4 QR']
    };

    const opcionesEspecificasADQ = {
        POS: ['TPVs BBVA', 'TPVs BNMX', 'Interredes BBVA', 'Interredes BNMX', 'Adquirente Nacional', 'Visa, MC, Amex'],
        ATM: ['Banamex', 'ACQs']
    };

    const opcionesEspecificasEMI = {
        POS: ['BBVA', 'BNMX', 'PROSA', 'NACIONAL', 'Visa, MC, Amex'],
        ATM: ['Banamex', 'Emisores']
    };

    const detalles = [
        'Porcentaje de ON2 DESC',
        'Porcentaje de ON2 por BIN',
        'Porcentaje de ON2 por Dispatcher Adquirente',
        'Mapeo MTI-ProcCode a TranCode',
        'Mapeo de codigos de error C39 emisor, on2 y C39 adquierente',
        'Tipo de transacciones declinadas por el emisor y aprobadas al adquirente',
        'Codigos de C39 por Dispatcher emisor',
        'Indicadores en el desc de Tipo de Cambio por flujo adquirente internacional a emisor',
        'C44 respondido por el emisor Visa por operativa',
        'C44 respondido al adquirente Visa por operativa',
        'Campos presentes por tipo de transacción recibidos de adquirente Visa',
        'Campos presentes por tipo de transacción recibidos de adquirente MasterCard',
        'Campos presentes por tipo de transacción enviados al emisor Visa',
        'Campos presentes por tipo de transacción enviados al emisor MasterCard',
        'Campos presentes respondidos por tipo de transaccion al adquirente Visa',
        'Campos presentes respondidos por tipo de transaccion al adquirente MasterCard',
        'Campos presentes por tipo de transaccion respondidos por el emisor Visa',
        'Campos presentes por tipo de transaccion respondidos por el emisor MasterCard',
        'Tags emv por tipo de transacción recibidos de adquirente Visa',
        'Tags emv por tipo de transacción recibidos de adquirente MasterCard',
        'Tags emv por tipo de transaccon enviados al emisor Visa',
        'Tags emv por tipo de transaccon enviados al emisor MasterCard',
        'Campos presentes por tipo de transacción recibidos de adquirentes Nacional',
        'Campos presentes por tipo de transacción enviados a emisores Nacional',
        'Campos presentes por tipo de transacción respondidos por emisores Nacional',
        'Campos presentes por tipo de transacción respondidos a adquirentes Nacional',
        'Tokens presentes por tipo de transaccion recibidos de adquirentes Nacional',
        'Tokens presentes por tipo de transaccion enviados a emisores Nacional',
        'Tokens presentes por tipo de transacción respondidos a adquirentes Nacional',
        'Tokens presentes por tipo de transaccion respondiso de emisores Nacional',
        'Adicionales por tipo de transaccion plataforma de adquirente y emisor'
    ];

    const $form = $('#detalleForm');
    detalles.forEach((item, index) => {
        const checkboxId = `check-${index}`;
        const inputId = `input-${index}`;

        const $div = $(`
                <div class="row mb-2">
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="${checkboxId}">
                            <label class="form-check-label fs-6" for="${checkboxId}">${item}</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" id="${inputId}" name="${item}" placeholder="Escribe aquí..." autocomplete="off" disabled>
                    </div>
                </div>
            `);


        $form.append($div);

        $div.find(`#${checkboxId}`).on('change', function () {
            $div.find(`#${inputId}`).prop('disabled', !this.checked);
        });
    });

    $('#ambienteVal').on('change', function () {
        const seleccion = $(this).val();
        const $subcategoria = $('#siloVal');
        $subcategoria.empty();
        if (opciones[seleccion]) {
            opciones[seleccion].forEach(function (item) {
                $subcategoria.append(new Option(item, item));
            });
            $('#grupo-subcategoria').show();
        } else {
            $('#grupo-subcategoria').hide();
        }
    });

    tiempoSel = 0;
    horaOriginal = '08:30';
    $('#horaInicio').val(horaOriginal);

    $('#ambienteVal').on('change', function () {
        const seleccion = $(this).val();
        const $tiempoVal = $('#tiempoVal');
        const $horaInicio = $('#horaInicio');
        $tiempoVal.empty();
        // Convertir a objeto Date usando una fecha arbitraria
        let [horas, minutos] = $horaInicio.val().split(':');
        let fecha = new Date();
        fecha.setHours(parseInt(horas), parseInt(minutos));
        const $horaFin = $('#horaFin');
        $horaFin.empty();

        if (seleccion == 'POS') {
            $tiempoVal.val('15 min');
            tiempoSel = 15;
            // Sumar 15 minutos
            fecha.setMinutes(fecha.getMinutes() + tiempoSel);
            // Formatear de nuevo a HH:mm
            let nuevaHora = fecha.toTimeString().substring(0, 5);  // Ej: "08:45"
            $horaFin.val(nuevaHora)
            $('.fila-hora').show();
        } else {
            $tiempoVal.val('30 min');
            // Sumar 30 minutos
            tiempoSel = 30;
            fecha.setMinutes(fecha.getMinutes() + tiempoSel);
            // Formatear de nuevo a HH:mm
            let nuevaHora = fecha.toTimeString().substring(0, 5);  // Ej: "08:45"
            $horaFin.val(nuevaHora)
            $('.fila-hora').show();
        }
        $('#tipoVal')[0].selectedIndex = 0;
        $('#adquirenteVal').replaceWith(`
            <input type="text" id="adquirenteVal" class="form-control" value="General" disabled>
        `);
        $('#emisorVal').replaceWith(`
            <input type="text" id="emisorVal" class="form-control" value="General" disabled>
        `);
    });


    $('#horaInicio').on('input', function () {
        let horaOriginal = $(this).val();

        if (horaOriginal) {
            let [horas, minutos] = horaOriginal.split(':');
            let fecha = new Date();
            fecha.setHours(parseInt(horas), parseInt(minutos));

            // Sumar 15 minutos
            fecha.setMinutes(fecha.getMinutes() + tiempoSel);

            // Formatear como HH:mm
            let hh = String(fecha.getHours()).padStart(2, '0');
            let mm = String(fecha.getMinutes()).padStart(2, '0');
            let nuevaHora = `${hh}:${mm}`;

            $('#horaFin').val(nuevaHora);
        } else {
            $('#horaFin').val('');
        }
    });

    $('#tipoVal').on('change', function () {

        const tpVal = $(this).val();
        if (tpVal == 'Específico') {
            $('#adquirenteVal').prop('disabled', false);
            $('#emisorVal').prop('disabled', false);
            const categoriaSeleccionada = $("#ambienteVal").val();
            const opcionesADQ = opcionesEspecificasADQ[categoriaSeleccionada];
            const opcionesEMI = opcionesEspecificasEMI[categoriaSeleccionada];
            if (opcionesADQ && opcionesEMI) {
                // Construir el select con las opciones
                let selectHTML = `<select multiple size=4 id="adquirenteVal" class="form-control" required>`;
                selectHTML += `<option value="" disabled>-- Selecciona una opción --</option>`;
                opcionesADQ.forEach(function (op) {
                    selectHTML += `<option value="${op}">${op}</option>`;
                });
                selectHTML += `</select>`;
                $('#adquirenteVal').replaceWith(selectHTML);
                selectHTML = `<select multiple size=4 id="emisorVal" class="form-control" required>`;
                selectHTML += `<option value="" disabled>-- Selecciona una opción --</option>`;
                opcionesEMI.forEach(function (op) {
                    selectHTML += `<option value="${op}">${op}</option>`;
                });
                selectHTML += `</select>`;
                $('#emisorVal').replaceWith(selectHTML);
            }
        } else {
            $('#adquirenteVal').replaceWith(`
                    <input type="text" id="adquirenteVal" name="Archivo(s) adquirente" class="form-control" value="General" disabled>
                `);
            $('#emisorVal').replaceWith(`
                    <input type="text" id="emisorVal" name="Archivo(s) emisor" class="form-control" value="General" disabled>
                `);
        }

        $('#miFormulario').on('submit', function (e) {
            e.preventDefault(); // Evita envío normal
            $('#tiempoVal, #horaFin, #adquirenteVal, #emisorVal').prop('disabled', false);
            datos = $(this).serialize();
            if ($("#adquirenteVal, #emisorVal").is('select')) {
                var valores = $('#adquirenteVal').val();
                var archivosAdquirente = "Archivo(s) adquirente=" + (valores ? valores.join(', ') : "");
                var valores = $('#emisorVal').val();
                var archivosEmisor = "Archivo(s) emisor=" + (valores ? valores.join(', ') : "");
                datos += "&" + archivosAdquirente + "&" + archivosEmisor;
                
            }
            
            $('#tiempoVal, #horaFin, #adquirenteVal, #emisorVal').prop('disabled', true);
            console.log(datos)
            window.location.href = 'reporte.html?' + datos;
            
        });
    });
});