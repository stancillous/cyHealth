import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')


// let API_KEY='51f4c83034mshb76b94cb1a5ccdfp10d9e3jsn296bc6fe16c0';
// let countries=[];

// async function getCountries(){
//     try {

//         let response = await fetch('https://covid-193.p.rapidapi.com/countries',
//         {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': API_KEY,
//                 'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
//             }
//         })
//         let data = await response.json()
//         console.log(data)

//         for(let i of data.response){
//         countries.push(i)
//         }

//         let select = document.createElement('select')
//         select.setAttribute('id','select')
//         document.querySelector('#form').append(select)

//         for(let i=0;i<=countries.length-1;i++){
//             let countryOption =document.createElement('option')
//             countryOption.value = countries[i]
//             countryOption.textContent = countries[i]
//             select.append(countryOption)
            
//         }
//         } catch (error) {
//         console.log(error.message)

//         }

// }

// getCountries()