import './footer.css';
import { NavLink } from 'react-router-dom';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";

const Footer = (props) => {
    return (
        <footer>
            <div className="footer-wrapper">
                <nav>
                    <div alt="logo" className="logo-footer">
                        <img src={process.env.PUBLIC_URL + 'dogePC.png'} className="logo-1" alt=""/>
                        <img src={process.env.PUBLIC_URL + 'dogePC.png'} className="logo-2" alt=""/>
                        <img src={process.env.PUBLIC_URL + 'dogePC.png'} className="logo-3" alt=""/>
                        <img src={process.env.PUBLIC_URL + 'dogePC.png'} className="logo-4" alt=""/>
                    </div>
                    <NavLink to='/'>
                        <h2 id="doge-pc">
                            Doge-PC
                        </h2>
                    </NavLink>
                </nav>

                <div className="footer-support">
                    <ul>
                        <li>
                            <NavLink to='/about_us'>
                                About Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/customer_service'>
                                Customer Service
                            </NavLink>
                        </li>
                    </ul>

                    <nav className="social-media">
                        <p>Find Us:</p>
                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><IoLogoFacebook /></a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><IoLogoInstagram /></a>
                        <a href="https://www.twitter.com/" target="_blank" rel="noreferrer"><IoLogoTwitter /></a>
                    </nav>
                </div>
            </div>

            <div className="copyright-wrapper">
                <p>© 2021 Doge-PC. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;