import { createProduct, inviteMember } from '../apis';
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
    ${await DashBar.render({ role, active6: true })}

    <div class="main-content">
    ${await DashHead.render({ firstName, title: 'Invite Member' })}

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
                          placeholder="first name"
                          />
                      </div>
                      <div>
                        <label for="name" class="">Last Name</label>
                        <input
                          type="text"
                          class=""
                          id="last-name"
                          placeholder="last name"
                          />
                      </div>
                      <div>
                        <label for="name" class="">Email Address</label>
                        <input
                          type="text"
                          class=""
                          id="email"
                          placeholder="email address"
                          />
                      </div>
                      <div>
                        <label for="name" class="">Phone Number</label>
                        <input
                          type="text"
                          class=""
                          id="phone"
                          placeholder="phone number"
                          />
                      </div>
                    </div>
                    
                  <button type="submit" id="create-user">
                      Invite Member
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
  const { customerId, token } = getUserInfo();
  document.getElementById('dynamic-link').innerHTML = payload;

  const createBtn = document.getElementById('create-user');
  createBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const member = await inviteMember({
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      email: document.getElementById('email').value,
      phoneNumber: document.getElementById('phone').value,
      token,
    });

    if (member.error) {
      failMessage('Invite failed');
    } else {
      showMessage('Invite Successful');
      location.reload();
    }
  });
}

export default addressBook;
