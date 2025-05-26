// TODO Tidy this page up and fix the loading styles in case they take a while
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { useEffect, useState } from 'react';

import { ActivityIndicator, Text, View, StyleSheet } from "react-native";

import { itemsTable, countriesTable, continentsTable, locationsTable, tagsTable, activitiesTable, itemCountriesTable, itemContinentsTable, itemLocationsTable, itemTagsTable, itemActivitiesTable } from "@/db/schema";


import { useSQLiteDevTools } from 'expo-sqlite-devtools';
import countriesJson from "@/assets/data/countries.json";


export default function RootLayout() {
  // Asynchronously set up the db connection, then load the next component to run migrations

  const [db, setDb] = useState<any>(null);

  // Set up DB once
  useEffect(() => {
    (async () => {
      const expo = await SQLite.openDatabaseAsync('db.db');
      setDb(drizzle(expo));
    })();
  }, []);

  if (!db) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Packing the sunscreen…</Text>
      </View>
    );
  }

  // Now we KNOW db is ready, so we can safely run migrations
  return <MigrationGate db={db} />;

}

function MigrationGate({ db }: { db: any }) {
  // Run migrations then load the main stack component

  useSQLiteDevTools(db);

  const { success, error } = useMigrations(db, migrations);
  console.log(success, error);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Double checking the passport…</Text>
      </View>
    );
  }

  // Now we KNOW migration is complete, so we can safely set up the countries table
  return <CountriesGate db={db} />;

}

function CountriesGate({ db }: { db: any }) {
  // Seed the countries db table from API or local JSON file

  const [countriesUpdated, setCountriesUpdated] = useState<any>(null);

  useEffect(() => {
    let didCancel = false;
    const controller = new AbortController();
    let settled = false;

    (async () => {
      // check tables
      const tables = await db.run('SELECT name FROM sqlite_master WHERE type="table"');
      console.log('DB tables:', tables);
    })

    async function upsertCountries(countries: any[]) {
      // Upsert countries into the drizzle sqlite table

      if (didCancel) return;

      for (const country of countries) {
        try {
          console.log(country)
          await db
            .insert(countriesTable)
            .values({
              cca2: country.cca2,
              name: country.name?.common ?? "",
              flag: country.flag ?? "",
            })
            .onConflictDoUpdate({
              target: ["cca2"],
              set: {
                name: country.name?.common ?? "",
                flag: country.flag ?? "",
              },
            });
        } catch (e) {
          // Ignore individual upsert errors
        }
      }
      const count = await db.select().from(countriesTable);
      console.log("Count after insert:", count.length, count);

      console.log("Counties table seed complete")
      setCountriesUpdated(true)
    }

    // Set a 1s timeout, if API hasn't responded and started updating the table, use local JSON
    const fallbackTimeout = setTimeout(() => {
      if (!settled) {
        settled = true;
        console.log("Updating countries from JSON file")
        upsertCountries(countriesJson);
      }
    }, 1000);

    // Start the API request
    (async () => {
      try {
        // Fake 1.5 second delay to test the fallback
        // await new Promise((resolve) => setTimeout(resolve, 500));

        let countries;

        // If theres some delay and we've already started updating from the JSON file, skip the API call entirely
        if (!settled) {
          console.log("Starting API request")
          const response = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,flag,cca2",
            { signal: controller.signal }
          );
          if (!response.ok) throw new Error("Network error");
          countries = await response.json();
        } else {
          console.log("Skipping API request, JSON import already started")
        }

        // If the API call took too long and we've since started updating from JSON, skip the upsert
        if (!settled) {
          console.log("Updating countries table from API")
          settled = true;
          clearTimeout(fallbackTimeout);
          await upsertCountries(countries);
        } else {
          console.log("Skipping updating countries table from API, JSON import already started")
        }

      } catch (e) {
        // Ignore fetch errors (including timeout)
      } finally {
        clearTimeout(fallbackTimeout);
      }
    })();

    return () => {
      console.log("Cancelling API request")
      didCancel = true;
      controller.abort();
      clearTimeout(fallbackTimeout);
    };
  }, [db]);

  if (!countriesUpdated) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Opening up the world map…</Text>
      </View>
    );
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
