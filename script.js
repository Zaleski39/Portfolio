
// Division de la vidéo en 2

    let acceuilVideo1 = document.getElementById('acceuilVideo1');
    let acceuilVideo2 = document.getElementById('acceuilVideo2');

    window.addEventListener('scroll', function(){
        acceuilVideo1.style.left = -window.pageYOffset+'px';
        acceuilVideo2.style.left = window.pageYOffset+'px';
    })


// Faire disparaitre boutonscroll au scroll

    window.addEventListener('scroll', function(){
        var a = document.getElementById('demo');
            a.className += ' hidden';   
        })

// Animation texte

    const txtAnim = document.querySelector ('h1');

    new Typewriter(txtAnim, {
        deleteSpeed : 30,
        loop: true,
        cursor: '',            
    })
    .changeDelay (30)
    .typeString('Salut c\'est Alexis, Developpeur Web Full Stack ')
    .pauseFor (1000)
    .typeString ('<span style="color: #EFD81D">JavaScript </span> ! ')
    .pauseFor (1000)
    .deleteChars (14)
    .typeString ('<span style="color: #858EBB">PHP </span> ! ')
    .pauseFor (1000)
    .deleteChars (8)
    .typeString ('<span style="color: #C5DADF">My </span> <span style="color: #EA8C10">SQL </span> ! ')
    .pauseFor (1000)
    .deleteChars (11)
    .typeString ('<span style="color: #3FB27F">Symfony </span> ! ')
    .pauseFor (1000)
    .deleteChars (12)
    .typeString ('<span style="color: #E86327">HTML </span> ! ')
    .pauseFor (1000)
    .deleteChars (8)
    .typeString ('<span style="color: #284DDD">CSS </span> ! ')
    .pauseFor (1000)
    .deleteChars (7)
    .start ()

// Animation ProgressBar, déclenchement si fentere visible

    ;(function($, win) {
        $.fn.inViewport = function(cb) {
        return this.each(function(i,el){
            function visPx(){
            var H = $(this).height(),
                r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
            return cb.call(el, Math.max(0, t>0? H-t : (b<H?b:H)));  
            } visPx();
            $(win).on("resize scroll", visPx);
        });
        };
    }(jQuery, window));        
    
    $(".percentagem").inViewport(function(px){
        if(px) $(this).addClass("lancerAnimation") ;
    });




// Bouton Batterie

    let boutonProjets = document.getElementById("boutonProjets");
    let boutonMusique = document.getElementById("boutonMusique");
    let projet =  document.getElementsByClassName("projet");
    let musique = document.getElementsByClassName("musique");
    let essai = "";


        for(let i=0 ; i<musique.length ; i++){   
            musique[i].style.display = "none";
        } 

        boutonProjets.addEventListener("click", () => {
            // Modifier la couleur du couton actif
                    boutonProjets.className += ' active1';
                    boutonMusique.classList.remove("active1");

            essai = "INACTIF";
                for(let i=0 ; i < projet.length ; i++){
                    projet[i].style.display = "block";
                    }
                // console.log(essai)
                for(let i=0 ; i<musique.length ; i++){   
                    musique[i].style.display = "none";
                }               
            })     

            var dejaJouer = 0;

            boutonMusique.addEventListener("click", () => {
                                
                // Modifier la couleur du couton actif
                    boutonProjets.classList.remove("active1");
                    boutonMusique.className += ' active1';  

                essai = "ACTIF";
                for(let i=0 ; i<projet.length ; i++){
                    projet[i].style.display = "none";
                    }
                    // console.log(essai)
                for(let i=0 ; i<musique.length ; i++){   
                    musique[i].style.display = "block";
                }    
               if (dejaJouer === 0) {
                document.body.classList.add("stop-scrolling");  
                document.getElementById("alerteJouer").style.display = "flex";               

               }
                setTimeout(() => {
                    // alert("Pour jouer, utiliser votre clavier ;-)")  
                  
                  }, 30)      
            }) 

            function jouerBatterie(){
                document.getElementById("alerteJouer").style.display = "none";  
                document.body.classList.remove("stop-scrolling");
                dejaJouer = 1;
            }

// Son Batterie
                
            function playSound(e) {
                const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); //sélecteur des audios     
                const key = document.querySelector(`div[data-key="${e.keyCode}"]`);  //sélecteur des divs
                // console.log(key);
                // console.log(audio);

                if (essai=="ACTIF")  { 
                    if (!audio) return;   // éviter les erreurs console   
                        key.classList.add('playing');   // ajouter la class playing   
                        audio.currentTime = 0;          // retour temps son à 0s
                        audio.play();                   // jouer le son
                    }
                }
                
                // enlever la class playing
            function removeTransition(e) {                    
                e.target.classList.remove('playing');     
                }         

            const keys = Array.from(document.querySelectorAll('.key')); // Créer tableau avec l'ensemble des divs key
            // console.log(keys);
            keys.forEach(key => key.ontransitionend = (removeTransition));  //ecoute élément tableau, appel fonction removeTransition à la fin de l'animation             
            window.addEventListener('keydown', playSound);