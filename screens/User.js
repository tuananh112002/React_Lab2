import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import { fetchUserContact } from "../utility/Api";
import ContactThumbnail from "../components/ContactThumbnail";
import Colors from "../utility/Colors";

const User = () =>
{
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchUserContact()
        .then(
            users => {
                setUser(users);
                setLoading(false);
                setError(false);
            }
        )
        .catch(
            e => {
                setLoading(false);
                setError(true);
            }
        )
    });

    const {avatar, name, phone} = user;
    return(
        <View style = {styles.container}>
            {loading && <ActivityIndicator size='large'/>}
            {error && <Text>Error...</Text>}
            {!loading && !error && (
                <ContactThumbnail avatar={avatar} name={name} phone={phone} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        flex: 1,
    },
});

export default User;