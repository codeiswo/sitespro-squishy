export function getThemeArchetype(theme) {
  switch (theme) {
    case 'nordic':
    case 'organic':
    case 'editorial':
      return 'minimalist';
    case 'cyberpunk':
    case 'futuristic':
    case 'bold':
      return 'futuristic';
    case 'luxury':
      return 'luxury';
    case 'classic':
      return 'classic';
    case 'gummy':
    case 'squishy':
    default:
      return 'gummy';
  }
}
