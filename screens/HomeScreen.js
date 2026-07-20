// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';

export default function HomeScreen({ route, navigation }) {
  // Recebe o e-mail que veio lá da autenticação da tela de Login
  const { emailUsuario } = route.params || {}; 
  const [nome, setNome] = useState('');

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.outerContainer}>
      <View style={styles.phoneMockup}>
        <View style={styles.content}>
          
          <Image source={require('../fundo.jpg')} style={styles.bannerImage} />

          <View style={styles.header}>
            <Text style={styles.title}>Minha Rotina</Text>
            {/* Exibe uma mensagem sutil confirmando a sessão activa do usuário */}
            <Text style={styles.userSession}>Sessão: {emailUsuario || 'Conectado'}</Text>
            <Text style={styles.desc}>Organize suas tarefas diárias de forma simples, elegante e intuitiva.</Text>
          </View>

          <View style={styles.spacer} />

          <View style={styles.form}>
            <Text style={styles.label}>Como podemos te chamar?</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome..."
              placeholderTextColor="#9CA3AF"
              value={nome}
              onChangeText={setNome}
            />
            
            {/* CORREÇÃO AQUI: Agora repassamos o emailUsuario adiante no objeto! */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Tarefas', { 
                nomeUsuario: nome || 'Usuário',
                emailUsuario: emailUsuario 
              })}
            >
              <Text style={styles.buttonText}>Começar Jornada ➔</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton}
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
  phoneMockup: { width: '100%', maxWidth: 430, height: Platform.OS === 'web' ? '90vh' : '100%', backgroundColor: '#F9FAFB', borderRadius: 24, overflow: 'hidden' },
  content: { flex: 1, padding: 24, justifyContent: 'flex-start' }, 
  bannerImage: { width: '100%', height: 180, borderRadius: 16, marginTop: 8, resizeMode: 'cover' },
  header: { alignItems: 'center', marginTop: 20, marginBottom: 10 }, 
  title: { fontSize: 32, fontWeight: '900', color: '#1F2937', letterSpacing: -1, marginBottom: 4 },
  userSession: { fontSize: 12, color: '#6366F1', fontWeight: '700', marginBottom: 8, textTransform: 'lowercase' },
  desc: { fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 22, fontWeight: '500' },
  spacer: { flex: 1 }, 
  form: { width: '100%', marginBottom: 16 }, 
  label: { fontSize: 13, fontWeight: '700', color: '#4B5563', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  input: { width: '100%', height: 54, backgroundColor: '#FFFFFF', borderRadius: 14, paddingHorizontal: 16, fontSize: 16, color: '#111827', borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 24 }, 
  button: { backgroundColor: '#6366F1', width: '100%', height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.2 },
  secondaryButton: { backgroundColor: '#FFFFFF', width: '100%', height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#6366F1', marginTop: 12 },
  secondaryButtonText: { color: '#6366F1', fontSize: 16, fontWeight: '700' }
});