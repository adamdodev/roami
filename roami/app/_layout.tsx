import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import {
  useState,
} from 'react';

import {
  Platform,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// tinybase
import * as SQLite from 'expo-sqlite';
import { createStore } from 'tinybase';
import { createLocalPersister } from 'tinybase/persisters/persister-browser';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import {
  CellView,
  Provider,
  RowView,
  TableView,
  useAddRowCallback,
  useCell,
  useCreatePersister,
  useCreateStore,
  useSetCellCallback,
} from 'tinybase/ui-react';

import { useSQLiteDevTools } from 'expo-sqlite-devtools';
import { Background } from '@react-navigation/elements';

// Define the schema

const tablesSchema = {
  pets: {
    name: { type: 'string' },
    species: { type: 'string' },
    color: { type: 'string' },
    sold: { type: 'boolean', default: false },
    added: { type: 'string', default: new Date().toISOString() },
  },
  tags: {
    text: { type: 'string' },
    added: { type: 'string', default: new Date().toISOString() },
  }
} as const

// Set up relationships

const setupRelationships = (store) =>
  const relationships = createRelationships(store);
  relationships.setRelationshipDefinition(
    'petSpecies', // relationshipId
    'pets', //       localTableId to link from
    'species', //    remoteTableId to link to
    'species', //    cellId containing remote key
  );

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

  const store = useCreateStore(createStore).setTablesSchema(tablesSchema);

  useAndStartPersister(store);

  store.addCellListener(
    'pets',
    null,
    'species',
    (store, tableId, rowId, cellId, newCell) => {
      if (!SPECIES.includes(newCell)) {
        store.setCell(tableId, rowId, cellId, SPECIES[0]);
      }
    },
    true, // This listener is permitted to mutate the Store.
  );

  store.setCell('pets', 'fido', 'color', 'cheese');

  store.delListener(colorListenerId);

  store.addRow('pets', { name: 'ted', species: 1 });

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

    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <CellView store={store} tableId="t1" rowId="r1" cellId="c1" />
            {/* <span>
          Sold: {useCell('pets', 'fido', 'sold', store) ? 'yes' : 'no'}
          <br />
          <button onClick={handleClick}>Sell</button>
        </span> */}
            <NewTag />
            <MyTableView tableId="tags" />
            <SpeciesTableView tableId="pets" />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const MyTableView = (props) => (
  <table>
    <tbody>
      <TableView
        {...props}
        rowComponent={MyRowView}
        getRowComponentProps={() => ({ thcolor: "#0f0" })}
      />
    </tbody>
  </table>
);

const SpeciesTableView = (props) => (
  <table>
    <tbody>
      <TableView
        {...props}
        rowComponent={MyRowView}
        getRowComponentProps={() => ({ thcolor: "#00f" })}
      />
    </tbody>
  </table>
);

const MyRowView = (props) => {
  console.log(props)
  return (
    <tr>
      <th style={{ backgroundColor: props.thcolor }}>{props.rowId}</th>
      <RowView {...props} cellComponent={MyCellView} />
    </tr>)
};

const MyCellView = (props) => (
  <td>
    <CellView {...props} />
  </td>
);

// Styles for the app.
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderColor: '#999',
    borderRadius: 8,
    borderWidth: 2,
    flex: 0,
    height: 64,
    marginTop: 16,
    padding: 16,
    fontSize: 20,
  },
  todos: {
    flex: 1,
    marginTop: 16,
  },
  todo: {
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#ffd',
  },
  done: {
    backgroundColor: '#dfd',
  },
  todoText: {
    fontSize: 20,
  },
  clearTodos: {
    margin: 16,
    flex: 0,
    textAlign: 'center',
    fontSize: 16,
  },
});

