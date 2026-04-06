import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { DiHtml5, DiCss3, DiJavascript1, DiBootstrap, DiReact, DiPython } from 'react-icons/di';
import { FaMoon, FaSun, FaGithub, FaEnvelope, FaRocket, FaCode, FaBrain, FaLinkedin, FaDownload } from 'react-icons/fa';
import './App.css';

// Animated Background Particles Component
const ParticleBackground = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode ? 'rgba(34, 139, 34, 0.6)' : 'rgba(34, 139, 34, 0.4)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Connect nearby particles with lines
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDarkMode 
              ? `rgba(34, 139, 34, ${0.2 * (1 - distance / 120)})` 
              : `rgba(34, 139, 34, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="particle-canvas" />;
};

// Animated Skill Card Component
const SkillCard = ({ skill, index }) => {
  const Icon = skill.icon;
  
  return (
    <div 
      className="skill-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="skill-icon-wrapper">
        <Icon className="skill-icon" />
        <div className="skill-glow"></div>
      </div>
      <span className="skill-label">{skill.name}</span>
    </div>
  );
};

// Home Page Component
const Home = () => {
  const [skills] = useState([
    { icon: DiHtml5, name: 'HTML5' },
    { icon: DiCss3, name: 'CSS3' },
    { icon: DiJavascript1, name: 'JavaScript' },
    { icon: DiBootstrap, name: 'Bootstrap' },
    { icon: DiReact, name: 'React' },
    { icon: DiPython, name: 'Python' },
  ]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="home-section">
      <div 
        className="gradient-cursor"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />
      
      <div className="hero-content">
        {/* Profile Photo with Animated Rings */}
        <div className="profile-wrapper">
          <div className="profile-ring"></div>
          <div className="profile-ring ring-2"></div>
          <img
            src="https://avatars.githubusercontent.com/u/153060601?v=4"
            alt="Atul Birla"
            className="profile-photo"
          />
        </div>

        {/* Name with Glitch Effect */}
        <h1 className="glitch-text" data-text="Atul Birla">Atul Birla</h1>
        
        {/* Role Section */}
        <div className="role-container">
          <FaCode className="role-icon" />
          <p className="tagline">Full-Stack Developer</p>
          <span className="separator">|</span>
          <FaBrain className="role-icon" />
          <p className="tagline">AI/ML Enthusiast</p>
        </div>

        {/* Introduction Text */}
        <div className="intro-text">
          <p className="fade-in-up">✨ Passionate about building innovative solutions</p>
          <p className="fade-in-up" style={{ animationDelay: '0.2s' }}>🚀 Turning ideas into reality with cutting-edge tech</p>
          <p className="fade-in-up" style={{ animationDelay: '0.4s' }}>💡 Let's create something amazing together!</p>
        </div>

        {/* Skills Section */}
        <div className="skills-section">
          <h3 className="skills-title">Tech Arsenal</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="cta-buttons">
          <Link to="/projects" className="cta-btn primary">
            <FaRocket /> View Projects
          </Link>
          <a 
            href="https://huggingface.co/spaces/Atulsinghbirla/Portfolio/resolve/main/CV.pdf" 
            download="Atul_Birla_Resume.pdf"
            className="cta-btn download"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDownload /> Download CV
          </a>
          <Link to="/contact" className="cta-btn secondary">
            <FaEnvelope /> Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

// About Page Component
const About = () => {
  return (
    <section className="section about-section">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <div className="title-underline"></div>
      </div>
      
      {/* About Cards Grid */}
      <div className="about-grid">
        <div className="about-card">
          <div className="about-icon">🎓</div>
          <h3>Education</h3>
          <p><strong>BCA Graduate (2025)</strong></p>
          <p>Maa Shakumbhari University, Saharanpur, UP</p>
        </div>

        <div className="about-card">
          <div className="about-icon">🤖</div>
          <h3>Specialization</h3>
          <p><strong>6-month AI/ML Training</strong></p>
          <p>NIELIT Chandigarh Ropar × IIT Ropar</p>
        </div>

        <div className="about-card">
          <div className="about-icon">💻</div>
          <h3>Expertise</h3>
          <p><strong>Python Specialist</strong></p>
          <p>Full-stack dev with real-world projects</p>
        </div>
      </div>

      {/* About Description */}
      <div className="about-description">
        <p>I'm a 22-year-old tech enthusiast with a passion for creating impactful digital solutions. My journey combines formal education with intensive industry training, giving me a unique perspective on both theoretical and practical aspects of software development.</p>
        <p>With strong foundations in web technologies and advanced knowledge in Python and AI/ML, I specialize in building innovative applications that solve real-world problems.</p>
      </div>
    </section>
  );
};

// Projects Page Component
const Projects = () => {
  const projects = [
    {
      title: 'Crop Recommendation System',
      description: 'The Crop Recommendation System is a machine learning based application that helps farmers select the most suitable crop to grow based on soil and environmental conditions. By analyzing factors such as soil nutrients (Nitrogen, Phosphorus, Potassium), temperature, humidity, rainfall, and pH value, the system predicts the optimal crop, enabling data-driven agricultural decisions, improved yield, and reduced risk.',
      tech: 'Python, Machine Learning, Scikit-learn, Pandas, NumPy, Random Forest Classifier, Matplotlib, Streamlit',
      icon: '🌾',
      color: '#4285f4',
      link: 'https://atulsinghbirla-crop-recommendation.hf.space'
    },
    {
      title: 'Vision Assist - AI',
      description: 'Vision AI is a computer vision based system that uses deep learning models to detect and recognize real-world objects in real time through a camera feed. The system processes visual data using AI models and provides intelligent outputs such as object identification, scene understanding, and audio feedback, making it useful for applications like assistive technology, surveillance, and smart automation.',
      tech: 'Python, Computer Vision, Deep Learning, YOLO, OpenCV, PyTorch, Vision AI, Real-Time Object Detection, Text-to-Speech',
      icon: '👁️',
      color: '#ea4335',
      link: 'https://atulsinghbirla-visionaigradio.hf.space'
    },
    {
      title: 'Car Price Prediction',
      description: 'Car Price Prediction is a machine learning based system that estimates the market value of a car by analyzing features such as brand, model, year, mileage, fuel type, transmission, and ownership history. The system helps users make informed buying and selling decisions using data-driven price estimation.',
      tech: 'Python, Machine Learning, Scikit-learn, Pandas, NumPy, Linear Regression, Random Forest Regressor, Matplotlib, Seaborn, Streamlit',
      icon: '🚗',
      color: '#34a853',
      link: 'https://atulsinghbirla-car.hf.space'
    },
  ];

  return (
    <section className="section projects-section">
      <div className="section-header">
        <h2 className="section-title">Featured Projects</h2>
        <div className="title-underline"></div>
      </div>
      
      {/* Projects Grid */}
      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card-modern" style={{ animationDelay: `${index * 0.15}s` }}>
            <div className="project-icon" style={{ backgroundColor: project.color }}>
              {project.icon}
            </div>
            <h3>{project.title}</h3>
            <p className="project-desc">{project.description}</p>
            <div className="project-tech">
              <span className="tech-badge">{project.tech}</span>
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
              <FaRocket /> View Live Demo →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

// Contact Page Component
const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs
      .sendForm('service_dobd6s4', 'template_gso0lub', form.current, 'NA7_xngIshTXHNg4Z')
      .then(
        () => {
          setStatus('Message sent successfully! 🎉');
          form.current.reset();
        },
        (error) => {
          setStatus('Failed to send. Please try again.');
          console.error('EmailJS Error:', error);
        }
      );
  };

  return (
    <section className="section contact-section">
      <div className="section-header">
        <h2 className="section-title">Let's Connect</h2>
        <div className="title-underline"></div>
      </div>

      <div className="contact-container">
        {/* Contact Info Card */}
        <div className="contact-info-card">
          <h3>Get In Touch</h3>
          <p>Have a project in mind? Let's discuss how we can work together to bring your ideas to life.</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <h4>Email</h4>
                <a href="mailto:asinghbirla@gmail.com" className="contact-link">
                  asinghbirla@gmail.com
                </a>
              </div>
            </div>
            
            <div className="contact-item">
              <FaLinkedin className="contact-icon" />
              <div>
                <h4>LinkedIn</h4>
                <a 
                  href="https://www.linkedin.com/in/atul-singh-birla-bb330326b/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  Atul Singh Birla
                </a>
              </div>
            </div>
            
            <div className="contact-item">
              <FaGithub className="contact-icon" />
              <div>
                <h4>GitHub</h4>
                <a 
                  href="https://github.com/Atulsinghbirla" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  @Atulsinghbirla
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form ref={form} onSubmit={sendEmail} className="contact-form-modern">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
          </div>
          
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              required
            ></textarea>
          </div>
          
          <button type="submit" className="submit-btn">
            <FaRocket /> Send Message
          </button>
          
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
};

// Main App Component
function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <Router>
      {/* Animated Particle Background */}
      <ParticleBackground isDarkMode={isDarkMode} />
      
      {/* Navigation Bar */}
      <nav className="navbar-modern">
        <div className="nav-brand">
          <span className="brand-accent">Atul</span>Birla
        </div>
        
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        
        <button className="theme-toggle-modern" onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="footer-modern">
        <p>© 2026 Atul Birla • Crafted with <span className="heart">❤️</span> and React</p>
      </footer>
    </Router>
  );
}

export default App;
