import theme from '@theme/index';
import { StatusBar } from "react-native";
import { ThemeProvider } from 'styled-components/native';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto"
import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@services/queryClient';

export default function App() {
  const [ fontsLoaded ] = useFonts({ Roboto_400Regular, Roboto_700Bold});

  return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<StatusBar 
					barStyle="light-content"
					backgroundColor="transparent"
					translucent
				/>
				{fontsLoaded ? <Routes /> : <Loading />}
			</ThemeProvider>
		</QueryClientProvider>
  );
}
