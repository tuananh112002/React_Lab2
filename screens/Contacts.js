import React, {useState, useEffect}from 'react';
import {View, StyleSheet, Text, FlatList, ActivityIndicator} from 'react-native';
import {fetchContacts} from '../utility/Api'
import ContactListItem from '../components/ContactListItem';
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } from '../store';
import { useDispatch, useSelector } from 'react-redux';

const keyExtractor = ({phone}) => phone;

const Contacts = ({ navigation }) => {
    const { contacts, loading, error } = useSelector((state) => state);
    const dispatch = useDispatch();
    //Load du lieu
    useEffect(() => {
        dispatch(fetchContactsLoading());
        fetchContacts()
            .then(
                contacts => {
                    dispatch(fetchContactsSuccess(contacts));
                }
            )
            .catch(
                e => {
                    dispatch(fetchContactsError());
                }
            )
    }, [])
    //sort
    const contactsSorted = contacts.slice().sort((a, b) => a.name.localeCompare(b.name));
    const renderContacts = ({item}) => {
        const { name, avatar, phone } = item;
        return <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate("Profile",{ contact: item })}
        />;
        };
    return (
       <View style={styles.container}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text>Err...</Text>}
        {!loading && !error && (
            <FlatList
            data={contactsSorted}
            keyExtractor={keyExtractor}
            renderItem={renderContacts}
            />
        )}
       </View>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        flex:1,
        padding: 10,
    }
})

export default Contacts;