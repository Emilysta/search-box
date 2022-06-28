import { useEffect, useState } from 'react';
import { getPlaceholderData } from 'Utils/Api';
import SearchBar from 'Components/SearchBar/SearchBar';
import ToggleGroup from 'Components/ToggleGroup/ToggleGroup';
import styles from './App.module.css';
import {
  convertPhotos, convertPosts,
  convertTags, convertUserAddress, Photo, Post, User
} from 'Utils/ConvertFunctions';

function App() {
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState('Posts');

  function onSelectionChange(dataType: string) {
    setDataType(dataType);
  }

  function convertFunction(objectToConvert: unknown) {
    switch (dataType) {
      case 'Posts': {
        return convertPosts(objectToConvert as Post);
      }
      case 'Users': {
        return convertUserAddress(objectToConvert as User);
      }
      case 'Photos': {
        return convertPhotos(objectToConvert as Photo);
      }
      case 'Tags': {
        return convertTags(objectToConvert as string);
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
      <div className={styles.App} data-testid='dataTest'>
        <ToggleGroup buttonsList={['Posts', 'Users', 'Photos', 'Tags']} name='dataToggleBar' onSelectionChange={onSelectionChange} />
        Data search box:
        <SearchBar data={data} convertFunction={convertFunction} />
      </div>
    );
  }
  else
    return (
      <div className={styles.App} data-testid='loadingTest'>
        Loading data...
      </div>
    );
}

export default App;