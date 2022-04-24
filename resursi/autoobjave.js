window.onload = () => {
    const objave = JSON.parse(data);
    const keys = Object.keys(objave);

    let elementi = document.getElementsByClassName("list");
    for (let i = 0; i < elementi.length; i++) {
        keys.forEach(key => { 
            elementi[i].innerHTML += "<div class=\"objava " + key + " \">";
        });
    }

    keys.forEach(key => { 
        let elementi = document.getElementsByClassName(key);
        for (let i = 0; i < elementi.length; i++) {
            elementi[i].innerHTML = "<img src=\"resursi/img/" + objave[key]['img'] + "\"><h2>" + objave[key]['naslov'] + "</h2><p>" + objave[key]['tekst'] + "</p>";
        }
    });
}