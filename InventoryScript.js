import NavBar from "@/components/NavBar.vue";
import json2 from '../warehouseCont/200@COMPANY_PRODUCTS.json';
import json from '../warehouseCont/2019-09@PRODUCTDATA.json';
import SampleJson from '../warehouseCont/2019.json';
import Chart from 'chart.js';

export default {
    data: function () {
        return {
            Sample:  SampleJson,
            myJSON2: json2,
            myJSON:  json,
            ArrayRainbow: [],
            filteredArr: [],
            checkitems: [],
            PlainData: [],
            datesNi: [],
            filler: [],
            cons: [],
            myPieChart: '',
            products: '',
            ShowThis: '',
            charts: ''
        }
    },
    mounted () {
      this.HulatTheChart();
    },
    methods: {
        getRandomColor: ()=> {
        var letters = '0123456789ABCDEF',
            color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        return color;
        },
        reload: function() {
            for(var a in this.filteredArr) {
                    this.filteredArr[a].borderColor = this.getRandomColor();
                    this.filteredArr[a].status = 'false';
                    this.charts.update();
            }
        },
        filter: function (prod) {
            var check = document.querySelectorAll('input[type=checkbox]:checked').length; 
            for(var i in this.filteredArr) {
                if(prod.target.id == this.filteredArr[i].label) {
                    if(prod.target.checked == true) {
                        this.filteredArr[i].borderColor = this.getRandomColor();
                        this.filteredArr[i].status = 'true';
                        this.charts.update();
                    }
                    else if(prod.target.checked == false) {
                        this.filteredArr[i].borderColor = 'whitesmoke';
                        this.filteredArr[i].status = 'false';
                        this.charts.update();
                    }
                }
                else if(this.filteredArr[i].status == 'true') {
                        this.filteredArr[i].borderColor = this.getRandomColor();
                        this.charts.update();
                }
                else{
                    if(this.filteredArr[i].status == 'false') {
                        this.filteredArr[i].borderColor = 'whitesmoke';
                        this.charts.update();
                    }
                }
                if(check == 0) {
                    this.filteredArr[i].borderColor = this.getRandomColor();
                    this.filteredArr[i].status = 'false';
                    this.filteredArr[i].borderWidth = 1;
                    this.charts.update();
                }
            }
        },
        load: function() {
            var loa =  document.getElementById('loads')
                loa.style.display = 'block'
        },
        unload: function() {
            var loa =  document.getElementById('loads')
                loa.style.display = 'none'
        },
        HulatTheChart : async function() {
            const Unahon = () =>{
                this.load();
                return new Promise((resolve, reject) => {
                    setTimeout(() =>{
                        resolve(this.chartThis())
                    }, 3000)
                })
            }
            await Unahon();
                this.unload();
        },
        chartThis: function() {
            var ctx = document.getElementById('chart').getContext('2d');
                
            var newJson = this.myJSON, 
                newJson2 = this.myJSON2,
                DatesData = [],
                containerID = [],
                str = 'Sep';
            
            for (var keys = 0 ; keys < newJson.length; keys++) {
                this.PlainData.push({
                    id:   newJson[keys].item_id,
                    date: newJson[keys].date,
                });
                DatesData.push(str + newJson[keys].date.slice(7,10));  
            }
            for (var x in newJson2.results) {
                var products = newJson2.results[x];
                for (var Property in products.product_skus) {
                    if (this.PlainData.indexOf(products.product_skus[Property].item_id) < 0) {   
                        containerID.push({              
                            CompanyProdId: products.product_skus[Property].item_id,
                            Retailer : products.product_skus[Property].retailer_url,
                            ItemName: products.product_skus[Property].item_name,
                            prodId: products.product_skus[Property].product
                        });
                    }
                }
            }
            var datass = [],
                date = [],
                ids = [],
                dataSet = [],
                chartArray = [],
                datesArray = [],
                idsArray = [],
                colorArray =[];
            for (var i in containerID) {
                var price =  Math.floor(Math.random() * 4500) + 500;
                for(var x in this.PlainData) {
                    if(containerID[i].CompanyProdId == this.PlainData[x].id) {
                        colorArray.push(this.getRandomColor());
                        ids.push(this.PlainData[x].id)
                        datass.push(price);
                        date.push(this.PlainData[x].date)
                        idsArray[i] = [ids];
                        //-- important ni sya 
                        chartArray[i] = [datass];
                        //-- kay sa sa imoha
                        datesArray[i] = [date];
                        dataSet.push({
                            ids:   containerID[i].CompanyProdId,
                            productID : containerID[i].prodId,
                            label: containerID[i].ItemName,
                            name:  containerID[i].Retailer, 
                            data: datass,
                            fill: false,
                            borderColor: this.getRandomColor(),
                            pointBackgroundColor: 'white',
                            pointBorderWidth: 1,
                            status: 'false',
                            pointHitRadius: 0.9,
                            fontColor: 'white',
                            lineTension: 0,
                            borderWidth: 2,
                        })
                    }
                }
                datass = [];
            date = [];
            }
            var seen = new Set();


            this.filteredArr = dataSet.filter(el => {
                const duplicate = seen.has(el.productID);
                seen.add(el.productID);
                return !duplicate;
            });
            this.cons = DatesData.filter((item, index) => DatesData.indexOf(item) === index);

            var s = this.cons;
                this.charts = new Chart(ctx,{  
                    type: 'line',
                    data: {
                        labels: s,
                        datasets: this.filteredArr,
                        fontColor: 'black'
                    },
                    options: {  
                        legend:{
                            labels:{
                                fontColor: 'black',
                                boxWidth: 5,
                                fontSize: 8,
                                padding: 3
                            },
                            display: false,
                            position: 'left',
                            responsive: false,
                            align: 'right',
                        },
                        tooltips: {
                            callbacks: {
                                title: function(tooltipItem, data) {
                                    return data['labels'][tooltipItem[0]['index']];
                                }
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    max: 5000,
                                    min: 500,
                                    stepSize: 550,
                                    fontSize: 9,
                                    fontColor: 'black',
                                    callback: function(value, index, values) {
                                        return '$' + value;
                                    }
                                },
                                gridLines: {
                                    color: 'rgb(238, 238, 238)'
                                },
                            }],
                            xAxes: [{
                                ticks: {
                                    max:  30,
                                    min:  1,
                                    stepSize: 1,
                                    fontColor: 'black',
                                    fontSize: 9
                                },
                                gridLines: {
                                    color: 'rgb(238, 238, 238)'
                                }
                            }]
                        },
                    },
                })           
            }
    },
    components:{
            NavBar  
    },
}