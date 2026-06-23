import { useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useAuth } from '../AuthContext'

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setError('')
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)
    try {
      await register(fullName.trim(), email.trim(), password)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.eyebrow}>Cuenta nueva</Text>
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.subtitle}>Gastos en pesos dominicanos (RD$)</Text>

      <TextInput style={styles.input} placeholder="Nombre completo" placeholderTextColor="#6b7a90" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="Correo electrónico" placeholderTextColor="#6b7a90" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#6b7a90" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirmar contraseña" placeholderTextColor="#6b7a90" secureTextEntry value={confirm} onChangeText={setConfirm} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#052e16" /> : <Text style={styles.buttonText}>Registrarme</Text>}
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0c0f14',
    padding: 24,
    justifyContent: 'center',
  },
  eyebrow: {
    color: '#22c55e',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  title: {
    color: '#f0f4f8',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#8b9cb3',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#141a22',
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderRadius: 12,
    color: '#f0f4f8',
    padding: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#052e16',
    fontWeight: '700',
    fontSize: 16,
  },
  error: {
    color: '#fca5a5',
    marginBottom: 8,
  },
  link: {
    color: '#22c55e',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
  },
})
