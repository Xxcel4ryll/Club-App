import { fetchProduct, fetchPartners, getProduct } from '../apis.js';
import Banner from '../components/Banner.js';
import Header from '../components/Header.js';
import { getUserInfo, setCartItems, getCartItems } from '../localStorage.js';
import { hideLoading, showLoading, showMessage } from '../utils.js';
import style from '../../dist/css/style.css';

const homeScreen = {
  render,
  afterRender,
};

async function render() {
  showLoading();
  const { firstName, role } = await getUserInfo();
  const { rows } = await fetchProduct();
  const { rows: allPartners } = await fetchPartners();
  hideLoading();
  let secondaryAds = [];
  let bestSelling = [];

  for (let i = 0; i < rows.length; i++) {
    if (rows[i].quantity > 0) {
      bestSelling.push(rows[i]);
    }
  }

  return `    
    ${Header.render({ firstName, role })}
    

    ${await Banner.render()}

    <section class="carousel senior">
      <main class="carousel-title">Computing <a href="#/computing" class="more">see all >></a></main>
      ${bestSelling
        .map(
          (item, index) =>
            `
      ${
        index < 6
          ? `<div class="box modal" image-id="${item.id}">
          <img src="${
            item.primaryImage
          }" alt="" class="model slides modal" image-id="${item.id}" />
          <img src="${
            item.secondaryImage
          }" alt="" class="model showcase modal" image-id="${item.id}" />
          <p class="marvel modal" image-id="${item.id}">${item.name}</p>
          <p class="price modal" image-id="${
            item.id
          }">&#8358; ${item.price.toLocaleString()}</p>
          <button image-Id=${item.id} class="add-to-cart">Add To Cart</button>
        </div>`
          : ''
      }`
        )
        .join('\n')}
    </section>

    <section class="banner-container">
      <div class="banner">
        <div class="shoe">
          <img src="./img/laptop.png" alt="" />
        </div>
        <div class="content">
          <span>upto</span>
          <h3>50% 0ff</h3>
          <p>offer ends after 5 days</p>
          <a href="#" class="btn">veiw offer</a>
        </div>
        <div class="women">
          <img src="./img/women.png" alt="" />
        </div>
      </div>
    </section>

    <section class="carousel senior">
      <main class="carousel-title">Partners</main>
      ${bestSelling
        .map(
          (item, index) =>
            `
      ${
        index < 6
          ? `<div class="box modal" image-id="${item.id}">
          <img src="${
            item.primaryImage
          }" alt="" class="model slides modal" image-id="${item.id}" />
          <img src="${
            item.secondaryImage
          }" alt="" class="model showcase modal" image-id="${item.id}" />
          <p class="marvel modal" image-id="${item.id}">${item.name}</p>
          <p class="price modal" image-id="${
            item.id
          }">&#8358; ${item.price.toLocaleString()}</p>
          <button image-Id=${item.id} class="add-to-cart">Add To Cart</button>
        </div>`
          : ''
      }`
        )
        .join('\n')}
    </section>

    <section class="carousel">
    <main class="carousel-title">Electronics <a href="#/electronics" class="more">see all >></a></main>
      ${bestSelling
        .map(
          (item, index) =>
            `
      ${
        index < 6
          ? `<div class="box modal" image-id="${item.id}">
          <img src="${item.primaryImage}" alt="" class="model slides" />
          <img src="${item.secondaryImage}" alt="" class="model showcase" />
          <p class="marvel">${item.name}</p>
          <p class="price">&#8358; ${item.price.toLocaleString()}</p>
          <button image-Id=${item.id} class="add-to-cart">Add To Cart</button>
        </div>`
          : ''
      }`
        )
        .join('\n')}
    </section>

    <section class="carousel">
    <main class="carousel-title">Automobile <a href="#/automobile" class="more">see all >></a></main>
      <div class="box">
        <img src="./img/gofon.png" alt="" class="model slides" />
        <img src="./img/second.png" alt="" class="model showcase" />
        <p class="marvel">Evochic CX-23</p>
        <p class="price">&#8358; 3900</p>
        <button>Add To Cart</button>
      </div>
      <div class="box">
        <img src="./img/gofon.png" alt="" class="model slides" />
        <img src="./img/second.png" alt="" class="model showcase" />
        <p class="marvel">Evochic CX-23</p>
        <p class="price">&#8358; 3900</p>
        <button>Add To Cart</button>
      </div>

      <div class="box">
        <img src="./img/gofon.png" alt="" class="model" />
        <p class="marvel">Evochic CX-23</p>
        <p class="price">&#8358; 3900</p>
        <button>Add To Cart</button>
      </div>
      <div class="box">
        <img src="./img/gofon.png" alt="" class="model" />
        <p class="marvel">Evochic CX-23</p>
        <p class="price">&#8358; 3900</p>
        <button>Add To Cart</button>
      </div>
      <div class="box">
        <img src="./img/gofon.png" alt="" class="model" />
        <p class="marvel">Evochic CX-23</p>
        <p class="price">&#8358; 3900</p>
        <button>Add To Cart</button>
      </div>
      <div class="box">
        <img src="./img/gofon.png" alt="" class="model" />
        <p class="marvel">Evochic CX-23</p>
        <p class="price">&#8358; 3900</p>
        <button>Add To Cart</button>
      </div>
    </section>

    <section class="banner-container">
      <div class="banner">
        <div class="shoe">
          <img src="./img/laptop.png" alt="" />
        </div>
        <div class="content">
          <span>upto</span>
          <h3>50% 0ff</h3>
          <p>offer ends after 5 days</p>
          <a href="#" class="btn">veiw offer</a>
        </div>
        <div class="women">
          <img src="./img/women.png" alt="" />
        </div>
      </div>
    </section>

    <section class="carousel senior">
      <main class="carousel-title">Gadget <a href="#/gadget" class="more">see all >></a></main>
      ${bestSelling
        .map(
          (item, index) =>
            `
      ${
        index < 6
          ? `<div class="box modal" image-id="${item.id}">
          <img src="${
            item.primaryImage
          }" alt="" class="model slides modal" image-id="${item.id}" />
          <img src="${
            item.secondaryImage
          }" alt="" class="model showcase modal" image-id="${item.id}" />
          <p class="marvel modal" image-id="${item.id}">${item.name}</p>
          <p class="price modal" image-id="${
            item.id
          }">&#8358; ${item.price.toLocaleString()}</p>
          <button image-Id=${item.id} class="add-to-cart">Add To Cart</button>
        </div>`
          : ''
      }`
        )
        .join('\n')}
    </section>

    <section class="banner-container">
      <div class="banner">
        <div class="shoe">
          <img src="./img/laptop.png" alt="" />
        </div>
        <div class="content">
          <span>upto</span>
          <h3>50% 0ff</h3>
          <p>offer ends after 5 days</p>
          <a href="#" class="btn">veiw offer</a>
        </div>
        <div class="women">
          <img src="./img/women.png" alt="" />
        </div>
      </div>
    </section>

    <footer class="footer-container">
      <div class="container">
        <div class="row">
          <div class="footer-col">
            <h4>company</h4>
            <ul>
              <li><a href="#">about us</a></li>
              <li><a href="#">our services</a></li>
              <li><a href="#">privacy policy</a></li>
              <li><a href="#">affiliate program</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>get help</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">shipping</a></li>
              <li><a href="#">returns</a></li>
              <li><a href="#">order status</a></li>
              <li><a href="#">payment options</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>online shop</h4>
            <ul>
              <li><a href="#">watch</a></li>
              <li><a href="#">bag</a></li>
              <li><a href="#">shoes</a></li>
              <li><a href="#">dress</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>follow us</h4>
            <div class="social-links">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <div class="product-details" id="productinfo">
    
    </div>
   
  `;
}

function afterRender() {
  let slideIndex = 0;

  (function carousel() {
    let slides = document.getElementsByClassName('slides');
    let showcase = document.getElementsByClassName('showcase');
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'block';
      showcase[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    showcase[slideIndex - 1].style.display = 'initial';
    slides[slideIndex - 1].style.display = 'none';
    setTimeout(carousel, 3000);
  })();

  const menu = document.querySelector('.menu');
  const menuMain = menu.querySelector('.menu-main');
  const goBack = menu.querySelector('.go-back');
  const menuTrigger = document.querySelector('.mobile-menu-trigger');
  const closeMenu = menu.querySelector('.mobile-menu-close');
  let subMenu;
  menuMain.addEventListener('click', (e) => {
    if (!menu.classList.contains('active')) {
      return;
    }
    if (e.target.closest('.menu-item-has-children')) {
      const hasChildren = e.target.closest('.menu-item-has-children');
      showSubMenu(hasChildren);
    }
  });
  goBack.addEventListener('click', () => {
    hideSubMenu();
  });
  menuTrigger.addEventListener('click', () => {
    toggleMenu();
  });
  closeMenu.addEventListener('click', () => {
    toggleMenu();
  });
  document.querySelector('.menu-overlay').addEventListener('click', () => {
    toggleMenu();
  });
  function toggleMenu() {
    menu.classList.toggle('active');
    document.querySelector('.menu-overlay').classList.toggle('active');
  }
  function showSubMenu(hasChildren) {
    subMenu = hasChildren.querySelector('.sub-menu');
    subMenu.classList.add('active');
    subMenu.style.animation = 'slideLeft 0.5s ease forwards';
    const menuTitle =
      hasChildren.querySelector('i').parentNode.childNodes[0].textContent;
    menu.querySelector('.current-menu-title').innerHTML = menuTitle;
    menu.querySelector('.mobile-menu-head').classList.add('active');
  }

  function hideSubMenu() {
    subMenu.style.animation = 'slideRight 0.5s ease forwards';
    setTimeout(() => {
      subMenu.classList.remove('active');
    }, 300);
    menu.querySelector('.current-menu-title').innerHTML = '';
    menu.querySelector('.mobile-menu-head').classList.remove('active');
  }

  window.onresize = function () {
    if (this.innerWidth > 991) {
      if (menu.classList.contains('active')) {
        toggleMenu();
      }
    }
  };

  const cartButton = document.getElementsByClassName('add-to-cart');
  for (let btn of cartButton) {
    btn.addEventListener('click', async (e) => {
      const productId = e.target.getAttribute('image-Id');
      const { primaryImage, id, name, price, discount, quantity } =
        await getProduct(productId);
      addToCart({ primaryImage, id, name, price, discount, quantity, qty: 1 });
    });
  }
  function addToCart(item, forceUpdate = false) {
    let cartItems = getCartItems();
    const existItem = cartItems.find((value) => value.id === item.id);

    if (existItem) {
      if (forceUpdate) {
        cartItems = cartItems.map((value) => {
          value.id === existItem.id ? item : value;
        });
      }
    } else {
      cartItems = [...cartItems, item];
      showMessage('Item added to Cart');
    }
    setCartItems(cartItems);
  }

  const modal = document.querySelectorAll('.modal');
  Array.from(modal).map((value) => {
    value.addEventListener('click', async (e) => {
      const productId = e.target.getAttribute('image-id');
      const {
        name,
        quantity,
        price,
        discount,
        model,
        size,
        description,
        weight,
      } = await getProduct(productId);

      const modalContent = `
      <div class="round">
        <input checked="checked" id="box1" name="box" type="radio">
        <label for="box1">Overview</label>
        <div class="content">
          <h3>Product Type:
          <span>London Use</span>
          </h3>
          <h3>Product Name:
          <span>${name}</span>
          </h3>
          <h3>Available Quantity:
          <span> ${quantity}</span>
          </h3>
          <h3>Price:
          <span> ${price.toLocaleString()}</span>
          </h3>
          <h3>Discount:
          <span> ${discount}%</span>
          </h3>
        </div>
        <input id="box2" name="box" type="radio">
        <label for="box2">Specifications</label>
        <div class="content">
          <h3> Model:
          <span>${model}</span>
          </h3>
          <h3> Weight:
            <span> ${weight}</span>
          </h3>
          
          <h3>Size:
            <span> ${size} </span>
          </h3>
          
        </div>
        <input id="box3" name="box" type="radio">
        <label for="box3">Description</label>
        <div class="content">
          <h3>${name}</h3>
          <span class="span">${description}</span>
        </div>
      </div>
      `;

      const productInfo = document.getElementById('productinfo');
      productInfo.innerHTML = modalContent;
      productInfo.style.display = 'block';

      window.addEventListener('click', (e) => {
        if (e.target == productinfo) {
          productInfo.style.display = 'none';
        }
      });
    });
  });

  let bannerIndex = 0;

  function bannerCarousel() {
    const banner = document.getElementsByClassName('services-container');
    Array.from(banner).forEach((value) => {
      value.style.display = 'none';
    });

    bannerIndex++;

    bannerIndex > banner.length ? [(bannerIndex = 1)] : '';

    banner[bannerIndex - 1].style.display = 'flex';
    setTimeout(bannerCarousel, 3000);
  }

  bannerCarousel();
}

export default homeScreen;
