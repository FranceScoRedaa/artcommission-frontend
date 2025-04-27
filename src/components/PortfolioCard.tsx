import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { Portfolio, ArtCategory } from '../types';

interface PortfolioCardProps {
  portfolio: Portfolio;
  onClick?: () => void;
}

// Helper to convert enum to readable text
const formatCategory = (category: ArtCategory) => {
  return category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio, onClick }) => {
  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={portfolio.imageUrl || 'https://via.placeholder.com/200'}
        alt={portfolio.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {portfolio.title}
        </Typography>
        
        <Box sx={{ mb: 1 }}>
          <Chip 
            label={formatCategory(portfolio.category)} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          {portfolio.description ? 
            portfolio.description.substring(0, 100) + (portfolio.description.length > 100 ? '...' : '') : 
            'No description available'}
        </Typography>
        
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          By {portfolio.artistName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;