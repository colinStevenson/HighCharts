var SparkChart = function () { };
SparkChart.prototype = new Chart();

//Static Init
SparkChart.Init = function () {
	$("div.spark-chart").each(
		function () {
			var spark = new SparkChart();
			spark.Init($(this));
		}
	);
}

//Public
SparkChart.prototype.Init = function (jContainer) {
	this._container = jContainer;
	this._symbol = this._container.data("symbol");
	this._requestData();
};
//Constant
SparkChart.prototype.GROUPING_UNITS = [[
        'week',                         // unit name
        [1]                             // allowed multiples
], [
        'month',
        [1, 2, 3, 4, 6]
]];
//Internal
SparkChart.prototype._requestData = function () {
	var params = {
		parameters: JSON.stringify(this._getDataRequestParams())
	}

	//Make JSON request for timeseries data
	$.ajax({
		beforeSend: function () {
			this._container.addClass("loading");
		},
		data: params,
		url: "http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp",
		dataType: "jsonp",
		context: this,
		success: function (oData) {
			//Catch errors
			if (!oData || oData.Message) {
				this._handleDataRequestError();
				return;
			}
			this._render(oData);
		},
		error: this._handleDataRequestError,
		complete: function(){
			this._container.removeClass("loading");
		}
	});
};
SparkChart.prototype._getDataRequestParams = function () {
	return {
		Normalized: false,
		NumberOfDays: 30,
		DataPeriod: "Day",
		//DataInterval: 1,
		Elements: [
            {
            	Symbol: this._symbol,
            	Type: "price",
            	Params: ["c"] //ohlc, c = close only
            }
		]
	}
};
SparkChart.prototype._render = function (oData) {
	var ohlc = this._getOHLC(oData);

	// create the chart
	this._container.highcharts(this._getChartParams(ohlc));
};

SparkChart.prototype._getChartParams = function (oSeriesData) {
	var nOpen = oSeriesData[0][1]; // not actually open value, just for testing
	var nClose = oSeriesData[oSeriesData.length - 1][1];
	var sLineColor = nClose === nOpen ? "black" : nOpen > nClose ? "red" : "green";
	return {
		chart: {
			defaultSeriesType: 'area',
			margin: [0, 0, 0, 0],
		},
		colors:[sLineColor],
		title: {
			text: ''
		},
		credits: {
			enabled: false
		},
		exporting:{
			enabled:false
		},
		xAxis: {
			labels: {
				enabled: false
			}
		},
		yAxis: {
			maxPadding: 0,
			minPadding: 0,
			endOnTick: false,
			gridLineWidth:0,
			labels: {
				enabled: false
			},
			plotLines : [{
				value : nOpen,
				color: '#ccc',
				width:1
			}]
		},
		legend: {
			enabled: false
		},
		tooltip: {
			enabled: false
		},
		plotOptions: {
			series: {
				lineWidth: 1,
				shadow: false,
				states: {
					hover: {
						lineWidth: 1
					}
				},
				marker: {
					//enabled:false,
					radius: 1,
					states: {
						hover: {
							radius: 2
						}
					}
				}
			}
		},
		series: [
			{
				type: 'line',
				name: this._symbol,
				data: oSeriesData,
				dataGrouping: {
					units: this.GROUPING_UNITS
				}
			}
		]
	}
};
//Global Instantiation
$(function () {
	SparkChart.Init();
});