export const theme = {
  colors: {
    primary: '#6C63FF',
    secondary: '#2D3748',
    background: '#1A202C',
    surface: '#2D3748',
    text: '#FFFFFF',
    textSecondary: '#A0AEC0',
    success: '#48BB78',
    danger: '#F56565',
    warning: '#ECC94B'
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.2)'
  },
  transitions: {
    default: 'all 0.3s ease'
  },
  borderRadius: {
    default: '8px',
    lg: '12px'
  }
};

export type Theme = typeof theme;
