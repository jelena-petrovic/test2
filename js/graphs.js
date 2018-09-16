function reloadGraphs() {
    $("#graphsContent").load("/parts/graphs.html", function (data) {
        Highcharts.chart('status', {
            chart: {
                type: 'areaspline'
            },
            dateTimeLabelFormats: {
                day: '%H:%M'
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: 'GB'
                }
            },
            plotOptions: {
                series: {
                    pointStart: Date.UTC(2018, 5, 28, 6, 0),
                    pointInterval: 1 * 3600 * 1000 // one hour
                }
            },
            tooltip: {
                xDateFormat: '%e. %B %H:%M'
            },
            series: [{
                name: 'Data transfered',
                data: [130, 80, 30, 50, 80, 20, 110, 160, 40, 120, 70, 90, 80, 30, 130, 100, 80],
                color: '#C3FAFE'
            },
            {
                type: "spline",
                name: 'Total no. of unify clients',
                data: [0, 120, 30, 80, 70, 90, 40, 130, 50, 60, 155, 70, 140, 60, 70, 130, 120],
                color: '#004777'
            }]
        });

        Highcharts.chart('status2', {
            chart: {
                type: 'areaspline'
            },
            dateTimeLabelFormats: {
                day: '%H:%M'
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: 'No. of clients'
                }
            },
            plotOptions: {
                series: {
                    pointStart: Date.UTC(2018, 5, 28, 6, 0),
                    pointInterval: 1 * 3600 * 1000 // one hour
                }
            },
            tooltip: {
                xDateFormat: '%e. %B %H:%M'
            },
            series: [{
                data: [210, 90, 170 ,210, 90, 190, 130, 70, 120, 90, 60, 90, 210, 110 ,90 ,100, 0],
                color: '#FF9C9A',
                name: "Bad"
            },
            {
                data: [130, 60, 120, 20, 70, 50, 110, 30, 110, 60, 40, 80, 130, 70, 80, 60, 0],
                color: '#FBD28E',
                name: "Medium"
            },
            {
                data: [60, 20, 50, 10, 30, 20, 50, 15, 30, 10, 30, 40, 30, 50, 10, 40, 0],
                color: '#20FC8F', 
                name: "Good"
            }]
        });

        $('.interference').each(function () {
            var chart = new Highcharts.Chart({
                chart: {
                    type: 'column',
                    renderTo: this,
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    max: 200,
                    tickLength: 50,
                    title: {
                        text: 'No. of clients'
                    }
                },
                xAxis: {
                    min: 1,
                    title: {
                        text: 'Teritorial Directions'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size: 10px">Channel: {point.key}</span><br/>',
                    xDateFormat: '%e. %B %H:%M'
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    },
                    series: {
                        borderRadius: 3,
                        pointWidth: 10,
                        groupPadding: 0.9
                    }
                },
                series: [{
                    name: 'A',
                    data: [140,130, 140, 70, 70, 110, 130, 180, 160, 120, 162, 145, 110, 95],
                    color: '#8EF8FF'
    
                }, {
                    name: 'B',
                    data: [100, 100, 100, 130, 90, 90, 100, 140, 150, 140, 185, 175, 93, 97],
                    color: '#00C2E2'
                },
                {
                    name: 'C',
                    data: [60, 70, 190, 160, 80, 130, 190, 120, 130, 142, 130, 132, 147, 122],
                    color: '#006799'
                },
                {
                    name: 'D',
                    data: [120, 126, 170, 195, 85, 105, 170, 155, 190, 144, 140, 128, 125, 118],
                    color: '#0088BC'
                }]
            });
        });

        $('.bitrate').each(function () {
            var colors = $(this).data('graph-colors');
            var chart = new Highcharts.Chart({
                chart: {
                    type: "spline",
                    renderTo: this
                },
                dateTimeLabelFormats: {
                    day: '%H:%M'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    type: 'datetime',
                },
                yAxis: {
                    title: {
                        text: 'Mbps'
                    }
                },
                plotOptions: {
                    series: {
                        pointStart: Date.UTC(2018, 5, 28, 6, 0),
                        pointInterval: 1 * 3600 * 1000 // one hour
                    }
                },
                tooltip: {
                    xDateFormat: '%e. %B %H:%M'
                },
                series: [{
                    data: [210, 90, 170 ,210, 90, 190, 130, 70, 120, 90, 60, 90, 210, 110 ,90 ,100, 0],
                    color: colors[0],
                    name: "Max"
                },
                {
                    data: [130, 60, 120, 20, 70, 50, 110, 30, 110, 60, 40, 80, 130, 70, 80, 60, 0],
                    color: colors[1],
                    name: "Average"
                },
                {
                    data: [60, 20, 50, 10, 30, 20, 50, 15, 30, 10, 30, 40, 30, 50, 10, 40, 0],
                    color: colors[2],
                    name: "Min"
                }]
            });
        });
        
        Highcharts.chart('retransmission', {
            dateTimeLabelFormats: {
                day: '%H:%M'
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000 + 'k';
                    }
                },
                min: 0, 
                max: 140000
            },
            plotOptions: {
                series: {
                    pointStart: Date.UTC(2018, 5, 28, 6, 0),
                    pointInterval: 1 * 3600 * 1000 // one hour
                }
            },
            tooltip: {
                xDateFormat: '%e. %B %H:%M'
            },
            series: [{
                data: [0, 0, 0, 71000, 0, 0, 0, 35000, 71000, 35000, 0, 0, 0, 0, 0, 71000, 0],
                color: '#0088BC',
                name: "Bytes"
            },
            {
                data: [0, 0, 0, 30000, 0, 0, 0, 0, 30000, 0, 0, 0, 0, 0, 0, 30000, 0],
                color: '#00C2E2',
                name: "Retransmitted bytes"
            }]
        });

        Highcharts.chart('clients', {
            chart: {
                type: 'areaspline'
            },
            dateTimeLabelFormats: {
                day: '%H:%M'
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: 'No. of clients'
                }
            },
            plotOptions: {
                series: {
                    pointStart: Date.UTC(2018, 5, 28, 6, 0),
                    pointInterval: 1 * 3600 * 1000 // one hour
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                xDateFormat: '%e. %B %H:%M'
                
            },
            series: [{
                name: 'No. of clients',
                data: [13, 9, 2, 5, 4, 8, 9, 17, 5, 14, 12, 11, 14, 4, 19, 6, 17],
                color: '#C3FAFE'
            }]
        });
    });

}