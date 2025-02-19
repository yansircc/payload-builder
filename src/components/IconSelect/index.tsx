'use client'

import { FieldLabel as Label, Popup, TextInput, useField } from '@payloadcms/ui'
import { icons as Icons } from 'lucide-react'
import { TextFieldClientProps } from 'payload'
import React, { useState } from 'react'
import { DynamicIcon } from '../DynamicIcon'
import './styles.css'

type Props = TextFieldClientProps

const createIconOptions = () => {
  const iconNames = Object.keys(Icons) as Array<keyof typeof Icons>

  return iconNames.map((iconName) => ({
    label: iconName.replace(/([A-Z])/g, ' $1').trim(),
    value: iconName,
  }))
}

const icons = createIconOptions()

const SelectIcons: React.FC<Props> = (props) => {
  const { field, path } = props
  const label = field.label
  const { value, setValue } = useField<string>({ path: path })
  const [searchValue, setSearchValue] = useState('')

  const filteredIcons = icons.filter((icon) =>
    icon.label.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const handleSelect = (iconName: string) => {
    setValue(iconName)
  }

  const labelToUse = label ? label : 'Icon'

  return (
    <div className="field-type">
      <Label htmlFor={`field-${path?.replace(/\./gi, '__')}`} label={labelToUse} />
      <Popup
        button={
          <TextInput
            label=""
            path={path}
            onChange={(e: { target: { value: string } }) => setValue(e.target.value)}
            value={value}
          ></TextInput>
        }
        horizontalAlign="left"
        render={({ close }) => (
          <div className="icon-select-popup">
            <div className="search-wrapper">
              <input
                type="text"
                className="search-input"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search icons..."
                value={searchValue}
                autoFocus
              />
            </div>
            <div className="icon-grid">
              {filteredIcons.map(({ value: iconName }) => (
                <div
                  key={iconName}
                  className="icon-wrapper"
                  onClick={() => {
                    handleSelect(iconName)
                    close()
                    setSearchValue('')
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelect(iconName)
                      close()
                      setSearchValue('')
                    }
                  }}
                >
                  <div className="icon-button">
                    <DynamicIcon name={iconName} />
                  </div>
                </div>
              ))}
              {filteredIcons.length === 0 && (
                <div className="no-results">No icons found for &ldquo;{searchValue}&rdquo;</div>
              )}
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default SelectIcons
