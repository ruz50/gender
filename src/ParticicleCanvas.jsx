import React, { useEffect, useRef } from "react";
import noise from "./noise";

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const PI2 = Math.PI * 2;

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  let automate = true;
  let tick = 0;

  class Particle {
    constructor({ x, y, radius, direction, velocity }) {
      this.x = x;
      this.y = y;
      this.radius = radius || 10;
      this.direction = direction || 0;
      this.velocity = velocity || 0;
      this.velX = Math.cos(this.direction) * this.velocity;
      this.velY = Math.sin(this.direction) * this.velocity;
      this.friction = 0.95; // Increased friction (slower movement)
      this.decay = randomBetween(97, 99) * 0.01; // Particles last longer
      this.gravity = this.radius * 0.005; // Reduced gravity effect
    }

    update() {
      this.x += this.velX;
      this.y += this.velY;
      this.velX *= this.friction;
      this.velY *= this.friction;
      this.velocity *= this.friction;
      this.radius *= this.decay;
      this.gravity += 0.02;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setStage = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const createParticles = (x, y) => {
      let newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push(
          new Particle({
            x,
            y,
            direction: Math.random() * PI2,
            velocity: randomBetween(4, 10), // Reduced velocity for slower effect
            radius: 10 + Math.random() * 20,
          })
        );
      }
      particlesRef.current.push(...newParticles);
    };

    const loop = () => {
      clearCanvas();

      if (automate && Math.random() < 0.015) {
        createParticles(randomBetween(50, canvas.width - 50), randomBetween(50, canvas.height - 50));
      }

      particlesRef.current = particlesRef.current.filter((particle) => {
        ctx.fillStyle = `hsl(320, 80%, 60%)`; // Always pink
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, PI2);
        ctx.fill();
        ctx.closePath();

        particle.update();
        return particle.radius > 1;
      });

      tick += 0.01;
      requestAnimationFrame(loop);
    };

    const handleMouseDown = (e) => {
      requestAnimationFrame(() => createParticles(e.clientX, e.clientY));
    };

    setStage();
    loop();
    window.addEventListener("resize", setStage);
    canvas.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("resize", setStage);
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }} />;
};

export default ParticleCanvas;
