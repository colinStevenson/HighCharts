var BasicPriceChart = function () { };
BasicPriceChart.prototype = new Chart();

//Public Static
BasicPriceChart.Init = function () {
	$("div.basic-price-chart").each(function () {
		var chart = new BasicPriceChart();
		chart.Init($(this));
	});
};
//Public
BasicPriceChart.prototype.Init = function (jContainer) {
	this._container = jContainer;
	this._symbol = this._container.data("symbol");
	this._requestData();
};
//Internal
BasicPriceChart.prototype._requestData = function () {
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
		complete: function () {
			this._container.removeClass("loading");
		}
	});
};
BasicPriceChart.prototype._getDataRequestParams = function () {
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
BasicPriceChart.prototype._render = function (oData) {
	var ohlc = this._getOHLC(oData);
	this._container.highcharts(this._getChartParams(ohlc));
};
BasicPriceChart.prototype._getChartParams = function (rSeriesData) {
	return {
		chart: {
			plotBorderWidth: 0,
			spacingLeft: 0,
			spacingRight: 0,
			type: "area"
		},
		title: {
			text: ''
		},
		credits: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		xAxis: {
			dateTimeLabelFormats:{
				millisecond: '%H:%M:%S.%L',
				second: '%H:%M:%S',
				minute: '%H:%M',
				hour: '%H:%M',
				day: '%b %e',
				week: '%b %e',
				month: '%b \'%y',
				year: '%Y'
			},
			labels: {
				style: {
					textTransform: "uppercase"
				},
				y: 22
			},
			lineColor:"#e6e5e4",
			lineWidth:2,
			offset: 10,
			tickLength:0,
			type: "datetime"
		},
		yAxis: {
			labels:{
				format: "${value:,.0f}",
				x:-10,
				y: 14
			},
			gridLineColor: "#e1e5e6",
			gridLineDashStyle: 'shortdash',
			min: this._getMinYValueFromSeriesData(rSeriesData),
			opposite: true,
			showFirstLabel: false,
			title: ""
		},
		legend: {
			enabled: false
		},
		tooltip: {
			enabled: false
		},
		plotOptions: {
			area:{
				lineColor: "#2f98a1",
				fillColor: {
					linearGradient: [0, 0, 0, 300],
					stops: [
					  [0, "rgba(47,152,161,0.5)"],
					  [1, "rgba(255,255,255,0.5)"]
					]
				}
			},
			series: {
				states: {
					hover: {
						enabled: false
					}
				},
				marker: {
					enabled:false
				}
			}
		},
		series: [
			{
				name: this._symbol,
				data: rSeriesData
				
			}
		]
	}
};
BasicPriceChart.prototype._getMinYValueFromSeriesData = function (rSeriesData) {
	var nMin = Infinity;
	for (var i = 0; i < rSeriesData.length; i++) {
		nMin = Math.min(nMin, rSeriesData[i][1]);
	}
	return Math.floor(nMin);
};
//Global Instantiation
$(function () {
	BasicPriceChart.Init();
});