// Header.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { UserContext } from '../contexts/UserContext'; // Certifique-se de que o caminho está correto
import { useNavigation } from '@react-navigation/native';
const Header = () => {
    
    const { user, setUser } = useContext(UserContext);
    const navigation = useNavigation();

    const handleLogout = () => {
        setUser(null);
        navigation.navigate('Login');
    };
    return (
        <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo à Página Inicial!</Text>
        <Text style={styles.subtitle}>
          {user ? `Olá, ${user.name}!` : 'Você não está logado.'}
        </Text>
        <Button title="Sair" onPress={handleLogout} color="red" />
      </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 12,
    },
});

export default Header;