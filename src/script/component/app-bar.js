class AppBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: 'open'});
  }
 
  connectedCallback() {
    this.render();
    this.initScrollListener();
  
    //  event listener untuk tautan "Find Coins"
    const findCoinsLink = this.shadowDOM.getElementById('findCoinsLink');
    findCoinsLink.addEventListener('click', () => {
      this.navigateToSearchContainer();
    });
  }
  
  //  menavigasi ke bagian search container di dalam <search-bar>
  navigateToSearchContainer() {
    //  elemen <search-bar> dengan menggunakan selector sesuai dengan kebutuhan Anda
    const searchBar = document.querySelector('search-bar');
  
    // Periksa  elemen <search-bar> ditemukan
    if (searchBar) {
      // Ambil elemen search container 
      const searchContainer = searchBar.shadowRoot.getElementById('search-container');
  
      // Periksa apakah elemen search container ditemukan
      if (searchContainer) {
        // Fokus  ke elemen search container
        searchContainer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  initScrollListener() {
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  handleScroll() {
    const scrolled = window.scrollY > 0;
    this.style.position = scrolled ? 'fixed' : 'relative';
    this.style.width = '100%';
    this.style.top = '0';
    this.style.zIndex = '1000';
    this.style.backgroundColor = scrolled ? 'linear-gradient(180deg, rgba(10, 54, 65, 0.9) 0%, #0C0B15 41.92%)' : 'transparent';
  }
 
  render() {
    this.shadowDOM.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        :host {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #000000;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          height: 80px;
          color: white;
          padding: 0 20px;
          transition: background-color 0.3s ease;
        }
        .logo {
          font-size: 24px;
        }
        .nav-links a {
          text-decoration: none;
          color: white;
          margin: 0 15px;
          font-size: 18px;
          transition: background-color 0.3s ease;
        }
        .nav-links a:hover {
          background-color: rgb(15, 201, 149);
        }
        span {
          color: rgb(15, 201, 149);
        }
      </style>
  
      <div class="logo">Crypto<span>Search</span></div>
      <div class="nav-links">
        <a href="#">Home</a>
        <a href="#" id="findCoinsLink">Find Coins</a>
      </div>
    `;
  }
}
 
customElements.define('app-bar', AppBar);
