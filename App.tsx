import {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
 
   const [status, setStatus] = useState<string>('');
   const [imageUri, setImageUri] = useState<string | null>(null);

  async function abrirCamera(){
    try{

      setStatus("Pedindo Permissão...")

      const {status} = await ImagePicker.requestCameraPermissionsAsync(); 

      if(status !== 'granted'){
        setStatus ("Permissão Negada!!");
        return;
      }

      setStatus("Abrindo a câmera...");

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality:1
      });


      if(result.canceled){
        setStatus("Câmera Cancelada!");
      }else{
        const foto = result.assets[0];
        setImageUri(foto.uri);
        setStatus("Imagem Capturada");
      }


    }catch(erro){

      setStatus("Erro ao abrir");

    }
  }

   return(

    <View  style= {styles.container}>
      <Text style= {styles.titulo}>Câmera</Text>


      <TouchableOpacity style={styles.btn} onPress={abrirCamera} >
        <Text style={styles.txtBtn}>Abrir Câmera</Text>
      </TouchableOpacity>

      <Text> {status} </Text>

      {
        imageUri ? 
        (
          <Image source={{uri:imageUri}} resizeMode='cover' style={styles.imagem}/>
        ):
        
        (
          <Text>Nenhuma Foto Capturada</Text>
        )

      }

    </View>
   )
  
}

const styles = StyleSheet.create({
imagem:{
  width:300,
  height:300
},

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn:{
    backgroundColor:"#332366",
    width:'30%',
    padding:10,
    borderRadius:30
  },

  titulo:{
   fontSize:30,
   fontWeight:'bold'
  },

  txtBtn:{
    color:'#FFF',
    textAlign:'center',
    fontSize:20
  }
});
