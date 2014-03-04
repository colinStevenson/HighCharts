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
//Internal - Display
AccountsBarChart.prototype._renderTooltip = function (oChart, oPlot) {
	var jContainer = $("<div>").append(
		$("<table>").append(
			$("<tbody>").append(
				$("<tr>").append(
					$("<th>").append("Market Value")
				).append(
					$("<td>").append(Highcharts.numberFormat(oPlot.y)).addClass("text-pos text-right")
				)
			).append(
				$("<tr>").append(
					$("<th>").append("Change in Value")
				).append(
					$("<td>").append(".04").addClass("text-pos text-right")
				)
			)
		)
	);

	return jContainer.append(
		$("<span>").addClass("tooltip-point")
	).html();
};
AccountsBarChart.prototype._renderDataLabel = function (oPlot, oChart) {
	var label = "";
	if (oChart.series.name == "primary") {
		label = '<span class="data-label deposits">' + oChart.point.deposits + '</span><span class="data-label withdrawls">' + oChart.point.wd + '</span>';
	}
	return label;
};
//Internal
AccountsBarChart.prototype._render = function () {
	this._container.highcharts(this._getChartParams());
};
AccountsBarChart.prototype._getData = function () {
	return [
		{ "y": 750000, deposits: 10, wd:5 },
		{ "y": 600000, deposits: 5, wd: 11 },
		{ "y": 800000, deposits: 12, wd: 5 },
		{ "y": 350000, deposits: 10, wd: 5 },
		{ "y": 325000, deposits: 10, wd: 5 },
		{ "y": 400000, deposits: 8, wd: 5 }
	];
};
AccountsBarChart.prototype._getData2 = function () {
	return [
		{ "y": 2750000, deposits: 10, wd: 5 },
		{ "y": 1600000, deposits: 5, wd: 11 },
		{ "y": 2800000, deposits: 12, wd: 5 },
		{ "y": 2650000, deposits: 10, wd: 5 },
		{ "y": 2825000, deposits: 10, wd: 5 },
		{ "y": 2900000, deposits: 8, wd: 5 }
	];
};
AccountsBarChart.prototype._setTooltipPointerPosition = function (boxWidth, boxHeight, point, oChart) {
	// Set up the variables
	var chart = oChart.chart;
	var plotLeft = chart.plotLeft;
	var plotTop = chart.plotTop;
	var plotWidth = chart.plotWidth;
	var plotHeight = chart.plotHeight;
	var distance = 40;
	var pointX = point.plotX;
	var pointY = point.plotY;
	var x;

	if ((pointX - boxWidth - distance) < plotLeft) {
		x = pointX - (boxWidth / 2) + 80;//yuck, magic #'s
		$("span.tooltip-point", this._container)
			.removeClass("tooltip-point-right")
			.addClass("tooltip-point-left");
	}
	else {
		x = pointX - boxWidth + 25; //yuck, magic #'s
		$("span.tooltip-point", this._container)
			.removeClass("tooltip-point-left")
			.addClass("tooltip-point-right");

	}
	y = Math.min(plotTop + plotHeight - boxHeight, Math.max(plotTop, pointY - boxHeight + plotTop + boxHeight / 2));

	return { x: x, y: y };
};
AccountsBarChart.prototype._getChartParams = function () {
	return {
		chart: {
			type: 'column',
			plotBorderWidth:0
		},
		credits: {
			enabled: false
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			column: {
				stacking: 'normal'
			},
			series: {
				dataLabels: {
					enabled: true,
					//format: '<span class="data-label deposits">{point.deposits}</span><span class="data-label withdrawls">{point.wd}</span>',
					formatter: this._renderDataLabel.HighChartsContext(this),
					useHTML: true,
					verticalAlign: "top",
					y:-32
				}
			}
		},
		series: [
			{
				color: "rgba(150,150,150,0.5)",
				data: this._getData(),
				name: "primary",
				pointStart: Date.UTC(2013, 0, 1),
				pointInterval: 24 * 3600 * 1000 * 30,
				stack: 0
			},
			{
				color: "#0b5d8e",
				name: "secondary",
				data: this._getData2(),
				pointStart: Date.UTC(2013, 0, 1),
				pointInterval: 24 * 3600 * 1000 * 30,
				stack: 0
			}
			
		],
		tooltip: {
			backgroundColor: "transparent",
			borderWidth:0,
			enabled: true,
			formatter: this._renderTooltip.HighChartsContext(this),
			positioner: this._setTooltipPointerPosition.HighChartsContext(this),
			shadow: false,
			useHTML:true
		},
		title: '',
		xAxis: {
			dateTimeLabelFormats: {
				month: '%b'
			},
			labels:{
				style: {
					fontSize: "14px",
					fontWeight: "normal"
				},
				y:18
			},
			tickLength:0,
			type: 'datetime'

		},
		yAxis: {
			opposite: true,
			title: {
				text: ''
			},
			labels: {
				align: "right",
				formatter:function(){
					return this.value/1000000 + "M";
				},
				style:{
					fontSize: "14px",
					fontWeight:"normal"
				},
				x:0,
				y:14
			},
			showFirstLabel:false
		}
	};
};
//Global Instantiation
$(function () {
	AccountsBarChart.Init();
});