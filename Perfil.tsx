import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil</Text>

      {foto ? (
        <Image source={{ uri: foto }} style={styles.imagem} />
      ) : (
        <View style={[styles.imagem, styles.noFoto]}>
          <Text>Nenhuma foto</Text>
        </View>
      )}

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{nome}</Text>

      <Text style={styles.label}>E-mail:</Text>
      <Text style={styles.value}>{email}</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={styles.txtBtn}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imagem: {
    width: 300,
    height: 300,
    borderRadius: 8,
    marginBottom: 16
  },

  noFoto: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee'
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },

  btn:{
    backgroundColor:"#066650ff",
    width:'30%',
    padding:10,
    borderRadius:30,
    marginTop: 16
  },

  titulo:{
    fontSize:30,
    fontWeight:'bold',
    marginBottom: 20
  },

  txtBtn:{
    color:'#FFF',
    textAlign:'center',
    fontSize:20
  },

  label: {
    fontWeight: 'bold',
    marginTop: 12,
    fontSize: 16
  },

  value: {
    fontSize: 16,
    marginBottom: 4
  }
});
