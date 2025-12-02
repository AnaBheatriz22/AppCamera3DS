import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './App';

type CadastroNavProp = NativeStackNavigationProp<RootStackParamList, 'Cadastro'>;

export default function Cadastro() {
  const navigation = useNavigation<CadastroNavProp>();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  async function tirarFoto() {
    try {
      setStatus('Pedindo permissão...');
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permissão negada para acessar a câmera!');
        setStatus('Permissão negada');
        return;
      }

      setStatus('Abrindo câmera...');
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled) {
        setStatus('Câmera cancelada');
      } else {
        setFoto(result.assets[0].uri);
        setStatus('Foto capturada');
      }
    } catch (error) {
      setStatus('Erro ao abrir câmera');
    }
  }

  function verPerfil() {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Preencha os campos', 'Por favor preencha nome e e-mail.');
      return;
    }
    navigation.navigate('Perfil', { nome, email, foto });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil com Foto</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        autoCapitalize="words"
      />

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={tirarFoto}>
        <Text style={styles.buttonText}>Tirar Foto</Text>
      </TouchableOpacity>

      <Text style={{ marginVertical: 8 }}>{status}</Text>

      {foto ? (
        <Image source={{ uri: foto }} style={styles.preview} />
      ) : (
        <Text>Nenhuma foto capturada</Text>
      )}

      <TouchableOpacity style={[styles.button, { marginTop: 12 }]} onPress={verPerfil}>
        <Text style={styles.buttonText}>Ver Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1, 
   alignItems: 'center',
   justifyContent: 'center', 
   padding: 16 
  },

  title: {
  fontSize: 22,
  fontWeight: 'bold',
   marginBottom: 12
  },
  input: { 
  width: '100%',
  padding: 10, 
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  marginBottom: 8 
},
  button: {
  backgroundColor: '#066650ff',
  padding: 12, 
  borderRadius: 8, 
  width: '60%', 
  alignItems: 'center' 
},
  buttonText: {
   color: '#fff', 
   fontSize: 16 },
  preview: {
   width: 300, 
   height: 300, 
   marginTop: 12, 
   borderRadius: 8 
  },
});