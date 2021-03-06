function loadClyde(Q) {
    
    Q.animations('clyde animation', {
        'clyde_right': { frames: [0], loop: false },
        'clyde_down': { frames: [2], loop: false },
        'clyde_left': { frames: [4], loop: false },
        'clyde_up': { frames: [6], loop: false },
        'scared': { frames: [8], loop: false }
    });
    
    /// Clase que representa al enemigo Clyde - Fantasma Naranja
    Q.Sprite.extend('Clyde', {
        init: function(p) {
            this._super(p, {
                sprite: 'clyde animation',
                //Sprite del Blinky.
                sheet: 'clyde',
                //Posición inicial del Clyde
                x: 500,
                y: 300,
                // Parámetros de velocidad del Clyde
                v: 180,
                vy: 180,
                direction: 'down',
                ndirection: 4,
                //Atributos adicionales
                gstate: true, //normal = true // vulnerable = false
                die: false,
                collision: false
            });
            
            //Se carga el módulo de Quintus que controla su movimiento y la clase padre
            this.add('aiMoveGhost, ghost');
            //Definición de las funciones adicionales.
            this.on('die, changeState');
        },
        
        //Cambia el estado: de normal a asustado
        changeState: function() {
            this.p.gstate = !this.p.gstate;
        },
                    
        // Muere el Clyde
        die: function() {
            this.p.die = true;
            this.p.vx = 0;
            this.p.vy = 0;
            
            Q('Clyde').destroy();
            Q.audio.play('ghost-eaten.mp3');
            Q.state.inc('score', 200);
        },
        
        // Ejecuta un paso de Inky
        step: function(dt) {
            if (this.p.gstate){
                this.play('clyde_' + this.p.direction);
            }else{
                this.play('scared');
            }
            
            /*
            if (this.p.die) {
                this.play('die');
            } else {
                this.play('live');
                // En caso de caerse del escenario, Goomba muere.
                if (this.p.y > fondo_escenario) {
                    this.trigger('die');
                }
            }*/
            
        }
    });
}