import { useEffect, useState } from 'react';
import './App.css';
import { getPlaceholderData } from 'Utils/Api';

function App() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    (async () => {
      const fetchedData = await getPlaceholderData('posts');
      if (fetchedData) {
        const resultJson = await fetchedData.json();
        setData(resultJson);
      }
    })()
  }, []);

  if (data)
    return (
      <div className="App" data-testid='dataTest'>
        Data search box:
      </div>
    );
  else
    return (
      <div className="App" data-testid='loadingTest'>
        Loading data...
      </div>
    );
}

export default App;
