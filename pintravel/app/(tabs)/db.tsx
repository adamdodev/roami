import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import * as schema from '@/db/schema';
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { Button } from 'react-native';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export default function DebugTablesScreen() {
    const [tablesData, setTablesData] = useState<Record<string, any[]>>({});
    const [loading, setLoading] = useState(false);

    async function loadAllTables() {
        setLoading(true);
        const result: Record<string, any[]> = {};
        for (const [tableName, tableDef] of Object.entries(schema)) {
            try {
                const rows = await db.select().from(tableDef as any).all();
                result[tableName] = rows;
            } catch (e) {
                result[tableName] = [{ error: (e as Error).message }];
            }
        }
        setTablesData(result);
        setLoading(false);
    }

    useEffect(() => {
        loadAllTables();
    }, []);

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
