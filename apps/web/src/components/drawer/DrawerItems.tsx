import React from 'react';
import { Box, List, Typography, Divider } from '@mui/material';
import DrawerItem from './DrawerItem';
import { DrawerItemsProps } from './types';
import { usePathname } from '@/hooks/usePathname';

const DrawerItems: React.FC<DrawerItemsProps> = ({ sections, isCollapsed = false }) => {
    const pathname = usePathname();

    return (
        <Box sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
            {sections.map((section, sectionIndex) => (
                <React.Fragment key={`section-${sectionIndex}`}>
                    {section.title && !isCollapsed && (
                        <Typography
                            variant="overline"
                            color="textSecondary"
                            sx={{
                                pl: 3,
                                pr: 2,
                                my: 1,
                                display: 'block',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                            }}
                        >
                            {section.title}
                        </Typography>
                    )}

                    <List
                        disablePadding
                        sx={{
                            px: 2,
                            ...(section.title && isCollapsed && { mt: 1 }),
                        }}
                    >
                        {section.items.map((item, itemIndex) => (
                            <React.Fragment key={`item-${sectionIndex}-${itemIndex}`}>
                                <DrawerItem
                                    icon={item.icon}
                                    text={item.text}
                                    route={item.route}
                                    isCollapsed={isCollapsed}
                                    selected={pathname === item.route}
                                />
                                {item.divider && <Divider sx={{ my: 1 }} />}
                            </React.Fragment>
                        ))}
                    </List>

                    {sectionIndex < sections.length - 1 && <Box sx={{ height: isCollapsed ? 16 : 24 }} />}
                </React.Fragment>
            ))}
        </Box>
    );
};

export default DrawerItems;
