import { fetchUsers, getUser } from '../apis';
import DashBar from '../components/DashBar';
import DashHead from '../components/DashHead';
import { getUserInfo } from '../localStorage';
import { payload } from '../utils/styles-loader';

const customerpage = {
  render,
  afterRender,
};

async function render() {
  const { firstName, role, id, token } = getUserInfo();
  const { data: users } = await fetchUsers({ token });
  if (!firstName || role !== 'Admin') {
    location = '/';
  }
  return `
  <input type="checkbox" name="" id="nav-toggle" />
  ${await DashBar.render({ role, active2: true })}
  <div class="main-content">
  ${await DashHead.render({ title: 'Users' })}
    
    <main>
      <div class="customer-grid">
        <div class="projects">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <td>Full Name</td>
                      <td>Email</td>
                      <td>State</td>
                      <td>City</td>
                      <td>Address</td>
                      <td>Mobile</td>
                    </tr>
                  </thead>
                  <tbody>
                    ${users.rows
                      .map(
                        (item) =>
                          `
                          <tr>
                          <td>${item.firstName} ${item.lastName}</td>
                          <td>${item.email}</td>
                          <td>${item.state ? item.state : 'Nill'}</td>
                          <td>${item.city ? item.city : 'Nill'}</td>
                          <td>${item.address ? item.address : 'Nill'}</td>
                          <td>+${item.phoneNumber}</td>
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
  `;
}

function afterRender() {
  document.getElementById('dynamic-link').innerHTML = payload;
}

export default customerpage;
