const sharedStyles = 'rounded-md transition transform-gpu ease-out duration-500'
const space = ' '

export const darkHoverStyle = sharedStyles.concat(
  space,
  'hover:bg-primary hover:text-secondary'
)

export const lightHoverStyle = sharedStyles.concat(
  space,
  'hover:bg-secondary hover:text-primary'
)
