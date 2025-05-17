// TODO Tidy this page up and fix the loading styles in case they take a while
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { Suspense } from "react";

import { Text, View, StyleSheet } from "react-native";


export default function RootLayout() {

  const expo = SQLite.openDatabaseSync('db.db');
  // console.log(expo)
  const db = drizzle(expo);
  // console.log(db)
  // Run migrations before rendering
  // const result = useMigrations(db, migrations);
  // console.log(result)
  // console.dir(success)
  // console.dir(error)

  const { success, error } = useMigrations(db, migrations);
  console.log(success, error)

  

  if (error) {
    return (
      <View style={styles.container}>
            <Text style={styles.text}>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View style={styles.container}>
            <Text style={styles.text}>Migration is in progress...</Text>
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

    // return (
    //   <View style={styles.container}>
    //         <Text style={styles.text}>Migration is complete!</Text>
    //   </View>
    // );
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
