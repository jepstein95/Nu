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

var chart = new Chart(document.getElementById('canvas').getContext('2d'), {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      backgroundColor: '#00a',
      data: data,
      lineTension: 0.2
    }],
  },
  options: {
    aspectRatio: 4,
    legend: {
      display: false
    }
  }
});
