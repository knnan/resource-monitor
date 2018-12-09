sheetUrl = "https://docs.google.com/spreadsheets/d/1wY52LF3nqJwXHzsCTel3svMbOA4LjRzcjwdbvodYpW8/edit?usp=sharing"
var time = [];
var plugged = [];
var percentage = [];
var len=0;

var formdata;
function init() {
    Tabletop.init({
        key: sheetUrl,
        callback: function (data, tabletop) {
            // console.log(data)
            formdata = data;
            // time = [];
            // plugged = [];
            // percentage = [];
            formdata.forEach((bat, index) => {
                time.push(bat.Time);
                plugged.push(bat.plugged);
                percentage.push(Number(bat.percentage));
                // console.log(bat.plugged);
            });
            console.log('len is ',len)
            console.log('formlen is ',formdata.length);
            // console.log(formdata);
            // time = time.slice(formdata.length - len);
            // plugged = plugged.slice(formdata.length - len);
            // percentage = percentage.slice(formdata.length - len);
            console.log(time, plugged, percentage);

        },
        simpleSheet: true
    })
}
// window.addEventListener('DOMContentLoaded', init);
setInterval(() => {
    if (formdata == undefined)
    {
        len = 0;
    }
    else {
        
        len = formdata.length;
    }
    init();
}, 2000);

let chart = document.getElementById('myChart').getContext('2d');

let batChart = new Chart(chart, {
    type: 'line',
    data: {
        labels: time,
        datasets: [
            {
                label: 'Batter charge',
                data: percentage         ,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    } 
});


setInterval(() => {
    batChart.data.datasets[0].data[5] = percentage;
    batChart.data.labels[5] = time;
    batChart.update();
    
}, 2000);

