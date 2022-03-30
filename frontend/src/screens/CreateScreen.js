import { createUser } from '../apis';
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
    ${await DashBar.render({ role, active8: true })}

    <div class="main-content">
    ${await DashHead.render({ firstName, title: 'Create User' })}

        <main>
        <div class="customer-grid">
            <div class="projects">
            <div class="card">
                <div class="card-body">
                <div class="table-responsive">
                    <form class="profile">
                   
                    
                    <div class="sub">
                      <div >
                        <label for="name" class="">First Name</label>
                        <input
                          type="text"
                          class=""
                          id="first-name"
                          min="0"
                          placeholder="first name"
                          />
                      </div>
                      <div>
                        <label for="name" class="">Last Name</label>
                        <input
                          type="text"
                          class=""
                          id="last-name"
                          min="0"
                          placeholder="last name"
                          />
                      </div>
                      <div>
                        <label for="name" class="">Email Address</label>
                        <input
                          type="text"
                          class=""
                          id="email"
                          min="0"
                          placeholder="email address"
                          />
                      </div>
                    </div>

                    

                    <div class="sub">
                      <div >
                        <label for="name" class="">Phone number</label>
                        <input
                          type="text"
                          class=""
                          id="phone"
                          placeholder="phone number"
                          />
                      </div>

                      <div >
                        <label for="name" class="">Password</label>
                        <input
                          type="password"
                          class=""
                          id="password"
                          placeholder="password"
                          />
                      </div>

                      <div >
                        <label for="name" class="">Date Of Birth</label>
                        <input
                          type="date"
                          class=""
                          id="birth"
                          placeholder="birth"
                          />
                      </div>
                      
                    </div>
                    
                  <button type="submit" id="create-user">
                      Create User
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

  const createBtn = document.getElementById('create-user');
  createBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const product = await createUser({
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      phoneNumber: document.getElementById('phone').value,
      password: document.getElementById('password').value,
      email: document.getElementById('email').value,
      token,
    });

    if (product.error) {
      failMessage('failed');
    } else {
      showMessage('Successful created');
      location.reload();
    }
  });
}

export default addressBook;
