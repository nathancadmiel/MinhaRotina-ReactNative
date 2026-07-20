// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      if (Platform.OS === 'web') {
        alert('Atenção: Preencha todos os campos.');
      } else {
        Alert.alert('Atenção', 'Preencha todos os campos.');
      }
      return;
    }

    try {
      // Faz a requisição para o servidor Node.js
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Se der certo, redireciona para a HomeScreen
        navigation.replace('Home', { emailUsuario: data.email });
      } else {
        // Se o banco de dados recusar (ex: usuário não existe ou senha errada)
        if (Platform.OS === 'web') {
          alert('Erro no Login: ' + (data.error || 'Credenciais inválidas.'));
        } else {
          Alert.alert('Erro no Login', data.error || 'Credenciais inválidas.');
        }
      }
    } catch (error) {
      // Se o servidor backend estiver desligado
      if (Platform.OS === 'web') {
        alert('Erro de Conexão: Não foi possível se comunicar com o banco de dados. Verifique se o node server.js está rodando.');
      } else {
        Alert.alert('Erro de Conexão', 'Não foi possível se comunicar com o banco de dados.');
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.outerContainer}>
      <View style={styles.phoneMockup}>
        <View style={styles.content}>
          
          <View style={styles.header}>
            <Text style={styles.title}>🔐 Login</Text>
            <Text style={styles.desc}>Acesse sua conta para gerenciar sua rotina diária.</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail..."
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha..."
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar no App ➔</Text>
            </TouchableOpacity>

            {/* Novo botão adicionado para redirecionar para a Tela de Cadastro */}
            <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLinkText}>Não tem uma conta? Cadastre-se aqui</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', padding: 16 },
  phoneMockup: { width: '100%', maxWidth: 430, height: Platform.OS === 'web' ? '90vh' : '100%', backgroundColor: '#F9FAFB', borderRadius: 24, overflow: 'hidden', justifyContent: 'center' },
  content: { padding: 24 },
  header: { alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 32, fontWeight: '900', color: '#1F2937', marginBottom: 6 },
  desc: { fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 22 },
  form: { width: '100%' },
  label: { fontSize: 13, fontWeight: '700', color: '#4B5563', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 0.5 },
  input: { width: '100%', height: 54, backgroundColor: '#FFFFFF', borderRadius: 14, paddingHorizontal: 16, fontSize: 16, color: '#111827', borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 20 },
  button: { backgroundColor: '#6366F1', width: '100%', height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  registerLink: { marginTop: 20, alignItems: 'center' },
  registerLinkText: { color: '#6366F1', fontSize: 14, fontWeight: '600', textDecorationLine: 'underline' }
});