function Disparo() {

    this.disparaProjetil = function (nave_original, objeto, nave_objeto) {
        var div = document.createElement('div');
        var nave = objeto.substr(1);
        
        if (nave === 'nave_vermelha') {
            div.setAttribute('class', 'projetil_vermelho');
            div.setAttribute('id', 'projetil_vermelho');
            div.style.backgroundImage = 'url(img/fire.png)';
            var disparo_audio = document.getElementById("audio_disparo_vermelha");
        }        

        if (nave === 'nave_cinza') {
            div.setAttribute('class', 'projetil_cinza');
            div.setAttribute('id', 'projetil_cinza');
            div.style.backgroundImage = 'url(img/fire_cinza.png)';
            disparo_audio = document.getElementById("audio_disparo_cinza");
        }

        disparo_audio.volume = 0.5;

        var elem = document.getElementById(nave);
        cssObj = window.getComputedStyle(elem, null);
        cssObjProp = cssObj.item(225);
        var matriz = cssObj.getPropertyValue(cssObjProp);
        var sem_texto = matriz.split("(");
        var valores_matriz = sem_texto[1].split(",", 4);

        var a = valores_matriz[0];
        var b = valores_matriz[1];
        var c = valores_matriz[2];
        var d = valores_matriz[3];

        var scale = Math.sqrt(a * a + b * b);
        var sin = b / scale;
        var angulo = Math.round(Math.atan2(b, a) * (180 / Math.PI));


        var posicao = $(objeto).offset();
        var cima;
        var esq;
        var final;



        //norte
        if (angulo >= -22 && angulo <= 22) {
            cima = Math.floor(posicao.top);
            esq = Math.floor(posicao.left) + 45;
            final = -50;
            div.style.left = esq + 'px';
            div.style.top = cima + 'px';
            document.getElementById('corpo').appendChild(div);
            if (nave === 'nave_cinza') {
                var projetil = '.projetil_cinza';
                nave_original.animaObjetoCinza(projetil, 400, [final, esq], nave_objeto);
            } else {
                var projetil = '.projetil_vermelho';
                nave_original.animaObjetoVermelha(projetil, 400, [final, esq], nave_objeto);
            }

        }

        //nordeste
        else if (angulo >= 23 && angulo <= 68) {
            cima = Math.floor(posicao.top);
            esq = Math.floor(posicao.left) + 100;
            final = -50;
            div.style.left = esq + 'px';
            div.style.top = cima + 'px';
            document.getElementById('corpo').appendChild(div);
            
            if (nave === 'nave_cinza') {
                var projetil = '.projetil_cinza';
                nave_original.animaObjetoCinza(projetil, 400, [final, 2 * esq], nave_objeto);
            } else {
                var projetil = '.projetil_vermelho';
                nave_original.animaObjetoVermelha(projetil, 400, [final, 2 * esq], nave_objeto);
            }
        }

        //leste
        else if (angulo >= 69 && angulo <= 114) {
            cima = Math.floor(posicao.top) + 60;
            esq = Math.floor(posicao.left) + 115;
            final = 2000;
            div.style.left = esq + 'px';
            div.style.top = cima + 'px';
            document.getElementById('corpo').appendChild(div);
            
            if (nave === 'nave_cinza') {
                var projetil = '.projetil_cinza';
                nave_original.animaObjetoCinza(projetil, 400, [cima, final], nave_objeto);
            } else {
                var projetil = '.projetil_vermelho';
                nave_original.animaObjetoVermelha(projetil, 400, [cima, final], nave_objeto);
            }
        }

        //sudeste
        else if (angulo >= 115 && angulo <= 160) {
            cima = Math.floor(posicao.top) + 100;
            esq = Math.floor(posicao.left) + 100;
            final = 2000;
            var final_esq = (window.innerHeight - cima);
            var final_disparo = ((final_esq * 5) + esq);
            div.style.left = esq + 'px';
            div.style.top = cima + 'px';
            document.getElementById('corpo').appendChild(div);
            
            if (nave === 'nave_cinza') {
                var projetil = '.projetil_cinza';
                nave_original.animaObjetoCinza(projetil, 400, [final, final_disparo], nave_objeto);
            } else {
                var projetil = '.projetil_vermelho';
                nave_original.animaObjetoVermelha(projetil, 400, [final, final_disparo], nave_objeto);
            }
        }

        //sul
        else if (angulo >= 161 && angulo >= -154) {
            cima = Math.floor(posicao.top) + 110;
            esq = Math.floor(posicao.left) + 45;
            final = 2000;
            div.style.left = esq + 'px';
            div.style.top = cima + 'px';
            document.getElementById('corpo').appendChild(div);
            
            if (nave === 'nave_cinza') {
                var projetil = '.projetil_cinza';
                nave_original.animaObjetoCinza(projetil, 400, [final, esq], nave_objeto);
            } else {
                var projetil = '.projetil_vermelho';
                nave_original.animaObjetoVermelha(projetil, 400, [final, esq], nave_objeto);
            }
        }

        //sudoeste
        else if (angulo <= -115 && angulo >= -160) {
            cima = Math.floor(posicao.top) + 100;
            esq = Math.floor(posicao.left);
            final = 2000;
            var final_esq = (window.innerHeight - cima);
            var final_disparo = ((final_esq * 5) - esq);
            div.style.left = esq + 'px';
            div.style.top = cima + 'px';
            document.getElementById('corpo').appendChild(div);
            
            if (nave === 'nave_cinza') {
                var projetil = '.projetil_cinza';
                nave_original.animaObjetoCinza(projetil, 400, [final, -(final_disparo)], nave_objeto);
            } else {
                var projetil = '.projetil_vermelho';
                nave_original.animaObjetoVermelha(projetil, 400, [final, -(final_disparo)], nave_objeto);
            }
        }

        //oeste
        else if (angulo <= -69 && angulo >= -114) {
            cima = Math.floor(posicao.top) + 60;
            esq = Math.floor(posicao.left) - 10;
            final = -50;
            div.style.left = esq + 'px';
            div.style.top = cima + 'px';
            document.getElementById('corpo').appendChild(div);
            
            if (nave === 'nave_cinza') {
                var projetil = '.projetil_cinza';
                nave_original.animaObjetoCinza(projetil, 400, [cima, final], nave_objeto);
            } else {
                var projetil = '.projetil_vermelho';
                nave_original.animaObjetoVermelha(projetil, 400, [cima, final], nave_objeto);
            }
        }

        //noroeste
        else if (angulo <= -23 && angulo >= -68) {
            cima = Math.floor(posicao.top);
            esq = Math.floor(posicao.left);
            final = -cima;
            div.style.left = esq + 'px';
            div.style.top = cima + 'px';
            document.getElementById('corpo').appendChild(div);
            
            if (nave === 'nave_cinza') {
                var projetil = '.projetil_cinza';
                nave_original.animaObjetoCinza(projetil, 400, [final, 5 / (-esq)], nave_objeto);
            } else {
                var projetil = '.projetil_vermelho';
                nave_original.animaObjetoVermelha(projetil, 400, [final, 5 / (-esq)], nave_objeto);
            }
        }


        disparo_audio.play();

        /*         
         //top left
         cima = Math.floor(posicao.top);
         esq = Math.floor(posicao.left);
         final = -cima;
         div.style.left = esq + 'px';
         div.style.top = cima + 'px';
         document.getElementById('corpo').appendChild(div);
         
         this.animaObjeto(projetil, 400, [final, 5/(-esq)]);
         */
    };

    this.removeProjetil = function (projetil) {
        var projetil_escolhido = document.getElementById(projetil);
        projetil_escolhido.parentNode.removeChild(projetil_escolhido);
    };


}
