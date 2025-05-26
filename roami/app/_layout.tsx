import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import {
  Platform,
} from 'react-native';

// tinybase
import * as SQLite from 'expo-sqlite';
import { createStore } from 'tinybase';
import { createLocalPersister } from 'tinybase/persisters/persister-browser';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import {
  CellView,
  useCell,
  useCreatePersister,
  useCreateStore,
  useSetCellCallback,
} from 'tinybase/ui-react';

import { useSQLiteDevTools } from 'expo-sqlite-devtools';

const useAndStartPersister = (store) =>
  // Persist store to Expo SQLite or local storage; load once, then auto-save.
  useCreatePersister(
    store,
    (store) =>
      Platform.OS === 'web'
        ? createLocalPersister(store, 'roami')
        : createExpoSqlitePersister(store, SQLite.openDatabaseSync('roami.db')),
    [],
    (persister) => persister.load().then(persister.startAutoSave)
  );

export default function RootLayout() {

  // useSQLiteDevTools(SQLite.openDatabaseSync('roami.db'));

  const store = useCreateStore(createStore);
  useAndStartPersister(store);

  // test sets
  // store.setValues({ employees: 3, open: true });
  // // maybe don't use setTables...
  // store.setTables({ pets: { fido: { species: 'dog' } } });
  // store.setTables({ pets: { bailey: { species: 'cat' } } });
  // store.setTables({ messages: { 1: { message: 'hello' } } });
  // // use setrow, addrow and setcell
  // store.setRow('species', 'cat', {price: 4});
  // store.addRow('species', {name: 'fish'});

  // store.setTables({
  //   pets: { fido: { species: 'dog' } },
  //   species: { dog: { price: 5 } },
  // });

  // const listenerId = store.addTablesListener(() =>
  //   console.log('Tables changed!'),
  // );

  // store.setCell('species', 'dog', 'price', 6);

  // store.delListener(listenerId);
  // console.log('updating no listener')
  // store.setCell('species', 'dog', 'price', 7);

  // const listenerId2 = store.addTablesListener((store, getCellChange) =>
  //   console.log(getCellChange('species', 'dog', 'price')),
  // );

  // store.setCell('species', 'dog', 'price', 8);

  // store.delListener(listenerId2);

  store.setCell('t1', 'r1', 'c1', 'Hello World');

  const handleClick = useSetCellCallback(
    'pets',
    'fido',
    'sold',
    (event) => event.bubbles,
    [],
    store,
  );

  // test gets

  console.log(store.getValues());
  console.log(store.getTables());

  console.log(store.getRow('pets', 'fido'));
  console.log(store.getCell('pets', 'fido', 'species'));

  console.log(store.hasTable('customers'));

  store.forEachTable((tableId, forEachRow) => {
    console.log(tableId);
    forEachRow((rowId) => console.log(`- ${rowId}`));
  });


  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //   <Stack>
    //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //     <Stack.Screen name="+not-found" />
    //   </Stack>
    //   <StatusBar style="auto" />
    // </ThemeProvider>

    <>
      <CellView store={store} tableId="t1" rowId="r1" cellId="c1" />
      <span>
        Sold: {useCell('pets', 'fido', 'sold', store) ? 'yes' : 'no'}
        <br />
        <button onClick={handleClick}>Sell</button>
      </span>
    </>
  );
}
