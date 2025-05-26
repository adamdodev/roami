import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, ScrollView, Alert } from "react-native";
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { itemsTable, countriesTable, continentsTable, locationsTable, tagsTable, activitiesTable, itemCountriesTable, itemContinentsTable, itemLocationsTable, itemTagsTable, itemActivitiesTable } from "@/db/schema";


export default function AddItemScreen() {

  const [db, setDb] = useState<any>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [countries, setCountries] = useState("");
  const [continents, setContinents] = useState("");
  const [locations, setLocations] = useState("");
  const [tags, setTags] = useState("");
  const [activities, setActivities] = useState("");

  useEffect(() => {
    (async () => {
      const expo = await SQLite.openDatabaseAsync('db.db');
      setDb(drizzle(expo));
    })();
  }, []);

  const handleSubmit = async () => {
    console.log("sub")
    try {
      // Insert the item into the items table
      const item = await db.insert(itemsTable).values({
        name: name,
        description: description,
      }).returning();

      console.log(item)

      const itemIdValue = item[0].id;

      // Helper function to insert unique data based on name
      const insertUniqueData = async (table, values) => {
        const ids = []
        for (const value of values) {
          const row = await db
            .insert(table)
            .values({ name: value })
            .onConflictDoNothing({
              target: table.name,
            })
            .returning()

          if (Array.isArray(row) && row.length > 0) {
            ids.push(row[0].id);
          }
        }
        return ids
      };

      // Upsert countries
      const countryNames = countries.split(",").map((c) => c.trim());
      const countryIds = await insertUniqueData(countriesTable, countryNames);
      console.log(countryIds)

      // Upsert continents
      const continentNames = continents.split(",").map((c) => c.trim());
      const continentIds = await insertUniqueData(continentsTable, continentNames);
      console.log(continentIds)

      // Upsert locations
      const locationNames = locations.split(",").map((l) => l.trim());
      const locationIds = await insertUniqueData(locationsTable, locationNames);
      console.log(locationIds)

      // Upsert tags
      const tagNames = tags.split(",").map((t) => t.trim());
      const tagIds = await insertUniqueData(tagsTable, tagNames);
      console.log(tagIds)

      // Upsert activities
      const activityNames = activities.split(",").map((a) => a.trim());
      const activityIds = await insertUniqueData(activitiesTable, activityNames);
      console.log(activityIds)

      // Insert relationships into many-to-many tables
      // const insertRelationships = async (table, itemId, relatedTableField, relatedIds) => {
      //   for (const id of relatedIds) {
      //     // const relatedId = await db
      //     //   .select(relatedTable.id)
      //     //   .from(relatedTable)
      //     //   .where(relatedTable.name.eq(id))
      //     //   .limit(1);

      //     // if (relatedId.length > 0) {
      //       await db.insert(table).values({
      //         itemId: itemId,
      //         [`${relatedTableField}`]: relatedId[0].id,
      //       });
      //     // }
      //   }
      // };

      // // Insert relationships
      // await insertRelationships(itemCountriesTable, itemIdValue, "countryId", countryIds);
      // await insertRelationships(itemContinentsTable, itemIdValue, "continentId", continentIds);
      // await insertRelationships(itemLocationsTable, itemIdValue, "locationId", locationIds);
      // await insertRelationships(itemTagsTable, itemIdValue, "tagId", tagNames);
      // await insertRelationships(itemActivitiesTable, itemIdValue, "activityId", activityIds);

      Alert.alert("Success", "Item saved successfully!");
    } catch (error) {
      console.error("Error saving item:", error);
      Alert.alert("Error", "Failed to save the item.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Item</Text>

      <TextInput
        style={styles.input}
        placeholder="Item Name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#aaa"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Countries (comma-separated)"
        placeholderTextColor="#aaa"
        value={countries}
        onChangeText={setCountries}
      />

      <TextInput
        style={styles.input}
        placeholder="Continents (comma-separated)"
        placeholderTextColor="#aaa"
        value={continents}
        onChangeText={setContinents}
      />

      <TextInput
        style={styles.input}
        placeholder="Locations (comma-separated)"
        placeholderTextColor="#aaa"
        value={locations}
        onChangeText={setLocations}
      />

      <TextInput
        style={styles.input}
        placeholder="Tags (comma-separated)"
        placeholderTextColor="#aaa"
        value={tags}
        onChangeText={setTags}
      />

      <TextInput
        style={styles.input}
        placeholder="Activities (comma-separated)"
        placeholderTextColor="#aaa"
        value={activities}
        onChangeText={setActivities}
      />

      <Button title="Save Item" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#25292e",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
