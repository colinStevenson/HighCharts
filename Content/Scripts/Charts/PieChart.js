var PieChart = function () { };
PieChart.prototype = new Chart();
//Static Init
PieChart.Init = function () {
	$("div.pie-chart").each(
		function () {
			var chart = new PieChart();
			chart.Init($(this));
		}
	);
}
//Public 
PieChart.prototype.Init = function (jContainer) {
	this._container = jContainer;
	this._render();
};
//Internal
PieChart.prototype._render = function () {
	this._container.highcharts(this._getChartParams());
};
PieChart.prototype._getChartParams = function () {
	return {
		chart: {
			plotBorderWidth:0
		},
		credits: {
			enabled: false
		},
		legend:{
			align: "right",
			borderWidth: 0,
			itemStyle:{
				fontSize:"14px"
			},
			itemMarginBottom: 8,
			labelFormat: "{name} ({y:.2f}%)",
			layout: "vertical",
			symbolRadius:0,
			symbolWidth: 24,
			verticalAlign:"middle"
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [
			{
				type: 'pie',
				name: "Asset Class Distribution",
				data: [
					{
						name:"Equities", 
						y: 45.9,
						color: "#f9a11b",
						dataLabels: {
							enabled:false
						}
					},
					{
						color:"#76bb43",
						name:"Fixed Income",
						y: 5.11,
						dataLabels: {
							enabled: false
						}
					},
					{
						color:"#1990cd",
						name:"Cash & Equivalents",
						y: 39.63,
						dataLabels: {
							enabled: false
						}
					},
					{
						color: "#8881bd",
						name:"Alternatives",
						y: 9.36,
						dataLabels: {
							enabled: false
						}
					}
				]
			}
		],
		title: "",
		tooltip: {
			enabled:false
		}
	};
};
//Global Instantiation
$(function () {
	PieChart.Init();
});