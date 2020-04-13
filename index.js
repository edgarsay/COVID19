//$.getJSON(url, callback_function)
//making a HTTP request (GET) to brasil.io API 'url'
//when we get the response, a JSON file, it'll be passed as a parameter to the 'callback_function'
$.getJSON('https://brasil.io/api/dataset/covid19/caso/data?is_last=True&place_type=state', ({
    results
}) => {
    results.forEach(e => {
        e['value'] = e.confirmed
        e.death_rate = (e.death_rate * 100).toFixed(0)
    });

    let map = Highcharts.maps['countries/br/br-all']

    Highcharts.mapChart('container', {
        chart: {
            map: map
        },

        title: {
            text: "COVID-19 (Confirmed Cases in <strong>Brazil</strong>)"
        },

        mapNavigation: {
            enabled: true,
        },

        colorAxis: {
            stops: [
                [0, Highcharts.getOptions().colors[0]],
                [2 / 4, Highcharts.color(Highcharts.getOptions().colors[0]).brighten(-0.75).get()],
                [1, Highcharts.color(Highcharts.getOptions().colors[0]).brighten(-0.8).get()]
            ]
        },

        series: [{
                name: "full data",
                data: results,
                joinBy: ['hc-a2', 'state'],
                states: {
                    hover: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    format: '{point.properties.hc-a2}'
                },
                tooltip: {
                    headerFormat:null,
                    pointFormat:`
                    <span style="color:{point.color}">\u25CF</span><strong> {point.name}</strong>
                    <br>
                    <span>Date: {point.date}</span>
                    <br>
                    <span style="color:red">Confirmed cases: {point.confirmed}</span>
                    <br>
                    <span>Deaths: {point.deaths}</span>
                    <br>
                    <span>Death rate: {point.death_rate}%</span>
                    <br>
                    `,
                },
            },
        ]
    });
})