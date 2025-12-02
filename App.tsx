import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cadastro from './Cadastro';
import Perfil from './Perfil';

export type RootStackParamList = {
  Cadastro: undefined;
  Perfil: { nome: string; email: string; foto: string | null };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro">
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
