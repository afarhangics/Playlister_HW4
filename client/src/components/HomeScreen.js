import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [namePairs, setNamePairs] = useState([])

    useEffect(() => {
        console.log("useEffect")
        store.loadIdNamePairs();
    }, []);

    useEffect(() => {
        setNamePairs(store.idNamePairs);
        console.log('setNamePairs(store.idNamePairs);')
    }, [store.idNamePairs]);

    function handleCreateNewList() {
        store.createNewList();
    }
    
    return (
        <div id="playlist-selector">
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                disabled={store.shouldDisableAddList()}
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <div id="list-selector-list">
                {namePairs.length > 0 ? 
                <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
                {
                    namePairs.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                }
                </List>
                : ''}
                <MUIDeleteModal />
            </div>
        </div>)
}

export default HomeScreen;