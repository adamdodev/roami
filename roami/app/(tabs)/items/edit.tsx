import ItemForm from '@/components/ItemForm'

import {
    Stack,
    useLocalSearchParams,
    useRouter,
} from 'expo-router';

import {
    useState,
} from 'react'

import {
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    Appbar,
    Button,
    Dialog,
    FAB,
    Menu,
    Portal,
    Divider, PaperProvider,
    IconButton,
} from 'react-native-paper';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
    useStore,
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

export default function EditScreen(props) {
    const { itemId } = useLocalSearchParams()
    console.log ('edit')
    return (
        <ItemForm itemId={itemId} />
    )
}
