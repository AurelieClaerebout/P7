import React from "react";
import facebook from "../assets/facebook.svg";
import linkedin from "../assets/linkedin.svg";
import twitter from "../assets/twitter.svg";
import dribbble from "../assets/dribbble.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="social-icon">
        <ul>
          <li>
            <a href="https://www.linkedin.com/feed/" title="linkedin icons">
              <img src={linkedin} alt="linkedin icon" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/home?lang=fr" title="twitter icons">
              <img src={twitter} alt="twitter icon" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/" title="facebook icons">
              <img src={facebook} alt="facebook icon" />
            </a>
          </li>
          <li>
            <a href="https://dribbble.com/" title="dribbble icons">
              <img src={dribbble} alt="dribbble icon" />
            </a>
          </li>
        </ul>
      </div>
      <div className="enjoy">
        <p>AMUSEZ-VOUS !</p>
      </div>
      <div className="contact">
        <a href="mailto:contact@groupomania.com">Contact</a>
      </div>
    </div>
  );
};

export default Footer;
