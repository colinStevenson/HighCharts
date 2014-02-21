var SpendingGagueChart = function () { };
SpendingGagueChart.prototype = new Chart();

//Static Init
SpendingGagueChart.Init = function () {
	$("div.spending-gague-chart").each(
		function () {
			var chart = new SpendingGagueChart();
			chart.Init($(this));
		}
	);
}
//Public 
SpendingGagueChart.prototype.Init = function (jContainer) {
	this._container = jContainer;
	this._render();
};
//Internal
SpendingGagueChart.prototype._render = function () {

	this._container.highcharts(this._getChartParams());
};
SpendingGagueChart.prototype._getChartParams = function () {
	return {

		chart: {
			type: 'gauge',
			backgroundColor: "#fff",
			borderWidth: 0,
			margin: [0, 0, 0, 0],
			plotBackgroundColor: "#fff",
			plotBackgroundImage: null,
			plotBorderWidth: 0,
			plotShadow: false
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		labels: {
			items:[]
		},
		plotOptions: {
			gauge: {
				dataLabels:{
					enabled:false
				},
				dial: {
					baseWidth: 8,
					radius: 110,
					rearLength: 0,
					baseLength: 4
				},
				pivot:{
					radius:4
				}
			}
		},
		pane: {
			startAngle: -90,
			endAngle: 90,
			background: [{
				borderWidth: 0,
				backgroundColor: 'transparent'
			}]
		},
		series: [{
			name: 'Speed',
			data: [25],
			tooltip: {
				enabled: false
			}
		}],
		title: {
			text: ''
		},
		tooltip: {
			enabled: false
		},
		yAxis: {
			min: 0,
			max: 100,
			minorTickWidth: 0,
			minorTickLength: 0,
			tickWidth: 0,
			tickPosition: 'inside',
			tickLength: 0,
			labels: {
				enabled: false
			},
			title: {
				text: ''
			},
			plotBands: [{
				from: 0,
				to: 15,
				color: '#006697',
				thickness: 24
			}, {
				from: 15,
				to: 20,
				color: '#00a1df',
				thickness: 24
			}, {
				from: 20,
				to: 100,
				color: '#ffd03f',
				thickness: 24
			}]
		}
	};
};
//Global Instantiation
$(function () {
	SpendingGagueChart.Init();
});