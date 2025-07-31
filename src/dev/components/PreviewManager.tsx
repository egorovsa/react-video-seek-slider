import { useCallback, useRef } from 'react';
import { timeToTimeString } from '../../utils/timeToTimeString';

export const usePreviewManager = (maxTime: number) => {
  const previewImage = useRef('');

  const updatePreviewImage = (hoverTime: number, maxValue: number): void => {
    const text = timeToTimeString(maxValue, hoverTime);
    const url = `https://via.placeholder.com/140x60?text=${text}`;
    const image = document.createElement('img');
    image.src = url;

    image.onload = () => {
      previewImage.current = url;
    };
  };

  const handleGettingPreview = useCallback(
    (hoverTime: number): string => {
      console.log({ hoverTime, maxTime });
      updatePreviewImage(hoverTime, maxTime);
      return previewImage.current;
    },
    [maxTime]
  );

  return { handleGettingPreview };
}; 