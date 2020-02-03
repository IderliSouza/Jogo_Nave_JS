function Nave() {
    this.vida = 100;
    this.nome = null;
    this.vivo = true;
    this.colidiu = false;
    

    this.girar = function () {
        var cinza = document.getElementById('nave_cinza');
        var vermelha = document.getElementById('nave_vermelha');

        var random = Math.floor(Math.random() * 2);
        var random2 = Math.floor(Math.random() * 2);

        if (random === 0) {
            cinza.style.animationName = 'clockwise';
        } else {
            cinza.style.animationName = 'anti_clockwise';
        }

        if (random2 === 0) {
            vermelha.style.animationName = 'clockwise';
        } else {
            vermelha.style.animationName = 'anti_clockwise';
        }
                
    };

    this.levarDano = function () {
        if (this.vida > 0) {
            this.vida = this.vida - 25;
        } else if (this.vida === 0) {
            this.setVivo(false);
        }
    };
    this.setVivo = function (vivo) {
        this.vivo = vivo;
    };
    this.isVivo = function () {
        return this.vivo;
    };
    this.getVida = function () {
        return this.vida;
    };
    this.setNome = function (nome) {
        this.nome = nome;
    };
    this.getNome = function () {
        return this.nome;
    };

    this.setColidiu = function (colisao) {
        this.colidiu = colisao;
    };
    this.isColidiu = function () {
        return this.colidiu;
    };

    this.animaNave = function (nave, objectNave, colisao) {
        if (this.isVivo()) {
            var posicao = $(nave).offset();
            var posicao_nova = this.criaNovaPosicao();
            var velocidade_animacao = this.calculaVelocidade([posicao.top, posicao.left], posicao_nova);

            $(nave).animate({top: posicao_nova[0], left: posicao_nova[1]}, {duration: velocidade_animacao, step: function (now, fx) {
                    objectNave.animaNave(nave, objectNave, colisao);
                }
            });
        }
    };

    this.criaNovaPosicao = function () {
        // pega dimensão da janela (retira o tamanho da imagem)
        var altura = $(window).height() - 50;
        var largura = $(window).width() - 50;

        //calcula um lugar aleatorio
        var altura_aleatoria = Math.floor(Math.random() * altura);
        var largura_aleatoria = Math.floor(Math.random() * largura);

        return [altura_aleatoria, largura_aleatoria];
    };

    this.pegaPosicao = function (objeto) {

        var posicao = $(objeto).offset();

        return [posicao.top, posicao.left];
    };


//step function faz testar a colisao durante a movimentacao da nave
    this.animaObjetoCinza = function (nave, velocidade_animacao, posicao_nova, nave_objeto) {
        var tiro_vermelha = false;
        $(nave).animate({top: posicao_nova[0], left: posicao_nova[1]}, {duration: 1000, step: function (now, fx) {
                if (nave_objeto.isColidiu() === false) {
                    tiro_vermelha = checaTiroVermelho();
                    if (tiro_vermelha === true) {
                        console.log(tiro_vermelha);
                        nave_objeto.setColidiu(tiro_vermelha);
                        nave_objeto.levarDano();
                        console.log(nave_objeto.getVida() + ' vermelha');
                        var explosao = new Audio('audio/explosion.mp3');
                        var vida = document.getElementById('vida_vermelha');
                        var life_vermelha = vida.offsetWidth;
                        var largura = $(window).width();
                        var per_vida = Math.floor(((life_vermelha / largura)) * 100);
                        per_vida = (per_vida - 10);
                        vida.style.width = per_vida + '%';
                        
                        var acertou_nave_vermelha = document.getElementById('nave_vermelha');
                        acertou_nave_vermelha.style.animation = 'piscaImagem 0.1s infinite, clockwise 1.5s linear infinite';
                        setTimeout(function() {
                            acertou_nave_vermelha.style.animation = 'clockwise 1.5s linear infinite';
                        }, 500);
                        
                        explosao.play();
                        if (nave_objeto.getVida() === 0) {
                            var morreu = new Audio('audio/death.mp3');
                            explosao.volume = 0.3;
                            var vida = document.getElementById('vida_vermelha');
                            
                            per_vida = (per_vida - 10);
                            vida.style.width = '0%';
                            morreu.play();
                            document.getElementById('nave_vermelha').src = 'img/explosao_animada.gif';
                            var nave = document.getElementById('nave_vermelha');
                            setTimeout(function () {
                                nave.parentNode.removeChild(nave);
                            }, 1000);
                            setTimeout(function () {
                                document.location.href = 'game_over.html?venceu=nave_cinza';
                            }, 1000);
                        }

                    }
                }
            }
        });

    };

    this.animaObjetoVermelha = function (nave, velocidade_animacao, posicao_nova, nave_objeto) {
        var tiro_cinza = false;
        $(nave).animate({top: posicao_nova[0], left: posicao_nova[1]}, {duration: 1000, step: function (now, fx) {
                if (nave_objeto.isColidiu() === false) {
                    tiro_cinza = checaTiroCinza();
                    if (tiro_cinza === true) {
                        console.log(tiro_cinza);
                        nave_objeto.setColidiu(tiro_cinza);
                        nave_objeto.levarDano();
                        console.log(nave_objeto.getVida() + ' cinza');
                        var explosao = new Audio('audio/explosion.mp3');
                        var vida = document.getElementById('vida_cinza');
                        var life_cinza = vida.offsetWidth;
                        var largura = $(window).width();
                        var per_vida = Math.floor(((life_cinza / largura)) * 100);
                        per_vida = (per_vida - 10);
                        vida.style.width = per_vida + '%';
                        
                        var acertou_nave_cinza = document.getElementById('nave_cinza');
                        acertou_nave_cinza.style.animation = 'piscaImagem 0.1s infinite, clockwise 1.5s linear infinite';
                        setTimeout(function() {
                            acertou_nave_cinza.style.animation = 'clockwise 1.5s linear infinite';
                        }, 500);
                        
                        explosao.play();
                        if (nave_objeto.getVida() === 0) {
                            var morreu = new Audio('audio/death.mp3');
                            explosao.volume = 0.3;
                            var vida = document.getElementById('vida_cinza');
                            per_vida = (per_vida - 10);
                            vida.style.width = '0%';
                            morreu.play();
                            document.getElementById('nave_cinza').src = "img/explosao_animada.gif";
                            var nave = document.getElementById('nave_cinza');
                            setTimeout(function () {
                                nave.parentNode.removeChild(nave);
                            }, 1000);
                            setTimeout(function () {
                                document.location.href = 'game_over.html?venceu=nave_vermelha';
                            }, 1000);
                            
                        }
                    }
                }
            }
        });
    };

    this.calculaVelocidade = function (anterior, proximo) {
        var x = Math.abs(anterior[1] - proximo[1]);
        var y = Math.abs(anterior[0] - proximo[0]);

        var greatest = x > y ? x : y;

        var modificador_velocidade = 0.2;

        var velocidade = Math.ceil(greatest / modificador_velocidade);

        return velocidade;
    };

    function checaTiroVermelho() {

        if (document.getElementById('projetil_cinza')) {

            left_tiro_C = parseInt(document.getElementById("projetil_cinza").style.left, 10);
            top_tiro_C = parseInt(document.getElementById("projetil_cinza").style.top, 10);
            largura_tiro_C = parseInt(document.getElementById("projetil_cinza").style.width, 10);
            altura_tiro_C = parseInt(document.getElementById("projetil_cinza").style.height, 10);
            left_vermelha_T = parseInt(document.getElementById("nave_vermelha").style.left, 10);
            top_vermelha_T = parseInt(document.getElementById("nave_vermelha").style.top, 10);
            largura_vermelha_T = parseInt(document.getElementById("nave_vermelha").style.width, 10);
            altura_vermelha_T = parseInt(document.getElementById("nave_vermelha").style.height, 10);

            var horizontalMatch_vermelha = comparaPosicoes([left_tiro_C, (left_tiro_C + largura_tiro_C)], [left_vermelha_T, (left_vermelha_T + largura_vermelha_T)]);
            var verticalMatch_vermelha = comparaPosicoes([top_tiro_C, (top_tiro_C + altura_tiro_C)], [top_vermelha_T, (top_vermelha_T + altura_vermelha_T)]);

            if (horizontalMatch_vermelha && verticalMatch_vermelha) {
                return true;
            }
            return false;
        }
        return false;
    }
    ;
    function checaTiroCinza() {

        if (document.getElementById('projetil_vermelho')) {

            left_tiro_V = parseInt(document.getElementById("projetil_vermelho").style.left, 10);
            top_tiro_V = parseInt(document.getElementById("projetil_vermelho").style.top, 10);
            largura_tiro_V = parseInt(document.getElementById("projetil_vermelho").style.width, 10);
            altura_tiro_V = parseInt(document.getElementById("projetil_vermelho").style.height, 10);
            left_cinza_T = parseInt(document.getElementById("nave_cinza").style.left, 10);
            top_cinza_T = parseInt(document.getElementById("nave_cinza").style.top, 10);
            largura_cinza_T = parseInt(document.getElementById("nave_cinza").style.width, 10);
            altura_cinza_T = parseInt(document.getElementById("nave_cinza").style.height, 10);


            var horizontalMatch_cinza = comparaPosicoes([left_tiro_V, (left_tiro_V + largura_tiro_V)], [left_cinza_T, (left_cinza_T + largura_cinza_T)]);
            var verticalMatch_cinza = comparaPosicoes([top_tiro_V, (top_tiro_V + altura_tiro_V)], [top_cinza_T, (top_cinza_T + altura_cinza_T)]);
            if (horizontalMatch_cinza && verticalMatch_cinza) {
                return true;
            }
            return false;
        }
        return false;
    }
    ;

//    function checaColisao() {
//        left_vermelha = parseInt(document.getElementById("nave_vermelha").style.left, 10);
//        left_cinza = parseInt(document.getElementById("nave_cinza").style.left, 10);
//        top_vermelha = parseInt(document.getElementById("nave_vermelha").style.top, 10);
//        top_cinza = parseInt(document.getElementById("nave_cinza").style.top, 10);
//        largura_vermelha = parseInt(document.getElementById("nave_vermelha").style.width, 10);
//        largura_cinza = parseInt(document.getElementById("nave_cinza").style.width, 10);
//        altura_vermelha = parseInt(document.getElementById("nave_vermelha").style.height, 10);
//        altura_cinza = parseInt(document.getElementById("nave_cinza").style.height, 10);
//
//        var horizontalMatch = comparaPosicoes([left_vermelha, (left_vermelha + largura_vermelha)], [left_cinza, (left_cinza + largura_cinza)]);
//        var verticalMatch = comparaPosicoes([top_vermelha, (top_vermelha + altura_vermelha)], [top_cinza, (top_cinza + altura_cinza)]);
//
//        if (horizontalMatch && verticalMatch) {
//            return true;
//        }
//        return false;
//    }
//    ;

    function comparaPosicoes(p1, p2) {
        var x1 = p1[0] < p2[0] ? p1 : p2;
        var x2 = p1[0] < p2[0] ? p2 : p1;
        return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
    }

}