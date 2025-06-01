import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Para pegar parâmetros de rota
import Header from './../components/Header'; // Importando o Header
import axios from 'axios';

const ListarItensLocalizados = () => {
    const route = useRoute();
    const { codigoInventario, codigoLocal } = route.params || {}; // Obtendo parâmetros da rota

    const [itensLocalizados, setItensLocalizados] = useState([]);
    const [itensNaoLocalizados, setItensNaoLocalizados] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://sigpat.vmserv.com.br/api/itensPorLocalInventario.php?codigoInventario=${codigoInventario}&codigoLocal=${codigoLocal}`);
                setItensLocalizados(response.data.itensLocalizados || []);
                setItensNaoLocalizados(response.data.itensNaoLocalizados || []);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [codigoInventario, codigoLocal]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Itens Localizados</Text>
                <Text>Código do Inventário: {codigoInventario}</Text>
                <Text>Código do Local: {codigoLocal}</Text>
            </View>

            {/* Tabela para Itens Localizados */}
            <View style={styles.tableContainer}>
                <Text style={styles.subtitle}>Itens Localizados</Text>
                <FlatList
                    data={itensLocalizados}
                    keyExtractor={(item) => item.cod_operacoes_inventarios.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>{item.cod_operacoes_inventarios}</Text>
                            <Text style={styles.tableCell}>{item.numpat_item}</Text>
                            <Text style={styles.tableCell}>{item.nome_item}</Text>
                        </View>
                    )}
                />
            </View>

            {/* Tabela para Itens Não Localizados */}
            <View style={styles.tableContainer}>
                <Text style={styles.subtitle}>Itens NÃO Localizados</Text>
                <FlatList
                    data={itensNaoLocalizados}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>{item.numpat_item}</Text>
                            <Text style={styles.tableCell}>{item.nome_item}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    tableContainer: {
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
});

export default ListarItensLocalizados;
