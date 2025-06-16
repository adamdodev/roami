import { Image } from 'expo-image';

import { useRouter } from 'expo-router';

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
  useRow,
  useSetCellCallback,
} from 'tinybase/ui-react';

// Card view for items table

const ItemsTableView = (props) => (
  <TableView
    {...props}
    tableId="items"
    rowComponent={ItemRowView}
  />
);

const ItemRowView = (props) => {
  const router = useRouter();
  // console.log(props)
  const item = useRow(props.tableId, props.rowId);
  // console.log(item)
  return (
    <Card style={styles.card} onPress={() => router.navigate(`/items/view?itemId=${props.rowId}`)}>
      <Card.Content>
        <Text variant="titleLarge">{item.name}</Text>
        <Text variant="bodyMedium">{item.description}</Text>
      </Card.Content>
      {/* <Card.Actions>
        <Button icon="camera" mode="text">Edit</Button>
      </Card.Actions> */}
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
  card: {
    margin: 8,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,

  }
});
