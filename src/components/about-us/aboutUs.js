import './aboutUs.css'

const AboutUs = (props) => {
  return (
    <div className="aboutUs-wrapper">
      <div className="aboutUs-content">
        <h1>About Us</h1>
        <div className="aboutUs-description">
          <main>
            <h2>Doge-PC</h2>
            <p>Kami adalah Pengepul Komponen PC</p>
          </main>
          <aside>
            <img src={process.env.PUBLIC_URL + '/dogePC.png'} alt="logo" className="logo-header" />
          </aside>
        </div>
        <h2>Para Pengepul:</h2>
        <div className="aboutUs-faces">
          <a href="https://www.instagram.com/salmansh_/" title="Visit pengepul Salman"><img src={process.env.PUBLIC_URL + '/images/product/salmanv2.jpg'} alt="salman" /></a>
          <a href="https://www.instagram.com/whenisfaza_/" title="Visit pengepul Faza"><img src="https://blek.tech/AboutMe/img/profile.png" alt="Paja" /></a>
        </div>
      </div>
    </div>
  )
}

export default AboutUs;