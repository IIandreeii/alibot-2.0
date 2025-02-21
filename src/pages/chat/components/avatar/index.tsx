import React, { useMemo } from 'react';
import styled from 'styled-components';

type AvatarProps = {
  name?: string;
};

const colors = ['#1BA654'];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const isEmoticon = (name: string) => {
  const emojiRegex = /^[\uD83C-\uDBFF\uDC00-\uDFFF]+$/g;
  return emojiRegex.test(name.trim());
};

const removeEmojis = (name: string) => {
  return name.replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g, '').trim();
};

const extractInitials = (name: string) => {
  const cleanedName = removeEmojis(name);
  const words = cleanedName.split(' ').filter(Boolean);
  const initials = words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
  return initials || '?';
};

const AvatarWrapper = styled.div<{ bgColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
`;

const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const bgColor = useMemo(() => getRandomColor(), []);
  
  if (!name) return null;

  const isEmojiOnly = isEmoticon(name);

  const content = isEmojiOnly ? name : extractInitials(name);

  return (
    <AvatarWrapper bgColor={bgColor}>
      {content}
    </AvatarWrapper>
  );
};

export default Avatar;
