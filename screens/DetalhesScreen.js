import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';

export default function DetalhesScreen({ route, navigation }) {
  // Recebe a tarefa e as funções de callback da tela anterior
  const { tarefa, concluida, onConclude, onDelete } = route.params;
  // Controla o estado local se a tarefa está concluída
  const [estaConcluida, setEstaConcluida] = useState(concluida || false);

  // Executa a função de concluir tarefa
  function handleConcluir() {
    if (estaConcluida) {
      Alert.alert('Tarefa já concluída', 'Esta tarefa já foi marcada como concluída.');
      return;
    }
    if (typeof onConclude === 'function') {
      onConclude();
      setEstaConcluida(true);
    }
  }

  // Executa a função de excluir e volta para a lista
  function handleExcluir() {
    if (typeof onDelete === 'function') {
      onDelete();
    }
    navigation.goBack();
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

        // Botões para concluir (verde) e excluir (vermelho) a tarefa
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.completeButton} activeOpacity={0.85} onPress={handleConcluir}>
            <Text style={styles.completeButtonText}>Concluir Tarefa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} activeOpacity={0.85} onPress={handleExcluir}>
            <Text style={styles.deleteButtonText}>Excluir Tarefa</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backButton} activeOpacity={0.85} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar para as Tarefas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', padding: 16 },
  phoneMockup: { width: '100%', maxWidth: 430, height: Platform.OS === 'web' ? '90vh' : '100%', backgroundColor: '#F9FAFB', borderRadius: 24, padding: 24, justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 24, elevation: 8 },
  card: { width: '100%', backgroundColor: '#FFFFFF', padding: 24, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', marginTop: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10 },
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
  backButton: { backgroundColor: '#6366F1', width: '100%', height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 20, shadowColor: '#6366F1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6 },
  backButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' }
});