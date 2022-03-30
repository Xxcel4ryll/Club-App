import { getUserInfo } from '../localStorage';

const DashHead = {
  render,
};

async function render({ title, image }) {
  const { role, firstName } = getUserInfo();
  return `
    <header class="admin-header">
        <h2>
            <label for="nav-toggle">
            <span class="fas fa-bars"></span>
            </label>
            ${title}
        </h2>

        <div class="user-wrapper">
            ${
              image
                ? `<img src="./img/${image}" width="30px" height="30px" alt="" />`
                : ``
            }
            <div class="">
            <h4>${firstName}</h4>
            <small>
              ${role == 'Admin' ? 'Admin' : role == 'User' ? 'User' : 'Member'}
            </small>
            </div>
        </div>
    </header>


  `;
}

export default DashHead;
