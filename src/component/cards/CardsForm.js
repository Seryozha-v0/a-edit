import { Delete, Edit } from "@mui/icons-material";
import { Autocomplete, Box, Button, Checkbox, CircularProgress, Collapse, FormControl, FormControlLabel, IconButton, ImageList, ImageListItem, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { TimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import { TransitionGroup } from "react-transition-group";
import { genres } from "../../assets/data/genres";
import SessionForm from "../sessions/SessionForm";

const CardsForm = ({
    isEdit,
    register,
    errors,
    getFromKinoDev,
    isLoadData,
    movieCard,
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
    const getDatasBtnSx = {
        ...(isLoadData && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    }

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
                    Start at {item.time} is {item.price} RUB
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
        <>
            <Box
                component="form"
                sx={{
                    position: 'relative',
                    '& > :not(style)': { m: 2, display: 'flex' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={onSubmit}
            >
                <Stack
                    direction='row'
                    justifyContent='space-between'
                >
                    <TextField
                        {...register('kinopoiskUrl')}
                        id="kinopoiskUrl"
                        label="Kinopoisk URL"
                        variant="standard"
                        sx={{ width: '100%' }}
                        value={movieCard?.kinopoiskUrl || ''}
                        onChange={(newValue) => handleListItem(newValue)}
                        error={!!errors.kinopoiskUrl}
                        helperText={errors?.kinopoiskUrl?.message}
                    />
                    <Box sx={{ position: 'relative', flexShrink: 0 }}>
                        <Button
                            onClick={getFromKinoDev}
                            sx={getDatasBtnSx}
                            variant='contained'
                        >
                            Get datas
                        </Button>
                        {isLoadData && (
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
                    </Box>
                </Stack>

                <Stack duration='column'>
                    <TextField
                        {...register('movieImageUrl')}
                        id="movieImageUrl"
                        label="Movie image"
                        variant="standard"
                        onChange={(newValue) => handleListItem(newValue)}
                        value={movieCard?.movieImageUrl || ''}
                        InputLabelProps={{ shrink: !!movieCard?.movieImageUrl }}
                        error={!!errors.movieImageUrl}
                        helperText={errors?.movieImageUrl?.message}
                    />

                    <ImageList sx={{ width: '100%', m: (!!movieCard.movieImageUrl ? 1 : 0) }}>
                        <TransitionGroup>
                            {!!movieCard.movieImageUrl && (
                                <Collapse>
                                    <ImageListItem>
                                        <img src={movieCard.movieImageUrl} width="150px" height='150px' loading="lazy" />
                                    </ImageListItem>
                                </Collapse>
                            )}
                        </TransitionGroup>
                    </ImageList>
                </Stack>

                <TextField
                    {...register('movieName')}
                    id="movieName"
                    label="Movie name"
                    variant="standard"
                    onChange={(newValue) => handleListItem(newValue)}
                    value={movieCard?.movieName || ''}
                    InputLabelProps={{ shrink: !!movieCard?.movieName }}
                    error={!!errors.movieName}
                    helperText={errors?.movieName?.message}
                />
                <Stack spacing={2} direction='row'>
                    <Autocomplete
                        {...register('movieRate')}
                        autoHighlight
                        disableClearable
                        id="movieRate"
                        options={['0+', '6+', '12+', '16+', '18+', '21+']}
                        value={movieCard?.movieRate || null}
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
                        value={movieCard?.movieFormat || null}
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
                        value={movieCard.duration ? dayjs(`2022-04-17T${movieCard.duration}`) : null}
                        sx={{ width: 150 }}
                        // color='error'
                        error={!!errorsSession.duration}
                        helperText={errorsSession?.duration?.message}
                    />
                </Stack>
                <Stack spacing={2} direction='row'>
                    <Autocomplete
                        multiple
                        limitTags={2}
                        id='movieGenres'
                        options={genres.sort()}
                        sx={{ width: '100%' }}
                        value={movieCard?.movieGenres || []}
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

                    <FormControlLabel
                        control={
                            <Checkbox
                                {...register('pushkin')}
                                id='pushkin'
                                checked={movieCard.pushkin || false}
                                onChange={(e) => handleMovieChacked(e)}
                            />
                        }
                        label="Available with a Pushkin Card"
                    />
                </Stack>

                <input {...register('sessions')} value={sessions} style={{ display: 'none' }} />

                <Box>
                    <List sx={{ width: '100%' }}>
                        <TransitionGroup>
                            {!Boolean(sessions.length) ? (
                                <Collapse>
                                    <ListItem alignItems="center" error={!!errors.sessions}>
                                        <Typography variant="body2">You don't have any sessions!</Typography>
                                        <Button type="button" onClick={() => handleSessionShow()}>{sesseionShow ? 'Close session form' : 'Add session'}</Button>
                                    </ListItem>
                                </Collapse>
                            ) : (<Button type="button" onClick={() => handleSessionShow()}>{sesseionShow ? 'Close session form' : 'Add session'}</Button>)}
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

                <Stack sx={{ position: 'sticky', bottom: 0, background: '#fff', p: 1, zIndex: 10 }}>
                    <Button type="submit" variant="contained">
                        {isEdit ? ('Edit Card') : ('Add Card')}
                    </Button>
                </Stack>
            </Box>
        </>
    )
};

export default CardsForm;