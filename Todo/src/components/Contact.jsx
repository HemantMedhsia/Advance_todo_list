import React from 'react'

function Contact() {
    const Image1 = "https://images.unsplash.com/photo-1659095141570-be8b9aff59ce?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div style={{height:'85vh'}}>
        <div className="home-container">
      <section className="hero">
        <h1>Welcome to My Website</h1>
        <p>A place for amazing content</p>
        <button className="cta-button">Learn More</button>
      </section>
      <section className="features">
        <div className="feature">
          <img style={{width:"15%"}} src={Image1} alt="Feature 1" />
          <h2>Feature 1</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="feature">
          <img style={{width:"15%"}} src={Image1} alt="Feature 2" />
          <h2>Feature 2</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </section>
    </div>
    </div>
  )
}

export default Contact