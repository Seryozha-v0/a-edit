import { Check, Save } from "@mui/icons-material";
import { Box, Button, CircularProgress, Fab, Stack } from "@mui/material";
import { green } from "@mui/material/colors";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";

const EdittingDates = ({
    Params,
    dates,
    safeSuccess,
    safeLoading,
    isSafeNew,
    handleItemDate,
    handleListItemAdd,
    handleListItemEdit,
}) => {
    const { dateStart, dateEnd } = dates;
    const safeBtnSx = {
        ...(safeSuccess && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    }

    return (

        <Box>
            <Stack spacing={2} direction='row' sx={{ display: 'flex', alignItems: 'center' }}>
                <DatePicker
                    label="Start date"
                    value={dateStart}
                    onChange={(newValue) => handleItemDate(newValue, 'dateStart')}
                />

                <DatePicker
                    label="End date"
                    value={dateEnd}
                    onChange={(newValue) => handleItemDate(newValue, 'dateEnd')}
                />

                <Box sx={{ position: 'relative' }}>
                    {'id' in Params ? (
                        <>
                            <Button
                                sx={safeBtnSx}
                                onClick={() => handleListItemEdit(Params.id)}
                                disabled={safeLoading || !isSafeNew}
                                variant="contained"
                            >
                                Safe cards
                            </Button>
                            {safeLoading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[300],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={() => handleListItemEdit()}
                                sx={safeBtnSx}
                                disabled={safeLoading || !isSafeNew}
                                variant="contained"
                            >
                                Safe new cards
                            </Button>
                            {safeLoading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[300],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </>
                    )}
                </Box>
            </Stack>
        </Box>
    )
};

export default EdittingDates;