class CryptoApp extends HTMLElement {
    constructor() {
      super();
      this.shadowDOM = this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
      this.loadData();
    }
  
    async fetchData() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
  
      
    groupCoinsByType(coins) {
      const topRankings = coins.slice(0, 3); // Ambil 3 koin pertama sebagai tren
      const trendingCoins = coins.slice(3, 6); // Ambil 3 koin berikutnya sebagai koin meme
      const otherCoins = coins.slice(7, 10); // Koin lainnya
      return { topRankings, trendingCoins, otherCoins };
    }
  
    renderData(topRankings, trendingCoins, otherCoins) {
      const appContainer = this.shadowDOM.querySelector('.app-container');
      appContainer.innerHTML = ''; // Bersihkan konten sebelum menambahkan yang baru
  
      this.createTableSection(appContainer, 'Top Rankings', topRankings);
      this.createTableSection(appContainer, 'Trending Coins', trendingCoins);
      this.createTableSection(appContainer, 'Other Coins', otherCoins);
    }
  
    createTableSection(container, title, coins) {
      const sectionElement = document.createElement('section');
      sectionElement.innerHTML = `
        <h2>${title}</h2>
        <div class="card-container">
          <table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Price (USD)</th>
                <th>Market Rank</th>
              </tr>
            </thead>
            <tbody>
              ${coins.map(coin => this.createTableRow(coin)).join('')}
            </tbody>
          </table>
        </div>
      `;
      container.appendChild(sectionElement);
  
    
    }
  
    createTableRow(coin) {
      return `
        <tr class="cryptoCard">
          <td><img src="${coin.image}" alt="${coin.name} image"></td>
          <td>${coin.name}</td>
          <td>${coin.current_price}</td>   
          <td>${coin.market_cap_rank}</td>
        </tr>
      `;
    }
 
  
    async loadData() {
      try {
        const data = await this.fetchData();
        const { topRankings, trendingCoins, otherCoins } = this.groupCoinsByType(data);
        this.renderData(topRankings, trendingCoins, otherCoins);
      } catch (error) {
        // Handle error
      }
    }
  
    render() {
      this.shadowDOM.innerHTML = `
      <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(180deg, rgba(10, 54, 65, 0.9) 0%, #0C0B15 41.92%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        margin: 0;
        padding: 0;
      }

      .app-container {
        display: flex;
        justify-content: space-around; /* Ganti gap dengan space-around */
        overflow-x: auto;
        padding: 10px;
      }
    
      section {
        flex: 0 0 auto;
        width: 25%;
        padding: 16px;
        border-radius: 8px; 
        background: linear-gradient(180deg, rgba(10, 54, 65, 0.9) 0%, #0C0B15 41.92%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        margin: 10px;
        border: 2px solid rgba(10, 54, 65, 0.9);
      }
    
      h2 {
        margin-bottom: 12px;
        color: #fff;
      }
    
      table {
        width: 100%;
        border-collapse: collapse;
        color: #fff;
        table-layout: fixed;
        margin-top: 12px;
      }
    
      th, td {
        padding: 12px;
        text-align: left;
      }
    
      th {
        background: linear-gradient(180deg, rgba(10, 54, 65, 0.9) 0%, #0C0B15 41.92%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        color: white;
        font-size: 14px;
      }
    
      .cryptoCard img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
      }
    
      @media screen and (max-width: 768px) {
        .app-container {
          flex-direction: column;
          justify-content: flex-start; /* Ganti space-around dengan flex-start */
        }
    
        section {
          width: 90%;  
        }
      }
    </style>
    <div class="app-container"></div>
      `;
    }
  }
  
  customElements.define('crypto-app', CryptoApp);
  