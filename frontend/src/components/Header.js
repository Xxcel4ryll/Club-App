const Header = {
  render,
};

function render({ firstName, role }) {
  return `
    <header>
    <a href="/#/" class="company">GofonLink</a>
    <ul class="navigation">
      <l1
        ><a href="/#/services"><i class="fas fa-cog"></i>
        <span class="off">Services</span></a></l1
      >
      <l1
        ><a href="/#/wallet"><i class="far fa-credit-card"></i>
        <span class="off">Wallet</span></a></l1
      >
      <l1>
        <a href="/#/cart">
          <i class="fas fa-cart-arrow-down"></i>
        <span class="off">Cart</span>
        </a>
      </l1>
      ${
        !firstName
          ? `<l1
        ><a href="/#/login"><i class="far fa-user"></i>
        <span class="off">Login</span></a></l1
      >`
          : firstName && role === 'User'
          ? `<l1
    ><a href="/#/orders"><i class="far fa-user-circle"></i>
    <span class="off">Hi, ${firstName}</span></a></l1
  >`
          : `<l1
          ><a href="/#/dashboard"><i class="far fa-user-circle"></i>
          <span class="off">Hi, ${firstName}</span></a></l1
        >`
      }
    </ul>
    <div class="search">
      <input type="text" placeholder="Search services and products" />
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
  </header>

  <section class="gofon-info">
    <div class="container">
      <div class="row v-center">
        <div class="header-item item-left">
          <div class="logo">
            <a href="#"></a>
          </div>
        </div>
        <!-- menu start here -->
        <div class="header-item item-center">
          <div class="menu-overlay"></div>
          <nav class="menu">
            <div class="mobile-menu-head">
              <div class="go-back"><i class="fa fa-angle-left"></i></div>
              <div class="current-menu-title"></div>
              <div class="mobile-menu-close">&times;</div>
            </div>
            <ul class="menu-main">
              
              <li class="menu-item-has-children">
                <a href="#">Computing <i class="fa fa-angle-down"></i></a>
                <div class="sub-menu mega-menu mega-menu-column-4">
                  <div class="list-item">
                    <h4 class="title">Printers</h4>
                    <ul>
                      <li><a href="#">Injet Printers</a></li>
                      <li><a href="#">Laser Printers</a></li>
                      <li><a href="#">Printer Ink and Toner</a></li>
                    </ul>
                    <h4 class="title">Data Storage</h4>
                    <ul>
                      <li><a href="#">External Hard Drives</a></li>
                      <li><a href="#">USB Flash Drives</a></li>
                      <li><a href="#">External Solid Drives</a></li>
                    </ul>
                  </div>
                  <div class="list-item">
                    <h4 class="title">Antivirus and Security</h4>
                    <ul>
                      <li><a href="#">Antivirus</a></li>
                      <li><a href="#">Internet Security</a></li>
                    </ul>
                    <h4 class="title">Computers</h4>
                    <ul>
                    <li><a href="#">Desktops</a></li>
                    <li><a href="#">Palmtop</a></li>
                    <li><a href="#">Laptops</a></li>
                    </ul>
                  </div>
                  <div class="list-item">
                    <h4 class="title">Top Brands</h4>
                    <ul>
                      <li><a href="#">Acer</a></li>
                      <li><a href="#">Hp</a></li>
                      <li><a href="#">Lenovo</a></li>
                      <li><a href="#">Apple</a></li>
                      <li><a href="#">Dell</a></li>
                      <li><a href="#">Msi</a></li>
                    </ul>
                  </div>
                  <div class="list-item">
                    <img src="img/laptop.png" alt="laptop" />
                  </div>
                </div>
              </li>
              <li class="menu-item-has-children">
                <a href="#">Services <i class="fa fa-angle-down"></i></a>
                <div class="sub-menu mega-menu mega-menu-column-4">
                  <div class="list-item">
                    <h4 class="title">Electrical</h4>
                    <ul>
                      <li><a href="#">Wiring</a></li>
                      <li><a href="#">Solar Installation</a></li>
                      <li><a href="#">Electric Fencing</a></li>
                      <li><a href="#">CCTV Installation</a></li>
                      <li><a href="#">Satellite Installation</a></li>
                      <li><a href="#">Electric Panel Configuration</a></li>
                    </ul>
                    <h4 class="title">Electronic</h4>
                    <ul>
                      <li><a href="#">Car Tracker</a></li>
                      <li><a href="#">Fire Alarm</a></li>
                      <li><a href="#">Time Attendant Installation</a></li>
                      <li><a href="#">Security System Installation</a></li>
                    </ul>
                  </div>
                  <div class="list-item">
                    <h4 class="title">ICT</h4>
                    <ul>
                      <li><a href="#">Laptop/Desktop Repairs</a></li>
                      <li><a href="#">Printer Repairs</a></li>
                      <li><a href="#">DI and Copier Repairs</a></li>
                      <li><a href="#">Large Format Repairs</a></li>
                      <li><a href="#">Web and Mobile Development</a></li>
                      <li><a href="#">Networking</a></li>
                    </ul>
                    
                  </div>
                  
                  <div class="list-item middle">
                    <img src="img/collab.svg" alt="shop" />
                    <div>
                      <p>In need of our service?</p>
                      <p>Please call <a href="+2348141247005">+2348141247005</a></p>
                    </div>
                  </div>
                </div>
              </li>
              <li class="menu-item-has-children">
                <a href="#">Electronics  <i class="fa fa-angle-down"></i></a>
                <div class="sub-menu mega-menu mega-menu-column-4">
                  <div class="list-item">
                    <h4 class="title">Camera & Photos</h4>
                    <ul>
                      <li><a href="#">Digital Camera</a></li>
                      <li><a href="#">Video Surveillance</a></li>
                      <li><a href="#">Camcorders</a></li>
                      <li><a href="#">Projectors</a></li>
                    </ul>
                    <h4 class="title">Home Audio</h4>
                    <ul>
                      <li><a href="#">Home Theatre Systems</a></li>
                      <li><a href="#">Sound Bars</a></li>
                      <li><a href="#">Amplifiers & Receivers</a></li>
                    </ul>
                  </div>
                  
                  <div class="list-item">
                    <h4 class="title">Television & Video</h4>
                    <ul>
                      <li><a href="#">Televisions</a></li>
                      <li><a href="#">Smart TVs</a></li>
                      <li><a href="#">LED & LCD TVs</a></li>
                      <li><a href="#">QLED & OLED TVs</a></li>
                      <li><a href="#">DVD Players & Recorders</a></li>
                    </ul>
                    <h4 class="title">Generators & Portable Power</h4>
                    <ul>
                      <li><a href="#">Generators</a></li>
                      <li><a href="#">Power Inverters</a></li>
                      <li><a href="#">Solar & Wind Power</a></li>
                      <li><a href="#">Stablizers</a></li>
                    </ul>
                  </div>
                  <div class="list-item">
                    <h4 class="title">Top Electronics Brands</h4>
                    <ul>
                      <li><a href="#">LG</a></li>
                      <li><a href="#">Canon</a></li>
                      <li><a href="#">Sony</a></li>
                      <li><a href="#">Hisense</a></li>
                      <li><a href="#">DStv</a></li>
                    </ul>
                  </div>
                  <div class="list-item">
                    <img src="img/kia.png" alt="shop" />
                  </div>
                </div>
              </li>
              <li class="menu-item-has-children">
                <a href="#">Automobile <i class="fas fa-angle-down"></i></a>
                <div class="sub-menu single-column-menu">
                  <ul>
                    <li><a href="#">Standard Layout</a></li>
                    <li><a href="#">Grid Layout</a></li>
                    <li><a href="#">single Post Layout</a></li>
                  </ul>
                </div>
              </li>
              <li class="menu-item-has-children">
                <a href="#">Gadgets <i class="fas fa-angle-down"></i></a>
                <div class="sub-menu single-column-menu">
                  <ul>
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Register</a></li>
                    <li><a href="#">Faq</a></li>
                    <li><a href="#">404 Page</a></li>
                  </ul>
                </div>
              </li>
              
            </ul>
          </nav>
        </div>
        <div class="contact">
          <a href="#"><i id="facebook" class="fab fa-facebook"></i></a>
          <a href="#"><i id="whatsapp" class="fab fa-whatsapp"></i></a>
          <a href="#"><i id="twitter" class="fab fa-twitter"></i></a>
          <a href="#"
            ><i id="instagram" class="fab fa-instagram-square"></i
          ></a>
        </div>
        <!-- menu end here -->
        <div class="header-item item-right">
          <!-- mobile menu trigger -->
          <div class="mobile-menu-trigger">
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </section>    
    `;
}

export default Header;
