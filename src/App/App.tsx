import { useEffect, useState } from 'react';
import './App.css';
import { getPlaceholderData } from 'Utils/Api';
import SearchBar from 'Components/SearchBar/SearchBar';
import ToggleGroup from 'Components/ToggleGroup/ToggleGroup';
import {
  convertPhotos, convertPosts,
  convertTags, convertUserAddress
} from 'Utils/ConvertFunctions';

function App() {
  const [data, setData] = useState(undefined);
  const [dataType, setDataType] = useState('Posts');

  function onSelectionChange(dataType: string) {
    setDataType(dataType);
  }

  function convertFunction(objectToConvert: any) {
    switch (dataType) {
      case 'Posts': {
        return convertPosts(objectToConvert);
      }
      case 'Users': {
        return convertUserAddress(objectToConvert);
      }
      case 'Photos': {
        return convertPhotos(objectToConvert);
      }
      case 'Tags': {
        return convertTags(objectToConvert);
      }
    }
    return '';
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
      const json = require('../Utils/Tags.json');
      setData(json);
    }
  }, [dataType]);


  if (data) {
    return (
      <div className="App" data-testid='dataTest'>
        <ToggleGroup buttonsList={['Posts', 'Users', 'Photos', 'Tags']} name='dataToggleBar' onSelectionChange={onSelectionChange} />
        Data search box:
        <SearchBar data={data} convertFunction={convertFunction} />
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