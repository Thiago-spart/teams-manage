import { TouchableOpacityProps } from "react-native";

export type ButtonTypeStyleProps = "PRIMARY" | "SECONDARY";

export interface StyleButtonProps {
	type: ButtonTypeStyleProps;
}

export interface ButtonProps extends TouchableOpacityProps {
	type?: ButtonTypeStyleProps;
	title: string;
}