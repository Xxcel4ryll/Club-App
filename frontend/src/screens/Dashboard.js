import { getUser, fetchUsers, fetchMembers, fetchClubs } from '../apis';
import DashBar from '../components/DashBar';
import DashHead from '../components/DashHead';
import { getUserInfo } from '../localStorage';
import { payload } from '../utils/styles-loader';

const dashboard = {
  render,
  afterRender,
};

async function render() {
  const { firstName, role, token } = getUserInfo();

  if (!firstName) {
    location = '/';
  }

  const { data: users } = await fetchUsers();
  const { data: member } = await fetchMembers({ token });
  const { data: clubs } = await fetchClubs({ token });
  console.log(clubs);
  console.log(member);
  return `
    <input type="checkbox" name="" id="nav-toggle" />
      
    ${await DashBar.render({ role, active1: true })}
    <div class="main-content">
    
        ${await DashHead.render({ title: 'Overview' })}
        
        <main>
        <div class="cards">
            <div class="card-single">
            <div class="">
                <h1>${member.count}</h1>
                <span>Members</span>
            </div>
            <div class="">
                <span class="fas fa-users"></span>
            </div>
            </div>
            <div class="card-single">
            <div class="">
                <h1>${users.count}</h1>
                <span>Users</span>
            </div>
            <div class="">
                <span class="fas fa-clipboard-list"></span>
            </div>
            </div>
            <div class="card-single">
            <div class="">
                <h1>${clubs.count}</h1>
                <span>Clubs</span>
            </div>
            <div class="">
                <span class="fas fa-shopping-bag"></span>
            </div>
            </div>
            <div class="card-single">
            <div class="">
                <h1>&#8358; 0</h1>
                <span>Revenue</span>
            </div>
            <div class="">
                <span class="fas fa-goggle-wallet"></span>
            </div>
            </div>
        </div>

        <div class="recent-grid">
            <div class="projects">
            <div class="card">
                <div class="card-header">
                <h3>Recently Created Clubs</h3>

                <button>
                    <a href="/#/clubs" style="color: #fff">
                    See all <span class="fas fa-arrow-right"></span>
                    </a>
                </button>
                </div>
                <div class="card-body">
                <div class="table-responsive">
                    <table width="100%">
                    <thead>
                        <tr>
                        <td>Club Name</td>
                        <td>Club Location</td>
                        <td>Numer Of Members</td>
                        </tr>
                    </thead>
                    <tbody>
                    ${users.rows
                      .map(
                        (item) =>
                          `
                              ${`
                              <tr>
                              <td>${item.firstName} ${item.lastName}</td>
                              <td>${item.quantity}</td>
                              <td>${item.address} ${item.state}</td>
                              
                              </tr>
                                
                                `}`
                      )
                      .join('\n')}
                        
                        
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>
            <div class="customers">
            <div class="card">
                <div class="card-header">
                <h3>New Members</h3>

                <button>
                    <a href="/#/customers" style="color: #fff">
                    See all <span class="fas fa-arrow-right"></span>
                    </a>
                </button>
                </div>

                <div class="card-body">
                    ${member.rows
                      .map(
                        (item) =>
                          `
                        <div class="customer">
                          <div class="info">
                          
                          <div class="contact">
                              <h4>${item.firstName} ${item.lastName}</h4>
                              <small>${item.address || 'No address'}</small>
                          </div>
                          </div>
                          <div>
                          <span class="fas fa-user-circle"></span>
                          <span class="fas fa-comment"></span>
                          <span class="fas fa-phone"></span>
                          </div>
                        </div>
                          `
                      )
                      .join('\n')}   
                       
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

export default dashboard;
