import {
  Facebook,
  Instagram,
  Twitter,
  Github
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-center justify-content-lg-between align-items-center py-4 gap-2 px-3 border-top bg-light">
      <div className="col-md-4 d-flex align-items-center">
        <span className="text-muted">
          © {new Date().getFullYear()} MyPortfolio, Inc.
        </span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <a
            className="text-muted"
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={24} className="footer-icon" />
          </a>
        </li>
        <li className="ms-3">
          <a
            className="text-muted"
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook size={24} className="footer-icon" />
          </a>
        </li>
        <li className="ms-3">
          <a
            className="text-muted"
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
          >
            <Twitter size={24} className="footer-icon" />
          </a>
        </li>
        <li className="ms-3">
          <a
            className="text-muted"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={24} className="footer-icon" />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
