import React, { useState } from 'react';
import { Grid, Typography, Switch, Button, TextField, IconButton, Link } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LinkIcon from '@mui/icons-material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
const AppContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  overflow: 'auto',
  backgroundColor: theme.palette.background.default,
}));
const ControlPanel = styled(Grid)(({ theme }) => ({
  borderRight: `2px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  width: '30%',
  height: '100vh', // Fill the height of the parent
  overflowY: 'auto',
  overflowX: 'hidden', // This ensures that any content that overflows is hidden
}));
const MobileDevice = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
  backgroundColor: theme.palette.grey[300],
  borderRadius: theme.spacing(2),
}));
const MobileScreen = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '3rem',
  padding: '2rem',
  height: 'fit-content',
  maxWidth: '375px',
  width: '100%',
  boxShadow: theme.shadows[24],
  overflowX: 'hidden', // This hides horizontal scrollbar
  overflowY: 'auto',
}));
const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
  overflow: 'hidden', // Prevents the form container from causing overflow
  '& .MuiTextField-root': {
    marginBottom: '1rem',
  },
}));
const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: '2rem',
}));
const LinkContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  padding: '1rem',
  marginBottom: '1rem',
  borderRadius: '1rem',
  width: '90%', // TControlPanel his ensures that all LinkContainer instances have the same width
}));
const App = () => {
  const [header, setHeader] = useState('');
  const [links, setLinks] = useState([]);
  const handleAddLink = () => {
    setLinks([...links, { title: '', url: '', active: false }]);
  };
  const handleLinkChange = (event, index) => {
    const newLinks = [...links];
    newLinks[index][event.target.name] = event.target.value;
    setLinks(newLinks);
  };
  const handleDeleteLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };
  const handleToggleActive = (index) => {
    const newLinks = [...links];
    newLinks[index].active = !newLinks[index].active;
    setLinks(newLinks);
  };
  return (
    <AppContainer>
      <ControlPanel container direction="column" justifyContent="flex-start" alignItems="stretch">
        <AddButton startIcon={<AddCircleIcon />} onClick={handleAddLink}>Add Link</AddButton>
        <FormContainer>
          <TextField fullWidth label="Header" value={header} onChange={e => setHeader(e.target.value)} />
        </FormContainer>
        {links.map((link, index) => (
          <FormContainer key={index}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box m={1}>
                  <TextField fullWidth label="Title" name="title" value={link.title} onChange={(event) => handleLinkChange(event, index)} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box m={1}>
                  <TextField fullWidth label="URL" name="url" value={link.url} onChange={(event) => handleLinkChange(event, index)} />
                </Box>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>Inactive</Grid>
              <Grid item>
                <Switch checked={link.active} onChange={() => handleToggleActive(index)} />
              </Grid>
              <Grid item>Active</Grid>
              <Grid item>
                <IconButton onClick={() => handleDeleteLink(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Grid>
            </Grid>
          </FormContainer>
        ))}
      </ControlPanel>
      <MobileDevice>
        <MobileScreen>
          <Typography variant="h4" gutterBottom>{header}</Typography>
          {links.filter(link => link.active).map((link, index) => (
            <Link href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: '100%' }}>
              <LinkContainer key={index}>
                <Typography variant="h6" gutterBottom>{link.title}</Typography>
                <Typography variant="body1">
                  <LinkIcon sx={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                  {link.url}
                </Typography>
              </LinkContainer>
            </Link>
          ))}
        </MobileScreen>
      </MobileDevice>
    </AppContainer>
  );
};
export default App;