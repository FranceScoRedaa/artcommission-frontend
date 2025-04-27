import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Rating, Box, Chip } from '@mui/material';
import { ArtistProfile } from '../types';

interface ArtistCardProps {
  artist: ArtistProfile;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  // Handling for empty specialties
  const specialtiesList = artist.specialties 
    ? artist.specialties.split(',').filter(s => s.trim().length > 0)
    : [];

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={artist.profileImageUrl || 'https://via.placeholder.com/200'}
        alt={`${artist.firstName} ${artist.lastName}`}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {artist.firstName} {artist.lastName}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={artist.averageRating} readOnly precision={0.5} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            ({artist.completedCommissions} commissions)
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {artist.bio ? artist.bio.substring(0, 100) + (artist.bio.length > 100 ? '...' : '') : 'No bio available'}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          {specialtiesList.map((specialty, index) => (
            <Chip 
              key={index} 
              label={specialty.trim()} 
              size="small" 
              sx={{ mr: 0.5, mb: 0.5 }} 
            />
          ))}
        </Box>
        
        <Button 
          component={RouterLink} 
          to={`/artists/${artist.id}`} 
          variant="contained" 
          fullWidth
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;