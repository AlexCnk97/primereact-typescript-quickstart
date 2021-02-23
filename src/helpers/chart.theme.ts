export const getLightTheme = (caso:number = 0) => {
    let basicOptions  = {
        legend: {
            labels: {
                fontColor: '#495057'
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    callback: function(value:any) {
                        if(value){
                            return caso == 0 ? value.substr(0, 15) + '...' : value;//truncate
                        }
                    },
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: '#495057',
                    callback: function(value:any) {
                        if(value){
                            return (value / 1000) + ' k';//truncate
                        }
                    },
                }
            }]
        }
    };

    let multiAxisOptions = {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: '#495057'
                },
                gridLines: {
                    color: '#ebedef'
                }
            }],
            yAxes: [{
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
                ticks: {
                    fontColor: '#495057'
                },
                gridLines: {
                    color: '#ebedef'
                }
            }, {
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-2',
                ticks: {
                    fontColor: '#495057'
                },
                gridLines: {
                    drawOnChartArea: false,
                    color: '#ebedef'
                }
            }]
        },
        legend: {
            labels: {
                fontColor: '#495057'
            }
        }
    };

    return {
        basicOptions,
        multiAxisOptions
    }
}
