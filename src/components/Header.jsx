import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    user: {},
    isLoadings: false,
  };

  async componentDidMount() {
    await this.getName();
  }

  getName = async () => {
    this.setState({ isLoadings: true });
    const userUp = await getUser();
    this.setState({ user: userUp, isLoadings: false });
  };

  render() {
    const {
      user: { name },
      isLoadings,
    } = this.state;
    return isLoadings ? (
      <Loading />
    ) : (
      <div className="header">
        <header data-testid="header-component">
          <div className="titulo">
            <Link to="/search">
              <img className="icone" src="https://icones.pro/wp-content/uploads/2021/04/icone-spotify-rose.png" alt="spotiTunes" />
              <p data-testid="header-user-name">
                Bem vindo
                {' '}
                {name}
              </p>
            </Link>
          </div>
          <nav className="navBar">
            <li>
              <Link to="/search" data-testid="link-to-search">
                Pesquisar
              </Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">
                Favoritos
              </Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">
                Perfil
              </Link>
            </li>
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
