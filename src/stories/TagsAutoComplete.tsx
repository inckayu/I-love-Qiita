import { useAutocomplete, AutocompleteGetTagProps } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { Tag } from '@/types/Tag';


import { inputExcludedTagsState } from '@/state/inputExcludedTagsState';
import { inputTagsState } from '@/state/inputTagsState';


const Root = styled('div')(
  () => `
  color: #949494;
  font-size: 14px;
`,
);

const Label = styled('label')`
  line-height: 1.5;
  color: #666666;
  font-size: 12px;
`;

const InputWrapper = styled('div')(
  () => `
  width: 360px;
  min-height: 20px;
  border: 1.5px solid #949494;
  border-radius: 28px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;

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
`,
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  )
}

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
`,
);

const Listbox = styled('ul')(
  () => `
  width: 300px;
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
      color: #1a1a1a;
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
`,
);

interface TagsAutoCompleteProps {
  label: string;
}

export default function TagsAutoComplete({label}: TagsAutoCompleteProps) {
  const [inputTags, setInputTags] = useRecoilState<Tag[]>(inputTagsState)
  const [inputExcludedTags, setInputExcludedTags] = useRecoilState<Tag[]>(inputExcludedTagsState)
  const currentLabel = (label: string) => {
    switch (label) {
      case 'Tags':
        return inputTags
      case 'Tags to Exclude':
        return inputExcludedTags
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
        setInputTags(value)
        break
      case 'Tags to Exclude':
        setInputExcludedTags(value)
        break
      default:
        break
    }
  }, [value])


  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>{label}</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option: Tag, index: number) => (
            <StyledTag key={option.id} label={option.id} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof tags).map((option, index) => (
            <li key={option.id} {...getOptionProps({ option, index })}>
              <span>{option.id}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}

const tags = [
  {
    followers_count: 1,
    icon_url: "",
    id: "tag1",
    items_count: 1,
  },
  {
    followers_count: 2,
    icon_url: "",
    id: "tag2",
    items_count: 2,
  },
  {
    followers_count: 3,
    icon_url: "",
    id: "tag3",
    items_count: 3,
  },
  {
    followers_count: 4,
    icon_url: "",
    id: "tag4",
    items_count: 4,
  },
  {
    followers_count: 5,
    icon_url: "",
    id: "tag5",
    items_count: 5,
  },
  {
    followers_count: 6,
    icon_url: "",
    id: "tag6",
    items_count: 6,
  },
  {
    followers_count: 7,
    icon_url: "",
    id: "tag7",
    items_count: 7,
  },
  {
    followers_count: 8,
    icon_url: "",
    id: "tag8",
    items_count: 8,
  },
  {
    followers_count: 9,
    icon_url: "",
    id: "tag9",
    items_count: 9,
  },
  {
    followers_count: 10,
    icon_url: "",
    id: "tag10",
    items_count: 10,
  }
]