import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import * as moment from 'moment';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'my-dream-app';
    currentType: string = 'line';
    types: Array<string> = ['line', 'bar', 'pie', 'radar', 'surface', 'gauge'];
    datas: Array<string> = ['data1', 'data3', 'data4', 'data5', 'data6', 'data7', 'data8'];
    currentData = 'data1';
    myChart: any;
    myChart2: any;
    isLine: any = true;
    lineType: string = 'aucun';
    isCourbe: boolean = false;
    isStep: boolean = false;
    isSurface: boolean = false;
    isDataSet: boolean = false;
    selectedSeriesIndex = undefined;

    ngOnInit() {
        let htmlNode = document.getElementById('main') as HTMLElement;


        this.myChart = echarts.init(htmlNode, undefined, { renderer: 'svg', height: 600 });
        
        this.myChart2 = echarts.init(document.getElementById('main2') as HTMLElement, undefined,{renderer: 'svg'});
        //console.log()

        window.onresize = () => {
            this.myChart.resize();
            console.log("resized");
        }

        moment.locale('fr');
        this.render();
    }

    render() {
        this.myChart.dispose();

        this.myChart = echarts.init(document.getElementById('main') as HTMLElement, undefined, { renderer: 'svg', locale : "FR"});
        this.myChart.showLoading();
        var data: any;

        if (this.lineType === 'courbe') {
            this.isSurface = this.isStep = false;
            this.isCourbe = true;
        }
        if (this.lineType === 'surface') {
            this.isCourbe = this.isStep = false;
            this.isSurface = true;
        }
        if (this.lineType === 'step') {
            this.isCourbe = this.isSurface = false;
            this.isStep = true;
        }
        if (this.lineType === 'aucun') {
            this.isCourbe = this.isSurface = this.isStep = false;
        }

        if (this.currentData === 'data1') {
            data = this.data1;
        }
        if (this.currentData === 'data3') {
            data = this.data3
        }
        if (this.currentData === 'data4') {
            data = this.data4
        }
        if (this.currentData === 'data5') {
            data = this.data5
        }
        if (this.currentData === 'data6') {
            data = this.data6
        }
        if (this.currentData === 'data7') {
            data = this.data7
        }
        if (this.currentData === 'data8') {
            data = this.data8
        }

        console.log(echarts.time.format('2021-05-01T03:00:00+02:00', '{dd} {MMMM} {yyyy} {HH}:{mm}', false));
        var surface = (this.isSurface == true) ? { origin: '600000' } : undefined;

        // specify chart configuration item and data
        var optionTest = {
            legend: {
                type: "scroll",
            },
            tooltip: {
                alwaysShowContent: true,
            },
            
            //dimensions : 
            dataset: {
                // Provide data.
                source: [["Date"].concat(data.datas.map((el: any) => el['??DATE??'].substring(0, 4) + "-" + el['??DATE??'].substring(4, 6) + "-" + el['??DATE??'].substring(6)))].concat(
                    data.graphs.map((element: any, index: any) => { var temp = element.valueField; return [element.title].concat(data.datas.map((el: any) => { return Number(el[temp]) })) }))      //.indicator.lines.map((element, index) => { return [element.startDate.substring(0,4)+"-"+element.startDate.substring(4,6)+"-"+element.startDate.substring(6),Number(element.Total)] })
            },
            // Declare X axis, which is a category axis, mapping
            // to the first column by default.
            xAxis: {
                type: 'category',
                axisLabel: {
                    //show  :false,
                    formatter: {
                        // Display year and month information on the first data of a year
                        year: '{yearStyle|{yyyy}}\n{monthStyle|{MMMM}}',
                        month: '{monthStyle|{MMMM}}'
                    },
                    rich: {
                        yearStyle: {
                            // Make yearly text more standing out
                            color: '#000',
                            fontWeight: 'bold'
                        },
                        monthStyle: {
                            color: '#999'
                        }
                    }
                },
                //data : data.datas.map((el:any) => el['??DATE??'].substring(0,4) + "-"+ el['??DATE??'].substring(4,6)+"-" + el['??DATE??'].substring(6)),
            },
            // Declare Y axis, which is a value axis.
            yAxis: {
                /*axisLine : {
                    show : true,
                },
                axisTick : {
                    show : true,
                },*/
                axisLabel: {
                    offset: 10
                }
            },
            // Declare several series, each of them mapped to a
            // column of the dataset by default.
            series: data.graphs.map((element: any, index: number) => {
                return {
                    type: this.currentType,
                    seriesLayoutBy: 'row',
                    areaStyle: surface,
                    step: this.isStep,
                    smooth: this.isCourbe,
                    color: data.colors[index],
                };
            })
        };

        let option: any = {
            /* title: {
                text: data.label
            }, */
            /* grid : {
                show : true,
            }, */
            timeline : {
                show : false,
                data : ['2021-01-01', '2021-02-01'],
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params: any, ticket: any, callback: any) {
                    //console.log(params);
                    //console.log(params[0].seletedSeriesIndex);
                    var tooltip = "<div>";
                    tooltip += "<div>" + params[0].axisValueLabel + "</div>";
                    for (var param of params){
                        tooltip +=  "<div> <span style='display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:" +
                        param.color + ";'></span style='margin-left :10px;'><span>"+ param.seriesName +"</span><span style='float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900'>" +
                        parseInt(param.value[1]).toLocaleString() + " " + data.graphs[0].indicator.libuni +
                        "</span></div>"
                    }
                    tooltip += "</div>"
                    return tooltip;
                },
                //className : "tooltip",
                axisPointer : { 
                    type : "shadow"
                },
                confine : true,
                //alwaysShowContent : true,
            },
            toolbox: {
                show: true,
                left: 'center',
                top : 'bottom',
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore: {show: true},
                    saveAsImage: {show: true},
                    dataZoom : {},
                    myTool2: {
                        show: true,
                        title: 'custom extension method',
                        icon: 'image://http://echarts.baidu.com/images/favicon.png',
                        onclick: function (){
                            alert('myToolHandler2');
                        }
                    }
                },
                tooltip: { // same as option.tooltip
                    show: true,
                }
            },
            legend: {
                type: "scroll",
                data: data.graphs.map((element: any) => element.title.toString()),
                top : '1%',
                //height: 50,
            },
            xAxis: {
                splitLine: {
                    show: true,
                },
                //boundaryGap: ['5%', '5%'],
                axisTick: {
                    //alignWithLabel: true
                },
                /* max : function(value:any){
                    console.log(value);
                    return value.max;
                }, */
                /* axisPointer: {
                    //show: true,
                    //type: 'line',
                    triggerTooltip: false,
                    label: {
                        formatter: (function (object: any) {
                            return capitalizeFirstLetter(moment(object.value).format('MMMM YYYY'));
                        }),
                    },

                }, */
                type: "category",
                //min : data.datas[0]['??DATE??'].substring(0, 4) + "-" + data.datas[0]['??DATE??'].substring(4, 6) + "-" + data.datas[0]['??DATE??'].substring(6),
                //max :data.datas[0]['??DATE??'].substring(0, 4) + "-" + data.datas[0]['??DATE??'].substring(4, 6) + "-" + data.datas[0]['??DATE??'].substring(6),
                //data: data.datas.map((el: any) => el['??DATE??'].substring(0, 4) + "-" + el['??DATE??'].substring(4, 6) + "-" + el['??DATE??'].substring(6)),
                splitNumber : 5,
                axisLabel: {
                    //show  :false,
                    formatter: (function (value: string) {
                        if (value.substring(5, 7) == '01')
                            return capitalizeFirstLetter(moment(value).format('MMMM YYYY'));
                        return capitalizeFirstLetter(moment(value).format('MMMM'));
                    }),


                    /*{
                        // Display year and month information on the first data of a year
                        year: '{yearStyle|{yyyy}}\n{monthStyle|{MMMM}}',
                        month: '{monthStyle|{MMMM}}'
                    },*/
                    rich: {
                        yearStyle: {
                            // Make yearly text more standing out
                            color: '#000',
                            fontWeight: 'bold'
                        },
                        monthStyle: {
                            color: '#999'
                        }
                    }
                },
                triggerEvent: true,

            },
            yAxis: {
                name: 'en ' + data.graphs[0].indicator.libuni,
                axisLabel: {
                    formatter: (function (value: any) {
                        return parseInt(value).toLocaleString();
                    }),
                },
                boundaryGap : ["0%","50%"]
                //offset : -10,
            },
            series: (data.graphs.map((element: any, index: number) => {
                var temp = element.valueField;
                return {
                    name: element.title,
                    type: this.currentType,
                    data: data.datas.map((element: any) => {
                        return {
                            seletedSeriesIndex : this.selectedSeriesIndex,
                            valueField: temp,
                            value: [
                                element['??DATE??'].substring(0, 4) + "-" + element['??DATE??'].substring(4, 6) + "-" + element['??DATE??'].substring(6),
                                element[temp]
                            ],
                            qStartDate: element.qStartDate,
                            qEndDate: element.qEndDate,
                            name: element['??DATE??'].substring(0, 4) + "-" + element['??DATE??'].substring(4, 6) + "-" + element['??DATE??'].substring(6),
                            evolution: 'evolution', //TODO with config Object
                        }
                    }),
                    itemStyle: {
                        color: data.colors[index]
                    },
                    areaStyle: surface,
                    smooth: this.isCourbe,
                    step: this.isStep && "middle",
                    emphasis: {
                        focus: 'series',
                        //blurScope: 'series'
                    },
                    connectNulls: true,
                    //seriesLayoutBy : 'row',
                    labelLine: {
                        show: true,
                        smooth: true,
                    },
                    smoothMonotone: 'x',
                    selected : true
                };
            })),
            dataZoom: [
                {
                    id: 'dataZoomY',
                    type: 'inside',
                    yAxisIndex: [0],
                    filterMode: "none",
                },
                {
                    type: 'inside',
                    xAxisIndex: [0],
                },
            ],
        };

        var isTime = true;
        for (var s = 0; s < option.series.length; ++s) {
            //console.log(option.series[s].data.length );
            if (option.series[s].data.length <= 1) {
                isTime = false;
                break;
            }
        }

        if (!isTime) {
            option.xAxis.type = 'category';
        }

        var optionSurface = {
            title: {
                text: data.label
            },

            tooltip: {
                trigger: 'item',
                //formatter : "<div style='margin: 0px 0 0;line-height:1;'><div style='font-size:14px;color:#666;font-weight:400;line-height:1;'>{b}</div><div style='margin: 10px 0 0;line-height:1;'><div style='margin: 0px 0 0;line-height:1;'><span style='display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#5470c6;'></span><span style='font-size:14px;color:#666;font-weight:400;margin-left:2px'>2013-06-01</span><span style='float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900'>{c} ???</span><div style='clear:both'></div></div><div style='clear:both'></div></div><div style='clear:both'></div></div>",
                //alwaysShowContent : true,
                appendToBody: true,
                axisPointer: { type: 'line' },
            },

            legend: {
                type: 'scroll',
                top: "bottom",
                height: 100,
                //data: data.graphs.map((element : any) => element.title.toString())
            },

            xAxis: {
                type: 'category',
                data: data.datas.map((el: any) => { return el['??DATE??'].substring(0, 4) + "-" + el['??DATE??'].substring(4, 6) + "-" + el['??DATE??'].substring(6) }),
                boundaryGap: false,
                axisLabel: {
                    formatter: (function (value: any) {
                        moment.locale('fr');
                        return moment(value).format('MMMM-YY');
                    })
                },
            },

            yAxis: {
                type: 'value'
            },

            series: data.graphs.map((element: any, index: any) => {
                var temp = element.valueField; return {
                    name: element.title,
                    data: Object.values(data.datas.map((el: any) => { return Number(el[temp]) })),
                    type: 'line',
                    //areaStyle: {},
                    color: data.colors[index],
                    stack: 'test'
                };
            }),
        }

        option.series[0].markArea = {
            data: [
                [
                    {
                        x: '10%',
                        yAxis: 0,
                    },
                    {
                        x: "90%",
                        yAxis: 'average',
                    }
                ]
            ]
        };

        var position: Array<number> = [];

        var n = 0;
        for (let i = 0; i < data.graphs.length; ++i) {
            if (data.graphs[i].indicator.lines.length != 0)
                n++;
        }
        //console.log(n);

        for (let i = 0; i < n; ++i) {
            position.push(i / n * 100);
        }

        var missedNodes = 0;

        //console.log(position);

        var optionPie = {
            tooltip: {
                trigger: 'item',
            },
            legend: {
                type: 'scroll',
                //data: data.graphs.map((element : any) => element.title.toString()),
            },

            series: data.graphs.map((element: any, index: any) => {
                var temp = element.valueField; if (element.indicator.lines.length != 0) {
                    return {
                        type: "pie",
                        name: element.title,
                        radius: '75%',
                        center: ['50%', '50%'],
                        //roseType : 'radius',
                        left: position[index - missedNodes] + '%',
                        right: position[position.length - 1 - index - missedNodes] + '%',
                        data: data.datas.map((el: any) => { return { value: Number(el[temp]), name: el['??DATE??'].substring(0, 4) + "-" + el['??DATE??'].substring(4, 6) + "-" + el['??DATE??'].substring(6) } }), //{ value : Object.values(element.indicator.lines[0])[index+2], name :element.title}}),
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx: any) {
                            return Math.random() * 200;
                        }
                    }
                } else { missedNodes++; return }
            }),
        };

        var optionPie2 = {
            tooltip: {
                trigger: 'item',
            },
            legend: {
                type: 'scroll',
                data: data.graphs.map((element: any) => element.title.toString()),
            },

            series: [{
                type: "pie",
                name: data.label,
                radius: '75%',
                center: ['50%', '50%'],
                //roseType : 'radius',
                //left: position[index-missedNodes]+'%',
                //right: position[position.length -1 -index -missedNodes]+'%',
                data: data.graphs.map((el: any, index: any) => { var temp = el.valueField; return { value: Number(data.datas[0][el.valueField]), name: el.title } }), //{ value : Object.values(element.indicator.lines[0])[index+2], name :element.title}}),
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx: any) {
                    return Math.random() * 200;
                }
            }],
        };

        var optionRadar = {
            tooltip: {
                trigger: 'item',
            },
            legend: {
                type: 'scroll',
            },
            radar: {
                indicator: this.dataRadar.dataProvider.map((element, index) => { return {
                        name: element['??HEADER??'],
                        max: 6,
                        overflow : 'truncate',
                        itemStyle : {
                            width : 50,
                        },
                    } 
                }),
            },
            series: [{
                //name: '',
                type: 'radar',
                // areaStyle: {normal: {}},
                areaStyle: {},
                data: this.dataRadar.graphs.map((element: any) => {
                    return {
                        name: element.title,
                        label: {
                            show: true,
                            formatter: function (params: any) {
                                console.log(params);
                                return params.value;
                            }
                        },
                        value: this.dataRadar.dataProvider.map((element) => Number(element['0'])),
                    }
                }),
            }]
        }

        var optionGauge;
        if (this.currentType === 'gauge') {
            data = this.dataGauge;
            this.dataGauge.thresholds.sort(function (element1: any, element2: any) {
                return element1.max - element2.max;
            });
            optionGauge = {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                },
                series: [{
                    name: 'Pressure',
                    type: 'gauge',
                    detail: {
                        formatter: '{value}'
                    },
                    axisLine: {
                        lineStyle: {
                            color: data.thresholds.map((element: any) => {
                                return [element.max / 100, element.color];
                            })
                        }
                    },
                    data: [{
                        value: data.value,
                        name: 'SCORE'
                    }]
                }],
                min: data.minValue,
                max: data.maxValue,
            }
        }

        // use configuration item and data specified to show chart
        if (this.isDataSet == true) {
            option = optionTest;
        }
        else {
            if (this.currentType === "pie") {
                if (data.datas.length == 1)
                    option = optionPie2;
                else
                    option = optionPie;
            }
            if (this.currentType === "radar")
                option = optionRadar;
            if (this.currentType === "surface")
                option = optionSurface;
            if (this.currentType === 'gauge') {
                option = optionGauge;
            }
        }

        console.log(option);
        //this.myChart.clear();//this.myChart2.clear();

        this.myChart.setOption(option);
        this.myChart.on(
            'mouseover',
            'series',
            (paramss: any) => {
                this.selectedSeriesIndex = paramss.seriesIndex;
                //console.log(this.selectedSeriesIndex);
                option.tooltip.formatter = function (params: any, ticket: any, callback: any) {
                    console.log(params);
                    //console.log(paramss.seriesIndex);
                    var tooltip = "<div>";
                    tooltip += "<div>" + params[0].axisValueLabel + "</div>";
                    for (var param of params){
                        var style = ""
                        if (param.seriesIndex === paramss.seriesIndex){
                            style = "font-size:14px;color:#666;font-weight:900";
                        }
                        tooltip +=  "<div> <span style='display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:" +
                        param.color + ";'></span><span style='margin-left :10px;"+ style + "'>"+ param.seriesName +"</span><span style='float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900'>" +
                        parseInt(param.value[1]).toLocaleString() + " " + data.graphs[0].indicator.libuni +
                        "</span></div>"
                    }
                    tooltip += "</div>"
                    //console.log(tooltip);
                    return tooltip;
                },
                //option = this.triggerTooltip(option);
                this.myChart.setOption(option);
            }
        );

        
        /* this.myChart.on(
            'mouseout',
            'series',
            (params: any) => {
                this.selectedSeriesIndex = undefined;
            }
        ); */

        /*this.myChart.getZr().on('click',
            function (params: any) {
                console.log(params);
            }
        );*/
        var optionMain2 = {
            title: {
                text: 'ECharts entry example'
            },
            tooltip: {},
            legend: {
                data:['Sales']
            },
            xAxis: {
                data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
            },
            yAxis: {},
            series: [{
                name: 'Sales',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        var optionMain3 = {
            "tooltip": {
                "formatter": "{a} <br/>{b} : {c}%"
            },
            "series": [
                {
                    "name": "BROUSSE Anthony",
                    "type": "gauge",
                    "detail": {
                        show : true,
                        "formatter": "{value}",
                        fontSize : 20
                    },
                    "pointer": {
                        "itemStyle": {
                            "color": "auto"
                        },
                        length : "80%"
                    },
                    splitNumber : 6,
                    data: [{
                            value: 96,
                        }
                    ],
                    splitLine :  {
                        show : true,
                        distance : -5,
                        length : 5,
                        lineStyle: {
                            color: '#fff',
                            width: 4
                        }
                    },
                    axisLabel : {
                        distance : -20,
                        fontSize : 9,
                        formatter: function (value : any) {
                            return value.toFixed(0);
                        }
                    },
                    axisTick : {
                        distance: -5,
                        show : true,
                        lineStyle: {
                            color: '#fff',
                            width: 2
                        }
                    },
                    "min": "0",
                    "max": "1150",
                    "axisLine": {
                        
                        "lineStyle": {
                            width : 6,
                            "color": [
                                [
                                    0.34782608695652173,
                                    "#00FF00"
                                ],
                                [
                                    0.6521739130434783,
                                    "#FFAA00"
                                ],
                                [
                                    1,
                                    "#FF0000"
                                ]
                            ]
                        },
                    }
                }
            ]
        };
        this.myChart.hideLoading();
        this.myChart2.setOption(optionMain3);
        //console.log(getKeyValue("name")(test));
        //console.log(Object.values(this.data.graphs[0].indicator.lines[0])[2]);
    }
    triggerTooltip(option : any) {
        for (var i=0; i<option.series.length; ++i){
            for (var j=0; j<option.series[i].data.length; ++j){
                option.series[i].data[j].seletedSeriesIndex = this.selectedSeriesIndex;
            }
        }
        //console.log(this.selectedSeriesIndex);    
        return option;
    }

    changeType(): void {
        if (this.currentType === "line")
            this.isLine = true;
        else
            this.isLine = false;

        console.log(this.isCourbe);
        this.render();
    }

    changeData(): void {
        this.render();
    }

    data1 = {
        "root": {},
        "data": {},
        "meta": {},
        "metaGlobal": {},
        "label": "Lignes par table",
        "periodes": [
            {
                "id": "D",
                "label": "Jour"
            },
            {
                "id": "W",
                "label": "Semaine"
            },
            {
                "id": "M",
                "label": "Mois"
            },
            {
                "id": "Q",
                "label": "Trimestre"
            },
            {
                "id": "S",
                "label": "Semestre"
            },
            {
                "id": "Y",
                "label": "Ann??e"
            },
            {
                "id": "A",
                "label": "Aucune"
            },
            {
                "id": "N",
                "label": "Niveau"
            }
        ],
        "times": [],
        "unusedLevels": [],
        "indicators": [
            {
                "numind": "QINFERENCESRVDEVDVT202",
                "docind": "indgti_qi202.html",
                "appind": "GTI",
                "graph": "column",
                "libind": "Lignes par table",
                "libuni": "",
                "psv": "O",
                "extmin": "0",
                "prmsync": "",
                "lines": [
                    {
                        "startDate": "20210407",
                        "endDate": "20210407",
                        "gtmed": "5016484",
                        "gatpr": "2129619",
                        "gttde": "7179a98",
                        "sgruc": "700305",
                        "qlech": "629934",
                        "garef": "554191",
                        "gaflc": "542793",
                        "gtdft": "525610",
                        "gtctr": "511644",
                        "gapfl": "480080",
                        "gafld": "464790",
                        "oecad": "463357",
                        "gtlil": "452102",
                        "oehec": "451588",
                        "sacaf": "433470",
                        "svcvt": "418634",
                        "ocmvc": "397692",
                        "gtprc": "393252",
                        "sklms": "367728",
                        "svcvf": "361127"
                    }
                ],
                "colors": []
            }
        ],
        "usedAttributes": [
            {
                "id": "gtmed",
                "label": "GTMED-D??tails d'une mise en forme"
            },
            {
                "id": "gatpr",
                "label": "GATPR-Trace des personnalisations ouvertes"
            },
            {
                "id": "gttde",
                "label": "GTTDE-Ev??nements enregistr??s"
            },
            {
                "id": "sgruc",
                "label": "SGRUC-Rubriques de commandes"
            },
            {
                "id": "qlech",
                "label": "QLECH-Ech??ance"
            },
            {
                "id": "garef",
                "label": "GAREF-R??f??rencements des requ??tes et libell??s d'une transaction"
            },
            {
                "id": "gaflc",
                "label": "GAFLC-Caract??ristiques personnalisables des champs"
            },
            {
                "id": "gtdft",
                "label": "GTDFT-Valeurs par d??faut"
            },
            {
                "id": "gtctr",
                "label": "GTCTR-Crit??res de soumission des traitements"
            },
            {
                "id": "gapfl",
                "label": "GAPFL-Champs d'une page"
            },
            {
                "id": "gafld",
                "label": "GAFLD-Champs"
            },
            {
                "id": "oecad",
                "label": "OECAD-D??tails du calendrier"
            },
            {
                "id": "gtlil",
                "label": "GTLIL-Liens des libell??s"
            },
            {
                "id": "oehec",
                "label": "OEHEC-Historique des ??tapes par classe"
            },
            {
                "id": "sacaf",
                "label": "SACAF-Conditions de facturation des commandes d'achats"
            },
            {
                "id": "svcvt",
                "label": "SVCVT-Textes des commandes de ventes"
            },
            {
                "id": "ocmvc",
                "label": "OCMVC-Mouvements comptables"
            },
            {
                "id": "gtprc",
                "label": "GTPRC-Dictionnaire des proc??dures Qualiac"
            },
            {
                "id": "sklms",
                "label": "SKLMS-Lignes de mouvements de stocks"
            },
            {
                "id": "svcvf",
                "label": "SVCVF-Conditions de facturation des commandes de ventes"
            }
        ],
        "datas": [
            {
                "qStartDate": "20210407",
                "qEndDate": "20210407",
                "??DATE??": "20210407",
                "gtmed_0": "5016484",
                "gatpr_0": "2129619",
                "gttde_0": "717998",
                "sgruc_0": "700305",
                "qlech_0": "629934",
                "garef_0": "554191",
                "gaflc_0": "542793",
                "gtdft_0": "525610",
                "gtctr_0": "511644",
                "gapfl_0": "480080",
                "gafld_0": "464790",
                "oecad_0": "463357",
                "gtlil_0": "452102",
                "oehec_0": "451588",
                "sacaf_0": "433470",
                "svcvt_0": "418634",
                "ocmvc_0": "397692",
                "gtprc_0": "393252",
                "sklms_0": "367728",
                "svcvf_0": "361127"
            }
        ],
        "graphs": [
            {
                "valueField": "gtmed_0",
                "title": "GTMED-D??tails d'une mise en forme",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "gatpr_0",
                "title": "GATPR-Trace des personnalisations ouvertes",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "gttde_0",
                "title": "GTTDE-Ev??nements enregistr??s",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "sgruc_0",
                "title": "SGRUC-Rubriques de commandes",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "qlech_0",
                "title": "QLECH-Ech??ance",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "garef_0",
                "title": "GAREF-R??f??rencements des requ??tes et libell??s d'une transaction",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "gaflc_0",
                "title": "GAFLC-Caract??ristiques personnalisables des champs",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "gtdft_0",
                "title": "GTDFT-Valeurs par d??faut",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "gtctr_0",
                "title": "GTCTR-Crit??res de soumission des traitements",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "gapfl_0",
                "title": "GAPFL-Champs d'une page",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "gafld_0",
                "title": "GAFLD-Champs",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "oecad_0",
                "title": "OECAD-D??tails du calendrier",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "gtlil_0",
                "title": "GTLIL-Liens des libell??s",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "oehec_0",
                "title": "OEHEC-Historique des ??tapes par classe",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "sacaf_0",
                "title": "SACAF-Conditions de facturation des commandes d'achats",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "svcvt_0",
                "title": "SVCVT-Textes des commandes de ventes",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "ocmvc_0",
                "title": "OCMVC-Mouvements comptables",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "gtprc_0",
                "title": "GTPRC-Dictionnaire des proc??dures Qualiac",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "sklms_0",
                "title": "SKLMS-Lignes de mouvements de stocks",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "svcvf_0",
                "title": "SVCVF-Conditions de facturation des commandes de ventes",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT202",
                    "docind": "indgti_qi202.html",
                    "appind": "GTI",
                    "graph": "column",
                    "libind": "Lignes par table",
                    "libuni": "",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20210407",
                            "endDate": "20210407",
                            "gtmed": "5016484",
                            "gatpr": "2129619",
                            "gttde": "717998",
                            "sgruc": "700305",
                            "qlech": "629934",
                            "garef": "554191",
                            "gaflc": "542793",
                            "gtdft": "525610",
                            "gtctr": "511644",
                            "gapfl": "480080",
                            "gafld": "464790",
                            "oecad": "463357",
                            "gtlil": "452102",
                            "oehec": "451588",
                            "sacaf": "433470",
                            "svcvt": "418634",
                            "ocmvc": "397692",
                            "gtprc": "393252",
                            "sklms": "367728",
                            "svcvf": "361127"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            }
        ],
        "defaultYAxis": "G",
        "colors": [
            "#F44336",
            "#E91E63",
            "#9C27B0",
            "#673AB7",
            "#3f51B5",
            "#2196F3",
            "#03A9F4",
            "#00BCD4",
            "#009688",
            "#4CAF50",
            "#8BC34A",
            "#CDDC39",
            "#FFEB3B",
            "#FFC107",
            "#FF9800",
            "#FF5722",
            "#795548",
            "#9E9E9E",
            "#607D8B"
        ]
    }

    data2 = {
        "root": {},
        "data": {},
        "meta": {},
        "metaGlobal": {},
        "label": "Test : Activit??s mensuelles 2011 - 2012 - 2013",
        "periodes": [
            {
                "id": "M",
                "label": "Mois"
            },
            {
                "id": "Q",
                "label": "Trimestre"
            },
            {
                "id": "S",
                "label": "Semestre"
            },
            {
                "id": "Y",
                "label": "Ann??e"
            },
            {
                "id": "A",
                "label": "Aucune"
            },
            {
                "id": "N",
                "label": "Niveau"
            }
        ],
        "times": [],
        "unusedLevels": [
            {
                "id": 1,
                "label": "Nature"
            },
            {
                "id": 2,
                "label": "Client"
            },
            {
                "id": 3,
                "label": "Activit??"
            },
            {
                "id": 4,
                "label": "Qui"
            },
            {
                "id": 5,
                "label": "Test OM"
            }
        ],
        "indicators": [
            {
                "numind": "QINFERENCESRVDEVDVT14",
                "docind": "indoct_qi14.html",
                "appind": "OCT",
                "graph": "column",
                "libind": "Test Activit??s mensuelles 2011",
                "libuni": "k???",
                "psv": "O",
                "seuil": {},
                "extmin": "0",
                "prmsync": "NUMSVCLI=c02gtinv",
                "lines": [
                    {
                        "startDate": "20110101",
                        "endDate": "20110331",
                        "Total": "3117.865"
                    },
                    {
                        "startDate": "20110401",
                        "endDate": "20110630",
                        "Total": "3500.8350499999997"
                    },
                    {
                        "startDate": "20110701",
                        "endDate": "20110930",
                        "Total": "3813.8062099999997"
                    },
                    {
                        "startDate": "20111001",
                        "endDate": "20111231",
                        "Total": "3970.77775"
                    }
                ],
                "colors": []
            },
            {
                "numind": "QINFERENCESRVDEVDVT15",
                "docind": "indoct_qi15.html",
                "appind": "OCT",
                "graph": "column",
                "libind": "Test Activit??s mensuelles 2012",
                "libuni": "k???",
                "psv": "O",
                "clr": "0x00FF00",
                "prmsync": "",
                "lines": [],
                "colors": [
                    "#00FF00"
                ]
            },
            {
                "numind": "QINFERENCESRVDEVDVT19",
                "docind": "indoct_qi19.html",
                "appind": "OCT",
                "graph": "column",
                "libind": "Test Activit??s mensuelles 2013",
                "libuni": "k???",
                "psv": "O",
                "prmsync": "",
                "lines": [
                    {
                        "startDate": "20130101",
                        "endDate": "20130331",
                        "Total": "3369.8955699999997"
                    },
                    {
                        "startDate": "20130401",
                        "endDate": "20130630",
                        "Total": "1572.41544"
                    }
                ],
                "colors": []
            }
        ],
        "usedAttributes": [
            {
                "id": "Total",
                "label": ""
            }
        ],
        "datas": [
            {
                "qStartDate": "20110101",
                "qEndDate": "20110331",
                "??DATE??": "20110101",
                "Total_0": "3117.865"
            },
            {
                "qStartDate": "20110401",
                "qEndDate": "20110630",
                "??DATE??": "20110401",
                "Total_0": "3500.8350499999997"
            },
            {
                "qStartDate": "20110701",
                "qEndDate": "20110930",
                "??DATE??": "20110701",
                "Total_0": "3813.8062099999997"
            },
            {
                "qStartDate": "20111001",
                "qEndDate": "20111231",
                "??DATE??": "20111001",
                "Total_0": "3970.77775"
            },
            {
                "qStartDate": "20130101",
                "qEndDate": "20130331",
                "??DATE??": "20130101",
                "Total_2": "3369.8955699999997"
            },
            {
                "qStartDate": "20130401",
                "qEndDate": "20130630",
                "??DATE??": "20130401",
                "Total_2": "1572.41544"
            }
        ],
        "graphs": [
            {
                "valueField": "Total_0",
                "title": "Test Activit??s mensuelles 2011",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT14",
                    "docind": "indoct_qi14.html",
                    "appind": "OCT",
                    "graph": "column",
                    "libind": "Test Activit??s mensuelles 2011",
                    "libuni": "k???",
                    "psv": "O",
                    "seuil": {},
                    "extmin": "0",
                    "prmsync": "NUMSVCLI=c02gtinv",
                    "lines": [
                        {
                            "startDate": "20110101",
                            "endDate": "20110331",
                            "Total": "3117.865"
                        },
                        {
                            "startDate": "20110401",
                            "endDate": "20110630",
                            "Total": "3500.8350499999997"
                        },
                        {
                            "startDate": "20110701",
                            "endDate": "20110930",
                            "Total": "3813.8062099999997"
                        },
                        {
                            "startDate": "20111001",
                            "endDate": "20111231",
                            "Total": "3970.77775"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "Total_1",
                "title": "Test Activit??s mensuelles 2012",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT15",
                    "docind": "indoct_qi15.html",
                    "appind": "OCT",
                    "graph": "column",
                    "libind": "Test Activit??s mensuelles 2012",
                    "libuni": "k???",
                    "psv": "O",
                    "clr": "0x00FF00",
                    "prmsync": "",
                    "lines": [],
                    "colors": [
                        "#00FF00"
                    ]
                },
                "indicatorId": 1,
                "color": "#00FF00"
            },
            {
                "valueField": "Total_2",
                "title": "Test Activit??s mensuelles 2013",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT19",
                    "docind": "indoct_qi19.html",
                    "appind": "OCT",
                    "graph": "column",
                    "libind": "Test Activit??s mensuelles 2013",
                    "libuni": "k???",
                    "psv": "O",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20130101",
                            "endDate": "20130331",
                            "Total": "3369.8955699999997"
                        },
                        {
                            "startDate": "20130401",
                            "endDate": "20130630",
                            "Total": "1572.41544"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 2
            }
        ],
        "defaultYAxis": "G",
        "colors": [
            "#00FF00",
            "#F44336",
            "#E91E63"
        ]
    }

    data3 = {
        "root": {},
        "data": {},
        "meta": {},
        "metaGlobal": {},
        "label": "Statistiques des ventes",
        "periodes": [
            {
                "id": "M",
                "label": "Mois"
            },
            {
                "id": "Q",
                "label": "Trimestre"
            },
            {
                "id": "S",
                "label": "Semestre"
            },
            {
                "id": "Y",
                "label": "Ann??e"
            },
            {
                "id": "A",
                "label": "Aucune"
            },
            {
                "id": "N",
                "label": "Niveau"
            }
        ],
        "times": [],
        "unusedLevels": [
            {
                "id": 1,
                "label": "Commercial"
            },
            {
                "id": 2,
                "label": "Site"
            },
            {
                "id": 3,
                "label": "Famille de clients"
            },
            {
                "id": 4,
                "label": "Client"
            },
            {
                "id": 5,
                "label": "Ville de livraison"
            },
            {
                "id": 6,
                "label": "Famille d'articles"
            },
            {
                "id": 7,
                "label": "Article"
            }
        ],
        "indicators": [
            {
                "numind": "QINFERENCESRVDEVDVT24",
                "docind": "indiaf_qi24.html",
                "appind": "IAF",
                "graph": "surface",
                "libind": "Statistiques des ventes",
                "libuni": "???",
                "psv": "O",
                "clr": "0x017DB3, 0x50AC6B, 0xFFFFF0, 0xF6A924, 0xD3353, 0x002F67, 0x002F67, 0x002F67",
                "extmin": "0",
                "prmsync": "",
                "lines": [
                    {
                        "startDate": "20130101",
                        "endDate": "20130131",
                        "Total": "3224100"
                    },
                    {
                        "startDate": "20130201",
                        "endDate": "20130228",
                        "Total": "1917900"
                    },
                    {
                        "startDate": "20130301",
                        "endDate": "20130331",
                        "Total": "2846700"
                    },
                    {
                        "startDate": "20130401",
                        "endDate": "20130430",
                        "Total": "3224100"
                    },
                    {
                        "startDate": "20130501",
                        "endDate": "20130531",
                        "Total": "4554300"
                    },
                    {
                        "startDate": "20130601",
                        "endDate": "20130630",
                        "Total": "4945100"
                    },
                    {
                        "startDate": "20130701",
                        "endDate": "20130731",
                        "Total": "3224100"
                    },
                    {
                        "startDate": "20130801",
                        "endDate": "20130831",
                        "Total": "1917900"
                    },
                    {
                        "startDate": "20130901",
                        "endDate": "20130930",
                        "Total": "6251200"
                    },
                    {
                        "startDate": "20131001",
                        "endDate": "20131031",
                        "Total": "7958900"
                    },
                    {
                        "startDate": "20131101",
                        "endDate": "20131130",
                        "Total": "4945100"
                    },
                    {
                        "startDate": "20131201",
                        "endDate": "20131231",
                        "Total": "3224100"
                    }
                ],
                "colors": [
                    "#017DB3",
                    "#50AC6B",
                    "#FFFFF0",
                    "#F6A924",
                    "#D3353",
                    "#002F67",
                    "#002F67",
                    "#002F67"
                ]
            }
        ],
        "usedAttributes": [
            {
                "id": "Total",
                "label": ""
            }
        ],
        "datas": [
            {
                "qStartDate": "20130101",
                "qEndDate": "20130131",
                "??DATE??": "20130101",
                "Total_0": "3224100"
            },
            {
                "qStartDate": "20130201",
                "qEndDate": "20130228",
                "??DATE??": "20130201",
                "Total_0": "1917900"
            },
            {
                "qStartDate": "20130301",
                "qEndDate": "20130331",
                "??DATE??": "20130301",
                "Total_0": "2846700"
            },
            {
                "qStartDate": "20130401",
                "qEndDate": "20130430",
                "??DATE??": "20130401",
                "Total_0": "3224100"
            },
            {
                "qStartDate": "20130501",
                "qEndDate": "20130531",
                "??DATE??": "20130501",
                "Total_0": "4554300"
            },
            {
                "qStartDate": "20130601",
                "qEndDate": "20130630",
                "??DATE??": "20130601",
                "Total_0": "4945100"
            },
            {
                "qStartDate": "20130701",
                "qEndDate": "20130731",
                "??DATE??": "20130701",
                "Total_0": "3224100"
            },
            {
                "qStartDate": "20130801",
                "qEndDate": "20130831",
                "??DATE??": "20130801",
                "Total_0": "1917900"
            },
            {
                "qStartDate": "20130901",
                "qEndDate": "20130930",
                "??DATE??": "20130901",
                "Total_0": "6251200"
            },
            {
                "qStartDate": "20131001",
                "qEndDate": "20131031",
                "??DATE??": "20131001",
                "Total_0": "7958900"
            },
            {
                "qStartDate": "20131101",
                "qEndDate": "20131130",
                "??DATE??": "20131101",
                "Total_0": "4945100"
            },
            {
                "qStartDate": "20131201",
                "qEndDate": "20131231",
                "??DATE??": "20131201",
                "Total_0": "3224100"
            }
        ],
        "graphs": [
            {
                "valueField": "Total_0",
                "title": "Statistiques des ventes",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT24",
                    "docind": "indiaf_qi24.html",
                    "appind": "IAF",
                    "graph": "surface",
                    "libind": "Statistiques des ventes",
                    "libuni": "???",
                    "psv": "O",
                    "clr": "0x017DB3, 0x50AC6B, 0xFFFFF0, 0xF6A924, 0xD3353, 0x002F67, 0x002F67, 0x002F67",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20130101",
                            "endDate": "20130131",
                            "Total": "3224100"
                        },
                        {
                            "startDate": "20130201",
                            "endDate": "20130228",
                            "Total": "1917900"
                        },
                        {
                            "startDate": "20130301",
                            "endDate": "20130331",
                            "Total": "2846700"
                        },
                        {
                            "startDate": "20130401",
                            "endDate": "20130430",
                            "Total": "3224100"
                        },
                        {
                            "startDate": "20130501",
                            "endDate": "20130531",
                            "Total": "4554300"
                        },
                        {
                            "startDate": "20130601",
                            "endDate": "20130630",
                            "Total": "4945100"
                        },
                        {
                            "startDate": "20130701",
                            "endDate": "20130731",
                            "Total": "3224100"
                        },
                        {
                            "startDate": "20130801",
                            "endDate": "20130831",
                            "Total": "1917900"
                        },
                        {
                            "startDate": "20130901",
                            "endDate": "20130930",
                            "Total": "6251200"
                        },
                        {
                            "startDate": "20131001",
                            "endDate": "20131031",
                            "Total": "7958900"
                        },
                        {
                            "startDate": "20131101",
                            "endDate": "20131130",
                            "Total": "4945100"
                        },
                        {
                            "startDate": "20131201",
                            "endDate": "20131231",
                            "Total": "3224100"
                        }
                    ],
                    "colors": [
                        "#017DB3",
                        "#50AC6B",
                        "#FFFFF0",
                        "#F6A924",
                        "#D3353",
                        "#002F67",
                        "#002F67",
                        "#002F67"
                    ]
                },
                "indicatorId": 0,
                "color": "#017DB3"
            }
        ],
        "defaultYAxis": "G",
        "colors": [
            "#017DB3"
        ]
    }

    config = {
        "type": "serial",
        "colors": [
            "#F44336",
            "#E91E63",
            "#9C27B0",
            "#673AB7",
            "#3f51B5",
            "#2196F3",
            "#03A9F4",
            "#00BCD4",
            "#009688",
            "#4CAF50",
            "#8BC34A",
            "#CDDC39",
            "#FFEB3B",
            "#FFC107",
            "#FF9800",
            "#FF5722",
            "#795548",
            "#9E9E9E",
            "#607D8B"
        ],
        "startDuration": 0,
        "sequencedAnimation": false,
        "pathToImages": "images/agl/amcharts/",
        "balloon": {
            "adjustBorderColor": true,
            "borderAlpha": 1,
            "borderThickness": 2,
            "color": "#000000",
            "cornerRadius": 10,
            "fillAlpha": 1,
            "fontSize": 11
        },
        "decimalSeparator": ",",
        "thousandsSeparator": " ",
        "precision": "0",
        "dataProvider": [
            {
                "qStartDate": "20130101",
                "qEndDate": "20130131",
                "??DATE??": "20130101",
                "Total_0": "3224100"
            },
            {
                "qStartDate": "20130201",
                "qEndDate": "20130228",
                "??DATE??": "20130201",
                "Total_0": "1917900",
                "??EVOLUTION??Total_0": "\n(-40.51%)"
            },
            {
                "qStartDate": "20130301",
                "qEndDate": "20130331",
                "??DATE??": "20130301",
                "Total_0": "2846700",
                "??EVOLUTION??Total_0": "\n(+48.43%)"
            },
            {
                "qStartDate": "20130401",
                "qEndDate": "20130430",
                "??DATE??": "20130401",
                "Total_0": "3224100",
                "??EVOLUTION??Total_0": "\n(+13.26%)"
            },
            {
                "qStartDate": "20130501",
                "qEndDate": "20130531",
                "??DATE??": "20130501",
                "Total_0": "4554300",
                "??EVOLUTION??Total_0": "\n(+41.26%)"
            },
            {
                "qStartDate": "20130601",
                "qEndDate": "20130630",
                "??DATE??": "20130601",
                "Total_0": "4945100",
                "??EVOLUTION??Total_0": "\n(+8.58%)"
            },
            {
                "qStartDate": "20130701",
                "qEndDate": "20130731",
                "??DATE??": "20130701",
                "Total_0": "3224100",
                "??EVOLUTION??Total_0": "\n(-34.8%)"
            },
            {
                "qStartDate": "20130801",
                "qEndDate": "20130831",
                "??DATE??": "20130801",
                "Total_0": "1917900",
                "??EVOLUTION??Total_0": "\n(-40.51%)"
            },
            {
                "qStartDate": "20130901",
                "qEndDate": "20130930",
                "??DATE??": "20130901",
                "Total_0": "6251200",
                "??EVOLUTION??Total_0": "\n(+225.94%)"
            },
            {
                "qStartDate": "20131001",
                "qEndDate": "20131031",
                "??DATE??": "20131001",
                "Total_0": "7958900",
                "??EVOLUTION??Total_0": "\n(+27.32%)"
            },
            {
                "qStartDate": "20131101",
                "qEndDate": "20131130",
                "??DATE??": "20131101",
                "Total_0": "4945100",
                "??EVOLUTION??Total_0": "\n(-37.87%)"
            },
            {
                "qStartDate": "20131201",
                "qEndDate": "20131231",
                "??DATE??": "20131201",
                "Total_0": "3224100",
                "??EVOLUTION??Total_0": "\n(-34.8%)"
            }
        ],
        "language": "fr",
        "legend": {
            "valueText": "",
            "divId": {},
            "textClickEnabled": false,
            "markerType": "circle",
            "verticalGap": 6
        },
        "angle": 30,
        "columnSpacing": 5,
        "marginTop": 0,
        "marginBottom": 0,
        "marginLeft": 5,
        "marginRight": 5,
        "categoryField": "??DATE??",
        "categoryAxis": {
            "parseDates": true,
            "autoGridCount": true,
            "axisThickness": 1,
            "equalSpacing": false,
            "minPeriod": "MM",
            "dateFormats": [
                {
                    "period": "mm",
                    "format": "JJ:NN"
                },
                {
                    "period": "hh",
                    "format": "JJ:NN"
                },
                {
                    "period": "HH",
                    "format": "JJ:NN"
                },
                {
                    "period": "DD",
                    "format": "DD MMM YY"
                },
                {
                    "period": "WW",
                    "format": "DD MMM YY"
                },
                {
                    "period": "MM",
                    "format": "MMMM"
                },
                {
                    "period": "YYYY",
                    "format": "YYYY"
                }
            ]
        },
        "chartCursor": {
            "valueBalloonsEnabled": false,
            "categoryBalloonDateFormat": "MMMM YYYY"
        },
        "dataDateFormat": "YYYYMMDD",
        "valueAxes": [
            {
                "minimum": 0,
                "position": "left",
                "id": "leftAxes",
                "guides": []
            }
        ],
        "graphs": [
            {
                "type": "line",
                "valueField": "Total_0",
                "title": "Statistiques des ventes",
                "balloonText": "Statistiques des ventes : [[value]] ???[[??EVOLUTION??Total_0]]",
                "valueAxis": "leftAxes",
                "bullet": "round",
                "bulletAlpha": 1,
                "bulletSize": 5,
                "fillAlphas": 1,
                "lineAlpha": 0,
                "lineColor": "#017DB3"
            }
        ],
        "depth3D": 20,
        "rotate": false
    }

    data4 = {
        "root": {},
        "data": {},
        "meta": {},
        "metaGlobal": {},
        "label": "Test : Activit??s mensuelles 2011 - 2012 - 2013",
        "periodes": [
            {
                "id": "M",
                "label": "Mois"
            },
            {
                "id": "Q",
                "label": "Trimestre"
            },
            {
                "id": "S",
                "label": "Semestre"
            },
            {
                "id": "Y",
                "label": "Ann??e"
            },
            {
                "id": "A",
                "label": "Aucune"
            },
            {
                "id": "N",
                "label": "Niveau"
            }
        ],
        "times": [],
        "unusedLevels": [
            {
                "id": 1,
                "label": "Nature"
            },
            {
                "id": 2,
                "label": "Client"
            },
            {
                "id": 3,
                "label": "Activit??"
            },
            {
                "id": 4,
                "label": "Qui"
            },
            {
                "id": 5,
                "label": "Test OM"
            }
        ],
        "indicators": [
            {
                "numind": "QINFERENCESRVDEVDVT14",
                "docind": "indoct_qi14.html",
                "appind": "OCT",
                "graph": "column",
                "libind": "Test Activit??s mensuelles 2011",
                "libuni": "k???",
                "psv": "O",
                "seuil": {},
                "extmin": "0",
                "prmsync": "NUMSVCLI=c02gtinv",
                "lines": [
                    {
                        "startDate": "20110101",
                        "endDate": "20110331",
                        "Total": "3117.865"
                    },
                    {
                        "startDate": "20110401",
                        "endDate": "20110630",
                        "Total": "3500.8350499999997"
                    },
                    {
                        "startDate": "20110701",
                        "endDate": "20110930",
                        "Total": "3813.8062099999997"
                    },
                    {
                        "startDate": "20111001",
                        "endDate": "20111231",
                        "Total": "3970.77775"
                    }
                ],
                "colors": []
            },
            {
                "numind": "QINFERENCESRVDEVDVT15",
                "docind": "indoct_qi15.html",
                "appind": "OCT",
                "graph": "column",
                "libind": "Test Activit??s mensuelles 2012",
                "libuni": "k???",
                "psv": "O",
                "clr": "0x00FF00",
                "prmsync": "",
                "lines": [],
                "colors": [
                    "#00FF00"
                ]
            },
            {
                "numind": "QINFERENCESRVDEVDVT19",
                "docind": "indoct_qi19.html",
                "appind": "OCT",
                "graph": "column",
                "libind": "Test Activit??s mensuelles 2013",
                "libuni": "k???",
                "psv": "O",
                "prmsync": "",
                "lines": [
                    {
                        "startDate": "20130101",
                        "endDate": "20130331",
                        "Total": "3369.8955699999997"
                    },
                    {
                        "startDate": "20130401",
                        "endDate": "20130630",
                        "Total": "1572.41544"
                    }
                ],
                "colors": []
            }
        ],
        "usedAttributes": [
            {
                "id": "Total",
                "label": ""
            }
        ],
        "datas": [
            {
                "qStartDate": "20110101",
                "qEndDate": "20110331",
                "??DATE??": "20110101",
                "Total_0": "3117.865"
            },
            {
                "qStartDate": "20110401",
                "qEndDate": "20110630",
                "??DATE??": "20110401",
                "Total_0": "3500.8350499999997"
            },
            {
                "qStartDate": "20110701",
                "qEndDate": "20110930",
                "??DATE??": "20110701",
                "Total_0": "3813.8062099999997"
            },
            {
                "qStartDate": "20111001",
                "qEndDate": "20111231",
                "??DATE??": "20111001",
                "Total_0": "3970.77775"
            },
            {
                "qStartDate": "20130101",
                "qEndDate": "20130331",
                "??DATE??": "20130101",
                "Total_2": "3369.8955699999997"
            },
            {
                "qStartDate": "20130401",
                "qEndDate": "20130630",
                "??DATE??": "20130401",
                "Total_2": "1572.41544"
            }
        ],
        "graphs": [
            {
                "valueField": "Total_0",
                "title": "Test Activit??s mensuelles 2011",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT14",
                    "docind": "indoct_qi14.html",
                    "appind": "OCT",
                    "graph": "column",
                    "libind": "Test Activit??s mensuelles 2011",
                    "libuni": "k???",
                    "psv": "O",
                    "seuil": {},
                    "extmin": "0",
                    "prmsync": "NUMSVCLI=c02gtinv",
                    "lines": [
                        {
                            "startDate": "20110101",
                            "endDate": "20110331",
                            "Total": "3117.865"
                        },
                        {
                            "startDate": "20110401",
                            "endDate": "20110630",
                            "Total": "3500.8350499999997"
                        },
                        {
                            "startDate": "20110701",
                            "endDate": "20110930",
                            "Total": "3813.8062099999997"
                        },
                        {
                            "startDate": "20111001",
                            "endDate": "20111231",
                            "Total": "3970.77775"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "Total_1",
                "title": "Test Activit??s mensuelles 2012",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT15",
                    "docind": "indoct_qi15.html",
                    "appind": "OCT",
                    "graph": "column",
                    "libind": "Test Activit??s mensuelles 2012",
                    "libuni": "k???",
                    "psv": "O",
                    "clr": "0x00FF00",
                    "prmsync": "",
                    "lines": [],
                    "colors": [
                        "#00FF00"
                    ]
                },
                "indicatorId": 1,
                "color": "#00FF00"
            },
            {
                "valueField": "Total_2",
                "title": "Test Activit??s mensuelles 2013",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT19",
                    "docind": "indoct_qi19.html",
                    "appind": "OCT",
                    "graph": "column",
                    "libind": "Test Activit??s mensuelles 2013",
                    "libuni": "k???",
                    "psv": "O",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20130101",
                            "endDate": "20130331",
                            "Total": "3369.8955699999997"
                        },
                        {
                            "startDate": "20130401",
                            "endDate": "20130630",
                            "Total": "1572.41544"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 2
            }
        ],
        "defaultYAxis": "G",
        "colors": [
            "#00FF00",
            "#F44336",
            "#E91E63"
        ]
    }

    data5 = {
        "root": {},
        "data": {},
        "meta": {},
        "metaGlobal": {},
        "label": "Test objectif & r??alis??",
        "periodes": [
            {
                "id": "M",
                "label": "Mois"
            },
            {
                "id": "Q",
                "label": "Trimestre"
            },
            {
                "id": "S",
                "label": "Semestre"
            },
            {
                "id": "Y",
                "label": "Ann??e"
            },
            {
                "id": "A",
                "label": "Aucune"
            },
            {
                "id": "N",
                "label": "Niveau"
            }
        ],
        "times": [],
        "unusedLevels": [
            {
                "id": 1,
                "label": "Secteur"
            },
            {
                "id": 2,
                "label": "Tiers"
            },
            {
                "id": 3,
                "label": "D??partement"
            },
            {
                "id": 4,
                "label": "Commercial"
            }
        ],
        "indicators": [
            {
                "numind": "QINFERENCESRVDEVDVT23",
                "docind": "indiaf_qi23.html",
                "appind": "IAF",
                "graph": "line",
                "libind": "Test objectif ventes",
                "libuni": "???",
                "psv": "O",
                "troisd": "N",
                "vfival": "O",
                "vmeval": "O",
                "vpeval": "O",
                "extmin": "0",
                "prmsync": "",
                "lines": [
                    {
                        "startDate": "20120101",
                        "endDate": "20120131",
                        "Total": "835333"
                    },
                    {
                        "startDate": "20120201",
                        "endDate": "20120229",
                        "Total": "997363"
                    },
                    {
                        "startDate": "20120301",
                        "endDate": "20120331",
                        "Total": "693900"
                    },
                    {
                        "startDate": "20120401",
                        "endDate": "20120430",
                        "Total": "848495"
                    },
                    {
                        "startDate": "20120501",
                        "endDate": "20120531",
                        "Total": "1027590"
                    },
                    {
                        "startDate": "20120601",
                        "endDate": "20120630",
                        "Total": "1064092"
                    },
                    {
                        "startDate": "20120701",
                        "endDate": "20120731",
                        "Total": "866501"
                    },
                    {
                        "startDate": "20120801",
                        "endDate": "20120831",
                        "Total": "614479"
                    },
                    {
                        "startDate": "20120901",
                        "endDate": "20120930",
                        "Total": "787959"
                    },
                    {
                        "startDate": "20121001",
                        "endDate": "20121031",
                        "Total": "871503"
                    },
                    {
                        "startDate": "20121101",
                        "endDate": "20121130",
                        "Total": "1075104"
                    },
                    {
                        "startDate": "20121201",
                        "endDate": "20121231",
                        "Total": "941419"
                    }
                ],
                "colors": []
            },
            {
                "numind": "QINFERENCESRVDEVDVT22",
                "docind": "indiaf_qi22.html",
                "appind": "IAF",
                "graph": "column",
                "libind": "Test Ventes",
                "libuni": "???",
                "psv": "O",
                "prmsync": "",
                "lines": [],
                "colors": []
            }
        ],
        "usedAttributes": [
            {
                "id": "Total",
                "label": ""
            }
        ],
        "datas": [
            {
                "qStartDate": "20120101",
                "qEndDate": "20120131",
                "??DATE??": "20120101",
                "Total_0": "835333"
            },
            {
                "qStartDate": "20120201",
                "qEndDate": "20120229",
                "??DATE??": "20120201",
                "Total_0": "997363"
            },
            {
                "qStartDate": "20120301",
                "qEndDate": "20120331",
                "??DATE??": "20120301",
                "Total_0": "693900"
            },
            {
                "qStartDate": "20120401",
                "qEndDate": "20120430",
                "??DATE??": "20120401",
                "Total_0": "848495"
            },
            {
                "qStartDate": "20120501",
                "qEndDate": "20120531",
                "??DATE??": "20120501",
                "Total_0": "1027590"
            },
            {
                "qStartDate": "20120601",
                "qEndDate": "20120630",
                "??DATE??": "20120601",
                "Total_0": "1064092"
            },
            {
                "qStartDate": "20120701",
                "qEndDate": "20120731",
                "??DATE??": "20120701",
                "Total_0": "866501"
            },
            {
                "qStartDate": "20120801",
                "qEndDate": "20120831",
                "??DATE??": "20120801",
                "Total_0": "614479"
            },
            {
                "qStartDate": "20120901",
                "qEndDate": "20120930",
                "??DATE??": "20120901",
                "Total_0": "787959"
            },
            {
                "qStartDate": "20121001",
                "qEndDate": "20121031",
                "??DATE??": "20121001",
                "Total_0": "871503"
            },
            {
                "qStartDate": "20121101",
                "qEndDate": "20121130",
                "??DATE??": "20121101",
                "Total_0": "1075104"
            },
            {
                "qStartDate": "20121201",
                "qEndDate": "20121231",
                "??DATE??": "20121201",
                "Total_0": "941419"
            }
        ],
        "graphs": [
            {
                "valueField": "Total_0",
                "title": "Test objectif ventes",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT23",
                    "docind": "indiaf_qi23.html",
                    "appind": "IAF",
                    "graph": "line",
                    "libind": "Test objectif ventes",
                    "libuni": "???",
                    "psv": "O",
                    "troisd": "N",
                    "vfival": "O",
                    "vmeval": "O",
                    "vpeval": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20120101",
                            "endDate": "20120131",
                            "Total": "835333"
                        },
                        {
                            "startDate": "20120201",
                            "endDate": "20120229",
                            "Total": "997363"
                        },
                        {
                            "startDate": "20120301",
                            "endDate": "20120331",
                            "Total": "693900"
                        },
                        {
                            "startDate": "20120401",
                            "endDate": "20120430",
                            "Total": "848495"
                        },
                        {
                            "startDate": "20120501",
                            "endDate": "20120531",
                            "Total": "1027590"
                        },
                        {
                            "startDate": "20120601",
                            "endDate": "20120630",
                            "Total": "1064092"
                        },
                        {
                            "startDate": "20120701",
                            "endDate": "20120731",
                            "Total": "866501"
                        },
                        {
                            "startDate": "20120801",
                            "endDate": "20120831",
                            "Total": "614479"
                        },
                        {
                            "startDate": "20120901",
                            "endDate": "20120930",
                            "Total": "787959"
                        },
                        {
                            "startDate": "20121001",
                            "endDate": "20121031",
                            "Total": "871503"
                        },
                        {
                            "startDate": "20121101",
                            "endDate": "20121130",
                            "Total": "1075104"
                        },
                        {
                            "startDate": "20121201",
                            "endDate": "20121231",
                            "Total": "941419"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "Total_1",
                "title": "Test Ventes",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT22",
                    "docind": "indiaf_qi22.html",
                    "appind": "IAF",
                    "graph": "column",
                    "libind": "Test Ventes",
                    "libuni": "???",
                    "psv": "O",
                    "prmsync": "",
                    "lines": [],
                    "colors": []
                },
                "indicatorId": 1
            }
        ],
        "defaultYAxis": "G",
        "colors": [
            "#F44336",
            "#E91E63"
        ]
    }

    data6 = {
        "root": {},
        "data": {},
        "meta": {},
        "metaGlobal": {},
        "label": "Statistiques de Ventes",
        "periodes": [
            {
                "id": "M",
                "label": "Mois"
            },
            {
                "id": "Q",
                "label": "Trimestre"
            },
            {
                "id": "S",
                "label": "Semestre"
            },
            {
                "id": "Y",
                "label": "Ann??e"
            },
            {
                "id": "A",
                "label": "Aucune"
            },
            {
                "id": "N",
                "label": "Niveau"
            }
        ],
        "times": [],
        "unusedLevels": [
            {
                "id": 1,
                "label": "Secteur"
            },
            {
                "id": 2,
                "label": "Tiers"
            },
            {
                "id": 3,
                "label": "D??partement"
            },
            {
                "id": 4,
                "label": "Commercial"
            }
        ],
        "indicators": [
            {
                "numind": "QINFERENCESRVDEVDVT23",
                "docind": "indiaf_qi23.html",
                "appind": "IAF",
                "graph": "column",
                "libind": "Test objectif ventes",
                "libuni": "k???",
                "psv": "O",
                "troisd": "N",
                "negval": "700.0",
                "negclr": "#FF0000",
                "seuil": {},
                "extmin": "0",
                "mnemo": {},
                "prmsync": "",
                "lines": [
                    {
                        "startDate": "20120101",
                        "endDate": "20120131",
                        "Total": "835.332966"
                    },
                    {
                        "startDate": "20120201",
                        "endDate": "20120229",
                        "Total": "997.362864"
                    },
                    {
                        "startDate": "20120301",
                        "endDate": "20120331",
                        "Total": "693.899667"
                    },
                    {
                        "startDate": "20120401",
                        "endDate": "20120430",
                        "Total": "848.495277"
                    },
                    {
                        "startDate": "20120501",
                        "endDate": "20120531",
                        "Total": "1027.5895620000001"
                    },
                    {
                        "startDate": "20120601",
                        "endDate": "20120630",
                        "Total": "1064.09241"
                    },
                    {
                        "startDate": "20120701",
                        "endDate": "20120731",
                        "Total": "866.500938"
                    },
                    {
                        "startDate": "20120801",
                        "endDate": "20120831",
                        "Total": "614.4788249999999"
                    },
                    {
                        "startDate": "20120901",
                        "endDate": "20120930",
                        "Total": "787.959063"
                    },
                    {
                        "startDate": "20121001",
                        "endDate": "20121031",
                        "Total": "871.502616"
                    },
                    {
                        "startDate": "20121101",
                        "endDate": "20121130",
                        "Total": "1075.103586"
                    },
                    {
                        "startDate": "20121201",
                        "endDate": "20121231",
                        "Total": "941.419125"
                    }
                ],
                "colors": []
            },
            {
                "numind": "QINFERENCESRVDEVDVT22",
                "docind": "indiaf_qi22.html",
                "appind": "IAF",
                "graph": "column",
                "libind": "Test Ventes",
                "libuni": "k???",
                "psv": "O",
                "troisd": "N",
                "negval": "700.0",
                "negclr": "#FF0000",
                "prmsync": "",
                "lines": [],
                "colors": []
            }
        ],
        "usedAttributes": [
            {
                "id": "Total",
                "label": ""
            }
        ],
        "datas": [
            {
                "qStartDate": "20120101",
                "qEndDate": "20120131",
                "??DATE??": "20120101",
                "Total_0": "835.332966"
            },
            {
                "qStartDate": "20120201",
                "qEndDate": "20120229",
                "??DATE??": "20120201",
                "Total_0": "997.362864"
            },
            {
                "qStartDate": "20120301",
                "qEndDate": "20120331",
                "??DATE??": "20120301",
                "Total_0": "693.899667"
            },
            {
                "qStartDate": "20120401",
                "qEndDate": "20120430",
                "??DATE??": "20120401",
                "Total_0": "848.495277"
            },
            {
                "qStartDate": "20120501",
                "qEndDate": "20120531",
                "??DATE??": "20120501",
                "Total_0": "1027.5895620000001"
            },
            {
                "qStartDate": "20120601",
                "qEndDate": "20120630",
                "??DATE??": "20120601",
                "Total_0": "1064.09241"
            },
            {
                "qStartDate": "20120701",
                "qEndDate": "20120731",
                "??DATE??": "20120701",
                "Total_0": "866.500938"
            },
            {
                "qStartDate": "20120801",
                "qEndDate": "20120831",
                "??DATE??": "20120801",
                "Total_0": "614.4788249999999"
            },
            {
                "qStartDate": "20120901",
                "qEndDate": "20120930",
                "??DATE??": "20120901",
                "Total_0": "787.959063"
            },
            {
                "qStartDate": "20121001",
                "qEndDate": "20121031",
                "??DATE??": "20121001",
                "Total_0": "871.502616"
            },
            {
                "qStartDate": "20121101",
                "qEndDate": "20121130",
                "??DATE??": "20121101",
                "Total_0": "1075.103586"
            },
            {
                "qStartDate": "20121201",
                "qEndDate": "20121231",
                "??DATE??": "20121201",
                "Total_0": "941.419125"
            }
        ],
        "graphs": [
            {
                "valueField": "Total_0",
                "title": "Test objectif ventes",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT23",
                    "docind": "indiaf_qi23.html",
                    "appind": "IAF",
                    "graph": "column",
                    "libind": "Test objectif ventes",
                    "libuni": "k???",
                    "psv": "O",
                    "troisd": "N",
                    "negval": "700.0",
                    "negclr": "#FF0000",
                    "seuil": {},
                    "extmin": "0",
                    "mnemo": {},
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20120101",
                            "endDate": "20120131",
                            "Total": "835.332966"
                        },
                        {
                            "startDate": "20120201",
                            "endDate": "20120229",
                            "Total": "997.362864"
                        },
                        {
                            "startDate": "20120301",
                            "endDate": "20120331",
                            "Total": "693.899667"
                        },
                        {
                            "startDate": "20120401",
                            "endDate": "20120430",
                            "Total": "848.495277"
                        },
                        {
                            "startDate": "20120501",
                            "endDate": "20120531",
                            "Total": "1027.5895620000001"
                        },
                        {
                            "startDate": "20120601",
                            "endDate": "20120630",
                            "Total": "1064.09241"
                        },
                        {
                            "startDate": "20120701",
                            "endDate": "20120731",
                            "Total": "866.500938"
                        },
                        {
                            "startDate": "20120801",
                            "endDate": "20120831",
                            "Total": "614.4788249999999"
                        },
                        {
                            "startDate": "20120901",
                            "endDate": "20120930",
                            "Total": "787.959063"
                        },
                        {
                            "startDate": "20121001",
                            "endDate": "20121031",
                            "Total": "871.502616"
                        },
                        {
                            "startDate": "20121101",
                            "endDate": "20121130",
                            "Total": "1075.103586"
                        },
                        {
                            "startDate": "20121201",
                            "endDate": "20121231",
                            "Total": "941.419125"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "Total_1",
                "title": "Test Ventes",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT22",
                    "docind": "indiaf_qi22.html",
                    "appind": "IAF",
                    "graph": "column",
                    "libind": "Test Ventes",
                    "libuni": "k???",
                    "psv": "O",
                    "troisd": "N",
                    "negval": "700.0",
                    "negclr": "#FF0000",
                    "prmsync": "",
                    "lines": [],
                    "colors": []
                },
                "indicatorId": 1
            }
        ],
        "defaultYAxis": "G",
        "colors": [
            "#F44336",
            "#E91E63"
        ]
    }

    data7 = {
        "root": {},
        "data": {},
        "meta": {},
        "metaGlobal": {},
        "label": "Test objectif & r??alis??",
        "periodes": [
            {
                "id": "M",
                "label": "Mois"
            },
            {
                "id": "Q",
                "label": "Trimestre"
            },
            {
                "id": "S",
                "label": "Semestre"
            },
            {
                "id": "Y",
                "label": "Ann??e"
            },
            {
                "id": "A",
                "label": "Aucune"
            },
            {
                "id": "N",
                "label": "Niveau"
            }
        ],
        "times": [],
        "unusedLevels": [
            {
                "id": 2,
                "label": "Tiers"
            },
            {
                "id": 3,
                "label": "D??partement"
            },
            {
                "id": 4,
                "label": "Commercial"
            }
        ],
        "indicators": [
            {
                "numind": "QINFERENCESRVDEVDVT23",
                "docind": "indiaf_qi23.html",
                "appind": "IAF",
                "graph": "column",
                "libind": "Test objectif ventes",
                "libuni": "???",
                "psv": "O",
                "troisd": "N",
                "vfival": "O",
                "vmeval": "O",
                "vpeval": "O",
                "extmin": "0",
                "prmsync": "",
                "lines": [
                    {
                        "startDate": "20120601",
                        "endDate": "20120630",
                        "Jardinage": "434664",
                        "Pr??t-??-porter": "412230",
                        "Boissons": "136847",
                        "Alimentation": "38230",
                        "Bricolage": "23087",
                        "Chaussures": "18090",
                        "Papeterie": "945"
                    }
                ],
                "colors": []
            }
        ],
        "usedAttributes": [
            {
                "id": "Jardinage",
                "label": ""
            },
            {
                "id": "Pr??t-??-porter",
                "label": ""
            },
            {
                "id": "Boissons",
                "label": ""
            },
            {
                "id": "Alimentation",
                "label": ""
            },
            {
                "id": "Bricolage",
                "label": ""
            },
            {
                "id": "Chaussures",
                "label": ""
            },
            {
                "id": "Papeterie",
                "label": ""
            }
        ],
        "datas": [
            {
                "qStartDate": "20120601",
                "qEndDate": "20120630",
                "??DATE??": "20120601",
                "Jardinage_0": "434664",
                "Pr??t-??-porter_0": "412230",
                "Boissons_0": "136847",
                "Alimentation_0": "38230",
                "Bricolage_0": "23087",
                "Chaussures_0": "18090",
                "Papeterie_0": "945"
            }
        ],
        "graphs": [
            {
                "valueField": "Jardinage_0",
                "title": "Jardinage",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT23",
                    "docind": "indiaf_qi23.html",
                    "appind": "IAF",
                    "graph": "column",
                    "libind": "Test objectif ventes",
                    "libuni": "???",
                    "psv": "O",
                    "troisd": "N",
                    "vfival": "O",
                    "vmeval": "O",
                    "vpeval": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20120601",
                            "endDate": "20120630",
                            "Jardinage": "434664",
                            "Pr??t-??-porter": "412230",
                            "Boissons": "136847",
                            "Alimentation": "38230",
                            "Bricolage": "23087",
                            "Chaussures": "18090",
                            "Papeterie": "945"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "Pr??t-??-porter_0",
                "title": "Pr??t-??-porter",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT23",
                    "docind": "indiaf_qi23.html",
                    "appind": "IAF",
                    "graph": "column",
                    "libind": "Test objectif ventes",
                    "libuni": "???",
                    "psv": "O",
                    "troisd": "N",
                    "vfival": "O",
                    "vmeval": "O",
                    "vpeval": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20120601",
                            "endDate": "20120630",
                            "Jardinage": "434664",
                            "Pr??t-??-porter": "412230",
                            "Boissons": "136847",
                            "Alimentation": "38230",
                            "Bricolage": "23087",
                            "Chaussures": "18090",
                            "Papeterie": "945"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "Boissons_0",
                "title": "Boissons",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT23",
                    "docind": "indiaf_qi23.html",
                    "appind": "IAF",
                    "graph": "column",
                    "libind": "Test objectif ventes",
                    "libuni": "???",
                    "psv": "O",
                    "troisd": "N",
                    "vfival": "O",
                    "vmeval": "O",
                    "vpeval": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20120601",
                            "endDate": "20120630",
                            "Jardinage": "434664",
                            "Pr??t-??-porter": "412230",
                            "Boissons": "136847",
                            "Alimentation": "38230",
                            "Bricolage": "23087",
                            "Chaussures": "18090",
                            "Papeterie": "945"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "Alimentation_0",
                "title": "Alimentation",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT23",
                    "docind": "indiaf_qi23.html",
                    "appind": "IAF",
                    "graph": "column",
                    "libind": "Test objectif ventes",
                    "libuni": "???",
                    "psv": "O",
                    "troisd": "N",
                    "vfival": "O",
                    "vmeval": "O",
                    "vpeval": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20120601",
                            "endDate": "20120630",
                            "Jardinage": "434664",
                            "Pr??t-??-porter": "412230",
                            "Boissons": "136847",
                            "Alimentation": "38230",
                            "Bricolage": "23087",
                            "Chaussures": "18090",
                            "Papeterie": "945"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "Bricolage_0",
                "title": "Bricolage",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT23",
                    "docind": "indiaf_qi23.html",
                    "appind": "IAF",
                    "graph": "column",
                    "libind": "Test objectif ventes",
                    "libuni": "???",
                    "psv": "O",
                    "troisd": "N",
                    "vfival": "O",
                    "vmeval": "O",
                    "vpeval": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20120601",
                            "endDate": "20120630",
                            "Jardinage": "434664",
                            "Pr??t-??-porter": "412230",
                            "Boissons": "136847",
                            "Alimentation": "38230",
                            "Bricolage": "23087",
                            "Chaussures": "18090",
                            "Papeterie": "945"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "Chaussures_0",
                "title": "Chaussures",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT23",
                    "docind": "indiaf_qi23.html",
                    "appind": "IAF",
                    "graph": "column",
                    "libind": "Test objectif ventes",
                    "libuni": "???",
                    "psv": "O",
                    "troisd": "N",
                    "vfival": "O",
                    "vmeval": "O",
                    "vpeval": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20120601",
                            "endDate": "20120630",
                            "Jardinage": "434664",
                            "Pr??t-??-porter": "412230",
                            "Boissons": "136847",
                            "Alimentation": "38230",
                            "Bricolage": "23087",
                            "Chaussures": "18090",
                            "Papeterie": "945"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "Papeterie_0",
                "title": "Papeterie",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT23",
                    "docind": "indiaf_qi23.html",
                    "appind": "IAF",
                    "graph": "column",
                    "libind": "Test objectif ventes",
                    "libuni": "???",
                    "psv": "O",
                    "troisd": "N",
                    "vfival": "O",
                    "vmeval": "O",
                    "vpeval": "O",
                    "extmin": "0",
                    "prmsync": "",
                    "lines": [
                        {
                            "startDate": "20120601",
                            "endDate": "20120630",
                            "Jardinage": "434664",
                            "Pr??t-??-porter": "412230",
                            "Boissons": "136847",
                            "Alimentation": "38230",
                            "Bricolage": "23087",
                            "Chaussures": "18090",
                            "Papeterie": "945"
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            }
        ],
        "defaultYAxis": "G",
        "colors": [
            "#F44336",
            "#E91E63",
            "#9C27B0",
            "#673AB7",
            "#3f51B5",
            "#2196F3",
            "#03A9F4"
        ]
    }

    data8 = {
        "root": {},
        "data": {},
        "meta": {},
        "metaGlobal": {},
        "label": "Co??t de possession par ??quipement (TCO)",
        "periodes": [
            {
                "id": "Y",
                "label": "Ann??e"
            },
            {
                "id": "A",
                "label": "Aucune"
            },
            {
                "id": "N",
                "label": "Niveau"
            }
        ],
        "times": [],
        "unusedLevels": [
            {
                "id": 1,
                "label": "Etablissement exploitant"
            },
            {
                "id": 2,
                "label": "Cat??gorie"
            },
            {
                "id": 3,
                "label": "Site"
            },
            {
                "id": 5,
                "label": "Cat??gorie du co??t"
            },
            {
                "id": 6,
                "label": "Nature du co??t"
            },
            {
                "id": 7,
                "label": "Nature du co??t de maintenance"
            },
            {
                "id": 8,
                "label": "D??tail du co??t"
            }
        ],
        "indicators": [
            {
                "numind": "QINFERENCESRVDEVDVT27",
                "docind": "indqam_qi27.html",
                "appind": "QAM",
                "graph": "column",
                "libind": "Co??t total de possession (TCO)",
                "libuni": "???",
                "psv": "O",
                "extmin": "0",
                "prmsync": "NUMQMEQT=c04gtinv",
                "lines": [
                    {
                        "startDate": "20000101",
                        "endDate": "20001231",
                        "030111": "",
                        "AILERON": "2.40",
                        "AURILLAC": "6000.00",
                        "BRUL-05": "3.98",
                        "CHAMALIERES": "",
                        "CHAMALIERE": "",
                        "DBI0002": "",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "",
                        "EQT0012495": "",
                        "EQT0012496": "",
                        "EQTTCO": "",
                        "PARIS": "4800.00",
                        "PARLAN": ""
                    },
                    {
                        "startDate": "20010101",
                        "endDate": "20011231",
                        "030111": "",
                        "AILERON": "68.00",
                        "AURILLAC": "6000.00",
                        "BRUL-05": "3.98",
                        "CHAMALIERES": "",
                        "CHAMALIERE": "",
                        "DBI0002": "",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "",
                        "EQT0012495": "",
                        "EQT0012496": "",
                        "EQTTCO": "",
                        "PARIS": "4800.00",
                        "PARLAN": ""
                    },
                    {
                        "startDate": "20020101",
                        "endDate": "20021231",
                        "030111": "",
                        "AILERON": "12002.40",
                        "AURILLAC": "6000.00",
                        "BRUL-05": "3.98",
                        "CHAMALIERES": "",
                        "CHAMALIERE": "",
                        "DBI0002": "",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "",
                        "EQT0012495": "",
                        "EQT0012496": "",
                        "EQTTCO": "",
                        "PARIS": "4800.00",
                        "PARLAN": ""
                    },
                    {
                        "startDate": "20030101",
                        "endDate": "20031231",
                        "030111": "",
                        "AILERON": "2.40",
                        "AURILLAC": "6000.00",
                        "BRUL-05": "3.98",
                        "CHAMALIERES": "",
                        "CHAMALIERE": "",
                        "DBI0002": "",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "",
                        "EQT0012495": "",
                        "EQT0012496": "",
                        "EQTTCO": "",
                        "PARIS": "4800.00",
                        "PARLAN": ""
                    },
                    {
                        "startDate": "20040101",
                        "endDate": "20041231",
                        "030111": "",
                        "AILERON": "2.40",
                        "AURILLAC": "6000.00",
                        "BRUL-05": "3.98",
                        "CHAMALIERES": "",
                        "CHAMALIERE": "",
                        "DBI0002": "",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "1.00",
                        "EQT0012495": "1.00",
                        "EQT0012496": "1.00",
                        "EQTTCO": "",
                        "PARIS": "4800.00",
                        "PARLAN": ""
                    },
                    {
                        "startDate": "20050101",
                        "endDate": "20051231",
                        "030111": "",
                        "AILERON": "2.40",
                        "AURILLAC": "6000.00",
                        "BRUL-05": "3.98",
                        "CHAMALIERES": "",
                        "CHAMALIERE": "",
                        "DBI0002": "",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "3.98",
                        "EQT0012495": "3.98",
                        "EQT0012496": "3.98",
                        "EQTTCO": "",
                        "PARIS": "4800.00",
                        "PARLAN": ""
                    },
                    {
                        "startDate": "20060101",
                        "endDate": "20061231",
                        "030111": "",
                        "AILERON": "2.40",
                        "AURILLAC": "6000.00",
                        "BRUL-05": "3.98",
                        "CHAMALIERES": "",
                        "CHAMALIERE": "",
                        "DBI0002": "8.40",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "3.98",
                        "EQT0012495": "3.98",
                        "EQT0012496": "3.98",
                        "EQTTCO": "",
                        "PARIS": "4800.00",
                        "PARLAN": ""
                    },
                    {
                        "startDate": "20070101",
                        "endDate": "20071231",
                        "030111": "",
                        "AILERON": "2.40",
                        "AURILLAC": "6000.00",
                        "BRUL-05": "3.98",
                        "CHAMALIERES": "",
                        "CHAMALIERE": "",
                        "DBI0002": "100.80",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "3.98",
                        "EQT0012495": "3.98",
                        "EQT0012496": "3.98",
                        "EQTTCO": "",
                        "PARIS": "4800.00",
                        "PARLAN": ""
                    },
                    {
                        "startDate": "20080101",
                        "endDate": "20081231",
                        "030111": "",
                        "AILERON": "2.40",
                        "AURILLAC": "17227.64",
                        "BRUL-05": "3.98",
                        "CHAMALIERES": "6000.00",
                        "CHAMALIERE": "11940.00",
                        "DBI0002": "100.80",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "3.98",
                        "EQT0012495": "3.98",
                        "EQT0012496": "3.98",
                        "EQTTCO": "",
                        "PARIS": "4800.00",
                        "PARLAN": ""
                    },
                    {
                        "startDate": "20090101",
                        "endDate": "20091231",
                        "030111": "1652.00",
                        "AILERON": "2.40",
                        "AURILLAC": "92768.04",
                        "BRUL-05": "3.98",
                        "CHAMALIERES": "18000.00",
                        "CHAMALIERE": "",
                        "DBI0002": "100.80",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "3.98",
                        "EQT0012495": "3.98",
                        "EQT0012496": "3.98",
                        "EQTTCO": "",
                        "PARIS": "4800.00",
                        "PARLAN": ""
                    },
                    {
                        "startDate": "20100101",
                        "endDate": "20101231",
                        "030111": "60.00",
                        "AILERON": "",
                        "AURILLAC": "6035.20",
                        "BRUL-05": "3.98",
                        "CHAMALIERES": "18000.00",
                        "CHAMALIERE": "",
                        "DBI0002": "100.80",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "3.98",
                        "EQT0012495": "3.98",
                        "EQT0012496": "3.98",
                        "EQTTCO": "",
                        "PARIS": "4800.00",
                        "PARLAN": ""
                    },
                    {
                        "startDate": "20110101",
                        "endDate": "20111231",
                        "030111": "60.00",
                        "AILERON": "",
                        "AURILLAC": "1648.40",
                        "BRUL-05": "",
                        "CHAMALIERES": "18000.00",
                        "CHAMALIERE": "",
                        "DBI0002": "100.80",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "3.98",
                        "EQT0012495": "3.98",
                        "EQT0012496": "3.98",
                        "EQTTCO": "",
                        "PARIS": "",
                        "PARLAN": ""
                    },
                    {
                        "startDate": "20120101",
                        "endDate": "20121231",
                        "030111": "60.00",
                        "AILERON": "",
                        "AURILLAC": "622.31",
                        "BRUL-05": "",
                        "CHAMALIERES": "18000.00",
                        "CHAMALIERE": "",
                        "DBI0002": "100.80",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "3.98",
                        "EQT0012495": "3.98",
                        "EQT0012496": "3.98",
                        "EQTTCO": "",
                        "PARIS": "",
                        "PARLAN": ""
                    },
                    {
                        "startDate": "20130101",
                        "endDate": "20131231",
                        "030111": "60.00",
                        "AILERON": "",
                        "AURILLAC": "971.94",
                        "BRUL-05": "",
                        "CHAMALIERES": "18000.00",
                        "CHAMALIERE": "968.00",
                        "DBI0002": "100.80",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "3.98",
                        "EQT0012495": "3.98",
                        "EQT0012496": "3.98",
                        "EQTTCO": "104.96",
                        "PARIS": "",
                        "PARLAN": "4000.00"
                    },
                    {
                        "startDate": "20140101",
                        "endDate": "20141231",
                        "030111": "30.00",
                        "AILERON": "",
                        "AURILLAC": "1800.20",
                        "BRUL-05": "",
                        "CHAMALIERES": "9000.00",
                        "CHAMALIERE": "",
                        "DBI0002": "33.60",
                        "DUPAURI02": "2000.00",
                        "DUPAURI03": "2000.00",
                        "EQT0012494": "1.99",
                        "EQT0012495": "1.99",
                        "EQT0012496": "1.99",
                        "EQTTCO": "",
                        "PARIS": "",
                        "PARLAN": "3000.00"
                    },
                    {
                        "startDate": "20150101",
                        "endDate": "20151231",
                        "030111": "",
                        "AILERON": "",
                        "AURILLAC": "31066.12",
                        "BRUL-05": "",
                        "CHAMALIERES": "",
                        "CHAMALIERE": "",
                        "DBI0002": "",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "",
                        "EQT0012495": "",
                        "EQT0012496": "",
                        "EQTTCO": "",
                        "PARIS": "",
                        "PARLAN": ""
                    },
                    {
                        "startDate": "20160101",
                        "endDate": "20161231",
                        "030111": "",
                        "AILERON": "",
                        "AURILLAC": "4299.78",
                        "BRUL-05": "",
                        "CHAMALIERES": "",
                        "CHAMALIERE": "",
                        "DBI0002": "",
                        "DUPAURI02": "",
                        "DUPAURI03": "",
                        "EQT0012494": "",
                        "EQT0012495": "",
                        "EQT0012496": "",
                        "EQTTCO": "",
                        "PARIS": "",
                        "PARLAN": ""
                    }
                ],
                "colors": []
            }
        ],
        "usedAttributes": [
            {
                "id": "030111",
                "label": "Voiture Clio II soci"
            },
            {
                "id": "AILERON",
                "label": "Aileron"
            },
            {
                "id": "AURILLAC",
                "label": "B??timent Qualiac AUR"
            },
            {
                "id": "BRUL-05",
                "label": "Test modification de"
            },
            {
                "id": "CHAMALIERES",
                "label": "Site de Chamali??res"
            },
            {
                "id": "CHAMALIERE",
                "label": "Chamali??re"
            },
            {
                "id": "DBI0002",
                "label": "Eqt DBI 02"
            },
            {
                "id": "DUPAURI02",
                "label": "Libell?? long du b??ti"
            },
            {
                "id": "DUPAURI03",
                "label": "Libell?? long du b??ti"
            },
            {
                "id": "EQT0012494",
                "label": "FNU 1"
            },
            {
                "id": "EQT0012495",
                "label": "FNU 1"
            },
            {
                "id": "EQT0012496",
                "label": "FNU 1"
            },
            {
                "id": "EQTTCO",
                "label": "B??timent"
            },
            {
                "id": "PARIS",
                "label": "Site de Paris"
            },
            {
                "id": "PARLAN",
                "label": "Libell?? long du b??ti"
            }
        ],
        "datas": [
            {
                "qStartDate": "20000101",
                "qEndDate": "20001231",
                "??DATE??": "20000101",
                "030111_0": "",
                "AILERON_0": "2.40",
                "AURILLAC_0": "6000.00",
                "BRUL-05_0": "3.98",
                "CHAMALIERES_0": "",
                "CHAMALIERE_0": "",
                "DBI0002_0": "",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "",
                "EQT0012495_0": "",
                "EQT0012496_0": "",
                "EQTTCO_0": "",
                "PARIS_0": "4800.00",
                "PARLAN_0": ""
            },
            {
                "qStartDate": "20010101",
                "qEndDate": "20011231",
                "??DATE??": "20010101",
                "030111_0": "",
                "AILERON_0": "68.00",
                "AURILLAC_0": "6000.00",
                "BRUL-05_0": "3.98",
                "CHAMALIERES_0": "",
                "CHAMALIERE_0": "",
                "DBI0002_0": "",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "",
                "EQT0012495_0": "",
                "EQT0012496_0": "",
                "EQTTCO_0": "",
                "PARIS_0": "4800.00",
                "PARLAN_0": ""
            },
            {
                "qStartDate": "20020101",
                "qEndDate": "20021231",
                "??DATE??": "20020101",
                "030111_0": "",
                "AILERON_0": "12002.40",
                "AURILLAC_0": "6000.00",
                "BRUL-05_0": "3.98",
                "CHAMALIERES_0": "",
                "CHAMALIERE_0": "",
                "DBI0002_0": "",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "",
                "EQT0012495_0": "",
                "EQT0012496_0": "",
                "EQTTCO_0": "",
                "PARIS_0": "4800.00",
                "PARLAN_0": ""
            },
            {
                "qStartDate": "20030101",
                "qEndDate": "20031231",
                "??DATE??": "20030101",
                "030111_0": "",
                "AILERON_0": "2.40",
                "AURILLAC_0": "6000.00",
                "BRUL-05_0": "3.98",
                "CHAMALIERES_0": "",
                "CHAMALIERE_0": "",
                "DBI0002_0": "",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "",
                "EQT0012495_0": "",
                "EQT0012496_0": "",
                "EQTTCO_0": "",
                "PARIS_0": "4800.00",
                "PARLAN_0": ""
            },
            {
                "qStartDate": "20040101",
                "qEndDate": "20041231",
                "??DATE??": "20040101",
                "030111_0": "",
                "AILERON_0": "2.40",
                "AURILLAC_0": "6000.00",
                "BRUL-05_0": "3.98",
                "CHAMALIERES_0": "",
                "CHAMALIERE_0": "",
                "DBI0002_0": "",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "1.00",
                "EQT0012495_0": "1.00",
                "EQT0012496_0": "1.00",
                "EQTTCO_0": "",
                "PARIS_0": "4800.00",
                "PARLAN_0": ""
            },
            {
                "qStartDate": "20050101",
                "qEndDate": "20051231",
                "??DATE??": "20050101",
                "030111_0": "",
                "AILERON_0": "2.40",
                "AURILLAC_0": "6000.00",
                "BRUL-05_0": "3.98",
                "CHAMALIERES_0": "",
                "CHAMALIERE_0": "",
                "DBI0002_0": "",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "3.98",
                "EQT0012495_0": "3.98",
                "EQT0012496_0": "3.98",
                "EQTTCO_0": "",
                "PARIS_0": "4800.00",
                "PARLAN_0": ""
            },
            {
                "qStartDate": "20060101",
                "qEndDate": "20061231",
                "??DATE??": "20060101",
                "030111_0": "",
                "AILERON_0": "2.40",
                "AURILLAC_0": "6000.00",
                "BRUL-05_0": "3.98",
                "CHAMALIERES_0": "",
                "CHAMALIERE_0": "",
                "DBI0002_0": "8.40",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "3.98",
                "EQT0012495_0": "3.98",
                "EQT0012496_0": "3.98",
                "EQTTCO_0": "",
                "PARIS_0": "4800.00",
                "PARLAN_0": ""
            },
            {
                "qStartDate": "20070101",
                "qEndDate": "20071231",
                "??DATE??": "20070101",
                "030111_0": "",
                "AILERON_0": "2.40",
                "AURILLAC_0": "6000.00",
                "BRUL-05_0": "3.98",
                "CHAMALIERES_0": "",
                "CHAMALIERE_0": "",
                "DBI0002_0": "100.80",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "3.98",
                "EQT0012495_0": "3.98",
                "EQT0012496_0": "3.98",
                "EQTTCO_0": "",
                "PARIS_0": "4800.00",
                "PARLAN_0": ""
            },
            {
                "qStartDate": "20080101",
                "qEndDate": "20081231",
                "??DATE??": "20080101",
                "030111_0": "",
                "AILERON_0": "2.40",
                "AURILLAC_0": "17227.64",
                "BRUL-05_0": "3.98",
                "CHAMALIERES_0": "6000.00",
                "CHAMALIERE_0": "11940.00",
                "DBI0002_0": "100.80",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "3.98",
                "EQT0012495_0": "3.98",
                "EQT0012496_0": "3.98",
                "EQTTCO_0": "",
                "PARIS_0": "4800.00",
                "PARLAN_0": ""
            },
            {
                "qStartDate": "20090101",
                "qEndDate": "20091231",
                "??DATE??": "20090101",
                "030111_0": "1652.00",
                "AILERON_0": "2.40",
                "AURILLAC_0": "92768.04",
                "BRUL-05_0": "3.98",
                "CHAMALIERES_0": "18000.00",
                "CHAMALIERE_0": "",
                "DBI0002_0": "100.80",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "3.98",
                "EQT0012495_0": "3.98",
                "EQT0012496_0": "3.98",
                "EQTTCO_0": "",
                "PARIS_0": "4800.00",
                "PARLAN_0": ""
            },
            {
                "qStartDate": "20100101",
                "qEndDate": "20101231",
                "??DATE??": "20100101",
                "030111_0": "60.00",
                "AILERON_0": "",
                "AURILLAC_0": "6035.20",
                "BRUL-05_0": "3.98",
                "CHAMALIERES_0": "18000.00",
                "CHAMALIERE_0": "",
                "DBI0002_0": "100.80",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "3.98",
                "EQT0012495_0": "3.98",
                "EQT0012496_0": "3.98",
                "EQTTCO_0": "",
                "PARIS_0": "4800.00",
                "PARLAN_0": ""
            },
            {
                "qStartDate": "20110101",
                "qEndDate": "20111231",
                "??DATE??": "20110101",
                "030111_0": "60.00",
                "AILERON_0": "",
                "AURILLAC_0": "1648.40",
                "BRUL-05_0": "",
                "CHAMALIERES_0": "18000.00",
                "CHAMALIERE_0": "",
                "DBI0002_0": "100.80",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "3.98",
                "EQT0012495_0": "3.98",
                "EQT0012496_0": "3.98",
                "EQTTCO_0": "",
                "PARIS_0": "",
                "PARLAN_0": ""
            },
            {
                "qStartDate": "20120101",
                "qEndDate": "20121231",
                "??DATE??": "20120101",
                "030111_0": "60.00",
                "AILERON_0": "",
                "AURILLAC_0": "622.31",
                "BRUL-05_0": "",
                "CHAMALIERES_0": "18000.00",
                "CHAMALIERE_0": "",
                "DBI0002_0": "100.80",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "3.98",
                "EQT0012495_0": "3.98",
                "EQT0012496_0": "3.98",
                "EQTTCO_0": "",
                "PARIS_0": "",
                "PARLAN_0": ""
            },
            {
                "qStartDate": "20130101",
                "qEndDate": "20131231",
                "??DATE??": "20130101",
                "030111_0": "60.00",
                "AILERON_0": "",
                "AURILLAC_0": "971.94",
                "BRUL-05_0": "",
                "CHAMALIERES_0": "18000.00",
                "CHAMALIERE_0": "968.00",
                "DBI0002_0": "100.80",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "3.98",
                "EQT0012495_0": "3.98",
                "EQT0012496_0": "3.98",
                "EQTTCO_0": "104.96",
                "PARIS_0": "",
                "PARLAN_0": "4000.00"
            },
            {
                "qStartDate": "20140101",
                "qEndDate": "20141231",
                "??DATE??": "20140101",
                "030111_0": "30.00",
                "AILERON_0": "",
                "AURILLAC_0": "1800.20",
                "BRUL-05_0": "",
                "CHAMALIERES_0": "9000.00",
                "CHAMALIERE_0": "",
                "DBI0002_0": "33.60",
                "DUPAURI02_0": "2000.00",
                "DUPAURI03_0": "2000.00",
                "EQT0012494_0": "1.99",
                "EQT0012495_0": "1.99",
                "EQT0012496_0": "1.99",
                "EQTTCO_0": "",
                "PARIS_0": "",
                "PARLAN_0": "3000.00"
            },
            {
                "qStartDate": "20150101",
                "qEndDate": "20151231",
                "??DATE??": "20150101",
                "030111_0": "",
                "AILERON_0": "",
                "AURILLAC_0": "31066.12",
                "BRUL-05_0": "",
                "CHAMALIERES_0": "",
                "CHAMALIERE_0": "",
                "DBI0002_0": "",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "",
                "EQT0012495_0": "",
                "EQT0012496_0": "",
                "EQTTCO_0": "",
                "PARIS_0": "",
                "PARLAN_0": ""
            },
            {
                "qStartDate": "20160101",
                "qEndDate": "20161231",
                "??DATE??": "20160101",
                "030111_0": "",
                "AILERON_0": "",
                "AURILLAC_0": "4299.78",
                "BRUL-05_0": "",
                "CHAMALIERES_0": "",
                "CHAMALIERE_0": "",
                "DBI0002_0": "",
                "DUPAURI02_0": "",
                "DUPAURI03_0": "",
                "EQT0012494_0": "",
                "EQT0012495_0": "",
                "EQT0012496_0": "",
                "EQTTCO_0": "",
                "PARIS_0": "",
                "PARLAN_0": ""
            }
        ],
        "graphs": [
            {
                "valueField": "030111_0",
                "title": "Voiture Clio II soci",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "AILERON_0",
                "title": "Aileron",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "AURILLAC_0",
                "title": "B??timent Qualiac AUR",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "BRUL-05_0",
                "title": "Test modification de",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "CHAMALIERES_0",
                "title": "Site de Chamali??res",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "CHAMALIERE_0",
                "title": "Chamali??re",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "DBI0002_0",
                "title": "Eqt DBI 02",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "DUPAURI02_0",
                "title": "Libell?? long du b??ti",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "DUPAURI03_0",
                "title": "Libell?? long du b??ti",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "EQT0012494_0",
                "title": "FNU 1",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "EQT0012495_0",
                "title": "FNU 1",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "EQT0012496_0",
                "title": "FNU 1",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "EQTTCO_0",
                "title": "B??timent",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "PARIS_0",
                "title": "Site de Paris",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            },
            {
                "valueField": "PARLAN_0",
                "title": "Libell?? long du b??ti",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT27",
                    "docind": "indqam_qi27.html",
                    "appind": "QAM",
                    "graph": "column",
                    "libind": "Co??t total de possession (TCO)",
                    "libuni": "???",
                    "psv": "O",
                    "extmin": "0",
                    "prmsync": "NUMQMEQT=c04gtinv",
                    "lines": [
                        {
                            "startDate": "20000101",
                            "endDate": "20001231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20010101",
                            "endDate": "20011231",
                            "030111": "",
                            "AILERON": "68.00",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20020101",
                            "endDate": "20021231",
                            "030111": "",
                            "AILERON": "12002.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20030101",
                            "endDate": "20031231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20040101",
                            "endDate": "20041231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "1.00",
                            "EQT0012495": "1.00",
                            "EQT0012496": "1.00",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20050101",
                            "endDate": "20051231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20060101",
                            "endDate": "20061231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "8.40",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20070101",
                            "endDate": "20071231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "6000.00",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20080101",
                            "endDate": "20081231",
                            "030111": "",
                            "AILERON": "2.40",
                            "AURILLAC": "17227.64",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "6000.00",
                            "CHAMALIERE": "11940.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20090101",
                            "endDate": "20091231",
                            "030111": "1652.00",
                            "AILERON": "2.40",
                            "AURILLAC": "92768.04",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20100101",
                            "endDate": "20101231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "6035.20",
                            "BRUL-05": "3.98",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "4800.00",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20110101",
                            "endDate": "20111231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "1648.40",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20120101",
                            "endDate": "20121231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "622.31",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20130101",
                            "endDate": "20131231",
                            "030111": "60.00",
                            "AILERON": "",
                            "AURILLAC": "971.94",
                            "BRUL-05": "",
                            "CHAMALIERES": "18000.00",
                            "CHAMALIERE": "968.00",
                            "DBI0002": "100.80",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "3.98",
                            "EQT0012495": "3.98",
                            "EQT0012496": "3.98",
                            "EQTTCO": "104.96",
                            "PARIS": "",
                            "PARLAN": "4000.00"
                        },
                        {
                            "startDate": "20140101",
                            "endDate": "20141231",
                            "030111": "30.00",
                            "AILERON": "",
                            "AURILLAC": "1800.20",
                            "BRUL-05": "",
                            "CHAMALIERES": "9000.00",
                            "CHAMALIERE": "",
                            "DBI0002": "33.60",
                            "DUPAURI02": "2000.00",
                            "DUPAURI03": "2000.00",
                            "EQT0012494": "1.99",
                            "EQT0012495": "1.99",
                            "EQT0012496": "1.99",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": "3000.00"
                        },
                        {
                            "startDate": "20150101",
                            "endDate": "20151231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "31066.12",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        },
                        {
                            "startDate": "20160101",
                            "endDate": "20161231",
                            "030111": "",
                            "AILERON": "",
                            "AURILLAC": "4299.78",
                            "BRUL-05": "",
                            "CHAMALIERES": "",
                            "CHAMALIERE": "",
                            "DBI0002": "",
                            "DUPAURI02": "",
                            "DUPAURI03": "",
                            "EQT0012494": "",
                            "EQT0012495": "",
                            "EQT0012496": "",
                            "EQTTCO": "",
                            "PARIS": "",
                            "PARLAN": ""
                        }
                    ],
                    "colors": []
                },
                "indicatorId": 0
            }
        ],
        "defaultYAxis": "G",
        "colors": [
            "#F44336",
            "#E91E63",
            "#9C27B0",
            "#673AB7",
            "#3f51B5",
            "#2196F3",
            "#03A9F4",
            "#00BCD4",
            "#009688",
            "#4CAF50",
            "#8BC34A",
            "#CDDC39",
            "#FFEB3B",
            "#FFC107",
            "#FF9800"
        ]
    }

    dataGauge = {
        "precision": "0",
        "dataProvider": null,
        "value": "19",
        "thresholds": [
            {
                "min": 30,
                "max": 100,
                "color": "#CD5046"
            },
            {
                "min": 10,
                "max": 30,
                "color": "#FFBE0A"
            },
            {
                "min": 0,
                "max": 5,
                "color": "#00DCB6"
            },
            {
                "min": 5,
                "max": 10,
                "color": "#FFFFC2"
            }
        ],
        "minValue": "0",
        "maxValue": "100",
        "arrowColor": "#000000",
        "XMLIndData": {
            "BiblioType": "amcharts"
        }
    }

    dataRadar = {
        "precision": "0",
        "dataProvider": [
            {
                "0": "4",
                "??HEADER??": "ENVIRONNEMENT",
                "??HEADER_LABEL??": ""
            },
            {
                "0": "5",
                "??HEADER??": "ESTHETIQUE",
                "??HEADER_LABEL??": ""
            },
            {
                "0": "4",
                "??HEADER??": "PERFORMANCE",
                "??HEADER_LABEL??": ""
            },
            {
                "0": "5",
                "??HEADER??": "PRIX",
                "??HEADER_LABEL??": ""
            },
            {
                "0": "4",
                "??HEADER??": "QUALITE",
                "??HEADER_LABEL??": ""
            }
        ],
        "displayLegend": true,
        "legendNode": {},
        "categoryField": "??HEADER_LABEL??",
        "graphs": [
            {
                "thresholds": [],
                "unit": "",
                "title": "Test Crit??res d'appr??ciations",
                "color": "#2E4670",
                "valueField": "0",
                "indicatorId": 0
            }
        ],
        "XMLIndData": {
            "BiblioType": "amcharts"
        }
    }
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

