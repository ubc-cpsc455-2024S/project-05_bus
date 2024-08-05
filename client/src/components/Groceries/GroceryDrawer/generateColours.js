const getRandomMutedColour = () => {
  const mutedColours = [
    '#D1D5DB',
    '#F3F4F6',
    '#E5E7EB',
    '#F0F5F9',
    '#EDE9FE',
    '#FED7D7',
    '#FEEBC8',
    '#A7F3D0',
    '#BFDBFE',
  ];
  return mutedColours[Math.floor(Math.random() * mutedColours.length)];
};

export default getRandomMutedColour;