<template>
    
    <div v-show="countryName!=''" class="root-div">
        <div class="loading-div">
            <div class="img-div">
                <img src="../assets/loading.gif" alt="">

            </div>
        </div>

        <div class="hp-content">
            <div class="go-back-arrow">
            <router-link :to="{name:'home'}">
                <div class="arrow">
                </div>
            </router-link>

     
        </div>

        <section class="country-info-section">
            <div class="c-div">
                <div class="content-div">
                    <div class="country-div">
                        <h1 ref="countryName" class="country-name"></h1>
                        <div class="img-popln">
                            <img class="population-img" src="../assets/people.png" alt="population image">
                            <span ref="countryPopulation" class="total-population"></span>
                        </div>
                    </div>

                    <div class="addn">
                        <span ref="country" class="country-name"></span>
                        <span>,</span>
                        <span ref="continent" class="continent-name"></span>
                    </div>

                </div>
                
            </div>
        </section>


        <section class="table-section">

            <div class="table-container">
                <div class="table-container-content">
                    <div class="flex-wrapper">
        
                        <div class="table-info">
                            <h1 class="table-h">tests</h1>
                            <table class="tests-table">
                                <tr>
                                    <th class="table-header">total tests</th>
                                    <th class="table-header">1M/population</th>
                                </tr>
                                <tr>
                                    <td ref="totalTests" class="table-data"></td>
                                    <td ref="tests1M" class="table-data"></td>
                                </tr>
            
            
                            </table>
                        </div>
        
                        <div class="table-info">
                            <h1 class="table-h">cases</h1>
                            <table class="tests-table">
                                <tr>
                                    <th class="table-header">total cases</th>
                                    <th class="table-header">recovered</th>
                                    <th class="table-header">active cases</th>
                                    <th class="table-header">critical cases</th>
                                </tr>
                                <tr>
                                    <td ref="totalCases" class="table-data"></td>
                                    <td ref="recoveredCases" class="table-data"></td>
                                    <td ref="activeCases" class="table-data"></td>
                                    <td ref="criticalCases" class="table-data"></td>
                                </tr>
            
            
                            </table>
                        </div>
        
                        <div class="table-info">
                            <h1 class="table-h">deaths</h1>
                            <table class="tests-table">
                                <tr>
                                    <th class="table-header">total deaths</th>
                                    <th class="table-header">new deaths</th>
                                    <th class="table-header">1M/population</th>
                                </tr>
                                <tr>
                                    <td ref="totalDeaths" class="table-data"></td>
                                    <td ref="newDeaths" class="table-data"></td>
                                    <td ref="deaths1M" class="table-data"></td>
                                </tr>
            
            
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="show-hide-graph">
            <h1 class="hide-show-h">show country history graph</h1>

        </div>
        <div class="canvas">
            <canvas id="myChart"></canvas>
        </div>
        </div>


    </div>
</template>

<script>
    import Chart from 'chart.js/auto';  //IMPORTING THE CHART THAT WE INSTALLED WITH NPM 

    export default {
        name:'CountryStats',

        data(){
            return{
                countryName:this.$route.params.country,
                deaths:[],
                cases:[],
                tests:[],
                // labels:['2022-11-12','2022-11-13','2022-11-14','2022-11-15','2022-11-16']
                labels:[]
            }
        },

        inject:['API_KEY'],

        mounted(){
            this.getCountryStats()

        },
        methods:{
            async getCountryStats(){
                try {
                    let response = await fetch(`https://covid-193.p.rapidapi.com/history?country=${this.countryName}`,
                    {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': this.API_KEY,
                            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
                        }
                    })
                    let data = await response.json()

                    //APPEND TO COUNTRY INFO SECTION
                    this.$refs.country.textContent = data.response[0].country
                    this.$refs.countryName.textContent = data.response[0].country
                    this.$refs.continent.textContent = data.response[0].continent
       
                    //format country population
                    let countryPopulation = data.response[0].population
                    let internationalNumberFormat = new Intl.NumberFormat('en-US')
                    this.$refs.countryPopulation.textContent = internationalNumberFormat.format(countryPopulation)


                    //APPENDING CASES, DEATHS AND TESTS TO THE DOM
                    //tests
                    this.$refs.totalTests.textContent = internationalNumberFormat.format(data.response[0].tests.total)
                    this.$refs.tests1M.textContent =internationalNumberFormat.format(data.response[0].tests['1M_pop']) 
                    //cases
                    this.$refs.totalCases.textContent = internationalNumberFormat.format(data.response[0].cases.total)
                    this.$refs.recoveredCases.textContent =internationalNumberFormat.format(data.response[0].cases.recovered)
                    this.$refs.activeCases.textContent = internationalNumberFormat.format(data.response[0].cases.active)
                    this.$refs.criticalCases.textContent =internationalNumberFormat.format(data.response[0].cases.critical)
                    //deaths
                    this.$refs.newDeaths.textContent = internationalNumberFormat.format(data.response[0].deaths.new)
                    this.$refs.totalDeaths.textContent = internationalNumberFormat.format(data.response[0].deaths.total)
                    this.$refs.deaths1M.textContent = internationalNumberFormat.format(data.response[0].deaths['1M_pop'])

                    document.querySelector('.loading-div').classList.add('hide-loading-div')
                    document.querySelector('.hp-content').classList.add('show-page-content')
             
                    //chart
                    for(let index=0;index<6;index++){
                    this.deaths.push(data.response[index].deaths['1M_pop'])
                    this.cases.push(data.response[index].cases.new)
                    this.tests.push(data.response[index].tests['1M_pop']/100)
                    }

                    this.sfcFuncs()

             
                } catch (error) {
                    console.log(error)
                    console.log(error.message)
                }

            },

            drawChart(){

                const ctx = document.getElementById('myChart');
                Chart.defaults.color='black'
                Chart.defaults.font.size = 12;
                Chart.defaults.opacity = .8;
                Chart.defaults.font.weight = 400;
                Chart.defaults.font.family = 'EB Garamond';

                new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.labels,
                    datasets: [
                    {
                    label: 'tests:1M/population',
                    data:this.tests,
                    borderWidth: 1,
                    tension: .3

        
                    },
                    {
                    label: 'critical cases',
                    data:this.cases,
                    borderWidth: 1,
                    tension: .3

                    },
                    {
                    label: 'deaths:1M/population',
                    data:this.deaths,
                    borderWidth: 1,
                    tension: 3

                    },
                    
                    ]
                },
                
                options: {
                    responsive: true,
                    maintainAspectRatio:false,
                    aspectRatio:1|2,
                    scales: {

                        y: {
                            beginAtZero: true,
                            title: {
                                color: 'blue',
                                display: true,
                                text: 'Tests/ Cases/ Deaths'
                                }
                        },
                        x:{
                            title: {
                            color: 'blue',
                            display: true,
                            text: 'Days',
                            size:14
                            }
                        }
                    },
                    plugins:{
                            //THE LEGEND
                            legend:{ 
                                title:{

                                },
                                
                                labels:{
                                    fontcolor:'red',
                                    boxHeight:15,
                                    boxWidth:20,
                                    padding:15,

                                    font:{
                                        weight:800,
                                        size:13
                                    }
                                }
                            },

                            layout:{
                                padding:{
                                    left:8,
                                    top:10,
                    
                                }
                            },

                    },
                  }
                });
    

            },


            sfcFuncs(){
                let defArray = [1,2,3,4,5]
 
                let arr = [...defArray.keys()].map((index)=>{
                    const date = new Date()
                    date.setDate(date.getDate() - index);
                    let dateISO = date.toISOString()
                    let paramDate =  dateISO.slice(0,dateISO.indexOf('T'))
                    this.labels.push(paramDate)

                })
                console.log(arr.indexOf(9))
                this.labels.reverse()

                    this.drawChart()

                let hideGraphDiv = document.querySelector('.show-hide-graph')
                hideGraphDiv.addEventListener('click',()=>{
                    document.querySelector('.canvas').classList.toggle('show-graph')

                    if(document.querySelector('.canvas').classList.contains('show-graph'))
                    document.querySelector('.hide-show-h').textContent = 'hide country history graph'
                    else
                    document.querySelector('.hide-show-h').textContent = 'show country history graph'
                })
            }

            
        }
        
    }
</script>

<style lang="scss" scoped>
// $borderColors: gainsboro;
$borderColors: rgba(23, 82, 191, 0.379);
$web-color:rgb(23, 82, 191);



.loading-div{
    position: absolute;
    background-color: rgb(251, 251, 251);
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    .img-div{
        height: 100%;
        width: 100%;
        display: grid;
        place-items: center;
        img{
            width: 20rem;
        }
    }

}
//class to hide loading animation
.hide-loading-div{
    opacity: 0;
    transition: all .2s ease-in-out;
}
//initially hiding the page content
.hp-content{
    opacity: 0;
}
//class to show page content
.show-page-content{
    opacity: 1;
    transition: all .2s ease-in-out;
}

.go-back-arrow{
    position: absolute;
    top: 7%;
    left: 2%;

    .arrow {
        width: 0;
        height: 0;
        border-left: 17px solid transparent;
        border-right: 17px solid transparent;
        transform: rotate(-90deg);
        border-bottom: 17px solid rgba(23, 82, 191, 0.416);
    }
}

.country-info-section{
        max-width: 1000px;
        margin: 3rem auto;
        padding: 0 5rem;
        padding: 0 4rem 0 5rem;
        .c-div{
            .content-div{
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                border-bottom: 1px solid $borderColors ;
                .country-div{
                    .country-name{
                        font-weight: 900;
                        font-size: 3rem;
                        text-transform: uppercase;
                        color: $web-color;
                    }
                    
                    .img-popln{
                        display: flex;
                        align-items: center;
                        .population-img{
                            width: 2.4rem;
                            margin-right:1rem;
                        }
                        .total-population{
                            font-size: 1.6rem;
                            font-weight: 600;
                            opacity: .8;
                        }
                    }
                    
                }
                
                .addn{
                    padding-right: .5rem;
                    font-weight: 600;
                    .country-name, .continent-name{
                        white-space: nowrap;
                        opacity: .8;
                        text-transform: capitalize;
                        font-size: 1.5rem;
                        padding: 0 .2rem;
                    }
                }
            }
        }
}

.table-section{
    .table-container{
        .table-container-content{
            max-width: 1000px;
            display: grid;
            place-items: center;
            margin: 0 auto;
            .flex-wrapper{
                
                .table-info{
                    display: grid;
                    place-items: center;
                    margin: 1rem 0;
                    
                    .table-h{
                        padding: 1.1rem;
                        padding-top: 2rem;
                        font-size: 2.1rem;
                        opacity: .9;
                        text-align: center;
                        font-weight: bold;
                        text-transform: capitalize;
                        
                    }
                    .tests-table{
                        border: 1px solid $borderColors ;
                        padding: 1rem;
                        border-spacing: 0;
                        .table-header{
                            font-size: 1.6rem;
                            font-weight: 700;
                            opacity: .8;
                            border: 1px solid $borderColors ;
                            border-top: unset;
                            padding-bottom: 0.3rem;
                            padding-right: 1rem;
                            padding: 1rem;
                            margin-right: -2rem;
                            text-transform: capitalize;
                            text-align: center;
                        }
                        .table-data{
                            text-align: center;
                            font-weight: 500;
                            border-right: 1px solid $borderColors ;
                            border-left: 1px solid $borderColors ;
                            opacity: .9;
                            padding-top: 0.3rem;
                            padding: .3rem;
                            padding-bottom: 1rem;
                            font-size: 1.6rem;

                        }
                    }
                }

            }
        }
    }
}

.show-hide-graph{
    margin: 8rem 0;
    position: relative;
    cursor: pointer;

    h1{
        font-size: 1.8rem;
        font-weight: 600;
        color: $web-color;
        text-transform: capitalize;
        text-align: center;
        text-decoration: underline;
    }
}
.canvas{
        width: 100%;
        margin: 5rem auto;
        max-width: 1000px;
        padding: 0 1rem;
        height: 40rem;
        display: none;
}

//class to show the hidden graph
.show-graph{
    display: block;
}


@media screen and (max-width:510px) {
    .country-info-section .c-div .content-div{
        .country-div{
            .country-name{
                font-size: 2rem;
            }
            .img-popln .total-population{
                font-size: 1.3rem;
            }
        }

        .addn .country-name, .continent-name{
            font-size: 1.3rem;
        }
    } 

    .table-section .table-container .table-container-content .flex-wrapper .table-info{
        .table-h{
            font-size: 1.7rem;
        }
        .tests-table{
            .table-header{
                font-size: 1.4rem;
            }
            .table-data{
                font-size: 1.4rem;
            }
        }
    }
}

</style>
