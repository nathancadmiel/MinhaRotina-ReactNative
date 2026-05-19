import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

export default function FraseDoDiaScreen({ navigation }) {
  // Estado para armazenar a frase selecionada
  const [frase, setFrase] = useState('');

  // Hook que executa ao carregar a tela e seleciona uma frase aleatória
  useEffect(() => {
    // Array com frases motivadoras
    const frases = [
      'Organização é o primeiro passo para a produtividade.',
      'Pequenas ações diárias geram grandes resultados.',
      'Comece simples, mas comece.',
      'A disciplina transforma intenções em realidade.',
      'Cada tarefa concluída é um passo rumo à sua meta.'
    ];
    // Seleciona uma frase aleatória do array
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    setFrase(fraseAleatoria);
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <View style={styles.outerContainer}>
      <View style={styles.phoneMockup}>
        <View style={styles.card}>
          <Text style={styles.title}>Frase do Dia</Text>
          <Text style={styles.subtitle}>Uma mensagem motivadora para sua rotina.</Text>
          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>{frase}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.backButton} activeOpacity={0.85} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', padding: 16 },
  phoneMockup: { width: '100%', maxWidth: 430, minHeight: Platform.OS === 'web' ? '90vh' : '100%', backgroundColor: '#F9FAFB', borderRadius: 24, padding: 24, justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 24, elevation: 8 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12 },
  title: { fontSize: 28, fontWeight: '900', color: '#111827', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 22, marginBottom: 20, fontWeight: '500' },
  quoteBox: { backgroundColor: '#EEF2FF', padding: 24, borderRadius: 18, borderWidth: 1, borderColor: '#E0E7FF' },
  quoteText: { fontSize: 18, color: '#1E3A8A', fontWeight: '700', lineHeight: 28, textAlign: 'center' },
  backButton: { backgroundColor: '#6366F1', width: '100%', height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 20, shadowColor: '#6366F1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6 },
  backButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' }
});
