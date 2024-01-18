class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
    this.handleKeyUp = this.handleKeyUp.bind(this); // Bind this pada handleKeyUp
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector('#searchElement').value;
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
    /* Style (sesuaikan kebutuhan) */
    body {
      background-color: #f8f9fa; 
      font-family: 'Arial', sans-serif; 
    }
  
    .search-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 50px; 
    }
  
    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #fff; 
      border-radius: 5px; 
      margin-right: 5px; 
    }
  
    button {
      padding: 10px 15px;
      background-color: rgb(15, 201, 149);
      color: #fff; 
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    button:hover {
      background-color: #00ff7f;  
    }
  </style>
  
  <div id="search-container" class="search-container">
    <input placeholder="Search Crypto Coin" id="searchElement" type="search">
    <button id="searchButtonElement" type="submit">Search</button>
  </div>
  
     
    `;

    // Hapus event listener sebelumnya untuk menghindari duplikasi
    this.shadowDOM.querySelector('#searchButtonElement').removeEventListener('click', this._clickEvent);

    // Tambahkan event listener untuk tombol pencarian
    this.shadowDOM.querySelector('#searchButtonElement').addEventListener('click', this._clickEvent);

    // Hapus event listener sebelumnya untuk menghindari duplikasi
    this.shadowDOM.querySelector('#searchElement').removeEventListener('keyup', this.handleKeyUp);

    // Tambahkan event listener untuk menangani input saat tombol Enter ditekan
    this.shadowDOM.querySelector('#searchElement').addEventListener('keyup', this.handleKeyUp);
  }

  // Metode untuk menangani event keyup
  handleKeyUp(event) {
    if (event.key === 'Enter') {
      if (typeof this._clickEvent === 'function') {
        this._clickEvent(); // Panggil fungsi clickEvent jika tombol Enter ditekan
      }
    }
  }
}

customElements.define('search-bar', SearchBar);
