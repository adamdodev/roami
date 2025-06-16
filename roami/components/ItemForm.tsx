import {
    useLocalSearchParams,
} from 'expo-router';


import {
    useState,
    useEffect,
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
    useRow,
} from 'tinybase/ui-react';

export default function ItemForm(props) {

    const store = useStore();

    const isEdit = (props.itemId !== undefined && props.itemId !== "");

    const [itemForm, setItemForm] = useState({
        name: "",
        description: "",
        // countries: "",
        // continents: "",
        // locations: "",
        // tags: "",
        // activities: "",
    });

    // Pre-fill form in edit mode
    useEffect(() => {
        if (isEdit) {
            const item = store.getRow("items", props.itemId);
            console.log("edit item", item)
            if (item) setItemForm(item);
        }
    }, [props.itemId]);


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
        if (isEdit) {
            store.setRow("items", props.itemId, itemForm); // update
        } else {
            store.addRow('items', itemForm)
        }
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
                    style={styles.multiline}
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
        height: 128,
    },
    container: {
        flex: 1,
    },
    content: {
        padding: 16,

    }
});
