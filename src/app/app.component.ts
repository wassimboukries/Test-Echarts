import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { color } from 'echarts';
import * as moment from 'moment';
import { element } from 'protractor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'my-dream-app';
  currentType :string = 'line';
  types :Array<string> = ['line', 'bar', 'pie', 'radar', 'surface'];
  datas : Array<string> = ['data1', 'data3', 'data4', 'data5', 'data6'];
  currentData = 'data1';
  myChart : any;
  myChart2 : any;
  isLine : any = true;
  isCourbe : boolean = false;
  isStep : boolean = false;

  ngOnInit(){
    this.myChart = echarts.init(document.getElementById('main') as HTMLElement, undefined,{renderer: 'svg'});
    //this.myChart2 = echarts.init(document.getElementById('main2') as HTMLElement, undefined,{renderer: 'svg'});
    //console.log()
    this.render();
  }

  render() {

    var data :any;

    if (this.currentData === 'data1'){
        data = this.data1;
    }
    if (this.currentData === 'data3'){
        data = this.data3
    }
    if (this.currentData === 'data4'){
        data = this.data4
    }
    if (this.currentData === 'data5'){
        data = this.data5
    }
    if (this.currentData === 'data6'){
        data = this.data6
    }


    // specify chart configuration item and data
    var optionTest = {
        legend: {
            type : "scroll",
        },
        tooltip: {},
        //dimensions : 
        dataset: {
        // Provide data.
            source: [["Date"].concat(this.data3.graphs.map((element, index) => {return element.title})),
            this.data3.graphs.map((element, index) => {return Number(Object.values(this.data3.datas[0])[index+2])})]       //.indicator.lines.map((element, index) => { return [element.startDate.substring(0,4)+"-"+element.startDate.substring(4,6)+"-"+element.startDate.substring(6),Number(element.Total)] })
        },
        // Declare X axis, which is a category axis, mapping
        // to the first column by default.
        xAxis: {type: 'category'},
        // Declare Y axis, which is a value axis.
        yAxis: {},
        // Declare several series, each of them mapped to a
        // column of the dataset by default.
        series: this.data3.graphs.map((element, index) => { return {type : this.currentType, color : this.data3.colors[index]}})
    };

    let option : any= {
        title : { 
            text : data.label
        },

        tooltip: {
          trigger : 'item',
        },
        legend: {
            type : 'scroll',
            data: data.graphs.map((element: any) => element.title.toString()),
            top : 'bottom',
        },
    
        xAxis: {
            type: "category",
            data : data.datas.map((el:any) => el['§DATE§'].substring(0,4) + "-"+ el['§DATE§'].substring(4,6)+"-" + el['§DATE§'].substring(6)),
            axisLabel: {
                formatter: (function(value :any){
                    moment.locale('fr');
                    return moment(value).format('MMMM');
                })
            },
        },
        yAxis: {},
        
        series: data.graphs.map((element : any, index : number) => { var temp = element.valueField; return {
          name : element.title,
          type : this.currentType,
          data : Object.values(data.datas.map((element : any) => {return Number(element[temp])})),
          itemStyle : {
            color : data.colors[index]
          },
          smooth: this.isCourbe,
          step : this.isStep && "middle",
        };}),

        dataZoom : [
          {
              type: 'slider',
              yAxisIndex: [0],
          },
          {
            id: 'dataZoomY',
            type: 'inside',
            yAxisIndex: [0],
        },
        {
            type: 'inside',
            xAxisIndex: [0],
        },
      ],
    };

    var optionSurface = {
        title : { 
            text : data.label
        },

        tooltip: {
            trigger : 'item',
            //formatter : "<div style='margin: 0px 0 0;line-height:1;'><div style='font-size:14px;color:#666;font-weight:400;line-height:1;'>{b}</div><div style='margin: 10px 0 0;line-height:1;'><div style='margin: 0px 0 0;line-height:1;'><span style='display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#5470c6;'></span><span style='font-size:14px;color:#666;font-weight:400;margin-left:2px'>2013-06-01</span><span style='float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900'>{c} €</span><div style='clear:both'></div></div><div style='clear:both'></div></div><div style='clear:both'></div></div>",
            //alwaysShowContent : true,
            appendToBody :true,
            axisPointer : {type : 'line'},
        },

        legend : {
            type : 'scroll',
            top : "bottom",
            height : 100,
            //data: data.graphs.map((element : any) => element.title.toString())
        },

        xAxis: {
            type: 'category',
            data : data.datas.map((el : any) => { return el['§DATE§'].substring(0,4) + "-"+ el['§DATE§'].substring(4,6)+"-" + el['§DATE§'].substring(6)}),
            boundaryGap: false,
            axisLabel: {
                formatter: (function(value :any){
                    moment.locale('fr');
                    return moment(value).format('MMMM-YY');
                })
            },
        },

        yAxis: {
            type: 'value'
        },

        series: data.graphs.map((element : any, index : any) => { var temp = element.valueField; return {
            name : element.title,
            data: Object.values(data.datas.map((el : any) => { return Number(el[temp]) })),
            type: 'line',
            areaStyle: {},
            color : data.colors[index],
        };}),
    }

    var pos = [0,33.333,66.6666];
    var optionPie ={
        tooltip: {
            trigger : 'item',
          },
          legend: {
              type : 'scroll',
              //data: this.data3.graphs.map(element => element.title.toString()),
          },

          series: data.graphs.map((element : any, index : any) => { var temp = element.valueField; return {
            type : "pie",
            name : element.title,
            radius : '25%',
            center: ['50%', '50%'],
            left: pos[index]+'%',
            right: pos[index-pos.length -1]+'%',
            data :  Object.values(data.datas.map((el : any) => { return {value : Number(el[temp]), name : el['§DATE§'].substring(0,4) + "-"+ el['§DATE§'].substring(4,6)+"-" + el['§DATE§'].substring(6)}})), //{ value : Object.values(element.indicator.lines[0])[index+2], name :element.title}}),
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx : any) {
                return Math.random() * 200;
            }
          }}),
    };

    var optionRadar = {
        tooltip: {
            trigger : 'item',
        },
        legend: {
            type : 'scroll',
            data: ["7 avril 2021"],
            position : 'buttom'
        },
        radar : {
            indicator : this.data1.graphs.map((element, index) => { return {name : element.title, max: Object.values(element.indicator.lines[0])[2]}}),

        },
        series: [{
            name: 'Lignes par table',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [{value : this.data1.graphs.map((element, index) => Object.values(element.indicator.lines[0])[index+2]), name:"7 avril 2021"}],
        }]
          
    }
    // use configuration item and data specified to show chart
    
    if (this.currentType === "pie")
        option = optionPie;
    if (this.currentType === "radar")
        option = optionRadar;
    if (this.currentType === "surface")
        option = optionSurface;
    console.log(option);
    this.myChart.clear();//this.myChart2.clear();
    this.myChart.setOption(option);
    //this.myChart2.setOption(optionTest);
    //console.log(getKeyValue("name")(test));
    //console.log(Object.values(this.data.graphs[0].indicator.lines[0])[2]);
  }

  changeType() : void {
    if (this.currentType === "line")
        this.isLine = true;
    else
        this.isLine = false;
    this.render();
  }

  changeData() : void {
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
            "label": "Année"
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
            "label": "GTMED-Détails d'une mise en forme"
        },
        {
            "id": "gatpr",
            "label": "GATPR-Trace des personnalisations ouvertes"
        },
        {
            "id": "gttde",
            "label": "GTTDE-Evènements enregistrés"
        },
        {
            "id": "sgruc",
            "label": "SGRUC-Rubriques de commandes"
        },
        {
            "id": "qlech",
            "label": "QLECH-Echéance"
        },
        {
            "id": "garef",
            "label": "GAREF-Référencements des requêtes et libellés d'une transaction"
        },
        {
            "id": "gaflc",
            "label": "GAFLC-Caractéristiques personnalisables des champs"
        },
        {
            "id": "gtdft",
            "label": "GTDFT-Valeurs par défaut"
        },
        {
            "id": "gtctr",
            "label": "GTCTR-Critères de soumission des traitements"
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
            "label": "OECAD-Détails du calendrier"
        },
        {
            "id": "gtlil",
            "label": "GTLIL-Liens des libellés"
        },
        {
            "id": "oehec",
            "label": "OEHEC-Historique des étapes par classe"
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
            "label": "GTPRC-Dictionnaire des procédures Qualiac"
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
            "§DATE§": "20210407",
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
            "title": "GTMED-Détails d'une mise en forme",
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
            "title": "GTTDE-Evènements enregistrés",
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
            "title": "QLECH-Echéance",
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
            "title": "GAREF-Référencements des requêtes et libellés d'une transaction",
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
            "title": "GAFLC-Caractéristiques personnalisables des champs",
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
            "title": "GTDFT-Valeurs par défaut",
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
            "title": "GTCTR-Critères de soumission des traitements",
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
            "title": "OECAD-Détails du calendrier",
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
            "title": "GTLIL-Liens des libellés",
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
            "title": "OEHEC-Historique des étapes par classe",
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
            "title": "GTPRC-Dictionnaire des procédures Qualiac",
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
    "label": "Test : Activités mensuelles 2011 - 2012 - 2013",
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
            "label": "Année"
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
            "label": "Activité"
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
            "libind": "Test Activités mensuelles 2011",
            "libuni": "k€",
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
            "libind": "Test Activités mensuelles 2012",
            "libuni": "k€",
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
            "libind": "Test Activités mensuelles 2013",
            "libuni": "k€",
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
            "§DATE§": "20110101",
            "Total_0": "3117.865"
        },
        {
            "qStartDate": "20110401",
            "qEndDate": "20110630",
            "§DATE§": "20110401",
            "Total_0": "3500.8350499999997"
        },
        {
            "qStartDate": "20110701",
            "qEndDate": "20110930",
            "§DATE§": "20110701",
            "Total_0": "3813.8062099999997"
        },
        {
            "qStartDate": "20111001",
            "qEndDate": "20111231",
            "§DATE§": "20111001",
            "Total_0": "3970.77775"
        },
        {
            "qStartDate": "20130101",
            "qEndDate": "20130331",
            "§DATE§": "20130101",
            "Total_2": "3369.8955699999997"
        },
        {
            "qStartDate": "20130401",
            "qEndDate": "20130630",
            "§DATE§": "20130401",
            "Total_2": "1572.41544"
        }
    ],
    "graphs": [
        {
            "valueField": "Total_0",
            "title": "Test Activités mensuelles 2011",
            "indicator": {
                "numind": "QINFERENCESRVDEVDVT14",
                "docind": "indoct_qi14.html",
                "appind": "OCT",
                "graph": "column",
                "libind": "Test Activités mensuelles 2011",
                "libuni": "k€",
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
            "title": "Test Activités mensuelles 2012",
            "indicator": {
                "numind": "QINFERENCESRVDEVDVT15",
                "docind": "indoct_qi15.html",
                "appind": "OCT",
                "graph": "column",
                "libind": "Test Activités mensuelles 2012",
                "libuni": "k€",
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
            "title": "Test Activités mensuelles 2013",
            "indicator": {
                "numind": "QINFERENCESRVDEVDVT19",
                "docind": "indoct_qi19.html",
                "appind": "OCT",
                "graph": "column",
                "libind": "Test Activités mensuelles 2013",
                "libuni": "k€",
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
                "label": "Année"
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
                "libuni": "€",
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
                "§DATE§": "20130101",
                "Total_0": "3224100"
            },
            {
                "qStartDate": "20130201",
                "qEndDate": "20130228",
                "§DATE§": "20130201",
                "Total_0": "1917900"
            },
            {
                "qStartDate": "20130301",
                "qEndDate": "20130331",
                "§DATE§": "20130301",
                "Total_0": "2846700"
            },
            {
                "qStartDate": "20130401",
                "qEndDate": "20130430",
                "§DATE§": "20130401",
                "Total_0": "3224100"
            },
            {
                "qStartDate": "20130501",
                "qEndDate": "20130531",
                "§DATE§": "20130501",
                "Total_0": "4554300"
            },
            {
                "qStartDate": "20130601",
                "qEndDate": "20130630",
                "§DATE§": "20130601",
                "Total_0": "4945100"
            },
            {
                "qStartDate": "20130701",
                "qEndDate": "20130731",
                "§DATE§": "20130701",
                "Total_0": "3224100"
            },
            {
                "qStartDate": "20130801",
                "qEndDate": "20130831",
                "§DATE§": "20130801",
                "Total_0": "1917900"
            },
            {
                "qStartDate": "20130901",
                "qEndDate": "20130930",
                "§DATE§": "20130901",
                "Total_0": "6251200"
            },
            {
                "qStartDate": "20131001",
                "qEndDate": "20131031",
                "§DATE§": "20131001",
                "Total_0": "7958900"
            },
            {
                "qStartDate": "20131101",
                "qEndDate": "20131130",
                "§DATE§": "20131101",
                "Total_0": "4945100"
            },
            {
                "qStartDate": "20131201",
                "qEndDate": "20131231",
                "§DATE§": "20131201",
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
                    "libuni": "€",
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
                "§DATE§": "20130101",
                "Total_0": "3224100"
            },
            {
                "qStartDate": "20130201",
                "qEndDate": "20130228",
                "§DATE§": "20130201",
                "Total_0": "1917900",
                "§EVOLUTION§Total_0": "\n(-40.51%)"
            },
            {
                "qStartDate": "20130301",
                "qEndDate": "20130331",
                "§DATE§": "20130301",
                "Total_0": "2846700",
                "§EVOLUTION§Total_0": "\n(+48.43%)"
            },
            {
                "qStartDate": "20130401",
                "qEndDate": "20130430",
                "§DATE§": "20130401",
                "Total_0": "3224100",
                "§EVOLUTION§Total_0": "\n(+13.26%)"
            },
            {
                "qStartDate": "20130501",
                "qEndDate": "20130531",
                "§DATE§": "20130501",
                "Total_0": "4554300",
                "§EVOLUTION§Total_0": "\n(+41.26%)"
            },
            {
                "qStartDate": "20130601",
                "qEndDate": "20130630",
                "§DATE§": "20130601",
                "Total_0": "4945100",
                "§EVOLUTION§Total_0": "\n(+8.58%)"
            },
            {
                "qStartDate": "20130701",
                "qEndDate": "20130731",
                "§DATE§": "20130701",
                "Total_0": "3224100",
                "§EVOLUTION§Total_0": "\n(-34.8%)"
            },
            {
                "qStartDate": "20130801",
                "qEndDate": "20130831",
                "§DATE§": "20130801",
                "Total_0": "1917900",
                "§EVOLUTION§Total_0": "\n(-40.51%)"
            },
            {
                "qStartDate": "20130901",
                "qEndDate": "20130930",
                "§DATE§": "20130901",
                "Total_0": "6251200",
                "§EVOLUTION§Total_0": "\n(+225.94%)"
            },
            {
                "qStartDate": "20131001",
                "qEndDate": "20131031",
                "§DATE§": "20131001",
                "Total_0": "7958900",
                "§EVOLUTION§Total_0": "\n(+27.32%)"
            },
            {
                "qStartDate": "20131101",
                "qEndDate": "20131130",
                "§DATE§": "20131101",
                "Total_0": "4945100",
                "§EVOLUTION§Total_0": "\n(-37.87%)"
            },
            {
                "qStartDate": "20131201",
                "qEndDate": "20131231",
                "§DATE§": "20131201",
                "Total_0": "3224100",
                "§EVOLUTION§Total_0": "\n(-34.8%)"
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
        "categoryField": "§DATE§",
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
                "balloonText": "Statistiques des ventes : [[value]] €[[§EVOLUTION§Total_0]]",
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
        "label": "Test : Activités mensuelles 2011 - 2012 - 2013",
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
                "label": "Année"
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
                "label": "Activité"
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
                "libind": "Test Activités mensuelles 2011",
                "libuni": "k€",
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
                "libind": "Test Activités mensuelles 2012",
                "libuni": "k€",
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
                "libind": "Test Activités mensuelles 2013",
                "libuni": "k€",
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
                "§DATE§": "20110101",
                "Total_0": "3117.865"
            },
            {
                "qStartDate": "20110401",
                "qEndDate": "20110630",
                "§DATE§": "20110401",
                "Total_0": "3500.8350499999997"
            },
            {
                "qStartDate": "20110701",
                "qEndDate": "20110930",
                "§DATE§": "20110701",
                "Total_0": "3813.8062099999997"
            },
            {
                "qStartDate": "20111001",
                "qEndDate": "20111231",
                "§DATE§": "20111001",
                "Total_0": "3970.77775"
            },
            {
                "qStartDate": "20130101",
                "qEndDate": "20130331",
                "§DATE§": "20130101",
                "Total_2": "3369.8955699999997"
            },
            {
                "qStartDate": "20130401",
                "qEndDate": "20130630",
                "§DATE§": "20130401",
                "Total_2": "1572.41544"
            }
        ],
        "graphs": [
            {
                "valueField": "Total_0",
                "title": "Test Activités mensuelles 2011",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT14",
                    "docind": "indoct_qi14.html",
                    "appind": "OCT",
                    "graph": "column",
                    "libind": "Test Activités mensuelles 2011",
                    "libuni": "k€",
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
                "title": "Test Activités mensuelles 2012",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT15",
                    "docind": "indoct_qi15.html",
                    "appind": "OCT",
                    "graph": "column",
                    "libind": "Test Activités mensuelles 2012",
                    "libuni": "k€",
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
                "title": "Test Activités mensuelles 2013",
                "indicator": {
                    "numind": "QINFERENCESRVDEVDVT19",
                    "docind": "indoct_qi19.html",
                    "appind": "OCT",
                    "graph": "column",
                    "libind": "Test Activités mensuelles 2013",
                    "libuni": "k€",
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

    data5 ={
        "root": {},
        "data": {},
        "meta": {},
        "metaGlobal": {},
        "label": "Test objectif & réalisé",
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
                "label": "Année"
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
                "label": "Département"
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
                "libuni": "€",
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
                "libuni": "€",
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
                "§DATE§": "20120101",
                "Total_0": "835333"
            },
            {
                "qStartDate": "20120201",
                "qEndDate": "20120229",
                "§DATE§": "20120201",
                "Total_0": "997363"
            },
            {
                "qStartDate": "20120301",
                "qEndDate": "20120331",
                "§DATE§": "20120301",
                "Total_0": "693900"
            },
            {
                "qStartDate": "20120401",
                "qEndDate": "20120430",
                "§DATE§": "20120401",
                "Total_0": "848495"
            },
            {
                "qStartDate": "20120501",
                "qEndDate": "20120531",
                "§DATE§": "20120501",
                "Total_0": "1027590"
            },
            {
                "qStartDate": "20120601",
                "qEndDate": "20120630",
                "§DATE§": "20120601",
                "Total_0": "1064092"
            },
            {
                "qStartDate": "20120701",
                "qEndDate": "20120731",
                "§DATE§": "20120701",
                "Total_0": "866501"
            },
            {
                "qStartDate": "20120801",
                "qEndDate": "20120831",
                "§DATE§": "20120801",
                "Total_0": "614479"
            },
            {
                "qStartDate": "20120901",
                "qEndDate": "20120930",
                "§DATE§": "20120901",
                "Total_0": "787959"
            },
            {
                "qStartDate": "20121001",
                "qEndDate": "20121031",
                "§DATE§": "20121001",
                "Total_0": "871503"
            },
            {
                "qStartDate": "20121101",
                "qEndDate": "20121130",
                "§DATE§": "20121101",
                "Total_0": "1075104"
            },
            {
                "qStartDate": "20121201",
                "qEndDate": "20121231",
                "§DATE§": "20121201",
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
                    "libuni": "€",
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
                    "libuni": "€",
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
                "label": "Année"
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
                "label": "Département"
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
                "libuni": "k€",
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
                "libuni": "k€",
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
                "§DATE§": "20120101",
                "Total_0": "835.332966"
            },
            {
                "qStartDate": "20120201",
                "qEndDate": "20120229",
                "§DATE§": "20120201",
                "Total_0": "997.362864"
            },
            {
                "qStartDate": "20120301",
                "qEndDate": "20120331",
                "§DATE§": "20120301",
                "Total_0": "693.899667"
            },
            {
                "qStartDate": "20120401",
                "qEndDate": "20120430",
                "§DATE§": "20120401",
                "Total_0": "848.495277"
            },
            {
                "qStartDate": "20120501",
                "qEndDate": "20120531",
                "§DATE§": "20120501",
                "Total_0": "1027.5895620000001"
            },
            {
                "qStartDate": "20120601",
                "qEndDate": "20120630",
                "§DATE§": "20120601",
                "Total_0": "1064.09241"
            },
            {
                "qStartDate": "20120701",
                "qEndDate": "20120731",
                "§DATE§": "20120701",
                "Total_0": "866.500938"
            },
            {
                "qStartDate": "20120801",
                "qEndDate": "20120831",
                "§DATE§": "20120801",
                "Total_0": "614.4788249999999"
            },
            {
                "qStartDate": "20120901",
                "qEndDate": "20120930",
                "§DATE§": "20120901",
                "Total_0": "787.959063"
            },
            {
                "qStartDate": "20121001",
                "qEndDate": "20121031",
                "§DATE§": "20121001",
                "Total_0": "871.502616"
            },
            {
                "qStartDate": "20121101",
                "qEndDate": "20121130",
                "§DATE§": "20121101",
                "Total_0": "1075.103586"
            },
            {
                "qStartDate": "20121201",
                "qEndDate": "20121231",
                "§DATE§": "20121201",
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
                    "libuni": "k€",
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
                    "libuni": "k€",
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
}
