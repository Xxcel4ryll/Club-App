import { getRevenue, getUser } from '../apis';
import DashBar from '../components/DashBar';
import DashHead from '../components/DashHead';
import { getUserInfo } from '../localStorage';
import { payload } from '../utils/styles-loader';

const revenuepage = {
  render,
  afterRender,
};

async function render() {
  const { firstName, role, id, token } = getUserInfo();
  const { data: revenue } = await getRevenue(token);
  const { email } = await getUser(id);

  if (!firstName && role === 'User') {
    location = '/';
  }
  return `
        
  <input type="checkbox" name="" id="nav-toggle" />
  ${await DashBar.render({ role, active3: true })}

  <div class="main-content">
  ${await DashHead.render({ firstName, title: 'Revenue Stream' })}

    <main>
      <div class="cards">
        <div class="card-single">
          <div class="">
            <h1>&#8358; 0</h1>
            <span>ADVERT</span>
          </div>
          <div class="">
            <span class="revenue success"></span>
          </div>
        </div>
        <div class="card-single">
          <div class="">
            <h1>&#8358;${revenue.toLocaleString()}</h1>
            <span>Total Sales</span>
          </div>
          <div class="">
            <span class="revenue success"></span>
          </div>
        </div>
        <div class="card-single">
          <div class="">
            <h1>&#8358; 0</h1>
            <span>PARTNERS</span>
          </div>
          <div class="">
            <span class="revenue success"></span>
          </div>
        </div>
        <div
          class="card-single"
          style="color: white; background-color: rgb(9, 9, 54)"
        >
          <div class="">
            <h1>&#8358; 0</h1>
            <span style="color: white">WEEKLY REVENUE</span>
          </div>
          <div class="">
            <span class=""></span>
          </div>
        </div>
        <div class="card-single">
          <div class="">
            <h1>&#8358; 0</h1>
            <span>SERVICES</span>
          </div>
          <div class="">
            <span class="revenue success"></span>
          </div>
        </div>
        <div class="card-single">
          <div class="">
            <h1>&#8358; 0</h1>
            <span>REFERRALS</span>
          </div>
          <div class="">
            <span class="revenue success"></span>
          </div>
        </div>
        <div class="card-single">
          <div class="">
            <h1>&#8358; 0</h1>
            <span>PARTNERS</span>
          </div>
          <div class="">
            <span class="revenue success"></span>
          </div>
        </div>
        <div class="card-single">
          <div class="">
            <h1>&#8358; 0</h1>
            <span>Total Revenue</span>
          </div>
          <div class="">
            <span class=""></span>
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

export default revenuepage;
