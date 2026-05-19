import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  // Estado para armazenar o nome digitado pelo usuário
  const [nome, setNome] = useState('');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.outerContainer}
    >
      <View style={styles.phoneMockup}>
        <View style={styles.content}>
          
          <Image 
            source={require('../fundo.jpg')} 
            style={styles.bannerImage}
          />

          <View style={styles.header}>
            <Text style={styles.title}>Minha Rotina</Text>
            <Text style={styles.desc}>Organize suas tarefas diárias de forma simples, elegante e intuitiva.</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Como podemos te chamar?</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome..."
              placeholderTextColor="#9CA3AF"
              value={nome}
              onChangeText={setNome}
            />
            
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Tarefas', { nomeUsuario: nome })}
            >
              <Text style={styles.buttonText}>Começar Jornada ➔</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('FraseDoDia')}
            >
              <Text style={styles.secondaryButtonText}>Ver Frase do Dia</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', padding: 16 },
  phoneMockup: { width: '100%', maxWidth: 430, height: Platform.OS === 'web' ? '90vh' : '100%', backgroundColor: '#F9FAFB', borderRadius: 24, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 24, elevation: 8 },
  content: { flex: 1, padding: 24, justifyContent: 'flex-start' }, // Mudado para flex-start para não esticar tudo
  bannerImage: { width: '100%', height: 180, borderRadius: 16, marginTop: 8, resizeMode: 'cover' },
  header: { alignItems: 'center', marginTop: 30, marginBottom: 40 }, // Aumentado o espaço abaixo do texto para empurrar o form
  title: { fontSize: 32, fontWeight: '900', color: '#1F2937', letterSpacing: -1, marginBottom: 6 },
  desc: { fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 22, fontWeight: '500' },
  form: { width: '100%', marginTop: 'auto', marginBottom: 16 }, // Empurra o bloco do formulário para alinhar perfeitamente abaixo
  label: { fontSize: 13, fontWeight: '700', color: '#4B5563', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  input: { width: '100%', height: 54, backgroundColor: '#FFFFFF', borderRadius: 14, paddingHorizontal: 16, fontSize: 16, color: '#111827', borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 24 }, // Aumentado o espaço entre o input e o botão
  button: { backgroundColor: '#6366F1', width: '100%', height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', shadowColor: '#6366F1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.2 },
  secondaryButton: { backgroundColor: '#FFFFFF', width: '100%', height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#6366F1', marginTop: 12 },
  secondaryButtonText: { color: '#6366F1', fontSize: 16, fontWeight: '700' }
});