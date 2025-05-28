// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// Paper
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

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
import type { Store } from 'tinybase';
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
// import { Inspector } from 'tinybase/ui-react-inspector'


// Define the schema

const tablesSchema = {
  items: {
    name: { type: 'string' },
    description: { type: 'string' },
    added: { type: 'string', default: new Date().toISOString() },
  },
  countries: {
    cca2: { type: 'string' },
    name: { type: 'string' },
    flag: { type: 'string' },
    added: { type: 'string', default: new Date().toISOString() },
  },
  continents: {
    name: { type: 'string' },
    added: { type: 'string', default: new Date().toISOString() },
  },
  locations: {
    name: { type: 'string' },
    added: { type: 'string', default: new Date().toISOString() },
  },
  activities: {
    name: { type: 'string' },
    added: { type: 'string', default: new Date().toISOString() },
  },
  tags: {
    name: { type: 'string' },
    added: { type: 'string', default: new Date().toISOString() },
  },
} as const;

// TODO Set up relationships

// const setupRelationships = (store) =>
//   const relationships = createRelationships(store);
//   relationships.setRelationshipDefinition(
//     'petSpecies', // relationshipId
//     'pets', //       localTableId to link from
//     'species', //    remoteTableId to link to
//     'species', //    cellId containing remote key
//   );

// Theme

const theme = {
  ...DefaultTheme,
};

// Function definitions

const useAndStartPersister = (store: Store) =>
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

// Main component

export default function RootLayout() {

  // Set up the store an apply the schema
  const store = useCreateStore(createStore).setTablesSchema(tablesSchema);
  useAndStartPersister(store);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="dark" />
        {/* <Inspector /> */}
      </PaperProvider>
    </Provider>
  );
}
