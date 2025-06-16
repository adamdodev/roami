import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack screenOptions={{
      headerBackButtonDisplayMode: 'minimal',
    }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }} />
      <Stack.Screen
        name="view"
      />
      <Stack.Screen
        name="edit"
      />
    </Stack>
  );
}
