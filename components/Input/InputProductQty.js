import React from 'react'
import { InputNumber, Button } from 'antd'
import _ from 'lodash'

const internalOnChange = (onChange) => (e) => {
  const id = e.target.id
  const value = e.target.value
  const absValue = id === 'plus' ? 1 : -1
  console.log(absValue);
  return onChange(Number(value) + absValue)
}

const InputProductQty = ({
  value,
  name,
  style = {},
  max = 10000,
  min = 1,
  defaultValue = 1,
  onChange,
  mainClass = '',
  prefixClass = '',
  suffixClass = '',
  onBlur
}) => {

  return (
    <div style={{ position: 'relative' }}>
      <InputNumber
        className={`cart-list-input-number ${mainClass}`}
        style={style}
        name={name}
        max={max}
        min={min}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

export default InputProductQty
export { InputProductQty, internalOnChange }