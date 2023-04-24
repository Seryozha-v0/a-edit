import { Box, Button, Collapse, InputAdornment, Stack, TextField } from "@mui/material";
import { TimeClock, TimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

const SessionForm = ({
    isShow,
    viewClock,
    setViewClock,
    sessionItem,
    registerSession,
    errorsSession,
    editting,
    onTime,
    onItem,
    onCancel,
    onSubmit,
}) => {
    return (
        <Box>
            <Collapse in={isShow}>
                <Stack direction="row" justifyContent={"space-around"}>
                    <Stack direction="column" justifyContent={"space-around"}>
                        <Stack spacing={1} direction="row" justifyContent={"center"}>
                            <Button type="button" onClick={() => setViewClock('hours')}>hours</Button>
                            <Button type="button" onClick={() => setViewClock('minutes')}>minutes</Button>
                        </Stack>
                        <TimeClock
                            value={dayjs(`2022-04-17T${sessionItem?.time || '00:00'}`)}
                            onChange={(newValue) => onTime(newValue)}
                            view={viewClock}
                            ampm={false}
                        />
                    </Stack>
                    <Stack spacing={2} direction="column" justifyContent={"center"}>
                        <TimeField
                            {...registerSession('time')}
                            id="time"
                            label="Time"
                            name="time"
                            variant="outlined"
                            format="HH:mm"
                            onChange={(newValue) => onTime(newValue)}
                            value={sessionItem.time ? dayjs(`2022-04-17T${sessionItem.time}`) : ''}
                            error={!!errorsSession.time}
                            helperText={errorsSession?.time?.message}
                        />
                        <TextField
                            {...registerSession('price')}
                            id="price"
                            label="Price"
                            name="price"
                            variant="outlined"
                            onChange={(newValue) => onItem(newValue)}
                            value={sessionItem?.price || ''}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₽</InputAdornment>,
                            }}
                            error={!!errorsSession.price}
                            helperText={errorsSession?.price?.message}
                        />
                        <Stack direction="row" justifyContent={"space-around"}>
                            <Button type="button" onClick={() => onCancel()} variant="outlined">Close</Button>
                            <Button type="button" onClick={() => onSubmit()} variant="contained">
                                {editting ? ('Edit') : ('Add')}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Collapse>
        </Box>
    )
};

export default SessionForm;