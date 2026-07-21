import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Platform } from 'react-native';
import { collection, addDoc, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import TarefaItem from '../components/TarefaItem';

export default function TarefasScreen({ route, navigation }) {
  const emailIdentificador = route.params?.emailUsuario || '';
  const nomeDoUsuario = emailIdentificador ? emailIdentificador.split('@')[0] : 'Usuário';

  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState('todas'); 

  // 🟢 ESCUTA O FIRESTORE EM TEMPO REAL
  // Sempre que uma tarefa for adicionada, alterada ou concluída, a tela atualiza sozinha!
  useEffect(() => {
    if (!emailIdentificador) return;

    const q = query(
      collection(db, 'tarefas'), 
      where('email_usuario', '==', emailIdentificador)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const listaTarefas = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        listaTarefas.push({
          id: doc.id,
          nome: data.texto,
          concluida: data.concluida || false
        });
      });

      setTarefas(listaTarefas);
    }, (error) => {
      console.error("Erro ao escutar Firestore:", error);
    });

    return () => unsubscribe();
  }, [emailIdentificador]);

  // 🟢 ADICIONAR TAREFA
  async function adicionarTarefa() {
    if (tarefa.trim() === '') {
      if (Platform.OS === 'web') alert('Por favor, digite uma tarefa antes de adicionar.');
      else Alert.alert('Campo Vazio', 'Por favor, digite uma tarefa antes de adicionar.');
      return;
    }

    try {
      await addDoc(collection(db, 'tarefas'), {
        email_usuario: emailIdentificador,
        texto: tarefa,
        concluida: false,
        criadoEm: new Date()
      });

      setTarefa('');
    } catch (error) {
      if (Platform.OS === 'web') alert('Erro ao salvar tarefa no Firebase.');
      else Alert.alert('Erro', 'Não foi possível salvar no Firebase.');
    }
  }

  // 🟢 ALTERNAR CONCLUÍDA / PENDENTE NO FIRESTORE
  const alternarConcluida = async (id, statusAtual) => {
    try {
      const tarefaRef = doc(db, 'tarefas', id);
      await updateDoc(tarefaRef, {
        concluida: !statusAtual
      });
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const tarefasConcluidas = tarefas.filter((t) => t.concluida).length;
  const tarefasPendentes = tarefas.filter((t) => !t.concluida).length;

  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtroAtivo === 'pendentes') return !t.concluida;
    if (filtroAtivo === 'concluidas') return t.concluida;
    return true;
  });

  return (
    <View style={styles.outerContainer}>
      <View style={styles.phoneMockup}>
        <View style={styles.headerArea}>
          <Text style={styles.welcome}>Olá, {nomeDoUsuario}! 👋</Text>
          <View style={styles.subtitleRow}>
            <Text style={styles.subtitle}>Organize o seu dia.</Text>
            <TouchableOpacity onPress={() => setFiltroAtivo('todas')}>
              <Text style={[styles.clearFilterText, filtroAtivo === 'todas' && styles.clearFilterActive]}>
                {filtroAtivo === 'todas' ? 'Mostrando Tudo' : 'Ver Todas 🔄'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <TouchableOpacity 
            style={[styles.statusBox, filtroAtivo === 'pendentes' && styles.statusBoxActive]} 
            onPress={() => setFiltroAtivo('pendentes')}
          >
            <Text style={[styles.statusNumber, filtroAtivo === 'pendentes' && styles.textActive]}>{tarefasPendentes}</Text>
            <Text style={[styles.statusLabel, filtroAtivo === 'pendentes' && styles.textActive]}>Pendentes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.statusBox, filtroAtivo === 'concluidas' && styles.statusBoxActive]} 
            onPress={() => setFiltroAtivo('concluidas')}
          >
            <Text style={[styles.statusNumber, filtroAtivo === 'concluidas' && styles.textActive]}>{tarefasConcluidas}</Text>
            <Text style={[styles.statusLabel, filtroAtivo === 'concluidas' && styles.textActive]}>Concluídas</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputArea}>
          <TextInput 
            style={styles.input} 
            placeholder="Qual a próxima atividade?" 
            placeholderTextColor="#9CA3AF"
            value={tarefa}
            onChangeText={setTarefa}
          />
          <TouchableOpacity style={styles.addBtn} onPress={adicionarTarefa}>
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        {tarefasFiltradas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>Nenhuma tarefa aqui.</Text>
            <Text style={styles.emptySubtext}>Não há itens para exibir neste filtro.</Text>
          </View>
        ) : (
          <FlatList
            data={tarefasFiltradas}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <TarefaItem 
                item={item} 
                onCheckToggle={() => alternarConcluida(item.id, item.concluida)} // Alterna o check
                onPress={() => navigation.navigate('Detalhes', {
                  tarefa: item.nome, 
                  tarefaId: item.id,
                  concluida: item.concluida
                })}
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
  phoneMockup: { width: '100%', maxWidth: 430, height: Platform.OS === 'web' ? '90vh' : '100%', backgroundColor: '#F9FAFB', borderRadius: 24, padding: 24, display: 'flex' },
  headerArea: { justifyContent: 'center', alignItems: 'stretch', marginBottom: 20, marginTop: 8 },
  welcome: { fontSize: 26, fontWeight: '800', color: '#1F2937', letterSpacing: -0.5 },
  subtitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  subtitle: { fontSize: 15, color: '#6B7280', fontWeight: '500' },
  clearFilterText: { fontSize: 13, fontWeight: '700', color: '#6366F1', textDecorationLine: 'underline' },
  clearFilterActive: { color: '#9CA3AF', textDecorationLine: 'none' },
  inputArea: { flexDirection: 'row', marginBottom: 24 },
  input: { flex: 1, height: 54, backgroundColor: '#FFFFFF', borderRadius: 14, paddingHorizontal: 16, fontSize: 16, color: '#111827', borderWidth: 1, borderColor: '#E5E7EB' },
  addBtn: { backgroundColor: '#10B981', width: 54, height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
  addBtnText: { color: '#FFFFFF', fontSize: 28, fontWeight: '400', marginTop: -2 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '700', color: '#4B5563' },
  emptySubtext: { fontSize: 14, color: '#9CA3AF', marginTop: 4, textAlign: 'center' },
  statusContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statusBox: { flex: 1, backgroundColor: '#F3F4F6', borderRadius: 14, padding: 16, marginHorizontal: 6, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  statusBoxActive: { backgroundColor: '#6366F1', borderColor: '#6366F1' },
  statusNumber: { fontSize: 28, fontWeight: '900', color: '#6366F1', marginBottom: 4 },
  statusLabel: { fontSize: 13, fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: 0.5 },
  textActive: { color: '#FFFFFF' }
});