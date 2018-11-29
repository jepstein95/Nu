// TODO: efficiency
var labels = [];
var data = [];

var keys = Object.keys(collection);
var lastDate = keys[0];
var firstDate = keys[keys.length - 1];

var newDate = firstDate;
labels.push(newDate);
while (newDate != lastDate) {
  newDate = new Date(newDate);
  newDate.setDate(newDate.getDate() + 1);
  newDate = newDate.toDateString();
  labels.push(newDate);
}

for (var i in labels) {
  var date = labels[i];
  if (!collection[date]) data.push(0);
  else data.push(collection[date].length);
}

var canvas = document.getElementById('canvas');

var chart = new Chart(canvas.getContext('2d'), {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      data: data,
      borderColor: '#4582ec',
      backgroundColor: '#fff',
      pointRadius: 0,
      pointHitRadius: 8,
      pointHoverRadius: 4,
      pointHoverBackgroundColor: '#4582ec',
      lineTension: 0.2
    }],
  },
  options: {
    aspectRatio: 4,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        display: false
      }],
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItems, data) {
          return '';
        }
      }
    }
  }
});

canvas.onclick = function(e) {
  var elements = chart.getElementsAtEvent(e); 
  var i = elements[0]._index;
  var label = labels[i];
  var rec = document.getElementById(label).getBoundingClientRect();
  var top = rec.top + window.scrollY;
  window.scrollTo(0, top - 60);
};
