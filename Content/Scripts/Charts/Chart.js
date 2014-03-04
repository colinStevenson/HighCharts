var Chart = function () { };

//Event Handlers
Chart.prototype._handleDataRequestError = function () {
	this._container.html("Error");
};
//Helpers
Chart.prototype._fixDate = function (dateIn) {
	var dat = new Date(dateIn);
	return Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate());
};
Chart.prototype._getOHLC = function (oData) {
	var dates = oData.Dates || [];
	var elements = oData.Elements || [];
	var chartSeries = [];

	if (elements[0]) {

		for (var i = 0, datLen = dates.length; i < datLen; i++) {
			var date = this._fixDate(dates[i]);
			var pointData = [
                date,
                //elements[0].DataSeries['open'].values[i],
                //elements[0].DataSeries['high'].values[i],
                //elements[0].DataSeries['low'].values[i],
                elements[0].DataSeries['close'].values[i]
			];
			chartSeries.push(pointData);
		};
	}
	return chartSeries;
};
Chart.prototype._getChartParams = function (oSeriesData) {
	return { //Placeholder
		series: [
			{
				type: 'line',
				name: this._symbol,
				data: oSeriesData
			}
		]
	};
};
//context helper for formatter functions
Function.prototype.HighChartsContext = function (obj) {
	//console.log(obj, this);
	var fnReference = this;
	var fHandler = function () {
		var rArgs = [];
		for (var i = 0; i < arguments.length; i++) {
			rArgs.push(arguments[i]);
		}
		rArgs.push(this);
		return fnReference.apply(obj, rArgs);
	};
	return fHandler;
}