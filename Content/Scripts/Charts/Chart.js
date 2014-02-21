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