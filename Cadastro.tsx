import React, { useState } from 'react';
import {View,Text,TextInput,Image,StyleSheet,Alert,TouchableOpacity,SafeAreaView, StatusBar,}  from 'react-native';
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
        setStatus('Foto capturada!');
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0F1D" />

      <View style={styles.card}>
        <Text style={styles.title}>Novo Cadastro</Text>
        <Text style={styles.subtitle}>Preencha seus dados para continuar</Text>

        {/* Preview / Botão de Foto com Avatar Circular */}
        <TouchableOpacity style={styles.avatarContainer} onPress={tirarFoto} activeOpacity={0.8}>
          {foto ? (
            <Image source={{ uri: foto }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarIcon}>📷</Text>
              <Text style={styles.avatarText}>Adicionar Foto</Text>
            </View>
          )}
        </TouchableOpacity>

        {status ? <Text style={styles.statusText}>{status}</Text> : null}

        {/* Inputs */}
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Nome completo"
            placeholderTextColor="#64748B"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
            autoCapitalize="words"
          />

          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#64748B"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Botão de Ação */}
        <TouchableOpacity style={styles.primaryButton} onPress={verPerfil} activeOpacity={0.8}>
          <Text style={styles.primaryButtonText}>Acessar Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1D', // Azul Marinho Profundo (Background)
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#161F33', // Card com azul um pouco mais claro
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
    shadowColor: '#38BDF8', // Glow suave em azul ciano
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#38BDF8', // Borda Ciano Tecnológica
  },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#0F172A',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#38BDF8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  avatarText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '600',
  },
  statusText: {
    color: '#38BDF8',
    fontSize: 12,
    marginBottom: 16,
  },
  inputGroup: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    width: '100%',
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    color: '#F8FAFC',
    fontSize: 15,
    marginBottom: 12,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#2563EB', // Azul Neon/Tech
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});