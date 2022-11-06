import * as S from "./styles"

import logoImg from "@assets/logo.png"
import { HeaderProps } from "./types"
import { useNavigation } from "@react-navigation/native"
import { FadeIn, FadeOut, Layout } from "react-native-reanimated"

export const Header: React.FC<HeaderProps> = ({ showBackButton = false }) => {
	const navigation = useNavigation()
	
	const handleGoBack = () => {
		navigation.navigate("groups")
	}
	
	return (
		<S.Container
			entering={FadeIn}
			exiting={FadeOut}
			layout={Layout.springify()}
		>
			{showBackButton && (
				<S.BackButton onPress={handleGoBack}>
					<S.BackIcon />
				</S.BackButton>
			)}
			
			<S.Logo source={logoImg} />
		</S.Container>
	)
}