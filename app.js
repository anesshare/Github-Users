const btn= document.querySelector(".btn");
const search = document.querySelector("#search");
const main = document.querySelector(".main")
const glavni = document.querySelector(".divzarep");

const Base_API = `https://api.github.com/users/`;


async function getData(username){
const data = await fetch(Base_API+ username);
    const resp = await data.json();
    return resp;
}
async function getRepos(username){
    const data = await fetch(Base_API + username + `/repos`);
    const resp = await data.json();
    return resp;
}
function showRepos(repos){
    let d = new Set(repos.slice(0, 5).map((item) => item.name));
    let headerCreated = false;
    d.forEach((el) => {
      let cardRep = document.createElement("div");
      cardRep.className = "cardRep";
      let ispis = document.createElement("p");
      ispis.textContent = el;
      if (!headerCreated) {
        let tekst = document.createElement("h1");
        tekst.innerHTML = "Repositories: " + "<br>";
        cardRep.appendChild(tekst);
        headerCreated = true;
      }
      cardRep.appendChild(ispis);
      glavni.appendChild(cardRep);
    });
  }

function showCard(login,followers,following,bio,img){
let card = document.createElement("div");
card.className = "card";

 let slika = document.createElement("img");
 slika.src = img;
 slika.className = "img";

let opis = document.createElement("p");
opis.innerHTML = (bio !== null) ? bio + "<br>" : "";


let prijava = document.createElement('p');
prijava.innerHTML = "Username: " + login +"<br>"

let pratioci = document.createElement('p');
pratioci = "Followers: " + followers;
pratioci.classList = "fol";

let prati = document.createElement('p');
prati = "  Following: " + following;
prati.classList = "fol";

main.append(card);
card.append(slika)
card.append(prijava);
card.append(opis);
card.append(pratioci);
card.append(prati);
}




btn.addEventListener("click",()=>{
    const user = search.value;
    getData(user).then((data)=>{
        console.log(data);
        main.innerHTML="";
        showCard(data.login,data.followers,data.following,data.bio,data.avatar_url);
    })
    getRepos(user).then((data)=>{
        glavni.innerHTML ="";
        showRepos(data);
    })
})


