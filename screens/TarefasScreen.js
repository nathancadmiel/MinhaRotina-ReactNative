import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Platform } from 'react-native';
import TarefaItem from '../components/TarefaItem';

export default function TarefasScreen({ route, navigation }) {
  const { nomeUsuario } = route.params;
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  function adicionarTarefa() {
    if (tarefa.trim() === '') {
      Alert.alert('Campo Vazio', 'Por favor, digite uma tarefa antes de adicionar.');
      return;
    }
    const novaTarefa = { id: Date.now().toString(), nome: tarefa };
    setTarefas([...tarefas, novaTarefa]);
    setTarefa('');
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.phoneMockup}>
        <View style={styles.headerArea}>
          <Text style={styles.welcome}>Olá, {nomeUsuario || 'Nathan'}! 👋</Text>
          <Text style={styles.subtitle}>Falta pouco para organizar o seu dia.</Text>
        </View>
        
        <View style={styles.inputArea}>
          <TextInput 
            style={styles.input} 
            placeholder="Qual a próxima atividade?" 
            placeholderTextColor="#9CA3AF"
            value={tarefa}
            onChangeText={setTarefa}
          />
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.85} onPress={adicionarTarefa}>
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        {tarefas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyText}>Sua lista está limpa hoje.</Text>
            <Text style={styles.emptySubtext}>Adicione uma tarefa acima para começar.</Text>
          </View>
        ) : (
          <FlatList
            data={tarefas}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <TarefaItem 
                item={item} 
                onPress={() => navigation.navigate('Detalhes', { tarefa: item.nome })}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', padding: 16 },
  phoneMockup: { width: '100%', maxWidth: 430, height: Platform.OS === 'web' ? '90vh' : '100%', backgroundColor: '#F9FAFB', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 24, elevation: 8 },
  headerArea: { justifyContent: 'center', alignItems: 'flex-start', marginBottom: 20, marginTop: 8 },
  welcome: { fontSize: 26, fontWeight: '800', color: '#1F2937', letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: '#6B7280', marginTop: 4, fontWeight: '500' },
  inputArea: { flexDirection: 'row', marginBottom: 24 },
  input: { flex: 1, height: 54, backgroundColor: '#FFFFFF', borderRadius: 14, paddingHorizontal: 16, fontSize: 16, color: '#111827', borderWidth: 1, borderColor: '#E5E7EB' },
  addBtn: { backgroundColor: '#10B981', width: 54, height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginLeft: 12, shadowColor: '#10B981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6 },
  addBtnText: { color: '#FFFFFF', fontSize: 28, fontWeight: '400', marginTop: -2 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '700', color: '#4B5563' },
  emptySubtext: { fontSize: 14, color: '#9CA3AF', marginTop: 4, textAlign: 'center' }
});