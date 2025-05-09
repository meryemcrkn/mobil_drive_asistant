import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');

  const handleRegister = () => {
    if (name && email && password && city) {
      // Burada gerçek bir API çağrısı yapılabilir
      Alert.alert('Başarılı', 'Üyelik oluşturuldu!');
      router.replace('/');
    } else {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Üye Ol</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ad Soyad</Text>
          <TextInput
            style={styles.input}
            placeholder="Adınız ve soyadınız"
            value={name}
            onChangeText={setName}
            autoComplete="name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-posta Adresi</Text>
          <TextInput
            style={styles.input}
            placeholder="ornek@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Şifre</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Şehir</Text>
          <TextInput
            style={styles.input}
            placeholder="Yaşadığınız şehir"
            value={city}
            onChangeText={setCity}
            autoComplete="off"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Üye Ol</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.linkText}>Zaten üye misiniz? Giriş yapın</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6b48ff',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#6b48ff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
}); 