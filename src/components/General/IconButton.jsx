import React from 'react';
import { Pressable } from 'react-native';

const IconButton = ({ children, onPress, style }) => {
  return (
    <Pressable
      style={style}
      onPress={onPress}
      android_ripple={{
        color: '#222'
      }}
    >
      {children}
    </Pressable>
  );
};

export default IconButton;
