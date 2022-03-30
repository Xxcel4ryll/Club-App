const Checkout = {
  render,
};

async function render(props) {
  return `
    <section class="step-wizard">
        <ul class="step-wizard-list">
            <li class="step-wizard-item ${props.step1 ? 'current-item' : ''}">
                <span class="progress-count"></span>
                <span class="progress-label">Shipping Info</span>
            </li>
            
            <li class="step-wizard-item ${props.step2 ? 'current-item' : ''}">
                <span class="progress-count"></span>
                <span class="progress-label">Order Summary</span>
            </li>
            <li class="step-wizard-item ${props.step3 ? 'current-item' : ''}">
                <span class="progress-count"></span>
                <span class="progress-label">Payment</span>
            </li>
        </ul>
    </section>
  `;
}

export default Checkout;
