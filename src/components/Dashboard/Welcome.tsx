import * as React from 'react';
import { Box, Card, CardActions, Button, Typography, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import { useTranslate } from 'react-admin';

import publishArticleImage from './welcome_illustration.svg';

const Welcome = () => {
    const translate = useTranslate();

    return (
        <Card
            sx={{
                background: theme =>
                    theme.palette.mode === 'dark'
                        ? '#404040'
                        : `#94B8D7`,

                color: theme => theme.palette.mode === 'dark'
                    ? '#fff'
                    : 'black'
                ,
                padding: '20px',
                marginTop: 2,
                marginBottom: '1em',
            }}
        >
            <Box display="flex">
                <Stack justifyContent={'space-between'}>
                    <Box>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Welcome to admin site
                        </Typography>
                        <Box maxWidth="40em">
                            <Typography variant="body1" component="p" gutterBottom>
                                This is dashboard where you can get overall site status
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <CardActions
                            sx={{
                                padding: { xs: 0, xl: null },
                                flexWrap: { xs: 'wrap', xl: null },
                                gap: 2
                            }}
                        >
                            <Button
                                variant="contained"
                                href={process.env.NEXT_PUBLIC_WEBSITE}
                                startIcon={<HomeIcon />}
                            >
                                Furniture website
                            </Button>
                            <Button
                                variant="contained"
                                href={process.env.NEXT_PUBLIC_BASE_URL}
                                startIcon={<CodeIcon />}
                            >
                                Furniture Admin site
                            </Button>
                        </CardActions>
                    </Box>
                </Stack>
                <Box
                    display={{ xs: 'none', sm: 'none', md: 'block' }}
                    sx={{
                        background: `url(${publishArticleImage}) top right / cover`,
                        marginLeft: 'auto',
                    }}
                    width="16em"
                    height="9em"
                    overflow="hidden"
                />
            </Box>
        </Card>
    );
};

export default Welcome;
