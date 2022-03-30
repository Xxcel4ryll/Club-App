const Banner = {
  render,
};

async function render(props) {
  return `
    <section class="services-container banner-container">
      <div class="banner">
        <div class="shoe">
          <img src="./img/laptop.png" alt="" />
        </div>
        <div class="content">
          <span>In Need of our services?</span>
          <p>please Contact us on <a>08141247005</a></p>
          <p>offer ends after 5 days</p>
          <a href="#" class="btn">view services</a>
        </div>
        <div class="women">
          <img src="./img/women.png" alt="" />
        </div>
      </div>
    </section>
    <section class="services-container banner-container">
      <div class="banner">
        <div class="shoe">
          <img src="./img/laptop.png" alt="" />
        </div>
        <div class="content">
          <span>In Need of our services?</span>
          <p>please Contact us on <a>08141247005</a></p>
          <p></p>
          <a href="#" class="btn">view services</a>
        </div>
        <div class="women">
          <img src="./img/women.png" alt="" />
        </div>
      </div>
    </section>
  `;
}

export default Banner;
