import React from 'react';
import { FiSettings } from 'react-icons/fi';
import Select, { components } from 'react-select';
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';

import { operations } from './../../utils/operations';
import './AddEditProcess.css';

function arrayMove(array, from, to) {
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
}

const colourOptions = [
    {
        label: "Igor", value: "1"
    },
    {
        label: "Maria", value: "2"
    },
    {
        label: "José", value: "3"
    }];

const SortableMultiValue = SortableElement(props => {
    const onMouseDown = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const innerProps = { ...props.innerProps, onMouseDown };
    return <components.MultiValue {...props} innerProps={innerProps} />;
});

const SortableMultiValueLabel = sortableHandle(props => (
    <components.MultiValueLabel {...props} />
));

const SortableSelect = SortableContainer(Select);


function AddEditProcess() {

    let { operation } = useParams();

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const [currentOperation, setCurrentOperation] = React.useState(null);

    const onChange = selectedOptions => setSelected(selectedOptions);

    React.useEffect(() => {
        console.log("Inside useEffect");
        console.log(operation);
        setCurrentOperation(operations.filter(x => x.name == operation)[0]);
    }, []);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newValue = arrayMove(selected, oldIndex, newIndex);
        setSelected(newValue);
        console.log(
            'Values sorted:',
            newValue.map(i => i.value)
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickDone = () => {
        console.log("Clicou.");
        setLoading(true);
        setTimeout(() => {
            handleClickOpen();
            setLoading(false);
        }, 3000);
    }

    const resolveDisabled = () => {
        return ((currentOperation && currentOperation.name == 'view') || loading);
    }

    return (
        <>
            <div className="AddEditProcess">
                <div className="AddEditProcess-header">
                    <div className="AddEditProcess-Header-title">
                        <FiSettings size="128" />
                        <h2 className="AddEditProcess-Page-title-text">{currentOperation ? currentOperation.label : ""} Processo</h2>
                    </div>
                </div>
                <div className="AddEditProcess-body">
                    <div className="AddEditProcess-form">
                        <div className="AddEditProcess-form-line-item">
                            <label for="name">Nome</label>
                            <input name="name" maxLength="100" disabled={resolveDisabled()}></input>
                        </div>
                        <div className="AddEditProcess-form-line-item">
                            <label for="deadline">Deadline</label>
                            <input id="deadline" type="datetime-local" disabled={resolveDisabled()} />
                        </div>
                        <div className="AddEditProcess-form-line-item">
                            <label for="role">Reponsáveis</label>
                            <SortableSelect 
                                className="AddEditProcess-select-users"
                                useDragHandle
                                axis="xy"
                                onSortEnd={onSortEnd}
                                distance={4}
                                getHelperDimensions={({ node }) => node.getBoundingClientRect()}
                                isMulti
                                options={colourOptions}
                                value={selected}
                                onChange={onChange}
                                components={{
                                    MultiValue: SortableMultiValue,
                                    MultiValueLabel: SortableMultiValueLabel,
                                }}
                                closeMenuOnSelect={false}

                            />
                        </div>
                        <div className="AddEditProcess-form-line-item">
                            <label for="description">Descrição</label>
                            <textarea name="description" rows="4" cols="50" maxLength="400" disabled={resolveDisabled()}></textarea>
                        </div>
                        <div className="AddEditProcess-form-line-item">
                            {
                                loading ?
                                    <CircularProgress style={{ alignSelf: 'center' }} />
                                    :
                                    <Button variant="contained" color="primary" onClick={handleClickDone}>Concluir</Button>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"OPS..."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Não foi possível adicionar o usuário. Verifique os campos e tente novamente.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddEditProcess;