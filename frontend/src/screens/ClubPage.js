import { fetchClubs, singleOrder, getUser } from '../apis';
import DashBar from '../components/DashBar';
import DashHead from '../components/DashHead';
import { getUserInfo } from '../localStorage';
import { payload } from '../utils/styles-loader';

const orderspage = {
  render,
  afterRender,
};

async function render() {
  const { firstName, role, id, token } = getUserInfo();
  const { data: clubs } = await fetchClubs({ token });

  if (!firstName) {
    location = '/';
  }
  return `
  <input type="checkbox" name="" id="nav-toggle" />
  ${await DashBar.render({ role, active9: true })}

  <div class="main-content">
  
  ${await DashHead.render({ firstName, title: 'Clubs' })}

    <main>
      <div class="customer-grid">
        <div class="projects">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <td>Club Name</td>
                      <td>Club Location</td>
                      <td>City</td>
                      <td>State</td>
                      <td>Owned By</td>
                      <td>Created At</td>
                    </tr>
                  </thead>
                  <tbody>                  
                  ${
                    clubs === undefined
                      ? ''
                      : `${
                          clubs.rows
                            .map(
                              (item) =>
                                `
                            ${`
                            <tr>
                            <td>${item.name}</td>
                            <td>${item.address}</td>
                            <td>${item.city}</td>
                            <td>${item.state}</td>
                            <td>${item.state}</td>
                           
                            
                            <td>${
                              item.createdAt.toLocaleString().split('T')[0]
                            }</td>
                            
                            
                            
                            </tr>
                              
                              `}`
                            )
                            .join('\n') || ''
                        }`
                  }
                  
                    
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
  </div>   
  `;
}

function afterRender() {
  document.getElementById('dynamic-link').innerHTML = payload;

  const { token } = getUserInfo();

  const viewOrder = document.querySelectorAll('.edit');

  Array.from(viewOrder).forEach((product) => {
    product.addEventListener('click', async (e) => {
      const product = e.target.getAttribute('order-id');
      const modal = document.querySelector('.modal');
      const { data: order } = await singleOrder(token, product);

      if ((modal.style.display = 'none')) {
        const modalContent = `
          <div class="wrapper">
            <div class="title"><span>
            Order Details</span></div>
            <form action="#" class="jack-form">
              ${order
                .map(
                  (value) =>
                    `
                  <div class="jack">
                      <p>${value.productName}
                      <span>(${value.productQty})</span>
                      </p>
                  </div>
                  `
                )
                .join('\n')}
              
              <p>Total Items: ${order.length}</p>
            </form>
          </div>`;

        modal.style.display = 'block';
        modal.innerHTML = modalContent;
      }

      window.addEventListener('click', (e) => {
        if (e.target == modal) {
          modal.style.display = 'none';
        }
      });
    });
  });
}

export default orderspage;
