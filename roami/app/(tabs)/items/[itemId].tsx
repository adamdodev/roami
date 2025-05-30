import {
    Stack,
    useLocalSearchParams,
} from 'expo-router';

import {
    useState,
} from 'react'

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    Appbar,
    Button,
    FAB,
    Menu, Divider, PaperProvider,
    IconButton,
} from 'react-native-paper';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

const ItemMenu = () => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

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
                <Menu.Item leadingIcon="pencil" title="Edit" onPress={() => { }} />
                <Menu.Item leadingIcon="delete" title="Delete" onPress={() => { }} />
            </Menu>
        </View>
    );
};

export default function Item(props) {
    console.log(props)
    const { itemId } = useLocalSearchParams();
    const item = useRow('items', itemId);

    const BOTTOM_APPBAR_HEIGHT = 120;
    const MEDIUM_FAB_HEIGHT = 56;

    const { bottom } = useSafeAreaInsets();


    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <Stack.Screen
                    options={{
                        title: item.name,
                        headerRight: () => <ItemMenu />,
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