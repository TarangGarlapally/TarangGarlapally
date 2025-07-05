// Techy animated background: particles + connecting lines + parallax
const canvas = document.getElementById('techy-bg-canvas');
const ctx = canvas.getContext('2d');
canvas.style.willChange = 'transform, opacity';

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

function getParticleCount() {
  if (width < 600) return 18;
  if (width < 900) return 28;
  if (width < 1400) return 38;
  return Math.floor((width * height) / 5000);
}
const PARTICLE_COLOR = '#a259ff';
const LINE_COLOR = 'rgba(0,219,222,0.18)';
const PARTICLE_RADIUS = 2.2;
const LINE_DISTANCE = 100;
const particles = [];
let mouse = { x: width / 2, y: height / 2 };
let running = true;

function randomVel() {
  return (Math.random() - 0.5) * 0.5;
}

function Particle() {
  this.x = Math.random() * width;
  this.y = Math.random() * height;
  this.vx = randomVel();
  this.vy = randomVel();
  this.radius = PARTICLE_RADIUS + Math.random() * 1.1;
}

Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = PARTICLE_COLOR;
  ctx.shadowColor = '#00dbde';
  ctx.shadowBlur = 3;
  ctx.fill();
  ctx.shadowBlur = 0;
};

function drawLine(p1, p2, opacity) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = `rgba(162,89,255,${opacity})`;
  ctx.lineWidth = 1;
  ctx.shadowColor = '#00dbde';
  ctx.shadowBlur = 2 * opacity;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

function animate() {
  if (!running) return;
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let dx = (mouse.x - width / 2) * 0.0004;
    let dy = (mouse.y - height / 2) * 0.0004;
    p.x += p.vx + dx * (p.x - width / 2);
    p.y += p.vy + dy * (p.y - height / 2);
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
    p.x = Math.max(0, Math.min(width, p.x));
    p.y = Math.max(0, Math.min(height, p.y));
    p.draw();
    for (let j = i + 1; j < particles.length; j++) {
      let q = particles[j];
      let dist = Math.hypot(p.x - q.x, p.y - q.y);
      if (dist < LINE_DISTANCE) {
        drawLine(p, q, 1 - dist / LINE_DISTANCE);
      }
    }
  }
  requestAnimationFrame(animate);
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  particles.length = 0;
  let count = getParticleCount();
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

window.addEventListener('resize', resize);
canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
canvas.addEventListener('touchmove', e => {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
});

document.addEventListener('visibilitychange', () => {
  running = !document.hidden;
  if (running) animate();
});

// Init
resize();
animate(); 