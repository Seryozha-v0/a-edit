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
    editting,
    onTime,
    onItem,
    onCancel,
    onSubmit,
}) => {
    return (
        <Box>
            <Collapse in={isShow}>
                <Stack spacing={1} direction="row" justifyContent={"space-around"}>
                    <Stack spacing={1} direction="row" justifyContent={"space-around"}>
                        <Stack spacing={1} direction="column" justifyContent={"center"}>
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
                    <Stack spacing={1} direction="column" justifyContent={"space-around"}>
                        <TimeField
                            {...registerSession('time')}
                            id="time"
                            label="Time"
                            name="time"
                            variant="outlined"
                            format="HH:mm"
                            onChange={(newValue) => onTime(newValue)}
                            value={dayjs(`2022-04-17T${sessionItem?.time || '00:00'}`)}
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
                        />
                        <Stack spacing={1} direction="row" justifyContent={"space-around"}>
                            <Button type="button" onClick={() => onCancel()} variant="outlined">Close</Button>
                            <Button type="button" onClick={() => onSubmit()} variant="contained">
                                {editting ? ('Edit Session') : ('Add Session')}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Collapse>
        </Box>
    )
};

export default SessionForm;