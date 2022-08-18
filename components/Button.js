import {Pressable, Text, TouchableOpacity} from 'react-native';

export default function Button({children, bg, style, ...rest}) {
  return (
    <Pressable
      style={{
        backgroundColor: bg ?? '#000',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        ...style
      }}
      {...rest}
    >
      <Text style={{color: '#fff'}}>{children}</Text>
    </Pressable>
  );
}
