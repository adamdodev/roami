import { Image } from 'expo-image';
import {
  useState,
} from 'react';

import {
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  Avatar,
  Button,
  Card,
  Text,
  TextInput,
} from 'react-native-paper';

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
  useStore,
} from 'tinybase/ui-react';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function AddItemScreen() {

  const store = useStore();

  const [itemForm, setItemForm] = useState({
    name: "",
    description: "",
    // countries: "",
    // continents: "",
    // locations: "",
    // tags: "",
    // activities: "",
  });

  const setItemField = (field: keyof typeof itemForm, value: string) => {
    console.log(field, value)
    setItemForm(prev => ({ ...prev, [field]: value }));
    console.log(itemForm)
  };


  // const handleSubmit = useAddRowCallback(
  //   'items',
  //   (e) => itemForm,
  //   [],
  //   undefined,
  //   (rowId) => console.log(`Added row: ${rowId}`),
  //   [],
  //   false,
  // );

  const handleSubmit = () => {
    store.addRow('items', itemForm)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>

        <Text style={styles.title}>Add New Item</Text>

        <TextInput
          label="Item Name"
          value={itemForm.name}
          onChangeText={text => setItemField('name', text)}
        />

        <TextInput
          label="Description"
          value={itemForm.description}
          onChangeText={text => setItemField('description', text)}
          multiline
        />

        {/* <TextInput
        label="Countries (comma-separated)"
        value={countries}
        onChangeText={setCountries}
      />

      <TextInput
        label="Continents (comma-separated)"
        value={continents}
        onChangeText={setContinents}
      />

      <TextInput
        label="Locations (comma-separated)"
        value={locations}
        onChangeText={setLocations}
      />

      <TextInput
        label="Tags (comma-separated)"
        value={tags}
        onChangeText={setTags}
      />

      <TextInput
        label="Activities (comma-separated)"
        value={activities}
        onChangeText={setActivities}
      /> */}

        <Button icon="content-save" mode="contained" onPress={handleSubmit}>
          Save
        </Button>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  multiline: {
    height: 48,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,

  }
});
