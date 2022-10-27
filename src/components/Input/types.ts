import React from "react";
import { TextInput, TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
	inputRef?: React.RefObject<TextInput>;
}