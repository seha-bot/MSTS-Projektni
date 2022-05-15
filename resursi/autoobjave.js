function openpage(page)
{
    sessionStorage.setItem("page", page);
    location.href = "objava.html";
}

function komentarisi()
{
    let comment_ID = parseInt(sessionStorage.getItem("comment_ID"));
    sessionStorage.setItem(comment_ID, document.getElementById("komentar").value);
    sessionStorage.setItem("comment_ID", (comment_ID + 1).toString());
}

function contains(s1, s2, c1 = 0, c2 = 0)
{
    if(c2 == s2.length) return true;
    if(c1 == s1.length || s2.length > s1.length) return false;
  
    if(s1[c1].toString().toLowerCase() == s2[c2].toString().toLowerCase()) return contains(s1, s2, c1 + 1, c2 + 1);
    else if(s1[c1] == s2[0]) return contains(s1, s2, c1, 0);
    else return contains(s1, s2, c1 + 1, 0);
}

function search()
{
    if(!contains(location.href, "index.html")) location.href = "index.html";
    let value = document.getElementById("search").value;

    let keys = Object.keys(objave);
    let elementi = document.getElementsByClassName("list");
    for (let i = 0; i < elementi.length; i++) elementi[i].innerHTML = "";

    for (let i = 0; i < elementi.length; i++) {
        keys.forEach(key => {
            if(contains(objave[key]['naslov'], value))
                elementi[i].innerHTML += "<div class=\"objava " + key + "\">";
        });
    }
    
    keys.forEach(key => {
        let elementi = document.getElementsByClassName(key);
        for (let i = 0; i < elementi.length; i++) {
            elementi[i].innerHTML = "<img src=\"resursi/img/" + objave[key]['img'] + "\"><div><a href=\"#\" onclick=\"openpage('" + key + "');\">" + objave[key]['naslov'] + "</a><p>" + objave[key]['tekst'] + "</p><a href=\"#\" onclick=\"openpage('" + key + "');\" style=\"font-size:15px;\">Pročitaj Više</a></div>";
        }
    });
}

window.onload = () => {
    //Sat
    let danas = new Date();
	let godina = danas.getFullYear();
	let mjeseci = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
	let mjesec = mjeseci[danas.getMonth()];
    let dan = danas.getDate();
    if(document.getElementById("datum")) document.getElementById("datum").innerHTML = dan + ". " + mjesec + ", " + godina;
    
    //Komentari
    if(sessionStorage.getItem("comment_ID") == null) sessionStorage.setItem("comment_ID", "0");
    let comment_ID = parseInt(sessionStorage.getItem("comment_ID"));

    let sekcija = document.getElementsByClassName("komentari");
    let sidesekcija = document.getElementsByClassName("more");
    let komentari = "";
    let sidekomentari = "";
    for(let i = 0; i < comment_ID; i++)
    {
        komentari += "<p><span style=\"color: #F3BF10;\">Anonimni korisnik:</span><br>" + sessionStorage.getItem(i.toString()) + "</p>";
        sidekomentari += "<p>Anonimni korisnik: \"<span style=\"color: #F3BF10;\"> " + sessionStorage.getItem(i.toString()) + " </span>\"</p>";
    }
    if(sekcija.length != 0) sekcija[0].innerHTML = komentari + sekcija[0].innerHTML;
    if(sidesekcija.length != 0) sidesekcija[0].innerHTML += sidekomentari;

    //Objave
    let keys = Object.keys(objave);

    let autopage = document.getElementsByClassName("load");
    if(autopage.length > 0)
    {
        autopage[0].classList.add(sessionStorage.getItem("page"));
        autopage[0].classList.remove("objava");
        
        keys.forEach(key => {
            let elementi = document.getElementsByClassName(key);
            for (let i = 0; i < elementi.length; i++) {
                elementi[i].innerHTML = "<h2>" + objave[key]['naslov'] + "</h2><img src=\"resursi/img/" + objave[key]['img'] + "\"><p>" + objave[key]['tekst'] + "</p>";
            }
        });
        return;
    }
    
    let elementi = document.getElementsByClassName("list");
    for (let i = 0; i < elementi.length; i++) {
        keys.forEach(key => {
            elementi[i].innerHTML += "<div class=\"objava " + key + "\">";
        });
    }
    
    keys.forEach(key => {
        let elementi = document.getElementsByClassName(key);
        for (let i = 0; i < elementi.length; i++) {
            elementi[i].innerHTML = "<img src=\"resursi/img/" + objave[key]['img'] + "\"><div><a href=\"#\" onclick=\"openpage('" + key + "');\">" + objave[key]['naslov'] + "</a><p>" + objave[key]['tekst'] + "</p><a href=\"#\" onclick=\"openpage('" + key + "');\" style=\"font-size:15px;\">Pročitaj Više</a></div>";
        }
    });
}

var brojac = 1;
setInterval(function(){
    document.getElementById('radio' + brojac).checked = true;
    brojac++;
    if(brojac > 4){
        brojac = 1;
    }
}, 5000);