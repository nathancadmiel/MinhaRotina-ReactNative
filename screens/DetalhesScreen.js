import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DetalhesScreen({ route, navigation }) {
  const { tarefa } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefa Selecionada:</Text>
      <Text style={styles.taskName}>{tarefa}</Text>
      <Text style={styles.info}>Essa atividade faz parte da sua rotina diária.</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 18, color: '#666' },
  taskName: { fontSize: 26, fontWeight: 'bold', marginVertical: 15 },
  info: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
  backButton: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  backButtonText: { color: 'white', fontWeight: 'bold' }
});