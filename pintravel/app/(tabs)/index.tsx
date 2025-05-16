// TODO Finish home page
// import Button from '@/components/Button';
// import CircleButton from '@/components/CircleButton';
// import EmojiList from '@/components/EmojiList';
// import EmojiPicker from '@/components/EmojiPicker';
// import EmojiSticker from '@/components/EmojiSticker';
// import * as Globals from '@/components/Constants';
// import IconButton from '@/components/IconButton';
// import ImageViewer from '@/components/ImageViewer';

// // import { Image } from 'expo-image';
// // import { type ImageSource } from 'expo-image';
// // import * as ImagePicker from 'expo-image-picker';
// // import { Link } from 'expo-router';
// import { useState } from 'react';
import { FlatList, StyleSheet, ScrollView, Text, View } from "react-native";
import { useEffect, useState } from 'react';
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
// // import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { itemsTable, countriesTable, continentsTable, locationsTable, tagsTable, activitiesTable, itemCountriesTable, itemContinentsTable, itemLocationsTable, itemTagsTable, itemActivitiesTable } from "@/db/schema";


// const PlaceholderImage = require('@/assets/images/background-image.png');


console.log('1')
// // Initialize SQLite and Drizzle
const expo = SQLite.openDatabaseSync('db.db');
console.log('2')
const db = drizzle(expo);
console.log('3')


// Index component
export default function Index() {

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await db
        .select()
        .from(itemsTable)
        .leftJoin(itemCountriesTable, eq(itemsTable.id, itemCountriesTable.itemId))
        .leftJoin(countriesTable, eq(itemCountriesTable.countryId, countriesTable.id))
        // .leftJoin(itemContinentsTable, itemContinentsTable.itemId.eq(itemsTable.id))
        // .leftJoin(continentsTable, continentsTable.id.eq(itemContinentsTable.continentId))
        // .leftJoin(itemLocationsTable, itemLocationsTable.itemId.eq(itemsTable.id))
        // .leftJoin(locationsTable, locationsTable.id.eq(itemLocationsTable.locationId))
        // .leftJoin(itemTagsTable, itemTagsTable.itemId.eq(itemsTable.id))
        // .leftJoin(tagsTable, tagsTable.id.eq(itemTagsTable.tagId))
        // .leftJoin(itemActivitiesTable, itemActivitiesTable.itemId.eq(itemsTable.id))
        // .leftJoin(activitiesTable, activitiesTable.id.eq(itemActivitiesTable.activityId));
      console.log(result)
      setItems(result);
    };
    fetchItems();
  }, []);
  console.log(items)

  // const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  // const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  // const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);

  // const pickImageAsync = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ['images'],
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     // console.log(result);
  //     setSelectedImage(result.assets[0].uri);
  //     setShowAppOptions(true);
  //   } else {
  //     alert('You did not select any image.');
  //   }
  // };

  // const onReset = () => {
  //   setShowAppOptions(false);
  // };

  // const onAddSticker = () => {
  //   setIsModalVisible(true);
  // };

  // const onModalClose = () => {
  //   setIsModalVisible(false);
  // };

  // const onSaveImageAsync = async () => {
  //   // we will implement this later
  // };

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={<Text>My Items</Text>}
      renderItem={({ item }) => (
      <View style={{ marginBottom: 12 }}>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>Countries: {(item.countries?.name || item.countriesTable?.name) ?? 'None'}</Text>
        {/* <Text>Continents: {(item.continents?.name || item.continentsTable?.name) ?? 'None'}</Text>
        <Text>Locations: {(item.locations?.name || item.locationsTable?.name) ?? 'None'}</Text>
        <Text>Tags: {(item.tags?.name || item.tagsTable?.name) ?? 'None'}</Text>
        <Text>Activities: {(item.activities?.name || item.activitiesTable?.name) ?? 'None'}</Text> */}
      </View>
      )}
    />
  
  //   <GestureHandlerRootView style={styles.container}>

  //     <View style={styles.imageContainer}>
  //       <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
  //       {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
  //     </View>

  //     {showAppOptions ? (

  //       <View style={styles.optionsContainer}>
  //         <View style={styles.optionsRow}>
  //           <IconButton icon="refresh" label="Reset" onPress={onReset} />
  //           <CircleButton onPress={onAddSticker} />
  //           <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
  //         </View>
  //       </View>
      
  //     ) : (

  //     <View style={styles.footerContainer}>
  //       <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
  //       <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
  //     </View>
      
  //     )}

  //     <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
  //       <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
  //     </EmojiPicker>

  //   </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  // button: {
  //   fontSize: 20,
  //   textDecorationLine: 'underline',
  //   color: '#fff',
  // },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  // image: {
  //   width: 320,
  //   height: 440,
  //   borderRadius: 18,
  // },
  // text: {
  //   color: '#fff',
  // },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
