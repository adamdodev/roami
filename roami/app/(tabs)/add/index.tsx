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

import {
  Avatar, Button, Card, Text,
  List,
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
  useRow,
  useSetCellCallback,
} from 'tinybase/ui-react';

// Card view for items table

export default function AddScreen() {

  const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>

        <List.Item
          title="Web Page / Social Media (Coming Soon)"
          description="Paste a URL from your browser or social media apps"
          left={props => <List.Icon {...props} icon="web" />}
        />
        
        <List.Item
          title="Camera (Coming Soon)"
          description="Snap a picture of a magazine article, poster, etc"
          left={props => <List.Icon {...props} icon="camera" />}
        />

        <List.Item
          title="Photo / Screenshot (Coming Soon)"
          description="Select an existing photo or screenshot from your device"
          left={props => <List.Icon {...props} icon="image" />}
        />

        <List.Item
          title="Voice Note (Coming Soon)"
          description="Tell us about an idea you've had"
          left={props => <List.Icon {...props} icon="microphone" />}
        />

        <List.Item
          title="Manual"
          description="Add a travel idea by inputting the details yourself"
          left={props => <List.Icon {...props} icon="pencil" />}
          onPress={() => router.navigate(`/add/manual`)}
        />

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
