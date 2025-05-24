import { Redirect } from 'expo-router';
import { useAuth } from './context/auth';

export default function Index() {
  const { isAuthenticated } = useAuth();
  return <Redirect href={isAuthenticated ? "/(tabs)" : "/login"} />;
} 