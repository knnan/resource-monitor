sheetUrl = "https://docs.google.com/spreadsheets/d/1wY52LF3nqJwXHzsCTel3svMbOA4LjRzcjwdbvodYpW8/edit?usp=sharing"
var time = [];
var plugged = [];
var percentage = [];
var cpu = [];
var len = 0;
var pval = 0;
var cval = 0;
var tval = 0;


var formdata;
function init() {
    Tabletop.init({
        key: sheetUrl,
        callback: function (data, tabletop) {
            formdata = data;
            time = [];
            plugged = [];
            percentage = [];
            cpu = [];
            formdata.forEach((bat, index) => {
                time.push(bat.Time);
                plugged.push(bat.plugged);
                percentage.push(Number(bat.percentage));
                cpu.push(Number(bat.cpu));
            });
            // console.log('len is ', len)
            // console.log('formlen is ', formdata.length);
            // console.log(formdata);
            plugged = plugged.slice(len);
            time = time.slice(len);
            percentage = percentage.slice(len);
            cpu = cpu.slice(len);
            console.log(percentage.length);
            console.log(percentage);
            if (cpu.length == 0) {
                cpu = [cval];
                time = [tval];
                percentage = [pval];
            }


        },
        simpleSheet: true
    })
}
// window.addEventListener('DOMContentLoaded', init);
setInterval(() => {
    if (formdata == undefined) {
        len = 0;
    }
    else {

        len = formdata.length;
        cval = cpu[cpu.length - 1];
        tval = time[time.length - 1];
        pval = percentage[percentage.length - 1];

    }
    init();
}, 2000);

var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    limegreen: 'rgb(176, 241, 54)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};
function onRefresh(chart) {
    chart.config.data.datasets[0].data.push({
        x: Date.parse(time),
        y: cpu
    });
    chart.config.data.datasets[1].data.push({
        x: Date.parse(time),
        y: percentage
    });
    //     forEach(function (dataset) {
    //     dataset.data.push({
    //         x:Date.parse(time),
    //         y: cpu
    //     });
    // });
}
function randomScalingFactor() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}
var color = Chart.helpers.color;
var config = {
    type: 'line',
    data: {
        datasets: [{
            label: 'Cpu ',
            backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
            borderColor: chartColors.limegreen,
            fill: 'start',
            spanGaps: true,
            lineTension: 0,
            data: []
        },
        {
            label: 'Battery charge',
            backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
            borderColor: chartColors.blue,
            fill: "start",
            cubicInterpolationMode: 'monotone',
            data: []
        }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Line chart (hotizontal scroll) sample'
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    duration: 15000,
                    refresh: 2000,
                    delay: 2000,
                    onRefresh: onRefresh
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }
            }]
        },

        tooltips: {
            mode: 'nearest',
            intersect: false
        },
        hover: {
            mode: 'nearest',
            intersect: false
        }
    }
};

window.onload = function () {
    var ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, config);
};

// let chart = document.getElementById('myChart').getContext('2d');
