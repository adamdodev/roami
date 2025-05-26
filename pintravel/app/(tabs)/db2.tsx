import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import * as schema from '@/db/schema';
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
        for (const [tableName, tableDef] of Object.entries(schema)) {
            console.log(tableName, tableDef)
            try {
                // const rows = await db.select().from(tableDef as any).all();
                console.log('q')
                const rows = await db.select().from(tableName).all();
                console.log('res:')
                console.log(rows)
                result[tableName] = rows;
            } catch (e: any) {
                console.error(e);
                // Always print the whole object directly
                console.log('Raw error object:', e);
                // Try the standard Error properties
                console.log('Error message:', e?.message);
                console.log('Error stack:', e?.stack);
                // Show the prototype (may help reveal what kind of object it is)
                console.log('Error prototype:', Object.getPrototypeOf(e));
                // Show all own property names, not just enumerable ones
                console.log('Own property names:', Object.getOwnPropertyNames(e));
                Object.getOwnPropertyNames(e).forEach(key => {
                    console.log(`Error property ${key}:`, e[key]);
                });
            }
        }
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
