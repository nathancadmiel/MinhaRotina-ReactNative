import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function TarefasScreen({ route, navigation }) {
  const { nomeUsuario } = route.params;
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  function adicionarTarefa() {
    if (tarefa.trim() === '') return;
    const novaTarefa = { id: Date.now().toString(), nome: tarefa };
    setTarefas([...tarefas, novaTarefa]);
    setTarefa('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Olá, {nomeUsuario || 'Visitante'}!</Text>
      <Text style={styles.subtitle}>Organize suas tarefas de hoje.</Text>
      
      <View style={styles.inputArea}>
        <TextInput 
          style={styles.input} 
          placeholder="Nova tarefa..." 
          value={tarefa}
          onChangeText={setTarefa}
        />
        <TouchableOpacity style={styles.addBtn} onPress={adicionarTarefa}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item} 
            onPress={() => navigation.navigate('Detalhes', { tarefa: item.nome })}
          >
            <Text style={styles.itemText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  welcome: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  inputArea: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginRight: 10 },
  addBtn: { backgroundColor: '#28a745', padding: 15, borderRadius: 8 },
  addBtnText: { color: '#fff', fontWeight: 'bold' },
  item: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  itemText: { fontSize: 16 }
});