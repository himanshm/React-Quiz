import Header from './components/Header';
import Main from './components/Main';
import Quiz from './components/Quiz';

function App() {
  return (
    <div className='app'>
      <Header />

      <Main>
        <Quiz />
      </Main>
    </div>
  );
}

export default App;
