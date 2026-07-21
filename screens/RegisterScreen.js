import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    if (!email || !senha) {
      if (Platform.OS === 'web') alert('Atenção: Preencha todos os campos.');
      else Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      // Cadastra o novo usuário no Firebase Auth
      await createUserWithEmailAndPassword(auth, email, senha);

      if (Platform.OS === 'web') alert('Sucesso: Conta criada com sucesso! Faça login.');
      else Alert.alert('Sucesso', 'Conta criada com sucesso!');

      navigation.navigate('Login');
    } catch (error) {
      let mensagemErro = 'Erro ao criar conta.';
      if (error.code === 'auth/email-already-in-use') mensagemErro = 'Este e-mail já está em uso.';
      else if (error.code === 'auth/weak-password') mensagemErro = 'A senha deve ter no mínimo 6 caracteres.';

      if (Platform.OS === 'web') alert('Erro: ' + mensagemErro);
      else Alert.alert('Erro', mensagemErro);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.outerContainer}>
      <View style={styles.phoneMockup}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>📝 Cadastro</Text>
            <Text style={styles.desc}>Crie sua conta para começar a gerenciar suas tarefas.</Text>
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
              placeholder="Digite sua senha (mínimo 6 caracteres)..."
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Cadastrar ➔</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.registerLinkText}>Já tem uma conta? Faça login</Text>
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
  button: { backgroundColor: '#10B981', width: '100%', height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  registerLink: { marginTop: 20, alignItems: 'center' },
  registerLinkText: { color: '#6366F1', fontSize: 14, fontWeight: '600', textDecorationLine: 'underline' }
});