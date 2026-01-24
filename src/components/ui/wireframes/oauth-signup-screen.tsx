import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/src/components/shared/themed-text';
import { ThemedView } from '@/src/components/shared/themed-view';

export function OAuthSignupScreen() {
  return (
    <ThemedView style={styles.container}>
        {/* Logo & Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.logoPlaceholder}>
            <ThemedText style={styles.logoText}>LOGO</ThemedText>
          </View>
          <ThemedText type="title" style={styles.title}>
            들림
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            내 주변의 새로운 장소를 발견하세요
          </ThemedText>
        </View>

        {/* Illustration Area */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            <ThemedText style={styles.illustrationText}>일러스트 영역</ThemedText>
          </View>
        </View>

        {/* OAuth Buttons Section */}
        <View style={styles.buttonSection}>
          {/* Google Sign Up */}
          <TouchableOpacity style={styles.googleButton}>
            <View style={styles.buttonIcon}>
              <ThemedText style={styles.googleIconText}>G</ThemedText>
            </View>
            <ThemedText style={styles.googleButtonText}>Google로 계속하기</ThemedText>
          </TouchableOpacity>

          {/* Apple Sign Up */}
          <TouchableOpacity style={styles.appleButton}>
            <View style={styles.buttonIcon}>
              <ThemedText style={styles.appleIconText}></ThemedText>
            </View>
            <ThemedText style={styles.appleButtonText}>Apple로 계속하기</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Terms & Privacy */}
        <View style={styles.termsSection}>
          <ThemedText style={styles.termsText}>
            계속 진행하면{' '}
            <ThemedText style={styles.termsLink}>이용약관</ThemedText>
            {' '}및{' '}
            <ThemedText style={styles.termsLink}>개인정보 처리방침</ThemedText>
            에 동의하는 것으로 간주됩니다.
          </ThemedText>
        </View>

        {/* Already have account */}
        <View style={styles.loginSection}>
          <ThemedText style={styles.loginText}>이미 계정이 있으신가요? </ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.loginLink}>로그인</ThemedText>
          </TouchableOpacity>
        </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  welcomeSection: {
    alignItems: 'center',
    paddingTop: 40,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  illustration: {
    width: '100%',
    height: 200,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationText: {
    color: '#999',
  },
  buttonSection: {
    gap: 12,
    marginBottom: 24,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },
  appleIconText: {
    fontSize: 20,
    color: '#fff',
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  termsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    fontSize: 12,
    color: '#0a7ea4',
    textDecorationLine: 'underline',
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  loginText: {
    color: '#666',
  },
  loginLink: {
    color: '#0a7ea4',
    fontWeight: '600',
  },
});
