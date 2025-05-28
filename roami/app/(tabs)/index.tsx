import { Image } from 'expo-image';
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

import { Avatar, Button, Card, Text } from 'react-native-paper';

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

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

// Card view for items table

const ItemsTableView = (props) => (
  <TableView
    {...props}
    tableId="items"
    rowComponent={ItemRowView}
  />
);

const ItemRowView = (props) => {
  console.log(props)
  return (
    <Card>
      <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
      <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium"><RowView {...props} /></Text>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  )
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>

        <ItemsTableView />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    
  }
});
