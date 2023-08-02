import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupAll, setupRace } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>TandsUp!</h1>
    <div class="card">
      <button id="all" type="button">all( )</button>
      <button id="race" type="button">race( )</button>
    </div>
    <p class="read-the-docs">
      Click the Function button and open Console panel to read more.
    </p>
  </div>
`

setupAll(document.querySelector('#all'))
setupRace(document.querySelector('#race'))

window.onload = () => {
  document.title = window.desk
}

