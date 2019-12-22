import * as React from 'react';
import { render } from 'react-dom';
import './style.css';

const LanguageContext = React.createContext();
const LanguageConsumer = LanguageContext.Consumer;

class LanguageProvider extends React.Component {
  state = {
    language: 'french'
  };

  updateLanguage = e => {
    console.log(e.target.value);
    this.setState({ language: e.target.value, name: 'fffx' });
  };

  render() {
    return (
      <LanguageContext.Provider
        value={{
          language: this.state.language,
          updateLanguage: this.updateLanguage,
          name: this.state.name
        }}
      >
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}

const Header = () => {
  return (
    <LanguageConsumer>
      {({ updateLanguage, name }) => {
        console.log(updateLanguage, name);
        return (
          <header>
            see this site in
            <select onChange={updateLanguage}>
              <option value="french">french</option>
              <option value="english">english</option>
              <option value="italian">italian</option>
            </select>
          </header>
        );
      }}
    </LanguageConsumer>
  );
};

const TranslatableText = props => (
  <LanguageConsumer>
    {({ language }) => {
      console.log(language);
      return props.dictionary[language];
    }}
  </LanguageConsumer>
);

const App = () => (
  <LanguageProvider>
    <div>
      <Header />
      <h1>
        <TranslatableText
          dictionary={{
            french: 'Bonjour, Michel!',
            english: 'Hello, Michael!',
            italian: 'Ciao, Michele!'
          }}
        />
      </h1>
    </div>
  </LanguageProvider>
);

render(<App />, document.getElementById('root'));
