import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';
import React from 'react';

interface Props {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
}

const MenuIconButton = ({ onPress, icon }: Props) => {
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={icon} size={24} color={primaryColor} />
    </TouchableOpacity>
  );
};
export default MenuIconButton;
