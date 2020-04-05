 const canvas = document.querySelector('canvas');

 const ctx = canvas.getContext('2d');


 const width = canvas.width = window.innerWidth;
 const height = canvas.height = window.innerHeight;

 function random(min, max) {
     const num = Math.floor(Math.random() * (max - min + 1)) + min;
     return num;
 }

 class Neurotransmettor {

     constructor(x, y, velX, color, radius) {
         this.x = x;
         this.y = y;
         this.velX = velX;
         this.color = color;
         this.radius = radius;
         this.iscollision = false;
     }

     draw() {
         ctx.beginPath();
         ctx.fillStyle = this.color;
         ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
         ctx.fill();
     }

     update() {
         if ((this.x + this.radius) >= width) {
             ctx.clearRect(this.x, this.y, this.radius, this.radius);
         }
         if ((this.x - this.radius) <= 0) {
             ctx.clearRect(this.x, this.x, this.radius, this.radius);
         }

         this.x += this.velX;
     }
 }


 class Receptor {

     constructor(x, y, color, heightr, widthr) {
         this.x = x;
         this.y = y;
         this.color = color;
         this.heightr = heightr;
         this.widthr = widthr;
         this.iscollision = false;
     }

     draw() {
         ctx.beginPath();
         ctx.fillStyle = this.color;
         ctx.fillRect(this.x, this.y, this.heightr, this.widthr);
     }

 }

 class Receptorclose {

     constructor(x, y, color, heightr, widthr) {
         this.x = x;
         this.y = y;
         this.color = color;
         this.heightr = heightr;
         this.widthr = widthr;
     }

     draw() {
         ctx.beginPath();
         ctx.fillStyle = this.color;
         ctx.fillRect(this.x, this.y, this.heightr, this.widthr);
     }
 }


 class Membrane {
     constructor(x, y, size) {
         this.x = x;
         this.y = y;
         this.size = size;
     }
     draw() {
         ctx.beginPath();
         ctx.moveTo(this.x, this.y);
         ctx.lineTo(this.size, this.size);
         ctx.stroke();
     }
 }

 function rectintersectcircle(receptors, neurotransmettors) {
     for (let i = 0; receptors.length; i++) {
         obj1 = receptors[i];
         for (let j = 0; neurotransmettors.length; j++) {
             obj2 = neurotransmettors[j];
             let distX = Math.abs(((obj2.x - (obj1.x + (obj1.widthr / 2))) - (obj1.widthr / 2)));
             let distY = Math.abs(((obj2.y - (obj1.x + (obj1.heightr / 2))) - (obj1.heightr / 2)));
             let dx = distX - (obj1.widthr / 2);
             let dy = distY - (obj1.heightr / 2);
             if (((dx * dx) + (dy * dy)) <= (obj1.radius * obj1.radius)) { // intersect side or cordner
                 obj1.iscollision = true;
                 obj2.iscollision = true;

             }
         }
     }
 }



 let neurotransmettors = [];

 while (neurotransmettors.length < 20) {
     let radius = 20;
     let neurotransmettor = new Neurotransmettor(
         random(0 + radius, width - radius), // cooordonnées x
         random(0 + radius, height - radius), //   coordonnées y
         random(1, 3), // velocité sur l'axe x
         'rgb(' + 255 + ',' + 153 + ',' + 0 + ')', // couleur rgb : orange
         radius // rayon
     );

     neurotransmettors.push(neurotransmettor);
 }

 let receptors = [];

 while (receptors.length < 13) {
     let heightr = 40;
     let widthr = 40;
     let receptor = new Receptor(
         random(0 + widthr, width - widthr), // cooordonnées x
         random(0 + heightr, height - heightr), //   coordonnées y
         'rgb(' + 0 + ',' + 0 + ',' + 255 + ')', // couleur rgb : bleu
         heightr, // hauteur
         widthr // largeur
     );
     receptors.push(receptor);
 }

 function loop() {
     ctx.fillStyle = 'rgb(255, 255, 255)';
     ctx.fillRect(0, 0, width, height);

     for (let i = 0; i < neurotransmettors.length; i++) {
         neurotransmettors[i].draw();
         neurotransmettors[i].update();
     }

     for (let i = 0; i < receptors.length; i++) {
         receptors[i].draw();

     }

     for (let i = 0; i < receptors.length; i++) {
         for (let j = 0; j < neurotransmettors.length; j++) {
             rectintersectcircle(receptors[i], neurotransmettors[j]);
             if ((receptors[i].iscollision == true) && (neurotransmettors[j] == true)) {
                 receptors[i].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
             }
         }

     }
     requestAnimationFrame(loop);
 }


 loop();
