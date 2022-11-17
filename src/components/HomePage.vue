<template>
    <div>

        <section class="top">
            <div class="t-container">
                <div class="t-content">
                    <h1>CyHealth Covid-19 Analysis</h1>
                    <p>An easy and simple way to get Covid-19 analysis for any country</p>
                </div>
            </div>
        </section>
        <section class="form-section">
        <div class="form-container">
            <form action="" id="form">
                <select name="select" id="select"></select>
            </form>
      
            <router-link :to="{name:'country-statistics',params:{country:this.selectedCountry}}">
                <button @click="getSelectedCountry()" class="select-country">proceed</button>
            </router-link>
        </div>
    </section>
    </div>
</template>

<script>
    export default {
        name:'HomePage',
        data(){
            return{
                selectedCountry:'afghanistan',
                countries:[],
                deaths:[]

            }
        },

        mounted(){
            this.getCountries()
        },
        inject:['API_KEY'],

        methods:{
            getSelectedCountry(){

                let select = document.querySelector('#select')
                this.selectedCountry = select.value


                
                
            },
            async getCountries(){
                try {

                    let response = await fetch('https://covid-193.p.rapidapi.com/countries',
                    {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': this.API_KEY,
                            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
                        }
                    })
                    let data = await response.json()


                    for(let i of data.response){
                        this.countries.push(i)
                    }

                    // let select = document.createElement('select')
                    let select = document.querySelector('#select')
                    select.setAttribute('id','select')
                    document.querySelector('#form').append(select)

                    for(let i=0;i<=this.countries.length-1;i++){
                        let countryOption =document.createElement('option')
                        countryOption.value = this.countries[i]
                        countryOption.textContent = this.countries[i]
                        select.append(countryOption)
                        
                    }
                    } catch (error) {
                    console.log(error.message)

                    }

            },

            async drawChart(){
                let response = await fetch('https://covid-193.p.rapidapi.com/countries',
                    {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': this.API_KEY,
                            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
                        }
                    })
                let data = await response.json()
                console.log(data)


                for(let index=0;index<8;index++){
                    this.deaths.push(data.response[index].deaths.total)

                }
                console.log(this.deaths)
            }
        }
        
    }
</script>

<style lang="scss" scoped>
$web-color:rgb(23, 82, 191);
.top{
    margin: 3rem 1rem;
    .t-container{
        .t-content{
            text-align: center;
            h1{
                font-weight: 700;
                font-size: 3rem;
                color:$web-color;
            }
            p{
                font-size: 1.6rem;
                font-weight:400;
                color: $web-color;
                opacity: .9;
                padding: 1rem 0;
                border-bottom: 1px solid rgba(23, 82, 191, 0.238);
            }
        }
    }
}

.form-section{
    display: grid;
    place-items: center;
        .form-container{
            display: flex;
            margin-top: 7rem;
            align-items: center;
            #form{
                #select{
                    background-color: white;
                    color: black;
                    font-weight: 700;
                    font-size: 1.5rem;
                    padding: .8rem 1rem;
                }
            }

            //button
            .select-country{
                all: unset;
                font-weight: bold;
                cursor: pointer;
                font-size: 1.3rem;
                text-transform: uppercase;
                padding: 1.2rem 2rem;
                border-radius: .2rem;
                margin-left: 2rem;
                background-color: $web-color;
                color: rgb(255, 255, 255);
            }
        }
}

</style>