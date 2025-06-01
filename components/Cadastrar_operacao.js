import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { UserContext } from './../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Corrigido a importação

// (Se futuramente quiser usar scanner de código de barras, precisa instalar um outro pacote específico para Mobile, como expo-barcode-scanner)

const CadastrarOperacao = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const [inventarios, setInventarios] = useState([]);
  const [locais, setLocais] = useState([]);
  const [selectedInventario, setSelectedInventario] = useState('');
  const [selectedLocal, setSelectedLocal] = useState('');
  const [numpatItem, setNumpatItem] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sigpat.vmserv.com.br/api/popular_locais_e_inventarios.php');
        setInventarios(response.data.inventarios || []);
        setLocais(response.data.locais || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!selectedInventario || !selectedLocal || !numpatItem) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const dadosOperacao = {
      numpat_item: numpatItem,
      cod_inventario: selectedInventario,
      cod_local: selectedLocal,
      cod_usuario: user.id,
    };

    try {
      const response = await axios.post('https://sigpat.vmserv.com.br/api/inserirOperacaoInventario.php', dadosOperacao);
      if (response.data.status === 'success') {
        Alert.alert('Sucesso', 'Operação inserida com sucesso!');
      } else {
        Alert.alert('Erro', 'Erro ao inserir operação: ' + response.data.message);
      }
    } catch (error) {
      console.error("Erro ao inserir operação:", error);
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }
  };

  const handleListarItens = () => {
    navigation.navigate('ListarItensLocalizados', {
      codigoInventario: selectedInventario,
      codigoLocal: selectedLocal,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Operação de Inventário</Text>

      <Text style={styles.label}>Inventário</Text>
      <Picker
        selectedValue={selectedInventario}
        onValueChange={(itemValue) => setSelectedInventario(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione o Inventário" value="" />
        {inventarios.map((inventario) => (
          <Picker.Item
            key={inventario.cod_inventario}
            label={inventario.nome_inventario}
            value={inventario.cod_inventario}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Local</Text>
      <Picker
        selectedValue={selectedLocal}
        onValueChange={(itemValue) => setSelectedLocal(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione o Local" value="" />
        {locais.map((local) => (
          <Picker.Item
            key={local.cod_local}
            label={local.nome_local}
            value={local.cod_local}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Usuário Responsável</Text>
      <TextInput
        style={styles.input}
        value={`${user.name} / ${user.id}`}
        editable={false}
      />

      <Text style={styles.label}>Número do Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o número do item"
        value={numpatItem}
        onChangeText={setNumpatItem}
      />

      <View style={styles.buttonContainer}>
        <Button title="Cadastrar Operação" onPress={handleSubmit} color="#007bff" />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Listar Itens Localizados" onPress={handleListarItens} color="#28a745" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    height: 50,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default CadastrarOperacao;
