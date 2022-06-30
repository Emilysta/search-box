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
  const [data, setData] = useState(null);
  const [dataType, setDataType] = useState('Posts');
  const [isError, setIsError] = useState(false);

  function onSelectionChange(dataType: string) {
    setDataType(dataType);
  }

  function convertSearchBarData(objectToConvert: unknown) {
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

  async function fetchAndSetData() {
    try {
      const fetchedData = await getPlaceholderData(dataType);
      setData(fetchedData);
    }
    catch (err) {
      console.error(err);
      setIsError(true);
    }
  }

  useEffect(() => {
    if (dataType !== 'Tags')
      fetchAndSetData();
    else {
      try {
        const json = require('../Utils/Tags.json');
        setData(json);
      }
      catch (err) {
        console.error(err);
        setIsError(true);
      }
    }
  }, [dataType]);

  if (isError) {
    return (
      <div className={styles.App} data-testid='errorTest'>
        Ops. Something went wrong.
      </div>
    );
  }
  else if (data) {
    return (
      <div className={styles.app} data-testid='dataTest'>
        <ToggleGroup buttonsList={['Posts', 'Users', 'Photos', 'Tags']} name='dataToggleBar' onSelectionChange={onSelectionChange} />
        Data search box:
        <SearchBar data={data} convertDataCallback={convertSearchBarData} />
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