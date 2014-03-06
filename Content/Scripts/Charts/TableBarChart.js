var TableBarChart = function () { };
TableBarChart.prototype = new Chart();

//Static 
TableBarChart.Init = function () {
	$(".table-bar-chart").each(function () {
		var chart = new TableBarChart();
		chart.Init($(this));
	});
};

//Public
TableBarChart.prototype.Init = function (jContainer) {
	this._container = jContainer;
	this._render();
};
//Internal
TableBarChart.prototype._render = function () {
	this._container.highcharts(this._getChartParams());
};
TableBarChart.prototype.COLORS = ["#a7a9ac", "#69badc", "#189bd7", "#115e92"];
TableBarChart.prototype._getSeries = function () {
	var rSeries = [];

	var jtable = $("#table-bar-chart-data");

	//var rColLabels = [];
	//$("thead th", jtable).each(function () { rColLabels.push($(this).html()); });

	var jDataRows = $("tbody tr", jtable);
	for (var i = 0; i < jDataRows.length; i++) {
		var oData = {
			color: this.COLORS[i],
			data: this._getDataFromRowCells($("td", $(jDataRows[i])))
		};
		rSeries.push(oData)
	}
	return rSeries;
};
TableBarChart.prototype._getDataFromRowCells = function(jCells){
	var rData = [];
	jCells.each(function(){
		rData.push(
			Number($(this).data("value"))
		);
	});
	console.log(rData);
	return rData;
};
TableBarChart.prototype._getChartParams = function () {
	return {
		chart: {
			type: 'column',
			plotBorderWidth: 0
		},
		credits: {
			enabled: false
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			column: {
				stacking: 'normal',
				pointWidth: 85
			}
		},
		series: this._getSeries(),
		title: '',
		xAxis: {
			labels: {
				enabled:false
			},
			tickWidth:0
		},
		yAxis: {
			opposite: true,
			title: {
				text: ''
			},
			labels: {
				align: "right",
				style: {
					fontSize: "14px",
					fontWeight: "normal"
				},
				x: 0,
				y: 14
			},
			showFirstLabel: false,
			showLastLabel: false
		}
	};
};
//Global Instantiation
$(function () {
	TableBarChart.Init();
});