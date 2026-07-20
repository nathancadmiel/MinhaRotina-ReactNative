// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as suas telas da aplicação + a tela de Login e a nova de Cadastro
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen'; // <-- Importada aqui!
import HomeScreen from './screens/HomeScreen';
import TarefasScreen from './screens/TarefasScreen';
import DetalhesScreen from './screens/DetalhesScreen';
import FraseDoDiaScreen from './screens/FraseDoDiaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Definimos que o App agora inicia obrigatoriamente na tela de Login */}
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Criar Conta', headerStyle: { backgroundColor: '#F9FAFB' } }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início', headerLeft: () => null }} />
        <Stack.Screen name="Tarefas" component={TarefasScreen} options={{ title: 'Minhas Tarefas' }} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ title: 'Detalhes' }} />
        <Stack.Screen name="FraseDoDia" component={FraseDoDiaScreen} options={{ title: 'Frase do Dia' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}