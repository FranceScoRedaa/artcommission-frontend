import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Typography, Chip, Box, Button, Divider } from '@mui/material';
import { Commission, CommissionStatus } from '../types';

interface CommissionCardProps {
  commission: Commission;
  isClient?: boolean;
}

// Helper function to get status color
const getStatusColor = (status: CommissionStatus) => {
  switch (status) {
    case CommissionStatus.REQUESTED:
      return 'default';
    case CommissionStatus.QUOTED:
      return 'info';
    case CommissionStatus.ACCEPTED:
      return 'secondary';
    case CommissionStatus.IN_PROGRESS:
      return 'warning';
    case CommissionStatus.DRAFT_SUBMITTED:
      return 'info';
    case CommissionStatus.REVISION_REQUESTED:
      return 'warning';
    case CommissionStatus.COMPLETED:
      return 'success';
    case CommissionStatus.CANCELLED:
      return 'error';
    default:
      return 'default';
  }
};

// Helper to format status text
const formatStatus = (status: CommissionStatus) => {
  return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

const CommissionCard: React.FC<CommissionCardProps> = ({ commission, isClient = false }) => {
  const formattedDate = new Date(commission.createdAt).toLocaleDateString();
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" component="div">
            {commission.title}
          </Typography>
          <Chip 
            label={formatStatus(commission.status)} 
            color={getStatusColor(commission.status) as any}
            size="small"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {isClient ? `Artist: ${commission.artistName}` : `Client: ${commission.clientName}`}
        </Typography>
        
        <Divider sx={{ my: 1 }} />
        
        <Typography variant="body2" sx={{ mb: 2 }}>
          {commission.description.substring(0, 150)}
          {commission.description.length > 150 ? '...' : ''}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            {commission.price ? `Price: $${commission.price}` : 'Price: Not quoted yet'} | Created: {formattedDate}
          </Typography>
          
          <Button 
            component={RouterLink} 
            to={`/commissions/${commission.id}`} 
            size="small" 
            variant="outlined"
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CommissionCard;