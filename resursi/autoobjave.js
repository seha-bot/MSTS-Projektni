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
        komentari += "<p>" + sessionStorage.getItem(i.toString()) + "</p>";
        sidekomentari += "<p>Anonimni korisnik: \"<span style=\"color: #F3BF10;\"> " + sessionStorage.getItem(i.toString()) + " </span>\"</p>";
    }
    if(sekcija.length != 0) sekcija[0].innerHTML = komentari + sekcija[0].innerHTML;
    if(sidesekcija.length != 0) sidesekcija[0].innerHTML += sidekomentari;

    //Objave
    const keys = Object.keys(objave);

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
            elementi[i].innerHTML += "<div class=\"objava " + key + " \">";
        });
    }
    
    keys.forEach(key => {
        let elementi = document.getElementsByClassName(key);
        for (let i = 0; i < elementi.length; i++) {
            elementi[i].innerHTML = "<img src=\"resursi/img/" + objave[key]['img'] + "\"><div><a href=\"#\" onclick=\"openpage('" + key + "');\">" + objave[key]['naslov'] + "</a><p>" + objave[key]['tekst'] + "</p><a href=\"#\" onclick=\"openpage('" + key + "');\" style=\"font-size:15px;\">Read More</a></div>";
        }
    });
}