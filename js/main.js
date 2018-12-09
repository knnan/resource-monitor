sheetUrl = "https://docs.google.com/spreadsheets/d/1wY52LF3nqJwXHzsCTel3svMbOA4LjRzcjwdbvodYpW8/edit?usp=sharing"
var time = [];
var plugged = [];
var percentage = []

var formdata;
function init() {
    Tabletop.init({
        key: sheetUrl,
        callback: function (data, tabletop) {
            // console.log(data)
            formdata = data;
            formdata.forEach((bat, index) => {
                time.push(bat.Time);
                plugged.push(bat.plugged);
                percentage.push(Number(bat.percentage));
                // console.log(bat.plugged);
                
            });
            console.log(formdata);

        },
        simpleSheet: true
    })
}
// window.addEventListener('DOMContentLoaded', init);
setInterval(() => {
    
    init();
}, 2000);

let chart = document.getElementById('myChart').getContext('2d');

setTimeout(() => {
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
}, 4000);
//FOR plotly.js
// TESTER = document.getElementById('tester');
// Plotly.plot(TESTER, [{
//     x: percentage,
//     y:time
// }], {
//         margin: { t: 0 }
//     });
