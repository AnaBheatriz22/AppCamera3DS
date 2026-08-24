import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type PerfilRouteProp = RouteProp<RootStackParamList, 'Perfil'>;
type PerfilNavProp = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

export default function Perfil() {
  const route = useRoute<PerfilRouteProp>();
  const navigation = useNavigation<PerfilNavProp>();
  const { nome, email, foto } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0F1D" />

      <View style={styles.card}>
        <Text style={styles.titulo}>Perfil do Usuário</Text>

        <View style={styles.avatarWrapper}>
          {foto ? (
            <Image source={{ uri: foto }} style={styles.imagem} />
          ) : (
            <View style={[styles.imagem, styles.noFoto]}>
              <Text style={styles.noFotoIcon}>👤</Text>
              <Text style={styles.noFotoText}>Sem foto</Text>
            </View>
          )}
        </View>


        <View style={styles.infoGroup}>
          <View style={styles.infoBox}>
            <Text style={styles.label}>NOME</Text>
            <Text style={styles.value}>{nome}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>E-MAIL</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
        </View>

        {/* Botão de Voltar com estilo secundário */}
        <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Text style={styles.txtBtn}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1D', // Fundo Azul Escuro Profundo
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#161F33', // Card elevado em tom de azul médio
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
    shadowColor: '#38BDF8', // Glow suave em Ciano
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#d5dadf',
    marginBottom: 20,
  },

  avatarWrapper: {
    marginBottom: 20,
  },

  imagem: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#38BDF8', // Anel Ciano de Destaque
  },

  noFoto: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    borderColor: '#334155',
  },

  noFotoIcon: {
    fontSize: 28,
  },

  noFotoText: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },

  infoGroup: {
    width: '100%',
    marginBottom: 12,
  },

  infoBox: {
    width: '100%',
    backgroundColor: '#0F172A',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 10,
  },

  label: {
    color: '#38BDF8', // Ciano para os rótulos
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },

  value: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '500',
  },

  btn: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
  },

  txtBtn: {
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
});