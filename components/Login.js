import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import qs from 'qs';
import { UserContext } from './../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigation(); // Correto no React Native!

    const handleLogin = async () => {
        // Não tem mais (e.preventDefault()) no Mobile

        const body = {
            username: username,
            password: password,
        };

        try {
            const response = await axios.post('https://sigpat.vmserv.com.br/api/login.php', qs.stringify(body), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            console.log('Resposta da API:', response.data);

            if (response.data.status === 'success') {
                setUser({
                    id: response.data.user.id,
                    name: response.data.user.name,
                });
                setMessage(`Login bem-sucedido! Bem-vindo, ${response.data.user.name}`);
                Alert.alert('Sucesso', `Bem-vindo, ${response.data.user.name}`);
                navigation.navigate('Home'); // Mobile é navigation.navigate!
            } else {
                setMessage(`Falha no login: ${response.data.message}`);
                Alert.alert('Falha no login', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao conectar com a API:', error);
            setMessage('Erro ao conectar com o servidor.');
            Alert.alert('Erro', 'Erro ao conectar com o servidor. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Entrar" onPress={handleLogin} color="#007bff" />
            {message !== '' && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    message: {
        marginTop: 16,
        textAlign: 'center',
        color: 'red',
    },
});

export default Login;
