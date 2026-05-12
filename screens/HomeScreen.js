import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [nome, setNome] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Rotina</Text>
      <Text style={styles.desc}>Organize suas tarefas de forma simples.</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Tarefas', { nomeUsuario: nome })}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f0f4f7' },
  title: { fontSize: 30, fontWeight: 'bold', color: '#333' },
  desc: { fontSize: 16, color: '#666', marginBottom: 30 },
  input: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 15, borderWidth: 1, borderColor: '#ddd', marginBottom: 20 },
  button: { backgroundColor: '#4A90E2', width: '100%', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});