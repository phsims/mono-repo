export class LoginForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div>
    <input type="email" />
    <input type="password" />
    <button/>
    </div>`;
  }
}

customElements.define('login-form', LoginForm);
