import { accountUpdate, getUser, passwordUpdate } from '../apis';
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
    document.location.hash = '/';
  }
  return `
    <input type="checkbox" name="" id="nav-toggle" />
    ${await DashBar.render({ role, active7: true })}

    <div class="main-content">
    ${await DashHead.render({ firstName, title: 'Privacy Update' })}

        <main>
        <div class="customer-grid">
            <div class="projects">
            <div class="card">
                <div class="card-body">
                <div class="table-responsive">
                    <form class="profile">
                    <div class="">
                        <span class="far fa-user-circle"></span>
                        <label for="name" class="">Old Password</label>
                        <input
                        type="password"
                        class=""
                        id="old-pass"
                        placeholder="Old Password"
                        />
                    </div>
                    <div class="">
                        <span class="far fa-user-circle"></span>
                        <label for="name" class="">New Password</label>
                        <input
                        type="password"
                        class=""
                        id="new-pass"
                        placeholder="New Password"
                        />
                    </div>
                    <div class="">
                    <span class="fas fa-envelope"></span>
                    <label for="email" class="">Confirm Password</label>
                    <input
                    type="password"
                    class=""
                    id="confirm-pass"
                    required
                    placeholder="Confirm Password"
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
  const { role, token } = getUserInfo();
  document.getElementById('dynamic-link').innerHTML = payload;

  const updateBtn = document.getElementById('update-account');
  updateBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const updatedUser = await passwordUpdate({
      oldPassword: document.getElementById('old-pass').value,
      newPassword: document.getElementById('new-pass').value,
      confirmPassword: document.getElementById('confirm-pass').value,
      role: role.toLowerCase(),
      token,
    });

    if (updatedUser.error) {
      failMessage('Update failed');
    } else {
      showMessage('Update Successful');
      location.reload();
    }
  });
}

export default addressBook;
