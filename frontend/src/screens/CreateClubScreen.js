import { createClub } from '../apis';
import DashBar from '../components/DashBar';
import DashHead from '../components/DashHead';
import { getAddress, getUserInfo } from '../localStorage';
import { failMessage, redirectUser, showMessage } from '../utils';
import { payload } from '../utils/styles-loader';

const addressBook = {
  render,
  afterRender,
};

async function render() {
  const { firstName, role } = getUserInfo();

  if (!firstName) {
    location = '/';
  }
  return `
    <input type="checkbox" name="" id="nav-toggle" />
    ${await DashBar.render({ role, active11: true })}

    <div class="main-content">
    ${await DashHead.render({ firstName, title: 'Create Club' })}

        <main>
        <div class="customer-grid">
            <div class="projects">
            <div class="card">
                <div class="card-body">
                <div class="table-responsive">
                    <form class="profile">
                   
                    
                    <div class="sub">
                      <div >
                        <label for="name" class="">Club Name</label>
                        <input
                          type="text"
                          class=""
                          id="name"
                          placeholder="name"
                          />
                      </div>
                      <div>
                        <label for="name" class="">City</label>
                        <input
                          type="text"
                          class=""
                          id="city"
                          placeholder="city"
                          />
                      </div>
                      <div>
                        <label for="name" class="">State</label>
                        <input
                          type="text"
                          class=""
                          id="state"
                          placeholder="state"
                          />
                      </div>
                    </div>

                    

                    <div class="sub">
                      <div >
                        <label for="name" class="">Address</label>
                        <input
                          type="text"
                          class=""
                          id="address"
                          placeholder="address"
                          />
                      </div>

                      
                      
                    </div>
                    
                  <button type="submit" id="create-club">
                      Create Club
                      <span class="fas fa-arrow-right"></span>
                  </button>
                  </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        </main>
    </div>          
  `;
}

function afterRender() {
  const { role, customerId, token } = getUserInfo();
  document.getElementById('dynamic-link').innerHTML = payload;

  const createBtn = document.getElementById('create-club');
  createBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const club = await createClub({
      name: document.getElementById('name').value,
      state: document.getElementById('state').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      token,
    });

    if (club.error) {
      failMessage('failed');
    } else {
      showMessage('Successfully created');
      location.reload();
    }
  });
}

export default addressBook;
