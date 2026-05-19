import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as telas da aplicação
import HomeScreen from './screens/HomeScreen';
import TarefasScreen from './screens/TarefasScreen';
import DetalhesScreen from './screens/DetalhesScreen';
import FraseDoDiaScreen from './screens/FraseDoDiaScreen';

// Cria o navegador de pilha (stack navigator)
const Stack = createNativeStackNavigator();

// Componente principal: configura a navegação entre telas
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="Tarefas" component={TarefasScreen} options={{ title: 'Minhas Tarefas' }} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ title: 'Detalhes' }} />
        <Stack.Screen name="FraseDoDia" component={FraseDoDiaScreen} options={{ title: 'Frase do Dia' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}