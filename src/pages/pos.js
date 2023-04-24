import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Alert, Box, Button, Collapse, IconButton, List, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { TransitionGroup } from "react-transition-group";
import { CopyAll, Delete } from "@mui/icons-material";

const Pos = () => {
    const [posLinks, setPosLinks] = useState([]);
    const [posItem, setPosItem] = useState({});
    const linksSchema = yup.object().shape({
        posName: yup.string().required('Name is a required field'),
        posId: yup.string().required('ID is a required field'),
        posReg: yup.string().required('REG CODE is a required field'),
        posOgrn: yup.string().required('OGRN is a required field'), //14
        posOktmo: yup.string().required('OKTMO is a required field'), //14
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(linksSchema),
    });

    const onSubmit = (data) => {
        const { posName, posId, posReg, posOgrn, posOktmo } = data;
        const link = `https://pos.gosuslugi.ru/form/?opaId=${posId}&utm_source=vk&utm_medium=${posReg}&utm_campaign=${posOgrn}`
        console.log(data);
        const roivLink = `https://pos.gosuslugi.ru/og/org-activities?mun_code=${posOktmo}&utm_source=vk2&utm_medium=${posReg}&utm_campaign=${posOgrn}`
        setPosLinks([...posLinks, { posName: posName, posUrl: link, posRoiv: roivLink }]);
    };

    const [isCopied, setIsCopied] = useState(false);
    const onCopy = (url) => {
        navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    const handleRemoveLink = (index) => {
        const secPosLinks = posLinks.slice();
        secPosLinks.splice(index, 1);
        setPosLinks(secPosLinks);
    };

    return (
        <Box>
            <Box
                component='form'
                sx={{
                    '& > :not(style)': { display: 'flex' }
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Stack spacing={1} direction='row'>
                    <TextField
                        {...register('posName')}
                        id='posName'
                        label='Name'
                        variant="filled"
                        error={!!errors.posName}
                        helperText={errors?.posName?.message}
                    />
                    <TextField
                        {...register('posId')}
                        id='posId'
                        label='ID'
                        type='number'
                        variant="filled"
                        error={!!errors.posId}
                        helperText={errors?.posId?.message}
                    />
                    <TextField
                        {...register('posReg')}
                        id='posReg'
                        label='Reg Code'
                        type='number'
                        variant="filled"
                        error={!!errors.posReg}
                        helperText={errors?.posReg?.message}
                    />
                    <TextField
                        {...register('posOgrn')}
                        id='posOgrn'
                        label='OGRN'
                        type='number'
                        variant="filled"
                        error={!!errors.posOgrn}
                        helperText={errors?.posOgrn?.message}
                    />
                    <TextField
                        {...register('posOktmo')}
                        id='posOktmo'
                        label='OKTMO'
                        type='number'
                        variant="filled"
                        error={!!errors.posOktmo}
                        helperText={errors?.posOktmo?.message}
                    />
                    <Button type='submit' variant="contained">Create link</Button>
                </Stack>
            </Box>

            <Box>
                <List>
                    <TransitionGroup>
                        {posLinks.map((item, i) => (
                            <Collapse key={i}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton
                                            edge='end'
                                            aria-label='remove'
                                            title='Remove'
                                            onClick={() => handleRemoveLink(i)}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    }
                                >
                                    <Typography variant="subtitle1">
                                        {item?.posName}:
                                    </Typography>

                                    <ListItemText>
                                        <Typography variant="body2">
                                            {item?.posUrl}
                                        </Typography>
                                        {/* <Button onClick={() => onCopy(item.posUrl)}>
                                            Скопировать "Сообщить о проблеме"
                                        </Button> */}
                                    </ListItemText>

                                    <ListItemText>
                                        <Typography variant="body2">
                                            {item?.posRoiv}
                                        </Typography>
                                        {/* <Button onClick={() => onCopy(item.posRoiv)}>
                                            Скопировать "Высказать мнение"
                                        </Button> */}
                                    </ListItemText>

                                </ListItem>
                            </Collapse>
                        ))}
                    </TransitionGroup>
                </List>
            </Box>
            <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <List>
                    <TransitionGroup>
                        {isCopied && (
                            <Collapse>
                                <Alert severity="success">link was copied</Alert>
                            </Collapse>
                        )}
                    </TransitionGroup>
                </List>
            </div>
        </Box>
    )
};

export default Pos;