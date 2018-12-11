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
            formdata = data;
            console.log(formdata); 
            
            time = [];
            plugged = [];
            percentage = [];

            formdata.forEach((bat, index) => {

                time.push(new Date(bat.Time).toLocaleTimeString());

                plugged.push(bat.plugged);
                
                percentage.push(Number(bat.cpu));
            });

            console.log('len is ',len)
            console.log('formlen is ',formdata.length);
            // time = time.slice(formdata.length - len);
            // plugged = plugged.slice(formdata.length - len);
            // percentage = percentage.slice( len);
            console.log(percentage);

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

let chart1 = document.getElementById('myChart1').getContext('2d');

let finalchart = new Chart(chart1, {
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
    finalchart.data.datasets[0].data = percentage;
    finalchart.data.labels = time;
    finalchart.update();
    
}, 200);

