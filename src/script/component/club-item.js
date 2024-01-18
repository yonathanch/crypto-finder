

class ClubItem extends HTMLElement {

  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: 'open'});
  }

  set club(club) {
    this._club = club;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
 
    <style>
    .container {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 100%;
      margin: 0 auto;
      overflow-x: auto;
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      color: black;
      table-layout: fixed;
    }
  
    th, td {
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 8px;
      text-align: left;
    }
  
    .cryptoCard img{
      max-width: 65px;
      height: auto;
    }
  
    @media screen and (max-width: 768px) {
      th, td {
        font-size: 14px; /* Mengurangi ukuran font pada tabel saat lebar layar kurang dari 350px */
        padding: 5px; /* Mengurangi padding pada sel saat lebar layar kurang dari 350px */
      }
  
      .cryptoCard img {
        max-width: 60px; /* Mengurangi ukuran gambar pada tabel saat lebar layar kurang dari 350px */
      }
    }

    @media only screen and (max-width: 472px) {
      th, td {
        font-size: 8px; /* Mengurangi ukuran font pada tabel saat lebar layar kurang dari 350px */
        padding: 1px; /* Mengurangi padding pada sel saat lebar layar kurang dari 350px */
      }
  
      .cryptoCard img {
        max-width: 30px; /* Mengurangi ukuran gambar pada tabel saat lebar layar kurang dari 350px */
      }
    }
  
  </style>
  <div class="container">
  <table>
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th>Price (USD)</th>
        <th>Market Rank</th>
        <th>High (24h)</th>
        <th>Low (24h)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="cryptoCard" ><img src="${this._club.image}" alt="image crypto"></td>
        <td>${this._club.name}</td>
        <td>${this._club.symbol}</td>
        <td>${this._club.current_price}</td>   
        <td>${this._club.market_cap_rank}</td>
        <td>${this._club.high_24h}</td>
        <td>${this._club.low_24h}</td>
      </tr>
    </tbody>
  </table>
  
  </div>
 
    `;
  }
}

customElements.define('club-item', ClubItem);