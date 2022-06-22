import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    disabledButton: true,
    inputLogin: '',
    isLoading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.handleVerification());
  }

  handleVerification = () => {
    this.setState(({ inputLogin }) => {
      const max = 3;
      if (inputLogin.length >= max) {
        return { disabledButton: false };
      }
      return { disabledButton: true };
    });
  }

  handleClick = async () => {
    const { history } = this.props;
    const { inputLogin } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: inputLogin });
    history.push('/search');
  }

  render() {
    const { disabledButton, isLoading, inputLogin } = this.state;
    return (
      <>
        <div className="logo">
          <img className="icone" src="https://icones.pro/wp-content/uploads/2021/04/icone-spotify-rose.png" alt="spotiTunes" />
          <h1 className="trybeTunes">SpotiTunes</h1>
        </div>
        <div data-testid="page-login" className="container-login">
          {isLoading ? (<Loading />)
            : (
              <form className="form-login">
                <label htmlFor="login">
                  <span className="spam">Login</span>
                  <input
                    type="text"
                    data-testid="login-name-input"
                    className="input-login"
                    name="inputLogin"
                    placeholder="Digite seu nome"
                    onChange={ this.handleChange }
                    value={ inputLogin }
                  />
                </label>
                <button
                  disabled={ disabledButton }
                  type="button"
                  data-testid="login-submit-button"
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>
              </form>
            )}
        </div>

      </>

    );
  }
}
Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Login;
