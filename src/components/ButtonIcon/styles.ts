import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { MaterialIcons } from "@expo/vector-icons"
import { StyleButtonProps } from "./types";

export const Container = styled(TouchableOpacity)`
	width: 56px;
	height: 56px;

	justify-content: center;
	align-items: center;

	margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<StyleButtonProps>(({ theme, type }) => ({
	size: 24,
	color: type === "PRIMARY" 
		? theme.COLORS.GREEN_700
		: theme.COLORS.RED_DARK,
}))``;
