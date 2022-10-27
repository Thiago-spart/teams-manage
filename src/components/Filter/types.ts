import { TouchableOpacityProps } from "react-native";

export interface FilterProps extends TouchableOpacityProps {
	isActive?: boolean;
	title: string
}

export type StyleFilterProps = Omit<FilterProps, "title">