function generateRandomData(labels) {
    if (labels === undefined) {
        return [];
    }
    var len = labels.length;

    var percentages = new Array(len);
    var left = 100;
    var max = 0;
    for (var i = 0; i < len - 1; i++) {
        rand = Math.floor(Math.random() * Math.min(left, 98)) + 1;
        if (rand > max) {
            max = rand;
        }
        percentages[i] = rand;
        left = left - rand;
    }
    if (left > max) {
        max = left;
    }
    percentages[len - 1] = left
    percentages = shuffle(percentages);

    var max_index = 0;
    var ret = new Array(len);
    for (var i = 0; i < len; i++) {
        ret[i] = {
            name: labels[i],
            y: percentages[i]
        }
        if (percentages[i] === max) {
            max_index = i;
        }
    }

    return {
        max: max,
        max_index: max_index,
        data: ret,
    };
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function reloadTables() {
    $("#tablesContent").load("/parts/tables.html", function (data) {

        $('.randomValue').each(function () {
            min = $(this).data('random-min');
            max = $(this).data('random-max');
            rand = Math.floor(Math.random() * (max - min)) + min;
            $(this).html(rand);
        });

        $('.chartContainer').each(function () {
            var colors = $(this).data('chart-colors')
            Highcharts.setOptions({
                colors: colors
            });
            var randomData = generateRandomData($(this).data('chart-labels'));
            var chartContainer = $(this);
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: this,
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        innerSize: '55%',
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    y: 30,
                    navigation: {
                        enabled: false
                    },
                    adjustChartSize: true,
                    labelFormatter: function () {
                        return this.name + " (" + Math.round(this.percentage) + "%)";
                    }
                },
                series: [{
                    name: '',
                    colorByPoint: true,
                    data: randomData.data
                }]
            },
            function (chart) { // on complete
                var textX = chart.plotLeft + (chart.plotWidth * 0.5);
                var textY = chart.plotTop + (chart.plotHeight * 0.5);

                var span = '<span class="pieInfoText" style="position:absolute; text-align:center;">';
                span += '<span style="font-size: 16px; color: ' + colors[randomData.max_index] + '; font-weight: bold;">' + randomData.max + '%</span>';
                span += '</span>';
                chartContainer.siblings(".addText").append(span);
                span = chartContainer.parent().find('.pieInfoText');
                span.css('left', textX + (span.width() * -0.5));
                span.css('top', textY + (span.height() * -0.5));
            })
        });

    });
}