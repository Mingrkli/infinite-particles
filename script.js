const canvas = document.getElementById('canvas1');
// Gets the CanvasRenderingContext2D so we can start using the 2d object properties and methods which you can see by using console.log(ctx)
const ctx = canvas.getContext('2d');
// The following sets the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = []; // Holds each particle

// Rearrange the canvas each time you resize your window 
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Yay! classes from java and other languages
class Particle {
    constructor() {
        // this.x = mouse.x;
        // this.y = mouse.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 50 + 1;
        // the following allows the particle to move where ever direction since we set both directions. Remember Y is opposite so positive Y is down and negative is up
        this.speedX = Math.random() * 1 - .5; // -.5 to .5
        this.speedY = Math.random() * 1 - .5;
        this.hsl = Math.floor(Math.random() * 360 + 1); 
    }
    // method
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        ctx.fillStyle = `hsl(${this.hsl}, 100%, 50%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Adds each new particle created to particlesArray
function init() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle())
    }
}
init();

function check100Particle() {
    while (particlesArray.length < 101) {
        particlesArray.push(new Particle());
    }
}

// Each particle constructor in particlesArray, run the update and draw method
function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Removes particles when lower then size condition
        if (particlesArray[i].x > (canvas.width + particlesArray[i].size) || particlesArray[i].x < 0 || particlesArray[i].y > (canvas.height + particlesArray[i].size) || particlesArray[i].y < 0) {
            // removes index, removes 1 amount
            particlesArray.splice(i, 1);
            i--;
        }
    }
    check100Particle();
}

function animate() {
    // Clears canvas from 0,0 to the full width and height of canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    // This runs the animate function and with this in the animate function this basically creates an infinite loop
    requestAnimationFrame(animate);
}
animate();