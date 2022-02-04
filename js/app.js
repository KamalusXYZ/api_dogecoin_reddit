let entree = 0 /**** Variable qui viendra se concatener à l url de l API apres limit */

let compteur = 0 /**** Variable qui viendra se concatener à l url de l API apres skip, elle permet de skipper le nombre de message deja afficher, elle demarre a 0 et n'evolue qu'apres un premier 'submit' pour etre sur d'afficher au depart le premier message.   */

/**les selecteurs */
let page = document.querySelector('.page')
let envoyer = document.querySelector('#envoyer')

/***Fonction qui creer les div et remplit suivant les données recuperr dans les variable au dessus, cette function est rappelé plus bas (j'aurais pu optimiser le tout en un, mais je laisse comme ça par manque de tps) */
const generateurMessage = () => {



    fetch(`https://api.doge-meme.lol/v1/memes/?skip=${compteur}&limit=${entree}`)
        .then((request) => request.json())
        .then((data) => {
            
            for (i = 0; i < entree; ++i) {
                console.log(data)
                /**creation des elements (5 elements pour pouvoir afficher les données de la meme façon que sur l'ex.) */
                newDiv = document.createElement('div');
                newDiv2 = document.createElement('div');
                newDiv3 = document.createElement('div');
                newDiv4 = document.createElement('div');
                newDiv5 = document.createElement('div');

                /***affectation des classes aux elements plus haut */
                newDiv.className = 'box';
                newDiv2.className = 'date';
                newDiv3.className = 'auteur';
                newDiv4.className = 'header';
                newDiv5.className = 'contenu';

                /****appartion dans le html des DIV, et remplissage (avec inner) , dans un ordre precis, pour que les inner s'affiche bien */
                page.appendChild(newDiv)
                newDiv.appendChild(newDiv4)
                newDiv4.appendChild(newDiv2)
                newDiv4.appendChild(newDiv3)

                newDiv2.innerHTML = `Date de publication: <time> ${data.data[i].created} </time> `

                newDiv3.innerHTML = `Auteur: <span class="authorname"> ${data.data[i].author} </span> `

                newDiv.appendChild(newDiv5)

                newDiv5.innerHTML = `${data.data[i].submission_title} <br> <br>

                                     <a href="https://www.reddit.com${data.data[i].permalink}" target="_blank" >Lien vers reddit</a> `

            }

        })


}

/***Fonction  qui va recuperer la valeur de l'input, incrementer le compteur et lancer la fonction de creation plus haut */
const recupererInput = () => {


    entree = document.getElementById("nombre").value
    
if (entree !== null && entree !== '' && entree >0){

    console.log(entree)
    generateurMessage()
    compteur = compteur + parseInt(entree)
    console.log(compteur)

}
else {console.log("mauvaise saisi")}


}

envoyer.onclick = recupererInput


