import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    name: '',
    disabledBtn: true,
    inputSearch: '',
    isLoading: false,
    albumList: [],
  };

  handleMusic = async () => {
    const { inputSearch } = this.state;
    this.setState({ isLoading: true });
    const resposta = await searchAlbumsAPI(inputSearch);
    this.setState({
      albumList: resposta,
      isLoading: false,
      name: inputSearch,
      inputSearch: '',
    });
  };

  handleChanger = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.handleVerifics(),
    );
  };

  handleVerifics = () => {
    this.setState(({ inputSearch }) => {
      const min = 2;
      if (inputSearch.length >= min) {
        return { disabledBtn: false };
      }
      return { disabledBtn: true };
    });
  };

  render() {
    const { disabledBtn, isLoading, albumList, name } = this.state;
    return (
      <div data-testid="page-search" className="serch-input">
        <div>
          <Header />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <label htmlFor="page-search">
            <div className="input-search">
              <span className="spam2">Procurar</span>
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={ this.handleChanger }
                name="inputSearch"
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ disabledBtn }
                onClick={ this.handleMusic }
              >
                Pesquisar
              </button>
            </div>
          </label>
        )}
        {albumList.length > 0 ? (
          <p>
            Resultado de álbuns de:
            {' '}
            {name}
          </p>
        ) : (
          <p>Nenhum álbum foi encontrado </p>
        )}
        <div className="albuns">
          {albumList.map(
            ({ artworkUrl100, collectionName, artistName, collectionId }, index) => (
              <div key={ index } className="album">
                <Link
                  to={ `/album/${collectionId}` }
                  className="albuns"
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <h6>{collectionName}</h6>
                  <span>{artistName}</span>
                </Link>
              </div>
            ),
          )}
        </div>
      </div>
    );
  }
}

export default Search;
