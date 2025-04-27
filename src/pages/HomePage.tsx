import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Box, 
  Paper, 
  Divider, 
  CircularProgress 
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchTopArtists } from '../redux/slices/artistSlice';
import ArtistCard from '../components/ArtistCard';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { topArtists, loading } = useSelector((state: RootState) => state.artists);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchTopArtists());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 6, 
          my: 4, 
          textAlign: 'center',
          backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: 2
        }}
      >
        <Typography variant="h3" gutterBottom>
          Commission Your Dream Artwork
        </Typography>
        <Typography variant="h5" color="textSecondary" sx={{ mb: 4 }}>
          Connect with talented artists and bring your vision to life
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            component={RouterLink} 
            to="/artists" 
            variant="contained" 
            size="large"
          >
            Explore Artists
          </Button>
          {!isAuthenticated && (
            <Button 
              component={RouterLink} 
              to="/signup" 
              variant="outlined" 
              size="large"
            >
              Join Now
            </Button>
          )}
        </Box>
      </Paper>

      {/* Featured Artists Section */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom>
          Featured Artists
        </Typography>
        <Divider sx={{ mb: 4 }} />
        
        {loading ? (
          <Box sx={{ width: '100%', textAlign: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        ) : topArtists && topArtists.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
            {topArtists.slice(0, 4).map((artist) => (
              <Box key={artist.id} sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 2 }}>
                <ArtistCard artist={artist} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ width: '100%', p: 2 }}>
            <Typography>No featured artists available at the moment.</Typography>
          </Box>
        )}
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            component={RouterLink} 
            to="/artists" 
            variant="outlined"
          >
            View All Artists
          </Button>
        </Box>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom>
          How It Works
        </Typography>
        <Divider sx={{ mb: 4 }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
          <Box sx={{ width: { xs: '100%', md: '33.33%' }, p: 2 }}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom color="primary">
                1. Find Your Artist
              </Typography>
              <Typography>
                Browse our diverse collection of talented artists and find the perfect match for your style and vision.
              </Typography>
            </Paper>
          </Box>
          
          <Box sx={{ width: { xs: '100%', md: '33.33%' }, p: 2 }}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom color="primary">
                2. Request Your Commission
              </Typography>
              <Typography>
                Submit your commission request with details, references, and requirements to help the artist understand your vision.
              </Typography>
            </Paper>
          </Box>
          
          <Box sx={{ width: { xs: '100%', md: '33.33%' }, p: 2 }}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom color="primary">
                3. Receive Your Artwork
              </Typography>
              <Typography>
                Collaborate with your artist through the creation process, provide feedback, and receive your finished masterpiece.
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* CTA Section */}
      <Paper 
        sx={{ 
          p: 6, 
          my: 8, 
          textAlign: 'center',
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: 2
        }}
      >
        <Typography variant="h4" gutterBottom>
          Ready to Bring Your Ideas to Life?
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Join our community of artists and clients to start creating together.
        </Typography>
        <Button 
          component={RouterLink} 
          to={isAuthenticated ? "/artists" : "/signup"} 
          variant="contained" 
          color="secondary" 
          size="large"
        >
          {isAuthenticated ? "Find an Artist" : "Get Started"}
        </Button>
      </Paper>
    </Container>
  );
};

export default HomePage;