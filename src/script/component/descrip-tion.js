// description-element.js
import bitcoinImage from '../../assets/btc.png';

class Description extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: 'open'});
  }
   
  connectedCallback() {
    this.render();
    this.loadGoogleFont();

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

  loadGoogleFont() {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';
    document.head.appendChild(linkElement);
  }
  
  render() {
    this.shadowDOM.innerHTML = `
      <style>
        /* Gaya untuk elemen description */
        :host {
          display: block;
          color: #fff; /* Ubah warna teks menjadi putih */
          background: linear-gradient(180deg, rgba(10, 54, 65, 0.9) 0%, #0C0B15 41.92%);
          padding: 20px;
        }

        .text1{
          font-family: 'Roboto', sans-serif;
          font-weight: 200;
          color: rgb(15, 201, 149);
        }

        .text2 {
          font-family: 'Roboto', sans-serif;
          font-weight: 900;
          margin: 20px 0;
        }

        p {
          font-family: 'Roboto', sans-serif;
          font-weight: 200;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 100%; /* Lebar maksimal elemen .content */
          height: 1000px;
          margin: -150px auto 0; /* auto 0 untuk berada ditengah -100 berarti content ke atas dalam jangkauan -100px */  
        }
        .text-content {
          padding-right: 20px; /* Tambahkan jarak di sebelah kanan */
          margin-left: 7em;
        }

        .picture {
          background-size: cover;
          background-repeat: no-repeat;
          width: 50%;
          height: 100$;
          border-radius: 10px; /* Tambahkan border-radius untuk memberikan sudut yang lebih halus */
        }
        button {
          padding: 10px 15px;
          background-color: rgb(15, 201, 149);
          color: #fff; 
          border: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
      
        button:hover {
          background-color: #00ff7f;  
          color: black;
        }

      @media screen and (max-width: 554px) {
        margin-left: 0; /* Reset margin pada layar kecil */}
        .picture {
          width: 30%;
          height: auto;
         
        }
        .text-content {
          padding-right: 20px; /* Tambahkan jarak di sebelah kanan */
        }
      }
    </style>
      </style>

      <div class="content">
        <div class="text-content">
          <h1 class="text1">Find your potential crypto</h1>
          <h1 class="text2">Prepare for Your Financial Future</h1>
          <p>Find all information about the top cryptocurrencies currently ranked in the top 100 quickly and easily. 
            Crypto Search provides instant access to real-time data, rankings, prices and other data</p>
          <div>
            <button id="findCoinsLink" class="buttonStarted" type="submit">Get Started</button>
          </div>
        </div>
        <img class="picture" src="${bitcoinImage}" alt="bitcoinImage"> 
      
      </div>
    `;
  }
}
   
customElements.define('descrip-tion', Description);
