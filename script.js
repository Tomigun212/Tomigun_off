const canvas = document.getElementById("trails");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y, size, velocityX, velocityY, color, opacity, life) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.color = color;
        this.opacity = opacity;
        this.life = life;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.opacity -= 0.01;
        this.life -= 0.01;
    }

    draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, this.color.replace("opacity", this.opacity));
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles(x, y, amount = 5, spread = 2) {
    for (let i = 0; i < amount; i++) {
        let size = Math.random() * 8 + 3; // Particules un peu plus grandes
        let velocityX = (Math.random() - 0.5) * spread;
        let velocityY = (Math.random() - 0.5) * spread;
        let color = getRandomGalaxyColor();
        let opacity = 1;
        let life = Math.random() * 1.5 + 0.5;

        particles.push(new Particle(x, y, size, velocityX, velocityY, color, opacity, life));
    }
}

function getRandomGalaxyColor() {
    const colors = [
        "rgba(173, 216, 230, opacity)",  // Bleu clair
        "rgba(147, 112, 219, opacity)",  // Violet
        "rgba(255, 182, 193, opacity)",  // Rose
        "rgba(255, 255, 255, opacity)",  // Blanc
        "rgba(72, 61, 139, opacity)"     // Bleu profond
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.life <= 0 || particle.opacity <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateParticles);
}

// Événement de mouvement
window.addEventListener("mousemove", (e) => {
    createParticles(e.clientX, e.clientY, 3, 1);
});

// Effet de boost quand on clique
window.addEventListener("click", (e) => {
    createParticles(e.clientX, e.clientY, 15, 4);
});

// Ajuster la taille du canvas au redimensionnement
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animateParticles();
