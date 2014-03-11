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
	$(window).on("resize", $.proxy(this._handleResize,this));
	this._render();
};
//Internal
TableBarChart.prototype._render = function () {
	this._chart = window.tableBarChart = new Highcharts.Chart(this._getChartParams());
	this._shiftAxis();
};
TableBarChart.prototype.COLORS = ["#a7a9ac", "#69badc", "#189bd7", "#115e92"];
TableBarChart.prototype._getSeries = function () {
	var rSeries = [];

	var jtable = $("#table-bar-chart-data");

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
	return rData;
};
TableBarChart.prototype._getChartParams = function () {
	return {
		chart: {
			events: {
				redraw: $.proxy(this._handleChartUpdate, this)
			},
			type: 'column',
			plotBorderWidth: 0,
			reflow:false,
			renderTo: this._container[0]
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
				pointWidth: this._getBarWidth(),
				tooltip: {

				}
			}
		},
		series: this._getSeries(),
		title: '',
		tooltip:{
			enabled:false
		},
		xAxis: {
			labels: {
				enabled:false
			},
			min: 0,
			max: 5,
			tickWidth: 0,
			type: "category"
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
//Get Narrowest table column width 
TableBarChart.prototype._getBarWidth = function () {
	var nMin = 200;
	var nPadding = 16;
	$("#table-bar-chart-data th.text-right").each(function () {
		nMin = Math.min(nMin, $(this).width());
	});
	this._barWidth = nMin - nPadding;
	return this._barWidth;
};
TableBarChart.prototype._getColXPositions = function () {
	var rPositions = [];
	var oContext = this;
	$("#table-bar-chart-data th.text-right").each(function () {
		var jCell = $(this);
		var nX = jCell.position().left + jCell.width() - oContext._barWidth + (oContext._barWidth/ 2);
		rPositions.push(oContext._chart.series[0].xAxis.translate(nX, true));
	});
	return rPositions;
};
TableBarChart.prototype._shiftAxis = function () {
	var rXPositions = this._getColXPositions();
	var rSerieses = [];
	for (var i = 0; i < this._chart.series.length; i++) {
		var rNewSeries = [];
		var oSeries = this._chart.series[i];
		for (var j = 0; j < oSeries.points.length; j++) {
			var oPoint = oSeries.points[j];
			var nXVal = rXPositions[j];
			oPoint.update({x:nXVal}, false)
		}
	}
	this._chart.redraw();
};
TableBarChart.prototype._handleChartUpdate = function (oEvent) {
	
};
TableBarChart.prototype._handleResize = function () {
	if (this._resizeTimeout) {
		window.clearTimeout(this._resizeTimeout);
	}
	this._resizeTimeout = window.setTimeout($.proxy(this._resizeTimeoutHandler, this), 100);
};
TableBarChart.prototype._resizeTimeoutHandler = function () {
	if (this._chart) {
		this._chart.destroy();
	}
	this._render();
}
//Global Instantiation
$(function () {
	TableBarChart.Init();
});