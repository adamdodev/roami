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



const ItemMenu = (props) => {
    itemId = props.itemId
    console.log('pased itemid', itemId)
    const [visible, setVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const router = useRouter();


    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const showDialog = () => {
        closeMenu();
        setDialogVisible(true);
    }

    const hideDialog = () => setDialogVisible(false);


    const store = useStore();
    console.log("Store:", store)

    const deleteItem = () => {
        console.log("Deleting");
        console.log(store?.getRowCount('items'))
        console.log('del itemid', itemId)
        store.delRow('items', itemId);
        hideDialog();
        closeMenu();
        router.replace('/items');
    }

    const editItem = () => {
        hideDialog();
        closeMenu();
        router.navigate(`/items/edit?itemId=${itemId}`)
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<IconButton icon='dots-horizontal' onPress={openMenu} />}>
                <Menu.Item leadingIcon="pencil" title="Edit" onPress={editItem} />
                <Menu.Item leadingIcon="delete" title="Delete" onPress={showDialog} />
            </Menu>
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                    <Dialog.Content>
                        <Text>Are you sure you want to delete this item?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>No</Button>
                        <Button icon="delete" textColor="red" onPress={deleteItem}>Yes</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};


export default function Item(props) {
    // console.log(props)
    const { itemId } = useLocalSearchParams();
    console.log("itemId", itemId)
    const item = useRow('items', itemId);
    console.log("Item:", item)

    const BOTTOM_APPBAR_HEIGHT = 120;
    const MEDIUM_FAB_HEIGHT = 56;

    const { bottom } = useSafeAreaInsets();


    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <Stack.Screen
                    options={{
                        title: item.name,
                        headerRight: () => <ItemMenu itemId={itemId} />,
                    }}
                />
                <Text>
                    <RowView
                        {...props}
                        tableId="items"
                        rowId={itemId}
                    />
                </Text>

            </ScrollView>

            {/* TODO put the buttons on the bottom */}
            {/* <Appbar
                style={[
                    styles.bottom,
                    {
                        position: 'absolute',
                        bottom: bottom,
                        flex: 1,
                        // height: BOTTOM_APPBAR_HEIGHT,
                        // marginBottom: bottom,
                    },
                ]}
                // safeAreaInsets={{ bottom }}
            >
                <Appbar.Action icon="archive" onPress={() => { }} />
                <Appbar.Action icon="email" onPress={() => { }} />
                <Appbar.Action icon="label" onPress={() => { }} />
                <Appbar.Action icon="delete" onPress={() => { }} />
                <FAB
                    mode="flat"
                    size="medium"
                    icon="plus"
                    onPress={() => { }}
                    style={[
                        styles.fab,
                        { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
                    ]}
                />
            </Appbar> */}

        </View>
    );

}

const styles = StyleSheet.create({
    bottom: {
        backgroundColor: 'aquamarine',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    fab: {
        position: 'absolute',
        right: 16,
    },
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