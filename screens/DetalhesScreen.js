import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

export default function DetalhesScreen({ route, navigation }) {
  const { tarefa } = route.params;

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
  backButton: { backgroundColor: '#6366F1', width: '100%', height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 8, shadowColor: '#6366F1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6 },
  backButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' }
});