import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
// import { itemsTable, countriesTable, continentsTable, locationsTable, tagsTable, activitiesTable, itemCountriesTable, itemContinentsTable, itemLocationsTable, itemTagsTable, itemActivitiesTable } from "@/db/schema";
import { itemsTable, countriesTable, continentsTable, locationsTable, tagsTable, activitiesTable, itemCountriesTable, itemContinentsTable, itemLocationsTable, itemTagsTable, itemActivitiesTable } from "@/db/schema";
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { Button } from 'react-native';

export default function DebugTablesScreen() {

    const [db, setDb] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const expo = await SQLite.openDatabaseAsync('db.db');
            setDb(drizzle(expo));
        })();
    }, []);

    const [tablesData, setTablesData] = useState<Record<string, any[]>>({});
    const [loading, setLoading] = useState(false);

    async function loadAllTables() {
        setLoading(true);
        const result: Record<string, any[]> = {};

        if (!db) return;

        result["countriesTable"] = await db.select().from(countriesTable);
        console.log(result)

        setTablesData(result);
        setLoading(false);
    }

    useEffect(() => {
        loadAllTables();
    }, [db]);

    return (
        <ScrollView style={{ padding: 10 }}>
            <View style={{ marginBottom: 20 }}>
                <Button title={loading ? "Reloading..." : "Reload"} onPress={loadAllTables} disabled={loading} />
            </View>
            {Object.entries(tablesData).map(([tableName, rows]) => (
                <View key={tableName} style={{ marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{tableName}</Text>
                    {rows.length === 0 ? (
                        <Text style={{ fontStyle: 'italic' }}>No rows</Text>
                    ) : (
                        rows.map((row, i) => (
                            <Text key={i} style={{ fontFamily: 'monospace' }}>
                                {JSON.stringify(row)}
                            </Text>
                        ))
                    )}
                </View>
            ))}
        </ScrollView>
    );
}
