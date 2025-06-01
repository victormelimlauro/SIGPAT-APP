import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from './../contexts/UserContext'; // Importando o contexto do usuário
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation
import Header from './../components/Header'; // Importando o Header

const Home = () => {
    const { user, setUser } = useContext(UserContext); // Usando o contexto para acessar o usuário
    const navigation = useNavigation(); // Inicializando useNavigation

    const handleLogout = () => {
        // Limpar o estado do usuário
        setUser(null);
        // Redirecionar para a página de login
        navigation.navigate('Login');
    };

    const navigateToCadastrarOperacao = () => {
        // Redirecionar para a página CadastrarOperacao
        navigation.navigate('CadastrarOperacao');
    };

    return (
         
        <View style={styles.container}>
         <Header /> 
            <View style={styles.buttonContainer}>
                <Button 
                    title="Cadastrar Operações"
                    onPress={navigateToCadastrarOperacao} // Chamando a função ao clicar
                    color="#007bff"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Sair"
                    onPress={handleLogout} // Chamando a função ao clicar
                    color="red"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginBottom: 20,
    },
});

export default Home;
