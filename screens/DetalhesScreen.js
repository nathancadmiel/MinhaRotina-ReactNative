import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';

export default function DetalhesScreen({ route, navigation }) {
  const { tarefa, tarefaId, concluida } = route.params;
  const [estaConcluida, setEstaConcluida] = useState(concluida || false);

  async function handleConcluir() {
    if (estaConcluida) {
      if (Platform.OS === 'web') alert('Esta tarefa já foi marcada como concluída.');
      else Alert.alert('Tarefa já concluída', 'Esta tarefa já foi marcada como concluída.');
      return;
    }

    try {
      // Faz a requisição diretamente por aqui
      const response = await fetch(`http://localhost:3000/tarefas/${tarefaId}/concluir`, { method: 'PUT' });
      if (response.ok) {
        setEstaConcluida(true);
        // Volta para a tela anterior com segurança total
        navigation.goBack(); 
      }
    } catch (error) {
      console.error(error);
      if (Platform.OS === 'web') alert('Erro ao concluir tarefa no servidor.');
    }
  }

  async function handleExcluir() {
    try {
      // Deleta diretamente por aqui
      const response = await fetch(`http://localhost:3000/tarefas/${tarefaId}`, { method: 'DELETE' });
      if (response.ok) {
        navigation.goBack(); 
      }
    } catch (error) {
      console.error(error);
      if (Platform.OS === 'web') alert('Erro ao excluir tarefa no servidor.');
    }
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.phoneMockup}>
        <View style={styles.card}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Foco do Dia</Text>
          </View>
          <Text style={styles.taskName}>{tarefa}</Text>
          <View style={styles.divider} />
          <Text style={styles.info}>✨ Esta atividade foi adicionada e faz parte das metas cruciais para manter a constância na sua rotina diária.</Text>
          {estaConcluida && <Text style={styles.statusText}>✅ Tarefa concluída</Text>}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.completeButton} onPress={handleConcluir}>
            <Text style={styles.completeButtonText}>Concluir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleExcluir}>
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar para as Tarefas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', padding: 16 },
  phoneMockup: { width: '100%', maxWidth: 430, height: Platform.OS === 'web' ? '90vh' : '100%', backgroundColor: '#F9FAFB', borderRadius: 24, padding: 24, justifyContent: 'space-between' },
  card: { width: '100%', backgroundColor: '#FFFFFF', padding: 24, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', marginTop: 20 },
  badge: { backgroundColor: '#EEF2F6', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, marginBottom: 16 },
  badgeText: { fontSize: 12, fontWeight: '700', color: '#6366F1', textTransform: 'uppercase', letterSpacing: 0.5 },
  taskName: { fontSize: 26, fontWeight: '900', color: '#1F2937', textAlign: 'center' },
  divider: { width: 48, height: 4, backgroundColor: '#6366F1', borderRadius: 2, marginVertical: 20 },
  info: { fontSize: 15, color: '#4B5563', textAlign: 'center', lineHeight: 24, fontWeight: '500' },
  statusText: { fontSize: 14, color: '#10B981', fontWeight: '700', textAlign: 'center', marginTop: 16 },
  buttonRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 },
  completeButton: { backgroundColor: '#D1FAE5', flex: 1, height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  completeButtonText: { color: '#047857', fontSize: 16, fontWeight: '700' },
  deleteButton: { backgroundColor: '#FEE2E2', flex: 1, height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  deleteButtonText: { color: '#B91C1C', fontSize: 16, fontWeight: '700' },
  backButton: { backgroundColor: '#6366F1', width: '100%', height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  backButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' }
});