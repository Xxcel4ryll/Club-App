import { fetchProduct, updateProduct, getProduct, deleteMember } from '../apis';
import DashBar from '../components/DashBar';
import DashHead from '../components/DashHead';
import { getUserInfo } from '../localStorage';
import { showMessage } from '../utils';
import { payload } from '../utils/styles-loader';

const productspage = {
  render,
  afterRender,
};

async function render() {
  const { firstName, role, id } = getUserInfo();
  const { rows: products } = await fetchProduct();

  if (!firstName || role === 'User') {
    location = '/';
  }
  return `
  <input type="checkbox" name="" id="nav-toggle" />
  ${await DashBar.render({ role, active9: true })}

  <div class="main-content">
  ${await DashHead.render({ title: 'Products' })}
    
    <main>
      <div class="customer-grid">
        <div class="projects">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <td>Product Name</td>
                      <td>Price</td>
                      <td>Items</td>
                      <td>Discount</td>
                      <td>Seller Name</td>
                      <td>Role</td>
                    </tr>
                  </thead>
                  <tbody>
                    ${products
                      .map(
                        (item) =>
                          `
                          <tr>
                          <td>${item.name}</td>
                          <td>&#8358;${
                            item.price && item.price.toLocaleString()
                          }</td>
                          <td>${item.quantity}</td>
                          <td>${item.discount}%</td>
                          <td>${item.sellerName}</td>
                          <td>${item.role}</td>
                          <td class="edit"> <i 
                          product-id=${item.id}
                          class="fa fa-edit"></i></td>
                          <td class="trash"> <i product-id=${
                            item.id
                          } class="fa fa-trash"></i></td>
                        </tr>
                          `
                      )
                      .join('\n')}  
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>  
  <div class="modal" >
      <div class="wrapper">
        <div class="title"><span>Update Product</span></div>
        <form action="#" id="forgot-form">
          <div class="row">
            <i class="fas fa-user"></i>
            <input type="text" id="name" placeholder="Product Name" >
          </div>

          <div class="row">
            <i class="fas fa-tags"></i>
            <input type="number" id="price" placeholder="Price" >
          </div>

          <div class="row">
            <i class="fas fa-badge"></i>
            <input type="number" id="quantity" placeholder="Quantity" >
          </div>
          
          <div class="row">
            <i class="fas fa-percentage"></i>
            <input type="number" id="discount" placeholder="Discount (%)" >
          </div>

          <div class="row button">
            <input type="submit" id="update-product" value="Submit">
          </div>
          
        </form>
      </div>
    </div>   
  `;
}

async function afterRender() {
  document.getElementById('dynamic-link').innerHTML = payload;
  const { token } = getUserInfo();

  const editProduct = document.querySelectorAll('.edit'),
    modifyProduct = document.querySelector('#update-product'),
    removeProduct = document.querySelectorAll('.trash');

  await DashBar.afterRender();

  Array.from(removeProduct).forEach((product) => {
    product.addEventListener('click', async (e) => {
      const product = e.target.getAttribute('product-id');
      const { data } = await deleteMember({ product, token });

      if (!!data) {
        location.reload();
      }
    });
  });

  Array.from(editProduct).forEach((product) => {
    product.addEventListener('click', async (e) => {
      const product = e.target.getAttribute('product-id');
      const modal = document.querySelector('.modal');
      // modal.classList.add('active');
      const item = await getProduct(product);
      if ((modal.style.display = 'none')) {
        modal.style.display = 'block';

        const node = modal.childNodes[1].children[1].children;
        node[0].lastElementChild.placeholder = `${item.name}`;
        node[1].lastElementChild.placeholder = `${item.price.toLocaleString()}`;
        node[2].lastElementChild.placeholder = `${item.quantity}`;
        node[3].lastElementChild.placeholder = `${item.discount}%`;
      }

      window.addEventListener('click', (e) => {
        if (e.target == modal) {
          modal.style.display = 'none';
        }
      });

      modifyProduct.addEventListener('click', async (e) => {
        e.preventDefault();
        const status = await updateProduct({
          id: item.id,
          name: document.getElementById('name').value || item.name,
          price: document.getElementById('price').value || item.price,
          quantity: document.getElementById('quantity').value || item.quantity,
          discount: document.getElementById('discount').value || item.discount,
          token,
        });

        if (status) {
          location.reload();
          showMessage('Update successfull');
        }
      });
    });
  });
}

export default productspage;
