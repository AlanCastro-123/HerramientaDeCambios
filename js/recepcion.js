$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);

    const camposGenerales = ['Ambiente', 'Silo(s)', 'Tiempo de validación', 'Hora Inicio', 'Hora Fin', 'Tipo de validación', 'Archivo(s) adquirente', 'Archivo(s) emisor'];
    const camposEspecificos = [
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

    let contadorCampos = 0;

    const agregarCampo = (contenedorId, campo, valor) => {
      const $contenedor = $(`#${contenedorId}`);
      // Determina en qué fila y cuántas columnas debe tener
      let columnasPorFila;
      if (contadorCampos < 2) {
        columnasPorFila = 2; // primeras 2 en una fila de 2 columnas
      } else {
        columnasPorFila = 3; // después en filas de 3 columnas
      }

      // Verifica si hay una fila abierta y si necesita crear una nueva
      let $ultimaFila = $contenedor.children('.row').last();

      // Si no hay fila aún, o la fila actual ya tiene suficientes columnas, se crea una nueva fila
      if (
        $ultimaFila.length === 0 ||
        contadorCampos === 2 ||
        contadorCampos === 5
      ) {
        $ultimaFila = $('<div class="row mb-3"></div>');
        $contenedor.append($ultimaFila);
      }

      // Calcula el ancho de columna en Bootstrap (12 columnas totales por fila)
      const colWidth = Math.floor(12 / columnasPorFila);

      const $col = $(`
        <div class="col-md-${colWidth}">
          <div class="border rounded p-3 bg-light">
            <div class="dato-label">${campo}:</div>
            <div>${valor}</div>
          </div>
        </div>
      `);

      $ultimaFila.append($col);
      contadorCampos++;
    };

    const agregarDetalle = (contenedorId, campo, valor) => {
      const $li = $(`
        <li>
          <strong>${campo}:</strong> ${valor}
        </li>
      `);

      // Asegúrate de que el contenedor tenga una lista (<ul>), y si no, la agregas
      const $contenedor = $(`#${contenedorId}`);
      let $ul = $contenedor.find('ul');
      if ($ul.length === 0) {
        $ul = $('<ul class="list-unstyled ms-3"></ul>'); // Puedes quitar "list-unstyled" si quieres bullets estándar
        $contenedor.append($ul);
      }

      $ul.append($li);
    };

    // Agregar datos generales
    camposGenerales.forEach(campo => {
      const valor = params.get(campo);
      if (valor) {
        agregarCampo('datosGenerales', campo, valor);
      }
    });

    // Agregar datos específicos
    camposEspecificos.forEach(campo => {
      const valor = params.get(campo);
      if (valor) {
        agregarDetalle('datosEspecificos', campo, valor);
      }
    });

    // Agregar conclusión si existe
    const conclusion = params.get('conclusion');
    if (conclusion) {
      $('#conclusionesTexto').text(conclusion);
    } else {
      $('#conclusionesTexto').text("No se ingresaron conclusiones.");
    }
    
  });

