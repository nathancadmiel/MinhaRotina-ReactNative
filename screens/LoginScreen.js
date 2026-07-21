import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Importa o Firebase Auth configurado

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      if (Platform.OS === 'web') alert('Atenção: Preencha todos os campos.');
      else Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      // Faz login diretamente no Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Navega para a Home passando o e-mail logado
      navigation.replace('Home', { emailUsuario: user.email });
    } catch (error) {
      let mensagemErro = 'Ocorreu um erro ao tentar entrar.';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        mensagemErro = 'E-mail ou senha incorretos.';
      }

      if (Platform.OS === 'web') alert('Erro no Login: ' + mensagemErro);
      else Alert.alert('Erro no Login', mensagemErro);
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