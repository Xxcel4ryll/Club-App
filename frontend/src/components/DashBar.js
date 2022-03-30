const DashBar = {
  render,
  afterRender,
};

async function render({
  active1,
  active2,
  active3,
  active4,
  active5,
  active6,
  active7,
  active8,
  active9,
  active11,
  role,
}) {
  return `
    <div class="sidebar">
        <div class="sidebar-brand">
        <h2>
            <span>Club Management</span>
        </h2>
        </div>
        <div class="sidebar-menu">
        <ul>
            <li>
            <a href="/#/dashboard" class="${active1 ? 'active' : ''}"
                ><span class="fas fa-igloo"></span><span>Dashboard</span></a
            >
            </li>
            <li>
            <a href="/#/create" class="${active8 ? 'active' : ''}"
                ><span class="fas fa-igloo"></span><span>Create User</span></a
            >
            </li>
            <li>
            <a href="/#/createclub" class="${active11 ? 'active' : ''}"
                ><span class="fas fa-igloo"></span><span>Create Club</span></a
            >
            </li>
            <li>
            <a href="/#/invite" class="${active6 ? 'active' : ''}"
                ><span class="fas fa-igloo"></span><span>Invite Member</span></a
            >
            </li>
            <li>
            <a href="/#/clubs" class="${active9 ? 'active' : ''}"
                ><span class="fas fa-sitemap"></span><span>View Clubs</span></a
            >
            </li>
            ${
              role === 'Admin'
                ? `<li>
                  <a href="/#/users" class="${active2 ? 'active' : ''}">
                    <span class="fas fa-users"></span>
                    <span>Users</span>
                  </a>
                </li>`
                : ''
            }
                
            <li>
            <a href="/#/members" class="${active4 ? 'active' : ''}"
                ><span class="fas fa-shopping-bag"></span><span>Members</span></a
            >
            </li>
           
            <li>
            <a href="/#/revenue" class="${active3 ? 'active' : ''}"
                ><span class="fas fa-money-check-alt"></span
                ><span>Members Metric</span></a
            >
            </li>
            
            <li>
            <a id="log-out" class=""
                ><span class="fas fa-sign-out-alt"></span
                ><span>Log-Out</span></a
            >
            </li>
            
        </ul>
        </div>
    </div>    
    `;
}

async function afterRender() {}

export default DashBar;
