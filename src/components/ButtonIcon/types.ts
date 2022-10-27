import { TouchableOpacityProps } from "react-native";

import { MaterialIcons } from "@expo/vector-icons"

export type ButtonIConTypeStyleProps =  "PRIMARY" | "SECONDARY";

export interface StyleButtonProps  {
	type?: ButtonIConTypeStyleProps;
}

export interface ButtonProps extends TouchableOpacityProps {
	type?: ButtonIConTypeStyleProps;
	icon: keyof typeof MaterialIcons.glyphMap;
}
