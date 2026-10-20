import React, { useMemo } from 'react';
import Svg, { Rect } from 'react-native-svg';
import { ScrollView, Text, View } from 'react-native';
import JsBarcode from 'jsbarcode';
export function Barcode({ value }: { value: string }) {
  const data = useMemo(() => {
    const target: { encodings?: { data: string }[] } = {};
    JsBarcode(target, value, {
      format: 'CODE128',
      displayValue: false,
      margin: 0,
    });
    return target.encodings!.map(part => part.data).join('');
  }, [value]);
  return (
    <View
      style={{ backgroundColor: '#fff', padding: 16, borderRadius: 4, gap: 12 }}
    >
      <ScrollView
        horizontal
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <Svg
          accessibilityLabel={`Coupon barcode ${value}`}
          width={Math.max(240, data.length * 2 + 24)}
          height={96}
          viewBox={`0 0 ${data.length + 24} 96`}
        >
          <Rect width={data.length + 24} height={96} fill="#fff" />
          {data
            .split('')
            .map((bit, index) =>
              bit === '1' ? (
                <Rect
                  key={index}
                  x={index + 12}
                  y={4}
                  width={1}
                  height={88}
                  fill="#000"
                />
              ) : null,
            )}
        </Svg>
      </ScrollView>
      <Text
        selectable
        style={{ color: '#111', textAlign: 'center', letterSpacing: 2 }}
      >
        {value}
      </Text>
    </View>
  );
}
