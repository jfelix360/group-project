// stock data retrival function
var getStockData = function (stockName) {
    // First API options
    var options = {
        method: 'GET',
        url: 'https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=' + stockName,
        headers: {
            'x-api-key': 'U5guRICSkz61O4soqPQgh4HCjdIuKx45a0kNH0uU'
        }
    };
    // First API request/response
    axios.request(options).then(function (response) {
        //stock Symbol data
        var stockSymbol = response.data.ResultSet.Result[0].symbol
        // second API options
        var options = {
            method: 'GET',
            url: "https://yfapi.net/v8/finance/chart/" + stockSymbol + "?range=5d&region=US&interval=1d&lang=en&events=div%2Csplit",
            headers: {
                'x-api-key': 'U5guRICSkz61O4soqPQgh4HCjdIuKx45a0kNH0uU'
            }
        };
        // second API request/response
        axios.request(options).then(function (response) {
            // data startpoint 
            var startPoint = response.data.chart.result[0];
            console.log(startPoint);
            //latest stock info
            var latestHigh = startPoint.indicators.quote[0].high[4];
            var latestLow = startPoint.indicators.quote[0].low[4];
            var latestOpen = startPoint.indicators.quote[0].open[4];
            var latestClose = startPoint.indicators.quote[0].close[4];
            var latestHighSlice = latestHigh.toString().slice(0, 6);
            var latestLowSlice = latestLow.toString().slice(0, 6);
            var latestOpenSlice = latestOpen.toString().slice(0, 6);
            var latestCloseSlice = latestClose.toString().slice(0, 6);
            // latest stock date
            var latestDate = new Date(startPoint.timestamp[4] * 1000);
            var latestMonth = latestDate.getMonth() + 1;
            var latestDay = latestDate.getDate();
            var latestYear = latestDate.getFullYear();

            // stock section display
            $('#stockNameDisplay').text(stockName);
            $('#stockSymbol').text(stockSymbol);
            $('#stockDateDisplay').text('(' + latestMonth + '/' + latestDay + '/' + latestYear + ')');
            $('#stockHighDisplay').text('High: $' + latestHighSlice);
            $('#stockLowDisplay').text('Low: $' + latestLowSlice);
            $('#stockOpenDisplay').text('Open: $' + latestOpenSlice);
            $('#stockCloseDisplay').text('Close: $' + latestCloseSlice);
            $('#stockDisplay').addClass('border bg-dark')
        })
    })
}

$("#searchStockBtn").on("click", function () {
    var searchedStock = $("#searchStockInput").val();
    getStockData(searchedStock);
})


    