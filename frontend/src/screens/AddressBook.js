import { userUpdate } from '../apis';
import DashBar from '../components/DashBar';
import DashHead from '../components/DashHead';
import {
  getAddress,
  getUserInfo,
  saveAddress,
  saveUserInfo,
} from '../localStorage';
import { failMessage, redirectUser, showMessage } from '../utils';
import { payload } from '../utils/styles-loader';

const addressBook = {
  render,
  afterRender,
};

async function render() {
  const { firstName, role } = getUserInfo();
  const { postal, city, state, address } = getAddress();

  if (!firstName) {
    document.location.hash = '/';
  }
  return `
    <input type="checkbox" name="" id="nav-toggle" />
    ${await DashBar.render({ role, active6: true })}

    <div class="main-content">
    ${await DashHead.render({ firstName, title: 'Address Update' })}

        <main>
        <div class="customer-grid">
            <div class="projects">
            <div class="card">
                <div class="card-body">
                <div class="table-responsive">
                    <form class="profile">
                    <div class="">
                        <span class="far fa-user-circle"></span>
                        <label for="name" class="">State</label>
                        <input
                        type="text"
                        class=""
                        id="state"
                        required
                        placeholder="${state || 'state'}"
                        />
                    </div>
                    <div class="">
                        <span class="far fa-user-circle"></span>
                        <label for="name" class="">City</label>
                        <input
                        type="text"
                        class=""
                        required
                        id="city"
                        placeholder="${city || 'city'}"
                        />
                    </div>
                    <div class="">
                    <span class="fas fa-envelope"></span>
                    <label for="email" class="">Address</label>
                    <input
                    type="text"
                    class=""
                    required
                    id="address"
                    placeholder="${address || 'address'}"
                    />
                </div>
                <div class="">
                        <span class="fas fa-mobile-alt"></span>
                        <label for="mobile" class="">Postal Code</label>
                        <input
                        type="text"
                        class=""
                        placeholder="${postal || 'postal code'}"
                        id="postal"
                        />
                    </div>
                    
                    
                  <button type="submit" id="update-account">
                      Update
                      <span class="fas fa-arrow-up"></span>
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
  const { role, token, id } = getUserInfo();

  document.getElementById('dynamic-link').innerHTML = payload;

  const updateBtn = document.getElementById('update-account');
  updateBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const updatedUser = await userUpdate({
      state: document.getElementById('state').value || state,
      city: document.getElementById('city').value || city,
      address: document.getElementById('address').value || address,
      postal: document.getElementById('postal').value || postal,
      role: role.toLowerCase(),
      token,
    });

    if (updatedUser.error) {
      failMessage('Update failed');
    } else {
      showMessage('Update Successful');
      saveAddress({
        state: document.getElementById('state').value,
        city: document.getElementById('city').value,
        address: document.getElementById('address').value,
        postal: document.getElementById('postal').value,
      });
      location.reload();
    }
  });
}

export default addressBook;
