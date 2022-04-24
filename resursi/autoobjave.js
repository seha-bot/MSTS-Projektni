function openpage(page)
{
    sessionStorage.setItem("page", page);
    location.href = "objava.html";
}

window.onload = () => {
    const objave = JSON.parse(data);
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