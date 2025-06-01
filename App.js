import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './contexts/UserContext'; 

// Suas telas
import LoginPage from './components/Login';
import HomePage from './components/Home';
import CadastrarOperacaoPage from './components/Cadastrar_operacao';
import ListarItensLocalizados from './components/ListarItensLocalizados';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomePage} options={{ title: 'Home' }} />
          <Stack.Screen name="CadastrarOperacao" component={CadastrarOperacaoPage} options={{ title: 'Cadastrar Operação' }} />
          <Stack.Screen name="ListarItensLocalizados" component={ListarItensLocalizados} options={{ title: 'Itens Localizados' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
