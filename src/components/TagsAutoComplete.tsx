import { useAutocomplete, AutocompleteGetTagProps } from '@mui/base/useAutocomplete'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { autocompleteClasses } from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { useEffect } from 'react'
import React from 'react'
import { useRecoilState } from 'recoil'

import { tags } from '@/constants/tags'

import { Tag as TagType } from '@/types/Tag'

import { articleExcludedTagsState } from '@/state/articleQuery/articleExcludedTagsState'
import { articleTagsState } from '@/state/articleQuery/articleTagsState'

const Root = styled('div')(
  () => `
  color: #666666;
  font-size: 14px;
`
)

const Label = styled('label')`
  line-height: 1.5;
  color: #666666;
  font-size: 12px;
`

const InputWrapper = styled('div')(
  () => `
  width: 360px;
  min-height: 20px;
  border: 1.5px solid #666666;
  border-radius: 28px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 4px;

  &:hover {
    border-color: #8843e1;
  }

  &.focused {
    border-color: #8843e1;
  }

  & input {
    color: #666666;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
)

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string
}

/* eslint react/display-name: 0 */
const Tag = React.memo((props: TagProps) => {
  const { label, onDelete, ...other } = props
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  )
})

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #F1EAFA;
  border-radius: 12px;
  color: #6F23D0;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
)

const Listbox = styled('ul')(
  () => `
  width: 380px;
  max-height: 200px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
      color: #666666;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #F1EAFA;
    font-weight: 600;

    & svg {
      color: #6F23D0;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: #F1EAFA;
    cursor: pointer;

    & svg {
      color: #6F23D0;
    }
  }
`
)

interface TagsAutoCompleteProps {
  label: string
}

/* eslint react/display-name: 0 */
export default React.memo(function TagsAutoComplete({ label }: TagsAutoCompleteProps) {
  const [articleTags, setArticleTags] = useRecoilState<TagType[]>(articleTagsState)
  const [articleExcludedTags, setArticleExcludedTags] =
    useRecoilState<TagType[]>(articleExcludedTagsState)
  const currentLabel = (label: string) => {
    switch (label) {
      case 'Tags':
        return articleTags
      case 'Tags to Exclude':
        return articleExcludedTags
      default:
        return
    }
  }
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: currentLabel(label),
    multiple: true,
    options: tags,
    getOptionLabel: (option) => option.id,
  })

  useEffect(() => {
    switch (label) {
      case 'Tags':
        setArticleTags(value)
        break
      case 'Tags to Exclude':
        setArticleExcludedTags(value)
        break
      default:
        break
    }
  }, [value, label, setArticleTags, setArticleExcludedTags])

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>{label}</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option: TagType, index: number) => {
            const tagImage = option.icon_url
            return (
              <div key={option.id}>
                {tagImage ? (
                  <div style={{ position: 'absolute', marginTop: '6px', marginLeft: '14px' }}>
                    <Image src={tagImage} width={16} height={16} alt={option.id} />
                  </div>
                ) : null}
                <StyledTag
                  sx={tagImage ? { paddingLeft: '34px' } : {}}
                  label={option.id}
                  {...getTagProps({ index })}
                />
              </div>
            )
          })}
          <input {...getInputProps()} />
          <div
            style={{
              marginTop: '4px',
              marginLeft: '332px',
              position: 'absolute',
            }}
          >
            <ArrowDropDownIcon fontSize="medium" />
          </div>
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof tags).map((option, index) => {
            const tagImage = option.icon_url
            return (
              <li key={option.id} {...getOptionProps({ option, index })}>
                {tagImage ? (
                  <div style={{ position: 'absolute', marginTop: '2px' }}>
                    <Image src={tagImage} width={16} height={16} alt={option.id} />
                  </div>
                ) : null}
                <span style={tagImage ? { marginLeft: '24px' } : {}}>{option.id}</span>
                <CheckIcon fontSize="small" />
              </li>
            )
          })}
        </Listbox>
      ) : null}
    </Root>
  )
})
