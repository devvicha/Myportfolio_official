import blogImg from "../assets/blog.png";
import netflixImg from "../assets/netflix.png";

export const projects = [
  {
    id: 1,
    title: "Personal Blog",
    description:
      "A personal portfolio website to showcase my projects, skills, and experiences. Built with HTML, CSS, and JavaScript to provide a clean and responsive user interface.",
    image: blogImg,
    technologies: ["HTML", "CSS", "JavaScript"],
    demoLink: "https://devvicha.github.io/Portfolio_Assignment1/",
    codeLink:
      "https://github.com/devvicha/Personal-Portfolio--html-css-javascript/tree/main",
  },
  {
    id: 3,
    title: "Netflix Clone",
    description:
      "A Netflix-inspired full-stack streaming platform built with React.js and Spring Boot, featuring user authentication, video playback, and dynamic content fetched from MongoDB.",
    image: netflixImg,
    technologies: ["React.js", "Spring Boot", "MongoDB"],
    demoLink: "https://netflix-clone-frontend-hiup.vercel.app/",
    codeLink: "https://github.com/devvicha/Netflix",
  },
];
