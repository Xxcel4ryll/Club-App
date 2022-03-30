import { accountUpdate, getUser } from '../apis';
import DashBar from '../components/DashBar';
import DashHead from '../components/DashHead';
import { getUserInfo, saveUserInfo } from '../localStorage';
import { failMessage, redirectUser, showMessage } from '../utils';
import { payload } from '../utils/styles-loader';

const profilepage = {
  render,
  afterRender,
};

async function render() {
  const { firstName, role, lastName, id, email, phoneNumber } = getUserInfo();

  if (!firstName) {
    document.location.hash = '/';
  }
  return `
    <input type="checkbox" name="" id="nav-toggle" />
    ${await DashBar.render({ role, active5: true })}

    <div class="main-content">
    ${await DashHead.render({ firstName, title: 'Account Update' })}

        <main>
        <div class="customer-grid">
            <div class="projects">
            <div class="card">
                <div class="card-body">
                <div class="table-responsive">
                    <form class="profile">
                    <div class="">
                        <span class="far fa-user-circle"></span>
                        <label for="name" class="">First Name</label>
                        <input
                        type="text"
                        class=""
                        id="first-name"
                        placeholder="${firstName}"
                        />
                    </div>
                    <div class="">
                        <span class="far fa-user-circle"></span>
                        <label for="name" class="">Last Name</label>
                        <input
                        type="text"
                        class=""
                        id="last-name"
                        placeholder="${lastName}"
                        />
                    </div>
                    <div class="">
                    <span class="fas fa-envelope"></span>
                    <label for="email" class="">Email Address</label>
                    <input
                    type="email"
                    class=""
                    id="email"
                    placeholder="${email}"
                    />
                </div>
                <div class="">
                        <span class="fas fa-mobile-alt"></span>
                        <label for="mobile" class="">Mobile Number</label>
                        <input
                        type="text"
                        class=""
                        placeholder="${phoneNumber}"
                        id="mobile"
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
  const { role, email, token, id, firstName, lastName, phoneNumber } =
    getUserInfo();

  document.getElementById('dynamic-link').innerHTML = payload;

  const updateBtn = document.getElementById('update-account');
  updateBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const updatedUser = await accountUpdate({
      firstName: document.getElementById('first-name').value || firstName,
      lastName: document.getElementById('last-name').value || lastName,
      phoneNumber: document.getElementById('mobile').value || phoneNumber,
      email: document.getElementById('email').value || email,
      role: role.toLowerCase(),
      token,
    });

    if (updatedUser.error) {
      failMessage('Update failed');
    } else {
      saveUserInfo({ ...updatedUser.data, role, id, token });
      showMessage('Update Successful');
      location.reload();
    }
  });
}

export default profilepage;
