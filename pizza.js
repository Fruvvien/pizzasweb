const url = "https://merlinvizsga.hu/api/pizza/pizza";
const vevoUrl= "https://merlinvizsga.hu/api/pizza/vevo";
document.addEventListener("DOMContentLoaded", () =>{
    const pizzak = document.getElementById("pizzak");
    const rendeles = document.getElementById("rendeles");
    const regisztracio = document.getElementById("regisztracio");
    const registrationForm = document.getElementById("registrationForm");
    
    let pizzaArray = [];
    displayNonePizzak();
    async function getDatas(){
        await fetch(url)
        .then(data => data.json())
        .then(values => makeCards(values))
    }
    const images = [
        {
            filepath: "./img/Capricciosa.png"
        },
        {
            filepath: "./img/Frutti_di_Mare.png"
        },
        {
            filepath: "./img/hawaii.png"
        },
        {
            filepath: "./img/Vesuvio.png"
        },
        {
            filepath: "./img/Sorrento.png"
        }
    ]

    getDatas();
    function makeCards(values){
        let cards = "";
        for (let index = 0; index < values.length; index++) {
            pizzaArray.push(values[index]);
            const element = values[index];
            let card= `
            <div class="card" style="width: 18rem;">
                <img src="${images[index].filepath}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${element.pnev}</h5>
                <p class="card-text">${element.par}</p>
                <button onclikc="order(${element.pazon})" class="btn btn-success">Rendelés</button>
                </div>
            </div>
            `

            cards+= card;
        };

        document.getElementById("mainDivForCards").innerHTML+= cards;
    }


    regisztracio.addEventListener("click", () =>{
        document.getElementById("mainDivForCards").style.display="none"
        /* document.getElementById("rendeles").style.display="none" */
        document.getElementById("registration").style.display="block"
    })

    pizzak.addEventListener("click", () =>{
        document.getElementById("mainDivForCards").style.display="flex"
        /* document.getElementById("rendeles").style.display="none" */
        document.getElementById("registration").style.display="none"
    })

    function displayNonePizzak(){
        document.getElementById("mainDivForCards").style.display="flex"
       /*  document.getElementById("rendeles").style.display="none" */
        document.getElementById("registration").style.display="none"
    }


    registrationForm.addEventListener("submit", (event) =>{
        event.preventDefault();
        const vnev = document.getElementById("vnev").value;
        const vcim = document.getElementById("vcim").value;

        const formData = {
            "vnev": vnev,
            "vcim": vcim
        }

        fetch(vevoUrl, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then(
            response =>{
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                alert("Sikeres regisztráció")
                return response.json();
            }
        )
        .then(newUserData =>{
            console.log(newUserData)
        })
    })


    function order(pazon){
        pizzaArray.forEach(element => {
            
        });
    }


})