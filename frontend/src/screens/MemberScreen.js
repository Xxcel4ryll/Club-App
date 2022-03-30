import { deleteMember, fetchMembers, getUser } from '../apis';
import DashBar from '../components/DashBar';
import DashHead from '../components/DashHead';
import { getUserInfo } from '../localStorage';
import { showMessage } from '../utils';
import { payload } from '../utils/styles-loader';

const customerpage = {
  render,
  afterRender,
};

async function render() {
  const { firstName, role, id, token } = getUserInfo();
  const { data: users } = await fetchMembers({ token });
  // const { email } = await getUser(id);
  if (!firstName) {
    location = '/';
  }
  return `
  <input type="checkbox" name="" id="nav-toggle" />
  ${await DashBar.render({ role, active4: true })}
  <div class="main-content">
  ${await DashHead.render({ title: 'Members' })}
    
    <main>
      <div class="customer-grid">
        <div class="projects">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <td>First Name</td>
                      <td>Last Name</td>
                      <td>Email</td>
                      <td>Mobile</td>
                    </tr>
                  </thead>
                  <tbody>
                    ${users.rows
                      .map(
                        (item) =>
                          `
                          <tr>
                          <td>${item.firstName} </td>
                          <td>${item.lastName} </td>
                          <td>${item.email}</td>
                          <td>+${item.phoneNumber}</td>
                          <td class="trash"> <i member-id=${item.memberId} club-Id=${item.clubId} class="fa fa-trash"></i></td>
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
  const removeMember = document.querySelectorAll('.trash');
  const { token } = getUserInfo();

  Array.from(removeMember).forEach((member) => {
    member.addEventListener('click', async (e) => {
      const memberId = e.target.getAttribute('member-id');
      const clubId = e.target.getAttribute('club-id');
      const { data } = await deleteMember({ memberId, clubId, token });

      if (!!data) {
        showMessage('Member deleted');
        location.reload();
      }
    });
  });
}

export default customerpage;
