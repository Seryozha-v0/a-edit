import { Delete, Edit } from "@mui/icons-material";
import { Autocomplete, Box, Button, Checkbox, Collapse, FormControl, FormControlLabel, IconButton, ImageList, ImageListItem, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import { TransitionGroup } from "react-transition-group";
import SessionForm from "../sessions/SessionForm";

const CardsForm = ({
    isEdit,
    register,
    errors,
    listItem,
    sessions,
    sessionEditting,
    sesseionShow,
    viewClock,
    setViewClock,
    sessionItem,
    registerSession,
    errorsSession,
    handleMovieDuration,
    handleMovieChacked,
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
                {...register('movieImageUrl')}
                id="movieImageUrl"
                label="Movie image"
                variant="standard"
                onChange={(newValue) => handleListItem(newValue)}
                value={listItem?.movieImageUrl}
                InputLabelProps={{ shrink: !!listItem?.movieImageUrl }}
                error={!!errors.movieImageUrl}
                helperText={errors?.movieImageUrl?.message}
            />

            <Box>
                <List sx={{ width: '100%' }}>
                    <TransitionGroup>
                        {!!listItem.movieImageUrl && (
                            <Collapse>
                                <ImageList>
                                    <ImageListItem>
                                        <img src={listItem.movieImageUrl} width="150px" loading="lazy" />
                                    </ImageListItem>
                                </ImageList>
                            </Collapse>
                        )}
                    </TransitionGroup>
                </List>
            </Box>

            <TextField
                {...register('movieName')}
                id="movieName"
                label="Movie name"
                variant="standard"
                onChange={(newValue) => handleListItem(newValue)}
                value={listItem?.movieName}
                InputLabelProps={{ shrink: !!listItem?.movieName }}
                error={!!errors.movieName}
                helperText={errors?.movieName?.message}
            />
            <Stack spacing={2} direction='row'>
                <Autocomplete
                    {...register('movieRate')}
                    autoHighlight
                    disableClearable
                    id="movieRate"
                    options={['6+', '12+', '16+', '18+']}
                    value={listItem?.movieRate || null}
                    onChange={(e, newValue) => handleListItem(newValue, e)}
                    sx={{ width: 150 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Rate'
                            error={!!errors.movieRate}
                            helperText={errors?.movieRate?.message}
                        />
                    )}
                />

                <Autocomplete
                    {...register('movieFormat')}
                    autoHighlight
                    disableClearable
                    id="movieFormat"
                    options={['2D', '3D']}
                    value={listItem?.movieFormat || null}
                    onChange={(e, newValue) => handleListItem(newValue, e)}
                    sx={{ width: 150 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Format'
                            error={!!errors.movieFormat}
                            helperText={errors?.movieFormat?.message}
                        />
                    )}
                />

                <TimeField
                    {...register('duration')}
                    id="duration"
                    label="duration"
                    name="duration"
                    variant="outlined"
                    format="HH:mm"
                    onChange={(newValue) => handleMovieDuration(newValue)}
                    value={listItem.duration ? dayjs(`2022-04-17T${listItem.duration}`) : null}
                    sx={{ width: 150 }}
                    // color='error'
                    error={!!errorsSession.duration}
                    helperText={errorsSession?.duration?.message}
                />
                {console.log(listItem)}
                <FormControlLabel control={<Checkbox {...register('pushkin')} id='pushkin' checked={listItem.pushkin || null} onChange={(e) => handleMovieChacked(e)} />} label="Пушкинская карта" />
            </Stack>

            <Autocomplete
                multiple
                limitTags={2}
                id='movieGenres'
                options={['Фантастика', 'sometging', 'another something']}
                sx={{ width: '100%' }}
                value={listItem?.movieGenres || []}
                onChange={(e, newValue) => handleListItem(newValue, false, 'movieGenres')}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label='Genres'
                        error={!!errors.movieGenres}
                        helperText={errors?.movieGenres?.message}
                    />
                )}
            />

            <input {...register('sessions')} value={sessions} style={{ display: 'none' }} />

            <Box>
                <List sx={{ width: '100%' }}>
                    <TransitionGroup>
                        {!Boolean(sessions.length) ? (
                            <Collapse>
                                <ListItem alignItems="center" error={!!errors.sessions}>
                                    <Typography variant="body2">You don't have any sessions!</Typography>
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
                    errorsSession={errorsSession}
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
                    errorsSession={errorsSession}
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