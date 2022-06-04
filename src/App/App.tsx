import { useEffect, useState } from 'react';
import './App.css';
import { getPlaceholderData } from 'Utils/Api';
import SearchBar from 'Components/SearchBar/SearchBar';
import ToggleGroup from 'Components/ToggleGroup/ToggleGroup';
import {
  filterFunctionPhotos, filterFunctionPosts,
  filterFunctionTags, filterFunctionUserAddress
} from 'Utils/FilterFunctions';

function App() {
  const [data, setData] = useState(undefined);
  const [dataType, setDataType] = useState('Posts');

  function onSelectionChange(value: string) {
    setDataType(value);
  }

  function filterFunction(object: any): string {
    let result: string = '';
    switch (dataType) {
      case 'Posts': {
        result = filterFunctionPosts(object);
        break;
      }
      case 'Users': {
        result = filterFunctionUserAddress(object);
        break;
      }
      case 'Photos': {
        result = filterFunctionPhotos(object);
        break;
      }
    }
    return result;
  }

  useEffect(() => {
    if (dataType !== 'Tags')
      (async () => {
        const fetchedData = await getPlaceholderData(dataType);
        if (fetchedData) {
          const resultJson = await fetchedData.json();
          setData(resultJson);
        }
      })()
    else {

    }
  }, [dataType]);


  if (data) {
    return (
      <div className="App" data-testid='dataTest'>
        <ToggleGroup buttonsList={['Posts', 'Users', 'Photos']} name='dataToggleBar' onSelectionChange={onSelectionChange} />
        Data search box:
        <SearchBar data={data} filterFunction={filterFunction} />
      </div>
    );
  }
  else
    return (
      <div className="App" data-testid='loadingTest'>
        Loading data...
      </div>
    );
}

export default App;