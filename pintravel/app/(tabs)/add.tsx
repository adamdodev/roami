import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, ScrollView } from "react-native";

export default function AddItemScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [countries, setCountries] = useState("");
  const [continents, setContinents] = useState("");
  const [locations, setLocations] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = () => {
    const newItem = {
      name,
      description,
      countries: countries.split(",").map((c) => c.trim()), // Convert comma-separated string to array
      continents: continents.split(",").map((c) => c.trim()),
      locations: locations.split(",").map((l) => l.trim()),
      tags: tags.split(",").map((t) => t.trim()),
    };

    console.log("New Item:", newItem);
    // TODO: Save the new item to the database
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
