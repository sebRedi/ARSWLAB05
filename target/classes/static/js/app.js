var app = (function () {
    // Estado privado
    var _author = null;
    var _blueprints = [];

    // Función privada para calcular puntos totales
    function _calculateTotalPoints() {
        return _blueprints.map(bp => bp.points.length)
            .reduce((a, b) => a + b, 0);
    }

    // Función privada para dibujar un blueprint en canvas
    function _drawBlueprint(bp) {
        var canvas = document.getElementById("blueprintCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // limpiar antes de dibujar

        if (bp.points.length > 0) {
            ctx.beginPath();
            ctx.moveTo(bp.points[0].x, bp.points[0].y);
            for (var i = 1; i < bp.points.length; i++) {
                ctx.lineTo(bp.points[i].x, bp.points[i].y);
            }
            ctx.stroke();
        }
    }

    // API pública del módulo
    return {
        setAuthor: function (authorName) {
            _author = authorName;
        },

        getBlueprints: function () {
            return apimock.getBlueprintsByAuthor(_author, function (data) {
                _blueprints = data;
                $("#selectedAuthor").text(_author);

                // construir tabla
                var table = $("#blueprintsTable");
                table.empty();
                data.forEach(bp => {
                    var row = `<tr>
                        <td>${bp.name}</td>
                        <td>${bp.points.length}</td>
                        <td><button class="btn btn-info" onclick="app.openBlueprint('${bp.name}')">Open</button></td>
                    </tr>`;
                    table.append(row);
                });

                $("#totalPoints").text(_calculateTotalPoints());
            });
        },

        openBlueprint: function (bpName) {
            var bp = _blueprints.find(b => b.name === bpName);
            if (bp) {
                _drawBlueprint(bp);
            }
        }
    };
})();
