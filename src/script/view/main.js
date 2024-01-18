import DataSource from '../data/data-source.js';
import '../component/search-bar.js';
import '../component/club-list.js';

const main = async () => {
  // Inisialisasi elemen UI
  const searchElement = document.querySelector('search-bar');
  const clubListElement = document.querySelector('club-list');

  try {
    // Panggil DataSource.searchClub langsung tanpa menunggu klik tombol pencarian
    const result = await DataSource.searchClub('defaultKeyword'); // Ganti dengan kata kunci default yang sesuai
    renderResult(result);
  } catch (error) {
    fallbackResult(error.message);
  }

  const onButtonSearchClicked = async () => {
    try {
      const result = await DataSource.searchClub(searchElement.value);
      renderResult(result);
    } catch (error) {
      fallbackResult(error.message);
    }
  };

  function renderResult(results) {
    // Filter hasil berdasarkan kriteria pencarian
    const filteredResults = results.filter(result => result.name.toLowerCase().includes(searchElement.value.toLowerCase()));
    clubListElement.clubs = filteredResults;
  }

  function fallbackResult(message) {
    clubListElement.renderError(message);
  }
  searchElement.clickEvent = onButtonSearchClicked;
};

export default main;