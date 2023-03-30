import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Collapse, FormControl, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { TransitionGroup } from "react-transition-group";
import SessionForm from "../sessions/SessionForm";

const CardsForm = ({
    isEdit,
    register,
    listItem,
    sessions,
    sessionEditting,
    sesseionShow,
    viewClock,
    setViewClock,
    sessionItem,
    registerSession,
    handleAddSessionItemTime,
    handleAddSessionItem,
    handleAddSessionCancel,
    onEditSession,
    onAddSession,
    handleSessionShow,
    handleListItem,
    handleAddSessionDelete,
    handleAddSessionEditting,
    onSubmit,
}) => {
    const renderSessionItem = (item, index) => {
        return (
            <ListItem
                secondaryAction={
                    <IconButton
                        edge='end'
                        aria-label="delete"
                        title="Delete"
                        onClick={() => handleAddSessionDelete(index)}
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                }
            >
                <ListItemText>
                    Start session: {item.time}. Session is {item.price} RUB
                </ListItemText>
                <IconButton
                    edge='end'
                    aria-label="edit"
                    title="edit"
                    onClick={() => handleAddSessionEditting(index)}
                >
                    <Edit fontSize="small" />
                </IconButton>
            </ListItem>
        )
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 2, width: '80ch', display: 'flex' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <TextField
                {...register('firstName')}
                id="firstName"
                label="First name"
                variant="standard"
                onChange={(newValue) => handleListItem(newValue)}
                value={listItem?.firstName}
                InputLabelProps={{ shrink: Boolean(listItem?.firstName) }}
            />
            <TextField
                {...register('lastName')}
                id="lastName"
                label="Last name"
                variant="standard"
                onChange={(newValue) => handleListItem(newValue)}
                value={listItem?.lastName}
                InputLabelProps={{ shrink: Boolean(listItem?.lastName) }}
            />

            <FormControl fullWidth>
                <InputLabel id="format-label">Format</InputLabel>
                <Select
                    {...register("format")}
                    labelId="format-label"
                    id="format"
                    value={listItem?.format || ''}
                    label="Format"
                    onChange={(newValue) => handleListItem(newValue)}
                >
                    <MenuItem value={'2D'}>2D</MenuItem>
                    <MenuItem value={'3D'}>3D</MenuItem>
                </Select>
            </FormControl>

            <input {...register('sessions')} value={sessions} style={{ display: 'none' }} />
            <Box>
                <List sx={{ width: '100%' }}>
                    <TransitionGroup>
                        {!Boolean(sessions.length) ? (
                            <Collapse>
                                <ListItem alignItems="center">
                                    <Typography variant="body2">You havn't any sessions!</Typography>
                                    <Button type="button" onClick={() => handleSessionShow()}>Add session</Button>
                                </ListItem>
                            </Collapse>
                        ) : (<Button type="button" onClick={() => handleSessionShow()}>Add session</Button>)}
                        {sessions.map((item, i) => (
                            <Collapse key={i}>
                                {renderSessionItem(item, i)}
                            </Collapse>
                        ))}
                    </TransitionGroup>
                </List>
            </Box>

            {sessionEditting >= 0 ? (
                <SessionForm
                    isShow={sesseionShow}
                    viewClock={viewClock}
                    setViewClock={setViewClock}
                    sessionItem={sessionItem}
                    registerSession={registerSession}
                    editting={true}
                    onTime={handleAddSessionItemTime}
                    onItem={handleAddSessionItem}
                    onCancel={handleAddSessionCancel}
                    onSubmit={onEditSession}
                />
            ) : (
                <SessionForm
                    isShow={sesseionShow}
                    viewClock={viewClock}
                    setViewClock={setViewClock}
                    sessionItem={sessionItem}
                    registerSession={registerSession}
                    onTime={handleAddSessionItemTime}
                    onItem={handleAddSessionItem}
                    onCancel={handleAddSessionCancel}
                    onSubmit={onAddSession}
                />
            )}

            <Button type="submit" variant="contained">
                {isEdit ? ('Edit Card') : ('Add Card')}
            </Button>
        </Box>
    )
};

export default CardsForm;