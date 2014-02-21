var AccountsBarChart = function () { };

AccountsBarChart.prototype = new Chart();

//Static Init
AccountsBarChart.Init = function () {
	$("div.accounts-bar-chart").each(
		function () {
			var chart = new AccountsBarChart();
			chart.Init($(this));
		}
	);
}
//Public
AccountsBarChart.prototype.Init = function (jContainer) {
	this._container = jContainer;
	this._render();
};
//Internal
AccountsBarChart.prototype._render = function () {
	this._container.highcharts(this._getChartParams());
};
AccountsBarChart.prototype._getData = function () {
	return [
		{ "name": "Microsoft Internet Explorer ", "y": 53.61, deposits: 10, wd:5 },
		{ "name": "Chrome ", "y": 18.73, deposits: 5, wd: 11 },
		{ "name": "Firefox ", "y": 19.899999999999995, deposits: 12, wd: 5 },
		{ "name": "Safari ", "y": 4.64, deposits: 10, wd: 5 },
		{ "name": "Opera ", "y": 1.54, deposits: 10, wd: 5 },
		{ "name": "Proprietary or Undetectable", "y": 0.29, deposits: 8, wd: 5 }
	];
};
AccountsBarChart.prototype._getChartParams = function () {
	return {
		chart: {
			type: 'column'
		},
		colors: ["#0b5d8e"],
		credits: {
			enabled: false
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			series: {
				dataLabels: {
					enabled: true,
					format: '[{point.deposits}] [{point.wd}]'
				}
			}
		},
		series: [{
			name: 'Brands',
			data: this._getData()
		}],
		tooltip: {
			enabled: false
		},
		title: '',
		xAxis: {
			type: 'category'
		},
		yAxis: {
			opposite: true,
			title: {
				text: ''
			}
		}
	};
};
//Global Instantiation
$(function () {
	AccountsBarChart.Init();
});