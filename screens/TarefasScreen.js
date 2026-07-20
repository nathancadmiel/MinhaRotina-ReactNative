import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TarefaItem from '../components/TarefaItem';

export default function TarefasScreen({ route, navigation }) {
  // Inicializa o estado apenas UMA vez com o valor da rota.
  // Depois disso, o estado local manda no jogo e nunca mais é zerado.
  const [emailIdentificador] = useState(route.params?.emailUsuario || '');
  const [nomeDoUsuario] = useState(route.params?.nomeUsuario || '');

  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState('todas'); 

  const carregarTarefas = async () => {
    if (!emailIdentificador) return;
    try {
      const response = await fetch(`http://localhost:3000/tarefas/${emailIdentificador}`);
      if (response.ok) {
        const data = await response.json();
        setTarefas(data);
      }
    } catch (error) {
      console.error("Erro de conexão ao carregar tarefas:", error);
    }
  };

  // Esse hook roda SEMPRE que o usuário volta para esta tela, 
  // atualizando a lista automaticamente após concluir ou excluir!
  useFocusEffect(
    useCallback(() => {
      carregarTarefas();
    }, [emailIdentificador])
  );

  async function adicionarTarefa() {
    if (tarefa.trim() === '') {
      if (Platform.OS === 'web') alert('Por favor, digite uma tarefa antes de adicionar.');
      else Alert.alert('Campo Vazio', 'Por favor, digite uma tarefa antes de adicionar.');
      return;
    }

    if (!emailIdentificador) {
      if (Platform.OS === 'web') alert('Erro: Sessão do usuário perdida. Faça login novamente.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_usuario: emailIdentificador, texto: tarefa }),
      });

      if (response.ok) {
        const novaTarefaSalva = await response.json();
        setTarefas([...tarefas, novaTarefaSalva]);
        setTarefa('');
      }
    } catch (error) {
      if (Platform.OS === 'web') alert('Erro ao salvar tarefa no banco.');
      else Alert.alert('Erro', 'Não foi possível salvar a tarefa no servidor.');
    }
  }

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
          <Text style={styles.welcome}>Olá, {nomeDoUsuario || (emailIdentificador ? emailIdentificador.split('@')[0] : 'Usuário')}! 👋</Text>
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
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <TarefaItem 
                item={item} 
                onPress={() => navigation.navigate('Detalhes', {
                  tarefa: item.texto || item.nome, 
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